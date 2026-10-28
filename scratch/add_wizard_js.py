# -*- coding: utf-8 -*-
import sys

js_code = """
// ==========================================================================
// 29. KURULUM SİHİRBAZI (ONBOARDING WIZARD) VE ŞİRKET FATURA KARTI MOTORU
// ==========================================================================

const defaultCompanyProfile = {
  name: "Koçaş Teknik Servis",
  legalName: "Koçaş Endüstriyel Elektronik ve Otomasyon Sistemleri San. ve Tic. A.Ş.",
  industry: "Endüstriyel Elektronik, PLC & Sürücü Onarımı",
  sectorKey: "endustriyel_otomasyon",
  taxOffice: "Nilüfer Vergi Dairesi",
  taxId: "5760129841",
  billingAddress: "Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA",
  city: "Bursa / Nilüfer",
  phone: "+90 224 441 00 24",
  email: "muhasebe@kocasteknik.com",
  website: "https://kocasteknik.com",
  tradeRegNo: "Bursa Tic. Sicil #98241",
  mersisNo: "0576012984100018",
  efaturaScenario: "Ticari Fatura (UBL-TR 2.1)",
  managerName: "Zafer Koçaş",
  managerTitle: "Elektronik ve Haberleşme Mühendisi / Firma Sahibi",
  managerPhone: "0532 999 88 77",
  managerEmail: "zafer@kocasteknik.com",
  managerPin: "1234",
  mainWarehouse: "Bursa Merkez Depo (DOSAB)",
  mainWorkshop: "Elektronik ve Kart Test Laboratuvarı"
};

const SECTOR_TEMPLATES = {
  endustriyel_otomasyon: {
    name: "Koçaş Teknik Servis",
    legalName: "Koçaş Endüstriyel Elektronik ve Otomasyon Sistemleri San. ve Tic. A.Ş.",
    industry: "Endüstriyel Elektronik, PLC & Sürücü Onarımı",
    taxOffice: "Nilüfer Vergi Dairesi",
    taxId: "5760129841",
    billingAddress: "Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA",
    city: "Bursa / Nilüfer",
    phone: "+90 224 441 00 24",
    email: "info@kocasteknik.com",
    website: "https://kocasteknik.com",
    managerName: "Zafer Koçaş",
    managerTitle: "Elektronik ve Haberleşme Mühendisi / Firma Sahibi",
    managerPhone: "0532 999 88 77",
    managerEmail: "zafer@kocasteknik.com",
    mainWarehouse: "Bursa Merkez Depo (DOSAB)",
    mainWorkshop: "Elektronik ve Kart Test Laboratuvarı",
    rates: { light: 450, standard: 850, heavy: 1600 },
    staff: [
      { name: "Murat Aydın", role: "Saha Mühendisi (Elektronik)", specialty: "Güç Elektroniği & Kart Tamiri", phone: "0533 111 22 33", pin: "1234", vehiclePlate: "34 ABC 101 - Doblo" },
      { name: "Caner Güler", role: "Kıdemli Tekniker", specialty: "Sürücü & PLC Parametresi", phone: "0534 222 33 44", pin: "2345", vehiclePlate: "34 DEF 202 - Caddy" },
      { name: "Selin Kaya", role: "Otomasyon Mühendisi", specialty: "Haberleşme & SCADA", phone: "0535 333 44 55", pin: "3456", vehiclePlate: "35 EGE 35 - Transit" }
    ],
    stock: [
      { code: "IGBT-600V", name: "Semikron 1200V 50A IGBT Güç Modülü (İthal)", qty: 6, price: 45, currency: "USD", isImport: true },
      { code: "PLC-DI-08", name: "Siemens S7-1200 8xDI Dijital Giriş Modülü", qty: 4, price: 120, currency: "EUR", isImport: true },
      { code: "SMPS-24V", name: "MeanWell 24V 10A Pano Tipi Güç Kaynağı", qty: 8, price: 1250, currency: "TRY", isImport: false },
      { code: "RLY-FINDER", name: "Finder 24V DC 2 Açık 2 Kapalı Röle Soketli", qty: 25, price: 180, currency: "TRY", isImport: false },
      { code: "RLM-6204", name: "SKF 6204-2RSH C3 Yüksek Devir Rulman", qty: 12, price: 28, currency: "EUR", isImport: true },
      { code: "FUS-10A", name: "Bussmann 10x38 10A Hızlı Seramik Sigorta", qty: 40, price: 95, currency: "TRY", isImport: false }
    ]
  },
  iklimlendirme_sogutma: {
    name: "Ege İklimlendirme & Soğutma",
    legalName: "Ege İklimlendirme Soğutma ve Havalandırma Sistemleri San. ve Tic. Ltd. Şti.",
    industry: "Chiller, VRF, Split Klima & Soğuk Hava Depoları",
    taxOffice: "Bornova Vergi Dairesi",
    taxId: "3829104921",
    billingAddress: "Kazımdirik Mah. Sanayi Cad. No: 48 Bornova / İZMİR",
    city: "İzmir / Bornova",
    phone: "+90 232 388 40 50",
    email: "servis@egeiklimlendirme.com",
    website: "https://egeiklimlendirme.com",
    managerName: "Cemil Ege",
    managerTitle: "Makine Mühendisi / Genel Müdür",
    managerPhone: "0533 400 50 60",
    managerEmail: "cemil@egeiklimlendirme.com",
    mainWarehouse: "İzmir Bornova Lojistik Depo",
    mainWorkshop: "Kompresör ve Eşanjör Test İstasyonu",
    rates: { light: 500, standard: 950, heavy: 1800 },
    staff: [
      { name: "Ahmet Barut", role: "VRF & Chiller Uzmanı", specialty: "Gaz Kaçak & Kompresör Revizyonu", phone: "0532 211 44 77", pin: "1122", vehiclePlate: "35 CLM 01 - Ford Transit" },
      { name: "Yasin Kurt", role: "İklimlendirme Teknikeri", specialty: "Elektronik Kart & 4 Yollu Vana", phone: "0533 322 55 88", pin: "2233", vehiclePlate: "35 CLM 02 - Renault Kangoo" }
    ],
    stock: [
      { code: "GAZ-R410A", name: "DuPont R410A Soğutucu Gaz Tüpü (11.3 kg)", qty: 8, price: 180, currency: "USD", isImport: true },
      { code: "VNA-4YOL", name: "Sanhua 4 Yollu Ters Çevirme Vanası 1/2", qty: 6, price: 65, currency: "USD", isImport: true },
      { code: "DRN-PUMP", name: "Sauermann Si-30 Sessiz Drenaj Pompası", qty: 10, price: 85, currency: "EUR", isImport: true },
      { code: "KAP-45UF", name: "Ducati 45uF 450V Motor Çalışma Kondansatörü", qty: 20, price: 240, currency: "TRY", isImport: false },
      { code: "EXP-VALVE", name: "Danfoss Termostatik Genleşme Valfi T2", qty: 5, price: 95, currency: "EUR", isImport: true },
      { code: "SRF-BAKIR", name: "3/8 - 5/8 İzoleli Bakır Boru Kangal (50m)", qty: 4, price: 4200, currency: "TRY", isImport: false }
    ]
  },
  biyomedikal_medikal: {
    name: "Doğu Biyomedikal Sistemleri",
    legalName: "Doğu Tıbbi Cihazlar ve Biyomedikal Kalibrasyon San. Tic. A.Ş.",
    industry: "Biyomedikal, Hasta Başı Monitör & Laboratuvar Cihazları",
    taxOffice: "Çankaya Vergi Dairesi",
    taxId: "8192038475",
    billingAddress: "İvedik Organize Sanayi Bölgesi 1354. Cad. No: 22 Yenimahalle / ANKARA",
    city: "Ankara / Yenimahalle",
    phone: "+90 312 395 10 20",
    email: "kalibrasyon@dogubiyomedikal.com",
    website: "https://dogubiyomedikal.com",
    managerName: "Dr. Alper Doğu",
    managerTitle: "Biyomedikal Mühendisi / Yönetici",
    managerPhone: "0532 600 70 80",
    managerEmail: "alper@dogubiyomedikal.com",
    mainWarehouse: "Ankara İvedik Medikal Steril Depo",
    mainWorkshop: "ISO 17025 Biyomedikal Kalibrasyon Laboratuvarı",
    rates: { light: 650, standard: 1200, heavy: 2400 },
    staff: [
      { name: "Merve Tekin", role: "Klinik Mühendisi", specialty: "Monitör & EKG Kalibrasyonu", phone: "0533 711 88 99", pin: "3344", vehiclePlate: "06 MED 10 - VW Caddy" },
      { name: "Okan Saygı", role: "Biyomedikal Teknikeri", specialty: "Güç Modülleri & Sensör Değişimi", phone: "0534 822 99 00", pin: "4455", vehiclePlate: "06 MED 20 - Fiat Fiorino" }
    ],
    stock: [
      { code: "MED-SPO2", name: "Nellcor Uyumlu Yetişkin Parmak Tipi SpO2 Probu", qty: 15, price: 55, currency: "USD", isImport: true },
      { code: "MED-NIBP", name: "Çift Hortumlu NIBP Tansiyon Manşonu Seti", qty: 18, price: 40, currency: "USD", isImport: true },
      { code: "MED-EKG-L5", name: "5 Lead EKG Hasta Kablosu ve Çıtçıt Seti", qty: 10, price: 75, currency: "EUR", isImport: true },
      { code: "BAT-LIION", name: "11.1V 4400mAh Medikal Monitör Lityum Pili", qty: 8, price: 90, currency: "USD", isImport: true },
      { code: "SMPS-MED", name: "TUV Medikal Onaylı 15V/5V DC İzole Güç Kartı", qty: 5, price: 140, currency: "EUR", isImport: true },
      { code: "FLT-HEPA", name: "Ventilatör Bakteri/Virüs Filtresi (Paket)", qty: 30, price: 320, currency: "TRY", isImport: false }
    ]
  },
  cnc_mekatronik: {
    name: "Marmara CNC & Mekatronik",
    legalName: "Marmara CNC Takım Tezgahları ve Robotik Otomasyon San. A.Ş.",
    industry: "CNC Dik İşleme, Torna, Servo Sürücüler & Robotik Kollar",
    taxOffice: "Tuzla Vergi Dairesi",
    taxId: "6648291038",
    billingAddress: "Birlik Organize Sanayi Bölgesi (BOSB) 4. Cad. No: 18 Tuzla / İSTANBUL",
    city: "İstanbul / Tuzla",
    phone: "+90 216 593 30 40",
    email: "servis@marmaracnc.com",
    website: "https://marmaracnc.com",
    managerName: "Hakan Marmara",
    managerTitle: "Mekatronik Mühendisi / Servis Koordinatörü",
    managerPhone: "0532 500 60 70",
    managerEmail: "hakan@marmaracnc.com",
    mainWarehouse: "Tuzla BOSB Ağır Ekipman Deposu",
    mainWorkshop: "Spindle ve Servo Motor Balans İstasyonu",
    rates: { light: 600, standard: 1100, heavy: 2200 },
    staff: [
      { name: "Serkan Taş", role: "Spindle & Mekanik Uzmanı", specialty: "Vidalı Mil & Boşluk Ayarı", phone: "0535 911 00 11", pin: "5566", vehiclePlate: "34 CNC 01 - Ford Transit Panelvan" },
      { name: "Onur Dağ", role: "Fanuc / Siemens CNC Uzmanı", specialty: "Servo Parametre & Sürücü Tamiri", phone: "0536 022 11 22", pin: "6677", vehiclePlate: "34 CNC 02 - Dacia Duster" }
    ],
    stock: [
      { code: "ENC-HEID", name: "Heidenhain ERN 1387 Açısal Döner Enkoder", qty: 3, price: 340, currency: "EUR", isImport: true },
      { code: "SRV-AMP", name: "Fanuc Alpha iSV Servo Güç Modülü 40A", qty: 2, price: 650, currency: "USD", isImport: true },
      { code: "RLM-SPND", name: "FAG 7014-C-2RSD Eksenel Eğik Bilyalı Rulman Çifti", qty: 4, price: 210, currency: "EUR", isImport: true },
      { code: "SNS-PROX", name: "Omron M12 Endüktif Yaklaşım Sensörü", qty: 15, price: 35, currency: "USD", isImport: true },
      { code: "OIL-WAY68", name: "Mobil Vactra No:2 Kızak Yağı (20 Litre Teneke)", qty: 6, price: 2600, currency: "TRY", isImport: false },
      { code: "KAB-SRV", name: "Igus Chainflex Yüksek Esnek Servo Güç Kablosu (25m)", qty: 5, price: 110, currency: "EUR", isImport: true }
    ]
  },
  bilisim_elektronik: {
    name: "Nova Bilişim & Güvenlik",
    legalName: "Nova Bilişim İletişim Güvenlik ve Ağ Sistemleri Ltd. Şti.",
    industry: "Ağ Altyapısı, Sunucu, UPS & IP Kamera Sistemleri",
    taxOffice: "Mecidiyeköy Vergi Dairesi",
    taxId: "7729103842",
    billingAddress: "Perpa Ticaret Merkezi B Blok Kat: 8 No: 1102 Şişli / İSTANBUL",
    city: "İstanbul / Şişli",
    phone: "+90 212 222 30 40",
    email: "destek@novabilisim.com",
    website: "https://novabilisim.com",
    managerName: "Tolga Nova",
    managerTitle: "Bilgisayar Mühendisi / IT Direktörü",
    managerPhone: "0533 800 90 00",
    managerEmail: "tolga@novabilisim.com",
    mainWarehouse: "Perpa Merkez Depo",
    mainWorkshop: "Ağ & Donanım Test Laboratuvarı",
    rates: { light: 400, standard: 750, heavy: 1400 },
    staff: [
      { name: "Batuhan Şen", role: "Ağ & Sistem Uzmanı", specialty: "Cisco Switch & Fiber Sonlandırma", phone: "0537 111 22 33", pin: "7788", vehiclePlate: "34 IT 101 - Fiat Doblo" },
      { name: "Can Polat", role: "Güvenlik & UPS Teknikeri", specialty: "IP Kamera & Akü Grubu", phone: "0538 222 33 44", pin: "8899", vehiclePlate: "34 IT 202 - Fiat Fiorino" }
    ],
    stock: [
      { code: "SWT-POE", name: "D-Link 24 Port Gigabit Smart Managed PoE Switch", qty: 4, price: 240, currency: "USD", isImport: true },
      { code: "CAM-HIK", name: "Hikvision 4MP DarkFighter IP Dome Kamera", qty: 12, price: 85, currency: "USD", isImport: true },
      { code: "BAT-12V7A", name: "Yuasa 12V 7Ah UPS Bakımsız Kuru Akü", qty: 24, price: 420, currency: "TRY", isImport: false },
      { code: "SSD-1TB", name: "Samsung 870 EVO 1TB SATA Kurumsal SSD", qty: 8, price: 95, currency: "USD", isImport: true },
      { code: "KAB-CAT6", name: "HCS 23AWG LSOH Katı Bakır Cat6 Kablo (305m Kutu)", qty: 6, price: 3400, currency: "TRY", isImport: false },
      { code: "PWR-12V10A", name: "Kamera Sistemi 12V 10A Metal Kasa Güç Kaynağı", qty: 10, price: 380, currency: "TRY", isImport: false }
    ]
  },
  kombi_beyazesya: {
    name: "Anadolu Isıtma & Kombi Servisi",
    legalName: "Anadolu Isı Sistemleri ve Kombi Teknik Servis Hizmetleri Ltd.",
    industry: "Kombi, Brülör, Sirkülasyon Pompası & Beyaz Eşya",
    taxOffice: "Karatay Vergi Dairesi",
    taxId: "4920192837",
    billingAddress: "Fevzi Çakmak Mah. 10420 Sk. No: 12 Karatay / KONYA",
    city: "Konya / Karatay",
    phone: "+90 332 345 60 70",
    email: "servis@anadolukombi.com",
    website: "https://anadolukombi.com",
    managerName: "Mustafa Anadolu",
    managerTitle: "Isı Teknikeri / Servis Yöneticisi",
    managerPhone: "0532 700 80 90",
    managerEmail: "mustafa@anadolukombi.com",
    mainWarehouse: "Konya 1. OSB Parça Ambarı",
    mainWorkshop: "Kombi Kart ve Pompa Revizyon Atölyesi",
    rates: { light: 350, standard: 650, heavy: 1200 },
    staff: [
      { name: "Ali Yücel", role: "Kombi Kart & Yanma Uzmanı", specialty: "Gaz Valfi & NTC Sensörler", phone: "0539 333 44 55", pin: "9900", vehiclePlate: "42 KMB 01 - Doblo Maxi" },
      { name: "Kemal Uçar", role: "Tesisat & Pompa Teknikeri", specialty: "Genleşme Tankı & Sirkülasyon", phone: "0540 444 55 66", pin: "0011", vehiclePlate: "42 KMB 02 - Renault Express" }
    ],
    stock: [
      { code: "PMP-GRUND", name: "Grundfos 15-50 Kombi Sirkülasyon Pompası", qty: 8, price: 85, currency: "EUR", isImport: true },
      { code: "VLF-SIT", name: "SIT 845 SIGMA Kombi Modülasyonlu Gaz Valfi", qty: 6, price: 65, currency: "EUR", isImport: true },
      { code: "ESN-PLK", name: "Zilmet 14 Plakalı Paslanmaz Çelik Sekonder Eşanjör", qty: 10, price: 42, currency: "EUR", isImport: true },
      { code: "TNK-8LT", name: "8 Litre Yuvarlak Kombi Genleşme Tankı 3/8", qty: 7, price: 850, currency: "TRY", isImport: false },
      { code: "SNS-NTC", name: "Daldırma / Klipsli NTC Sıcaklık Sensörü 10k", qty: 30, price: 85, currency: "TRY", isImport: false },
      { code: "TRB-AKIS", name: "Hall Sensörlü Kombi Akış Türbini / Şalteri", qty: 15, price: 210, currency: "TRY", isImport: false }
    ]
  }
};

let wizardCurrentStep = 1;
let wizardSelectedSector = "endustriyel_otomasyon";
let wizardTechList = [];
let wizardStockList = [];

function getStoredCompanyProfile() {
  try {
    const raw = localStorage.getItem('servisai_company_profile');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return defaultCompanyProfile;
}

function saveStoredCompanyProfile(profile) {
  try {
    localStorage.setItem('servisai_company_profile', JSON.stringify(profile));
  } catch (e) {}
}

function applyCompanyProfile(profile) {
  state.companyProfile = profile;
  saveStoredCompanyProfile(profile);

  // 1. Header Şirket ve Yönetici İsimleri
  const elHdrTenant = document.getElementById('header-tenant-name');
  if (elHdrTenant) elHdrTenant.textContent = profile.name || profile.legalName;

  const elHdrUser = document.getElementById('header-user-name');
  if (elHdrUser && profile.managerName) {
    elHdrUser.textContent = `${profile.managerName} (${profile.managerTitle || 'Yönetici'})`;
  }

  const elCurTenant = document.getElementById('tenant-current-title');
  if (elCurTenant) elCurTenant.textContent = profile.legalName || profile.name;

  // 2. Şirket Fatura Kartı (Teknisyen Dış Harcama Ekranı)
  const elBillLegal = document.getElementById('billing-card-legal-name');
  if (elBillLegal) elBillLegal.textContent = profile.legalName || profile.name;

  const elBillTaxOffice = document.getElementById('billing-card-tax-office');
  if (elBillTaxOffice) elBillTaxOffice.textContent = profile.taxOffice || 'Belirtilmedi';

  const elBillTaxId = document.getElementById('billing-card-tax-id');
  if (elBillTaxId) elBillTaxId.textContent = profile.taxId || '—';

  const elBillAddr = document.getElementById('billing-card-address');
  if (elBillAddr) elBillAddr.textContent = profile.billingAddress || profile.city || '—';

  const elBillEmail = document.getElementById('billing-card-email');
  if (elBillEmail) elBillEmail.textContent = profile.email || '—';

  const elBillPhone = document.getElementById('billing-card-phone');
  if (elBillPhone) elBillPhone.textContent = profile.phone || '—';

  // 3. Multi-Tenant SaaS Kaydına Senkronize Et
  try {
    const tenants = getStoredTenants();
    const existing = tenants.find(t => t.name === profile.legalName || t.name === profile.name);
    if (existing) {
      existing.name = profile.legalName || profile.name;
      existing.shortName = profile.name;
      existing.industry = profile.industry;
      existing.vkn = profile.taxId;
      existing.city = profile.city;
      existing.isActive = true;
    } else {
      tenants.push({
        id: Date.now(),
        name: profile.legalName || profile.name,
        shortName: profile.name,
        industry: profile.industry,
        plan: "Kurumsal SaaS (Limitsiz)",
        vkn: profile.taxId,
        city: profile.city,
        isActive: true
      });
    }
    // Diğerlerini pasif yap
    tenants.forEach(t => {
      if (t.name !== (profile.legalName || profile.name)) t.isActive = false;
    });
    saveStoredTenants(tenants);
    if (typeof renderTenantList === 'function') renderTenantList();
  } catch (e) {}

  // 4. Sevk Masası ve Üst Bilgileri Tazele
  if (typeof updateStaffProfileUI === 'function') updateStaffProfileUI();
}

function initCompanyBillingCardEngine() {
  const modal = document.getElementById('company-billing-info-modal');
  const btnHeader = document.getElementById('btn-tech-show-billing-card');
  const btnLocal = document.getElementById('btn-local-parts-billing-card');
  const btnExpense = document.getElementById('btn-expense-show-billing-card');
  const btnClose = document.getElementById('btn-close-billing-card-modal');
  const btnCloseAlt = document.getElementById('btn-close-billing-card-modal-alt');
  const btnCopy = document.getElementById('btn-copy-billing-info');
  const btnWhatsApp = document.getElementById('btn-whatsapp-billing-info');
  const btnPrint = document.getElementById('btn-print-billing-card');
  const btnEdit = document.getElementById('btn-open-wizard-from-billing');

  function openBillingModal() {
    const profile = state.companyProfile || getStoredCompanyProfile();
    applyCompanyProfile(profile);
    if (modal) modal.style.display = 'flex';
  }

  function closeBillingModal() {
    if (modal) modal.style.display = 'none';
  }

  if (btnHeader) btnHeader.addEventListener('click', openBillingModal);
  if (btnLocal) btnLocal.addEventListener('click', openBillingModal);
  if (btnExpense) btnExpense.addEventListener('click', openBillingModal);
  if (btnClose) btnClose.addEventListener('click', closeBillingModal);
  if (btnCloseAlt) btnCloseAlt.addEventListener('click', closeBillingModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBillingModal();
    });
  }

  // Fatura Metnini Panoya Kopyalama
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const profile = state.companyProfile || getStoredCompanyProfile();
      const text = 
`========================================
🏢 RESMİ ŞİRKET FATURA BİLGİLERİMİZ
========================================
Firma Ünvanı : ${profile.legalName || profile.name}
Vergi Dairesi: ${profile.taxOffice}
VKN / TCKN   : ${profile.taxId}
Fatura Adresi: ${profile.billingAddress}
E-Posta      : ${profile.email}
Telefon      : ${profile.phone}
========================================
* Lütfen e-Fatura / e-Arşiv faturanızı yukarıdaki resmi şirket bilgilerimize göre tanzim ediniz.`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('📋 Fatura bilgileri panoya kopyalandı! Satıcıya veya mesaja yapıştırabilirsiniz.', 'success');
        }).catch(() => {
          fallbackCopyText(text);
        });
      } else {
        fallbackCopyText(text);
      }
    });
  }

  // WhatsApp ile Satıcıya Gönder
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
      const profile = state.companyProfile || getStoredCompanyProfile();
      const text = 
`*RESMİ ŞİRKET FATURA BİLGİLERİMİZ:*
🏢 *Ünvan:* ${profile.legalName || profile.name}
🏛️ *Vergi Dairesi:* ${profile.taxOffice}
🔢 *VKN:* ${profile.taxId}
📍 *Adres:* ${profile.billingAddress}
✉️ *E-Posta:* ${profile.email}
📞 *Tel:* ${profile.phone}

_Lütfen e-Fatura / e-Arşiv faturanızı bu bilgilere göre düzenleyiniz._`;

      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      showToast('💬 WhatsApp açılıyor...', 'info');
    });
  }

  // Fatura Kartı Yazdırma
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      document.body.classList.add('printing-billing-card');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-billing-card');
      }, 1000);
    });
  }

  // Bilgileri Düzenleme (Sihirbaza Geç)
  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      closeBillingModal();
      openOnboardingWizard(2); // 2. Adıma (Fatura & Vergi) doğrudan git
    });
  }
}

function fallbackCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('📋 Fatura bilgileri panoya kopyalandı!', 'success');
  } catch (err) {
    showToast('⚠️ Kopyalama başarısız oldu.', 'warning');
  }
  document.body.removeChild(ta);
}

// ==========================================================================
// KURULUM SİHİRBAZI FONKSİYONLARI
// ==========================================================================

function initOnboardingWizardEngine() {
  const modal = document.getElementById('onboarding-wizard-modal');
  const btnOpen = document.getElementById('btn-open-onboarding-wizard');
  const btnClose = document.getElementById('btn-close-wizard-modal');
  const btnCancel = document.getElementById('btn-wizard-cancel');
  const btnNext = document.getElementById('btn-wizard-next');
  const btnPrev = document.getElementById('btn-wizard-prev');
  const btnFinish = document.getElementById('btn-wizard-finish');
  const btnPrefill = document.getElementById('btn-wizard-prefill-sector');
  const btnSampleTech = document.getElementById('btn-wizard-sample-tech');
  const btnAddTechRow = document.getElementById('btn-wizard-add-tech-row');
  const btnLoadSectorStock = document.getElementById('btn-wizard-load-sector-stock');
  const btnAddStockRow = document.getElementById('btn-wizard-add-stock-row');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      openOnboardingWizard(1);
    });
  }

  // Demo rehberi içindeki buton da bağlansın
  const btnDemoWizard = document.getElementById('btn-demo-open-wizard');
  if (btnDemoWizard) {
    btnDemoWizard.addEventListener('click', () => {
      const demoModal = document.getElementById('demo-guide-modal');
      if (demoModal) demoModal.style.display = 'none';
      openOnboardingWizard(1);
    });
  }

  function closeWizard() {
    if (modal) modal.style.display = 'none';
  }

  if (btnClose) btnClose.addEventListener('click', closeWizard);
  if (btnCancel) btnCancel.addEventListener('click', closeWizard);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeWizard();
    });
  }

  // İleri / Geri Butonları
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (wizardCurrentStep < 7) {
        goToWizardStep(wizardCurrentStep + 1);
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (wizardCurrentStep > 1) {
        goToWizardStep(wizardCurrentStep - 1);
      }
    });
  }

  // Adım Rozetlerine Tıklama
  const stepNodes = document.querySelectorAll('.wizard-step-node');
  stepNodes.forEach(node => {
    node.addEventListener('click', () => {
      const step = parseInt(node.getAttribute('data-step'), 10);
      if (step) goToWizardStep(step);
    });
  });

  // Sektör Kartı Seçimi
  const sectorCards = document.querySelectorAll('.wizard-sector-card');
  sectorCards.forEach(card => {
    card.addEventListener('click', () => {
      sectorCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      wizardSelectedSector = card.getAttribute('data-sector') || 'endustriyel_otomasyon';
      prefillSectorData(wizardSelectedSector, false);
    });
  });

  // Sektörel Doldurma Butonu
  if (btnPrefill) {
    btnPrefill.addEventListener('click', () => {
      prefillSectorData(wizardSelectedSector, true);
      showToast(`⚡ '${wizardSelectedSector}' sektör bilgileri forma dolduruldu!`, 'info');
    });
  }

  // Teknisyen İşlemleri
  if (btnSampleTech) {
    btnSampleTech.addEventListener('click', () => {
      const tmpl = SECTOR_TEMPLATES[wizardSelectedSector] || SECTOR_TEMPLATES.endustriyel_otomasyon;
      wizardTechList = JSON.parse(JSON.stringify(tmpl.staff));
      renderWizardTechTable();
      showToast('⚡ Örnek 3 teknisyen eklendi!', 'info');
    });
  }

  if (btnAddTechRow) {
    btnAddTechRow.addEventListener('click', () => {
      wizardTechList.push({
        name: "Yeni Teknisyen",
        role: "Saha Teknisyeni",
        specialty: "Genel Bakım",
        phone: "0530 000 00 00",
        pin: "1234",
        vehiclePlate: "34 YEN 01 - Doblo"
      });
      renderWizardTechTable();
    });
  }

  // Stok İşlemleri
  if (btnLoadSectorStock) {
    btnLoadSectorStock.addEventListener('click', () => {
      const tmpl = SECTOR_TEMPLATES[wizardSelectedSector] || SECTOR_TEMPLATES.endustriyel_otomasyon;
      wizardStockList = JSON.parse(JSON.stringify(tmpl.stock));
      renderWizardStockTable();
      showToast('⚡ Sektörel hazır parça paketi yüklendi!', 'info');
    });
  }

  if (btnAddStockRow) {
    btnAddStockRow.addEventListener('click', () => {
      wizardStockList.push({
        code: "PRC-" + Math.floor(100 + Math.random() * 900),
        name: "Yeni Yedek Parça Kalemi",
        qty: 10,
        price: 250,
        currency: "TRY",
        isImport: false
      });
      renderWizardStockTable();
    });
  }

  // Sihirbazı Bitirme ve Sistemi Başlatma
  if (btnFinish) {
    btnFinish.addEventListener('click', finishAndLaunchSystem);
  }
}

function openOnboardingWizard(step = 1) {
  const modal = document.getElementById('onboarding-wizard-modal');
  if (!modal) return;

  // Mevcut profili al veya varsayılanı doldur
  const cur = state.companyProfile || getStoredCompanyProfile();
  wizardSelectedSector = cur.sectorKey || 'endustriyel_otomasyon';

  // Formları doldur
  setVal('wizard-company-name', cur.name || 'Koçaş Teknik Servis');
  setVal('wizard-company-city', cur.city || 'Bursa / Nilüfer');
  setVal('wizard-company-phone', cur.phone || '+90 224 441 00 24');
  setVal('wizard-company-email', cur.email || 'info@kocasteknik.com');
  setVal('wizard-company-website', cur.website || 'https://kocasteknik.com');

  setVal('wizard-legal-name', cur.legalName || 'Koçaş Endüstriyel Elektronik ve Otomasyon Sistemleri San. ve Tic. A.Ş.');
  setVal('wizard-tax-office', cur.taxOffice || 'Nilüfer Vergi Dairesi');
  setVal('wizard-tax-id', cur.taxId || '5760129841');
  setVal('wizard-billing-address', cur.billingAddress || 'Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA');
  setVal('wizard-trade-reg-no', cur.tradeRegNo || 'Bursa Tic. Sicil #98241');
  setVal('wizard-mersis-no', cur.mersisNo || '0576012984100018');
  setVal('wizard-efatura-scenario', cur.efaturaScenario || 'Ticari Fatura (UBL-TR 2.1)');

  setVal('wizard-manager-name', cur.managerName || 'Zafer Koçaş');
  setVal('wizard-manager-title', cur.managerTitle || 'Elektronik ve Haberleşme Mühendisi / Firma Sahibi');
  setVal('wizard-manager-phone', cur.managerPhone || '0532 999 88 77');
  setVal('wizard-manager-email', cur.managerEmail || 'zafer@kocasteknik.com');
  setVal('wizard-manager-pin', cur.managerPin || '1234');

  setVal('wizard-main-warehouse', cur.mainWarehouse || 'Bursa Merkez Depo (DOSAB)');
  setVal('wizard-main-workshop', cur.mainWorkshop || 'Elektronik ve Kart Test Laboratuvarı');

  // Teknisyen ve Parça Listelerini Doldur
  const tmpl = SECTOR_TEMPLATES[wizardSelectedSector] || SECTOR_TEMPLATES.endustriyel_otomasyon;
  wizardTechList = JSON.parse(JSON.stringify(tmpl.staff));
  wizardStockList = JSON.parse(JSON.stringify(tmpl.stock));

  renderWizardTechTable();
  renderWizardStockTable();

  // Sektör kartını seç
  const sectorCards = document.querySelectorAll('.wizard-sector-card');
  sectorCards.forEach(c => {
    if (c.getAttribute('data-sector') === wizardSelectedSector) {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  });

  goToWizardStep(step);
  modal.style.display = 'flex';
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function goToWizardStep(step) {
  wizardCurrentStep = step;

  // Panelleri Aç/Kapat
  for (let i = 1; i <= 7; i++) {
    const pane = document.getElementById(`wizard-pane-${i}`);
    const node = document.getElementById(`wizard-step-node-${i}`);
    if (pane) pane.style.display = (i === step) ? 'block' : 'none';
    if (node) {
      if (i === step) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
      if (i < step) {
        node.classList.add('completed');
      } else {
        node.classList.remove('completed');
      }
    }
  }

  // Buton Görünürlükleri
  const btnPrev = document.getElementById('btn-wizard-prev');
  const btnNext = document.getElementById('btn-wizard-next');
  const btnFinish = document.getElementById('btn-wizard-finish');

  if (btnPrev) btnPrev.style.display = (step > 1) ? 'inline-block' : 'none';
  if (btnNext) btnNext.style.display = (step < 7) ? 'inline-block' : 'none';
  if (btnFinish) btnFinish.style.display = (step === 7) ? 'inline-block' : 'none';

  // 7. Adımda Canlı Özeti Güncelle
  if (step === 7) {
    updateWizardSummary();
  }
}

function prefillSectorData(sectorKey, forceOverwrite = false) {
  const tmpl = SECTOR_TEMPLATES[sectorKey];
  if (!tmpl) return;

  if (forceOverwrite) {
    setVal('wizard-company-name', tmpl.name);
    setVal('wizard-legal-name', tmpl.legalName);
    setVal('wizard-company-city', tmpl.city);
    setVal('wizard-tax-office', tmpl.taxOffice);
    setVal('wizard-tax-id', tmpl.taxId);
    setVal('wizard-billing-address', tmpl.billingAddress);
    setVal('wizard-company-phone', tmpl.phone);
    setVal('wizard-company-email', tmpl.email);
    setVal('wizard-company-website', tmpl.website);
    setVal('wizard-manager-name', tmpl.managerName);
    setVal('wizard-manager-title', tmpl.managerTitle);
    setVal('wizard-manager-phone', tmpl.managerPhone);
    setVal('wizard-manager-email', tmpl.managerEmail);
    setVal('wizard-main-warehouse', tmpl.mainWarehouse);
    setVal('wizard-main-workshop', tmpl.mainWorkshop);

    if (tmpl.rates) {
      setVal('wizard-rate-light', tmpl.rates.light);
      setVal('wizard-rate-standard', tmpl.rates.standard);
      setVal('wizard-rate-heavy', tmpl.rates.heavy);
    }

    wizardTechList = JSON.parse(JSON.stringify(tmpl.staff));
    wizardStockList = JSON.parse(JSON.stringify(tmpl.stock));
    renderWizardTechTable();
    renderWizardStockTable();
  }
}

function renderWizardTechTable() {
  const tbody = document.getElementById('wizard-tech-tbody');
  if (!tbody) return;

  let html = '';
  wizardTechList.forEach((tech, idx) => {
    html += `
      <tr>
        <td>
          <input type="text" class="form-input form-input-sm" value="${escapeHtml(tech.name)}" onchange="updateWizardTech(${idx}, 'name', this.value)">
        </td>
        <td>
          <input type="text" class="form-input form-input-sm" value="${escapeHtml(tech.specialty || tech.role)}" onchange="updateWizardTech(${idx}, 'specialty', this.value)">
        </td>
        <td>
          <input type="text" class="form-input form-input-sm" value="${escapeHtml(tech.phone || '')}" onchange="updateWizardTech(${idx}, 'phone', this.value)">
        </td>
        <td>
          <input type="text" class="form-input form-input-sm" style="text-align: center; font-weight: 700; color: #34d399;" value="${escapeHtml(tech.pin || '1234')}" maxlength="4" onchange="updateWizardTech(${idx}, 'pin', this.value)">
        </td>
        <td>
          <input type="text" class="form-input form-input-sm" value="${escapeHtml(tech.vehiclePlate || '')}" onchange="updateWizardTech(${idx}, 'vehiclePlate', this.value)">
        </td>
        <td style="text-align: right;">
          <button type="button" class="btn btn-xs btn-outline-danger" onclick="deleteWizardTech(${idx})">✕</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

window.updateWizardTech = function(idx, field, val) {
  if (wizardTechList[idx]) {
    wizardTechList[idx][field] = val;
  }
};

window.deleteWizardTech = function(idx) {
  wizardTechList.splice(idx, 1);
  renderWizardTechTable();
};

function renderWizardStockTable() {
  const tbody = document.getElementById('wizard-stock-tbody');
  if (!tbody) return;

  let html = '';
  wizardStockList.forEach((stk, idx) => {
    html += `
      <tr>
        <td>
          <input type="text" class="form-input form-input-sm" style="font-family: monospace; font-size: 0.76rem;" value="${escapeHtml(stk.code)}" onchange="updateWizardStock(${idx}, 'code', this.value)">
        </td>
        <td>
          <input type="text" class="form-input form-input-sm" value="${escapeHtml(stk.name)}" onchange="updateWizardStock(${idx}, 'name', this.value)">
        </td>
        <td>
          <input type="number" class="form-input form-input-sm" value="${stk.qty}" min="1" onchange="updateWizardStock(${idx}, 'qty', parseInt(this.value, 10))">
        </td>
        <td>
          <input type="number" class="form-input form-input-sm" value="${stk.price}" min="1" onchange="updateWizardStock(${idx}, 'price', parseFloat(this.value))">
        </td>
        <td>
          <select class="form-select form-select-sm" onchange="updateWizardStock(${idx}, 'currency', this.value)">
            <option value="TRY" ${stk.currency === 'TRY' ? 'selected' : ''}>TRY (₺)</option>
            <option value="USD" ${stk.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
            <option value="EUR" ${stk.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
          </select>
        </td>
        <td style="text-align: right;">
          <button type="button" class="btn btn-xs btn-outline-danger" onclick="deleteWizardStock(${idx})">✕</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

window.updateWizardStock = function(idx, field, val) {
  if (wizardStockList[idx]) {
    wizardStockList[idx][field] = val;
  }
};

window.deleteWizardStock = function(idx) {
  wizardStockList.splice(idx, 1);
  renderWizardStockTable();
};

function updateWizardSummary() {
  const compName = getVal('wizard-company-name') || 'Şirketiniz';
  const legName = getVal('wizard-legal-name') || compName;
  const vkn = getVal('wizard-tax-id') || '—';
  const taxOff = getVal('wizard-tax-office') || '—';
  const addr = getVal('wizard-billing-address') || getVal('wizard-company-city') || '—';
  const manager = getVal('wizard-manager-name') || 'Yönetici';
  const stdRate = getVal('wizard-rate-standard') || '850';

  const elC = document.getElementById('summary-company-title');
  if (elC) elC.textContent = compName;

  const elL = document.getElementById('summary-legal-title');
  if (elL) elL.textContent = legName;

  const elV = document.getElementById('summary-vkn');
  if (elV) elV.textContent = vkn;

  const elT = document.getElementById('summary-tax-office');
  if (elT) elT.textContent = taxOff;

  const elA = document.getElementById('summary-address');
  if (elA) elA.textContent = addr;

  const elM = document.getElementById('summary-manager');
  if (elM) elM.textContent = manager;

  const elTc = document.getElementById('summary-tech-count');
  if (elTc) elTc.textContent = `${wizardTechList.length} Teknisyen`;

  const elVc = document.getElementById('summary-vehicle-count');
  if (elVc) elVc.textContent = `${wizardTechList.filter(t => t.vehiclePlate).length} Araç`;

  const elSc = document.getElementById('summary-stock-count');
  if (elSc) elSc.textContent = `${wizardStockList.length} Kalem Parça`;

  const elR = document.getElementById('summary-rate');
  if (elR) elR.textContent = `${stdRate} ₺`;
}

function finishAndLaunchSystem() {
  const profile = {
    name: getVal('wizard-company-name') || 'Teknik Servis',
    legalName: getVal('wizard-legal-name') || getVal('wizard-company-name') || 'Teknik Servis San. ve Tic. A.Ş.',
    industry: (SECTOR_TEMPLATES[wizardSelectedSector] && SECTOR_TEMPLATES[wizardSelectedSector].industry) || 'Endüstriyel Teknik Servis',
    sectorKey: wizardSelectedSector,
    taxOffice: getVal('wizard-tax-office') || 'Merkez Vergi Dairesi',
    taxId: getVal('wizard-tax-id') || '1111111111',
    billingAddress: getVal('wizard-billing-address') || getVal('wizard-company-city') || 'Merkez Adres',
    city: getVal('wizard-company-city') || 'İstanbul',
    phone: getVal('wizard-company-phone') || '0850 000 00 00',
    email: getVal('wizard-company-email') || 'info@servis.com',
    website: getVal('wizard-company-website') || 'https://servis.com',
    tradeRegNo: getVal('wizard-trade-reg-no') || '',
    mersisNo: getVal('wizard-mersis-no') || '',
    efaturaScenario: getVal('wizard-efatura-scenario') || 'Ticari Fatura (UBL-TR 2.1)',
    managerName: getVal('wizard-manager-name') || 'Firma Sorumlusu',
    managerTitle: getVal('wizard-manager-title') || 'Yönetici',
    managerPhone: getVal('wizard-manager-phone') || '',
    managerEmail: getVal('wizard-manager-email') || 'yonetici@servis.com',
    managerPin: getVal('wizard-manager-pin') || '1234',
    mainWarehouse: getVal('wizard-main-warehouse') || 'Merkez Depo',
    mainWorkshop: getVal('wizard-main-workshop') || 'Merkez Atölye'
  };

  // 1. Şirket Profilini Uygula & Fatura Bilgilerini Bağla
  applyCompanyProfile(profile);

  // 2. Teknisyenleri Kadroya Aktar (Eğer girildiyse)
  if (wizardTechList.length > 0) {
    const updatedStaff = wizardTechList.map((t, idx) => ({
      id: 100 + idx,
      name: t.name,
      role: t.role || 'Saha Teknisyeni',
      specialty: t.specialty || 'Arıza Müdahale',
      status: 'Müsait',
      location: profile.city,
      vehiclePlate: t.vehiclePlate || `34 PLK 0${idx+1}`,
      avatar: t.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      distanceKm: 5.0 + idx * 4,
      phone: t.phone || '',
      pin: t.pin || '1234'
    }));

    state.staff = updatedStaff;
    if (typeof updateStaffProfileUI === 'function') updateStaffProfileUI();
  }

  // 3. Stok Envanterini Aktar (Eğer parça varsa)
  if (wizardStockList.length > 0) {
    const rates = state.exchangeRates || { USD: 38.50, EUR: 41.20 };
    const newStock = wizardStockList.map((s, idx) => {
      let finalPrice = s.price;
      let exRate = 1.0;
      if (s.currency === 'USD') {
        exRate = rates.USD || 38.50;
        finalPrice = s.price * exRate;
      } else if (s.currency === 'EUR') {
        exRate = rates.EUR || 41.20;
        finalPrice = s.price * exRate;
      }
      return {
        id: 'STK-' + (idx + 1),
        code: s.code,
        name: s.name,
        category: profile.industry.split(',')[0],
        total_quantity: s.qty,
        main_warehouse_qty: Math.floor(s.qty * 0.6),
        workshop_qty: Math.floor(s.qty * 0.2),
        vehicles_qty: Math.floor(s.qty * 0.2),
        unit_price_tl: finalPrice,
        price: finalPrice,
        originalPrice: s.price,
        currency: s.currency || 'TRY',
        exchangeRate: exRate,
        isImport: s.currency !== 'TRY',
        critical_threshold: 3,
        warranty_months: 12
      };
    });

    state.stock = newStock;
    try {
      localStorage.setItem('servisai_stock', JSON.stringify(newStock));
    } catch (e) {}
    if (typeof renderStockTable === 'function') renderStockTable();
  }

  // 4. Servis Tarifelerini Uygula
  const lightRate = parseFloat(getVal('wizard-rate-light')) || 450;
  const standardRate = parseFloat(getVal('wizard-rate-standard')) || 850;
  const heavyRate = parseFloat(getVal('wizard-rate-heavy')) || 1600;

  if (state.serviceRates) {
    const r1 = state.serviceRates.find(r => r.id === 'light');
    if (r1) r1.amount = lightRate;
    const r2 = state.serviceRates.find(r => r.id === 'standard');
    if (r2) r2.amount = standardRate;
    const r3 = state.serviceRates.find(r => r.id === 'heavy');
    if (r3) r3.amount = heavyRate;
    try {
      localStorage.setItem('servisai_service_rates', JSON.stringify(state.serviceRates));
    } catch (e) {}
    if (typeof renderLaborPresets === 'function') renderLaborPresets();
  }

  // Sihirbazı Kapat
  const modal = document.getElementById('onboarding-wizard-modal');
  if (modal) modal.style.display = 'none';

  // Tebrik ve Bildirim
  showToast(`🎉 Tebrikler! '${profile.name}' başarıyla kuruldu ve şirket fatura kartınız sahada kullanıma hazır!`, 'success');
}

// Window exportları
window.initCompanyBillingCardEngine = initCompanyBillingCardEngine;
window.initOnboardingWizardEngine = initOnboardingWizardEngine;
window.openOnboardingWizard = openOnboardingWizard;
window.applyCompanyProfile = applyCompanyProfile;
"""

with open('Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'r', encoding='utf-8') as f:
    orig = f.read()

# 1. DOMContentLoaded icine motor cagrilari ekleme
needle_init = "initMultiTenantSaaSEngine();"
if needle_init in orig and "initOnboardingWizardEngine();" not in orig:
    replacement = needle_init + "\n  initCompanyBillingCardEngine();\n  initOnboardingWizardEngine();"
    orig = orig.replace(needle_init, replacement, 1)
    print("Added inits to DOMContentLoaded!")

# 2. Kodun sonuna ekleme
if "29. KURULUM SİHİRBAZI" not in orig:
    orig = orig + "\n" + js_code
    print("Appended wizard code to app.js!")

with open('Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'w', encoding='utf-8') as f:
    f.write(orig)

print("Saved app.js successfully!")

