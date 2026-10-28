import re

app_path = r'c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi\app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update activeOrder definition
old_active_order = """  // Aktif İş Emri (#SRV-2026-104)
  activeOrder: {
    code: "SRV-2026-104",
    customer: "TermoTek Ltd.",
    device: "Delta Electronics VFD-075 Endüstriyel Sürücü Kartı",
    serialNo: "DLT-2024-99823",
    status: "Onarımda",
    complaint: "Cihaz giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor ve koruma rölesi devreyi kesiyor.",
    findings: "Çıkış IGBT güç transistöründe termal stres kaynaklı mikro sızıntı/kısa devre saptandı. Yüksek akım çekimi koruma devresini kesiyor.",
    solution: "Arızalı IGBT transistör ve gate tetikleme dirençleri yenilenecek, filtre kondansatörü ESR testi yapılacak ve termal macun tazelenecektir.",
    action: "IGBT-600V-40A sökülüp yenisi lehimlendi, soğutucu blok termal macunlandı, gate sinyalleri doğrulandı ve 30 dk tam yük testi başarıyla tamamlandı.",
    laborCost: 600,
    usedParts: [
      { code: "IGBT-600V-40A", name: "IGBT-600V-40A Güç Transistörü", qty: 1, price: 450, warranty: "1 Yıl Parça Garantisi", source: "Mobil Araç Stoğu (34 ABC 101)" }
    ],
    customerApproved: false
  },"""

new_active_order = """  // Aktif İş Emri (#SRV-2026-104)
  activeOrder: {
    code: "SRV-2026-104",
    customer: "TermoTek Ltd.",
    brand: "Delta Electronics",
    model: "VFD-075 Endüstriyel Sürücü Kartı",
    device: "Delta Electronics VFD-075 Endüstriyel Sürücü Kartı",
    serialNo: "DLT-2024-99823",
    status: "Onarımda",
    complaint: "Cihaz giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor ve koruma rölesi devreyi kesiyor.",
    findings: "Delta Electronics VFD-075 güç katındaki IGBT anahtarlama modülünde (U3) aşırı ısınma ve kolektör-emitör kaçak akımı saptandı. Yüksek akım çekimi koruma rölesini tetikleyerek devreyi kesiyor.",
    solution: "Arızalı IGBT-600V-40A güç transistörü sökülüp yenilenecek, gate tetikleme dirençleri (10 Ohm) ve snubber devresi filtre kondansatörü test edilecek, soğutucu blok termal macunu tazelenecektir.",
    action: "Hasarlı IGBT transistör devreden ayrıldı, yeni IGBT-600V-40A montajı yapıldı. Gate sinyalleri osiloskopla doğrulandı, 540V DC bara gerilimi kararlı kılındı ve cihaz 30 dakika tam yük testine tabi tutularak sorunsuz çalıştı.",
    workSteps: [
      "Multimetre diyot kademesinde IGBT kolektör-emitör aralığında kısa devre ve sızıntı akımı ölçümü yapıldı.",
      "Gate tetikleme dirençlerinin (R12, R14) nominal 10 Ohm değerinde olduğu test edildi.",
      "Snubber devresindeki 470uF 450V filtre kondansatörünün ESR ve kapasite değeri ölçüldü.",
      "Cihaz on durumuna alınarak DC bara gerilimi ve 30 dk tam yük çıkışı doğrulandı."
    ],
    laborCost: 600,
    usedParts: [
      { code: "IGBT-600V-40A", name: "IGBT-600V-40A Güç Transistörü", qty: 1, price: 450, warranty: "1 Yıl Parça Garantisi", source: "Mobil Araç Stoğu (34 ABC 101)" }
    ],
    customerApproved: false
  },"""

# Normalize line endings for replacement
norm_content = content.replace('\r\n', '\n')
norm_old_active = old_active_order.replace('\r\n', '\n')
norm_new_active = new_active_order.replace('\r\n', '\n')

if norm_old_active in norm_content:
    norm_content = norm_content.replace(norm_old_active, norm_new_active, 1)
    print("✓ 1. activeOrder updated successfully")
else:
    print("✗ 1. old_active_order pattern not found!")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(norm_content)

