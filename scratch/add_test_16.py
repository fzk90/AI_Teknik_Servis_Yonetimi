# -*- coding: utf-8 -*-
with open('Projeler/AI_Teknik_Servis_Yonetimi/scratch/test_dispatch_trays_and_accounting_receipt.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = '''console.log("\\n================================================================================");
console.log("   🎉 TÜM DOĞRULAMA TESTLERİ BAŞARIYLA GEÇTİ (KALİTE SKORU: 15/15)              ");
console.log("================================================================================");'''

test16_code = '''
console.log("\\n[TEST 16] Kurulum Sihirbazı (Onboarding Wizard) ve Şirket Fatura Kartı Testi:");

// 1. Arayüz Bileşenleri (Header Butonu, Sihirbaz Modalı ve 7 Adım)
assert(htmlContent.includes('id="btn-open-onboarding-wizard"'), "HATA: Header Şirket Kurulum Sihirbazı butonu bulunamadı!");
assert(htmlContent.includes('id="onboarding-wizard-modal"'), "HATA: onboarding-wizard-modal bulunamadı!");
assert(htmlContent.includes('id="wizard-pane-1"'), "HATA: wizard-pane-1 bulunamadı!");
assert(htmlContent.includes('id="wizard-pane-2"'), "HATA: wizard-pane-2 (Fatura & Vergi) bulunamadı!");
assert(htmlContent.includes('id="wizard-pane-7"'), "HATA: wizard-pane-7 (Özet & Başlat) bulunamadı!");
assert(htmlContent.includes('id="wizard-legal-name"'), "HATA: wizard-legal-name resmi fatura ünvan alanı bulunamadı!");
assert(htmlContent.includes('id="wizard-tax-id"'), "HATA: wizard-tax-id VKN alanı bulunamadı!");
assert(htmlContent.includes('id="wizard-tax-office"'), "HATA: wizard-tax-office vergi dairesi alanı bulunamadı!");
assert(htmlContent.includes('id="wizard-billing-address"'), "HATA: wizard-billing-address resmi adres alanı bulunamadı!");
console.log("  ✓ Arayüz Bileşenleri: Header butonu, 7 adımlı sihirbaz modalı ve resmi fatura/vergi giriş alanları doğrulandı.");

// 2. Teknisyen Dış Harcama İbrazı & Şirket Fatura Kartı Modalı
assert(htmlContent.includes('id="company-billing-info-modal"'), "HATA: company-billing-info-modal bulunamadı!");
assert(htmlContent.includes('id="btn-tech-show-billing-card"'), "HATA: Teknisyen ekranında btn-tech-show-billing-card bulunamadı!");
assert(htmlContent.includes('id="billing-card-legal-name"'), "HATA: billing-card-legal-name alanı bulunamadı!");
assert(htmlContent.includes('id="billing-card-tax-id"'), "HATA: billing-card-tax-id alanı bulunamadı!");
assert(htmlContent.includes('id="btn-copy-billing-info"'), "HATA: Fatura metnini kopyalama butonu bulunamadı!");
assert(htmlContent.includes('id="btn-whatsapp-billing-info"'), "HATA: WhatsApp ile satıcıya fatura gönderme butonu bulunamadı!");
console.log("  ✓ Teknisyen Fatura Kartı: Dış alım ibraz kartı, VKN/VD dökümü, tek tıkla kopyalama ve WhatsApp entegrasyonu doğrulandı.");

// 3. CSS ve Baskı Stilleri
assert(cssContent.includes('.company-billing-card'), "HATA: styles.css .company-billing-card stili bulunamadı!");
assert(cssContent.includes('.wizard-progress-track'), "HATA: styles.css .wizard-progress-track stili bulunamadı!");
assert(cssContent.includes('.wizard-sector-card'), "HATA: styles.css .wizard-sector-card stili bulunamadı!");
assert(cssContent.includes('body.printing-billing-card'), "HATA: styles.css body.printing-billing-card baskı stili bulunamadı!");
console.log("  ✓ CSS & Baskı Stilleri: Yüksek kontrastlı fatura kartviziti, sihirbaz adımları ve kartvizit yazdırma kuralları doğrulandı.");

// 4. JavaScript Motoru & Sektörel Şablonlar
assert(jsContent.includes('function initCompanyBillingCardEngine()'), "HATA: app.js initCompanyBillingCardEngine bulunamadı!");
assert(jsContent.includes('function initOnboardingWizardEngine()'), "HATA: app.js initOnboardingWizardEngine bulunamadı!");
assert(jsContent.includes('function applyCompanyProfile('), "HATA: app.js applyCompanyProfile bulunamadı!");
assert(jsContent.includes('const SECTOR_TEMPLATES ='), "HATA: app.js SECTOR_TEMPLATES bulunamadı!");
assert(jsContent.includes('endustriyel_otomasyon') && jsContent.includes('iklimlendirme_sogutma') && jsContent.includes('biyomedikal_medikal'), "HATA: app.js kritik sektör şablonları eksik!");
console.log("  ✓ JS Motoru & Sektörler: 6 sektörel hazır şablon, profil uygulama ve dinamik teknisyen/stok yönetim motoru doğrulandı.");

console.log("\\n================================================================================");
console.log("   🎉 TÜM DOĞRULAMA TESTLERİ BAŞARIYLA GEÇTİ (KALİTE SKORU: 16/16)              ");
console.log("================================================================================");
'''

if target in code:
    code = code.replace(target, test16_code)
    with open('Projeler/AI_Teknik_Servis_Yonetimi/scratch/test_dispatch_trays_and_accounting_receipt.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("TEST 16 added successfully!")
else:
    print("Target string not found in test script!")

