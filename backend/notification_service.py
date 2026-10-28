"""
ServisAI - WhatsApp & SMS Müşteri Bildirim Şablon Motoru
Müşteriye kritik süreç adımlarında (Kabul, Yola Çıktım, Masraf Onayı, Teslime Hazır, Bakım)
otomatik şablon üretir ve doğrudan WhatsApp / SMS gönderim linklerini hazırlar.
"""

import re
import urllib.parse
from datetime import datetime
from typing import Dict, Any, List

def clean_phone_for_whatsapp(phone: str) -> str:
    """
    Telefon numarasını uluslararası WhatsApp (wa.me) formatına çevirir.
    Örn: '0532 999 1122' -> '905329991122'
    """
    if not phone:
        return "905320000000"
    
    digits = re.sub(r"\D", "", phone)
    if digits.startswith("0"):
        digits = "90" + digits[1:]
    elif digits.startswith("90"):
        pass
    elif len(digits) == 10: # 532...
        digits = "90" + digits
    return digits

TEMPLATES = {
    "KABUL": {
        "id": "KABUL",
        "name": "📥 Cihaz Kabulü & Takip Kodu",
        "category": "Giriş",
        "description": "Cihaz servise ilk alındığında müşteriye takip linki ve kayıt kodu iletir.",
        "whatsapp": (
            "Sayın *{customer_name}*,\n\n"
            "*{device_name}* cihazınız teknik servisimize başarıyla kabul edilmiştir.\n\n"
            "📋 *Servis Takip No:* `{tracking_code}`\n"
            "⚙️ *Bildirilen Şikayet:* {complaint}\n"
            "⏱️ *Kabul Tarihi:* {date}\n\n"
            "Cihazınızın test ve onarım aşamalarını online olarak canlı izlemek için:\n"
            "🔗 {tracking_url}\n\n"
            "_Koçaş Teknik Servis & Otomasyon_\n"
            "📞 0216 555 0101"
        ),
        "sms": "Sn. {customer_name}, {device_name} cihaziniz #{tracking_code} koduyla kabul edilmistir. Canli takip: {tracking_url} Kocasteknik"
    },
    "YOLDA": {
        "id": "YOLDA",
        "name": "🚀 Teknisyen Yola Çıktı (Saha Servisi)",
        "category": "Saha",
        "description": "Saha teknisyeni adrese hareket ettiğinde araç ve tahmini varış süresi (ETA) bildirir.",
        "whatsapp": (
            "Sayın *{customer_name}*,\n\n"
            "Saha uzmanımız *{technician_name}* ({vehicle_plate}), #{tracking_code} nolu servis talebiniz için adresinize intikal etmek üzere yola çıkmıştır. 🚗\n\n"
            "📍 *Adres:* {customer_address}\n"
            "⏱️ *Tahmini Varış Süresi (ETA):* ~{eta_minutes} Dakika\n"
            "🚗 *Servis Aracı Plakası:* {vehicle_plate}\n\n"
            "_Koçaş Teknik Servis Saha Ekibi_\n"
            "📞 0216 555 0101"
        ),
        "sms": "Sn. {customer_name}, teknisyenimiz {technician_name} ({vehicle_plate}) adresinize yola cikmistir. Tahmini varis: {eta_minutes} dk. Kocasteknik"
    },
    "ONAY_TALEBI": {
        "id": "ONAY_TALEBI",
        "name": "💰 Arıza Tespiti & Masraf Onay Talebi",
        "category": "Teşhis",
        "description": "Arıza teşhisi bittiğinde müşteriden maliyet ve onarım için resmi onay talep eder.",
        "whatsapp": (
            "Sayın *{customer_name}*,\n\n"
            "#{tracking_code} nolu *{device_name}* cihazınızın arıza tespit ve laboratuvar incelemesi tamamlanmıştır.\n\n"
            "🔍 *Tespit Edilen Arıza:* {findings}\n"
            "🛠️ *Değişecek Parça:* {used_parts}\n"
            "💰 *Toplam Onarım Tutarı:* *{total_cost} TL* (KDV Dahil)\n"
            "🛡️ *Servis Garantisi:* {warranty_months} Ay Parça & İşçilik\n\n"
            "Onarıma başlayabilmemiz için lütfen onay linkine tıklayınız:\n"
            "👉 {tracking_url}\n\n"
            "_Koçaş Teknik Servis_"
        ),
        "sms": "Sn. {customer_name}, #{tracking_code} cihazinizin ariza tespiti tamamlandi. Tutar: {total_cost} TL. Onaylamak icin: {tracking_url} Kocasteknik"
    },
    "TAMAMLANDI": {
        "id": "TAMAMLANDI",
        "name": "✅ Onarım Bitti & Teslime Hazır",
        "category": "Teslimat",
        "description": "Onarım ve testler bittiğinde müşteriye teslim çağrısı ve garanti süresini bildirir.",
        "whatsapp": (
            "Sayın *{customer_name}*,\n\n"
            "Müjdeli haber! #{tracking_code} nolu *{device_name}* cihazınızın onarım ve kalite kontrol testleri başarıyla tamamlanmıştır. ✅\n\n"
            "🛡️ *Servis Garantisi:* {warranty_months} Ay Tam Garanti\n"
            "📦 *Cihaz Durumu:* Teslime Hazır\n"
            "💳 *Toplam Tutar:* {total_cost} TL\n\n"
            "Cihazınızı merkez servisimizden teslim alabilir veya kargo/servis randevusu talep edebilirsiniz.\n\n"
            "Servis ekspertiz raporunuz ve garanti belgeniz:\n"
            "🔗 {tracking_url}\n\n"
            "_Bizi tercih ettiğiniz için teşekkür ederiz._\n"
            "_Koçaş Teknik Servis & Otomasyon_"
        ),
        "sms": "Sn. {customer_name}, #{tracking_code} nolu {device_name} cihazinizin onarimi tamamlandi. Teslim alabilirsiniz. Detay: {tracking_url} Kocasteknik"
    },
    "BAKIM_HATIRLATMA": {
        "id": "BAKIM_HATIRLATMA",
        "name": "📅 Periyodik Bakım Zamanı Hatırlatması",
        "category": "Bakım",
        "description": "Sözleşmeli periyodik bakım tarihi yaklaşan cihazlar için randevu daveti gönderir.",
        "whatsapp": (
            "Sayın *{customer_name}*,\n\n"
            "Sözleşmeli *{device_name}* cihazınızın periyodik koruyucu bakım zamanı yaklaşmıştır.\n\n"
            "📅 *Planlanan Bakım Tarihi:* {due_date}\n"
            "🛠️ *Kapsam:* 3-Faz güç katı, sürücü parametreleri, fan/kondansatör ESR ve termal kamera testleri\n\n"
            "Üretiminizin veya sisteminizin aksamaması için uygun servis randevu tarihinizi belirlemek üzere bize ulaşabilirsiniz:\n"
            "📞 0216 555 0101\n"
            "💬 Veya bu mesaja doğrudan randevu saati yazabilirsiniz.\n\n"
            "_Koçaş Teknik Servis Koruyucu Bakım Birimi_"
        ),
        "sms": "Sn. {customer_name}, {device_name} cihazinizin periyodik bakim zamani yaklasmistir ({due_date}). Randevu icin: 02165550101 Kocasteknik"
    }
}

def get_template_list() -> List[Dict[str, Any]]:
    """Tüm şablonların özet listesini döner."""
    return [
        {
            "id": t["id"],
            "name": t["name"],
            "category": t["category"],
            "description": t["description"]
        }
        for t in TEMPLATES.values()
    ]

def render_notification(template_id: str, context: Dict[str, Any]) -> Dict[str, Any]:
    """
    Şablon metnini parametrelerle doldurur; SMS ve WhatsApp metinleri ile
    doğrudan açılabilir WhatsApp Web linkini üretir.
    """
    template = TEMPLATES.get(template_id, TEMPLATES["KABUL"])
    
    # Varsayılan değişken değerleri
    now_str = datetime.now().strftime("%d.%m.%Y %H:%M")
    tracking_code = context.get("tracking_code", "SRV-2026-104")
    
    data = {
        "customer_name": context.get("customer_name", "Değerli Müşterimiz"),
        "device_name": context.get("device_name", "Endüstriyel Cihaz"),
        "tracking_code": tracking_code,
        "complaint": context.get("complaint", "Genel Arıza"),
        "findings": context.get("findings", "Komponent ölçümleri ve teşhis yapıldı."),
        "used_parts": context.get("used_parts", "Orijinal Yedek Parça"),
        "total_cost": f"{context.get('total_cost', 1050):,.0f}".replace(",", "."),
        "warranty_months": str(context.get("warranty_months", 6)),
        "date": context.get("date", now_str),
        "technician_name": context.get("technician_name") or "Saha Teknisyenimiz",
        "vehicle_plate": context.get("vehicle_plate") or "34 ABC 101",
        "customer_address": context.get("customer_address", "Kadıköy, İstanbul"),
        "eta_minutes": str(context.get("eta_minutes", 8)),
        "due_date": context.get("due_date", "24 Ekim 2026"),
        "tracking_url": f"https://kocasteknik.com/takip/{tracking_code}"
    }

    # Format
    wa_text = template["whatsapp"].format(**data)
    sms_text = template["sms"].format(**data)
    
    raw_phone = context.get("customer_phone", "05329991122")
    wa_phone = clean_phone_for_whatsapp(raw_phone)
    encoded_wa = urllib.parse.quote(wa_text)
    wa_url = f"https://wa.me/{wa_phone}?text={encoded_wa}"

    # SMS Karakter Hesabı (Tek SMS 160 karakterdir)
    sms_len = len(sms_text)
    sms_parts = 1 if sms_len <= 160 else (sms_len // 153 + 1)

    return {
        "template_id": template["id"],
        "template_name": template["name"],
        "category": template["category"],
        "recipient_name": data["customer_name"],
        "recipient_phone": raw_phone,
        "recipient_wa_phone": wa_phone,
        "whatsapp_text": wa_text,
        "whatsapp_url": wa_url,
        "sms_text": sms_text,
        "sms_char_count": sms_len,
        "sms_parts_count": sms_parts,
        "tracking_code": tracking_code
    }
