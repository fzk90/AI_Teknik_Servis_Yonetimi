import sys
import os

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

base_dir = r"c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi"

# ----------------------------------------------------------------------
# 1. CREATE LICENSE (PROPRIETARY COMMERCIAL SOFTWARE LICENSE)
# ----------------------------------------------------------------------
license_content = """PROPRIETARY COMMERCIAL SOFTWARE LICENSE
ALL RIGHTS RESERVED (TÜM HAKLARI SAKLIDIR)

Copyright (c) 2026 Zafer Koçaş. All Rights Reserved.
FUNZerviceTech.ai - Yapay Zeka Destekli Endüstriyel Teknik Servis Yönetim Sistemi

--------------------------------------------------------------------------------
1. MÜLKİYET VE KAPSAM (OWNERSHIP & SCOPE)
Bu yazılım, kaynak kodları, yazılım mimarisi, kullanıcı arayüzü tasarımları, 
iş akışları, yapay zeka arıza teşhis kuralları, veri modelleri ve ilgili tüm 
belgeler ("Yazılım") münhasıran Zafer Koçaş'a ("Hak Sahibi") aittir. 
Yazılım, 5846 sayılı Fikir ve Sanat Eserleri Kanunu (FSEK), Türk Ticaret Kanunu, 
Türk Ceza Kanunu ve Bern Sözleşmesi dahil ilgili uluslararası telif hakkı 
sözleşmeleri kapsamında tescilli ve korunmaktadır.

2. KULLANIM VE İNCELEME İZNİ (EVALUATION & DEMO PERMISSION)
Hak Sahibi tarafından açıkça yetkilendirilmiş üçüncü kişilere bu Yazılım'a 
erişim sağlanması; yalnızca Yazılım'ın teknik yeteneklerini test etme, inceleme 
ve değerlendirme amacıyla sınırlıdır. Bu erişim, kullanıcılara Yazılım üzerinde 
herhangi bir mülkiyet, lisans, dağıtım veya ticarileştirme hakkı devretmez.

3. KISITLAMALAR VE YASAKLAR (RESTRICTIONS)
Yazılı izin olmaksızın aşağıdaki eylemler kesinlikle yasaktır:
a) Kaynak kodların, arayüz bileşenlerinin veya algoritmaların tamamının ya da 
   herhangi bir bölümünün kopyalanması, çoğaltılması veya klonlanması;
b) Yazılım'ın üçüncü şahıslara satılması, kiralanması, alt lisanslanması (sublicense), 
   dağıtılması veya herhangi bir ticari faaliyette kullanılması;
c) Kaynak kodlara tersine mühendislik (reverse engineering) uygulanması, 
   dekompile edilmesi veya kaynak koda dönüştürülmesi;
d) Yazılım kaynak kodlarından veya mimarisinden türetilmiş çalışmalar üretilmesi;
e) Telif hakkı, marka veya mülkiyet bildirimlerinin kaldırılması veya değiştirilmesi.

4. HUKUKİ VE CEZAİ YAPTIRIMLAR (LEGAL ENFORCEMENT)
Bu koşulların ihlali durumunda, Hak Sahibi 5846 sayılı FSEK Madde 66-71 ve 
ilgili mevzuat uyarınca; tecavüzün men'i, maddi ve manevi tazminat davaları ile 
cezai kovuşturma başlatma hakkını saklı tutar.

5. İLETİŞİM VE TİCARİ LİSANSLAMA (COMMERCIAL INQUIRIES)
Yazılım'ın ticari lisansı, kurumsal kurulumları ve entegrasyon talepleri için:
Hak Sahibi: Zafer Koçaş
E-Posta: zafer@kocasteknik.com
Proje: FUNZerviceTech.ai
"""

license_path = os.path.join(base_dir, "LICENSE")
with open(license_path, "w", encoding="utf-8") as f:
    f.write(license_content)
print("✓ LICENSE file created successfully.")

# ----------------------------------------------------------------------
# 2. CREATE TELIF_HAKKI.md
# ----------------------------------------------------------------------
telif_content = """# FİKRİ MÜLKİYET, TELİF HAKKI VE TİCARİ KORUMA BİLDİRİMİ

**Proje:** FUNZerviceTech.ai - Yapay Zeka Destekli Endüstriyel Teknik Servis Yönetim Sistemi  
**Fikri Mülkiyet Sahibi:** Zafer Koçaş (Elektronik ve Haberleşme Mühendisi)  
**Telif Yılı:** © 2026. Tüm Hakları Saklıdır (All Rights Reserved).  
**Hukuki Dayanak:** 5846 Sayılı Fikir ve Sanat Eserleri Kanunu (FSEK), Türk Ticaret Kanunu, WIPO Telif Hakları Anlaşması ve Bern Sözleşmesi.

---

## 1. Yasal Mülkiyet Beyanı

Bu depoda, web platformunda (`https://fzk90.github.io/AI_Teknik_Servis_Yonetimi/`) ve bağlı servislerde yer alan:
* **Tüm Kaynak Kodlar:** JavaScript (`app.js`), HTML şablonları (`index.html`), CSS tasarım sistemi (`styles.css`), Python FastAPI arka uç servisleri ve veri modelleri,
* **Operasyonel Mimariler:** Sevk Masası akıllı atama motoru, mobil araç & filo stok aktarım matrisi, atölye sevk ve tezgâh yaşam döngüsü,
* **Yapay Zeka Servis Bilgi Bankası:** Endüstriyel cihaz (sürücü, PLC, invertör vb.) kök neden analiz protokolleri ve 4 adımlı kontrol mekanizmaları,
* **Finans & Entegrasyon Katmanı:** Resmi e-Fatura/e-Arşiv UBL-TR 2.1 XML üretim şablonları, çoklu para birimli TCMB döviz motoru, Sanal POS ve SaaS kiracı izolasyonu mimarisi,

münhasıran ve kayıtsız şartsız **Zafer Koçaş**'ın şahsi fikri, sınai ve ticari mülkiyetindedir.

---

## 2. İzin Verilen Kullanım Kapsamı (Demo & Değerlendirme)

Bu sistemin canlı bağlantısının meslektaşlara, servis müdürlerine ve sektör profesyonellerine sunulması **yalnızca kullanıcı testi, işlevsel inceleme ve saha değerlendirmesi** amacına matuftur.

* **Yetkilendirme:** Test kullanıcıları sistemi deneyimleyebilir, örnek çağrılar açabilir ve kullanım kolaylığı hakkında geri bildirimde bulunabilir.
* **Mülkiyet Devri Yoktur:** Sistemin incelenmesi veya test edilmesi, inceleyen tarafa yazılımın kodu, tasarımı veya mantığı üzerinde hiçbir hak, lisans veya ortaklık tanımaz.

---

## 3. Açık Kısıtlamalar ve Yasaklar

Aşağıdaki fiiller hak sahibinin açık, ıslak imzalı yazılı izni olmaksızın kesinlikle yasaktır:
1. Kaynak kodların, veri yapılarının veya algoritmaların kısmen ya da tamamen kopyalanması, klonlanması veya başka bir platforma aktarılması.
2. Yazılımın ticari bir hizmet, SaaS servisi veya şirket içi operasyon aracı olarak izinsiz çalıştırılması.
3. Yazılıma tersine mühendislik (reverse engineering) yapılması, kaynak kodların çözümlenmesi veya türev yazılımlar üretilmesi.
4. Dosyalardaki telif hakkı, marka veya mülkiyet ibarelerinin silinmesi veya tahrif edilmesi.

---

## 4. İhlal Halinde Yasal Haklar

Yukarıda belirtilen fikri mülkiyet haklarının ihlali durumunda:
* **Hukuk Davaları:** 5846 sayılı FSEK hükümleri uyarınca tecavüzün ref'i (önlenmesi), men'i ve maddi/manevi tazminat davaları açılacaktır.
* **Ceza Davaları:** FSEK Madde 71 ve Türk Ceza Kanunu'nun bilişim suçlarına ilişkin maddeleri kapsamında hapis ve adli para cezası istemiyle yetkili Cumhuriyet Başsavcılıklarına suç duyurusunda bulunulacaktır.

---

## 5. İletişim ve Lisanslama Talepleri

Yazılımın ticari lisansı, kurumsal deployment süreçleri veya ortaklık teklifleri için:
* **Hak Sahibi:** Zafer Koçaş
* **E-Posta:** zafer@kocasteknik.com
* **Platform:** FUNZerviceTech.ai
"""

telif_path = os.path.join(base_dir, "TELIF_HAKKI.md")
with open(telif_path, "w", encoding="utf-8") as f:
    f.write(telif_content)
print("✓ TELIF_HAKKI.md created successfully.")

# ----------------------------------------------------------------------
# 3. UPDATE app.js (HEADER BANNER & CONSOLE ANTI-THEFT WATERMARK)
# ----------------------------------------------------------------------
app_path = os.path.join(base_dir, "app.js")
with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

legal_banner_js = """/**
 * ================================================================================
 *   FUNZerviceTech.ai - Yapay Zeka Destekli Endüstriyel Teknik Servis Yönetimi
 *   Copyright (c) 2026 Zafer Koçaş. Tüm Hakları Saklıdır. (All Rights Reserved).
 * ================================================================================
 *   FİKRİ MÜLKİYET VE TİCARİ KULLANIM UYARISI:
 *   Bu yazılımın kaynak kodları, mimarisi, veri modelleri, yapay zeka arıza
 *   teşhis algoritmaları ve arayüz tasarımları 5846 sayılı Fikir ve Sanat Eserleri
 *   Kanunu (FSEK) ve uluslararası telif hakkı mevzuatı uyarınca tescillidir.
 *   Hak sahibinin yazılı izni olmaksızın kopyalanması, çoğaltılması, dağıtılması,
 *   ticari amaçla kullanılması veya tersine mühendisliğe tabi tutulması yasaktır.
 *   Ayrıntılar için kök dizindeki LICENSE ve TELIF_HAKKI.md belgelerine bakınız.
 * ================================================================================
 */
"""

# Replace old comment header in app.js
if app_code.startswith("/**\n * ServisAI - Modern Interactive Prototype Logic"):
    end_idx = app_code.find("*/\n")
    if end_idx != -1:
        app_code = legal_banner_js + app_code[end_idx + 3:]
        print("✓ app.js header replaced with official legal banner.")
elif not app_code.startswith("/**\n * ===="):
    app_code = legal_banner_js + "\n" + app_code
    print("✓ app.js prepended with legal banner.")

# Add Console Anti-Theft Watermark right after API_BASE_URL
console_watermark = """
// ==================== Fikri Mülkiyet & Telif Bildirimi (Console Watermark) ====================
if (typeof console !== 'undefined' && console.log) {
  console.log(
    '%c FUNZerviceTech.ai %c © 2026 Zafer Koçaş - Tüm Hakları Saklıdır ',
    'background: #2563eb; color: #ffffff; font-weight: 800; font-size: 13px; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #0f172a; color: #38bdf8; font-weight: 700; font-size: 13px; padding: 4px 8px; border-radius: 0 4px 4px 0; border: 1px solid #2563eb;'
  );
  console.log(
    '%c 🛡️ TİCARİ MÜLKİYET UYARISI: Bu yazılımın kaynak kodları, mimarisi ve AI teşhis motoru 5846 sayılı FSEK kapsamında korunmaktadır. Yetkisiz kopyalama, ticari kullanım ve tersine mühendislik hukuki/cezai takibata tabidir.',
    'color: #f87171; font-size: 11px; margin-top: 2px;'
  );
}
"""

if "Console Watermark" not in app_code:
    target_pos = app_code.find('const API_BASE_URL = "http://127.0.0.1:8000";')
    if target_pos != -1:
        insert_idx = app_code.find('\n', target_pos) + 1
        app_code = app_code[:insert_idx] + console_watermark + app_code[insert_idx:]
        print("✓ Console anti-theft watermark added to app.js.")

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_code)

# ----------------------------------------------------------------------
# 4. UPDATE index.html (HEAD META & LEGAL COMMENT BANNER)
# ----------------------------------------------------------------------
index_path = os.path.join(base_dir, "index.html")
with open(index_path, "r", encoding="utf-8") as f:
    html_code = f.read()

legal_banner_html = """<!--
  FUNZerviceTech.ai - Yapay Zeka Destekli Endüstriyel Teknik Servis Yönetim Sistemi
  Copyright (c) 2026 Zafer Koçaş. Tüm Hakları Saklıdır (All Rights Reserved).
  5846 sayılı FSEK ve uluslararası telif hakları mevzuatı ile korunmaktadır.
  İzinsiz kopyalama, dağıtma, ticari kullanım veya tersine mühendislik yasaktır.
-->
"""

if "<!--\n  FUNZerviceTech.ai" not in html_code:
    html_code = legal_banner_html + html_code
    print("✓ index.html prepended with legal copyright comment.")

# Add meta author and copyright tags inside <head>
if '<meta name="author" content="Zafer Koçaş">' not in html_code:
    meta_tags = """  <meta name="author" content="Zafer Koçaş">
  <meta name="copyright" content="Copyright (c) 2026 Zafer Koçaş. Tüm Hakları Saklıdır.">
  <meta name="robots" content="noindex, nofollow, noarchive">"""
    html_code = html_code.replace('<meta name="description"', meta_tags + '\n  <meta name="description"', 1)
    print("✓ Added author, copyright, and noindex/noarchive robots meta tags to index.html.")

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html_code)

# ----------------------------------------------------------------------
# 5. UPDATE styles.css (LEGAL BANNER)
# ----------------------------------------------------------------------
styles_path = os.path.join(base_dir, "styles.css")
with open(styles_path, "r", encoding="utf-8") as f:
    css_code = f.read()

legal_banner_css = """/**
 * FUNZerviceTech.ai - Modern UI & Design System
 * Copyright (c) 2026 Zafer Koçaş. Tüm Hakları Saklıdır (All Rights Reserved).
 * 5846 sayılı FSEK kapsamında tescillidir. İzinsiz kopyalanamaz ve dağıtılamaz.
 */
"""

if "Copyright (c) 2026 Zafer Koçaş" not in css_code[:300]:
    css_code = legal_banner_css + css_code
    print("✓ styles.css prepended with legal copyright banner.")

with open(styles_path, "w", encoding="utf-8") as f:
    f.write(css_code)

# ----------------------------------------------------------------------
# 6. UPDATE README.md (FİKRİ MÜLKİYET VE LİSANS BÖLÜMÜ)
# ----------------------------------------------------------------------
readme_path = os.path.join(base_dir, "README.md")
with open(readme_path, "r", encoding="utf-8") as f:
    readme_code = f.read()

license_section_readme = """

---

## ⚖️ Fikri Mülkiyet, Telif Hakkı ve Lisans (Proprietary & All Rights Reserved)

* **Telif Sahibi:** Zafer Koçaş (Elektronik ve Haberleşme Mühendisi, Emekli)
* **Marka:** FUNZerviceTech.ai
* **Yasal Durum:** © 2026 Zafer Koçaş. Tüm Hakları Saklıdır (All Rights Reserved).
* **Mevzuat:** 5846 sayılı Fikir ve Sanat Eserleri Kanunu (FSEK), Türk Ticaret Kanunu, Bern Sözleşmesi ve WIPO Telif Hakları Anlaşması kapsamında korunmaktadır.
* **Kullanım Kapsamı:** Bu depoda yer alan kaynak kodlar, arayüz tasarımları, veri modelleri, yapay zeka arıza teşhis kuralları ve algoritmalar **açık kaynaklı (open source) değildir**. Yetkili kişilerce yalnızca teknik değerlendirme, test ve inceleme amacıyla görüntülenebilir. Hak sahibinin yazılı izni olmaksızın kopyalanamaz, çoğaltılamaz, alt lisanslanamaz, ticari amaçla işletilemez veya tersine mühendisliğe tabi tutulamaz.
* **Ayrıntılı Hukuki Metinler:** [LICENSE](./LICENSE) ve [TELIF_HAKKI.md](./TELIF_HAKKI.md) belgelerinde belirtilmiştir.
"""

if "Fikri Mülkiyet, Telif Hakkı ve Lisans" not in readme_code:
    readme_code = readme_code + license_section_readme
    print("✓ README.md updated with proprietary license section.")

with open(readme_path, "w", encoding="utf-8") as f:
    f.write(readme_code)

print("\n🎉 Tüm Fikri Mülkiyet ve Yasal Koruma Belgeleri Başarıyla Tamamlandı!")
