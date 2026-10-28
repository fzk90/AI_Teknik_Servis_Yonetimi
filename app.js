/**
 * ServisAI - Modern Interactive Prototype Logic
 * Multi-role: Admin / Technician / Customer
 */

// ==================== Backend API URL ====================
const API_BASE_URL = "http://127.0.0.1:8000";

// ==================== Global Utility Functions ====================
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
if (typeof window !== 'undefined') {
  window.escapeHtml = escapeHtml;
}

// ==================== State Management ====================
const state = {
  activeTab: 'admin-view',
  activeTechId: 2,
  equipmentRegistry: [],
  activeEquipmentFilter: 'all',
  equipmentSearchTerm: '',

  // Saha Personeli ve Konumlar (Tüm Türkiye & Şehirler Arası Çok Modlu Seyahat)
  staff: [
    {
      id: 2,
      name: "Murat Aydın",
      role: "Saha Mühendisi (Elektronik)",
      specialty: "Güç Elektroniği & Kart Tamiri",
      status: "Görevde",
      location: "İstanbul ➔ Ankara (TUSAŞ Savunma Sanayii)",
      vehiclePlate: "34 ABC 101",
      avatar: "MA",
      distanceKm: 448
    },
    {
      id: 3,
      name: "Caner Güler",
      role: "Kıdemli Tekniker",
      specialty: "Mekanik & İklimlendirme / Pompa",
      status: "Yolda",
      location: "İstanbul ➔ Bursa (Demirtaş OSB / Tofaş)",
      vehiclePlate: "34 DEF 202",
      avatar: "CG",
      distanceKm: 154
    },
    {
      id: 4,
      name: "Selin Kaya",
      role: "Otomasyon & PLC Mühendisi",
      specialty: "Sürücü Parametreleri & Yazılım",
      status: "Görevde",
      location: "İstanbul ➔ İzmir (Petkim Aliağa & Vestel City)",
      vehiclePlate: "THY-TK2320 (Uçak)",
      avatar: "SK",
      distanceKm: 478
    },
    {
      id: 5,
      name: "Emre Yıldız",
      role: "Teknisyen",
      specialty: "Genel Donanım & Sensörler",
      status: "Yolda",
      location: "İstanbul ➔ Konya (Konya 1. OSB / Torku)",
      vehiclePlate: "YHT-9102 (Hızlı Tren)",
      avatar: "EY",
      distanceKm: 535
    },
    {
      id: 6,
      name: "Burak Koç",
      role: "Kıdemli Saha Mühendisi",
      specialty: "Havacılık Elektroniği & Sürücüler",
      status: "Görevde",
      location: "Ankara (OSTİM OSB / ASELSAN Güç Tesisleri)",
      vehiclePlate: "06 TUS 01",
      avatar: "BK",
      distanceKm: 18.2
    },
    {
      id: 7,
      name: "Deniz Arslan",
      role: "Otomasyon & PLC Uzmanı",
      specialty: "Sürücü & Servo Motor Sistemleri",
      status: "Görevde",
      location: "İzmir (Aliağa Petkim & Manisa OSB)",
      vehiclePlate: "35 EGE 35",
      avatar: "DA",
      distanceKm: 26.5
    },
    {
      id: 8,
      name: "Tolga Aksoy",
      role: "Mekanik & Robotik Teknikeri",
      specialty: "Hidrolik, Pompa & Robotik Kollar",
      status: "Müsait",
      location: "Bursa (Demirtaş OSB / Nilüfer)",
      vehiclePlate: "16 BRS 16",
      avatar: "TA",
      distanceKm: 8.4
    },
    {
      id: 9,
      name: "Ayşe Çetin",
      role: "Elektronik & Kart Mühendisi",
      specialty: "SMD & Endüstriyel Pano Kartları",
      status: "Görevde",
      location: "Gaziantep (4. OSB & Şanlıurfa)",
      vehiclePlate: "27 GZP 27",
      avatar: "AÇ",
      distanceKm: 34.0
    },
    {
      id: 11,
      name: "Kerem Demir",
      role: "İklimlendirme & Soğutma Mühendisi",
      specialty: "Chiller, VRF & Kompresör İnverteri",
      status: "Müsait",
      location: "Antalya (Serbest Bölge & Oteller)",
      vehiclePlate: "07 ANT 07",
      avatar: "KD",
      distanceKm: 12.0
    },
    {
      id: 12,
      name: "Levent İmekci",
      role: "Kıdemli Saha Servis Mühendisi",
      specialty: "Güç Elektroniği & Endüstriyel Sürücüler",
      status: "Görevde",
      location: "İstanbul (Maslak & Kağıthane)",
      baseAddress: "Kağıthane Merkez Mah. Ayazma Cad. No: 18, Kağıthane / İstanbul",
      vehiclePlate: "33 EKS 18",
      avatar: "Lİ",
      distanceKm: 14.5
    }
  ],

  // Servis Araçları Filosu & Toplu Taşıma / Uçuş Envanteri
  vehicles: [
    { id: 1, plate: "34 ABC 101", model: "Ford Transit Custom (2023)", type: "Mobil Atölye & Servis", driverId: 2, driverName: "Murat Aydın", status: "Sahada Aktif" },
    { id: 2, plate: "34 DEF 202", model: "Renault Trafic (2022)", type: "Mobil Servis & İklimlendirme", driverId: 3, driverName: "Caner Güler", status: "Sahada Aktif" },
    { id: 3, plate: "34 GHK 303", model: "Fiat Doblo Maxi (2024)", type: "Hafif Ticari & PLC Test", driverId: null, driverName: "Merkez Havuz", status: "Merkezde Hazır" },
    { id: 4, plate: "34 YTR 404", model: "Volkswagen Transporter (2023)", type: "Ağır Ekipman Nakil", driverId: null, driverName: "Merkez Havuz", status: "Merkezde Hazır" },
    { id: 5, plate: "06 TUS 01", model: "Toyota Hilux 4x4 (2023)", type: "Saha & Savunma Sanayi Servisi", driverId: 6, driverName: "Burak Koç", status: "Sahada Aktif" },
    { id: 6, plate: "35 EGE 35", model: "Ford Tourneo Custom (2024)", type: "Ege Bölge Mobil Servis", driverId: 7, driverName: "Deniz Arslan", status: "Sahada Aktif" },
    { id: 7, plate: "16 BRS 16", model: "Renault Kangoo Express (2023)", type: "Otomotiv Hızlı Müdahale", driverId: 8, driverName: "Tolga Aksoy", status: "Merkezde Hazır" },
    { id: 8, plate: "27 GZP 27", model: "Fiat Scudo Panelvan (2023)", type: "Güneydoğu Saha Servisi", driverId: 9, driverName: "Ayşe Çetin", status: "Sahada Aktif" },
    { id: 9, plate: "07 ANT 07", model: "Volkswagen Caddy (2024)", type: "Akdeniz İklimlendirme Aracı", driverId: 11, driverName: "Kerem Demir", status: "Merkezde Hazır" },
    { id: 10, plate: "THY-TK2320 (Uçak)", model: "Boeing 737-800 / THY Seferi", type: "Hava Yolu Seyahati", driverId: 4, driverName: "Selin Kaya", status: "Uçuşta (Havada)" },
    { id: 11, plate: "YHT-9102 (Hızlı Tren)", model: "Siemens Velaro TCDD Hızlı Tren", type: "Yüksek Hızlı Demiryolu", driverId: 5, driverName: "Emre Yıldız", status: "Seyir Halinde" },
    { id: 12, plate: "33 EKS 18", model: "Ford Transit Custom (2024)", type: "Mobil Servis & Teşhis Aracı", driverId: 12, driverName: "Levent İmekci", status: "Sahada Aktif" }
  ],

  // Sistem Yöneticileri & Profil Bilgileri
  managers: [
    { id: 1, name: "Zafer Koçaş", title: "Genel Müdür & Servis Direktörü", email: "zafer@kocasteknik.com", phone: "0532 210 00 00", role: "Süper Yönetici (Tüm Yetkiler)", status: "Aktif", avatar: "ZK" },
    { id: 10, name: "Ahmet Demir", title: "Operasyon & Sevk Müdürü", email: "ahmet@kocasteknik.com", phone: "0533 345 67 89", role: "Saha & Sevk Operasyon Sorumlusu", status: "Aktif", avatar: "AD" }
  ],
  currentManager: { id: 1, name: "Zafer Koçaş", title: "Genel Müdür & Servis Direktörü", email: "zafer@kocasteknik.com", phone: "0532 210 00 00", role: "Süper Yönetici (Tüm Yetkiler)", avatar: "ZK" },

  // Parça ve Çoklu Depo / Atölye / Araç Stok Matrisi
  stock: [
    { code: "IGBT-600V-40A", name: "600V 40A IGBT Güç Transistörü", category: "Yarı İletken & Güç", central: 45, workshop: 10, vehicle1: 2, vehicle2: 0, price: 450, warranty: "12 Ay" },
    { code: "KOND-470UF", name: "470uF 450V Düşük ESR Kondansatör", category: "Pasif & Trafo", central: 120, workshop: 25, vehicle1: 5, vehicle2: 8, price: 120, warranty: "6 Ay" },
    { code: "ROLE-24V-16A", name: "24V 16A Güç Rölesi", category: "Röle & Şalt", central: 60, workshop: 12, vehicle1: 3, vehicle2: 1, price: 180, warranty: "12 Ay" },
    { code: "SMD-OPTO-817", name: "PC817 Optokuplör Entegre", category: "Elektronik & Kart", central: 200, workshop: 40, vehicle1: 8, vehicle2: 12, price: 45, warranty: "12 Ay" },
    { code: "SENS-NTC-10K", name: "NTC 10K Sıcaklık Sensörü", category: "Sensör & Termal", central: 30, workshop: 8, vehicle1: 1, vehicle2: 4, price: 95, warranty: "6 Ay" },
    { code: "RULMAN-6204", name: "6204-2RS Yüksek Hızlı Rulman", category: "Mekanik & Rulman", central: 65, workshop: 15, vehicle1: 4, vehicle2: 2, price: 180, warranty: "12 Ay" },
    { code: "VENTIL-3YOL", name: "3 Yollu Vana Motoru 220V", category: "Mekanik & Rulman", central: 18, workshop: 6, vehicle1: 1, vehicle2: 0, price: 750, warranty: "12 Ay" },
    { code: "TERMOSTAT-K59", name: "K59 Otomatik Emniyet Termostatı", category: "Sensör & Termal", central: 40, workshop: 10, vehicle1: 0, vehicle2: 3, price: 140, warranty: "6 Ay" },
    { code: "SIGORTA-16A", name: "16A C Tipi Ray Otomat Sigorta", category: "Röle & Şalt", central: 85, workshop: 20, vehicle1: 6, vehicle2: 8, price: 85, warranty: "24 Ay" },
    { code: "FAN-KOND-10UF", name: "10uF 400V Motor Daimi Kondansatör", category: "Pasif & Trafo", central: 50, workshop: 14, vehicle1: 3, vehicle2: 2, price: 60, warranty: "12 Ay" },
    { code: "TRAFO-220-24", name: "220V/24V 5A Ray Tipi Güç Kaynağı", category: "Yarı İletken & Güç", central: 22, workshop: 5, vehicle1: 1, vehicle2: 1, price: 420, warranty: "12 Ay" },
    { code: "KLEMENS-WAGO", name: "3 Girişli Yaylı Klemens Paketi", category: "Röle & Şalt", central: 300, workshop: 80, vehicle1: 25, vehicle2: 30, price: 15, warranty: "24 Ay" }
  ],

  // Servis Yedek Parça Kategorileri (Özelleştirilebilir ve Yeni Eklenebilir)
  categories: [
    { id: "cat-1", name: "Yarı İletken & Güç", icon: "⚡", description: "IGBT, Tristör, Mosfet, Güç Kaynakları" },
    { id: "cat-2", name: "Pasif & Trafo", icon: "🔋", description: "Kondansatör, Direnç, Bobin, İzolasyon Trafosu" },
    { id: "cat-3", name: "Röle & Şalt", icon: "🔲", description: "Güç Rölesi, Kontaktör, Otomat Sigorta, Klemens" },
    { id: "cat-4", name: "Elektronik & Kart", icon: "💾", description: "Optokuplör, Mikrodenetleyici, SMD Devre Kartları" },
    { id: "cat-5", name: "Mekanik & Rulman", icon: "⚙️", description: "Rulman, Kayış, Vana, Pompa, Keçe" },
    { id: "cat-6", name: "Sensör & Termal", icon: "🌡️", description: "NTC, PT100, Termostat, Basınç Sensörü" },
    { id: "cat-7", name: "Genel Parça & Sarf", icon: "📦", description: "Kablo, Vida, Lehim, Termal Macun, Genel Sarf" }
  ],

  // Canlı Stok Filtre Durumu
  stockFilter: {
    search: "",
    category: "all",
    criticalOnly: false,
    locationView: "all"
  },

  // Periyodik Bakım ve Garanti Sözleşmeleri
  maintenance: [
    { 
      id: 1,
      customer: "Acıbadem Tıp Merkezi", 
      device: "Siemens Biyomedikal Güç Kaynağı", 
      serial_number: "SIE-BIO-2024-91",
      period: "3 Aylık", 
      dueDate: "24 Ekim 2026", 
      warranty: "12 Ay Servis & İşçilik Garantisi",
      warrantyEnd: "15 Ocak 2027",
      status: "Alarm: 3 Gün Kaldı" 
    },
    { 
      id: 2,
      customer: "Ekol Lojistik Depo", 
      device: "Endüstriyel Konveyör Motor Sürücüsü", 
      serial_number: "EKL-CNV-8820",
      period: "6 Aylık", 
      dueDate: "28 Ekim 2026", 
      warranty: "24 Ay Üretici / Fabrika Garantisi",
      warrantyEnd: "10 Ağustos 2027",
      status: "Planlandı" 
    },
    { 
      id: 3,
      customer: "Mega Tekstil Fabrikası", 
      device: "Kazan Otomasyon Kontrol Paneli", 
      serial_number: "MGA-KZN-4410",
      period: "Yıllık", 
      dueDate: "02 Kasım 2026", 
      warranty: "Sözleşmeli Özel Bakım & Parça Garantisi",
      warrantyEnd: "30 Ekim 2027",
      status: "Sözleşme Yenilendi" 
    }
  ],

  // Aktif İş Emri (#SRV-2026-104)
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
  },

  // Teknisyen Harcırah & Saha Masrafları (Yolculuk, Yemek, Su, Akaryakıt, Alınan Parçalar)
  technicianExpenses: [],

  // Stok Hareketleri (Yerel Parça Giriş-Çıkış ve Transfer Belgelendirmesi)
  stockMovements: [],

  // Hızlı Servis & İşçilik Tarifeleri (Ayarlar Menüsünden Yönetilir)
  serviceRates: [],

  // TCMB Canlı Döviz Kurları (Yedek Parça Fiyatlandırması)
  exchangeRates: {
    USD: 38.50,
    EUR: 41.20,
    TRY: 1.0,
    source: "TCMB (Türkiye Cumhuriyet Merkez Bankası)",
    lastUpdated: "27.10.2026 15:30"
  },

  // Tüm İş Emirleri ve Servis Çağrıları Kataloğu (Canlı & Çevrimdışı Senkron)
  workOrders: [
    {
      id: 106,
      tracking_code: "SRV-2026-106",
      code: "SRV-2026-106",
      channel: "Telefon",
      priority: "Yüksek",
      customer_name: "ABC Lojistik",
      customer_phone: "0216 444 8899",
      customer_address: "Kadıköy Rıhtım, İstanbul",
      device_brand: "Schneider Electric",
      device_model: "3-Faz İnverter Sürücü",
      device: "Schneider Electric 3-Faz İnverter Sürücü",
      serial_number: "SCH-2025-1104",
      customer_complaint: "[Telefon Çağrısı] Cihaz aşırı ısınıyor ve aşırı akım çekip korumaya geçiyor.",
      status: "Kabul Edildi",
      assigned_tech: null,
      assigned_user_id: null,
      labor_cost: 500,
      parts_cost: 0,
      total_cost: 500,
      created_at: new Date().toISOString()
    },
    {
      id: 104,
      tracking_code: "SRV-2026-104",
      code: "SRV-2026-104",
      channel: "Telefon",
      priority: "Normal",
      customer_name: "TermoTek Ltd.",
      customer_phone: "0532 999 1122",
      customer_address: "Kadıköy, İstanbul",
      device_brand: "Delta Electronics",
      device_model: "VFD-075 Sürücü Kartı",
      device: "Delta Electronics VFD-075 Sürücü Kartı",
      serial_number: "DLT-2024-99823",
      customer_complaint: "Cihaz giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor.",
      status: "Onarımda",
      assigned_tech: "Murat Aydın",
      assigned_user_id: 2,
      labor_cost: 600,
      parts_cost: 450,
      total_cost: 1050,
      created_at: "2026-10-21T09:30:00Z"
    },
    {
      id: 105,
      tracking_code: "SRV-2026-105",
      code: "SRV-2026-105",
      channel: "E-posta",
      priority: "Normal",
      customer_name: "Marmara Ambalaj",
      customer_phone: "0216 444 3322",
      customer_address: "Maltepe, İstanbul",
      device_brand: "Siemens",
      device_model: "S7-1200 PLC Güç Modülü",
      device: "Siemens S7-1200 PLC Güç Modülü",
      serial_number: "SIE-S7-88410",
      customer_complaint: "[E-posta] 24V çıkış gerilimi dalgalanıyor, PLC reset atıyor.",
      status: "Kabul Edildi",
      assigned_tech: "Caner Güler",
      assigned_user_id: 3,
      labor_cost: 500,
      parts_cost: 0,
      total_cost: 500,
      created_at: "2026-10-22T11:15:00Z"
    }
  ],

  // Personel Bazlı Atanmış Saha İşleri (Çevrimdışı ve Hızlı Erişim Kataloğu)
  staffJobs: {
    2: [ // Murat Aydın - Saha Mühendisi (Elektronik & Güç Elektroniği)
      {
        id: 104,
        tracking_code: "SRV-2026-104",
        status: "Onarımda",
        device_brand: "Delta Electronics",
        device_model: "VFD-075 Endüstriyel Sürücü Kartı",
        serial_number: "DLT-2024-99823",
        customer_name: "TermoTek Endüstriyel Ltd.",
        customer_phone: "0532 999 1122",
        customer_address: "Kadıköy Rıhtım Cd. No:14, Kadıköy, İstanbul",
        customer_complaint: "Cihaz giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor ve koruma rölesi devreyi kesiyor.",
        technician_findings: "Çıkış güç transistöründe sızıntı tespit edildi. IGBT değişimi yapıldı.",
        total_cost: 1050
      },
      {
        id: 108,
        tracking_code: "SRV-2026-108",
        status: "Tamamlandı",
        device_brand: "Schneider Electric",
        device_model: "Altivar ATV320 Frekans Sürücü",
        serial_number: "SCH-2025-44120",
        customer_name: "Ümran Çelik Boru A.Ş.",
        customer_phone: "0216 555 4411",
        customer_address: "Dudullu OSB 2. Cadde No:15, Ümraniye, İstanbul",
        customer_complaint: "Motor kalkış anında SCF4 kısa devre hatası verip kilitleniyor.",
        technician_findings: "DC bara kondansatör bankı ve tetikleme optokuplörleri yenilendi, testler başarıyla geçti.",
        total_cost: 1850
      }
    ],
    3: [ // Caner Güler - Kıdemli Tekniker (Mekanik & İklimlendirme / Pompa)
      {
        id: 112,
        tracking_code: "SRV-2026-112",
        status: "Yolda",
        device_brand: "Grundfos",
        device_model: "CR-15 Endüstriyel Hidrofor Pompası",
        serial_number: "GRF-2024-77192",
        customer_name: "Marmara Ambalaj Sanayi",
        customer_phone: "0216 333 7788",
        customer_address: "Bağlarbaşı Cd. No:42, Üsküdar, İstanbul",
        customer_complaint: "Mekanik salmastra bölgesinden su sızıntısı var ve basınç şalteri kontaktör çekmiyor.",
        technician_findings: "Mekanik salmastra kiti ve 24V kontaktör değişimi için sahaya gidiliyor.",
        total_cost: 1400
      },
      {
        id: 98,
        tracking_code: "SRV-2026-098",
        status: "Tamamlandı",
        device_brand: "Daikin",
        device_model: "VRV IV Soğutma Kompresör İnverteri",
        serial_number: "DAI-2023-88214",
        customer_name: "Ekol Lojistik Depo Tesisleri",
        customer_phone: "0216 666 9900",
        customer_address: "Samandıra Tesisleri No:8, Sancaktepe, İstanbul",
        customer_complaint: "E4 alçak basınç koruma alarmı veriyor, kompresör devreye girmiyor.",
        technician_findings: "NTC sıcaklık sensörü ve genleşme valfi soket korozyonu giderildi, gaz basınçları dengelendi.",
        total_cost: 2200
      }
    ],
    4: [ // Selin Kaya - Otomasyon & PLC Mühendisi (Sürücü Parametreleri & Yazılım)
      {
        id: 115,
        tracking_code: "SRV-2026-115",
        status: "İncelemede",
        device_brand: "Siemens",
        device_model: "S7-1200 CPU 1214C & SM1223 PLC Modülü",
        serial_number: "SIE-2025-1214C",
        customer_name: "Mega Tekstil A.Ş.",
        customer_phone: "0216 777 2233",
        customer_address: "Ataşehir Bulvarı No:8, Ataşehir, İstanbul",
        customer_complaint: "PROFINET haberleşme kaybı oluşuyor, SF kırmızı led sürekli yanıp sönüyor.",
        technician_findings: "Giriş sinyal kartında aşırı gerilim izleri var; donanım teşhisi ve yazılım yedeklemesi yapılıyor.",
        total_cost: 1750
      },
      {
        id: 101,
        tracking_code: "SRV-2026-101",
        status: "Tamamlandı",
        device_brand: "Omron",
        device_model: "CJ2M-CPU31 Modüler PLC Ünitesi",
        serial_number: "OMR-2024-31902",
        customer_name: "Kartal Kimya Sanayi",
        customer_phone: "0216 888 5544",
        customer_address: "Kartal Sanayi Cd. No:19, Kartal, İstanbul",
        customer_complaint: "Elektrik kesintisinden sonra PLC programı silindi, ERR ledi yanıyor.",
        technician_findings: "Lityum yedekleme pili yenilendi, kaynak kod EEPROM üzerinden geri yüklendi ve I/O testleri yapıldı.",
        total_cost: 2600
      }
    ],
    5: [ // Emre Yıldız - Teknisyen (Genel Donanım & Sensörler)
      {
        id: 119,
        tracking_code: "SRV-2026-119",
        status: "Kabul Edildi",
        device_brand: "Autonics",
        device_model: "TK4S Sayısal PID Sıcaklık Kontrolörü",
        serial_number: "AUT-2025-45512",
        customer_name: "Doğuş Medikal Ltd.",
        customer_phone: "0216 444 1155",
        customer_address: "Maltepe Sahil Cd. No:25, Maltepe, İstanbul",
        customer_complaint: "SSR çıkış vermiyor, fırın sıcaklığı 45 derece sapma gösteriyor.",
        technician_findings: "PT100 sensör ucu kopukluğu ve röle çıkış katı arızası belirlendi.",
        total_cost: 850
      },
      {
        id: 92,
        tracking_code: "SRV-2026-092",
        status: "Tamamlandı",
        device_brand: "Sick",
        device_model: "C4000 Güvenlik Işık Bariyeri",
        serial_number: "SCK-2024-40019",
        customer_name: "Borusan Lojistik",
        customer_phone: "0216 333 2211",
        customer_address: "Pendik Güzelyalı Mah. Sanayi Sk., Pendik, İstanbul",
        customer_complaint: "Pres hattı güvenlik bariyeri sarı alarm veriyor, reset almıyor.",
        technician_findings: "Optik lens temizliği yapıldı, OSSD emniyet rölesi yenilenerek sistem devreye alındı.",
        total_cost: 1150
      }
    ]
  }
};

// ==================== DOM Elements ====================
document.addEventListener('DOMContentLoaded', () => {
  const appMode = localStorage.getItem('servisai_app_mode');
  const initialProfile = getStoredCompanyProfile();
  applyCompanyProfile(initialProfile);

  if (appMode === 'clean') {
    state.staffJobs = {};
    const savedOrders = localStorage.getItem('servisai_work_orders');
    if (savedOrders) {
      try { state.workOrders = JSON.parse(savedOrders) || []; } catch(e) { state.workOrders = []; }
    } else {
      state.workOrders = [];
    }
  }

  loadWorkOrdersFromLocalStorage();
  consolidateAllWorkOrders();
  loadServiceKnowledgeBaseFromLocalStorage();
  loadTechnicianExpensesFromLocalStorage();
  loadStockMovementsFromLocalStorage();
  initTabs();
  loadCustomCategories();
  loadStockFromLocalStorage();
  loadStaffFromLocalStorage();
  loadVehiclesFromLocalStorage();
  renderStaffList();
  renderStockTable();
  renderStockCategoryPills();
  updateStockCategoryDropdown();
  renderMaintenance();
  populateActiveTechDropdown();
  initActiveTechSwitcher();
  renderTechJobs();
  renderTechExpenses();
  initTechActions();
  initCustomerActions();
  initAdminActions();
  initStaffManagement();
  initFleetManagement();
  initVehicleActionModal();
  initStaffVehicleModal();
  initManagerManagement();
  initCategoryManagerModal();
  initServiceLabelActions();
  initAccountingReceiptActions();
  initNotificationActions();
  initMapTechSelector();
  initStaffJobsModal();
  initDispatchAssignModal();
  initMaintenanceActions();
  initStockTransferModal();
  initStockFilterControls();
  initStockCurrencyConverter();
  fetchTCMBExchangeRates();
  renderIncomingCalls();
  updateFleetKPI();
  updateActiveOrdersKPI();
  const initialOrder = (state.workOrders && state.workOrders.length > 0) ? state.workOrders[0] : null;
  updateDispatchBanner(initialOrder, (initialOrder && initialOrder.assigned_tech) ? { name: initialOrder.assigned_tech, vehiclePlate: "34 ABC 101" } : null);
  initReportsEngine();
  initAuthSystem();
  initTechMobileControls();
  initGpsSimulation();
  initLeafletMap();
  initEquipmentRegistry();
  initEquipmentActions();
  initVoiceInterventionEngine();
  initEmbedWidgetActions();
  initEfaturaEngine();
  initDemoGuideEngine();
  initCustomerSignatureEngine();
  initSanalPosEngine();
  initMultiTenantSaaSEngine();
  initCompanyBillingCardEngine();
  initOnboardingWizardEngine();
  initWelcomeModal();
  syncInitialDataFromBackend();
});

// ==================== Role / Tab Navigation ====================
function initTabs() {
  const buttons = document.querySelectorAll('.role-btn');
  const panels = document.querySelectorAll('.view-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Yetki Kontrolü: Teknisyen rolündeki kullanıcı yönetici sekmelerine erişemez
      if (state.currentUser && state.currentUser.role === 'Teknisyen') {
        if (targetId === 'admin-view' || targetId === 'reports-view') {
          showToast('🔒 Bu ekrana erişim için Şirket Yöneticisi yetkisi gereklidir.');
          return;
        }
      }

      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      state.activeTab = targetId;
      if (targetId === 'tech-view') {
        populateActiveTechDropdown();
        renderTechJobs();
      } else if (targetId === 'admin-view') {
        renderIncomingCalls();
        updateFleetKPI();
        updateActiveOrdersKPI();
      } else if (targetId === 'reports-view') {
        updateReportStaffDropdown();
        if (typeof initCustomSelect === 'function') {
          initCustomSelect(document.getElementById('report-type-select'));
          initCustomSelect(document.getElementById('report-staff-filter'));
          initCustomSelect(document.getElementById('report-status-filter'));
        }
        executeCustomReport();
      } else if (targetId === 'equipment-view') {
        renderEquipmentRegistry();
      }
      showToast(`Ekran Değiştirildi: ${btn.querySelector('span:last-child').textContent}`);
    });
  });
}

// ==================== 1. Admin / Dispatcher Functions ====================
function renderStaffList() {
  const container = document.getElementById('staff-container');
  if (!container) return;

  if (typeof updateReportStaffDropdown === 'function') {
    updateReportStaffDropdown();
  }

  const fieldStaff = state.staff.filter(person => person.role !== 'Yönetici' && person.status !== 'Ayrıldı');
  container.innerHTML = fieldStaff.map(person => {
    const isAvailable = person.status === 'Müsait';
    const statusChip = isAvailable 
      ? '<span class="badge badge-success">Müsait</span>' 
      : person.status === 'Görevde' 
        ? '<span class="badge badge-primary">Görevde</span>' 
        : '<span class="badge badge-warning">Yolda</span>';

    const assignedJobs = (state.staffJobs && state.staffJobs[person.id]) ? state.staffJobs[person.id] : [];
    const jobCount = assignedJobs.length;

    return `
      <div class="staff-item" data-id="${person.id}">
        <!-- 1. Üst Kısım: Avatar, İsim, Durum ve Uzmanlık Rozeti -->
        <div class="staff-header-row">
          <div class="staff-profile-box">
            <div class="staff-avatar-badge">${person.avatar}</div>
            <div>
              <div class="staff-name-group">
                <strong class="staff-name">${person.name}</strong>
                ${statusChip}
              </div>
              <span class="staff-role-text">${person.role || 'Saha Personeli'}</span>
            </div>
          </div>
          <span class="badge badge-purple staff-spec-badge">${person.specialty}</span>
        </div>

        <!-- 2. Orta Kısım: Lokasyon, Araç Plakası ve Görev Sayısı -->
        <div class="staff-meta-row">
          <div class="staff-meta-chip">
            <span>📍</span>
            <span>${person.location}</span>
          </div>
          <div class="staff-meta-chip staff-vehicle-chip" data-id="${person.id}" title="Personelin araç zimmetini değiştir veya aracı geri al">
            <span>🚗</span>
            <span>Araç: <strong class="${person.vehiclePlate === 'Zimmetsiz' ? 'text-amber' : 'text-cyan'}">${person.vehiclePlate}</strong></span>
            <span class="badge ${person.vehiclePlate === 'Zimmetsiz' ? 'badge-warning' : 'badge-secondary'}" style="font-size: 0.68rem; margin-left: 4px; padding: 1px 5px;">
              ${person.vehiclePlate === 'Zimmetsiz' ? '➕ Araç Ver' : '🔄 Değiştir/Al'}
            </span>
          </div>
          ${jobCount > 0 ? `
            <div class="staff-meta-chip active-jobs-chip">
              <span>📋</span>
              <span><strong>${jobCount} Görev</strong></span>
            </div>
          ` : ''}
        </div>

        <!-- 3. Alt Buton Şeridi: Yan Yana, Ferah Butonlar -->
        <div class="staff-card-actions">
          <button class="btn btn-primary btn-sm btn-view-staff-jobs" data-id="${person.id}" title="Personele atanan işleri pop-up pencerede gör">
            📋 Atanan İşleri Gör ${jobCount > 0 ? `(${jobCount})` : ''}
          </button>
          <button class="btn btn-outline btn-sm btn-staff-vehicle" data-id="${person.id}" title="Personelin servis aracını değiştir veya geri al">
            🚗 Araç ${person.vehiclePlate === 'Zimmetsiz' ? 'Ver' : 'Yönet'}
          </button>
          <button class="btn btn-outline btn-sm btn-track-staff" data-id="${person.id}" title="Haritada canlı izle ve araca odaklan">
            📍 Haritada İzle
          </button>
          <button class="btn btn-outline btn-sm btn-staff-exit" data-id="${person.id}" title="Personel işten çıkış / ayrılış sürecini başlat">
            🚪 İşe Çıkış
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Araç Zimmetleme / Yönetme Butonları ve Çipleri
  container.querySelectorAll('.staff-vehicle-chip, .btn-staff-vehicle').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(el.getAttribute('data-id'));
      openStaffVehicleModal(id);
    });
  });

  // Atanan İşler Pop-up Butonları
  container.querySelectorAll('.btn-view-staff-jobs').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      openStaffJobsModal(id);
    });
  });

  // İşe Çıkış Pop-up Butonları
  container.querySelectorAll('.btn-staff-exit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      openStaffExitModal(id);
    });
  });

  // Haritada İzleme Butonları
  container.querySelectorAll('.btn-track-staff').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      
      const realMap = document.getElementById('real-google-map');
      const vectorMap = document.getElementById('vector-map');
      if (realMap) realMap.style.display = 'block';
      if (vectorMap) vectorMap.style.display = 'none';

      if (typeof initLeafletMap === 'function') {
        initLeafletMap();
      }

      selectMapTech(id);
      
      setTimeout(() => {
        if (leafletMapState && leafletMapState.map) {
          leafletMapState.map.invalidateSize();
        }
      }, 80);

      const person = state.staff.find(s => s.id === id);
      if (person) {
        const gpsCard = document.getElementById('gps-tracking-card');
        if (gpsCard) {
          gpsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        showToast(`📍 ${person.name} (${person.vehiclePlate}) canlı takip haritasına odaklandı.`);
      }
    });
  });

  // Kartın kendisine tıklandığında da iş pop-up'ını aç
  container.querySelectorAll('.staff-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', (e) => {
      // Eğer butonlara tıklanmadıysa
      if (!e.target.closest('button')) {
        const id = parseInt(item.getAttribute('data-id'));
        openStaffJobsModal(id);
      }
    });
  });

  // Manuel atama butonları (Canlı API Bağlantılı)
  container.querySelectorAll('.btn-assign-manual').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const person = state.staff.find(s => s.id === id);
      if (person) {
        person.status = "Görevde";
        const code = state.activeOrder ? state.activeOrder.code : "SRV-2026-104";
        try {
          await fetch(`${API_BASE_URL}/api/work-orders/${code}/assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: id })
          });
        } catch (err) {}
        renderStaffList();
        showToast(`✅ ${person.name} personeline #${code} iş emri atandı (Veri tabanına kaydedildi)!`);
      }
    });
  });
}

// ==================== KPI: Aktif İş Emirleri & Müşteri Onay Sayacı ====================
function updateActiveOrdersKPI() {
  const kpiOrders = document.getElementById('kpi-active-orders');
  const kpiSub = document.getElementById('kpi-active-orders-subtext');
  if (!kpiOrders) return;

  const orders = state.workOrders || [];
  const activeOrders = orders.filter(o => o.status !== 'Tamamlandı');
  const approvedOrders = orders.filter(o => o.customer_approved || o.customerApproved);
  const pendingOrders = orders.filter(o => !o.assigned_tech || o.status === 'Kabul Edildi');

  kpiOrders.textContent = activeOrders.length;
  if (kpiSub) {
    if (approvedOrders.length > 0) {
      kpiSub.innerHTML = `<span style="color: #10b981; font-weight: 700;">✅ ${approvedOrders.length} Müşteri Onaylı</span> • ${pendingOrders.length} sevk bekliyor`;
    } else {
      kpiSub.textContent = `${pendingOrders.length} sevk bekliyor, ${Math.max(0, activeOrders.length - pendingOrders.length)} sahada`;
    }
  }
}

// ==================== Saha Operasyon Süreleri & Formatlayıcılar (Global Scope) ====================
function formatTimeOnly(isoOrDate) {
  if (!isoOrDate) return '09:30';
  const d = new Date(isoOrDate);
  if (isNaN(d.getTime())) return '09:30';
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function formatDurationMinutes(mins) {
  if (!mins || isNaN(mins)) return '0 Dk';
  const m = Math.round(mins);
  if (m < 60) return `${m} Dk`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h} Sa ${rem} Dk` : `${h} Sa`;
}

function updateTechJourneyUI(order) {
  const banner = document.getElementById('tech-gps-lifecycle-banner');
  const btnOnTheWay = document.getElementById('btn-tech-on-the-way');
  const btnArrived = document.getElementById('btn-tech-arrived');
  const btnCompleteBanner = document.getElementById('btn-tech-complete-banner');
  const btnViewReportBanner = document.getElementById('btn-tech-view-report-banner');
  const btnResetLifecycle = document.getElementById('btn-tech-reset-lifecycle');
  const durationBadge = document.getElementById('tech-job-duration-badge');
  const departedText = document.getElementById('tech-time-departed-text');
  const durationText = document.getElementById('tech-time-duration-text');
  const pulse = document.getElementById('tech-journey-pulse');

  // Stepper Düğümleri
  const nodeAccepted = document.getElementById('step-node-accepted');
  const nodeOnTheWay = document.getElementById('step-node-ontheway');
  const nodeRepair = document.getElementById('step-node-repair');
  const nodeCompleted = document.getElementById('step-node-completed');

  if (!banner || !order) return;

  const status = order.status || 'Kabul Edildi';

  // Stepper Stillerini Sıfırla
  function setStepStyle(node, stateType) {
    if (!node) return;
    if (stateType === 'active') {
      node.style.background = 'rgba(99, 102, 241, 0.25)';
      node.style.border = '1px solid #818cf8';
      node.style.color = '#ffffff';
      node.style.boxShadow = '0 0 12px rgba(129, 140, 248, 0.4)';
    } else if (stateType === 'completed') {
      node.style.background = 'rgba(16, 185, 129, 0.15)';
      node.style.border = '1px solid #10b981';
      node.style.color = '#34d399';
      node.style.boxShadow = 'none';
    } else {
      node.style.background = 'transparent';
      node.style.border = '1px solid transparent';
      node.style.color = '#64748b';
      node.style.boxShadow = 'none';
    }
  }

  // 1. Durum: Kabul Edildi / Henüz Yola Çıkılmadı
  if (status === 'Kabul Edildi' || status === 'İncelemede' || !order.departedAt) {
    setStepStyle(nodeAccepted, 'active');
    setStepStyle(nodeOnTheWay, 'inactive');
    setStepStyle(nodeRepair, 'inactive');
    setStepStyle(nodeCompleted, 'inactive');

    if (btnOnTheWay) btnOnTheWay.style.display = 'inline-flex';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'none';
    if (durationBadge) durationBadge.style.display = 'none';
    if (pulse) pulse.style.background = '#64748B';
    if (departedText) departedText.textContent = '⏳ İntikal Bekliyor (Henüz yola çıkılmadı)';
    if (durationText) durationText.textContent = '';
  }
  // 2. Durum: Yolda / Seyahat Halinde
  else if (status === 'Yolda') {
    setStepStyle(nodeAccepted, 'completed');
    setStepStyle(nodeOnTheWay, 'active');
    setStepStyle(nodeRepair, 'inactive');
    setStepStyle(nodeCompleted, 'inactive');

    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'inline-flex';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';

    if (durationBadge) {
      durationBadge.style.display = 'inline-block';
      durationBadge.className = 'badge badge-warning';
      durationBadge.textContent = '🚗 Yolda (GPS Aktif)';
    }
    if (pulse) pulse.style.background = '#06B6D4';
    const depTime = formatTimeOnly(order.departedAt);
    if (departedText) departedText.innerHTML = `🚗 Yola Çıkış: <strong>${depTime}</strong>`;
    if (durationText) durationText.innerHTML = `• 📡 Seyahat Sürüyor (Canlı GPS)`;
  }
  // 3. Durum: Onarımda / Cihaz Başında
  else if (status === 'Onarımda' || status === 'Onay Bekliyor' || status === 'Parça Bekliyor') {
    setStepStyle(nodeAccepted, 'completed');
    setStepStyle(nodeOnTheWay, 'completed');
    setStepStyle(nodeRepair, 'active');
    setStepStyle(nodeCompleted, 'inactive');

    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'inline-flex'; // TEZGAHIN TEPESİNDE BİTİRME BUTONU
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';

    if (durationBadge) {
      durationBadge.style.display = 'inline-block';
      durationBadge.className = 'badge badge-primary';
      durationBadge.textContent = '🔬 Cihaz Başında Onarımda';
    }
    if (pulse) pulse.style.background = '#8B5CF6';
    const arrTime = formatTimeOnly(order.arrivedAt || order.departedAt);
    const travelM = order.travelDurationMinutes || order.travel_duration_minutes || 25;
    if (departedText) departedText.innerHTML = `🏢 Adrese Ulaşıldı: <strong>${arrTime}</strong> (İntikal: <strong>${travelM} Dk</strong>)`;
    if (durationText) durationText.innerHTML = `• ⏱️ Fiili Onarım Sürüyor`;
  }
  // 4. Durum: Tamamlandı
  else if (status === 'Tamamlandı') {
    setStepStyle(nodeAccepted, 'completed');
    setStepStyle(nodeOnTheWay, 'completed');
    setStepStyle(nodeRepair, 'completed');
    setStepStyle(nodeCompleted, 'completed');

    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'inline-flex';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';

    if (durationBadge) {
      durationBadge.style.display = 'inline-block';
      durationBadge.className = 'badge badge-success';
      durationBadge.textContent = `✅ Tamamlandı`;
    }
    if (pulse) pulse.style.background = '#10B981';
    const travelM = order.travelDurationMinutes || order.travel_duration_minutes || 25;
    const repM = order.repairDurationMinutes || order.repair_duration_minutes || 45;
    const totM = order.totalDurationMinutes || order.total_duration_minutes || (travelM + repM);
    if (departedText) departedText.innerHTML = `✅ Görev Tamamlandı • İntikal: <strong>${travelM} Dk</strong> • Onarım: <strong>${repM} Dk</strong>`;
    if (durationText) durationText.innerHTML = `• Toplam Mesai: <strong>${formatDurationMinutes(totM)}</strong>`;
  }
}

function consolidateAllWorkOrders() {
  if (!state.workOrders) state.workOrders = [];
  const appMode = localStorage.getItem('servisai_app_mode');
  if (appMode === 'clean') {
    return;
  }

  if (state.staffJobs) {
    for (const sId in state.staffJobs) {
      const staffMember = (state.staff || []).find(s => s.id == sId);
      const techName = staffMember ? staffMember.name : "Saha Teknisyeni";
      state.staffJobs[sId].forEach(job => {
        const jobCode = job.tracking_code || job.code;
        if (!jobCode) return;

        let existing = state.workOrders.find(o => (o.tracking_code || o.code) === jobCode);
        const isComp = job.status === 'Tamamlandı';
        if (!existing) {
          const newOrder = {
            id: job.id || ('wo-' + Date.now()),
            tracking_code: jobCode,
            code: jobCode,
            channel: job.channel || "Telefon",
            priority: job.priority || "Normal",
            customer_name: job.customer_name || job.customer || "Müşteri",
            customer_phone: job.customer_phone || "0216 444 0000",
            customer_address: job.customer_address || job.customerAddress || "İstanbul",
            device_brand: job.device_brand || "Endüstriyel",
            device_model: job.device_model || "Cihaz",
            device: `${job.device_brand || ''} ${job.device_model || ''}`.trim() || "Cihaz",
            serial_number: job.serial_number || job.serialNo || "-",
            customer_complaint: job.customer_complaint || job.complaint || "Arıza detayı girilmedi.",
            status: job.status || (isComp ? "Tamamlandı" : "Onarımda"),
            assigned_tech: techName,
            assigned_user_id: parseInt(sId),
            labor_cost: job.labor_cost || 600,
            parts_cost: job.parts_cost || 450,
            total_cost: job.total_cost || 1050,
            created_at: job.created_at || "2026-10-24T09:00:00Z",
            customer_approved: true,
            travel_duration_minutes: job.travel_duration_minutes || (isComp ? (sId == 2 ? 28 : sId == 3 ? 35 : 30) : 25),
            repair_duration_minutes: job.repair_duration_minutes || (isComp ? (sId == 2 ? 45 : sId == 3 ? 50 : 40) : 35),
            total_duration_minutes: job.total_duration_minutes || (isComp ? 73 : 60),
            departed_at: job.departed_at || (isComp ? "2026-10-24T09:15:00Z" : null),
            arrived_at: job.arrived_at || (isComp ? "2026-10-24T09:43:00Z" : null),
            completed_at: job.completed_at || (isComp ? "2026-10-24T10:28:00Z" : null)
          };
          if (!newOrder.total_duration_minutes) {
            newOrder.total_duration_minutes = newOrder.travel_duration_minutes + newOrder.repair_duration_minutes;
          }
          state.workOrders.push(newOrder);
        } else {
          if (isComp) {
            existing.status = 'Tamamlandı';
          }
          const defaultTravel = (sId == 2 ? 28 : sId == 3 ? 35 : 30);
          const defaultRepair = (sId == 2 ? 45 : sId == 3 ? 50 : 40);
          if (!existing.travel_duration_minutes) existing.travel_duration_minutes = job.travel_duration_minutes || defaultTravel;
          if (!existing.repair_duration_minutes) existing.repair_duration_minutes = job.repair_duration_minutes || defaultRepair;
          if (!existing.total_duration_minutes) existing.total_duration_minutes = existing.travel_duration_minutes + existing.repair_duration_minutes;
          if (!existing.departed_at) existing.departed_at = job.departed_at || "2026-10-24T09:15:00Z";
          if (!existing.arrived_at) existing.arrived_at = job.arrived_at || "2026-10-24T09:43:00Z";
          if (isComp && !existing.completed_at) existing.completed_at = job.completed_at || "2026-10-24T10:28:00Z";
          if (!existing.assigned_tech) existing.assigned_tech = techName;
          if (!existing.assigned_user_id) existing.assigned_user_id = parseInt(sId);
        }
      });
    }
  }
}

// ==================== Gelen Çağrılar & Sevk Masası ====================
function renderIncomingCalls() {
  consolidateAllWorkOrders();
  const container = document.getElementById('incoming-calls-list');
  const countBadge = document.getElementById('incoming-calls-count');
  const trayActiveBtn = document.getElementById('tab-dispatch-active');
  const trayCompletedBtn = document.getElementById('tab-dispatch-completed');
  const trayActiveCount = document.getElementById('tray-active-count');
  const trayCompletedCount = document.getElementById('tray-completed-count');
  if (!container) return;

  state.dispatchTray = state.dispatchTray || 'active';

  updateActiveOrdersKPI();

  const orders = state.workOrders || [];
  const pendingOrders = orders.filter(o => !o.status || (!o.status.startsWith('Tamamlandı') && o.status !== 'Teslim Edildi'));
  const completedOrders = orders.filter(o => o.status && (o.status.startsWith('Tamamlandı') || o.status === 'Teslim Edildi'));

  if (trayActiveCount) trayActiveCount.textContent = pendingOrders.length;
  if (trayCompletedCount) trayCompletedCount.textContent = completedOrders.length;

  if (countBadge) {
    if (state.dispatchTray === 'completed') {
      countBadge.className = 'badge badge-success';
      countBadge.textContent = `${completedOrders.length} Biten İş`;
    } else {
      if (pendingOrders.length > 0) {
        countBadge.className = 'badge badge-warning';
        countBadge.textContent = `${pendingOrders.length} Bekliyor`;
      } else {
        countBadge.className = 'badge badge-success';
        countBadge.textContent = `Tüm Çağrılar Sevk Edildi`;
      }
    }
  }

  // Tray sekmeleri aktiflik durumu ve tıklama bağlamaları
  if (trayActiveBtn && trayCompletedBtn) {
    if (state.dispatchTray === 'completed') {
      trayCompletedBtn.classList.add('active');
      trayActiveBtn.classList.remove('active');
    } else {
      trayActiveBtn.classList.add('active');
      trayCompletedBtn.classList.remove('active');
    }

    trayActiveBtn.onclick = () => {
      state.dispatchTray = 'active';
      renderIncomingCalls();
    };
    trayCompletedBtn.onclick = () => {
      state.dispatchTray = 'completed';
      renderIncomingCalls();
    };
  }

  const currentDisplayOrders = state.dispatchTray === 'completed' ? completedOrders : pendingOrders;

  if (currentDisplayOrders.length === 0) {
    if (state.dispatchTray === 'completed') {
      container.innerHTML = `
        <div style="text-align: center; padding: 32px 20px; color: var(--text-dim); font-size: 0.85rem; background: rgba(255,255,255,0.01); border-radius: 8px; border: 1px dashed var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 8px;">📂</div>
          <strong style="color: var(--text-main); font-size: 0.95rem;">Henüz Biten / Teslim Edilen İş Bulunmuyor</strong>
          <p style="margin: 6px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">
            Teknisyen sahada arızayı giderip testi tamamlayınca bu tepsiye düşer. Burada teknisyen raporunu inceleyebilir ve muhasebeye tahsilat fişi gönderebilirsiniz.
          </p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="text-align: center; padding: 32px 20px; color: var(--text-dim); font-size: 0.85rem; background: rgba(255,255,255,0.01); border-radius: 8px; border: 1px dashed var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🎉</div>
          <strong style="color: var(--text-main); font-size: 0.95rem;">Tüm Servis Çağrıları Başarıyla Sevk Edildi</strong>
          <p style="margin: 6px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">
            Sevk masasında açık bekleyen çağrı kalmadı. Biten işleri ve muhasebe fişlerini incelemek için yukarıdaki <strong>"✅ Biten İşler Tepsisi"</strong> sekmesine geçebilirsiniz.
          </p>
        </div>
      `;
    }
    return;
  }

  container.innerHTML = currentDisplayOrders.map(order => {
    const isCompleted = order.status && (order.status.startsWith('Tamamlandı') || order.status === 'Teslim Edildi');
    const isUrgent = order.priority === 'Acil';
    const isHigh = order.priority === 'Yüksek';
    const priorityClass = isCompleted ? '' : (isUrgent ? 'priority-urgent' : isHigh ? 'priority-high' : 'priority-normal');
    const priorityBadge = isUrgent 
      ? '<span class="badge badge-danger">🚨 Acil</span>' 
      : isHigh 
        ? '<span class="badge badge-warning">⚡ Yüksek</span>' 
        : '<span class="badge badge-secondary">Normal</span>';

    const isApproved = !!(order.customer_approved || order.customerApproved);
    const approvedBadge = isApproved 
      ? `<span class="badge badge-success badge-customer-approved" title="Müşteri online sorgulama ekranından onarım ve fiyatı onayladı">✅ Müşteri Onayladı</span>` 
      : '';

    const channelIcon = order.channel === 'WhatsApp' ? '💬 WhatsApp' :
                        order.channel === 'E-posta' ? '✉️ E-posta' :
                        order.channel === 'Elden Teslim' ? '🏢 Elden' : '📞 Telefon';

    const isAssigned = !!order.assigned_tech;
    let statusBadge = "";
    if (isCompleted) {
      statusBadge = `<span class="badge badge-call-completed">✅ Tamamlandı / Teslim Edildi</span>`;
    } else if (isAssigned) {
      statusBadge = `<span class="badge badge-success">✓ ${order.assigned_tech} (${order.status || 'Onarımda'})</span>`;
    } else {
      statusBadge = `<span class="badge badge-warning">⏳ Atama Bekliyor</span>`;
    }

    const code = order.tracking_code || order.code;
    const assignedTech = state.staff.find(s => s.name === order.assigned_tech || (order.assigned_user_id && s.id === order.assigned_user_id));
    const assignedTechId = assignedTech ? assignedTech.id : (order.assigned_user_id || '');
    const completedClass = isCompleted ? 'is-completed-call' : '';

    return `
      <div class="incoming-call-item ${priorityClass} ${completedClass}" data-code="${code}">
        <div class="incoming-call-top">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <span class="incoming-call-code">#${code}</span>
            ${priorityBadge}
            ${approvedBadge}
            <span class="text-xs text-dim">${channelIcon}</span>
          </div>
          ${statusBadge}
        </div>
        <div class="incoming-call-desc">
          <strong>${order.customer_name || order.customer || 'Müşteri'}</strong> • <span>${order.device_brand || ''} ${order.device_model || ''}</span>
          <div class="text-dim text-xs" style="margin-top: 2px;">
            ${order.customer_complaint ? (order.customer_complaint.length > 95 ? order.customer_complaint.slice(0, 95) + '...' : order.customer_complaint) : (order.complaint || 'Arıza detayı girilmedi.')}
          </div>
        </div>
        <div class="incoming-call-meta">
          <div>
            <span>📍 ${order.customer_address || order.customerAddress || 'İstanbul'}</span>
            ${isCompleted ? `
              <div class="call-duration-tag mt-1" style="font-size: 0.74rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span>🚗 Seyahat: <strong>${order.travel_duration_minutes || order.travelDurationMinutes || 25} dk</strong></span>
                <span>•</span>
                <span>🛠️ Onarım: <strong>${order.repair_duration_minutes || order.repairDurationMinutes || 45} dk</strong></span>
                <span>•</span>
                <span>⏳ Toplam: <strong>${formatDurationMinutes(order.total_duration_minutes || order.totalDurationMinutes || 70)}</strong></span>
              </div>
            ` : order.status === 'Onarımda' ? `
              <div class="call-duration-tag mt-1" style="font-size: 0.74rem; color: var(--accent-purple); display: flex; align-items: center; gap: 6px;">
                <span>🚗 İntikal: <strong>${order.travel_duration_minutes || order.travelDurationMinutes || 25} dk</strong></span>
                <span>•</span>
                <span>🔬 Cihaz Başında Onarım Sürüyor</span>
              </div>
            ` : order.status === 'Yolda' ? `
              <div class="call-duration-tag mt-1" style="font-size: 0.74rem; color: var(--accent-amber); display: flex; align-items: center; gap: 6px;">
                <span>📡 Seyahat Halinde (GPS Takibi Aktif)</span>
              </div>
            ` : ''}
          </div>
          <div class="incoming-call-actions" style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${isCompleted ? `
              <!-- Biten İş Aksiyonları (Rapor, Muhasebe Fişi, Harita, Etiket) -->
              <button class="btn btn-primary btn-sm btn-call-view-report" data-code="${code}" style="padding: 3px 9px; font-size: 0.75rem;" title="Teknisyenin arıza teşhisini, adım adım yaptıklarını ve 8 bölümlü resmi ekspertiz raporunu incele">
                📄 Servis Raporunu Gör
              </button>
              <button class="btn btn-success btn-sm btn-call-accounting-receipt" data-code="${code}" style="padding: 3px 9px; font-size: 0.75rem; background: #059669; border-color: #059669; color: #fff;" title="Müşteri tahsilatını ve teknisyen masraf mutabakatını içeren resmi muhasebe fişini aç">
                🧾 Muhasebe Fişi
              </button>
              <button class="btn btn-outline btn-sm btn-call-track-map" data-code="${code}" data-tech-id="${assignedTechId}" style="padding: 3px 8px; font-size: 0.75rem;" title="Servis teslim adresini haritada gör">
                📍 Harita
              </button>
              <button class="btn btn-outline btn-sm btn-call-label" data-code="${code}" style="padding: 3px 8px; font-size: 0.75rem;" title="QR Servis Etiketini Aç">
                🏷️ Etiket
              </button>
            ` : `
              <!-- Aktif Sevk Masası Aksiyonları -->
              ${isAssigned ? `
                <button class="btn btn-primary btn-sm btn-call-staff-jobs" data-tech-id="${assignedTechId}" data-tech-name="${escapeHtml(order.assigned_tech || '')}" data-code="${code}" style="padding: 3px 8px; font-size: 0.75rem;" title="Atanan uzmanın açık ve tamamlanan tüm işlerini pop-up pencerede gör">
                  📋 Atanan İşleri Gör
                </button>
                <button class="btn btn-outline btn-sm btn-call-reassign" data-code="${code}" data-source-id="${assignedTechId}" style="padding: 3px 8px; font-size: 0.75rem;" title="Görevi başka bir saha uzmanına aktar / devret">
                  🔄 Uzmana Ata
                </button>
              ` : `
                <button class="btn btn-primary btn-sm btn-call-assign" data-code="${code}" style="padding: 3px 8px; font-size: 0.75rem;" title="Görevi saha personeline sevk et ve ata">
                  ⚡ Uzmana Ata
                </button>
              `}
              <button class="btn btn-outline btn-sm btn-call-track-map" data-code="${code}" data-tech-id="${assignedTechId}" style="padding: 3px 8px; font-size: 0.75rem;" title="Teknisyenin canlı konumunu ve rota haritasını aç">
                📍 Haritada Gör
              </button>
              <button class="btn btn-outline btn-sm btn-call-label" data-code="${code}" style="padding: 3px 8px; font-size: 0.75rem;">
                🏷️ Etiket
              </button>
              <button class="btn btn-outline btn-sm btn-call-detail" data-code="${code}" style="padding: 3px 8px; font-size: 0.75rem;">
                🔧 Tezgaha Al
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Tıklama olayları bağlama
  // 1. Servis Raporunu Gör (Biten İşler)
  container.querySelectorAll('.btn-call-view-report').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      openServiceReportModal(code);
    });
  });

  // 2. Muhasebe Fişi (Biten İşler)
  container.querySelectorAll('.btn-call-accounting-receipt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      openAccountingReceiptModal(code);
    });
  });

  // 3. Uzmana Ata
  container.querySelectorAll('.btn-call-assign').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      openDispatchAssignModal(code);
    });
  });

  // 4. Uzmandan Başkasına Yeniden Ata
  container.querySelectorAll('.btn-call-reassign').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      const sourceId = btn.getAttribute('data-source-id') ? parseInt(btn.getAttribute('data-source-id')) : null;
      openDispatchAssignModal(code, sourceId);
    });
  });

  // 5. Atanan İşleri Gör
  container.querySelectorAll('.btn-call-staff-jobs').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      let techId = parseInt(btn.getAttribute('data-tech-id'));
      const techName = btn.getAttribute('data-tech-name');
      if (!techId && techName) {
        const found = state.staff.find(s => s.name === techName);
        if (found) techId = found.id;
      }
      if (!techId) {
        techId = (state.staff.find(s => s.role !== 'Yönetici') || {}).id || 2;
      }
      openStaffJobsModal(techId);
    });
  });

  // 6. Haritada Gör
  container.querySelectorAll('.btn-call-track-map').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      let techId = parseInt(btn.getAttribute('data-tech-id'));

      // 1. Yönetici sekmesine geç (harita admin-view içindedir)
      const adminBtn = document.getElementById('btn-tab-admin');
      if (adminBtn) adminBtn.click();

      // 2. Harita canvas'ını görünür yap
      const realMap = document.getElementById('real-google-map');
      const vectorMap = document.getElementById('vector-map');
      if (realMap) realMap.style.display = 'block';
      if (vectorMap) vectorMap.style.display = 'none';

      // 3. Leaflet haritasını başlat (eğer henüz başlatılmadıysa)
      if (typeof initLeafletMap === 'function') {
        initLeafletMap();
      }

      // 4. Hedef teknisyeni seç ve rotasını çiz
      if (!techId) {
        const order = (state.workOrders || []).find(o => o.tracking_code === code || o.code === code);
        if (order && order.assigned_tech) {
          const p = state.staff.find(s => s.name === order.assigned_tech);
          if (p) techId = p.id;
        }
      }
      if (!techId) {
        const p = state.staff.find(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı') || state.staff[0];
        if (p) techId = p.id;
      }

      if (typeof selectMapTech === 'function') {
        selectMapTech(techId);
      }

      // 5. Haritanın boş / gri gelmesini engellemek için Leaflet invalidateSize çağır
      setTimeout(() => {
        if (leafletMapState && leafletMapState.map) {
          leafletMapState.map.invalidateSize();
        }
      }, 60);

      setTimeout(() => {
        if (leafletMapState && leafletMapState.map) {
          leafletMapState.map.invalidateSize();
        }
      }, 160);

      // 6. Harita ve telemetri kartına yumuşak kaydır
      const gpsCard = document.getElementById('gps-tracking-card');
      if (gpsCard) {
        setTimeout(() => {
          gpsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      }

      showToast(`📍 #${code} çağrısının konumu ve canlı rota telemetrisi haritada açıldı.`);
    });
  });

  // 7. Etiket
  container.querySelectorAll('.btn-call-label').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = e.currentTarget.getAttribute('data-code');
      loadAndShowServiceLabel(code);
    });
  });

  // 8. Tezgaha Al
  container.querySelectorAll('.btn-call-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = e.currentTarget.getAttribute('data-code');
      loadWorkOrderToWorkbench(code);
      const techTabBtn = document.getElementById('btn-tab-tech');
      if (techTabBtn) techTabBtn.click();
    });
  });
}

// ==================== Biten İşler: Servis Raporunu Açma ====================
function openServiceReportModal(code) {
  const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code) || state.activeOrder;
  if (!order) {
    showToast("⚠️ İş emri kaydı bulunamadı.");
    return;
  }

  const reportModal = document.getElementById('report-modal');
  const reportPreText = document.getElementById('report-pre-text');
  if (!reportModal || !reportPreText) return;

  const formalReport = generateOfficialServiceReport(order);
  reportPreText.textContent = formalReport;
  reportModal.style.display = 'flex';
  showToast(`📄 #${code} için Teknisyen Saha Müdahale ve Ekspertiz Raporu açıldı.`);
}

// ==================== Biten İşler: Resmi Muhasebe & Tahsilat Fişi Modalı ====================
function openAccountingReceiptModal(code) {
  const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code) || state.activeOrder || {};
  const currentCode = order.tracking_code || order.code || code || "SRV-2026-104";

  const modal = document.getElementById('accounting-receipt-modal');
  if (!modal) return;

  // Başlık & Fiş Kodu
  const rcptCode = document.getElementById('rcpt-tracking-code');
  if (rcptCode) rcptCode.textContent = `#${currentCode}`;

  const rcptDate = document.getElementById('rcpt-date-time');
  if (rcptDate) {
    const d = new Date();
    rcptDate.textContent = `${d.toLocaleDateString('tr-TR')} ${d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Müşteri Bilgileri
  const customerName = order.customer_name || order.customer || "ISISAN İklimlendirme A.Ş.";
  const customerAddr = order.customer_address || order.customerAddress || "Dudullu OSB 2. Cadde No: 14, Ümraniye / İstanbul";
  const customerPhone = order.customer_phone || order.customerPhone || "0216 455 10 20";

  const elCustName = document.getElementById('rcpt-customer-name');
  if (elCustName) elCustName.textContent = customerName;
  const elCustAddr = document.getElementById('rcpt-customer-address');
  if (elCustAddr) elCustAddr.textContent = customerAddr;
  const elCustPhone = document.getElementById('rcpt-customer-phone');
  if (elCustPhone) elCustPhone.textContent = customerPhone;

  // Cihaz ve Teknisyen Bilgileri
  const deviceName = `${order.device_brand || ''} ${order.device_model || ''}`.trim() || order.device || "Schneider Electric ATV630 Endüstriyel Sürücü";
  const serialNo = order.serial_number || order.serialNo || "SCH-2024-9912";
  const techName = order.assigned_tech || (state.staff.find(s => s.id == (order.assigned_user_id || state.activeTechId)) || {}).name || "Levent İmekci";
  const curTechObj = (state.staff || []).find(s => s.name === techName || s.id == (order.assigned_user_id || state.activeTechId));
  const techPlate = curTechObj ? (curTechObj.vehiclePlate || "33 EKS 18") : "33 EKS 18";

  const elDevName = document.getElementById('rcpt-device-name');
  if (elDevName) elDevName.textContent = deviceName;
  const elSerial = document.getElementById('rcpt-serial-no');
  if (elSerial) elSerial.textContent = serialNo;
  const elTechName = document.getElementById('rcpt-tech-name');
  if (elTechName) elTechName.textContent = techName;
  const elTechPlate = document.getElementById('rcpt-tech-plate');
  if (elTechPlate) elTechPlate.textContent = `(${techPlate})`;

  // Teknik Operasyon, Arıza Teşhis ve Saha Süreleri Özeti
  const elSummary = document.getElementById('rcpt-action-summary');
  if (elSummary) {
    const findings = order.technician_findings || order.findings || "Sahada arıza tespiti yapıldı, komponent ve bara ölçümleri tamamlandı.";
    const action = order.technician_action || order.action || "Yeni komponent montajı yapıldı, izolasyon testleri ve 30 dk tam yük testi başarıyla tamamlandı.";
    const travelM = order.travel_duration_minutes || order.travelDurationMinutes || 25;
    const repairM = order.repair_duration_minutes || order.repairDurationMinutes || 45;
    const totalM = order.total_duration_minutes || order.totalDurationMinutes || (travelM + repairM);
    const depTime = formatTimeOnly(order.departed_at || order.departedAt || order.travel_start_time) || "09:30";
    const arrTime = formatTimeOnly(order.arrived_at || order.arrivedAt || order.work_start_time) || "09:55";
    const compTime = formatTimeOnly(order.completed_at || order.completedAt || order.repair_finish_time) || "10:40";

    elSummary.innerHTML = `
      <strong>Teşhis:</strong> ${escapeHtml(findings)}<br>
      <strong style="margin-top: 4px; display: inline-block;">Uygulanan Müdahale:</strong> ${escapeHtml(action)}
      <div style="margin-top: 8px; padding: 6px 10px; background: rgba(255,255,255,0.04); border-radius: 6px; font-size: 0.78rem; border-left: 3px solid #10b981; display: flex; gap: 12px; flex-wrap: wrap;">
        <span>🚗 <strong>Yola Çıkış:</strong> ${depTime}</span>
        <span>🏢 <strong>Varış & Başlama:</strong> ${arrTime} (<strong>${travelM} Dk</strong> İntikal)</span>
        <span>✅ <strong>Bitiş:</strong> ${compTime} (<strong>${repairM} Dk</strong> Fiili Onarım)</span>
        <span>⏳ <strong>Toplam Saha Mesaisi:</strong> <strong style="color: #10b981;">${formatDurationMinutes(totalM)}</strong></span>
      </div>
    `;
  }

  // 1. Müşteri Tahsilat Tablosu (Gelir Kalemleri)
  const laborCost = parseFloat(order.laborCost || order.labor_cost || 600);
  const usedParts = (order.usedParts && order.usedParts.length > 0) ? order.usedParts : 
                    (state.activeOrder && state.activeOrder.usedParts && state.activeOrder.usedParts.length > 0 ? state.activeOrder.usedParts : [
                      { name: "IGBT-600V-40A Güç Transistörü", qty: 1, price: 450, isLocalPurchase: false, origin: "🚐 Mobil Araç Stoğu" }
                    ]);

  const tbody = document.getElementById('rcpt-items-tbody');
  if (tbody) {
    let rowsHtml = `
      <tr>
        <td><strong>Uzman Saha Mühendisliği & İşçilik Bedeli</strong></td>
        <td style="text-align: center;">1 Hizmet</td>
        <td style="text-align: right;" id="rcpt-labor-unit">${laborCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
        <td style="text-align: right;" id="rcpt-labor-total">${laborCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
      </tr>
    `;

    let partsTotal = 0;
    usedParts.forEach(p => {
      const pPrice = parseFloat(p.price || 0);
      partsTotal += pPrice;
      const originTag = p.isLocalPurchase ? '🏪 [Yerel Dış Tedarik]' : '🚐 [Araç Stoğu]';
      let currencyTag = '';
      if (p.currency && p.currency !== 'TRY' && p.originalPrice) {
        const sym = p.currency === 'USD' ? '$' : '€';
        currencyTag = ` • [İthal: ${sym}${p.originalPrice} - TCMB Kuru: ${(p.exchangeRate || 0).toFixed(2)} ₺]`;
      }
      rowsHtml += `
        <tr>
          <td>
            <strong>${escapeHtml(p.name)}</strong>
            <span class="text-xs text-muted" style="display: block;">${originTag}${currencyTag} ${p.supplierDoc ? `(${escapeHtml(p.supplierDoc)})` : ''}</span>
          </td>
          <td style="text-align: center;">${p.qty || 1} Adet</td>
          <td style="text-align: right;">${pPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
          <td style="text-align: right;">${pPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
        </tr>
      `;
    });
    tbody.innerHTML = rowsHtml;

    const grandTotal = laborCost + partsTotal;
    const subtotal = Math.round((grandTotal / 1.20) * 100) / 100;
    const vatAmount = Math.round((grandTotal - subtotal) * 100) / 100;

    const elSub = document.getElementById('rcpt-subtotal');
    if (elSub) elSub.textContent = `${subtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`;
    const elVat = document.getElementById('rcpt-vat-amount');
    if (elVat) elVat.textContent = `${vatAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`;
    const elGrand = document.getElementById('rcpt-grand-total');
    if (elGrand) elGrand.textContent = `${grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`;
  }

  // 2. Teknisyen Masraf İadesi & Personel Alacağı
  const techExpenses = (state.technicianExpenses || []).filter(e => 
    e.techName === techName || e.techId == (curTechObj ? curTechObj.id : null) || e.orderCode === currentCode
  );

  const localParts = usedParts.filter(p => !!p.isLocalPurchase);
  let techReimburseTotal = 0;

  const techExpContainer = document.getElementById('rcpt-tech-expenses-list');
  if (techExpContainer) {
    let expItemsHtml = '';
    if (localParts.length > 0) {
      localParts.forEach(lp => {
        const lpCost = parseFloat(lp.price || 0);
        techReimburseTotal += lpCost;
        expItemsHtml += `
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed rgba(255,255,255,0.08);">
            <span>🏪 <strong>Yerel Parça Tedariği:</strong> ${escapeHtml(lp.name)} (${escapeHtml(lp.supplierDoc || 'Fişli')})</span>
            <strong>${lpCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</strong>
          </div>
        `;
      });
    }

    if (techExpenses.length > 0) {
      techExpenses.forEach(te => {
        if (te.category !== "Yerel Parça Alımı (Dış Tedarik)") {
          const teAmt = parseFloat(te.amount || 0);
          techReimburseTotal += teAmt;
          expItemsHtml += `
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed rgba(255,255,255,0.08);">
              <span>🚗 <strong>${escapeHtml(te.category)}:</strong> ${escapeHtml(te.description)} ${te.docNo ? `(Belge: ${escapeHtml(te.docNo)})` : ''}</span>
              <strong>${teAmt.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</strong>
            </div>
          `;
        }
      });
    }

    if (!expItemsHtml) {
      expItemsHtml = `
        <div style="color: var(--text-dim); font-style: italic; padding: 4px 0;">
          Bu servis işlemi için teknisyen tarafından sisteme girilmiş ek saha/yol masrafı veya dış parça harcaması bulunmuyor.
        </div>
      `;
    }
    techExpContainer.innerHTML = expItemsHtml;
  }

  const elTechReimb = document.getElementById('rcpt-tech-total-reimburse');
  if (elTechReimb) {
    elTechReimb.textContent = `${techReimburseTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`;
  }

  // İmzalar
  const sigCust = document.getElementById('rcpt-sig-customer');
  if (sigCust) sigCust.textContent = customerName;
  const sigTech = document.getElementById('rcpt-sig-tech');
  if (sigTech) sigTech.textContent = techName;

  // Müşteri Dijital İmzası var mı kontrol et
  const sigImgContainer = document.getElementById('rcpt-sig-customer-canvas-container');
  const sigImg = document.getElementById('rcpt-sig-customer-img');
  if (order && order.customer_signature && sigImg && sigImgContainer) {
    sigImg.src = order.customer_signature;
    sigImgContainer.style.display = 'block';
  } else if (sigImgContainer) {
    sigImgContainer.style.display = 'none';
  }

  // Modalı aç
  modal.setAttribute('data-active-code', currentCode);
  modal.style.display = 'flex';
  showToast(`🧾 #${currentCode} Resmi Muhasebe & Tahsilat Fişi açıldı.`);
}

// ==================== Muhasebe Fişi Aksiyon Butonları Bağlayıcı ====================
function initAccountingReceiptActions() {
  const modal = document.getElementById('accounting-receipt-modal');
  const btnClose = document.getElementById('btn-close-accounting-modal');
  const btnCloseAlt = document.getElementById('btn-close-accounting-modal-alt');
  const btnPrint = document.getElementById('btn-print-accounting-receipt');
  const btnCopy = document.getElementById('btn-copy-accounting-text');
  const btnConfirm = document.getElementById('btn-confirm-accounting-settlement');

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }
  if (btnCloseAlt) {
    btnCloseAlt.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      document.body.classList.remove('printing-label', 'printing-report', 'printing-expert-report');
      document.body.classList.add('printing-accounting-receipt');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-accounting-receipt');
      }, 1000);
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const code = modal ? modal.getAttribute('data-active-code') : "SRV-2026-104";
      const cust = document.getElementById('rcpt-customer-name')?.textContent || '';
      const total = document.getElementById('rcpt-grand-total')?.textContent || '';
      const tech = document.getElementById('rcpt-tech-name')?.textContent || '';
      const reimburse = document.getElementById('rcpt-tech-total-reimburse')?.textContent || '';
      const method = document.querySelector('input[name="rcpt-payment-type"]:checked')?.value || 'Havale / EFT';

      const summaryText = `[SERVİS İŞLEM TAHSİLAT VE MUHASEBE FİŞİ #${code}]\n` +
        `Firma / Müşteri: ${cust}\n` +
        `Tahsil Edilecek Servis Bedeli: ${total} (KDV Dahil)\n` +
        `Ödeme / Tahsilat Şekli: ${method}\n` +
        `Sorumlu Saha Uzmanı: ${tech}\n` +
        `Personele Masraf İadesi / Alacak: ${reimburse}\n` +
        `Durum: Muhasebe Onaylandı / Tahsilat Kaydı İşlendi\n` +
        `Onaylayan: Zafer Koçaş (Yönetici)`;

      navigator.clipboard.writeText(summaryText).then(() => {
        showToast("📋 Muhasebe özet metni panoya kopyalandı!");
      }).catch(() => {
        showToast("⚠️ Pano erişimi sağlanamadı.");
      });
    });
  }

  const btnWhatsApp = document.getElementById('btn-share-whatsapp-receipt');
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
      const code = modal ? modal.getAttribute('data-active-code') : "SRV-2026-104";
      const cust = document.getElementById('rcpt-customer-name')?.textContent || 'Değerli Müşterimiz';
      const total = document.getElementById('rcpt-grand-total')?.textContent || '0,00 ₺';
      const tech = document.getElementById('rcpt-tech-name')?.textContent || 'Saha Uzmanı';
      const method = document.querySelector('input[name="rcpt-payment-type"]:checked')?.value || 'Havale / EFT';

      const waMsg = `Sayın ${cust} Yetkilisi,\n\n` +
        `FUNZerviceTech.ai Sisteminde #${code} numaralı teknik servis & saha onarım işleminiz başarıyla tamamlanmıştır.\n\n` +
        `• Toplam Hizmet Bedeli: ${total} (KDV Dahil)\n` +
        `• Ödeme Şekli: ${method}\n` +
        `• Sorumlu Saha Uzmanı: ${tech}\n` +
        `• Fatura Durumu: e-Fatura / e-Arşiv Düzenlendi\n\n` +
        `Cihazınızı iyi günlerde kullanmanızı diler, bizi tercih ettiğiniz için teşekkür ederiz.\n` +
        `Koçaş Teknik Servis & Mühendislik`;

      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');
      showToast("📲 WhatsApp paylaşım penceresi açıldı!", "success");
    });
  }

  // Fiş üzerinden Müşteri Teslim İmzası aç
  const btnRcptSig = document.getElementById('btn-rcpt-open-signature-modal');
  if (btnRcptSig) {
    btnRcptSig.addEventListener('click', () => {
      const code = modal ? modal.getAttribute('data-active-code') : "SRV-2026-104";
      if (typeof openCustomerSignatureModal === 'function') {
        openCustomerSignatureModal(code);
      }
    });
  }

  // Fiş üzerinden Sanal POS (PayTR / iyzico) Ödeme Linki aç
  const btnSanalPos = document.getElementById('btn-open-sanal-pos-modal');
  if (btnSanalPos) {
    btnSanalPos.addEventListener('click', () => {
      const code = modal ? modal.getAttribute('data-active-code') : "SRV-2026-104";
      if (typeof openSanalPosModal === 'function') {
        openSanalPosModal(code);
      }
    });
  }

  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      const code = modal ? modal.getAttribute('data-active-code') : "SRV-2026-104";
      const method = document.querySelector('input[name="rcpt-payment-type"]:checked')?.value || 'Havale / EFT';
      
      const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
      if (order) {
        order.status = "Tamamlandı / Teslim Edildi";
        order.accountingSettled = true;
        order.paymentMethod = method;
        saveWorkOrdersToLocalStorage();
      }

      showToast(`💾 #${code} tahsilatı (${method}) başarıyla muhasebe sistemine işlendi ve kapatıldı!`);
      if (modal) modal.style.display = 'none';
      renderIncomingCalls();
    });
  }
}


async function assignOrderToBestTech(targetCode) {
  openDispatchAssignModal(targetCode);
}

function updateDispatchBanner(order, assignedTech) {
  const banner = document.getElementById('dispatch-banner-container');
  if (!banner) return;

  const code = order ? (order.tracking_code || order.code) : "SRV-2026-106";
  const custName = order ? (order.customer_name || "ABC Lojistik") : "ABC Lojistik";
  const custAddr = order ? (order.customer_address || "Kadıköy, İstanbul") : "Kadıköy, İstanbul";
  const devBrand = order ? (order.device_brand || "Schneider") : "Schneider";
  const devModel = order ? (order.device_model || "3-Faz İnverter") : "3-Faz İnverter";
  const devSn = order ? (order.serial_number || "SCH-2025-1104") : "SCH-2025-1104";
  const complaint = order ? (order.customer_complaint || 'Arıza belirtilmedi') : "Cihaz aşırı ısınıyor ve aşırı akım çekip korumaya geçiyor.";
  const priority = order ? (order.priority || "Normal") : "Normal";
  const channel = order ? (order.channel || "Telefon") : "Telefon";

  const priorityBadge = priority === 'Acil' 
    ? '<span class="badge badge-danger">🚨 Kritik Acil</span>'
    : priority === 'Yüksek'
      ? '<span class="badge badge-warning">⚡ Yüksek Öncelik</span>'
      : '<span class="badge badge-secondary">Normal Öncelik</span>';

  const isApproved = order ? !!(order.customer_approved || order.customerApproved) : false;
  const approvedBadge = isApproved 
    ? `<span class="badge badge-success badge-customer-approved" style="margin-left: 6px;">✅ Müşteri Onayladı</span>` 
    : '';

  const channelIcon = channel === 'WhatsApp' ? '💬 WhatsApp Talebi' :
                      channel === 'E-posta' ? '✉️ E-posta Talebi' :
                      channel === 'Elden Teslim' ? '🏢 Elden Teslim' : '📞 Telefon Çağrısı';

  if (assignedTech) {
    banner.innerHTML = `
      <!-- 1. Üst Satır: Başlık & Sevk Durumu -->
      <div class="dispatch-banner-header">
        <div class="dispatch-banner-title-group">
          <span class="dispatch-badge" style="background: rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.4);">
            ✓ Göreve Sevk Edildi #${code}
          </span>
          <span class="badge badge-success">✓ Saha Uzmanı Görevlendirildi</span>
          ${approvedBadge}
        </div>
        <span class="dispatch-channel-tag">${channelIcon}</span>
      </div>

      <!-- 2. Orta Detay Bölümü: Müşteri, Cihaz, Teknisyen -->
      <div class="dispatch-banner-body">
        <div class="dispatch-info-grid">
          <div class="dispatch-info-item">
            <span class="dispatch-info-label">🏢 MÜŞTERİ & LOKASYON:</span>
            <strong class="dispatch-info-value">${custName}</strong>
            <span class="dispatch-info-sub">📍 ${custAddr}</span>
          </div>
          <div class="dispatch-info-item">
            <span class="dispatch-info-label">👨‍🔧 ATANAN SAHA UZMANI:</span>
            <strong class="dispatch-info-value" style="color: var(--accent-cyan);">${assignedTech.name}</strong>
            <span class="dispatch-info-sub">🚗 Araç: <strong>${assignedTech.vehiclePlate}</strong> (${assignedTech.specialty || 'Saha'})</span>
          </div>
        </div>
        <div class="dispatch-complaint-box">
          <span class="dispatch-info-label">⚙️ CİHAZ VE ARIZA:</span>
          <div class="dispatch-complaint-text">
            <strong>${devBrand} ${devModel}</strong> (Seri No: ${devSn}) • ${complaint}
          </div>
        </div>
      </div>

      <!-- 3. Alt Buton Şeridi: Butonlar Yan Yana ve Ferah -->
      <div class="dispatch-banner-footer">
        <button class="btn btn-primary btn-sm" id="btn-banner-view-job" data-code="${code}" title="İşi teknisyen seyyar tezgahına al ve görüntüle">
          🔧 Teknisyen Tezgâhına Al
        </button>
        <button class="btn btn-outline btn-sm" id="btn-banner-print-label" data-code="${code}" title="Cihaza yapıştırılacak QR barkodlu kabul kimlik fişini görüntüler ve yazdırır">
          🏷️ Cihaz Servis Etiketi (QR Fiş)
        </button>
      </div>
    `;
  } else {
    banner.innerHTML = `
      <!-- 1. Üst Satır: Başlık & Rozetler -->
      <div class="dispatch-banner-header">
        <div class="dispatch-banner-title-group">
          <span class="dispatch-badge">Bekleyen Çağrı #${code}</span>
          ${priorityBadge}
          ${approvedBadge}
        </div>
        <span class="dispatch-channel-tag">${channelIcon}</span>
      </div>

      <!-- 2. Orta Detay Bölümü: Müşteri, Cihaz, Şikayet -->
      <div class="dispatch-banner-body">
        <div class="dispatch-info-grid">
          <div class="dispatch-info-item">
            <span class="dispatch-info-label">🏢 MÜŞTERİ & LOKASYON:</span>
            <strong class="dispatch-info-value">${custName}</strong>
            <span class="dispatch-info-sub">📍 ${custAddr}</span>
          </div>
          <div class="dispatch-info-item">
            <span class="dispatch-info-label">⚙️ CİHAZ & MODEL:</span>
            <strong class="dispatch-info-value">${devBrand} ${devModel}</strong>
            <span class="dispatch-info-sub">Seri No: ${devSn}</span>
          </div>
        </div>
        <div class="dispatch-complaint-box">
          <span class="dispatch-info-label">📝 ARIZA BİLDİRİMİ & ŞİKAYET:</span>
          <div class="dispatch-complaint-text">
            ${complaint}
          </div>
        </div>
      </div>

      <!-- 3. Alt Buton Şeridi: Butonlar Altta Ferahça Sıralanır -->
      <div class="dispatch-banner-footer">
        <button class="btn btn-primary btn-sm" id="btn-smart-dispatch" data-code="${code}">
          ⚡ En Yakın Uzmana Ata
        </button>
        <button class="btn btn-outline btn-sm" id="btn-banner-print-label" data-code="${code}" title="Fiziksel cihazın üzerine yapıştırılacak QR barkodlu kabul etiketini açar ve yazdırır">
          🏷️ Cihaz Servis Etiketi (QR Fiş)
        </button>
      </div>
    `;
  }

  // Dinamik Olay Dinleyicileri (Event Listeners)
  const btnSmart = banner.querySelector('#btn-smart-dispatch');
  if (btnSmart) {
    btnSmart.addEventListener('click', () => {
      const c = btnSmart.getAttribute('data-code');
      openDispatchAssignModal(c);
    });
  }

  const btnLabel = banner.querySelector('#btn-banner-print-label');
  if (btnLabel) {
    btnLabel.addEventListener('click', () => {
      const c = btnLabel.getAttribute('data-code');
      loadAndShowServiceLabel(c);
    });
  }

  const btnViewJob = banner.querySelector('#btn-banner-view-job');
  if (btnViewJob) {
    btnViewJob.addEventListener('click', () => {
      const c = btnViewJob.getAttribute('data-code');
      loadWorkOrderToWorkbench(c);
      const techTabBtn = document.getElementById('btn-tab-tech');
      if (techTabBtn) techTabBtn.click();
    });
  }
}

// ==================== Aktif Saha Araçları & Çoklu Depo Yönetimi ====================

// Aktif saha servis araçlarını (Havuz veya Personele zimmetli) listeler
function getActiveFieldVehicles() {
  const list = [];
  const addedPlates = new Set();

  (state.vehicles || []).forEach(v => {
    const t = (v.type || '').toLowerCase();
    if (!t.includes('uçak') && !t.includes('hava') && !t.includes('yht') && !t.includes('tren') && !t.includes('demiryolu')) {
      const tech = (state.staff || []).find(s => s.id == v.driverId || (s.vehiclePlate && s.vehiclePlate === v.plate));
      list.push({
        id: v.id,
        plate: v.plate,
        model: v.model,
        type: v.type,
        driverId: v.driverId,
        driverName: tech ? tech.name : (v.driverName || 'Havuz'),
        status: v.status || 'Sahada Aktif'
      });
      addedPlates.add(v.plate);
    }
  });

  // Personel üzerinde kayıtlı olup henüz filoda listelenmeyen araçları ekle (örn: Levent İmekçi)
  (state.staff || []).forEach(s => {
    if (s.vehiclePlate && s.vehiclePlate !== 'Zimmetsiz' && !s.vehiclePlate.includes('Uçak') && !s.vehiclePlate.includes('Tren') && !addedPlates.has(s.vehiclePlate)) {
      list.push({
        id: 'staff_' + s.id,
        plate: s.vehiclePlate,
        model: s.role || 'Saha Aracı',
        type: 'Mobil Servis',
        driverId: s.id,
        driverName: s.name,
        status: s.status || 'Sahada Aktif'
      });
      addedPlates.add(s.vehiclePlate);
    }
  });

  return list;
}

// Belirtilen parça için aracın mevcut stok miktarını çözer
function getItemVehicleStock(item, veh) {
  if (!item || !veh) return 0;
  if (veh.id === 1 || veh.plate === '34 ABC 101') {
    if (item.vehicle1 !== undefined) return item.vehicle1;
  }
  if (veh.id === 2 || veh.plate === '34 DEF 202') {
    if (item.vehicle2 !== undefined) return item.vehicle2;
  }
  if (item[`veh_${veh.id}`] !== undefined) return item[`veh_${veh.id}`];
  if (item[veh.plate] !== undefined) return item[veh.plate];
  if (item[`veh_${veh.plate}`] !== undefined) return item[`veh_${veh.plate}`];
  if (veh.driverId && item[`tech_${veh.driverId}`] !== undefined) return item[`tech_${veh.driverId}`];
  return 0;
}

// Stok listesinden parça çıkarma / silme fonksiyonu
function deleteStockItem(code) {
  if (!code) return;
  const item = (state.stock || []).find(s => s.code === code);
  if (!item) return;

  const partName = item.name || item.code;
  const confirmed = confirm(`"${partName}" (${item.code}) kodlu yedek parçayı stok listesinden tamamen çıkarmak istediğinize emin misiniz?\n\nBu işlem parça tanımını ve tüm lokasyonlardaki (Merkez Depo, Atölye, Saha Araçları) mevcut stok kayıtlarını silecektir.`);

  if (!confirmed) return;

  state.stock = state.stock.filter(s => s.code !== code);
  saveStockToLocalStorage();
  renderStockTable();
  renderStockCategoryPills();
  if (typeof updateStockLocationFilterDropdown === 'function') updateStockLocationFilterDropdown();
  if (typeof renderStockLocationPills === 'function') renderStockLocationPills();
  if (typeof updateVehiclePartDropdown === 'function') updateVehiclePartDropdown();
  showToast(`🗑️ "${partName}" yedek parçası stok listesinden başarıyla çıkarıldı.`);
}
window.deleteStockItem = deleteStockItem;

// Lokasyon & Depo Kayan Bandını (Pills) Oluşturur
function renderStockLocationPills() {
  const container = document.getElementById('stock-location-pills');
  if (!container) return;

  const currentLoc = (state.stockFilter && state.stockFilter.locationView) || 'all';
  const activeVehicles = getActiveFieldVehicles();

  let html = `
    <button class="location-pill ${currentLoc === 'all' ? 'active' : ''}" data-location="all">
      📍 TÜM LOKASYONLAR
    </button>
    <button class="location-pill ${currentLoc === 'central' ? 'active' : ''}" data-location="central">
      🏢 MERKEZ DEPO
    </button>
    <button class="location-pill ${currentLoc === 'workshop' ? 'active' : ''}" data-location="workshop">
      🔬 MERKEZ ATÖLYE / LAB
    </button>
    <button class="location-pill ${currentLoc === 'vehicles' ? 'active' : ''}" data-location="vehicles">
      🚐 TÜM SAHA ARAÇLARI (${activeVehicles.length})
    </button>
  `;

  activeVehicles.forEach(veh => {
    const driver = (veh.driverName || 'Havuz').split(' ')[0].toUpperCase();
    const key = `veh_${veh.id || veh.plate}`;
    const icon = getVehicleIcon(veh.type);
    const isAct = currentLoc === key || (currentLoc === 'vehicle1' && (veh.id === 1 || veh.plate === '34 ABC 101')) || (currentLoc === 'vehicle2' && (veh.id === 2 || veh.plate === '34 DEF 202'));
    html += `
      <button class="location-pill ${isAct ? 'active' : ''}" data-location="${key}">
        ${icon} ARAÇ (${veh.plate} - ${driver})
      </button>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.location-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.location-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const loc = pill.getAttribute('data-location');
      state.stockFilter.locationView = loc;
      const select = document.getElementById('stock-location-view-filter');
      if (select) select.value = loc;
      renderStockTable();
    });
  });
}

// Üst Bardaki Tüm Lokasyonlar Seçim Kutusunu Dinamik Doldurur
function updateStockLocationFilterDropdown() {
  const select = document.getElementById('stock-location-view-filter');
  if (!select) return;

  const currentVal = (state.stockFilter && state.stockFilter.locationView) || 'all';
  const activeVehicles = getActiveFieldVehicles();

  let html = `
    <option value="all">📍 Tüm Lokasyonlar (Depo, Atölye & Tüm Filo)</option>
    <option value="central">🏢 Yalnızca Merkez Depolar (Depo + Atölye)</option>
    <option value="workshop">🔬 Yalnızca Merkez Atölye / Lab</option>
    <option value="vehicles">🚐 Tüm Saha Araçları (${activeVehicles.length} Araç)</option>
    <optgroup label="Saha Servis Araçları">
  `;

  activeVehicles.forEach(v => {
    const driver = v.driverName || 'Havuz';
    const key = `veh_${v.id || v.plate}`;
    const icon = getVehicleIcon(v.type);
    html += `<option value="${key}">${icon} Araç (${v.plate} - ${driver})</option>`;
  });

  html += `</optgroup>`;
  select.innerHTML = html;
  if (currentVal) select.value = currentVal;
}

function renderStockTable() {
  const tbody = document.getElementById('stock-tbody');
  const thead = document.getElementById('stock-thead') || document.querySelector('#stock-table thead');
  if (!tbody) return;

  const filter = state.stockFilter || { search: '', category: 'all', criticalOnly: false, locationView: 'all' };
  const locView = filter.locationView || 'all';
  const activeVehicles = getActiveFieldVehicles();

  // Kolon görünürlüklerini belirle
  const showCentral = locView === 'all' || locView === 'central' || locView.startsWith('veh_') || locView === 'vehicle1' || locView === 'vehicle2';
  const showWorkshop = locView === 'all' || locView === 'central' || locView === 'workshop';
  
  let visibleVehicles = [];
  if (locView === 'all' || locView === 'vehicles') {
    visibleVehicles = activeVehicles;
  } else if (locView.startsWith('veh_') || locView === 'vehicle1' || locView === 'vehicle2') {
    const targetVeh = activeVehicles.find(v => {
      const k1 = `veh_${v.id}`;
      const k2 = `veh_${v.plate}`;
      return k1 === locView || k2 === locView || v.plate === locView || 
             (locView === 'vehicle1' && (v.id === 1 || v.plate === '34 ABC 101')) ||
             (locView === 'vehicle2' && (v.id === 2 || v.plate === '34 DEF 202'));
    });
    if (targetVeh) visibleVehicles = [targetVeh];
    else visibleVehicles = activeVehicles;
  }

  // 1. Filtreleme Mantığı
  let filtered = state.stock.filter(item => {
    // Arama Filtresi (Ad, Kod, Kategori)
    if (filter.search) {
      const q = filter.search.toLowerCase();
      const match = (item.name || '').toLowerCase().includes(q) ||
                    (item.code || '').toLowerCase().includes(q) ||
                    (item.category || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    // Kategori Filtresi (Büyük/küçük harf duyarsız)
    if (filter.category && filter.category !== 'all') {
      if ((item.category || '').toLowerCase() !== filter.category.toLowerCase()) return false;
    }

    // Kritik / Biten Stok Filtresi
    if (filter.criticalOnly) {
      let isCritical = ((item.central || 0) <= 5) || 
                       (((item.workshop !== undefined ? item.workshop : 10)) <= 2) || 
                       ((item.vehicle1 !== undefined ? item.vehicle1 : 0) <= 2) || 
                       ((item.vehicle2 !== undefined ? item.vehicle2 : 0) <= 2);
      if (!isCritical && activeVehicles.length > 0) {
        isCritical = activeVehicles.some(v => getItemVehicleStock(item, v) <= 2);
      }
      if (!isCritical) return false;
    }

    return true;
  });

  // 2. Metrik Şeridi (KPI Bar) Güncelleme
  const totalKinds = state.stock.length;
  const centralSum = state.stock.reduce((acc, curr) => acc + (curr.central || 0), 0);
  const workshopSum = state.stock.reduce((acc, curr) => acc + (curr.workshop !== undefined ? curr.workshop : 10), 0);
  const vehiclesSum = state.stock.reduce((acc, curr) => {
    let sum = (curr.vehicle1 || 0) + (curr.vehicle2 || 0);
    activeVehicles.forEach(v => {
      if (v.id !== 1 && v.id !== 2 && v.plate !== '34 ABC 101' && v.plate !== '34 DEF 202') {
        sum += getItemVehicleStock(curr, v);
      }
    });
    return acc + sum;
  }, 0);
  const criticalCount = state.stock.filter(s => {
    return (s.central <= 5) || 
           ((s.workshop !== undefined ? s.workshop : 10) <= 2) || 
           (s.vehicle1 <= 2) || 
           (s.vehicle2 <= 2) ||
           activeVehicles.some(v => getItemVehicleStock(s, v) <= 2);
  }).length;

  const elTotalKinds = document.getElementById('stock-kpi-total-kinds');
  const elCentralQty = document.getElementById('stock-kpi-central-qty');
  const elWorkshopQty = document.getElementById('stock-kpi-workshop-qty');
  const elVehiclesQty = document.getElementById('stock-kpi-vehicles-qty');
  const elCriticalCount = document.getElementById('stock-kpi-critical-count');
  const elFooterInfo = document.getElementById('stock-footer-info');

  if (elTotalKinds) elTotalKinds.textContent = `${totalKinds} Kalem`;
  if (elCentralQty) elCentralQty.textContent = `${centralSum} Adet`;
  if (elWorkshopQty) elWorkshopQty.textContent = `${workshopSum} Adet`;
  if (elVehiclesQty) elVehiclesQty.textContent = `${vehiclesSum} Adet`;
  if (elCriticalCount) elCriticalCount.textContent = `${criticalCount} Kalem`;

  if (elFooterInfo) {
    elFooterInfo.innerHTML = `Görüntülenen: <strong>${filtered.length}</strong> / ${totalKinds} Kalem Parça ${filter.category !== 'all' ? `• [${filter.category}]` : ''} ${filter.criticalOnly ? '• <span class="text-rose" style="font-weight: 600;">⚠️ Kritik Filtresi Aktif</span>' : ''}`;
  }

  // Dinamik THEAD Oluşturma
  if (thead) {
    thead.innerHTML = `
      <tr>
        <th style="min-width: 170px;">Parça Kodu & Tanımı</th>
        <th style="min-width: 130px; white-space: nowrap;">Birim Fiyat</th>
        ${showCentral ? `<th class="col-central" style="white-space: nowrap;">🏢 MERKEZ DEPO</th>` : ''}
        ${showWorkshop ? `<th class="col-workshop" style="white-space: nowrap;">🔬 MERKEZ ATÖLYE / LAB</th>` : ''}
        ${visibleVehicles.map(v => {
          const driver = (v.driverName || 'Havuz').split(' ')[0].toUpperCase();
          const icon = getVehicleIcon(v.type);
          const colClass = (v.id === 1 || v.plate === '34 ABC 101') ? 'col-v1' : (v.id === 2 || v.plate === '34 DEF 202') ? 'col-v2' : 'col-veh';
          return `<th class="${colClass}" style="white-space: nowrap;">${icon} ARAÇ (${v.plate} - ${driver})</th>`;
        }).join('')}
        <th style="text-align: right; min-width: 150px; white-space: nowrap;">İşlem / İkmal & Sil</th>
      </tr>
    `;
  }

  // 3. Boş Sonuç Durumu
  const totalCols = 1 + 1 + (showCentral ? 1 : 0) + (showWorkshop ? 1 : 0) + visibleVehicles.length + 1;
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="${totalCols}" style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
          <div style="font-size: 1.8rem; margin-bottom: 8px;">🔍</div>
          <strong style="color: var(--text-main); font-size: 0.95rem;">Arama kriterine uygun yedek parça bulunamadı</strong>
          <p style="font-size: 0.8rem; margin-top: 4px;">Lütfen arama terimini değiştirin veya aktif filtreleri sıfırlayın.</p>
          <button class="btn btn-outline btn-sm mt-3" id="btn-reset-stock-filters">🔄 Filtreleri Temizle</button>
        </td>
      </tr>
    `;
    const resetBtn = document.getElementById('btn-reset-stock-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.stockFilter = { search: '', category: 'all', criticalOnly: false, locationView: 'all' };
        const searchInput = document.getElementById('stock-search-input');
        if (searchInput) searchInput.value = '';
        const clearBtn = document.getElementById('btn-clear-stock-search');
        if (clearBtn) clearBtn.style.display = 'none';
        document.querySelectorAll('.category-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'all'));
        document.querySelectorAll('.location-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-location') === 'all'));
        const locSelect = document.getElementById('stock-location-view-filter');
        if (locSelect) locSelect.value = 'all';
        const btnCrit = document.getElementById('btn-filter-critical');
        if (btnCrit) {
          btnCrit.classList.remove('active');
          btnCrit.setAttribute('data-active', 'false');
          btnCrit.innerHTML = `<span>⚠️ Kritik / Bitenler</span>`;
        }
        renderStockTable();
      });
    }
    return;
  }

  // 4. Tablo Satırlarını Oluşturma
  tbody.innerHTML = filtered.map(item => {
    const workshopQty = item.workshop !== undefined ? item.workshop : 10;
    const wStatus = workshopQty === 0 ? 'danger' : workshopQty <= 2 ? 'warning' : 'safe';

    const catObj = (state.categories || []).find(c => (c.name || '').toLowerCase() === (item.category || '').toLowerCase());
    const catIcon = catObj ? catObj.icon + ' ' : '';
    const catHtml = item.category ? `<span class="stock-cat-tag">${catIcon}${item.category}</span><br>` : '';

    let vehiclesCellsHtml = visibleVehicles.map(v => {
      const vQty = getItemVehicleStock(item, v);
      const vStatus = vQty === 0 ? 'danger' : vQty <= 2 ? 'warning' : 'safe';
      const colClass = (v.id === 1 || v.plate === '34 ABC 101') ? 'col-v1' : (v.id === 2 || v.plate === '34 DEF 202') ? 'col-v2' : 'col-veh';
      return `
        <td class="${colClass}">
          <span class="indicator ${vStatus}"></span>
          <strong style="${vQty <= 2 ? 'color: var(--accent-amber); font-weight: 700;' : ''}">${vQty} Adet</strong>
        </td>
      `;
    }).join('');

    const hasCritical = visibleVehicles.some(v => getItemVehicleStock(item, v) <= 2) || ((item.central || 0) <= 5);

    let currencyBadgeHtml = '';
    if (item.currency && item.currency !== 'TRY' && item.originalPrice) {
      const cBadgeClass = item.currency === 'USD' ? 'currency-badge-usd' : 'currency-badge-eur';
      const cSymbol = item.currency === 'USD' ? '$' : '€';
      currencyBadgeHtml = `<span class="${cBadgeClass}" title="TCMB Döviz Satış Kuru: ${(item.exchangeRate || 0).toFixed(2)} ₺">${cSymbol}${item.originalPrice} (TCMB: ${(item.exchangeRate || 0).toFixed(2)} ₺)</span>`;
    }

    return `
      <tr>
        <td>
          ${catHtml}
          <strong style="color: var(--text-main); font-size: 0.9rem;">${item.name}</strong><br>
          <small class="text-dim" style="font-family: 'JetBrains Mono', monospace; font-weight: 600;">${item.code}</small>
          <small class="text-dim">• Garanti: ${item.warranty || '12 Ay'}</small>
        </td>
        <td style="white-space: nowrap;">
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--accent-emerald, #10b981);">${(item.price || 0).toLocaleString('tr-TR')} ₺</div>
          ${currencyBadgeHtml ? `<div style="margin-top: 4px;">${currencyBadgeHtml}</div>` : ''}
        </td>
        ${showCentral ? `
          <td class="col-central">
            <strong class="text-cyan">${item.central || 0} Adet</strong>
          </td>
        ` : ''}
        ${showWorkshop ? `
          <td class="col-workshop">
            <div class="workshop-badge">
              <span class="indicator ${wStatus}"></span>
              <span>${workshopQty} Adet</span>
            </div>
          </td>
        ` : ''}
        ${vehiclesCellsHtml}
        <td style="text-align: right; white-space: nowrap;">
          ${hasCritical 
            ? `<button class="btn btn-primary btn-sm btn-quick-transfer" data-code="${item.code}" title="Merkez depodan araca veya atölyeye hızlı ikmal yap">
                 <span>⚡ İkmal Et</span>
               </button>`
            : `<button class="btn btn-outline btn-sm btn-quick-transfer" data-code="${item.code}" title="Merkez depodan araca veya atölyeye ikmal/transfer yap">
                 <span>🔄 İkmal Et</span>
               </button>`
          }
          <button class="btn btn-delete-stock" data-code="${item.code}" data-name="${item.name ? item.name.replace(/"/g, '&quot;') : ''}" title="Bu parçayı stok listesinden tamamen çıkar / sil">
            <span>🗑️ Sil</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // 5. Hızlı İkmal / Transfer Butonlarını Bağlama
  tbody.querySelectorAll('.btn-quick-transfer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const code = e.currentTarget.getAttribute('data-code');
      let targetVeh = 'vehicle1';
      if (locView && locView.startsWith('veh_')) {
        targetVeh = locView;
      } else {
        const item = state.stock.find(s => s.code === code);
        let minStock = 999999;
        let lowestVehKey = 'vehicle1';
        visibleVehicles.forEach(v => {
          const qty = getItemVehicleStock(item, v);
          if (qty < minStock) {
            minStock = qty;
            lowestVehKey = (v.id === 1 || v.plate === '34 ABC 101') ? 'vehicle1' : (v.id === 2 || v.plate === '34 DEF 202') ? 'vehicle2' : `veh_${v.id || v.plate}`;
          }
        });
        targetVeh = lowestVehKey;
      }
      if (typeof window.openStockTransferModal === 'function') {
        window.openStockTransferModal(code, targetVeh, 'central');
      } else if (typeof window.openTransferModalWithPart === 'function') {
        window.openTransferModalWithPart(code, targetVeh);
      }
    });
  });

  // 6. Parça Silme / Listeden Çıkarma Butonlarını Bağlama
  tbody.querySelectorAll('.btn-delete-stock').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const code = e.currentTarget.getAttribute('data-code');
      deleteStockItem(code);
    });
  });
}

// ==================== Çoklu Stok Arama & Kategori Kontrolleri ====================
function initStockFilterControls() {
  const searchInput = document.getElementById('stock-search-input');
  const clearBtn = document.getElementById('btn-clear-stock-search');
  const btnCritical = document.getElementById('btn-filter-critical');
  const criticalCard = document.getElementById('stock-kpi-critical-card');
  const locViewFilter = document.getElementById('stock-location-view-filter');

  // 1. Canlı Arama Girişi
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.stockFilter.search = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = state.stockFilter.search ? 'block' : 'none';
      renderStockTable();
    });
  }

  // 2. Arama Temizleme
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.stockFilter.search = '';
      clearBtn.style.display = 'none';
      renderStockTable();
      searchInput.focus();
    });
  }

  // 3. Kategori Seçimi & Dinamik Çipler (Kayan Bant)
  renderStockCategoryPills();

  // 4. Lokasyon & Depo Kayan Bandı ve Dropdown Başlatma
  renderStockLocationPills();
  updateStockLocationFilterDropdown();

  // 5. Kritik / Azalan Stok Filtresi Toggle
  const toggleCritical = () => {
    state.stockFilter.criticalOnly = !state.stockFilter.criticalOnly;
    if (btnCritical) {
      btnCritical.classList.toggle('active', state.stockFilter.criticalOnly);
      btnCritical.setAttribute('data-active', state.stockFilter.criticalOnly ? 'true' : 'false');
      btnCritical.innerHTML = state.stockFilter.criticalOnly 
        ? `<span>✅ Kritik Filtresi (Açık)</span>`
        : `<span>⚠️ Kritik / Bitenler</span>`;
    }
    renderStockTable();
  };

  if (btnCritical) btnCritical.addEventListener('click', toggleCritical);
  if (criticalCard) criticalCard.addEventListener('click', toggleCritical);

  // 6. Lokasyon Görünüm Filtresi (Popup Dropdown)
  if (locViewFilter) {
    locViewFilter.addEventListener('change', (e) => {
      state.stockFilter.locationView = e.target.value;
      const pillsContainer = document.getElementById('stock-location-pills');
      if (pillsContainer) {
        pillsContainer.querySelectorAll('.location-pill').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-location') === e.target.value);
        });
      }
      renderStockTable();
    });
  }

  // 7. Global Parça Seçimi ile Transfer Açma Fonksiyonu
  window.openTransferModalWithPart = function(partCode, preSelectTo) {
    const btnOpen = document.getElementById('btn-transfer-part') || document.getElementById('btn-open-transfer-modal');
    if (btnOpen) btnOpen.click();

    setTimeout(() => {
      const partSelect = document.getElementById('select-transfer-part');
      if (partSelect && partCode) {
        partSelect.value = partCode;
        partSelect.dispatchEvent(new Event('change'));
      }
      const toSelect = document.getElementById('select-transfer-to');
      if (toSelect && preSelectTo) {
        toSelect.value = preSelectTo;
        toSelect.dispatchEvent(new Event('change'));
      }
    }, 50);
  };
}

function renderMaintenance() {
  const container = document.getElementById('maintenance-container');
  if (!container) return;

  container.innerHTML = state.maintenance.map((m, idx) => `
    <div class="maintenance-card">
      <div class="maintenance-header">
        <div>
          <div class="maintenance-device">${m.device}</div>
          ${m.serial_number ? `<div class="maintenance-serial">S/N: ${m.serial_number}</div>` : ''}
          <div class="maintenance-customer">Müşteri: <strong>${m.customer}</strong></div>
        </div>
        <span class="badge ${m.status.includes('Alarm') ? 'badge-warning' : m.status.includes('Açıldı') ? 'badge-success' : 'badge-primary'}">${m.status}</span>
      </div>

      <div class="maintenance-warranty-badge">
        <span>🛡️ <strong>${m.warranty || '12 Ay Servis & İşçilik Garantisi'}</strong></span>
        <span style="opacity: 0.85;">• Bitiş: ${m.warrantyEnd || '2027'}</span>
      </div>

      <div class="maintenance-meta">
        <div>
          <small style="color: var(--text-dim);">Bakım Periyodu:</small> <strong>${m.period}</strong><br>
          <small style="color: var(--text-dim);">Planlanan Tarih:</small> <strong>${m.dueDate}</strong>
        </div>
        <button class="btn btn-primary btn-sm btn-create-maint-order" data-idx="${idx}">
          İş Emri Aç
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-create-maint-order').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
      const item = state.maintenance[idx];

      try {
        if (item.id) {
          const res = await fetch(`${API_BASE_URL}/api/maintenance/${item.id}/create-order`, { method: 'POST' });
          if (res.ok) {
            const resData = await res.json();
            item.status = "İş Emri Açıldı";
            renderMaintenance();
            showToast(`✅ "${item.customer}" için periyodik bakım iş emri #${resData.tracking_code} açıldı (Veri tabanına kaydedildi)!`);
            syncInitialDataFromBackend();
            return;
          }
        }
      } catch (err) {}

      item.status = "İş Emri Açıldı";
      renderMaintenance();
      showToast(`✅ "${item.customer}" için periyodik bakım iş emri oluşturuldu ve teknisyen sırasına eklendi!`);
    });
  });
}

function initAdminActions() {
  // Akıllı Atama Butonu (Yapay Zeka Eşleştirmesi & Canlı API)
  const btnSmart = document.getElementById('btn-smart-dispatch');
  if (btnSmart) {
    btnSmart.addEventListener('click', async () => {
      const targetCode = btnSmart.getAttribute('data-code') || "SRV-2026-106";
      openDispatchAssignModal(targetCode);
    });
  }

  // Toplu bakım tetikleme
  const btnTrigger = document.getElementById('btn-trigger-all-maintenance');
  if (btnTrigger) {
    btnTrigger.addEventListener('click', () => {
      showToast(`📅 5 periyodik bakım için müşterilere otomatik WhatsApp hatırlatması gönderildi.`);
    });
  }

  // Hızlı Çağrı Kabul Modalı (Telefon / Mail Girişi)
  const btnOpenIntake = document.getElementById('btn-open-intake-modal');
  const intakeModal = document.getElementById('intake-modal');
  const btnCloseIntake = document.getElementById('btn-close-intake-modal');
  const btnCancelIntake = document.getElementById('btn-cancel-intake');
  const formIntake = document.getElementById('form-quick-intake');
  const submitBtnIntake = document.getElementById('btn-submit-intake');

  if (btnOpenIntake && intakeModal) {
    btnOpenIntake.addEventListener('click', () => {
      intakeModal.style.display = 'flex';
      if (!state.serviceRates || state.serviceRates.length === 0) {
        loadServiceRatesFromLocalStorage();
      }
      const standardRate = state.serviceRates.find(r => r.shortName === 'Standart' || r.name.includes('Standart')) || state.serviceRates[1] || state.serviceRates[0];
      const intakeLaborInput = document.getElementById('intake-labor-cost');
      if (intakeLaborInput && standardRate) {
        intakeLaborInput.value = standardRate.amount;
      }
      const nameInput = document.getElementById('intake-cust-name');
      if (nameInput) setTimeout(() => nameInput.focus(), 50);
    });

    if (btnCloseIntake) btnCloseIntake.addEventListener('click', () => intakeModal.style.display = 'none');
    if (btnCancelIntake) btnCancelIntake.addEventListener('click', () => intakeModal.style.display = 'none');
    intakeModal.addEventListener('click', (e) => {
      if (e.target === intakeModal) intakeModal.style.display = 'none';
    });

    if (formIntake) {
      formIntake.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btn-submit-intake');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>⏳ Kaydediliyor...</span>`;
        }

        try {
          const channel = document.getElementById('intake-channel').value;
          const priority = document.getElementById('intake-priority').value;
          const custName = document.getElementById('intake-cust-name').value.trim();
          const custPhone = document.getElementById('intake-cust-phone').value.trim();
          const custAddr = document.getElementById('intake-cust-address').value.trim();
          const devBrand = document.getElementById('intake-dev-brand').value.trim();
          const devModel = document.getElementById('intake-dev-model').value.trim();
          const complaint = document.getElementById('intake-complaint').value.trim();
          const intakeLaborInput = document.getElementById('intake-labor-cost');
          const initLabor = intakeLaborInput ? (parseFloat(intakeLaborInput.value) || 600) : 600;

          // 1. Benzersiz Takip Kodu ve Seri No Üret
          const codeNum = Math.floor(Math.random() * 800 + 107);
          let trackingCode = `SRV-2026-${codeNum}`;
          const serialNo = `SN-${devBrand.slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 90000 + 10000)}`;

          const newOrder = {
            id: codeNum,
            tracking_code: trackingCode,
            code: trackingCode,
            channel: channel,
            priority: priority,
            customer_name: custName,
            customer_phone: custPhone,
            customer_address: custAddr,
            device_brand: devBrand,
            device_model: devModel,
            device: `${devBrand} ${devModel}`,
            serial_number: serialNo,
            customer_complaint: `[${channel} Çağrısı] ${complaint}`,
            status: "Kabul Edildi",
            assigned_tech: null,
            assigned_user_id: null,
            labor_cost: initLabor,
            laborCost: initLabor,
            parts_cost: 0,
            total_cost: initLabor,
            created_at: new Date().toISOString(),
            customer_approved: false
          };

          // 2. Canlı Backend Kaydı (FastAPI)
          try {
            const res = await fetch(`${API_BASE_URL}/api/work-orders/quick-intake`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                channel: channel,
                priority: priority,
                customer_name: custName,
                customer_phone: custPhone,
                customer_address: custAddr,
                device_brand: devBrand,
                device_model: devModel,
                complaint: complaint,
                serial_number: serialNo
              })
            });
            if (res.ok) {
              const data = await res.json();
              if (data.tracking_code) {
                trackingCode = data.tracking_code;
                newOrder.tracking_code = trackingCode;
                newOrder.code = trackingCode;
              }
            }
          } catch (err) {
            console.log("ServisAI: Backend çevrimdışı, yerel önbelleğe ve kuyruğa kaydedildi.");
          }

          // 3. State ve Görünüm Güncellemesi
          if (!state.workOrders) state.workOrders = [];
          state.workOrders.unshift(newOrder);
          state.activeOrder = newOrder;
          saveWorkOrdersToLocalStorage();

          // KPI Aktif İş ve Onay Durumunu Güncelle
          updateActiveOrdersKPI();

          // Sevk Masası ve Çağrı Listesini Güncelle
          updateDispatchBanner(newOrder, null);
          renderIncomingCalls();
          renderTechJobs();

          // Modalı Kapat & Bildirim Göster
          intakeModal.style.display = 'none';
          formIntake.reset();
          showToast(`✅ #${trackingCode} yeni servis çağrısı başarıyla sisteme kaydedildi ve sevk masasına işlendi!`);

          // Cihaz Servis Etiketini Otomatik Aç
          setTimeout(() => {
            loadAndShowServiceLabel(trackingCode);
          }, 350);
        } catch (err) {
          console.error("Çağrı kaydı hatası:", err);
          showToast("⚠️ Çağrı kaydedilirken hata oluştu: " + err.message);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>💾 Çağrıyı Kaydet & Göreve Ata</span>`;
          }
        }
      });
    }
  }

  // 1. Tekil Parça Ekleme Modalı
  const btnOpenStock = document.getElementById('btn-open-stock-modal');
  const stockModal = document.getElementById('stock-modal');
  const btnCloseStock = document.getElementById('btn-close-stock-modal');
  const btnCancelStock = document.getElementById('btn-cancel-stock');
  const formStock = document.getElementById('form-stock-entry');

  if (btnOpenStock && stockModal) {
    btnOpenStock.addEventListener('click', () => { 
      updateStockCategoryDropdown();
      const inlineBox = document.getElementById('quick-category-inline-box');
      if (inlineBox) inlineBox.style.display = 'none';
      stockModal.style.display = 'flex'; 
    });
    if (btnCloseStock) btnCloseStock.addEventListener('click', () => { stockModal.style.display = 'none'; });
    if (btnCancelStock) btnCancelStock.addEventListener('click', () => { stockModal.style.display = 'none'; });
    stockModal.addEventListener('click', (e) => {
      if (e.target === stockModal) stockModal.style.display = 'none';
    });

    // Hızlı Kategori Tanımlama (Satır İçi Kutucuk)
    const btnToggleQuickCat = document.getElementById('btn-toggle-quick-cat');
    const inlineBox = document.getElementById('quick-category-inline-box');
    const btnCancelQuickCat = document.getElementById('btn-cancel-quick-cat');
    const btnSaveQuickCat = document.getElementById('btn-save-quick-cat');
    const inputQuickName = document.getElementById('quick-cat-name');
    const selectQuickIcon = document.getElementById('quick-cat-icon');

    if (btnToggleQuickCat && inlineBox) {
      btnToggleQuickCat.addEventListener('click', () => {
        const isHidden = inlineBox.style.display === 'none';
        inlineBox.style.display = isHidden ? 'block' : 'none';
        if (isHidden && inputQuickName) inputQuickName.focus();
      });
    }

    if (btnCancelQuickCat && inlineBox) {
      btnCancelQuickCat.addEventListener('click', () => {
        inlineBox.style.display = 'none';
        if (inputQuickName) inputQuickName.value = '';
      });
    }

    if (btnSaveQuickCat && inputQuickName) {
      btnSaveQuickCat.addEventListener('click', async () => {
        const name = inputQuickName.value.trim();
        const icon = selectQuickIcon ? selectQuickIcon.value : '🏷️';
        if (!name) {
          showToast("⚠️ Lütfen geçerli bir kategori adı yazın.");
          return;
        }
        await addCustomCategory(name, icon, "Servis özel kategorisi");
        updateStockCategoryDropdown(name);
        inlineBox.style.display = 'none';
        inputQuickName.value = '';
        showToast(`✨ "${icon} ${name}" kategorisi başarıyla eklendi ve seçildi!`);
      });
    }

    if (formStock) {
      formStock.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = document.getElementById('stock-part-code').value.trim();
        const name = document.getElementById('stock-part-name').value.trim();
        const catSelect = document.getElementById('stock-part-category');
        const category = (catSelect && catSelect.value) ? catSelect.value : "Genel Parça & Sarf";
        const targetWh = document.getElementById('stock-target-warehouse').value;
        const qty = parseInt(document.getElementById('stock-quantity').value) || 1;
        const currSelect = document.getElementById('stock-currency');
        const currency = (currSelect && currSelect.value) ? currSelect.value : "TRY";
        const rawPrice = parseFloat(document.getElementById('stock-unit-price').value) || 0;
        const rateUsed = (currency === 'USD') ? (state.exchangeRates.USD || 38.50) : (currency === 'EUR' ? (state.exchangeRates.EUR || 41.20) : 1.0);
        const price = Math.round((rawPrice * rateUsed) * 100) / 100;
        const warranty = parseInt(document.getElementById('stock-warranty-months').value) || 12;

        try {
          await fetch(`${API_BASE_URL}/api/stock/add-entry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              part_code: code,
              part_name: name,
              category: category,
              warehouse_target: targetWh,
              quantity: qty,
              unit_price: price,
              warranty_months: warranty
            })
          });
        } catch (err) {}

        let existing = state.stock.find(p => p.code === code);
        if (existing) {
          if (targetWh === "Atolye" || targetWh.includes("Atölye")) existing.workshop = (existing.workshop || 0) + qty;
          else if (targetWh.includes("Merkez")) existing.central += qty;
          else if (targetWh.includes("101")) existing.vehicle1 += qty;
          else if (targetWh.includes("202")) existing.vehicle2 += qty;
          existing.price = price;
          existing.currency = currency;
          existing.originalPrice = rawPrice;
          existing.exchangeRate = rateUsed;
          existing.category = category;
        } else {
          state.stock.push({
            code: code,
            name: name,
            category: category,
            central: targetWh.includes("Merkez") && !targetWh.includes("Atolye") ? qty : 0,
            workshop: targetWh === "Atolye" || targetWh.includes("Atölye") ? qty : 0,
            vehicle1: targetWh.includes("101") ? qty : 0,
            vehicle2: targetWh.includes("202") ? qty : 0,
            price: price,
            currency: currency,
            originalPrice: rawPrice,
            exchangeRate: rateUsed,
            warranty: `${warranty} Ay`
          });
        }

        saveStockToLocalStorage();

        renderStockTable();
        renderStockCategoryPills();
        updateVehiclePartDropdown();
        stockModal.style.display = 'none';
        formStock.reset();
        const currNote = currency !== 'TRY' ? ` (${rawPrice} ${currency} @ TCMB: ${rateUsed} ₺ = ${price} ₺)` : ` (${price} ₺)`;
        showToast(`📦 ${name} (${qty} adet - ${category})${currNote} başarıyla ${targetWh} stoğuna eklendi.`);
      });
    }
  }

  // 2. Akıllı Toplu Excel / CSV / Dosya Yükleme Modalı
  const btnOpenBulk = document.getElementById('btn-open-bulk-modal');
  const bulkModal = document.getElementById('bulk-modal');
  const btnCloseBulk = document.getElementById('btn-close-bulk-modal');
  const btnCancelBulk = document.getElementById('btn-cancel-bulk');
  const btnSubmitBulk = document.getElementById('btn-submit-bulk');
  const btnSubmitBulkText = document.getElementById('btn-submit-bulk-text');
  const btnSampleBulk = document.getElementById('btn-load-sample-csv');
  const btnDownloadTemplate = document.getElementById('btn-download-csv-template');
  const textareaBulk = document.getElementById('bulk-csv-textarea');

  // Yeni dosya ve yol alanları
  const bulkDropzone = document.getElementById('bulk-dropzone');
  const bulkFileInput = document.getElementById('bulk-file-input');
  const btnBrowseFile = document.getElementById('btn-browse-file');
  const selectedFileBadge = document.getElementById('bulk-selected-file-badge');
  const selectedFileName = document.getElementById('bulk-selected-file-name');
  const selectedFileSize = document.getElementById('bulk-selected-file-size');
  const btnClearBulkFile = document.getElementById('btn-clear-bulk-file');
  const bulkFilePathInput = document.getElementById('bulk-filepath-input');
  const btnFetchFileLink = document.getElementById('btn-fetch-file-link');

  // Önizleme elemanları
  const bulkPreviewContainer = document.getElementById('bulk-preview-container');
  const bulkPreviewSummary = document.getElementById('bulk-preview-summary-text');
  const bulkPreviewDelimiterBadge = document.getElementById('bulk-preview-delimiter-badge');
  const bulkPreviewTbody = document.getElementById('bulk-preview-tbody');
  const bulkPreviewMoreNote = document.getElementById('bulk-preview-more-note');
  const bulkPreviewMoreCount = document.getElementById('bulk-preview-more-count');

  let bulkParsedItems = [];
  let bulkDetectedFormat = '';
  let lastBulkRawInput = null;
  let lastBulkSourceName = '';

  // Tab Geçişleri
  const tabBtns = document.querySelectorAll('.bulk-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.bulk-tab-content').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.style.display = 'block';
    });
  });

  // HTML Kaçış Fonksiyonu (Render Güvenliği & XSS Koruması)
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Hücre Temizleme
  function cleanCellValue(val) {
    if (val === null || val === undefined) return '';
    let str = String(val).trim();
    if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
      str = str.slice(1, -1).trim();
    }
    return str;
  }

  // Sayı Temizleme
  function parseCleanNumber(val) {
    if (val === null || val === undefined) return 0;
    const cleaned = String(val).replace(/[^0-9]/g, '');
    const num = parseInt(cleaned, 10);
    return isNaN(num) ? 0 : num;
  }

  // Para & Ondalık Temizleme (Türkçe ve Uluslararası format uyumlu, Döviz Simgesi Arındırmalı)
  function parseCleanFloat(val) {
    if (val === null || val === undefined) return 100;
    let str = String(val)
      .replace(/[₺$€\u20AC\u0080â‚¬\s]/g, '')
      .replace(/&euro;|&#8364;/gi, '')
      .replace(/usd|us\$|eur|euro|avro|try|tl/gi, '')
      .trim();
    if (str.includes(',') && str.includes('.')) {
      if (str.lastIndexOf(',') > str.lastIndexOf('.')) {
        str = str.replace(/\./g, '').replace(',', '.');
      } else {
        str = str.replace(/,/g, '');
      }
    } else if (str.includes(',')) {
      str = str.replace(',', '.');
    }
    const num = parseFloat(str);
    return isNaN(num) || num <= 0 ? 100 : num;
  }

  // Metin / Hücre İçinden Döviz Tespiti (USD / EUR / TRY) - Kapsamlı Sembol & Encoding Korumalı
  function detectCurrencyFromText(val) {
    if (val === null || val === undefined) return null;
    const str = String(val).trim();
    if (!str) return null;
    const upper = str.toUpperCase();

    // Euro Tespiti (€ , EUR , EURO , AVRO , EVRO , AltGr+E, HTML entity & Bozuk UTF-8 Kodlamaları)
    // Not: Açık XML [$€-...] formatlarında dolar işareti de geçtiğinden Euro öncelikle test edilir!
    if (
      str.includes('€') ||
      str.includes('\u20AC') ||
      str.includes('\u0080') ||
      str.includes('â‚¬') ||
      upper.includes('&EURO;') ||
      str.includes('&#8364;') ||
      upper.includes('EUR') ||
      upper.includes('EURO') ||
      upper.includes('AVRO') ||
      upper.includes('EVRO') ||
      upper === 'E' ||
      upper.startsWith('E ') ||
      upper.endsWith(' E') ||
      upper.includes('€')
    ) {
      return 'EUR';
    }

    // Dolar Tespiti ($ , USD , US$ , DOLAR , DOLLAR)
    if (
      str.includes('$') ||
      upper.includes('USD') ||
      upper.includes('US$') ||
      upper.includes('DOLAR') ||
      upper.includes('DOLLAR')
    ) {
      return 'USD';
    }

    // Türk Lirası Tespiti (₺ , TL , TRY)
    if (
      str.includes('₺') ||
      upper.includes('TRY') ||
      upper.includes('TL') ||
      upper.includes('TURK LIRASI') ||
      upper.includes('TÜRK LİRASI')
    ) {
      return 'TRY';
    }

    return null;
  }

  // Çoklu Para Birimi (USD / EUR / TRY) ve TCMB Canlı Çevrim Fonksiyonu
  function parsePriceAndCurrency(val, currencyColVal = '', forcedMode = null, headerCurrency = null) {
    const rates = (state && state.exchangeRates) ? state.exchangeRates : { USD: 38.50, EUR: 41.20, TRY: 1.0 };
    const usdRate = rates.USD || 38.50;
    const eurRate = rates.EUR || 41.20;

    // Kullanıcının modal üstündeki açılır kutu seçimi
    const modeSelect = document.getElementById('bulk-currency-mode');
    const activeMode = (forcedMode || (modeSelect ? modeSelect.value : 'AUTO')).toUpperCase();

    let detectedCurr = 'TRY';

    if (activeMode === 'USD') {
      detectedCurr = 'USD';
    } else if (activeMode === 'EUR') {
      detectedCurr = 'EUR';
    } else if (activeMode === 'TRY') {
      detectedCurr = 'TRY';
    } else {
      // AUTO Modu:
      // 1. Önce ayrı sütun değeri (currencyColVal) kontrolü
      const fromCol = detectCurrencyFromText(currencyColVal);
      // 2. Fiyat hücresinin kendi içindeki döviz sembolü / metni kontrolü
      const fromVal = detectCurrencyFromText(val);
      // 3. Fiyat sütunu başlığından gelen döviz (örn: 'Fiyat (€)' veya 'Price ($)')
      const fromHeader = headerCurrency || null;

      if (fromCol) {
        detectedCurr = fromCol;
      } else if (fromVal) {
        detectedCurr = fromVal;
      } else if (fromHeader) {
        detectedCurr = fromHeader;
      } else {
        detectedCurr = 'TRY';
      }
    }

    // Ham sayısal tutarı çıkar
    const rawPrice = parseCleanFloat(val);

    let price = rawPrice;
    let originalPrice = rawPrice;
    let exchangeRate = 1.0;

    if (detectedCurr === 'USD') {
      exchangeRate = usdRate;
      price = Math.round(rawPrice * exchangeRate * 100) / 100;
      originalPrice = rawPrice;
    } else if (detectedCurr === 'EUR') {
      exchangeRate = eurRate;
      price = Math.round(rawPrice * exchangeRate * 100) / 100;
      originalPrice = rawPrice;
    } else {
      detectedCurr = 'TRY';
      exchangeRate = 1.0;
      price = rawPrice;
      originalPrice = rawPrice;
    }

    return {
      price,
      currency: detectedCurr,
      originalPrice,
      exchangeRate
    };
  }

  // Excel (.xlsx, .xls) Çalışma Sayfasından Hücreleri Çıkarıcı (Format ve Döviz Korumalı)
  function extractWorksheetRows(worksheet) {
    if (!worksheet) return [];
    if (typeof XLSX === 'undefined') return [];
    const formattedRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
    const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

    const maxRows = Math.max(formattedRows.length, rawRows.length);
    const result = [];

    for (let rIdx = 0; rIdx < maxRows; rIdx++) {
      const fRow = formattedRows[rIdx] || [];
      const rRow = rawRows[rIdx] || [];
      const maxCols = Math.max(fRow.length, rRow.length);
      const row = [];

      for (let cIdx = 0; cIdx < maxCols; cIdx++) {
        let fCell = fRow[cIdx];
        const rCell = rRow[cIdx];

        // Hücre nesnesini doğrudan kontrol et (cellObj.z format kodu ve cellObj.w)
        const cellRef = XLSX.utils && XLSX.utils.encode_cell ? XLSX.utils.encode_cell({ r: rIdx, c: cIdx }) : null;
        const cellObj = (cellRef && worksheet[cellRef]) ? worksheet[cellRef] : null;

        if (cellObj && cellObj.w && (String(cellObj.w).includes('€') || String(cellObj.w).includes('\u20AC') || String(cellObj.w).includes('$') || String(cellObj.w).includes('₺'))) {
          fCell = cellObj.w;
        }

        if (cellObj && cellObj.z && typeof cellObj.z === 'string') {
          const zCode = cellObj.z;
          const zUpper = zCode.toUpperCase();
          const curValStr = String(fCell !== undefined && fCell !== null && fCell !== '' ? fCell : (rCell || ''));
          const alreadyHasCurrency = curValStr.includes('€') || curValStr.includes('\u20AC') || curValStr.includes('$') || curValStr.includes('₺') || curValStr.toUpperCase().includes('EUR') || curValStr.toUpperCase().includes('USD');

          if (!alreadyHasCurrency) {
            if (zCode.includes('€') || zCode.includes('\u20AC') || zUpper.includes('EUR')) {
              fCell = `${curValStr} €`.trim();
            } else if (zCode.includes('₺') || zUpper.includes('TRY') || zUpper.includes('TL')) {
              fCell = `${curValStr} ₺`.trim();
            } else if (zCode.includes('[$$-') || (zCode.includes('$') && !zCode.includes('[$€') && !zCode.includes('[$₺')) || zUpper.includes('USD')) {
              fCell = `$${curValStr}`.trim();
            }
          }
        }

        if (fCell && (String(fCell).includes('€') || String(fCell).includes('\u20AC') || String(fCell).includes('$') || String(fCell).includes('₺'))) {
          row.push(fCell);
        } else {
          row.push((fCell !== undefined && fCell !== null && fCell !== '') ? fCell : rCell);
        }
      }
      result.push(row);
    }
    return result;
  }

  // Tırnak korumalı CSV satır ayrıştırıcı
  function parseCsvLine(line, delim) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === delim && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  // Otomatik Parça Kodu Üretici (Kullanıcı tablosunda parça kodu kolonu yoksa)
  function generatePartCode(name, index) {
    if (!name) return `PRC-${String(index + 1).padStart(3, '0')}`;
    const trMap = { 'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U' };
    let clean = name.replace(/[çÇğĞıİöÖşŞüÜ]/g, m => trMap[m] || m);
    clean = clean.toUpperCase().replace(/[^A-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const prefix = clean.slice(0, 10) || 'PARCA';
    return `PRC-${prefix}-${String(index + 1).padStart(3, '0')}`;
  }

  // Akıllı Kategori Tahmincisi
  function guessCategory(name) {
    if (!name) return 'Genel Parça & Sarf';
    const lower = name.toLowerCase();
    if (lower.includes('igbt') || lower.includes('mosfet') || lower.includes('diyot') || lower.includes('transistör') || lower.includes('kondansatör') || lower.includes('direnç') || lower.includes('entegre') || lower.includes('opto') || lower.includes('smd') || lower.includes('kart')) {
      return 'Elektronik & Kart';
    }
    if (lower.includes('röle') || lower.includes('role') || lower.includes('kontaktör') || lower.includes('şalt') || lower.includes('sigorta') || lower.includes('şalter') || lower.includes('klemens')) {
      return 'Röle & Şalt';
    }
    if (lower.includes('rulman') || lower.includes('kayış') || lower.includes('dişli') || lower.includes('motor') || lower.includes('pompa') || lower.includes('vana') || lower.includes('keçe') || lower.includes('ventil')) {
      return 'Mekanik & Rulman';
    }
    if (lower.includes('trafo') || lower.includes('güç kaynağı') || lower.includes('smps') || lower.includes('inverter') || lower.includes('sürücü')) {
      return 'Yarı İletken & Güç';
    }
    if (lower.includes('gaz') || lower.includes('kompresör') || lower.includes('soğutucu') || lower.includes('fan') || lower.includes('termostat') || lower.includes('ntc') || lower.includes('pt100') || lower.includes('sensör')) {
      return 'Sensör & Termal';
    }
    return 'Genel Parça & Sarf';
  }

  // Çoklu Ayraçlı & Başlık Esnek Akıllı Parça Veri Ayrıştırıcı (USD / EUR / TRY Çoklu Döviz Destekli)
  function parseStockData(input, sourceName = 'Metin', forcedCurrencyMode = null) {
    let rows = [];
    let delimiterDetected = 'Otomatik';

    lastBulkRawInput = input;
    lastBulkSourceName = sourceName;

    if (Array.isArray(input)) {
      rows = input;
      delimiterDetected = `Excel (.xlsx) - ${sourceName}`;
    } else if (typeof input === 'string') {
      const text = input.trim();
      if (!text) return { items: [], delimiter: 'Boş' };

      const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      if (rawLines.length === 0) return { items: [], delimiter: 'Boş' };

      let tabCount = 0;
      let semiCount = 0;
      let commaCount = 0;
      let pipeCount = 0;
      let multiSpaceCount = 0;

      const sample = rawLines.slice(0, 10);
      sample.forEach(line => {
        tabCount += (line.match(/\t/g) || []).length;
        semiCount += (line.match(/;/g) || []).length;
        commaCount += (line.match(/,/g) || []).length;
        pipeCount += (line.match(/\|/g) || []).length;
        multiSpaceCount += (line.match(/\s{2,}/g) || []).length;
      });

      let delim = ',';
      if (tabCount > 0 && tabCount >= semiCount && tabCount >= commaCount) {
        delim = '\t';
        delimiterDetected = 'Excel TAB (Kopyala/Yapıştır)';
      } else if (semiCount > 0 && semiCount >= commaCount) {
        delim = ';';
        delimiterDetected = 'Noktalı Virgül (Excel CSV ;)';
      } else if (pipeCount > 0 && pipeCount >= commaCount) {
        delim = '|';
        delimiterDetected = 'Boru Karakteri (|)';
      } else if (commaCount > 0) {
        delim = ',';
        delimiterDetected = 'Standart Virgül (,)';
      } else if (multiSpaceCount > 0) {
        delim = 'MULTI_SPACE';
        delimiterDetected = 'Boşluk Ayraçlı (Formatlı Metin)';
      } else {
        delim = ',';
        delimiterDetected = 'Metin Satırı';
      }

      rows = rawLines.map(line => {
        if (delim === 'MULTI_SPACE') {
          return line.split(/\s{2,}/).map(cleanCellValue);
        } else if (delim === '\t' || delim === '|') {
          return line.split(delim).map(cleanCellValue);
        } else {
          return parseCsvLine(line, delim).map(cleanCellValue);
        }
      });
    }

    // Boş satırları filtrele
    rows = rows.filter(r => r && Array.isArray(r) && r.some(c => c !== null && c !== undefined && String(c).trim() !== ''));
    if (rows.length === 0) return { items: [], delimiter: delimiterDetected };

    // Başlık satırı kontrolü ve haritalama (Türkçe İ/i, I/ı ve Kombine Nokta Uyumlu)
    function normalizeMatchText(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/İ/g, 'i')
        .replace(/I/g, 'i')
        .replace(/ı/g, 'i')
        .replace(/\u0130/g, 'i')
        .replace(/\u0131/g, 'i')
        .replace(/\u0307/g, '')
        .toLowerCase()
        .trim();
    }

    let startIndex = 0;
    const firstRow = rows[0].map(s => String(s || '').trim());

    function matchCol(cell, keywords) {
      if (!cell) return false;
      const normCell = normalizeMatchText(cell);
      return keywords.some(kw => {
        const normKw = normalizeMatchText(kw);
        if (normKw === 'ad' || normKw === 'adi') {
          return normCell === 'ad' || normCell === 'adi' || normCell.startsWith('ad ') || normCell.endsWith(' adi') || normCell.includes('parca adi') || normCell.includes('malzeme adi') || normCell.includes('urun adi');
        }
        return normCell === normKw || normCell.includes(normKw);
      });
    }

    let colMap = { seq: -1, code: -1, name: -1, category: -1, qty: -1, price: -1, currency: -1, warranty: -1, priceHeaderCurrency: null };
    let headerMatchCount = 0;

    firstRow.forEach((col, idx) => {
      if (matchCol(col, ['sıra', 's.no', 'sira', '#', 'no']) && col.length <= 6 && colMap.seq === -1) {
        colMap.seq = idx;
        headerMatchCount++;
      } else if (matchCol(col, ['parça kodu', 'malzeme kodu', 'stok kodu', 'ürün kodu', 'kod', 'code', 'part code', 'part no', 'part_number', 'p.kodu', 'p_kodu']) && colMap.code === -1) {
        colMap.code = idx;
        headerMatchCount++;
      } else if (matchCol(col, ['parça adı', 'parça tanımı', 'malzeme adı', 'malzeme tanımı', 'malzeme cinsi', 'ürün adı', 'ürün tanımı', 'açıklama', 'tanım', 'ad', 'adı', 'cinsi', 'tanımı', 'name', 'item', 'description']) && colMap.name === -1) {
        colMap.name = idx;
        headerMatchCount++;
      } else if (matchCol(col, ['kategori', 'kategorisi', 'grup', 'parça grubu', 'tür', 'türü', 'category', 'group']) && colMap.category === -1) {
        colMap.category = idx;
        headerMatchCount++;
      } else if (matchCol(col, ['adet', 'miktar', 'miktarı', 'stok', 'stok adedi', 'mevcut', 'mevcud', 'mevcudu', 'bakiye', 'sayı', 'kalan', 'envanter', 'qty', 'quantity', 'stock', 'count']) && colMap.qty === -1) {
        colMap.qty = idx;
        headerMatchCount++;
      } else if (matchCol(col, ['fiyat', 'birim fiyat', 'birim fiyatı', 'satış fiyatı', 'tutar', 'ücret', 'maliyet', 'bedel', 'price', 'unit price', 'cost']) && colMap.price === -1) {
        colMap.price = idx;
        headerMatchCount++;
        // Fiyat sütunu başlığında döviz sembolü/kodu var mı? (Örn: 'Fiyat (€)', 'Birim Fiyat ($)', 'Price (EUR)')
        colMap.priceHeaderCurrency = detectCurrencyFromText(col);
      } else if (matchCol(col, ['para birimi', 'döviz', 'döviz cinsi', 'para birim', 'currency', 'kur', 'pb', 'doviz', 'valuta', 'para', 'birim', '€', '$', 'eur', 'usd', 'tl', 'try']) && colMap.currency === -1) {
        colMap.currency = idx;
        headerMatchCount++;
      } else if (matchCol(col, ['garanti', 'garanti süresi', 'garanti (ay)', 'garanti ay', 'warranty', 'garanti_ay']) && colMap.warranty === -1) {
        colMap.warranty = idx;
        headerMatchCount++;
      }
    });

    const isHeader = rows.length > 1 && headerMatchCount >= 1 && (colMap.code !== -1 || colMap.name !== -1 || colMap.qty !== -1 || colMap.price !== -1);
    if (isHeader) {
      startIndex = 1;
    }

    const items = [];
    for (let i = startIndex; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length === 0) continue;

      let pCode = '';
      let pName = '';
      let pCategory = '';
      let pQty = 1;
      let pPrice = 100;
      let pCurrency = 'TRY';
      let pOrigPrice = 100;
      let pRate = 1.0;
      let pWar = '12';

      if (isHeader && (colMap.name !== -1 || colMap.code !== -1)) {
        if (colMap.code !== -1 && r[colMap.code]) pCode = String(r[colMap.code]).trim();
        if (colMap.name !== -1 && r[colMap.name]) pName = String(r[colMap.name]).trim();
        if (colMap.category !== -1 && r[colMap.category]) pCategory = String(r[colMap.category]).trim();
        if (colMap.qty !== -1 && r[colMap.qty]) pQty = parseCleanNumber(r[colMap.qty]);
        
        // Fiyat ve Para Birimi Ayrıştırma (TCMB Çevrimi ve Başlık Kuruyla)
        const rawPriceVal = colMap.price !== -1 ? r[colMap.price] : '';
        const rawCurrVal = colMap.currency !== -1 ? r[colMap.currency] : '';
        const parsedCur = parsePriceAndCurrency(rawPriceVal, rawCurrVal, forcedCurrencyMode, colMap.priceHeaderCurrency);
        pPrice = parsedCur.price;
        pCurrency = parsedCur.currency;
        pOrigPrice = parsedCur.originalPrice;
        pRate = parsedCur.exchangeRate;

        if (colMap.warranty !== -1 && r[colMap.warranty]) pWar = String(r[colMap.warranty]).replace(/[^0-9]/g, '') || '12';
        
        // Parça kodu yoksa otomatik üret
        if (!pCode && pName) {
          pCode = generatePartCode(pName, i);
        } else if (pCode && !pName) {
          pName = pCode;
        }
      } else {
        // Konumsal çıkarım (Sıra no tespitli)
        let offset = 0;
        if (r.length >= 3 && /^\d+$/.test(String(r[0]).trim()) && isNaN(Number(r[1]))) {
          offset = 1; // 1. kolon sıra numarası, atla
        }

        const col0 = String(r[offset] || '').trim();
        const col1 = String(r[offset + 1] || '').trim();

        if (!col0 && !col1) continue;

        if (r.length === 1 + offset) {
          pName = col0;
          pCode = generatePartCode(pName, i);
          pQty = 1;
        } else if (r.length === 2 + offset) {
          if (/^\d+$/.test(col1.replace(/[^0-9]/g, ''))) {
            pName = col0;
            pCode = generatePartCode(pName, i);
            pQty = parseCleanNumber(col1) || 1;
          } else {
            pCode = col0;
            pName = col1;
            pQty = 1;
          }
        } else {
          pCode = col0;
          pName = col1;

          const rem = r.slice(offset + 2);

          // Kalan kolonlar arasında döviz simgesi/kodu var mı akıllıca tara
          let remCurr = '';
          let remCurrIdx = -1;
          for (let k = 0; k < rem.length; k++) {
            const detected = detectCurrencyFromText(rem[k]);
            if (detected) {
              remCurr = rem[k];
              remCurrIdx = k;
              break;
            }
          }

          if (rem.length >= 5) {
            // Kategori, Miktar, Fiyat, Para Birimi, Garanti
            pCategory = String(rem[0] || '').trim();
            pQty = parseCleanNumber(rem[1]);
            const currVal = remCurrIdx !== -1 ? remCurr : (rem[3] || '');
            const parsedCur = parsePriceAndCurrency(rem[2], currVal, forcedCurrencyMode, colMap.priceHeaderCurrency);
            pPrice = parsedCur.price;
            pCurrency = parsedCur.currency;
            pOrigPrice = parsedCur.originalPrice;
            pRate = parsedCur.exchangeRate;
            pWar = String(rem[4] || '12').replace(/[^0-9]/g, '') || '12';
          } else if (rem.length === 4) {
            pCategory = String(rem[0] || '').trim();
            pQty = parseCleanNumber(rem[1]);
            let currVal = '';
            let warVal = '12';
            if (remCurrIdx === 3) {
              currVal = rem[3];
              warVal = '12';
            } else if (remCurrIdx !== -1) {
              currVal = remCurr;
              warVal = String(rem[3] || '12').replace(/[^0-9]/g, '') || '12';
            } else {
              warVal = String(rem[3] || '12').replace(/[^0-9]/g, '') || '12';
            }
            const parsedCur = parsePriceAndCurrency(rem[2], currVal, forcedCurrencyMode, colMap.priceHeaderCurrency);
            pPrice = parsedCur.price;
            pCurrency = parsedCur.currency;
            pOrigPrice = parsedCur.originalPrice;
            pRate = parsedCur.exchangeRate;
            pWar = warVal;
          } else if (rem.length === 3) {
            const c0IsNum = /^\d+$/.test(String(rem[0]).replace(/[^0-9]/g, ''));
            if (c0IsNum) {
              pQty = parseCleanNumber(rem[0]);
              const currVal = remCurrIdx === 2 ? rem[2] : (remCurrIdx !== -1 ? remCurr : '');
              const warVal = remCurrIdx === 2 ? '12' : (String(rem[2] || '12').replace(/[^0-9]/g, '') || '12');
              const parsedCur = parsePriceAndCurrency(rem[1], currVal, forcedCurrencyMode, colMap.priceHeaderCurrency);
              pPrice = parsedCur.price;
              pCurrency = parsedCur.currency;
              pOrigPrice = parsedCur.originalPrice;
              pRate = parsedCur.exchangeRate;
              pWar = warVal;
            } else {
              pCategory = String(rem[0] || '').trim();
              pQty = parseCleanNumber(rem[1]);
              const currVal = remCurrIdx === 2 ? rem[2] : (remCurrIdx !== -1 ? remCurr : '');
              const parsedCur = parsePriceAndCurrency(rem[2], currVal, forcedCurrencyMode, colMap.priceHeaderCurrency);
              pPrice = parsedCur.price;
              pCurrency = parsedCur.currency;
              pOrigPrice = parsedCur.originalPrice;
              pRate = parsedCur.exchangeRate;
            }
          } else if (rem.length === 2) {
            const r0Curr = detectCurrencyFromText(rem[0]);
            const r1Curr = detectCurrencyFromText(rem[1]);
            const c0IsNum = /^\d+$/.test(String(rem[0]).replace(/[^0-9]/g, ''));
            const c1IsNum = /^\d+$/.test(String(rem[1]).replace(/[^0-9]/g, ''));

            if (r1Curr || remCurrIdx === 1) {
              if (c0IsNum) {
                pQty = parseCleanNumber(rem[0]);
              } else {
                pCategory = String(rem[0] || '').trim();
                pQty = 1;
              }
              const parsedCur = parsePriceAndCurrency(rem[1], remCurrIdx === 1 ? remCurr : '', forcedCurrencyMode, colMap.priceHeaderCurrency);
              pPrice = parsedCur.price;
              pCurrency = parsedCur.currency;
              pOrigPrice = parsedCur.originalPrice;
              pRate = parsedCur.exchangeRate;
            } else if (r0Curr) {
              const parsedCur = parsePriceAndCurrency(rem[0], rem[1], forcedCurrencyMode, colMap.priceHeaderCurrency);
              pPrice = parsedCur.price;
              pCurrency = parsedCur.currency;
              pOrigPrice = parsedCur.originalPrice;
              pRate = parsedCur.exchangeRate;
              pQty = 1;
            } else if (c0IsNum && c1IsNum) {
              pQty = parseCleanNumber(rem[0]);
              const parsedCur = parsePriceAndCurrency(rem[1], '', forcedCurrencyMode, colMap.priceHeaderCurrency);
              pPrice = parsedCur.price;
              pCurrency = parsedCur.currency;
              pOrigPrice = parsedCur.originalPrice;
              pRate = parsedCur.exchangeRate;
            } else if (!c0IsNum && c1IsNum) {
              pCategory = String(rem[0] || '').trim();
              pQty = parseCleanNumber(rem[1]);
            } else {
              pCategory = String(rem[0] || '').trim();
              pQty = 1;
            }
          } else if (rem.length === 1) {
            const hasCurr = detectCurrencyFromText(rem[0]);
            const isPlainMoney = /[€$₺]|eur|usd|try|tl/i.test(String(rem[0])) || (forcedCurrencyMode && forcedCurrencyMode !== 'AUTO');
            if (hasCurr || isPlainMoney) {
              pQty = 1;
              const parsedCur = parsePriceAndCurrency(rem[0], '', forcedCurrencyMode, colMap.priceHeaderCurrency);
              pPrice = parsedCur.price;
              pCurrency = parsedCur.currency;
              pOrigPrice = parsedCur.originalPrice;
              pRate = parsedCur.exchangeRate;
            } else {
              pQty = parseCleanNumber(rem[0]) || 1;
            }
          }
        }
      }

      if (pName || pCode) {
        if (!pName) pName = pCode;
        if (!pCode) pCode = generatePartCode(pName, i);
        if (!pCategory) pCategory = guessCategory(pName);

        items.push({
          code: pCode,
          name: pName,
          category: pCategory,
          qty: Math.max(0, pQty),
          price: pPrice > 0 ? pPrice : 100,
          currency: pCurrency || 'TRY',
          originalPrice: pOrigPrice || pPrice,
          exchangeRate: pRate || 1.0,
          warranty: `${pWar || '12'} Ay`
        });
      }
    }

    return { items, delimiter: delimiterDetected };
  }

  // Canlı Önizleme Render Fonksiyonu (Döviz Rozetleri & TCMB Karşılığı ile)
  function renderBulkPreview(items, formatName) {
    if (!bulkPreviewContainer) return;

    if (!items || items.length === 0) {
      bulkPreviewContainer.style.display = 'none';
      if (btnSubmitBulk) {
        btnSubmitBulk.disabled = true;
        if (btnSubmitBulkText) btnSubmitBulkText.textContent = '🚀 Toplu Stoğu Sisteme Aktar';
      }
      return;
    }

    bulkPreviewContainer.style.display = 'block';
    if (bulkPreviewSummary) bulkPreviewSummary.textContent = `✅ ${items.length} Parça Kalemi Algılandı`;
    if (bulkPreviewDelimiterBadge) bulkPreviewDelimiterBadge.textContent = `Format: ${formatName}`;

    // Tabloyu doldur (ilk 8 satır)
    const previewList = items.slice(0, 8);
    if (bulkPreviewTbody) {
      bulkPreviewTbody.innerHTML = previewList.map((item, idx) => `
        <tr>
          <td style="color: var(--text-dim);">${idx + 1}</td>
          <td><strong style="color: var(--accent-cyan); font-family: 'JetBrains Mono', monospace;">${escapeHtml(item.code)}</strong></td>
          <td>${escapeHtml(item.name)}</td>
          <td><span class="stock-cat-tag">${escapeHtml(item.category)}</span></td>
          <td style="text-align: right; font-weight: 700; color: #34D399;">+${item.qty} Adet</td>
          <td style="text-align: right;">
            ${item.currency && item.currency !== 'TRY' ? `
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px;">
                <span class="currency-badge currency-badge-${item.currency.toLowerCase()}" style="font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;" title="Orijinal Fiyat: ${item.currency === 'USD' ? '$' : '€'}${item.originalPrice?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - TCMB Kuru: ${item.exchangeRate?.toFixed(2)} ₺">
                  ${item.currency === 'USD' ? '$' : '€'}${item.originalPrice?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <strong style="color: #10B981; font-size: 0.88rem;">${item.price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</strong>
                <span style="font-size: 0.68rem; color: var(--text-dim);">(TCMB: ${item.exchangeRate?.toFixed(2)} ₺)</span>
              </div>
            ` : `
              <strong style="color: #10B981; font-size: 0.9rem;">${item.price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</strong>
            `}
          </td>
          <td style="text-align: center; color: var(--text-muted);">${escapeHtml(item.warranty)}</td>
        </tr>
      `).join('');
    }

    if (items.length > 8) {
      if (bulkPreviewMoreNote) bulkPreviewMoreNote.style.display = 'block';
      if (bulkPreviewMoreCount) bulkPreviewMoreCount.textContent = items.length - 8;
    } else {
      if (bulkPreviewMoreNote) bulkPreviewMoreNote.style.display = 'none';
    }

    if (btnSubmitBulk) {
      btnSubmitBulk.disabled = false;
      if (btnSubmitBulkText) btnSubmitBulkText.textContent = `🚀 ${items.length} Kalem Parçayı Sisteme Aktar`;
    }
  }

  // Toplu Yükleme Döviz Seçim Çubuğu ve Canlı TCMB Rozeti
  const bulkCurrencyModeSelect = document.getElementById('bulk-currency-mode');
  const bulkTcmbBadge = document.getElementById('bulk-tcmb-badge');

  function updateBulkTcmbBadge() {
    if (!bulkTcmbBadge) return;
    const rates = (state && state.exchangeRates) ? state.exchangeRates : { USD: 38.50, EUR: 41.20 };
    bulkTcmbBadge.textContent = `TCMB: $${(rates.USD || 38.50).toFixed(2)} | €${(rates.EUR || 41.20).toFixed(2)}`;
  }

  function reparseBulkData() {
    if (!lastBulkRawInput) return;
    const forcedMode = bulkCurrencyModeSelect ? bulkCurrencyModeSelect.value : 'AUTO';
    const { items, delimiter } = parseStockData(lastBulkRawInput, lastBulkSourceName, forcedMode);
    bulkParsedItems = items;
    bulkDetectedFormat = delimiter;
    renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
    if (items.length > 0) {
      const modeText = forcedMode === 'AUTO' ? 'Otomatik Algılama' : (forcedMode === 'USD' ? 'Tüm Liste USD ($)' : (forcedMode === 'EUR' ? 'Tüm Liste EUR (€)' : 'Tüm Liste TL (₺)'));
      showToast(`💱 Kurlar güncellendi: ${items.length} parça [${modeText}] ile yeniden hesaplandı.`);
    }
  }

  if (bulkCurrencyModeSelect) {
    bulkCurrencyModeSelect.addEventListener('change', reparseBulkData);
  }

  // Dosya İşleme (File Object)
  function processSelectedFile(file) {
    if (!file) return;

    if (selectedFileBadge && selectedFileName && selectedFileSize) {
      selectedFileName.textContent = file.name;
      selectedFileSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
      selectedFileBadge.style.display = 'flex';
    }

    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          if (typeof XLSX === 'undefined') {
            showToast("Excel kütüphanesi hazır değil, lütfen CSV veya metin formatını deneyin.");
            return;
          }
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rows = extractWorksheetRows(worksheet);
          const { items } = parseStockData(rows, file.name);
          bulkParsedItems = items;
          bulkDetectedFormat = `Excel Çalışma Sayfası (${file.name})`;
          renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
          if (items.length > 0) {
            showToast(`📊 Excel dosyası başarıyla okundu: ${items.length} parça algılandı.`);
          } else {
            showToast(`⚠️ Excel dosyasında okunabilir parça satırı bulunamadı.`);
          }
        } catch (err) {
          console.error("Excel parse error:", err);
          showToast(`Excel dosyası okunamadı: ${err.message}`);
        }
      };
      reader.onerror = function() {
        showToast("Dosya okuma hatası oluştu.");
      };
      reader.readAsArrayBuffer(file);
    } else {
      // CSV, TSV, TXT
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          let text = e.target.result;
          if (typeof text === 'string') {
            text = text.replace(/â‚¬|\u0080|&euro;|&#8364;/gi, '€');
          }
          const { items, delimiter } = parseStockData(text, file.name);
          bulkParsedItems = items;
          bulkDetectedFormat = `${delimiter} (${file.name})`;
          renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
          if (items.length > 0) {
            showToast(`📄 Metin/CSV dosyası başarıyla okundu: ${items.length} parça algılandı.`);
          } else {
            showToast(`⚠️ Dosyada okunabilir parça satırı bulunamadı.`);
          }
        } catch (err) {
          console.error("Text/CSV parse error:", err);
          showToast(`Dosya okunamadı: ${err.message}`);
        }
      };
      reader.onerror = function() {
        showToast("Dosya okuma hatası oluştu.");
      };
      reader.readAsText(file);
    }
  }

  if (btnOpenBulk && bulkModal) {
    btnOpenBulk.addEventListener('click', () => { 
      updateBulkTcmbBadge();
      bulkModal.style.display = 'flex'; 
    });
    if (btnCloseBulk) btnCloseBulk.addEventListener('click', () => { bulkModal.style.display = 'none'; });
    if (btnCancelBulk) btnCancelBulk.addEventListener('click', () => { bulkModal.style.display = 'none'; });
    bulkModal.addEventListener('click', (e) => {
      if (e.target === bulkModal) bulkModal.style.display = 'none';
    });

    // Sekme 1: Dropzone & File Input
    if (bulkDropzone && bulkFileInput) {
      bulkDropzone.addEventListener('click', () => bulkFileInput.click());
      if (btnBrowseFile) {
        btnBrowseFile.addEventListener('click', (e) => {
          e.stopPropagation();
          bulkFileInput.click();
        });
      }

      bulkFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          processSelectedFile(e.target.files[0]);
        }
      });

      bulkDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        bulkDropzone.classList.add('drag-over');
      });
      bulkDropzone.addEventListener('dragleave', () => {
        bulkDropzone.classList.remove('drag-over');
      });
      bulkDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        bulkDropzone.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processSelectedFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (btnClearBulkFile) {
      btnClearBulkFile.addEventListener('click', () => {
        if (bulkFileInput) bulkFileInput.value = '';
        if (selectedFileBadge) selectedFileBadge.style.display = 'none';
        bulkParsedItems = [];
        renderBulkPreview([], '');
      });
    }

    // Sekme 2: Dosya Yolu veya Web Linki Oku & Getir
    if (btnFetchFileLink && bulkFilePathInput) {
      btnFetchFileLink.addEventListener('click', async () => {
        const pathVal = bulkFilePathInput.value.trim();
        if (!pathVal) {
          showToast("Lütfen bir dosya yolu veya web linki girin.");
          return;
        }

        btnFetchFileLink.disabled = true;
        btnFetchFileLink.innerHTML = '<span>⏳ Okunuyor...</span>';

        try {
          const res = await fetch(`${API_BASE_URL}/api/stock/read-file-or-url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path_or_url: pathVal })
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.detail || "Dosya okunamadı.");
          }

          const data = await res.json();
          if (data.is_base64 && typeof XLSX !== 'undefined') {
            const binaryString = atob(data.data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const workbook = XLSX.read(bytes, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const rows = extractWorksheetRows(worksheet);
            const { items } = parseStockData(rows, data.filename);
            bulkParsedItems = items;
            bulkDetectedFormat = `Excel (${data.filename})`;
            renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
            showToast(`✅ Dosya başarıyla okundu: ${items.length} parça algılandı.`);
          } else {
            let fileText = data.data;
            if (typeof fileText === 'string') {
              fileText = fileText.replace(/â‚¬|\u0080|&euro;|&#8364;/gi, '€');
            }
            const { items, delimiter } = parseStockData(fileText, data.filename);
            bulkParsedItems = items;
            bulkDetectedFormat = `${delimiter} (${data.filename})`;
            renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
            showToast(`✅ Dosya başarıyla okundu: ${items.length} parça algılandı.`);
          }
        } catch (err) {
          console.warn("Backend read failed:", err);
          if (pathVal.startsWith("http://") || pathVal.startsWith("https://")) {
            try {
              const resp = await fetch(pathVal);
              const text = await resp.text();
              const { items, delimiter } = parseStockData(text, 'Web URL');
              bulkParsedItems = items;
              bulkDetectedFormat = `${delimiter} (Web URL)`;
              renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
              showToast(`✅ Linkten veri çekildi: ${items.length} parça algılandı.`);
            } catch (fetchErr) {
              showToast(`Bağlantıdan dosya çekilemedi: ${fetchErr.message}`);
            }
          } else {
            // Tarayıcı güvenlik sandbox'ı yerel yola izin vermez ve backend offline ise
            showToast(`📁 Yerel dosya yoluna doğrudan erişim tarayıcı güvenliği gereği kısıtlıdır. Dosya seçim penceresi açılıyor...`);
            const tabFileBtn = document.querySelector('.bulk-tab-btn[data-tab="tab-bulk-file"]');
            if (tabFileBtn) tabFileBtn.click();
            setTimeout(() => {
              if (bulkFileInput) bulkFileInput.click();
            }, 300);
          }
        } finally {
          btnFetchFileLink.disabled = false;
          btnFetchFileLink.innerHTML = '<span>📥 Oku & Getir</span>';
        }
      });
    }

    // Sekme 3: Kopyala & Yapıştır Canlı Dinleme
    const handleTextareaInput = () => {
      if (!textareaBulk) return;
      let text = textareaBulk.value.trim();
      if (!text) {
        bulkParsedItems = [];
        renderBulkPreview([], '');
        return;
      }
      text = text.replace(/â‚¬|\u0080|&euro;|&#8364;/gi, '€');
      const { items, delimiter } = parseStockData(text, 'Yapıştırılan Metin');
      bulkParsedItems = items;
      bulkDetectedFormat = delimiter;
      renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
    };

    if (textareaBulk) {
      textareaBulk.addEventListener('input', handleTextareaInput);
      textareaBulk.addEventListener('paste', () => {
        setTimeout(handleTextareaInput, 60);
      });
    }

    const btnParseBulkTextarea = document.getElementById('btn-parse-bulk-textarea');
    if (btnParseBulkTextarea) {
      btnParseBulkTextarea.addEventListener('click', () => {
        handleTextareaInput();
        if (bulkParsedItems.length > 0) {
          showToast(`✅ ${bulkParsedItems.length} parça ayrıştırıldı ve önizlemeye yüklendi.`);
        } else {
          showToast(`⚠️ Yapıştırılan metinde geçerli parça satırı bulunamadı.`);
        }
      });
    }

    const btnClearBulkTextarea = document.getElementById('btn-clear-bulk-textarea');
    if (btnClearBulkTextarea) {
      btnClearBulkTextarea.addEventListener('click', () => {
        if (textareaBulk) textareaBulk.value = '';
        bulkParsedItems = [];
        renderBulkPreview([], '');
        showToast("Metin alanı temizlendi.");
      });
    }

    // Örnek Veri Doldur (Çoklu Para Birimli & Simgeli Örnekler)
    if (btnSampleBulk) {
      btnSampleBulk.addEventListener('click', () => {
        const sampleText = `RULMAN-6204\t6204-2RS Yüksek Hızlı Rulman\tMekanik & Rulman\t25\t180\tTRY\t12
IGBT-SEMIKRON\tSemikron SKM100GB12T4 Güç Modülü\tElektronik & Kart\t10\t$45.00\tUSD\t24
INVERTER-FAN\tSchneider ATV Sürücü Soğutma Fanı\tSensör & Termal\t6\t120.00 €\tEUR\t12
SIGORTA-16A\t16A C Tipi Otomat Sigorta\tRöle & Şalt\t50\t65\tTRY\t24
POMPA-220V\tSirkülasyon Devridaim Pompası\tMekanik & Rulman\t12\t1150\tTRY\t24
TRAFO-220-24\t220V/24V 5A Ray Tipi Güç Kaynağı\tYarı İletken & Güç\t15\t420\tTRY\t12`;
        
        const pasteTabBtn = document.querySelector('.bulk-tab-btn[data-tab="tab-bulk-paste"]');
        if (pasteTabBtn) pasteTabBtn.click();
        if (textareaBulk) {
          textareaBulk.value = sampleText;
          const { items, delimiter } = parseStockData(sampleText, 'Örnek Excel TAB');
          bulkParsedItems = items;
          bulkDetectedFormat = delimiter;
          renderBulkPreview(bulkParsedItems, bulkDetectedFormat);
        }
        showToast("📝 Örnek 6 parça (USD, EUR ve TRY kurlarıyla) dolduruldu!");
      });
    }

    // Örnek CSV Şablonu İndir (Çoklu Para Birimli Sütun Ekli)
    if (btnDownloadTemplate) {
      btnDownloadTemplate.addEventListener('click', () => {
        const templateContent = `PARCA_KODU,PARCA_ADI,KATEGORI,ADET,FIYAT,PARA_BIRIMI,GARANTI_AY
RULMAN-6204,6204-2RS Yüksek Hızlı Rulman,Mekanik & Rulman,25,180.00,TRY,12
IGBT-SEMIKRON,Semikron SKM100GB12T4 Güç Modülü,Elektronik & Kart,10,45.00,USD,24
INVERTER-FAN,Schneider ATV Sürücü Soğutma Fanı,Sensör & Termal,6,120.00,EUR,12
SIGORTA-16A,16A C Tipi Otomat Sigorta,Röle & Şalt,50,65.00,TRY,24
POMPA-220V,Sirkülasyon Devridaim Pompası,Mekanik & Rulman,12,1150.00,TRY,24
TRAFO-220-24,220V/24V 5A Ray Tipi Güç Kaynağı,Yarı İletken & Güç,15,420.00,TRY,12`;

        const blob = new Blob(["\uFEFF" + templateContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'servisai_yedek_parca_sablonu.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("📥 Çoklu para birimi (USD, EUR, TRY) destekli parça şablonu indirildi.");
      });
    }

    // Toplu Stoğu Sisteme Aktar (Onay & Commit)
    if (btnSubmitBulk) {
      btnSubmitBulk.addEventListener('click', async () => {
        if (!bulkParsedItems || bulkParsedItems.length === 0) {
          showToast("Aktarılacak parça bulunamadı. Lütfen bir dosya seçin veya veri yapıştırın.");
          return;
        }

        btnSubmitBulk.disabled = true;
        if (btnSubmitBulkText) btnSubmitBulkText.textContent = '⏳ Stoğa İşleniyor...';

        let count = 0;
        const csvRowsForBackend = [];

        bulkParsedItems.forEach(item => {
          // Eğer kategori listede yoksa dinamik ekle
          if (item.category && !state.categories.some(c => c.name.toLowerCase() === item.category.toLowerCase())) {
            state.categories.push({
              id: 'cat-' + Date.now() + Math.floor(Math.random() * 1000),
              name: item.category,
              icon: '🏷️',
              description: 'Toplu yükleme ile içe aktarılan kategori'
            });
            saveCustomCategories();
          }

          let exist = state.stock.find(p => p.code.toLowerCase() === item.code.toLowerCase());
          if (exist) {
            exist.central += item.qty;
            if (item.category && item.category !== 'Genel Parça & Sarf') exist.category = item.category;
            if (item.price > 0) exist.price = item.price;
            if (item.currency) exist.currency = item.currency;
            if (item.originalPrice) exist.originalPrice = item.originalPrice;
            if (item.exchangeRate) exist.exchangeRate = item.exchangeRate;
            if (item.warranty) exist.warranty = item.warranty;
          } else {
            state.stock.push({
              code: item.code,
              name: item.name,
              category: item.category,
              central: item.qty,
              workshop: 0,
              vehicle1: 0,
              vehicle2: 0,
              price: item.price,
              currency: item.currency || 'TRY',
              originalPrice: item.originalPrice || item.price,
              exchangeRate: item.exchangeRate || 1.0,
              warranty: item.warranty
            });
          }

          csvRowsForBackend.push(`${item.code},${item.name},${item.category},${item.qty},${item.price},${item.warranty.replace(/[^0-9]/g, '')}`);
          count++;
        });

        // Kalıcı depolamaya kaydet
        saveStockToLocalStorage();

        // Backend senkronizasyonu
        try {
          await fetch(`${API_BASE_URL}/api/stock/bulk-import-csv`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ csv_text: csvRowsForBackend.join('\n') })
          });
        } catch (err) {
          console.warn("Backend bulk sync note:", err);
        }

        // Ön yüzü ve sayaçları anında güncelle
        renderStockTable();
        renderStockCategoryPills();
        updateStockCategoryDropdown();
        updateVehiclePartDropdown();

        // Modalı kapat ve sıfırla
        bulkModal.style.display = 'none';
        bulkParsedItems = [];
        renderBulkPreview([], '');
        if (textareaBulk) textareaBulk.value = '';
        if (bulkFileInput) bulkFileInput.value = '';
        if (selectedFileBadge) selectedFileBadge.style.display = 'none';
        if (bulkFilePathInput) bulkFilePathInput.value = '';

        showToast(`🚀 Harika! ${count} kalem yedek parça başarıyla Merkez Depo stoğuna işlendi!`);
      });
    }
  }
}

// ==================== Yeni Periyodik Bakım ve Garanti Sözleşmesi Yönetimi ====================
function initMaintenanceActions() {
  const btnOpen = document.getElementById('btn-open-maintenance-modal');
  const modal = document.getElementById('maintenance-modal');
  const btnClose = document.getElementById('btn-close-maintenance-modal');
  const btnCancel = document.getElementById('btn-cancel-maintenance');
  const form = document.getElementById('form-new-maintenance');

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => {
      // Default tarihleri otomatik ayarla (Sıradaki bakım: 1 ay sonra, Garanti bitiş: 1 yıl sonra)
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);

      const dueDateInput = document.getElementById('maint-due-date');
      const warrantyEndInput = document.getElementById('maint-warranty-end');

      if (dueDateInput && !dueDateInput.value) {
        dueDateInput.value = nextMonth.toISOString().split('T')[0];
      }
      if (warrantyEndInput && !warrantyEndInput.value) {
        warrantyEndInput.value = nextYear.toISOString().split('T')[0];
      }

      modal.style.display = 'flex';
    });

    const closeModal = () => { modal.style.display = 'none'; };
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const custName = document.getElementById('maint-cust-name').value.trim();
        const custPhone = document.getElementById('maint-cust-phone').value.trim();
        const devBrand = document.getElementById('maint-dev-brand').value.trim();
        const devModel = document.getElementById('maint-dev-model').value.trim();
        const serialNo = document.getElementById('maint-serial-no').value.trim();
        const period = document.getElementById('maint-period').value;
        const dueDate = document.getElementById('maint-due-date').value;
        const warrantyType = document.getElementById('maint-warranty-type').value;
        const warrantyEnd = document.getElementById('maint-warranty-end').value;

        // Türkçe tarih formatlama
        const formatTrDate = (dateStr) => {
          if (!dateStr) return "Belirtilmedi";
          const [y, m, d] = dateStr.split('-');
          const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
          return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
        };

        const newMaintItem = {
          customer: custName,
          device: `${devBrand} ${devModel}`,
          serial_number: serialNo || `SN-${devBrand.slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`,
          period: period,
          dueDate: formatTrDate(dueDate),
          warranty: warrantyType,
          warrantyEnd: formatTrDate(warrantyEnd),
          status: "Sözleşme Aktif"
        };

        // Canlı Backend API Kaydı
        try {
          const res = await fetch(`${API_BASE_URL}/api/maintenance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer_name: custName,
              customer_phone: custPhone,
              device_brand: devBrand,
              device_model: devModel,
              serial_number: serialNo,
              period_months: period.includes('3') ? 3 : period.includes('Yıllık') ? 12 : period.includes('Aylık') && !period.includes('6') ? 1 : 6,
              due_date: dueDate,
              warranty_type: warrantyType,
              warranty_end: warrantyEnd
            })
          });
          if (res.ok) {
            const data = await res.json();
            newMaintItem.id = data.plan_id;
          }
        } catch (err) {
          console.log("ServisAI: Backend çevrimdışı, yerel önbelleğe kaydedildi.");
        }

        state.maintenance.unshift(newMaintItem);
        renderMaintenance();
        modal.style.display = 'none';
        form.reset();
        showToast(`✅ "${custName}" için ${period} periyodik bakım ve garanti sözleşmesi sisteme kaydedildi!`);
      });
    }
  }
}

// ==================== Depo & Mobil Araçlar Arası Parça Transfer Modalı ====================
function openStockTransferModal(partCode = null, preSelectTo = null, preSelectFrom = 'central') {
  const modal = document.getElementById('transfer-modal');
  if (!modal) return;

  const partSelect = document.getElementById('select-transfer-part');
  const fromSelect = document.getElementById('select-transfer-from');
  const toSelect = document.getElementById('select-transfer-to');
  const qtyInput = document.getElementById('input-transfer-qty');

  // Parçaları doldur
  if (partSelect && state.stock) {
    partSelect.innerHTML = state.stock.map(p => `
      <option value="${p.code}">${p.name} (${p.code}) - Birim: ${p.price} ₺</option>
    `).join('');
    if (partCode && state.stock.some(p => p.code === partCode)) {
      partSelect.value = partCode;
    }
  }

  // Lokasyonları dinamik doldur
  const populateLocOptions = (selectEl, defaultVal) => {
    if (!selectEl) return;
    let html = `
      <option value="central">🏢 Merkez Ana Depo (Ataşehir)</option>
      <option value="workshop">🔬 Merkez Atölye / Laboratuvar</option>
      <option value="vehicle1">🚗 Servis Aracı 1 (34 ABC 101 - Murat Aydın)</option>
      <option value="vehicle2">🚗 Servis Aracı 2 (34 DEF 202 - Caner Güler)</option>
    `;
    if (state.vehicles && state.vehicles.length > 0) {
      state.vehicles.forEach(v => {
        if (v.plate !== '34 ABC 101' && v.plate !== '34 DEF 202') {
          html += `<option value="veh_${v.id || v.plate}">🚗 ${v.plate} (${v.driverName || 'Havuz Aracı'})</option>`;
        }
      });
    }
    selectEl.innerHTML = html;
    if (defaultVal) {
      selectEl.value = defaultVal;
    }
  };

  populateLocOptions(fromSelect, preSelectFrom || 'central');
  populateLocOptions(toSelect, preSelectTo || 'vehicle1');

  if (qtyInput) qtyInput.value = '1';

  if (typeof window.updateTransferPreviewGlobal === 'function') {
    window.updateTransferPreviewGlobal();
  }

  modal.style.display = 'flex';
}
window.openStockTransferModal = openStockTransferModal;
window.openTransferModalWithPart = openStockTransferModal;

function initStockTransferModal() {
  const btnOpen = document.getElementById('btn-transfer-part') || document.getElementById('btn-open-transfer-modal');
  const modal = document.getElementById('transfer-modal');
  const btnClose = document.getElementById('btn-close-transfer-modal');
  const btnCancel = document.getElementById('btn-cancel-transfer');
  const form = document.getElementById('form-stock-transfer');

  const partSelect = document.getElementById('select-transfer-part');
  const fromSelect = document.getElementById('select-transfer-from');
  const toSelect = document.getElementById('select-transfer-to');
  const qtyInput = document.getElementById('input-transfer-qty');

  const fromNameEl = document.getElementById('tp-from-name');
  const fromStockEl = document.getElementById('tp-from-stock');
  const toNameEl = document.getElementById('tp-to-name');
  const toStockEl = document.getElementById('tp-to-stock');
  const resultMsgEl = document.getElementById('tp-result-msg');
  const submitBtn = document.getElementById('btn-submit-transfer');

  const locLabels = {
    central: "Merkez Ana Depo",
    vehicle1: "34 ABC 101 (Murat Aydın)",
    vehicle2: "34 DEF 202 (Caner Güler)",
    workshop: "Merkez Atölye"
  };

  const getLocLabel = (locKey) => {
    if (locLabels[locKey]) return locLabels[locKey];
    if (locKey && locKey.startsWith('veh_')) {
      const vId = locKey.replace('veh_', '');
      const veh = (state.vehicles || []).find(v => String(v.id) === vId || v.plate === vId);
      if (veh) return `${veh.plate} (${veh.driverName || 'Havuz Aracı'})`;
    }
    return locKey || 'Bilinmeyen Lokasyon';
  };

  const getStockQty = (part, locKey) => {
    if (!part) return 0;
    if (locKey === 'central') return part.central || 0;
    if (locKey === 'vehicle1') return part.vehicle1 || 0;
    if (locKey === 'vehicle2') return part.vehicle2 || 0;
    if (locKey === 'workshop') return part.workshop !== undefined ? part.workshop : 10;
    if (part[locKey] !== undefined) return part[locKey];
    return 0;
  };

  const setStockQty = (part, locKey, delta) => {
    if (!part) return;
    if (locKey === 'central') part.central = Math.max(0, (part.central || 0) + delta);
    else if (locKey === 'vehicle1') part.vehicle1 = Math.max(0, (part.vehicle1 || 0) + delta);
    else if (locKey === 'vehicle2') part.vehicle2 = Math.max(0, (part.vehicle2 || 0) + delta);
    else if (locKey === 'workshop') part.workshop = Math.max(0, (part.workshop !== undefined ? part.workshop : 10) + delta);
    else {
      part[locKey] = Math.max(0, (part[locKey] || 0) + delta);
    }
  };

  function updateTransferPreview() {
    if (!partSelect || !fromSelect || !toSelect || !qtyInput) return;

    const partCode = partSelect.value;
    const part = state.stock.find(p => p.code === partCode) || state.stock[0];
    const fromLoc = fromSelect.value;
    const toLoc = toSelect.value;
    const qty = parseInt(qtyInput.value) || 1;

    const fromName = getLocLabel(fromLoc);
    const toName = getLocLabel(toLoc);

    const fromQty = getStockQty(part, fromLoc);
    const toQty = getStockQty(part, toLoc);

    if (fromNameEl) fromNameEl.textContent = fromName;
    if (fromStockEl) fromStockEl.textContent = `Mevcut: ${fromQty} Adet`;
    if (toNameEl) toNameEl.textContent = toName;
    if (toStockEl) toStockEl.textContent = `Mevcut: ${toQty} Adet`;

    if (fromLoc === toLoc) {
      if (resultMsgEl) resultMsgEl.innerHTML = `<span style="color: var(--accent-rose); font-weight: 600;">⚠️ Kaynak ve hedef lokasyon aynı olamaz! Lütfen farklı bir lokasyon seçin.</span>`;
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (qty > fromQty) {
      if (resultMsgEl) resultMsgEl.innerHTML = `<span style="color: var(--accent-rose); font-weight: 600;">⚠️ Kaynak depoda yeterli stok yok! (Mevcut: ${fromQty} adet, Talep: ${qty} adet)</span>`;
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (qty <= 0) {
      if (resultMsgEl) resultMsgEl.innerHTML = `<span style="color: var(--accent-amber); font-weight: 600;">⚠️ Lütfen en az 1 adet transfer miktarı girin.</span>`;
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (submitBtn) submitBtn.disabled = false;
    const afterFrom = fromQty - qty;
    const afterTo = toQty + qty;
    if (resultMsgEl) {
      resultMsgEl.innerHTML = `Transfer Sonrası: Kaynakta <span class="text-cyan">${afterFrom}</span> adet kalacak, hedefte <span class="text-success">${afterTo}</span> adet olacak.`;
    }
  }
  window.updateTransferPreviewGlobal = updateTransferPreview;

  if (modal) {
    if (btnOpen) {
      btnOpen.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        openStockTransferModal();
      });
    }

    const closeModal = (e) => { 
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      modal.style.display = 'none'; 
    };

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(e);
    });

    if (partSelect) partSelect.addEventListener('change', updateTransferPreview);
    if (fromSelect) fromSelect.addEventListener('change', updateTransferPreview);
    if (toSelect) toSelect.addEventListener('change', updateTransferPreview);
    if (qtyInput) qtyInput.addEventListener('input', updateTransferPreview);

    const executeTransfer = async (e) => {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }

      const partCode = partSelect.value;
      const part = state.stock.find(p => p.code === partCode);
      const fromLoc = fromSelect.value;
      const toLoc = toSelect.value;
      const qty = parseInt(qtyInput.value) || 1;

      if (!part) {
        showToast("⚠️ Transfer edilecek parça bulunamadı.");
        return;
      }
      const fromQty = getStockQty(part, fromLoc);

      if (fromLoc === toLoc) {
        showToast("⚠️ Kaynak ve hedef lokasyon aynı olamaz!");
        return;
      }

      if (qty > fromQty) {
        showToast(`⚠️ Kaynakta yeterli stok yok! (Mevcut: ${fromQty})`);
        return;
      }

      // Yerel State Güncellemesi
      setStockQty(part, fromLoc, -qty);
      setStockQty(part, toLoc, qty);
      saveStockToLocalStorage();
      renderStockTable();
      updateVehiclePartDropdown();

      modal.style.display = 'none';
      const fromName = getLocLabel(fromLoc);
      const toName = getLocLabel(toLoc);
      showToast(`🔄 ${qty} adet ${part.name}, ${fromName} ➔ ${toName} lokasyonuna başarıyla transfer edildi!`);

      // Canlı Backend API Çağrısı (Arka planda asenkron)
      fetch(`${API_BASE_URL}/api/stock/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_location: fromLoc,
          to_location: toLoc,
          part_code: partCode,
          quantity: qty
        })
      }).catch(() => {});
    };

    if (form) {
      form.addEventListener('submit', executeTransfer);
    }
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        executeTransfer(e);
      });
    }
  }
}

// ==================== 2. Technician Functions & Multi-Technician Switcher ====================
function populateActiveTechDropdown() {
  const select = document.getElementById('select-active-tech');
  if (!select) return;

  const fieldStaff = (state.staff || []).filter(p => p.role !== 'Yönetici' && p.status !== 'Ayrıldı');
  if (fieldStaff.length === 0) {
    select.innerHTML = '<option value="">Personel Bulunamadı</option>';
    return;
  }

  // Ensure state.activeTechId is valid
  if (!state.activeTechId || !fieldStaff.some(p => p.id == state.activeTechId)) {
    const defaultTech = fieldStaff.find(p => p.id == 2) || fieldStaff[0];
    state.activeTechId = defaultTech.id;
  }

  select.innerHTML = fieldStaff.map(p => {
    const isSelected = p.id == state.activeTechId ? 'selected' : '';
    const plate = p.vehiclePlate && p.vehiclePlate !== 'Zimmetsiz' ? p.vehiclePlate : 'Araçsız';
    return `<option value="${p.id}" ${isSelected}>👤 ${p.name} (${plate}) - ${p.status}</option>`;
  }).join('');

  updateActiveTechProfileHeader();
}

function updateActiveTechProfileHeader() {
  const infoEl = document.getElementById('tech-profile-info');
  const activeTech = (state.staff || []).find(p => p.id == state.activeTechId) || (state.staff ? state.staff[0] : null);
  if (!infoEl || !activeTech) return;

  const statusBadge = activeTech.status === 'Görevde' ? '<span class="badge badge-primary">Görevde</span>' :
                      activeTech.status === 'Yolda' ? '<span class="badge badge-warning">Yolda</span>' :
                      '<span class="badge badge-success">Müsait</span>';
  const plate = activeTech.vehiclePlate || 'Zimmetsiz';
  const phone = activeTech.phone ? ` • 📞 ${activeTech.phone}` : '';
  const spec = activeTech.specialty ? ` • ⚙️ ${activeTech.specialty}` : '';

  infoEl.innerHTML = `Teknisyen: <strong>${activeTech.name}</strong> • 🚗 Araç: <strong>${plate}</strong> • Durum: ${statusBadge}${phone}${spec}`;

  const vehSubtitle = document.getElementById('vehicle-part-subtitle');
  if (vehSubtitle) {
    vehSubtitle.textContent = `Araç stoğunuzdan (${plate}) seçtiğiniz parça anında iş emrine eklenir ve araç stoğundan düşülür.`;
  }

  updateVehiclePartDropdown();
}

function initActiveTechSwitcher() {
  const select = document.getElementById('select-active-tech');
  if (!select) return;

  select.addEventListener('change', (e) => {
    const newTechId = parseInt(e.target.value);
    state.activeTechId = newTechId;
    updateActiveTechProfileHeader();
    renderTechJobs();
    const selText = e.target.options[e.target.selectedIndex] ? e.target.options[e.target.selectedIndex].text : '';
    showToast(`👤 Teknisyen ekranı aktif edildi: ${selText}`);
  });
}

function getTechVehicleStock(part, techId) {
  if (!part) return 0;
  const tech = (state.staff || []).find(s => s.id == techId);
  const veh = tech ? (state.vehicles || []).find(v => v.driverId == tech.id || (tech.vehiclePlate && v.plate === tech.vehiclePlate)) : null;

  if (veh) {
    if (part[`veh_${veh.id}`] !== undefined) return part[`veh_${veh.id}`];
    if (part[veh.plate] !== undefined) return part[veh.plate];
    if (part[`veh_${veh.plate}`] !== undefined) return part[`veh_${veh.plate}`];
    if (veh.id === 1 && part.vehicle1 !== undefined) return part.vehicle1;
    if (veh.id === 2 && part.vehicle2 !== undefined) return part.vehicle2;
  }
  if (tech) {
    if (part[`tech_${tech.id}`] !== undefined) return part[`tech_${tech.id}`];
    if (tech.id === 2 && part.vehicle1 !== undefined) return part.vehicle1;
    if (tech.id === 3 && part.vehicle2 !== undefined) return part.vehicle2;
  }
  if (tech && tech.vehiclePlate && tech.vehiclePlate !== 'Zimmetsiz') {
    for (const key in part) {
      if (key.includes(tech.vehiclePlate) || (veh && key.includes(String(veh.id)))) {
        return part[key];
      }
    }
  }
  return 0;
}

function deductTechVehicleStock(part, techId, qty) {
  if (!part) return;
  const tech = (state.staff || []).find(s => s.id == techId);
  const veh = tech ? (state.vehicles || []).find(v => v.driverId == tech.id || (tech.vehiclePlate && v.plate === tech.vehiclePlate)) : null;

  if (veh) {
    if (part[`veh_${veh.id}`] !== undefined) {
      part[`veh_${veh.id}`] = Math.max(0, part[`veh_${veh.id}`] - qty);
      return;
    }
    if (part[veh.plate] !== undefined) {
      part[veh.plate] = Math.max(0, part[veh.plate] - qty);
      return;
    }
    if (part[`veh_${veh.plate}`] !== undefined) {
      part[`veh_${veh.plate}`] = Math.max(0, part[`veh_${veh.plate}`] - qty);
      return;
    }
    if (veh.id === 1 && part.vehicle1 !== undefined) {
      part.vehicle1 = Math.max(0, part.vehicle1 - qty);
      return;
    }
    if (veh.id === 2 && part.vehicle2 !== undefined) {
      part.vehicle2 = Math.max(0, part.vehicle2 - qty);
      return;
    }
  }
  if (tech) {
    if (part[`tech_${tech.id}`] !== undefined) {
      part[`tech_${tech.id}`] = Math.max(0, part[`tech_${tech.id}`] - qty);
      return;
    }
    if (tech.id === 2 && part.vehicle1 !== undefined) {
      part.vehicle1 = Math.max(0, part.vehicle1 - qty);
      return;
    }
    if (tech.id === 3 && part.vehicle2 !== undefined) {
      part.vehicle2 = Math.max(0, part.vehicle2 - qty);
      return;
    }
  }
}

function updateVehiclePartDropdown() {
  const select = document.getElementById('vehicle-part-select');
  if (!select) return;

  const currentTechId = state.activeTechId || 2;
  const parts = state.stock || [];
  select.innerHTML = '<option value="">-- Araçtan Kullanılacak Parçayı Seçin --</option>' +
    parts.map(p => {
      const qty = getTechVehicleStock(p, currentTechId);
      const isAvailable = qty > 0;
      let currencyInfo = '';
      if (p.currency && p.currency !== 'TRY' && p.originalPrice) {
        const symbol = p.currency === 'USD' ? '$' : '€';
        currencyInfo = ` [İthal: ${symbol}${p.originalPrice} @ ${(p.exchangeRate || 0).toFixed(2)} ₺]`;
      }
      return `<option value="${p.code}" ${!isAvailable ? 'disabled' : ''}>${p.name} (${p.code}) - Araçta: ${qty} adet - ${p.price} ₺${currencyInfo}</option>`;
    }).join('');
}

// ==================== AI Servis Bilgi Bankası & Çözüm Kütüphanesi ====================
function loadServiceKnowledgeBaseFromLocalStorage() {
  let loaded = false;
  try {
    const raw = localStorage.getItem('servisai_knowledge_base');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Sanitize: 143 içeren veya yabancı kayıtları temizle
        state.serviceKnowledgeBase = parsed.filter(item => {
          if (!item) return false;
          const str = JSON.stringify(item).toLowerCase();
          if (str.includes('143')) return false; // Yabancı/hatalı 143 nolu servis kaydını derhal temizle
          return true;
        });
        loaded = true;
      }
    }
  } catch (e) {}

  if (!loaded || !state.serviceKnowledgeBase || state.serviceKnowledgeBase.length === 0) {
    state.serviceKnowledgeBase = [
      {
        id: "KB-VFD-104",
        deviceType: "vfd",
        orderCode: "SRV-2026-104",
        title: "Delta Electronics VFD-075 Güç Katı & IGBT Aşırı Isınma ve Röle Bırakma Arızası",
        keywordMatch: ["delta", "vfd", "vfd-075", "igbt", "sürücü", "surucu", "termotek", "röle bırakma", "aşırı akım"],
        rootCause: "Delta Electronics VFD-075 güç katındaki IGBT anahtarlama modülünde (U3) aşırı ısınma ve kolektör-emitör kaçak akımı saptandı. Yüksek akım çekimi koruma rölesini tetikleyerek devreyi kesiyor.",
        solution: "Arızalı IGBT-600V-40A güç transistörü sökülüp yenilenecek, gate tetikleme dirençleri (10 Ohm) ve snubber devresi filtre kondansatörü test edilecek, soğutucu blok termal macunu tazelenecektir.",
        action: "Hasarlı IGBT transistör devreden ayrıldı, yeni IGBT-600V-40A montajı yapıldı. Gate sinyalleri osiloskopla doğrulandı, 540V DC bara gerilimi kararlı kılındı ve cihaz 30 dakika tam yük testine tabi tutularak sorunsuz çalıştı.",
        steps: [
          "Multimetre diyot kademesinde IGBT kolektör-emitör aralığında kısa devre ve sızıntı akımı ölçümü yapın.",
          "Gate tetikleme dirençlerinin (R12, R14) nominal 10 Ohm değerinde olup olmadığını test edin.",
          "Snubber devresindeki 470uF 450V filtre kondansatörünün ESR ve kapasite değerini ölçün.",
          "Cihazı on durumuna alarak DC bara gerilimini ve 30 dk tam yük çıkışını doğrulayın."
        ],
        parts: ["IGBT-600V-40A", "KOND-470UF", "ROLE-24V-16A"],
        techName: "Murat Aydın (Saha Mühendisi)",
        confidence: "%98 Uzman AI Çözümü"
      },
      {
        id: "KB-PRT-001",
        deviceType: "printer",
        title: "Yazıcı On (Güç) Durumuna Gelmeme & SMPS Besleme Arızası",
        keywordMatch: ["printer", "yazıcı", "yazici", "açılmıyor", "smps", "besleme"],
        rootCause: "Yazıcı SMPS anahtarlamalı güç besleme kartında (Power Supply Board) giriş darbe filtre katında T2A cam sigorta atması ve primer PWM devresinde aşırı gerilim kilidi saptandı. Cihaz on (güç) tuşuna basıldığında standby voltajı üretemiyor.",
        solution: "Arızalı SMPS besleme kartı revize edilecek, T2A 250V giriş sigortası ve aşırı gerilim varistörü (MOV) yenilenecek, sekonder 24V (motor/kafa) ve 5V (anakart) DC filtre kondansatörleri ESR testinden geçirilerek kart gerilimleri kararlı hale getirilecektir.",
        action: "Yazıcı güç kartı söküldü, atık T2A cam sigorta ve hasarlı varistör yenilendi. Soğuk lehimler tazelendi. 24V ve 5V DC DC bara voltajları multimetre ile doğrulandı. Cihaz on moduna alındı, mekanik selftest ve test çıktısı başarıyla tamamlandı.",
        steps: [
          "Güç kablosu ve giriş soketindeki 220V AC şebeke gerilimini ve T2A cam sigorta sürekliliğini multimetre ile ölçün.",
          "SMPS besleme kartı sekonder çıkışındaki 24V DC (motor/baskı kafası) ve 5V DC (mantık kontrol) gerilimlerini test edin.",
          "Ana anakart (Formatter Board) güç butonuna basıldığında Power-On sinyalinin tetiklenip tetiklenmediğini kontrol edin.",
          "Cihazı on durumuna alarak mekanik selftest çıktısı alın ve teslimat testlerini tamamlayın."
        ],
        parts: ["SIGORTA-16A", "KOND-470UF", "ROLE-24V-16A"],
        techName: "Murat Aydın (Saha Mühendisi)",
        confidence: "%98 Öğrenen AI Çözümü"
      },
      {
        id: "KB-PRT-002",
        deviceType: "printer",
        title: "Yazıcı Kağıt Besleme Patinaj & Sensör Hatası",
        keywordMatch: ["roller", "patinaj", "sıkışma", "optik bayrak", "pick-up"],
        rootCause: "Yazıcı kağıt çekici rulo (Pick-up roller) yüzeyinde aşınma ve tozlanma nedeniyle patinaj oluşmuş, kağıt bayrak optik sensörü zamanında tetiklenemediği için besleme hatası vermektedir.",
        solution: "Kağıt besleme pateni ve pick-up roller izopropil alkol ile temizlenecek veya yenilenecek, ayırma pedi (separation pad) yay tansiyonu ayarlanacaktır.",
        action: "Aşınmış pick-up roller yenilendi, separation pad yüzeyi temizlendi ve yay tansiyonu kalibre edildi. 50 adet ardışık test baskısında besleme kusursuz çalıştı.",
        steps: [
          "Pick-up roller kauçuk yüzeyindeki diş aşınmalarını ve kirlenmeyi kontrol edin.",
          "Kağıt geçiş optik bayrak sensörünü temizleyip lojik seviye değişimini ölçün.",
          "Mekanik solenoid çekme mekanizmasının zamanlamasını test edin."
        ],
        parts: ["RULMAN-6204", "ROLE-24V-16A"],
        techName: "Caner Güler (Kıdemli Tekniker)",
        confidence: "%96 Öğrenen AI Çözümü"
      }
    ];
  }
}

function saveServiceKnowledgeBaseToLocalStorage() {
  try {
    localStorage.setItem('servisai_knowledge_base', JSON.stringify(state.serviceKnowledgeBase || []));
  } catch (e) {}
}

function synthesizeAIDiagnosis(brand, model, symptoms, order) {
  if (!state.serviceKnowledgeBase) {
    loadServiceKnowledgeBaseFromLocalStorage();
  }

  const orderObj = order || state.activeOrder;
  const orderCode = (orderObj ? (orderObj.code || orderObj.tracking_code || '') : '').toUpperCase();
  const brandStr = (brand || (orderObj ? (orderObj.brand || orderObj.device_brand) : '') || '').toLowerCase();
  const modelStr = (model || (orderObj ? (orderObj.model || orderObj.device_model) : '') || '').toLowerCase();
  const rawSymptoms = (symptoms || (orderObj ? (orderObj.complaint || orderObj.customer_complaint) : '') || '');
  // [Telefon Çağrısı], [WhatsApp] gibi kanal başlıklarını temizle
  const cleanSymptoms = rawSymptoms.replace(/\[.*?\]/g, '').toLowerCase().trim();
  const combined = `${orderCode.toLowerCase()} ${brandStr} ${modelStr} ${cleanSymptoms}`;

  let rootCause = "";
  let solution = "";
  let action = "";
  let steps = [];
  let partCodes = [];
  let estMinutes = 35;
  let confidence = "%93 Güven";
  let learnedBadge = "";

  // STOP-WORDS LİSTESİ: Tek başına arıza eşleşmesinde asla kullanılmayacak genel kelimeler
  const stopWords = new Set([
    'ariza', 'cozum', 'kart', 'karti', 'kartı', 'cihaz', 'cihazi', 'cihazı',
    'tamir', 'servis', 'fakat', 'sonra', 'icin', 'için', 'ile', 've', 'veya',
    'olan', 'durumu', 'giriş', 'giris', 'normal', 'yüksek', 'yuksek', 'tespit',
    'mudahale', 'müdahale', 'saniye', 'durum', 'arıza', 'çözüm', 'genel'
  ]);

  // ÖNCELİK 1: SRV-2026-104 veya Delta VFD-075 Endüstriyel Sürücü Kartı Özel Teşhisi
  const is104 = orderCode === 'SRV-2026-104' || 
                (combined.includes('delta') && (combined.includes('vfd') || combined.includes('075'))) ||
                (combined.includes('termotek') && combined.includes('sürücü'));

  if (is104) {
    rootCause = "Delta Electronics VFD-075 güç katındaki IGBT anahtarlama modülünde (U3) aşırı ısınma ve kolektör-emitör kaçak akımı saptandı. Yüksek akım çekimi koruma rölesini tetikleyerek devreyi kesiyor.";
    solution = "Arızalı IGBT-600V-40A güç transistörü sökülüp yenilenecek, gate tetikleme dirençleri (10 Ohm) ve snubber devresi filtre kondansatörü test edilecek, soğutucu blok termal macunu tazelenecektir.";
    action = "Hasarlı IGBT transistör devreden ayrıldı, yeni IGBT-600V-40A montajı yapıldı. Gate sinyalleri osiloskopla doğrulandı, 540V DC bara gerilimi kararlı kılındı ve cihaz 30 dakika tam yük testine tabi tutularak sorunsuz çalıştı.";
    steps = [
      "Multimetre diyot kademesinde IGBT kolektör-emitör aralığında kısa devre ve sızıntı akımı ölçümü yapın.",
      "Gate tetikleme dirençlerinin (R12, R14) nominal 10 Ohm değerinde olup olmadığını test edin.",
      "Snubber devresindeki 470uF 450V filtre kondansatörünün ESR ve kapasite değerini ölçün.",
      "Cihazı on durumuna alarak DC bara gerilimini ve 30 dk tam yük çıkışını doğrulayın."
    ];
    partCodes = ["IGBT-600V-40A", "KOND-470UF", "ROLE-24V-16A"];
    estMinutes = 40;
    confidence = "%98 Güven (Delta VFD IGBT Güç Katı)";
    learnedBadge = "⚡ Delta VFD-075 Endüstriyel Sürücü Güç Elektroniği & IGBT Teşhis Protokolü Doğrulandı.";
  } else {
    // ÖNCELİK 2: ÖĞRENEN YAPAY ZEKA: Servis Bilgi Bankası (Knowledge Base) Kontrol Edilir!
    // Kural: Stop words filtrelenir; en az 2 adet anlamlı kelime eşleşmeli veya cihaz tipi tam uymalıdır!
    const kbMatch = (state.serviceKnowledgeBase || []).find(kb => {
      if (!kb) return false;
      // Eğer KB kaydı belirli bir iş emrine aitse ve aktif iş emri farklıysa eşleştirme
      if (kb.orderCode && orderCode && kb.orderCode !== orderCode) {
        return false;
      }
      // Anlamlı kelimeleri filtrele
      const validKws = (kb.keywordMatch || []).map(k => String(k).toLowerCase().trim())
        .filter(k => k.length >= 3 && !stopWords.has(k));
      
      let matchCount = 0;
      for (const kw of validKws) {
        if (combined.includes(kw)) {
          matchCount++;
        }
      }
      if (kb.deviceType && combined.includes(kb.deviceType.toLowerCase()) && matchCount >= 1) {
        return true;
      }
      return matchCount >= 2;
    });

    if (kbMatch) {
      rootCause = kbMatch.rootCause.startsWith('[Öğrenen AI]') ? kbMatch.rootCause : `[Öğrenen AI]: ${kbMatch.rootCause}`;
      solution = kbMatch.solution;
      action = kbMatch.action;
      steps = kbMatch.steps || [];
      partCodes = kbMatch.parts || ["SIGORTA-16A", "KOND-470UF", "ROLE-24V-16A"];
      estMinutes = kbMatch.estMinutes || 30;
      confidence = kbMatch.confidence || "%98 Öğrenen AI";
      learnedBadge = `💡 Geçmişte ${kbMatch.techName || 'teknisyenimiz'} tarafından çözülmüş saha deneyimi eşleşti.`;
    }
  }

  // 3. YAZICI / PRINTER / BARKOD / FOTOKOPİ ÖZEL ANALİZİ
  if (!rootCause) {
    if (combined.includes('printer') || combined.includes('yazıcı') || combined.includes('yazici') || 
        combined.includes('hp') || combined.includes('canon') || combined.includes('epson') || 
        combined.includes('zebra') || combined.includes('brother') || combined.includes('barkod') || 
        combined.includes('baskı') || combined.includes('fotokopi') || combined.includes('pos')) {
    
    if (combined.includes('açılmıyor') || combined.includes('acilmiyor') || combined.includes('on') || 
        combined.includes('güç') || combined.includes('guc') || combined.includes('enerji') || 
        combined.includes('elektrik') || combined.includes('power')) {
      rootCause = `${brand || 'Yazıcı'} (${model || 'Yazıcı Modeli'}) SMPS anahtarlamalı güç besleme kartında (Power Supply Board) giriş darbe filtre katında T2A cam sigorta atması ve primer PWM anahtarlama katında kısa devre saptandı. Cihaz on durumuna gelmiyor ve panel ışıkları yanmıyor.`;
      solution = `SMPS güç besleme kartı revize edilecek, T2A 250V cam sigorta ve aşırı gerilim varistörü (MOV) yenilenecek, sekonder 24V ve 5V DC filtre kondansatörleri ESR testinden geçirilerek kart çalışma gerilimleri kararlı hale getirilecektir.`;
      action = `Yazıcı güç kartı söküldü, açık devre olan T2A cam sigorta ve hasarlı varistör yenilendi. Soğuk lehimler tazelendi. 24V DC kafa/motor gerilimi ve 5V DC kontrol gerilimi kararlı kılındı. Cihaz on moduna alındı ve test sayfası başarıyla basıldı.`;
      steps = [
        "Güç kablosu ve giriş soketindeki 220V AC şebeke gerilimini ve T2A cam sigorta sürekliliğini multimetre ile ölçün.",
        "SMPS besleme kartı sekonder çıkışındaki 24V DC (motor/baskı kafası) ve 5V DC (mantık kontrol) gerilimlerini test edin.",
        "Ana anakart (Formatter Board) güç butonuna basıldığında Power-On sinyalinin tetiklenip tetiklenmediğini kontrol edin.",
        "Cihazı on durumuna alarak test çıktısı verip mekanik kağıt besleme döngüsünü doğrulayın."
      ];
      partCodes = ["SIGORTA-16A", "KOND-470UF", "ROLE-24V-16A"];
      estMinutes = 30;
      confidence = "%95 Güven (Yazıcı Güç Arızası)";
    } else {
      rootCause = `${brand || 'Yazıcı'} mekanik kağıt çekici rulo (pick-up roller) veya termal baskı kafasında aşınma ve optik bayrak sensöründe tozlanma saptandı.`;
      solution = `Mekanik kağıt patenleri ve sensör yuvaları izopropil alkol ile temizlenecek, aşınmış patenler yenilenecek ve kafa basınç ayarı yapılacaktır.`;
      action = `Paten yüzeyleri yenilendi, optik bayrak sensörleri temizlendi. Cihaz 30 adet ardışık test baskısıyla test edildi ve sorunsuz teslim edildi.`;
      steps = [
        "Pick-up roller kauçuk yüzeyindeki diş aşınmalarını kontrol edin.",
        "Kağıt bayrak optik sensörünü izopropil alkol ile temizleyin.",
        "Baskı kafası omik direncini ve fırınlama sıcaklık sensörünü ölçün."
      ];
      partCodes = ["RULMAN-6204", "ROLE-24V-16A"];
      estMinutes = 25;
      confidence = "%92 Güven";
    }
  }
  // 3. GENEL CİHAZ AÇILMIYOR / ENERJİ GELMİYOR / ON OLMUYOR ANALİZİ
  else if (combined.includes('açılmıyor') || combined.includes('acilmiyor') || combined.includes('çalışmıyor') || 
           combined.includes('calismiyor') || combined.includes('on olmuyor') || combined.includes('enerji yok') || 
           combined.includes('güç yok') || combined.includes('guc yok') || combined.includes('elektrik gelmiyor')) {
    rootCause = `${brand || 'Cihaz'} (${model || 'Model'}) ana kontrol kartı SMPS güç besleme katında 220V AC şebeke giriş koruma sigortası atması ve DC-DC regülatör entegresinde aşırı gerilim kilitlenmesi saptandı. Cihaz on (çalışma) durumuna geçmiyor.`;
    solution = `Giriş besleme kartı sökülecek; cam sigorta, köprü diyot ve filtre kondansatörleri test edilerek hasarlı parçalar yenilenecek, sekonder DC hatlarında kısa devre taraması yapılacaktır.`;
    action = `Giriş koruma sigortası ve filtre kondansatörü değiştirildi, soğuk lehimler tazelendi. 24V ve 12V DC besleme rayları kararlı kılındı ve cihaz on modunda fonksiyon testinden başarıyla geçti.`;
    steps = [
      "Şebeke giriş fişi, güç anahtarı ve cam sigorta sürekliliğini multimetre ile ölçün.",
      "Doğrultucu köprü diyot ve ana filtre kondansatörü DC bara gerilimini (310V DC) kontrol edin.",
      "İkincil gerilim regülatörlerinin (5V, 12V, 24V) çıkış verip vermediğini test edin."
    ];
    partCodes = ["SIGORTA-16A", "KOND-470UF", "ROLE-24V-16A"];
    estMinutes = 30;
    confidence = "%94 Güven (Besleme Arızası)";
  }
  // 4. SÜRÜCÜ / VFD / INVERTER / GÜÇ ELEKTRONİĞİ
  else if (combined.includes('aşırı akım') || combined.includes('asiri akim') || combined.includes('aşırı ısınma') || 
           combined.includes('asiri isinma') || combined.includes('inverter') || combined.includes('vfd') || 
           combined.includes('sürücü') || combined.includes('surucu') || combined.includes('igbt')) {
    rootCause = `${brand || 'Cihaz'} (${model || 'Sürücü'}) güç modülü çıkış katındaki IGBT anahtarlama transistöründe termal stres kaynaklı mikro sızıntı ve kısa devre saptandı. Yüksek akım çekimi koruma devresini kesiyor.`;
    solution = `Arızalı IGBT transistör ve gate tetikleme dirençleri (10 Ohm) sökülecek; DC bara filtre kondansatörlerinin ESR değerleri ölçülüp yeni orijinal bileşenlerle değiştirilecek ve soğutucu blok termal macunu tazelenecektir.`;
    action = `Hasarlı IGBT transistör devreden ayrıldı, yeni IGBT-600V-40A montajı yapıldı. Gate sinyalleri osiloskopla doğrulandı, 540V DC bara gerilimi kararlı kılındı ve cihaz 30 dakika tam yük testine tabi tutularak sorunsuz çalıştı.`;
    steps = [
      "DC bara gerilimini ve giriş filtre kondansatörlerinin ESR değerlerini osiloskop/multimetre ile ölçün.",
      "Güç anahtarlama transistörlerinin (IGBT) gate sürücü empedansını ve ters diyot bariyer voltajını test edin.",
      "Besleme rölesi kontak geçiş direncini ve soğutucu blok termal macun iletimini kontrol edin."
    ];
    partCodes = ["IGBT-600V-40A", "KOND-470UF", "ROLE-24V-16A"];
    estMinutes = 40;
    confidence = "%94 Güven";
  }
  // 5. PLC / HABERLEŞME / I/O MODÜLLERİ
  else if (combined.includes('plc') || combined.includes('haberleşme') || combined.includes('haberlesme') || 
           combined.includes('iletişim') || combined.includes('rs485') || combined.includes('profinet') || 
           combined.includes('ekran') || combined.includes('cpu') || combined.includes('yazılım')) {
    rootCause = `${brand || 'PLC'} dijital I/O modülünde veya haberleşme portunda (RS485/Profinet) optokuplör izolasyon hasarı ve 24V yardımcı hatta parazit dalgalanması saptandı.`;
    solution = `Arızalı optokuplör entegreleri yenilenecek, haberleşme hattı 120 Ohm sonlandırma direnci takılacak ve yardımcı besleme hattı parazit filtresi revize edilecektir.`;
    action = `Arızalı PC817 SMD optokuplör sökülüp yenisi lehimlendi. 24V DC yardımcı besleme dalgalanması test edildi (ripple <%1), haberleşme paketi kaybı sıfırlandı ve saha I/O testleri başarıyla tamamlandı.`;
    steps = [
      "24V DC sistem besleme voltajının yük altındaki ripple (dalgalanma) seviyesini skop ile ölçün.",
      "Dijital giriş ve çıkış optokuplör entegrelerinin anahtarlama tepki süresini test edin.",
      "Haberleşme hattı sonlandırma direncini (120 Ohm) ve bus toprak referans gerilimini doğrulayın."
    ];
    partCodes = ["SMD-OPTO-817", "ROLE-24V-16A", "TRAFO-220-24"];
    estMinutes = 30;
    confidence = "%91 Güven";
  }
  // 6. MEKANİK / MOTOR / POMPA / RULMAN
  else if (combined.includes('titreşim') || combined.includes('titresim') || combined.includes('rulman') || 
           combined.includes('mekanik') || combined.includes('pompa') || combined.includes('motor') || combined.includes('fan')) {
    rootCause = `${brand || 'Motor/Sistem'} mekanik tahrik ünitesi ön yatağında rulman aşınması ve mekanik balans bozukluğuna bağlı harmonik titreşim tespit edildi.`;
    solution = `Aşınmış rulman sökülerek orijinal C3 toleranslı rulman çakılacak, şaft salgısı komparatör saatiyle kontrol edilecek ve kalkış kondansatörü yenilenecektir.`;
    action = `Ön ve arka rulman yatakları pres ile söküldü, yeni rulmanlar takıldı. Motor kalkış kondansatörü yenilendi. Balans ve titreşim ölçümleri nominal ISO standartlarına getirildi.`;
    steps = [
      "Motor mili ve rulman yatağında radyal/aksiyel boşluk toleransını komparatör saati ile kontrol edin.",
      "Motor daimi kalkış kondansatörünün mikrofarad (uF) kapasite kaybını ölçün.",
      "3 yollu vana ve mekanik aktarma bağlantılarında sıkışma veya tortu olup olmadığını inceleyin."
    ];
    partCodes = ["RULMAN-6204", "FAN-KOND-10UF", "VENTIL-3YOL"];
    estMinutes = 45;
    confidence = "%93 Güven";
  }
  // 7. TERMAL / CHILLER / SICAKLIK / TERMOSTAT
  else if (combined.includes('sıcaklık') || combined.includes('sicaklik') || combined.includes('soğutucu') || 
           combined.includes('sogutucu') || combined.includes('termostat') || combined.includes('chiller') || 
           combined.includes('ntc') || combined.includes('klima') || combined.includes('kompresör')) {
    rootCause = `${brand || 'Sistem'} termal denetim döngüsünde sıcaklık sensörü (NTC) kalibrasyon sapması veya emniyet termostatı kontak ark yapışması saptandı.`;
    solution = `Sapma yapan NTC sıcaklık sensörü yenilenecek, termostat güvenlik kontakları revize edilecek ve soğutucu gaz basma basınçları dengelenecektir.`;
    action = `Arızalı NTC sıcaklık sensörü değiştirildi, termal temas macunu uygulandı. Emniyet termostatı eşik sıcaklığı 45°C'ye kalibre edildi ve nominal gaz emiş basıncı sabitlendi.`;
    steps = [
      "NTC sıcaklık sensörünün 25°C ortamdaki nominal omik direncini ölçün ve sıcaklık eğrisiyle karşılaştırın.",
      "Termostat NC güvenlik kontaklarının geçiş direncini ve açma eşik sıcaklığını test edin.",
      "Termal macun yüzeyini izopropil alkol ile temizleyip yüksek iletkenlikli termal bileşik uygulayın."
    ];
    partCodes = ["SENS-NTC-10K", "TERMOSTAT-K59", "ROLE-24V-16A"];
    estMinutes = 25;
    confidence = "%95 Güven";
  }
  // 8. DİĞER / GENEL KART KONTROLÜ
  else {
    rootCause = `${brand || 'Cihaz'} (${model || 'Model'}) kontrol kartı besleme regülatör katında voltaj dalgalanması ve koruma rölesi kontak direnci yükselmesi saptandı.`;
    solution = `Giriş besleme devresi komponentleri ve koruma rölesi test edilerek yenilenecek, lehim çatlakları giderilecek ve voltaj regülasyonu sağlanacaktır.`;
    action = `24V güç rölesi ve filtre kondansatörü değiştirildi, soğuk lehimler tazelendi. Çıkış gerilim regülasyonu sağlandı ve cihaz tam yük fonksiyon testinden başarıyla geçti.`;
    steps = [
      "Devre kartı besleme giriş voltajını ve regülatör çıkışlarını şematik referansına göre ölçün.",
      "Hata kodunu cihaz servis hafızasından okuyun ve koruma rölesi çalışma eşiklerini test edin.",
      "Devre üzerindeki pasif filtre bileşenlerini ve güç yarı iletkenlerini termal kamera ile tarayın."
    ];
    partCodes = ["ROLE-24V-16A", "KOND-470UF", "SIGORTA-16A"];
    estMinutes = 35;
    confidence = "%89 Güven";
  }
  } // if (!rootCause) kapatıldı

  const currentTechId = state.activeTechId || 2;
  const matchedParts = (state.stock || []).filter(p => partCodes.includes(p.code));

  const recommendedFormatted = matchedParts.map(p => {
    const vStock = getTechVehicleStock(p, currentTechId);
    const vText = vStock > 0 ? `(Aracınızda: ${vStock} Adet)` : `(Merkez Depoda: ${p.central || 0} Adet)`;
    return `<code>${p.name} ${vText}</code>`;
  });

  return {
    confidence_rate: confidence,
    estimated_repair_time_minutes: estMinutes,
    probable_root_cause: rootCause,
    recommended_solution: solution,
    recommended_action: action,
    inspection_steps: steps,
    recommended_parts: recommendedFormatted.length > 0 ? recommendedFormatted : partCodes.map(c => `<code>${c}</code>`),
    learned_badge: learnedBadge
  };
}

function renderAIDataToOutput(data) {
  const aiOutput = document.getElementById('ai-output-box');
  if (!aiOutput || !data) return;

  aiOutput.style.display = 'block';
  aiOutput.innerHTML = `
    <div class="ai-output-header">
      <span class="status-pill status-success">Yapay Zeka Arıza Tespiti (${data.confidence_rate || '%92 Güven'})</span>
      <span class="ai-time">Tahmini Onarım: ${data.estimated_repair_time_minutes || 35} Dk</span>
    </div>
    ${data.learned_badge ? `
      <div style="background: rgba(99, 102, 241, 0.18); border: 1px solid rgba(99, 102, 241, 0.45); border-radius: 8px; padding: 8px 12px; margin-top: 10px; font-size: 0.84rem; color: #C7D2FE; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 1.1rem;">🧠</span>
        <span>${escapeHtml(data.learned_badge)}</span>
      </div>
    ` : ''}
    <div class="ai-analysis-content">
      <p><strong>1. Analiz ve Olası Kök Neden:</strong> ${escapeHtml(data.probable_root_cause || '')}</p>
      ${data.recommended_solution ? `<p><strong>2. Önerilen Çözüm Yolu:</strong> ${escapeHtml(data.recommended_solution)}</p>` : ''}
      <p><strong>3. Önerilen Ölçüm & Kontrol Adımları:</strong></p>
      <ol>
        ${(data.inspection_steps || []).map(step => `<li>${escapeHtml(step)}</li>`).join('')}
      </ol>
      <p><strong>4. Uyumlu Yedek Parçalar & Araç Stoğu:</strong> ${(data.recommended_parts || []).join(' ')}</p>
    </div>
  `;
}

function autoFillDiagnosisAndActions(force = false) {
  const curOrder = state.activeOrder;
  const brand = curOrder ? (curOrder.brand || curOrder.device_brand || (curOrder.device ? curOrder.device.split(' ')[0] : "Delta Electronics")) : "Delta Electronics";
  const model = curOrder ? (curOrder.model || curOrder.device_model || (curOrder.device ? curOrder.device.split(' ').slice(1).join(' ') : "VFD-075")) : "VFD-075";
  const symptomInput = document.getElementById('ai-symptom-input');
  const symptoms = (symptomInput ? symptomInput.value : (curOrder ? (curOrder.complaint || curOrder.customer_complaint) : '')) || '';

  const diag = synthesizeAIDiagnosis(brand, model, symptoms, state.activeOrder);

  const findingsInput = document.getElementById('tech-findings-input');
  const solutionInput = document.getElementById('tech-solution-input');
  const actionInput = document.getElementById('tech-action-input');

  let updated = false;
  if (findingsInput && (force || !findingsInput.value.trim())) {
    findingsInput.value = diag.probable_root_cause || '';
    if (state.activeOrder) state.activeOrder.findings = findingsInput.value;
    updated = true;
  }
  if (solutionInput && (force || !solutionInput.value.trim())) {
    solutionInput.value = diag.recommended_solution || '';
    if (state.activeOrder) state.activeOrder.solution = solutionInput.value;
    updated = true;
  }
  if (actionInput && (force || !actionInput.value.trim())) {
    actionInput.value = diag.recommended_action || '';
    if (state.activeOrder) state.activeOrder.action = actionInput.value;
    updated = true;
  }

  if (updated && state.activeOrder) {
    const currentCode = state.activeOrder.code || state.activeOrder.tracking_code;
    const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);
    if (matchingOrder) {
      matchingOrder.technician_findings = findingsInput ? findingsInput.value : '';
      matchingOrder.technician_solution = solutionInput ? solutionInput.value : '';
      matchingOrder.technician_action = actionInput ? actionInput.value : '';
    }
    saveWorkOrdersToLocalStorage();
    showDiagSaveStatus();
  }
}

function showDiagSaveStatus() {
  const statusEl = document.getElementById('tech-diag-save-status');
  if (statusEl) {
    statusEl.style.display = 'inline';
    clearTimeout(statusEl._saveTimer);
    statusEl._saveTimer = setTimeout(() => {
      statusEl.style.display = 'none';
    }, 2500);
  }
}

// ==================== Teknisyen Saha İş Adımları Günlüğü ====================
function renderTechWorkSteps() {
  const container = document.getElementById('tech-steps-list-container');
  if (!container) return;

  const currentOrder = state.activeOrder;
  if (!currentOrder) {
    container.innerHTML = `<div class="text-xs text-muted" style="padding: 8px;">Aktif iş emri seçilmedi.</div>`;
    return;
  }

  if (!currentOrder.workSteps) {
    currentOrder.workSteps = [];
  }

  if (currentOrder.workSteps.length === 0) {
    container.innerHTML = `
      <div class="text-xs text-dim" style="padding: 10px; text-align: center; background: rgba(0,0,0,0.2); border-radius: 6px;">
        Henüz fiili bir müdahale adımı eklenmedi. Yukarıdaki şablonlardan seçebilir veya kendi adımınızı yazıp [➕ Adım Ekle] butonuna basabilirsiniz.
      </div>
    `;
    return;
  }

  container.innerHTML = currentOrder.workSteps.map((step, idx) => `
    <div class="tech-step-item">
      <span class="step-num">${idx + 1}. Adım:</span>
      <span class="step-text">${escapeHtml(step)}</span>
      <button type="button" class="btn-del-step" onclick="removeTechWorkStep(${idx})" title="Bu adımı sil">✕</button>
    </div>
  `).join('');
}
window.renderTechWorkSteps = renderTechWorkSteps;

function addTechWorkStep(text) {
  const clean = (text || '').trim();
  if (!clean) return;

  if (!state.activeOrder) return;
  if (!state.activeOrder.workSteps) state.activeOrder.workSteps = [];

  state.activeOrder.workSteps.push(clean);

  // Eşleşen iş emrine kaydet
  const code = state.activeOrder.code || state.activeOrder.tracking_code;
  const match = (state.workOrders || []).find(o => (o.code || o.tracking_code) === code);
  if (match) {
    match.workSteps = state.activeOrder.workSteps;
  }
  saveWorkOrdersToLocalStorage();
  renderTechWorkSteps();
  showDiagSaveStatus();
  showToast(`✅ "${clean.slice(0, 30)}..." adımı başarıyla eklendi ve kaydedildi.`);
}
window.addTechWorkStep = addTechWorkStep;

function removeTechWorkStep(index) {
  if (!state.activeOrder || !state.activeOrder.workSteps) return;
  state.activeOrder.workSteps.splice(index, 1);

  const code = state.activeOrder.code || state.activeOrder.tracking_code;
  const match = (state.workOrders || []).find(o => (o.code || o.tracking_code) === code);
  if (match) {
    match.workSteps = state.activeOrder.workSteps;
  }
  saveWorkOrdersToLocalStorage();
  renderTechWorkSteps();
  showDiagSaveStatus();
}
window.removeTechWorkStep = removeTechWorkStep;

function saveCurrentSolutionToKnowledgeBase() {
  const currentOrder = state.activeOrder;
  if (!currentOrder) {
    showToast("⚠️ Bilgi bankasına kaydetmek için aktif bir iş emri bulunmalıdır.", "warning");
    return;
  }

  const findingsInput = document.getElementById('tech-findings-input');
  const solutionInput = document.getElementById('tech-solution-input');
  const actionInput = document.getElementById('tech-action-input');

  const findings = (findingsInput ? findingsInput.value : '') || currentOrder.findings || "Tespit girilmedi";
  const solution = (solutionInput ? solutionInput.value : '') || currentOrder.solution || "Çözüm girilmedi";
  const action = (actionInput ? actionInput.value : '') || currentOrder.action || "Müdahale girilmedi";
  const workSteps = (currentOrder.workSteps && currentOrder.workSteps.length > 0) ? currentOrder.workSteps : [action];

  const currentTech = (state.staff || []).find(s => s.id == state.activeTechId);
  const techName = currentTech ? currentTech.name : (currentOrder.assignedTech || "Saha Teknisyeni");

  const brand = currentOrder.brand || currentOrder.device_brand || "Genel Cihaz";
  const model = currentOrder.model || currentOrder.device_model || "";
  const complaint = currentOrder.complaint || currentOrder.customer_complaint || "";
  const orderCode = currentOrder.code || currentOrder.tracking_code || "";

  const stopWords = new Set([
    'ariza', 'cozum', 'kart', 'karti', 'kartı', 'cihaz', 'cihazi', 'cihazı',
    'tamir', 'servis', 'fakat', 'sonra', 'icin', 'için', 'ile', 've', 'veya',
    'olan', 'durumu', 'giriş', 'giris', 'normal', 'yüksek', 'yuksek', 'tespit',
    'mudahale', 'müdahale', 'saniye', 'durum', 'arıza', 'çözüm', 'genel'
  ]);

  const keywords = [];
  if (brand && brand !== "Genel Cihaz") keywords.push(brand.toLowerCase());
  if (model) keywords.push(model.toLowerCase());
  if (complaint) {
    complaint.toLowerCase().split(/\s+/).forEach(w => {
      const cleanWord = w.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ0-9]/g, '');
      if (cleanWord.length > 3 && !stopWords.has(cleanWord) && !keywords.includes(cleanWord)) {
        keywords.push(cleanWord);
      }
    });
  }

  if (!state.serviceKnowledgeBase) {
    loadServiceKnowledgeBaseFromLocalStorage();
  }

  const newKb = {
    id: `KB-SAVED-${Date.now().toString().slice(-6)}`,
    orderCode: orderCode,
    deviceType: brand.toLowerCase(),
    title: `${brand} ${model} - ${complaint.slice(0, 40)}`,
    keywordMatch: keywords,
    rootCause: findings,
    solution: solution,
    action: action,
    steps: workSteps,
    parts: (currentOrder.usedParts || []).map(p => p.code).filter(Boolean),
    techName: techName,
    confidence: "%99 Saha Uzmanı Onaylı",
    savedAt: new Date().toLocaleDateString('tr-TR')
  };

  state.serviceKnowledgeBase.unshift(newKb);
  saveServiceKnowledgeBaseToLocalStorage();
  showToast(`🧠 Harika! Bu çözüm Yapay Zeka Servis Bilgi Bankası'na kaydedildi. Gelecekteki benzer arızalarda öneri olarak kullanılacak!`, "success");
}
window.saveCurrentSolutionToKnowledgeBase = saveCurrentSolutionToKnowledgeBase;

function renderTechJobs() {
  const container = document.getElementById('job-cards-container');
  const countBadge = document.getElementById('tech-active-jobs-badge');
  if (!container) return;

  const currentTechId = state.activeTechId || 2;
  const activeTech = (state.staff || []).find(s => s.id == currentTechId) || (state.staff ? state.staff[0] : null);

  // Filter jobs for this active technician
  const allOrders = state.workOrders || [];
  let techOrders = allOrders.filter(o => 
    (o.assigned_user_id && String(o.assigned_user_id) === String(currentTechId)) ||
    (activeTech && o.assigned_tech && o.assigned_tech.toLowerCase() === activeTech.name.toLowerCase())
  );

  // Also include any jobs from state.staffJobs[currentTechId]
  if (state.staffJobs && state.staffJobs[currentTechId]) {
    state.staffJobs[currentTechId].forEach(so => {
      const code = so.tracking_code || so.code;
      if (!techOrders.some(to => (to.tracking_code || to.code) === code)) {
        techOrders.push(so);
      }
    });
  }

  if (countBadge) {
    countBadge.textContent = `${techOrders.length} Aktif İş`;
  }

  if (techOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px 15px; color: var(--text-muted); background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.12);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">📭</div>
        <strong style="color: var(--text-main); font-size: 0.95rem;">${activeTech ? activeTech.name : 'Teknisyen'} için atanmış iş bulunmuyor</strong>
        <p style="font-size: 0.8rem; margin-top: 6px; color: var(--text-muted);">
          Yönetici Sevk Masası'ndan bu personele yeni bir çağrı atayabilir veya yukarıdan başka bir teknisyen seçebilirsiniz.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = techOrders.map(order => {
    const orderCode = order.tracking_code || order.code;
    const isActive = state.activeOrder && ((state.activeOrder.code || state.activeOrder.tracking_code) === orderCode);
    const badgeClass = order.status === 'Tamamlandı' ? 'badge-success' :
                       order.status === 'Onarımda' ? 'badge-warning' :
                       order.status === 'Yolda' ? 'badge-warning' : 'badge-primary';
    const isApproved = !!(order.customer_approved || order.customerApproved);
    const approvedBadge = isApproved 
      ? `<span class="badge badge-success badge-customer-approved" style="font-size: 0.7rem; padding: 2px 6px;">✅ Onaylandı</span>` 
      : '';

    const brand = order.device_brand || (order.device ? order.device.brand : '') || '';
    const model = order.device_model || (order.device ? order.device.model : '') || '';
    const custName = order.customer_name || (order.customer ? order.customer.name : 'Müşteri');
    const custAddr = order.customer_address || (order.customer ? order.customer.address : 'İstanbul');

    const isCompleted = order.status && (order.status.startsWith('Tamamlandı') || order.status === 'Teslim Edildi');
    const travelM = order.travel_duration_minutes || order.travelDurationMinutes || 25;
    const repM = order.repair_duration_minutes || order.repairDurationMinutes || 45;
    const totM = order.total_duration_minutes || order.totalDurationMinutes || (travelM + repM);

    return `
      <div class="job-card ${isActive ? 'active' : ''}" data-code="${orderCode}">
        <div class="job-card-header">
          <span class="job-code">#${orderCode}</span>
          <div style="display: flex; gap: 4px; align-items: center;">
            ${approvedBadge}
            <span class="badge ${badgeClass}">${order.status}</span>
          </div>
        </div>
        <div class="job-device">${brand} ${model}</div>
        <div class="job-address">📍 ${custName} • ${custAddr}</div>
        <div class="job-card-duration mt-1" style="font-size: 0.72rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          ${isCompleted ? `
            <span>🚗 <strong>${travelM} dk</strong></span>
            <span>•</span>
            <span>🛠️ <strong>${repM} dk</strong></span>
            <span>•</span>
            <span>⏳ <strong>${formatDurationMinutes(totM)}</strong></span>
          ` : order.status === 'Onarımda' ? `
            <span>🚗 İntikal: <strong>${travelM} dk</strong></span>
            <span>•</span>
            <span style="color: var(--accent-purple);">🔬 Onarımda</span>
          ` : order.status === 'Yolda' ? `
            <span style="color: var(--accent-amber);">🚗 Seyahat Halinde (GPS)</span>
          ` : `
            <span style="color: var(--text-dim);">⏳ İntikal Bekliyor</span>
          `}
        </div>
      </div>
    `;
  }).join('');

  const mJobCount = document.getElementById('m-tech-job-count');
  if (mJobCount) mJobCount.textContent = String(techOrders.length);

  // Tıklanınca tezgaha yükle & Mobilde otomatik Tezgâh sekmesine geç
  container.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', () => {
      const code = card.getAttribute('data-code');
      loadWorkOrderToWorkbench(code);
      if (typeof window !== 'undefined' && window.innerWidth <= 860) {
        const btnToggleBench = document.getElementById('btn-toggle-m-bench');
        if (btnToggleBench) btnToggleBench.click();
      }
    });
  });

  // Eğer mevcut tezgâhtaki iş bu teknisyene ait değilse, bu teknisyenin ilk işini tezgâha yükle
  const activeCode = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : null;
  const isCurrentInTechOrders = techOrders.some(o => (o.tracking_code || o.code) === activeCode);
  if (!isCurrentInTechOrders && techOrders.length > 0) {
    const firstCode = techOrders[0].tracking_code || techOrders[0].code;
    loadWorkOrderToWorkbench(firstCode);
  }
}

function returnTechVehicleStock(partCode, techId, qty) {
  const part = (state.stock || []).find(p => p.code === partCode);
  if (!part) return;
  const tech = (state.staff || []).find(s => s.id == techId);
  const veh = tech ? (state.vehicles || []).find(v => v.driverId == tech.id || (tech.vehiclePlate && v.plate === tech.vehiclePlate)) : null;

  if (veh) {
    if (part[`veh_${veh.id}`] !== undefined) {
      part[`veh_${veh.id}`] += qty;
      return;
    }
    if (part[veh.plate] !== undefined) {
      part[veh.plate] += qty;
      return;
    }
    if (part[`veh_${veh.plate}`] !== undefined) {
      part[`veh_${veh.plate}`] += qty;
      return;
    }
    if (veh.id === 1 && part.vehicle1 !== undefined) {
      part.vehicle1 += qty;
      return;
    }
    if (veh.id === 2 && part.vehicle2 !== undefined) {
      part.vehicle2 += qty;
      return;
    }
  }
  if (tech) {
    if (part[`tech_${tech.id}`] !== undefined) {
      part[`tech_${tech.id}`] += qty;
      return;
    }
    if (tech.id === 2 && part.vehicle1 !== undefined) {
      part.vehicle1 += qty;
      return;
    }
    if (tech.id === 3 && part.vehicle2 !== undefined) {
      part.vehicle2 += qty;
      return;
    }
  }
}

function loadTechnicianExpensesFromLocalStorage() {
  try {
    const saved = localStorage.getItem('servisai_technician_expenses');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        state.technicianExpenses = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn("Masraflar localStorage'dan okunurken hata:", e);
  }
  // Varsayılan başlangıç örnek masrafları
  state.technicianExpenses = [
    {
      id: "EXP-101",
      techId: 2,
      techName: "Murat Aydın",
      category: "🍔 Yemek & Su",
      desc: "Saha intikali öğle yemeği ve su - Dinlenme Tesisi",
      docNo: "Fiş #4190",
      amount: 220,
      date: "25.10.2026 12:30",
      workOrderCode: "SRV-2026-104",
      reimbursed: false
    },
    {
      id: "EXP-102",
      techId: 12,
      techName: "Levent İmekci",
      category: "🍔 Yemek & Su",
      desc: "Saha öğle yemeği ve su - Ümraniye Dudullu",
      docNo: "Fiş #8812",
      amount: 190,
      date: "25.10.2026 12:45",
      workOrderCode: "SRV-2026-104",
      reimbursed: false
    }
  ];
}

function saveTechnicianExpensesToLocalStorage() {
  try {
    localStorage.setItem('servisai_technician_expenses', JSON.stringify(state.technicianExpenses || []));
  } catch (e) {
    console.warn("Masraflar kaydedilirken hata:", e);
  }
}

function loadStockMovementsFromLocalStorage() {
  try {
    const saved = localStorage.getItem('servisai_stock_movements');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        state.stockMovements = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn("Stok hareketleri localStorage'dan okunurken hata:", e);
  }
  state.stockMovements = [];
}

function saveStockMovementsToLocalStorage() {
  try {
    localStorage.setItem('servisai_stock_movements', JSON.stringify(state.stockMovements || []));
  } catch (e) {
    console.warn("Stok hareketleri kaydedilirken hata:", e);
  }
}

function renderTechExpenses() {
  const tbody = document.getElementById('tech-expenses-tbody');
  const badge = document.getElementById('tech-total-reimbursement');
  if (!tbody) return;

  const currentTechId = state.activeTechId || 2;
  const currentTech = (state.staff || []).find(s => s.id == currentTechId);
  const techName = currentTech ? currentTech.name : "";

  // Bu teknisyene ait harcamalar
  const techExpenses = (state.technicianExpenses || []).filter(e => 
    e.techId == currentTechId || (techName && e.techName && e.techName.toLowerCase() === techName.toLowerCase())
  );

  let totalReimbursement = 0;
  techExpenses.forEach(e => {
    totalReimbursement += (parseFloat(e.amount) || 0);
  });

  if (badge) {
    badge.textContent = `${totalReimbursement.toLocaleString('tr-TR')} ₺`;
  }

  if (techExpenses.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 16px;">
          Henüz kayıtlı harcama bulunmuyor. Yolculuk veya sahadaki masraflarınızı yukarıdaki formdan ekleyebilirsiniz.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = techExpenses.map(item => `
    <tr>
      <td style="font-size: 0.78rem; color: var(--text-dim); white-space: nowrap;">${escapeHtml(item.date || '')}</td>
      <td><strong>${escapeHtml(item.category || 'Gider')}</strong></td>
      <td style="font-size: 0.82rem;">${escapeHtml(item.desc || '')}</td>
      <td style="font-size: 0.8rem; color: var(--accent-cyan);">${escapeHtml(item.docNo || '-')}</td>
      <td style="font-weight: 700; color: #34D399;">${(parseFloat(item.amount) || 0).toLocaleString('tr-TR')} ₺</td>
      <td><span class="badge badge-success" style="font-size: 0.7rem;">Alacak Kaydedildi</span></td>
      <td style="text-align: right;">
        <button type="button" class="btn btn-sm btn-outline-danger btn-delete-expense" data-id="${item.id}" title="Masrafı Sil" style="padding: 2px 6px;">🗑️</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.btn-delete-expense').forEach(btn => {
    btn.addEventListener('click', () => {
      const expId = btn.getAttribute('data-id');
      deleteTechnicianExpense(expId);
    });
  });
}

function deleteTechnicianExpense(expId) {
  state.technicianExpenses = (state.technicianExpenses || []).filter(e => e.id !== expId);
  saveTechnicianExpensesToLocalStorage();
  renderTechExpenses();
  showToast("🗑️ Masraf kaydı silindi.");
}

function addLocalPurchasedPart() {
  const nameInput = document.getElementById('local-part-name');
  const vendorInput = document.getElementById('local-part-vendor');
  const qtyInput = document.getElementById('local-part-qty');
  const priceInput = document.getElementById('local-part-price');

  if (!nameInput || !vendorInput || !priceInput) return;

  const partName = (nameInput.value || '').trim();
  const vendorDoc = (vendorInput.value || '').trim();
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
  const unitPrice = parseFloat(priceInput.value) || 0;

  if (!partName) {
    showToast("⚠️ Lütfen satın alınan parçanın adını veya kodunu girin.");
    nameInput.focus();
    return;
  }
  if (!vendorDoc) {
    showToast("⚠️ Lütfen tedarikçi ve fiş/fatura numarasını girin.");
    vendorInput.focus();
    return;
  }
  if (unitPrice <= 0) {
    showToast("⚠️ Lütfen geçerli bir alış tutarı girin.");
    priceInput.focus();
    return;
  }

  const currentTechId = state.activeTechId || 2;
  const curTech = (state.staff || []).find(s => s.id == currentTechId);
  const techName = curTech ? curTech.name : "Saha Teknisyeni";
  const currentCode = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
  const totalCost = qty * unitPrice;
  const movementId = "STK-MV-" + Date.now().toString().slice(-6);

  // 1. Stok Giriş-Çıkış Hareketi Olarak Belgeleme
  const movementEntry = {
    id: movementId,
    date: new Date().toLocaleString('tr-TR'),
    type: "Yerel Dış Tedarik (Giriş & Transit Çıkış)",
    partName: partName,
    qty: qty,
    unitPrice: unitPrice,
    totalAmount: totalCost,
    supplierDoc: vendorDoc,
    technician: techName,
    workOrderCode: currentCode,
    notes: `Sahada yakın civardan tedarik edildi. Stoğa giriş ve #${currentCode} işine doğrudan tüketim belgelendi.`
  };
  if (!state.stockMovements) state.stockMovements = [];
  state.stockMovements.unshift(movementEntry);
  saveStockMovementsToLocalStorage();

  // 2. Harcanan Para Teknisyene Alacak Kaydedilir
  const expenseEntry = {
    id: "EXP-PRT-" + Date.now().toString().slice(-6),
    techId: currentTechId,
    techName: techName,
    category: "Yerel Parça Alımı (Dış Tedarik)",
    desc: `${partName} (${qty} Adet) - Tedarikçi: ${vendorDoc} (#${currentCode})`,
    docNo: vendorDoc,
    amount: totalCost,
    date: new Date().toLocaleString('tr-TR'),
    workOrderCode: currentCode,
    movementId: movementId,
    reimbursed: false
  };
  if (!state.technicianExpenses) state.technicianExpenses = [];
  state.technicianExpenses.unshift(expenseEntry);
  saveTechnicianExpensesToLocalStorage();
  renderTechExpenses();

  // 3. Fişe / İş Emrine Parça Olarak Ekle
  if (!state.activeOrder) {
    state.activeOrder = { usedParts: [], laborCost: 600 };
  }
  if (!state.activeOrder.usedParts) state.activeOrder.usedParts = [];
  state.activeOrder.usedParts.push({
    code: "LOCAL-" + Date.now().toString().slice(-4),
    name: partName,
    qty: qty,
    price: totalCost,
    unitPrice: unitPrice,
    source: `Yerel Tedarik (${vendorDoc})`,
    warranty: "12 Ay Tedarikçi/Parça Garantisi",
    isLocalPurchase: true,
    supplierDoc: vendorDoc,
    movementId: movementId
  });

  // İş emrini state.workOrders içinde güncelle
  const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);
  if (matchingOrder) {
    if (!matchingOrder.used_parts) matchingOrder.used_parts = [];
    matchingOrder.used_parts.push({
      part_code: "LOCAL-" + Date.now().toString().slice(-4),
      part_name: partName,
      quantity: qty,
      unit_price: unitPrice,
      warranty: "12 Ay Tedarikçi Garantisi",
      source: `Yerel Tedarik (${vendorDoc})`,
      isLocalPurchase: true,
      supplierDoc: vendorDoc,
      movementId: movementId
    });
    matchingOrder.parts_cost = (matchingOrder.parts_cost || 0) + totalCost;
    matchingOrder.total_cost = (matchingOrder.labor_cost || 600) + matchingOrder.parts_cost;
  }

  saveWorkOrdersToLocalStorage();
  renderUsedParts();

  // Form alanlarını temizle
  nameInput.value = "";
  vendorInput.value = "";
  priceInput.value = "";
  if (qtyInput) qtyInput.value = "1";

  showToast(`🧾 ${partName} stoğa giriş-çıkış yapılarak belgelendi, işe eklendi ve ${totalCost.toLocaleString('tr-TR')} ₺ teknisyene alacak kaydedildi!`);
}

function renderUsedParts() {
  const tbody = document.getElementById('used-parts-tbody');
  const partsCostEl = document.getElementById('total-parts-cost');
  const grandTotalEl = document.getElementById('grand-total-cost');
  if (!tbody || !state.activeOrder) return;

  const usedParts = state.activeOrder.usedParts || [];
  let partsTotal = 0;

  if (usedParts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 14px;">
          Henüz kullanılan parça eklenmedi. Yukarıdan araç stoğundan seçebilir veya sahada satın aldığınız parçayı ekleyebilirsiniz.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = usedParts.map((item, index) => {
      const itemTotal = parseFloat(item.price) || 0;
      partsTotal += itemTotal;
      const isLocal = !!item.isLocalPurchase;
      const sourceBadge = isLocal 
        ? `<span class="badge badge-purple" style="font-size: 0.68rem;">🏪 Yerel Tedarik: ${escapeHtml(item.supplierDoc || '')}</span>`
        : `<span class="badge badge-info" style="font-size: 0.68rem;">🚐 ${escapeHtml(item.source || 'Mobil Araç Stoğu')}</span>`;

      let currencyTag = '';
      if (item.currency && item.currency !== 'TRY' && item.originalPrice) {
        const sym = item.currency === 'USD' ? '$' : '€';
        const cBadge = item.currency === 'USD' ? 'currency-badge-usd' : 'currency-badge-eur';
        currencyTag = ` <span class="${cBadge}" style="font-size: 0.68rem; margin-left: 4px;">${sym}${item.originalPrice} (TCMB: ${(item.exchangeRate || 0).toFixed(2)} ₺)</span>`;
      }

      return `
        <tr>
          <td>
            <strong>${escapeHtml(item.name)}</strong>${currencyTag}
            <div style="margin-top: 3px;">${sourceBadge}</div>
          </td>
          <td>${item.qty || 1} Adet</td>
          <td>${((item.unitPrice || item.price) || 0).toLocaleString('tr-TR')} ₺</td>
          <td><span class="badge badge-success">${escapeHtml(item.warranty || '12 Ay Garanti')}</span></td>
          <td style="font-weight: 700;">${itemTotal.toLocaleString('tr-TR')} ₺</td>
          <td style="text-align: right;">
            <button type="button" class="btn btn-sm btn-outline-danger btn-delete-used-part" data-index="${index}" title="Parçayı Fişten Çıkar" style="padding: 2px 6px;">🗑️</button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-delete-used-part').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        removeUsedPart(idx);
      });
    });
  }

  const laborInput = document.getElementById('tech-labor-cost-input');
  let currentLabor = 600;
  if (state.activeOrder) {
    if (state.activeOrder.laborCost !== undefined && state.activeOrder.laborCost !== null) {
      currentLabor = parseFloat(state.activeOrder.laborCost);
    } else if (state.activeOrder.labor_cost !== undefined && state.activeOrder.labor_cost !== null) {
      currentLabor = parseFloat(state.activeOrder.labor_cost);
    }
  }
  if (isNaN(currentLabor)) currentLabor = 600;

  if (laborInput && document.activeElement !== laborInput) {
    laborInput.value = currentLabor;
  }

  const grandTotal = currentLabor + partsTotal;
  if (partsCostEl) partsCostEl.textContent = `${partsTotal.toLocaleString('tr-TR')} ₺`;
  if (grandTotalEl) grandTotalEl.textContent = `${grandTotal.toLocaleString('tr-TR')} ₺`;

  // Müşteri ekranındaki fiyatı da güncelle
  const custPriceEl = document.querySelector('.approval-price');
  if (custPriceEl) custPriceEl.innerHTML = `${grandTotal.toLocaleString('tr-TR')} ₺ <small>(KDV Dahil)</small>`;
}

function removeUsedPart(index) {
  if (!state.activeOrder || !state.activeOrder.usedParts) return;
  const removed = state.activeOrder.usedParts[index];
  if (!removed) return;

  const currentTechId = state.activeTechId || 2;

  // Eğer araç stoğundan kullanılmış bir parça ise stoğu araca iade et
  if (!removed.isLocalPurchase && removed.code) {
    returnTechVehicleStock(removed.code, currentTechId, removed.qty || 1);
    renderStockTable();
    updateVehiclePartDropdown();
  }

  // Eğer yerel satın alınan bir parça ise masraf kaydını da güncelle
  if (removed.isLocalPurchase && removed.movementId) {
    state.technicianExpenses = (state.technicianExpenses || []).filter(e => e.movementId !== removed.movementId);
    saveTechnicianExpensesToLocalStorage();
    renderTechExpenses();
  }

  state.activeOrder.usedParts.splice(index, 1);

  // state.workOrders senkronizasyonu
  const currentCode = state.activeOrder.code || state.activeOrder.tracking_code;
  const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);
  if (matchingOrder && matchingOrder.used_parts) {
    matchingOrder.used_parts = [...state.activeOrder.usedParts];
    const newPartsTotal = state.activeOrder.usedParts.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
    matchingOrder.parts_cost = newPartsTotal;
    matchingOrder.total_cost = (matchingOrder.labor_cost || 600) + newPartsTotal;
  }

  saveWorkOrdersToLocalStorage();
  saveStockToLocalStorage();
  renderUsedParts();
  showToast(`🗑️ ${removed.name} fişten çıkarıldı.`);
}

function generateOfficialServiceReport(order) {
  const currentOrder = order || state.activeOrder || {};
  const code = currentOrder.code || currentOrder.tracking_code || "SRV-2026-104";
  const customerName = currentOrder.customer || currentOrder.customer_name || "ISISAN İklimlendirme A.Ş.";
  const customerAddr = currentOrder.customerAddress || currentOrder.customer_address || "Dudullu OSB 2. Cadde No: 14, Ümraniye / İstanbul";
  const customerPhone = currentOrder.customerPhone || currentOrder.customer_phone || "0216 455 10 20";
  const deviceName = currentOrder.device || "Schneider Electric ATV630 Endüstriyel Sürücü";
  const serialNo = currentOrder.serialNo || currentOrder.serial_number || "SCH-2024-9912";
  const complaint = currentOrder.complaint || currentOrder.customer_complaint || "Kart giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor ve koruma rölesi devreyi kesiyor.";
  
  const currentTechId = state.activeTechId || 2;
  const currentTech = (state.staff || []).find(s => s.id == currentTechId);
  const techName = currentOrder.assignedTech || (currentTech ? currentTech.name : "Levent İmekci");
  const techPlate = currentTech ? (currentTech.vehiclePlate || "33 EKS 18") : "33 EKS 18";

  // 1. Sorunun Tespiti
  const findingsInput = document.getElementById('tech-findings-input');
  const findings = (findingsInput ? findingsInput.value : '') || currentOrder.findings || currentOrder.technician_findings || 
    "Laboratuvar ve saha ölçümlerinde IGBT güç anahtarlama katında mikro kısa devre ve aşırı akım sızıntısı saptanmıştır. DC bara gerilimi dalgalanmakta ve koruma rölesi aşırı akım eşiğini kesmektedir.";

  // 2. Bulunan Çözüm Yolu
  const solutionInput = document.getElementById('tech-solution-input');
  const solution = (solutionInput ? solutionInput.value : '') || currentOrder.solution || currentOrder.technician_solution || 
    "Hasarlı transistör katı sökülerek PCB yüzeyi temizlenecek, gate tetikleme empedansları (10 Ohm) yenilenecek, filtre kondansatörü ESR testi yapılacak ve termal iletim macunu tazelenecektir.";

  // 3. Uygulanan İş ve Müdahale
  const actionInput = document.getElementById('tech-action-input');
  const action = (actionInput ? actionInput.value : '') || currentOrder.action || currentOrder.technician_action || 
    "Arızalı parça söküldü, yeni orijinal bileşen lehimlendi. Termal macun yenilendi. DC bara gerilimi 540V DC seviyesinde kararlı kılındı ve cihaz 30 dakika tam yük altında başarıyla test edildi.";

  const workSteps = (currentOrder.workSteps && currentOrder.workSteps.length > 0) ? currentOrder.workSteps : [];
  let stepsText = "";
  if (workSteps.length > 0) {
    stepsText = "\n\n   [ UYGULANAN İŞ ADIMLARI (OPERASYON LOGU) ]\n" + 
      workSteps.map((st, i) => `   ${i + 1}. Adım: ${st}`).join('\n');
  }

  // 4. Parçalar (Araç Stoğu ve Yerel Dış Tedarik)
  const usedParts = currentOrder.usedParts || [];
  const vehicleParts = usedParts.filter(p => !p.isLocalPurchase);
  const localParts = usedParts.filter(p => !!p.isLocalPurchase);

  let vehiclePartsText = "";
  if (vehicleParts.length > 0) {
    vehiclePartsText = vehicleParts.map(p => {
      let curInfo = '';
      if (p.currency && p.currency !== 'TRY' && p.originalPrice) {
        const sym = p.currency === 'USD' ? '$' : '€';
        curInfo = ` [İthal: ${sym}${p.originalPrice} @ TCMB: ${(p.exchangeRate || 0).toFixed(2)} ₺]`;
      }
      return `   • [Araç Stoğu: ${techPlate}] ${p.name}${curInfo} | ${p.qty || 1} Adet | Birim: ${((p.unitPrice || p.price) || 0).toLocaleString('tr-TR')} ₺ | Tutar: ${(p.price || 0).toLocaleString('tr-TR')} ₺ | ${p.warranty || '12 Ay Garanti'}`;
    }).join('\n');
  } else {
    vehiclePartsText = "   • Araç stoğundan parça kullanılmadı.";
  }

  let localPartsText = "";
  let localPartsTotal = 0;
  if (localParts.length > 0) {
    localPartsText = localParts.map(p => {
      const pCost = parseFloat(p.price) || 0;
      localPartsTotal += pCost;
      return `   • [Yerel Dış Tedarik] ${p.name} | ${p.qty || 1} Adet | Tutar: ${pCost.toLocaleString('tr-TR')} ₺ | Tedarikçi/Belge: ${p.supplierDoc || '-'} \n     └─ Stok Hareketi: ${p.movementId || 'STK-MV-Transit'} (Giriş & İşe Çıkış Belgelendi) | Teknisyene Alacak: ${pCost.toLocaleString('tr-TR')} ₺`;
    }).join('\n');
  } else {
    localPartsText = "   • Sahada yerel dış tedarik parça alımı yapılmadı.";
  }

  const partsCost = usedParts.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  const laborCost = currentOrder.laborCost || 600;
  const totalCost = laborCost + partsCost;

  // 7. Teknisyen Masrafları
  const techExpenses = (state.technicianExpenses || []).filter(e => 
    e.techId == currentTechId || (currentTech && e.techName && e.techName.toLowerCase() === currentTech.name.toLowerCase())
  );
  let expensesTravelTotal = 0;
  techExpenses.forEach(e => {
    if (e.category !== "Yerel Parça Alımı (Dış Tedarik)") {
      expensesTravelTotal += (parseFloat(e.amount) || 0);
    }
  });
  const totalReimbursement = expensesTravelTotal + localPartsTotal;

  const now = new Date();
  const dateStr = now.toLocaleDateString('tr-TR') + " " + now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return `================================================================================
                    KOÇAŞ TEKNİK SERVİS VE MÜHENDİSLİK HİZMETLERİ
             RESMİ TEKNİK SERVİS MÜDAHALE VE EKSPERTİZ KAPANIŞ RAPORU
================================================================================

[ İŞ EMRİ VE MÜŞTERİ KÜNYESİ ]
--------------------------------------------------------------------------------
Servis Takip / Fiş No   : #${code}
Müdahale Tarihi & Saati : ${dateStr}
Sorumlu Teknisyen       : ${techName} (Mobil Saha Ekibi)
Mobil Servis Aracı      : ${techPlate}
Müşteri / Firma Unvanı  : ${customerName}
Müdahale Adresi         : ${customerAddr}
İletişim Telefonu       : ${customerPhone}
Cihaz / Ekipman Modeli  : ${deviceName}
Cihaz Seri Numarası     : ${serialNo}
Müşteri Geliş Şikayeti  : ${complaint}
Cihaz Onay Durumu       : Müşteri Tarafından Onaylandı (İşlem İzni Verildi)

--------------------------------------------------------------------------------
1. SORUNUN TESPİTİ (KÖK NEDEN VE SAHA BULGULARI)
--------------------------------------------------------------------------------
${findings}

--------------------------------------------------------------------------------
2. BELİRLENEN ÇÖZÜM YOLU VE METODOLOJİ
--------------------------------------------------------------------------------
${solution}

--------------------------------------------------------------------------------
3. CİHAZA UYGULANAN İŞ VE FİİLİ MÜDAHALELER
--------------------------------------------------------------------------------
${action}${stepsText}

--------------------------------------------------------------------------------
4. KULLANILAN YEDEK PARÇALAR VE STOK HAREKETLERİ
--------------------------------------------------------------------------------
A) SERVİS ARACINDAN KULLANILAN YEDEK PARÇALAR:
${vehiclePartsText}

B) SAHADA YEREL DIŞ TEDARİK İLE SATIN ALINAN PARÇALAR:
${localPartsText}

Toplam Yedek Parça Maliyeti: ${partsCost.toLocaleString('tr-TR')} ₺

--------------------------------------------------------------------------------
5. SAHA ZAMAN VE OPERASYONEL SÜRE DÖKÜMÜ
--------------------------------------------------------------------------------
• Yola Çıkış & İntikal Başlangıcı : ${formatTimeOnly(currentOrder.departed_at || currentOrder.departedAt || currentOrder.travel_start_time) || "09:30"}
• Müşteri Adresine Ulaşım & Başlama: ${formatTimeOnly(currentOrder.arrived_at || currentOrder.arrivedAt || currentOrder.work_start_time) || "09:55"} (Seyahat: ${currentOrder.travel_duration_minutes || currentOrder.travelDurationMinutes || 25} Dk)
• Onarım ve Test Tamamlanma Saati : ${formatTimeOnly(currentOrder.completed_at || currentOrder.completedAt || currentOrder.repair_finish_time) || "10:40"} (Fiili Onarım: ${currentOrder.repair_duration_minutes || currentOrder.repairDurationMinutes || 45} Dk)
• Sahada Geçirilen Toplam Süre    : ${formatDurationMinutes(currentOrder.total_duration_minutes || currentOrder.totalDurationMinutes || 70)}

--------------------------------------------------------------------------------
6. KALİBRASYON, GÜVENLİK VE FONKSİYONEL TEST ONAYLARI
--------------------------------------------------------------------------------
[✓] İzolasyon ve Topraklama Sürekliliği Testi : GEÇTİ (500V Meger / >100 MOhm)
[✓] Termal Kamera Aşırı Isınma Analizi       : GEÇTİ (Maks: 48°C, Nominal)
[✓] Çıkış Gerilimi ve Frekans Stabilitesi    : GEÇTİ (380V AC 50Hz Kararlı)
[✓] Yük Altında Sürekli Çalışma Testi       : GEÇTİ (30 Dk Tam Yük Sorunsuz)

--------------------------------------------------------------------------------
7. FİNANSAL TABLO VE HİZMET BEDELİ
--------------------------------------------------------------------------------
Uzman Saha Mühendisliği & İşçilik Bedeli  : ${laborCost.toLocaleString('tr-TR')},00 ₺
Kullanılan Toplam Yedek Parça Bedeli      : ${partsCost.toLocaleString('tr-TR')},00 ₺
--------------------------------------------------------------------------------
GENEL TOPLAM SERVİS BEDELİ (KDV Dahil)     : ${totalCost.toLocaleString('tr-TR')},00 ₺

--------------------------------------------------------------------------------
8. TEKNİSYEN SAHA MASRAFLARI VE ALACAK MUTABAKATI
--------------------------------------------------------------------------------
• Yerel Parça Alımı Harcaması (Dış Tedarik) : ${localPartsTotal.toLocaleString('tr-TR')},00 ₺
• Yolculuk & Saha Giderleri (Yemek, Su vb.) : ${expensesTravelTotal.toLocaleString('tr-TR')},00 ₺
--------------------------------------------------------------------------------
ŞİRKETİN TEKNİSYENE ÖDEYECEĞİ ALACAK BAKİYESİ: ${totalReimbursement.toLocaleString('tr-TR')},00 ₺ (Onaylandı)

--------------------------------------------------------------------------------
9. RESMİ TESLİMAT VE GARANTİ ŞARTLARI
--------------------------------------------------------------------------------
Cihaz sahada teknik testlerden geçirilmiş olup eksiksiz çalışır durumda teslim
edilmiştir. Değiştirilen parçalar 12 Ay boyunca Koçaş Teknik Servis garantisi
altındadır.

Teknisyen İmzası / Kaşe                 Müşteri Teslim Alan Yetkili
[ ${techName} - Kaşe / Dijital İmza ]     [ ${customerName} Yetkilisi ]
Tarih: ${now.toLocaleDateString('tr-TR')}                       Tarih: ${now.toLocaleDateString('tr-TR')}
================================================================================`;
}

// ==================== TCMB Canlı Döviz Kuru & Çoklu Para Birimi Entegrasyonu ====================
function getDefaultExchangeRates() {
  return {
    USD: 38.50,
    EUR: 41.20,
    TRY: 1.0,
    source: "TCMB Gösterge Kurları",
    lastUpdated: new Date().toLocaleDateString('tr-TR') + " " + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
  };
}

function loadExchangeRatesFromLocalStorage() {
  try {
    const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('servisai_exchange_rates') : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.USD && parsed.EUR) {
        state.exchangeRates = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn("Döviz kurları localStorage'dan okunurken hata:", e);
  }
  if (!state.exchangeRates || !state.exchangeRates.USD) {
    state.exchangeRates = getDefaultExchangeRates();
  }
}

function saveExchangeRatesToLocalStorage() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('servisai_exchange_rates', JSON.stringify(state.exchangeRates || {}));
    }
  } catch (e) {
    console.warn("Döviz kurları kaydedilirken hata:", e);
  }
}

async function fetchTCMBExchangeRates(notifyUser = false) {
  let fetched = false;

  // 1. Önce FastAPI Backend TCMB Uç Noktası
  try {
    const res = await fetch(`${API_BASE_URL}/api/exchange-rates/tcmb`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.USD && data.rates.EUR) {
        state.exchangeRates = {
          USD: data.rates.USD.selling || 38.50,
          EUR: data.rates.EUR.selling || 41.20,
          TRY: 1.0,
          source: data.source || "TCMB Canlı Kurlar",
          lastUpdated: data.updated_at || new Date().toLocaleString('tr-TR')
        };
        saveExchangeRatesToLocalStorage();
        fetched = true;
      }
    }
  } catch (err) {}

  // 2. Eğer backend çevrimdışıysa açık TCMB alternatif API'si (open.er-api.com)
  if (!fetched) {
    try {
      const altRes = await fetch("https://open.er-api.com/v6/latest/TRY");
      if (altRes.ok) {
        const altData = await altRes.json();
        if (altData && altData.rates && altData.rates.USD && altData.rates.EUR) {
          const usdTry = Math.round((1 / altData.rates.USD) * 10000) / 10000;
          const eurTry = Math.round((1 / altData.rates.EUR) * 10000) / 10000;
          state.exchangeRates = {
            USD: usdTry,
            EUR: eurTry,
            TRY: 1.0,
            source: "Piyasa Gösterge Kurları (TCMB Entegre)",
            lastUpdated: new Date().toLocaleDateString('tr-TR') + " " + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
          };
          saveExchangeRatesToLocalStorage();
          fetched = true;
        }
      }
    } catch (e) {}
  }

  // 3. İki yöntem de çevrimdışıysa yerel önbellek
  if (!fetched) {
    loadExchangeRatesFromLocalStorage();
  }

  renderExchangeRatesInSettings();
  updateStockCurrencyPreview();

  if (notifyUser) {
    showToast(`🇹🇷 TCMB kurları güncellendi: 1 USD = ${state.exchangeRates.USD.toFixed(2)} ₺ • 1 EUR = ${state.exchangeRates.EUR.toFixed(2)} ₺`);
  }
  return state.exchangeRates;
}

function convertCurrencyToTRY(amount, currency) {
  const num = parseFloat(amount) || 0;
  if (!currency || currency === 'TRY') return num;
  const rate = (state.exchangeRates && state.exchangeRates[currency]) ? state.exchangeRates[currency] : (currency === 'USD' ? 38.50 : 41.20);
  return Math.round((num * rate) * 100) / 100;
}

function renderExchangeRatesInSettings() {
  const usdEl = document.getElementById('settings-usd-rate-display');
  const eurEl = document.getElementById('settings-eur-rate-display');
  const lastSyncEl = document.getElementById('settings-rates-last-sync');

  if (usdEl && state.exchangeRates && state.exchangeRates.USD) {
    usdEl.textContent = `${state.exchangeRates.USD.toLocaleString('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ₺`;
  }
  if (eurEl && state.exchangeRates && state.exchangeRates.EUR) {
    eurEl.textContent = `${state.exchangeRates.EUR.toLocaleString('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ₺`;
  }
  if (lastSyncEl && state.exchangeRates) {
    lastSyncEl.textContent = `Son Senkronizasyon: ${state.exchangeRates.lastUpdated || 'Bugün'} (${state.exchangeRates.source || 'TCMB'})`;
  }
}

function updateStockCurrencyPreview() {
  const currSelect = document.getElementById('stock-currency');
  const priceInput = document.getElementById('stock-unit-price');
  const previewEl = document.getElementById('stock-currency-conversion-preview');
  if (!currSelect || !priceInput || !previewEl) return;

  const currency = currSelect.value || 'TRY';
  const val = parseFloat(priceInput.value) || 0;

  if (currency === 'TRY') {
    previewEl.innerHTML = `<span>💱 <strong>TL Satış Fiyatı:</strong> ${val.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺ (Yerel Para Birimi)</span>`;
  } else {
    const rate = (state.exchangeRates && state.exchangeRates[currency]) ? state.exchangeRates[currency] : (currency === 'USD' ? 38.50 : 41.20);
    const converted = Math.round((val * rate) * 100) / 100;
    const sym = currency === 'USD' ? '$' : '€';
    previewEl.innerHTML = `<span>💱 <strong>TCMB Kuru:</strong> 1 ${currency} = ${rate.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ₺ ➔ <strong>Net TL Satış:</strong> <span style="color: var(--accent-green); font-weight: 800;">${converted.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span> (${val.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${sym})</span>`;
  }
}

function initStockCurrencyConverter() {
  const currSelect = document.getElementById('stock-currency');
  const priceInput = document.getElementById('stock-unit-price');

  if (currSelect) {
    currSelect.addEventListener('change', updateStockCurrencyPreview);
  }
  if (priceInput) {
    priceInput.addEventListener('input', updateStockCurrencyPreview);
    priceInput.addEventListener('change', updateStockCurrencyPreview);
  }
  updateStockCurrencyPreview();
}

// ==================== Hızlı Servis & İşçilik Tarifeleri Yönetimi ====================
function getDefaultServiceRates() {
  return [
    { id: "rate-1", name: "Hafif Bakım / Kontrol", shortName: "Hafif", amount: 350, badgeClass: "btn-outline", hint: "Basit arıza tespiti / hafif bakım" },
    { id: "rate-2", name: "Standart Onarım", shortName: "Standart", amount: 600, badgeClass: "btn-outline", hint: "Standart kart onarımı / parça değişimi" },
    { id: "rate-3", name: "Kapsamlı Revizyon", shortName: "Kapsamlı", amount: 1200, badgeClass: "btn-outline", hint: "Kapsamlı revizyon / çoklu arıza müdahalesi" },
    { id: "rate-4", name: "Garantili / Sözleşmeli", shortName: "Garantili", amount: 0, badgeClass: "btn-outline-danger", hint: "Cihaz veya parça garantisi kapsamında (ücretsiz işçilik)" }
  ];
}

function loadServiceRatesFromLocalStorage() {
  try {
    const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('servisai_service_rates') : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.serviceRates = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn("Tarifeler localStorage'dan okunurken hata:", e);
  }
  state.serviceRates = getDefaultServiceRates();
}

function saveServiceRatesToLocalStorage() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('servisai_service_rates', JSON.stringify(state.serviceRates || []));
    }
  } catch (e) {
    console.warn("Tarifeler kaydedilirken hata:", e);
  }
}

function renderLaborPresets() {
  const container = document.getElementById('tech-labor-presets-container');
  if (!container) return;

  if (!state.serviceRates || state.serviceRates.length === 0) {
    loadServiceRatesFromLocalStorage();
  }

  container.innerHTML = state.serviceRates.map(rate => {
    const isFree = (rate.amount === 0);
    const badgeClass = rate.badgeClass || (isFree ? 'btn-outline-danger' : 'btn-outline');
    const formattedAmount = rate.amount.toLocaleString('tr-TR');
    const shortLabel = rate.shortName || rate.name;
    const titleHint = rate.hint || rate.name;

    return `<button type="button" class="btn btn-xs ${badgeClass} btn-labor-preset" data-amount="${rate.amount}" data-rate-id="${rate.id}" title="${escapeHtml(titleHint)}">${formattedAmount} ₺ (${escapeHtml(shortLabel)})</button>`;
  }).join(' ');

  // Tıklama olaylarını bağla
  const laborInput = document.getElementById('tech-labor-cost-input');
  container.querySelectorAll('.btn-labor-preset').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const amt = parseFloat(btn.getAttribute('data-amount')) || 0;
      if (laborInput) {
        laborInput.value = amt;
      }
      if (state.activeOrder) {
        state.activeOrder.laborCost = amt;
        state.activeOrder.labor_cost = amt;
        const code = state.activeOrder.code || state.activeOrder.tracking_code;
        const matching = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
        if (matching) {
          matching.laborCost = amt;
          matching.labor_cost = amt;
          matching.total_cost = amt + (matching.parts_cost || 0);
        }
        if (state.staffJobs) {
          for (const sId in state.staffJobs) {
            const so = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
            if (so) {
              so.laborCost = amt;
              so.labor_cost = amt;
              so.total_cost = amt + (so.parts_cost || 0);
            }
          }
        }
        saveWorkOrdersToLocalStorage();
      }
      renderUsedParts();
      showToast(`👨‍🔧 İşçilik bedeli ${amt.toLocaleString('tr-TR')} ₺ olarak güncellendi.`);
    });
  });
}

function renderServiceRatesSettings() {
  const container = document.getElementById('settings-rates-list');
  const countBadge = document.getElementById('settings-rates-count-badge');
  if (!container) return;

  if (!state.serviceRates || state.serviceRates.length === 0) {
    loadServiceRatesFromLocalStorage();
  }

  if (countBadge) {
    countBadge.textContent = `${state.serviceRates.length} Tarife`;
  }

  if (state.serviceRates.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Kayıtlı tarife bulunmuyor. Sağdaki formdan yeni tarife ekleyebilirsiniz.</div>`;
    return;
  }

  container.innerHTML = state.serviceRates.map(rate => {
    return `
      <div class="settings-rate-row" data-rate-id="${rate.id}">
        <div class="settings-rate-info">
          <div class="settings-rate-title">
            <input type="text" class="form-input form-input-sm rate-name-input" value="${escapeHtml(rate.name)}" style="font-weight: 700; max-width: 190px;" title="Tarife Adı">
            <span class="badge ${rate.badgeClass === 'btn-outline-danger' ? 'badge-danger' : rate.badgeClass === 'btn-outline-warning' ? 'badge-warning' : rate.badgeClass === 'btn-outline-success' ? 'badge-success' : 'badge-primary'}" style="font-size: 0.7rem;">${escapeHtml(rate.shortName || 'Tarife')}</span>
          </div>
          <div class="settings-rate-desc">
            <input type="text" class="form-input form-input-sm rate-hint-input" value="${escapeHtml(rate.hint || '')}" placeholder="Açıklama / İpucu" style="font-size: 0.72rem; color: var(--text-muted); padding: 2px 6px;">
          </div>
        </div>
        <div class="settings-rate-inputs">
          <div style="display: flex; align-items: center; gap: 4px;">
            <input type="number" class="form-input form-input-sm settings-rate-amount-input rate-amount-input" value="${rate.amount}" min="0" step="50" title="İşçilik Tutarı (₺)">
            <span style="font-weight: 700; color: var(--text-muted); font-size: 0.85rem;">₺</span>
          </div>
          <button type="button" class="btn btn-xs btn-outline btn-delete-rate" data-rate-id="${rate.id}" title="Bu tarifeyi sil">
            ❌ Sil
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Silme butonlarını bağla
  container.querySelectorAll('.btn-delete-rate').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rateId = btn.getAttribute('data-rate-id');
      if (state.serviceRates.length <= 1) {
        showToast("⚠️ En az bir adet servis tarifesi bulunmak zorundadır!");
        return;
      }
      state.serviceRates = state.serviceRates.filter(r => r.id !== rateId);
      renderServiceRatesSettings();
      showToast("🗑️ Tarife listeden kaldırıldı. Değişiklikleri uygulamak için 'Kaydet' butonuna basınız.");
    });
  });
}

// ==================== 1. Şirket Profili & Ayarlar Formu Senkronu ====================
function loadCompanyProfileToSettingsForm() {
  const p = state.companyProfile || getStoredCompanyProfile();
  if (!p) return;
  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined && val !== null ? val : '';
  };

  setEl('setting-company-name', p.legalName || p.name || '');
  setEl('setting-company-short', p.name || '');
  setEl('setting-company-sector', p.industry || '');
  setEl('setting-company-tax-office', p.taxOffice || '');
  setEl('setting-company-tax-number', p.taxId || '');
  setEl('setting-company-mersis', p.mersisNo || '');
  setEl('setting-company-trade-reg', p.tradeRegNo || '');
  setEl('setting-company-address', p.billingAddress || '');
  setEl('setting-company-city', p.city || '');
  setEl('setting-company-phone', p.phone || '');
  setEl('setting-company-email', p.email || '');
  setEl('setting-company-web', p.website || '');
  setEl('setting-company-iban', p.iban || 'TR92 0006 2000 0001 2948 1029 48 - Garanti BBVA (TL Hesabı)');
}

// ==================== 2. Personel & Kadro Yönetimi (Ayarlar Tab 2) ====================
function renderSettingsStaff() {
  const container = document.getElementById('settings-staff-cards-container');
  const countBadge = document.getElementById('settings-staff-total-badge');
  const navBadge = document.getElementById('badge-settings-staff-count');
  const staffList = state.staff || [];

  if (countBadge) countBadge.textContent = `${staffList.length} Aktif Personel`;
  if (navBadge) navBadge.textContent = `${staffList.length} Uzman`;
  if (!container) return;

  if (staffList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 28px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed var(--border-color); color: var(--text-dim);">
        <div style="font-size: 1.8rem; margin-bottom: 6px;">👥</div>
        <strong style="color: var(--text-main);">Kayıtlı Teknisyen Bulunmuyor</strong>
        <p style="margin: 4px 0 0; font-size: 0.8rem;">Aşağıdaki formu kullanarak kadronuza ilk teknisyeni ekleyebilirsiniz.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = staffList.map(s => {
    const avatar = s.avatar || (s.name ? s.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'TK');
    const plate = s.vehiclePlate || 'Zimmetsiz';
    const location = s.location || s.baseAddress || 'Bölge Belirtilmedi';
    const phone = s.phone || '05xx xxx xx xx';
    const pin = s.pin || '1234';
    const specialty = s.specialty || 'Genel Bakım & Onarım';

    return `
      <div class="settings-staff-card" data-staff-id="${s.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; border-radius: 8px; background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(99,102,241,0.2)); border: 1px solid rgba(56,189,248,0.3); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; color: #38bdf8;">
              ${escapeHtml(avatar)}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.92rem; color: #f8fafc;">${escapeHtml(s.name)}</div>
              <span class="badge badge-purple" style="font-size: 0.7rem; padding: 2px 6px;">${escapeHtml(s.role || 'Teknisyen')}</span>
            </div>
          </div>
          <button type="button" class="btn btn-outline-danger btn-xs" onclick="deleteSettingsStaff(${s.id})" title="${escapeHtml(s.name)} personelini kadrodan sil" style="padding: 2px 6px; font-size: 0.72rem;">
            🗑️ Sil
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.78rem; color: #cbd5e1; margin-top: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #94a3b8;">🎯 Uzmanlık:</span>
            <span style="font-weight: 500;">${escapeHtml(specialty)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #94a3b8;">📍 Bölge / Çıkış:</span>
            <span style="color: #38bdf8;">${escapeHtml(location)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #94a3b8;">📞 Tel:</span>
            <span>${escapeHtml(phone)}</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.74rem;">
          <span style="color: #94a3b8;">🚗 ${escapeHtml(plate)}</span>
          <span class="badge badge-secondary" style="font-family: monospace; font-size: 0.7rem;">PIN: ${escapeHtml(pin)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function deleteSettingsStaff(staffId) {
  const staffMember = (state.staff || []).find(s => s.id === staffId);
  const name = staffMember ? staffMember.name : "Personel";
  if (!confirm(`⚠️ "${name}" isimli personeli kadrodan silmek istediğinize emin misiniz?`)) {
    return;
  }

  state.staff = (state.staff || []).filter(s => s.id !== staffId);

  try {
    const terminated = JSON.parse(localStorage.getItem('servisai_staff_terminated') || '[]');
    if (!terminated.includes(staffId)) {
      terminated.push(staffId);
      localStorage.setItem('servisai_staff_terminated', JSON.stringify(terminated));
    }
  } catch (e) {}

  saveStaffToLocalStorage();
  renderStaffList();
  renderSettingsStaff();
  populateActiveTechDropdown();
  showToast(`🗑️ "${name}" personeli kadrodan kaldırıldı.`);
}
window.deleteSettingsStaff = deleteSettingsStaff;

// ==================== 3. Cihaz Türleri & Hizmet Kapsamı (Ayarlar Tab 3) ====================
const defaultDeviceScopes = [
  { id: "dev-1", name: "Endüstriyel AC & DC Sürücüler (VFD / Invertör)", brands: "Delta, Danfoss, ABB, Siemens, Schneider", scope: "Kart Onarımı, IGBT Değişimi, Parametre Ayarı", warranty: "12 Ay Parça & İşçilik", duration: "2-4 Saat", icon: "⚡" },
  { id: "dev-2", name: "Güneş Enerjisi (GES) Santral İnvertörleri", brands: "Huawei, SMA, Fronius, Sungrow, GoodWe", scope: "MPPT Arıza Giderme, İzolasyon Testi, Güç Bloğu", warranty: "12 Ay Parça & İşçilik", duration: "3-5 Saat", icon: "☀️" },
  { id: "dev-3", name: "PLC, HMI Panel & Endüstriyel PC", brands: "Siemens S7-1200/1500, Omron, Mitsubishi, Weintek", scope: "Program Yükleme, İletişim Hat Onarımı, Ekran Değişimi", warranty: "12 Ay Parça & İşçilik", duration: "1-3 Saat", icon: "💾" },
  { id: "dev-4", name: "Servo Motor & Servo Sürücüler", brands: "Yaskawa, Panasonic, Delta, Mitsubishi, Fanuc", scope: "Enkoder Ayarı, Rulman & Sargı Yenileme, Test", warranty: "6 Ay Servis Garantisi", duration: "4-6 Saat", icon: "🖥️" },
  { id: "dev-5", name: "Endüstriyel Soğutma, Chiller & VRF Sistemleri", brands: "Daikin, Carrier, Trane, York, Alarko", scope: "Kompresör İnvertörü, Gaz & Basınç Devresi, Pano", warranty: "12 Ay Parça & İşçilik", duration: "3-6 Saat", icon: "❄️" },
  { id: "dev-6", name: "Robotik Kollar & Mekatronik Hatlar", brands: "KUKA, ABB, Fanuc, Universal Robots", scope: "Eksen Motorları, Güç Kartları, Teach Pendant Tamiri", warranty: "12 Ay Parça & İşçilik", duration: "4-8 Saat", icon: "🤖" },
  { id: "dev-7", name: "Kesintisiz Güç Kaynakları (Endüstriyel UPS)", brands: "Inform, Makelsan, Schneider, Riello, Socomec", scope: "Akü Grubu Revizyonu, Doğrultucu / Evirici Katı", warranty: "12 Ay Parça & İşçilik", duration: "2-4 Saat", icon: "🔋" },
  { id: "dev-8", name: "Endüstriyel Pompa & Hidrolik Güç Üniteleri", brands: "Grundfos, Wilo, Bosch Rexroth, Parker", scope: "Sürücü Entegrasyonu, Basınç Sensörleri, Pano Revizyonu", warranty: "6 Ay Servis Garantisi", duration: "2-5 Saat", icon: "⚙️" }
];

function loadDeviceScopesFromLocalStorage() {
  try {
    const raw = localStorage.getItem('servisai_device_scopes');
    if (raw) {
      state.deviceScopes = JSON.parse(raw);
      return;
    }
  } catch (e) {}
  state.deviceScopes = defaultDeviceScopes;
}

function saveDeviceScopesToLocalStorage() {
  try {
    localStorage.setItem('servisai_device_scopes', JSON.stringify(state.deviceScopes || []));
  } catch (e) {}
}

function renderSettingsDevices() {
  if (!state.deviceScopes) loadDeviceScopesFromLocalStorage();
  const container = document.getElementById('settings-device-cards-container');
  const countBadge = document.getElementById('settings-device-total-badge');
  const navBadge = document.getElementById('badge-settings-device-count');
  const list = state.deviceScopes || [];

  if (countBadge) countBadge.textContent = `${list.length} Kategori Aktif`;
  if (navBadge) navBadge.textContent = `${list.length} Kategori`;
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 28px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed var(--border-color); color: var(--text-dim);">
        <div style="font-size: 1.8rem; margin-bottom: 6px;">🏷️</div>
        <strong style="color: var(--text-main);">Kayıtlı Cihaz Grubu Bulunmuyor</strong>
        <p style="margin: 4px 0 0; font-size: 0.8rem;">Aşağıdaki formu kullanarak servis verdiğiniz ilk cihaz kategorisini tanımlayabilirsiniz.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(d => {
    return `
      <div class="settings-device-card" data-device-id="${d.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.4rem;">${d.icon || '⚡'}</span>
            <div style="font-weight: 700; font-size: 0.9rem; color: #f8fafc;">${escapeHtml(d.name)}</div>
          </div>
          <button type="button" class="btn btn-outline-danger btn-xs" onclick="deleteSettingsDeviceScope('${d.id}')" title="Bu kapsamı kaldır" style="padding: 2px 6px; font-size: 0.72rem;">
            🗑️ Sil
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.78rem; margin-top: 6px;">
          <div><strong style="color: #94a3b8;">Markalar:</strong> <span style="color: #cbd5e1;">${escapeHtml(d.brands || '')}</span></div>
          <div><strong style="color: #94a3b8;">Müdahale:</strong> <span style="color: #e2e8f0;">${escapeHtml(d.scope || '')}</span></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.72rem;">
          <span class="badge badge-success" style="font-size: 0.7rem;">${escapeHtml(d.warranty || '12 Ay')}</span>
          <span class="badge badge-secondary" style="font-size: 0.7rem;">⏱️ ${escapeHtml(d.duration || '2-4 Saat')}</span>
        </div>
      </div>
    `;
  }).join('');
}

function deleteSettingsDeviceScope(devId) {
  const target = (state.deviceScopes || []).find(d => d.id === devId);
  const name = target ? target.name : "Cihaz kategorisi";
  if (!confirm(`⚠️ "${name}" kategorisini hizmet kapsamından çıkarmak istediğinize emin misiniz?`)) {
    return;
  }
  state.deviceScopes = (state.deviceScopes || []).filter(d => d.id !== devId);
  saveDeviceScopesToLocalStorage();
  renderSettingsDevices();
  showToast(`🗑️ "${name}" kategorisi kaldırıldı.`);
}
window.deleteSettingsDeviceScope = deleteSettingsDeviceScope;

// ==================== 4. e-Fatura & Sanal POS Ayarları (Ayarlar Tab 5) ====================
function loadIntegrationsSettings() {
  try {
    const raw = localStorage.getItem('servisai_integrations_settings');
    if (!raw) return;
    const s = JSON.parse(raw);
    const setEl = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val !== undefined && val !== null ? val : '';
    };
    const setChk = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.checked = Boolean(val);
    };

    if (s.efatura) {
      setEl('setting-efatura-provider', s.efatura.provider);
      setEl('setting-efatura-key', s.efatura.key);
      setEl('setting-efatura-secret', s.efatura.secret);
      setEl('setting-efatura-prefix', s.efatura.prefix);
      setChk('setting-efatura-sandbox', s.efatura.sandbox);
      setChk('setting-efatura-auto-sync', s.efatura.autoSync);
    }
    if (s.pos) {
      setEl('setting-pos-provider', s.pos.provider);
      setEl('setting-pos-merchant-id', s.pos.merchantId);
      setEl('setting-pos-merchant-key', s.pos.merchantKey);
      setEl('setting-pos-merchant-salt', s.pos.merchantSalt);
      setChk('setting-pos-sandbox', s.pos.sandbox);
      setChk('setting-pos-installments', s.pos.installments);
    }
  } catch (e) {}
}

function saveIntegrationsSettings() {
  try {
    const s = {
      efatura: {
        provider: document.getElementById('setting-efatura-provider')?.value || 'parasut',
        key: document.getElementById('setting-efatura-key')?.value || '',
        secret: document.getElementById('setting-efatura-secret')?.value || '',
        prefix: (document.getElementById('setting-efatura-prefix')?.value || 'GIB').toUpperCase(),
        sandbox: document.getElementById('setting-efatura-sandbox')?.checked ?? true,
        autoSync: document.getElementById('setting-efatura-auto-sync')?.checked ?? true
      },
      pos: {
        provider: document.getElementById('setting-pos-provider')?.value || 'paytr',
        merchantId: document.getElementById('setting-pos-merchant-id')?.value || '',
        merchantKey: document.getElementById('setting-pos-merchant-key')?.value || '',
        merchantSalt: document.getElementById('setting-pos-merchant-salt')?.value || '',
        sandbox: document.getElementById('setting-pos-sandbox')?.checked ?? true,
        installments: document.getElementById('setting-pos-installments')?.checked ?? true
      }
    };
    localStorage.setItem('servisai_integrations_settings', JSON.stringify(s));
  } catch (e) {}
}

// ==================== 5. Temiz Başlangıç (Clean Slate) & Demo Motoru ====================
function startCleanSlateService() {
  localStorage.setItem('servisai_app_mode', 'clean');

  const cleanProfile = {
    name: "Yeni Teknik Servis",
    legalName: "Yeni Teknik Servis Ltd. Şti.",
    industry: "Endüstriyel Elektronik & Otomasyon",
    sectorKey: "endustriyel_otomasyon",
    taxOffice: "",
    taxId: "",
    billingAddress: "",
    city: "İstanbul",
    phone: "",
    email: "",
    website: "",
    tradeRegNo: "",
    mersisNo: "",
    efaturaScenario: "Ticari Fatura (UBL-TR 2.1)",
    managerName: "Servis Yöneticisi",
    managerTitle: "Firma Sahibi / Yetkili",
    managerPhone: "",
    managerEmail: "",
    managerPin: "1234",
    mainWarehouse: "Merkez Depo",
    mainWorkshop: "Merkez Atölye"
  };

  state.companyProfile = cleanProfile;
  saveStoredCompanyProfile(cleanProfile);

  state.workOrders = [];
  state.staffJobs = {};
  state.activeOrder = null;
  state.technicianExpenses = [];
  state.stockMovements = [];

  saveWorkOrdersToLocalStorage();
  saveTechnicianExpensesToLocalStorage();
  try {
    localStorage.setItem('servisai_staff_jobs', JSON.stringify({}));
  } catch (e) {}

  applyCompanyProfile(cleanProfile);

  const welcomeModal = document.getElementById('welcome-setup-modal');
  if (welcomeModal) welcomeModal.style.display = 'none';

  renderIncomingCalls();
  renderTechJobs();
  renderTechExpenses();
  updateFleetKPI();
  updateActiveOrdersKPI();

  openOnboardingWizard(1);
  showToast("🚀 Yeni servisiniz için sıfırdan kurulum modu başlatıldı! Bilgilerinizi 3 adımlı sihirbazdan doldurabilirsiniz.", "success");
}
window.startCleanSlateService = startCleanSlateService;

function loadSampleDemoData(forceReload = false) {
  localStorage.setItem('servisai_app_mode', 'demo');
  localStorage.removeItem('servisai_work_orders');
  localStorage.removeItem('servisai_staff_jobs');
  localStorage.removeItem('servisai_company_profile');
  localStorage.removeItem('servisai_technician_expenses');
  localStorage.removeItem('servisai_staff_terminated');

  if (forceReload) {
    window.location.reload();
    return;
  }

  const welcomeModal = document.getElementById('welcome-setup-modal');
  if (welcomeModal) welcomeModal.style.display = 'none';

  applyCompanyProfile(defaultCompanyProfile);
  showToast("⚡ Örnek demo servisi (Koçaş Teknik) başarıyla yüklendi!", "info");
}
window.loadSampleDemoData = loadSampleDemoData;

function initWelcomeModal() {
  const modal = document.getElementById('welcome-setup-modal');
  const btnClose = document.getElementById('btn-close-welcome-modal');
  const cardClean = document.getElementById('card-welcome-clean');
  const cardDemo = document.getElementById('card-welcome-demo');

  if (!modal) return;

  const appMode = localStorage.getItem('servisai_app_mode');
  if (!appMode) {
    modal.style.display = 'flex';
  }

  if (cardClean) {
    cardClean.addEventListener('click', () => {
      startCleanSlateService();
    });
  }

  if (cardDemo) {
    cardDemo.addEventListener('click', () => {
      loadSampleDemoData(false);
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      modal.style.display = 'none';
      if (!localStorage.getItem('servisai_app_mode')) {
        localStorage.setItem('servisai_app_mode', 'demo');
      }
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      if (!localStorage.getItem('servisai_app_mode')) {
        localStorage.setItem('servisai_app_mode', 'demo');
      }
    }
  });
}
window.initWelcomeModal = initWelcomeModal;

// ==================== 6. Ayarlar Modalı Açılış & Olay Yöneticisi ====================
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;

  loadCompanyProfileToSettingsForm();
  renderSettingsStaff();
  renderSettingsDevices();
  loadServiceRatesFromLocalStorage();
  loadExchangeRatesFromLocalStorage();
  renderServiceRatesSettings();
  renderExchangeRatesInSettings();
  loadIntegrationsSettings();

  modal.style.display = 'flex';
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) modal.style.display = 'none';
}

function initSettingsActions() {
  const btnHeaderSettings = document.getElementById('btn-header-settings');
  const btnOpenSettings = document.getElementById('btn-open-settings-modal');
  const btnMgrToSettings = document.getElementById('btn-manager-to-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings-modal');
  const btnCloseSettingsFooter = document.getElementById('btn-close-settings-footer');
  const settingsModal = document.getElementById('settings-modal');
  const btnSaveAllRates = document.getElementById('btn-save-all-rates');
  const btnResetDefaults = document.getElementById('btn-reset-default-rates');
  const formNewRate = document.getElementById('form-new-service-rate');
  const btnRefreshTcmb = document.getElementById('btn-refresh-tcmb-rates');

  // Hızlı Aksiyon Butonları & Formlar
  const btnStartWizard = document.getElementById('btn-start-onboarding-wizard');
  const btnCleanSlate = document.getElementById('btn-settings-clean-slate');
  const btnLoadDemo = document.getElementById('btn-settings-load-demo');
  const btnLoadSampleCo = document.getElementById('btn-load-sample-company');
  const formCompany = document.getElementById('form-company-profile');
  const formStaff = document.getElementById('form-new-staff');
  const formDevice = document.getElementById('form-new-device-scope');
  const btnSaveEfatura = document.getElementById('btn-save-efatura-settings');
  const btnSavePos = document.getElementById('btn-save-pos-settings');

  // Ayarlar Sekme Gezintisi (.settings-tab-btn)
  const tabBtns = document.querySelectorAll('.settings-tab-btn');
  const tabPanes = document.querySelectorAll('.settings-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      if (!targetTabId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        pane.style.display = 'none';
      });

      const activePane = document.getElementById(targetTabId);
      if (activePane) {
        activePane.classList.add('active');
        activePane.style.display = 'block';
      }

      if (targetTabId === 'tab-settings-company') {
        loadCompanyProfileToSettingsForm();
      } else if (targetTabId === 'tab-settings-staff') {
        renderSettingsStaff();
      } else if (targetTabId === 'tab-settings-devices') {
        renderSettingsDevices();
      } else if (targetTabId === 'tab-settings-rates') {
        renderServiceRatesSettings();
        renderExchangeRatesInSettings();
      } else if (targetTabId === 'tab-settings-integrations') {
        loadIntegrationsSettings();
      }
    });
  });

  // Firma Kimlik Bilgilerini Kaydet Butonu / Formu (Tab 1)
  if (formCompany) {
    formCompany.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = state.companyProfile || getStoredCompanyProfile() || {};
      const updatedProfile = {
        ...current,
        legalName: (document.getElementById('setting-company-name')?.value || '').trim(),
        name: (document.getElementById('setting-company-short')?.value || '').trim() || (document.getElementById('setting-company-name')?.value || '').trim(),
        industry: (document.getElementById('setting-company-sector')?.value || '').trim(),
        taxOffice: (document.getElementById('setting-company-tax-office')?.value || '').trim(),
        taxId: (document.getElementById('setting-company-tax-number')?.value || '').trim(),
        mersisNo: (document.getElementById('setting-company-mersis')?.value || '').trim(),
        tradeRegNo: (document.getElementById('setting-company-trade-reg')?.value || '').trim(),
        billingAddress: (document.getElementById('setting-company-address')?.value || '').trim(),
        city: (document.getElementById('setting-company-city')?.value || '').trim(),
        phone: (document.getElementById('setting-company-phone')?.value || '').trim(),
        email: (document.getElementById('setting-company-email')?.value || '').trim(),
        website: (document.getElementById('setting-company-web')?.value || '').trim(),
        iban: (document.getElementById('setting-company-iban')?.value || '').trim()
      };

      applyCompanyProfile(updatedProfile);
      showToast(`🏢 "${updatedProfile.name || updatedProfile.legalName}" firma kimlik bilgileri başarıyla kaydedildi ve tüm belgelere uygulandı!`, 'success');
    });
  }

  // Örnek Firma Verisi Yükle
  if (btnLoadSampleCo) {
    btnLoadSampleCo.addEventListener('click', () => {
      const tmpl = SECTOR_TEMPLATES.endustriyel_otomasyon || defaultCompanyProfile;
      const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
      setEl('setting-company-name', tmpl.legalName);
      setEl('setting-company-short', tmpl.name);
      setEl('setting-company-sector', tmpl.industry);
      setEl('setting-company-tax-office', tmpl.taxOffice);
      setEl('setting-company-tax-number', tmpl.taxId);
      setEl('setting-company-mersis', tmpl.mersisNo || '0576012984100018');
      setEl('setting-company-trade-reg', tmpl.tradeRegNo || 'Bursa Tic. Sicil #98241');
      setEl('setting-company-address', tmpl.billingAddress);
      setEl('setting-company-city', tmpl.city);
      setEl('setting-company-phone', tmpl.phone);
      setEl('setting-company-email', tmpl.email);
      setEl('setting-company-web', tmpl.website || 'https://kocasteknik.com');
      setEl('setting-company-iban', 'TR92 0006 2000 0001 2948 1029 48 - Garanti BBVA (TL Hesabı)');
      showToast("⚡ Örnek Koçaş Teknik firma bilgileri forma yüklendi. 'Kaydet' butonuna basarak onaylayabilirsiniz.", "info");
    });
  }

  // Hızlı Kurulum Sihirbazı Butonu
  if (btnStartWizard) {
    btnStartWizard.addEventListener('click', () => {
      closeSettingsModal();
      openOnboardingWizard(1);
    });
  }

  // Sıfırdan Başla Butonu (Clean Slate)
  if (btnCleanSlate) {
    btnCleanSlate.addEventListener('click', () => {
      if (confirm("🗑️ Tüm demo servis kayıtları temizlenecek ve sistem sıfırdan kendi firmanızı kurabileceğiniz boş moda geçecektir. Devam etmek istiyor musunuz?")) {
        closeSettingsModal();
        startCleanSlateService();
      }
    });
  }

  // Demo Yükle Butonu
  if (btnLoadDemo) {
    btnLoadDemo.addEventListener('click', () => {
      if (confirm("⚡ Örnek Koçaş Teknik demo verileri, çağrıları ve teknisyen kadrosu yüklensin mi?")) {
        closeSettingsModal();
        loadSampleDemoData(true);
      }
    });
  }

  // Yeni Teknisyen Ekleme Formu (Tab 2)
  if (formStaff) {
    formStaff.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('setting-new-staff-name')?.value || '').trim();
      const role = document.getElementById('setting-new-staff-role')?.value || 'Saha Mühendisi (Elektronik)';
      const specialty = (document.getElementById('setting-new-staff-specialty')?.value || '').trim() || 'Genel Bakım & Onarım';
      const address = (document.getElementById('setting-new-staff-address')?.value || '').trim();
      const phone = (document.getElementById('setting-new-staff-phone')?.value || '').trim();
      const email = (document.getElementById('setting-new-staff-email')?.value || '').trim();
      const tc = (document.getElementById('setting-new-staff-tc')?.value || '').trim();
      const sgk = (document.getElementById('setting-new-staff-sgk')?.value || '').trim();
      const plate = (document.getElementById('setting-new-staff-plate')?.value || '').trim().toUpperCase() || 'Zimmetsiz';
      const pin = (document.getElementById('setting-new-staff-pin')?.value || '').trim() || '1234';

      if (!name) return;

      const newId = Date.now();
      const avatar = name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();

      if (!state.staff) state.staff = [];
      state.staff.push({
        id: newId,
        name: name,
        role: role,
        specialty: specialty,
        location: address,
        baseAddress: address,
        phone: phone,
        email: email,
        tc: tc,
        sgk: sgk,
        vehiclePlate: plate,
        pin: pin,
        avatar: avatar,
        status: "Müsait",
        distanceKm: 5.0
      });

      saveStaffToLocalStorage();
      renderStaffList();
      renderSettingsStaff();
      populateActiveTechDropdown();
      formStaff.reset();
      showToast(`👥 "${name}" (${role}) başarıyla kadroya eklendi!`, 'success');
    });
  }

  // Yeni Cihaz Kapsamı Ekleme Formu (Tab 3)
  if (formDevice) {
    formDevice.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = (document.getElementById('setting-new-device-cat')?.value || '').trim();
      const brands = (document.getElementById('setting-new-device-brands')?.value || '').trim();
      const scope = (document.getElementById('setting-new-device-scope')?.value || '').trim() || 'Kart onarımı, test ve bakım';
      const warranty = document.getElementById('setting-new-device-warranty')?.value || '12 Ay Parça & İşçilik';
      const duration = (document.getElementById('setting-new-device-duration')?.value || '2-4 Saat').trim();
      const icon = document.getElementById('setting-new-device-icon')?.value || '⚡';

      if (!cat) return;

      if (!state.deviceScopes) state.deviceScopes = defaultDeviceScopes;
      state.deviceScopes.push({
        id: `dev-${Date.now()}`,
        name: cat,
        brands: brands,
        scope: scope,
        warranty: warranty,
        duration: duration,
        icon: icon
      });

      saveDeviceScopesToLocalStorage();
      renderSettingsDevices();
      formDevice.reset();
      showToast(`🏷️ "${cat}" cihaz kategorisi başarıyla hizmet kataloğuna eklendi!`, 'success');
    });
  }

  // e-Fatura Ayarlarını Kaydet (Tab 5)
  if (btnSaveEfatura) {
    btnSaveEfatura.addEventListener('click', () => {
      saveIntegrationsSettings();
      showToast("🧾 e-Fatura & Bulut Muhasebe API ayarları başarıyla kaydedildi!", "success");
    });
  }

  // Sanal POS Ayarlarını Kaydet (Tab 5)
  if (btnSavePos) {
    btnSavePos.addEventListener('click', () => {
      saveIntegrationsSettings();
      showToast("💳 Sanal POS ve 3D Secure tahsilat ayarları başarıyla kaydedildi!", "success");
    });
  }

  if (btnHeaderSettings) btnHeaderSettings.addEventListener('click', openSettingsModal);
  if (btnOpenSettings) btnOpenSettings.addEventListener('click', openSettingsModal);
  if (btnMgrToSettings) {
    btnMgrToSettings.addEventListener('click', () => {
      const mgrModal = document.getElementById('manager-modal');
      if (mgrModal) mgrModal.style.display = 'none';
      openSettingsModal();
    });
  }

  if (btnRefreshTcmb) {
    btnRefreshTcmb.addEventListener('click', async () => {
      btnRefreshTcmb.disabled = true;
      btnRefreshTcmb.innerHTML = `<span>⏳ TCMB Kurları Alınıyor...</span>`;
      try {
        await fetchTCMBExchangeRates(true);
      } finally {
        btnRefreshTcmb.disabled = false;
        btnRefreshTcmb.innerHTML = `<span>🔄 Kurları TCMB'den Şimdi Güncelle</span>`;
      }
    });
  }

  if (btnCloseSettings) btnCloseSettings.addEventListener('click', closeSettingsModal);
  if (btnCloseSettingsFooter) btnCloseSettingsFooter.addEventListener('click', closeSettingsModal);
  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettingsModal();
    });
  }

  // Yeni Tarife Ekleme Formu
  if (formNewRate) {
    formNewRate.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('new-rate-name').value || '').trim();
      const shortName = (document.getElementById('new-rate-shortname').value || '').trim() || name;
      const amount = parseFloat(document.getElementById('new-rate-amount').value) || 0;
      const hint = (document.getElementById('new-rate-hint').value || '').trim() || name;
      const type = document.getElementById('new-rate-type').value || 'btn-outline';

      if (!name) return;

      const newId = `rate-${Date.now()}`;
      state.serviceRates.push({
        id: newId,
        name: name,
        shortName: shortName,
        amount: amount,
        badgeClass: type,
        hint: hint
      });

      renderServiceRatesSettings();
      formNewRate.reset();
      showToast(`➕ "${name}" (${amount} ₺) tarifesi listeye eklendi. 'Kaydet' butonuna basarak kalıcı hale getirebilirsiniz.`);
    });
  }

  // Tüm Değişiklikleri Kaydet
  if (btnSaveAllRates) {
    btnSaveAllRates.addEventListener('click', () => {
      const rows = document.querySelectorAll('#settings-rates-list .settings-rate-row');
      rows.forEach(row => {
        const id = row.getAttribute('data-rate-id');
        const targetRate = state.serviceRates.find(r => r.id === id);
        if (targetRate) {
          const nameInput = row.querySelector('.rate-name-input');
          const hintInput = row.querySelector('.rate-hint-input');
          const amountInput = row.querySelector('.rate-amount-input');

          if (nameInput) targetRate.name = nameInput.value.trim() || targetRate.name;
          if (hintInput) targetRate.hint = hintInput.value.trim();
          if (amountInput) {
            let parsedAmt = parseFloat(amountInput.value);
            if (isNaN(parsedAmt) || parsedAmt < 0) parsedAmt = 0;
            targetRate.amount = parsedAmt;
          }
        }
      });

      saveServiceRatesToLocalStorage();
      renderLaborPresets();
      closeSettingsModal();
      showToast("💾 Hızlı tarife seçenekleri ve işçilik fiyatları başarıyla güncellendi! Saha ekranları yeni fiyatlarla senkronize edildi.");
    });
  }

  // Varsayılanlara Sıfırla
  if (btnResetDefaults) {
    btnResetDefaults.addEventListener('click', () => {
      if (confirm("🔄 Tüm servis tarifelerini fabrika varsayılan ayarlarına (Hafif: 350₺, Standart: 600₺, Kapsamlı: 1200₺, Garantili: 0₺) döndürmek istediğinize emin misiniz?")) {
        state.serviceRates = getDefaultServiceRates();
        saveServiceRatesToLocalStorage();
        renderServiceRatesSettings();
        renderLaborPresets();
        showToast("🔄 Servis tarifeleri orijinal varsayılan ayarlara sıfırlandı.");
      }
    });
  }
}

// ==================== Teknisyen İşçilik & Mühendislik Bedeli Yönetimi ====================
function initTechLaborActions() {
  loadServiceRatesFromLocalStorage();
  renderLaborPresets();

  const laborInput = document.getElementById('tech-labor-cost-input');
  if (laborInput) {
    const handleLaborChange = () => {
      let val = parseFloat(laborInput.value);
      if (isNaN(val) || val < 0) val = 0;
      if (state.activeOrder) {
        state.activeOrder.laborCost = val;
        state.activeOrder.labor_cost = val;
        const code = state.activeOrder.code || state.activeOrder.tracking_code;
        const matching = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
        if (matching) {
          matching.laborCost = val;
          matching.labor_cost = val;
          matching.total_cost = val + (matching.parts_cost || 0);
        }
        if (state.staffJobs) {
          for (const sId in state.staffJobs) {
            const so = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
            if (so) {
              so.laborCost = val;
              so.labor_cost = val;
              so.total_cost = val + (so.parts_cost || 0);
            }
          }
        }
        saveWorkOrdersToLocalStorage();
      }
      renderUsedParts();
    };

    laborInput.addEventListener('input', handleLaborChange);
    laborInput.addEventListener('change', handleLaborChange);
  }
}

function initTechActions() {
  initTechLaborActions();
  initSettingsActions();
  // 1. AI Teşhis & Canlı Analiz
  const btnAi = document.getElementById('btn-run-ai-diag');
  const aiOutput = document.getElementById('ai-output-box');
  const symptomInput = document.getElementById('ai-symptom-input');

  if (btnAi && aiOutput && symptomInput) {
    btnAi.addEventListener('click', async () => {
      btnAi.innerHTML = `<span>⏳ Yapay Zeka Analiz Ediyor...</span>`;
      btnAi.disabled = true;

      const curOrder = state.activeOrder;
      const brand = curOrder ? (curOrder.brand || curOrder.device_brand || (curOrder.device ? curOrder.device.split(' ')[0] : "Delta Electronics")) : "Delta Electronics";
      const model = curOrder ? (curOrder.model || curOrder.device_model || (curOrder.device ? curOrder.device.split(' ').slice(1).join(' ') : "VFD-075")) : "VFD-075";
      const symptoms = (symptomInput.value || (curOrder ? (curOrder.complaint || curOrder.customer_complaint) : '') || '').trim();

      try {
        const response = await fetch(`${API_BASE_URL}/api/ai/diagnose`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            device_brand: brand,
            device_model: model,
            symptoms: symptoms
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Eğer backend yanıtı tam değilse local sentez ile zenginleştir
          if (data && data.probable_root_cause && data.recommended_solution) {
            renderAIDataToOutput(data);
            showToast("✨ Canlı FastAPI yapay zeka arıza teşhis motoru sonucu üretti!");
            btnAi.innerHTML = `<span>🧠 Teşhis Et & AI ile Analiz Et</span>`;
            btnAi.disabled = false;
            return;
          }
        }
      } catch (err) {
        // Fallback to local synthesizer
      }

      // Local dynamic synthesis (104 korumalı & zenginleştirilmiş)
      const localResult = synthesizeAIDiagnosis(brand, model, symptoms, state.activeOrder);
      renderAIDataToOutput(localResult);
      showToast(`🧠 ${brand} ${model} için yapay zeka arıza tespiti ve kontrol adımları oluşturuldu!`);
      btnAi.innerHTML = `<span>🧠 Teşhis Et & AI ile Analiz Et</span>`;
      btnAi.disabled = false;
    });
  }

  // 2. Yapay Zeka Önerilerini Form Alanlarına Otomatik Doldurma Butonu
  const btnAiAutoFill = document.getElementById('btn-ai-auto-fill');
  if (btnAiAutoFill) {
    btnAiAutoFill.addEventListener('click', () => {
      autoFillDiagnosisAndActions(true);
      showToast("✨ Yapay zeka teşhis ve operasyon adımları alanlara aktarıldı!");
    });
  }

  // 3. Teknisyen Saha Müdahale Alanları Dinleyicileri (Anında İş Emrine Kaydetme)
  const findingsInput = document.getElementById('tech-findings-input');
  const solutionInput = document.getElementById('tech-solution-input');
  const actionInput = document.getElementById('tech-action-input');

  const onDiagChange = () => {
    if (!state.activeOrder) return;
    const fVal = findingsInput ? findingsInput.value : '';
    const sVal = solutionInput ? solutionInput.value : '';
    const aVal = actionInput ? actionInput.value : '';

    state.activeOrder.findings = fVal;
    state.activeOrder.solution = sVal;
    state.activeOrder.action = aVal;

    const currentCode = state.activeOrder.code || state.activeOrder.tracking_code;
    const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);
    if (matchingOrder) {
      matchingOrder.technician_findings = fVal;
      matchingOrder.technician_solution = sVal;
      matchingOrder.technician_action = aVal;
    }
    saveWorkOrdersToLocalStorage();
    showDiagSaveStatus();
  };

  [findingsInput, solutionInput, actionInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', onDiagChange);
      inp.addEventListener('change', onDiagChange);
    }
  });

  // 4. Parça Sekmeleri Değişimi (Araç Stoğu vs Sahada Yakın Civardan Satın Al)
  const tabVehicle = document.getElementById('tab-btn-vehicle-stock');
  const tabLocal = document.getElementById('tab-btn-local-purchase');
  const paneVehicle = document.getElementById('pane-vehicle-parts');
  const paneLocal = document.getElementById('pane-local-parts');

  if (tabVehicle && tabLocal && paneVehicle && paneLocal) {
    tabVehicle.addEventListener('click', () => {
      tabVehicle.classList.add('btn-primary');
      tabVehicle.classList.remove('btn-outline');
      tabLocal.classList.remove('btn-primary');
      tabLocal.classList.add('btn-outline');
      paneVehicle.style.display = 'block';
      paneLocal.style.display = 'none';
    });

    tabLocal.addEventListener('click', () => {
      tabLocal.classList.add('btn-primary');
      tabLocal.classList.remove('btn-outline');
      tabVehicle.classList.remove('btn-primary');
      tabVehicle.classList.add('btn-outline');
      paneLocal.style.display = 'block';
      paneVehicle.style.display = 'none';
    });
  }

  // 5. Araç Stoğundan Parça Kullanma
  const btnAddPart = document.getElementById('btn-add-part-to-job');
  const partSelect = document.getElementById('vehicle-part-select');

  if (btnAddPart && partSelect) {
    btnAddPart.addEventListener('click', async () => {
      const selectedCode = partSelect.value;
      const part = state.stock.find(p => p.code === selectedCode);
      const currentTechId = state.activeTechId || 2;

      if (part) {
        const availableQty = getTechVehicleStock(part, currentTechId);
        if (availableQty <= 0) {
          showToast(`❌ Araç stoğunuzda ${part.name} kalmadı! Merkez depodan ikmal isteyin.`);
          return;
        }

        const currentCode = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
        const curTech = (state.staff || []).find(s => s.id == currentTechId);
        const plate = curTech ? (curTech.vehiclePlate || '34 ABC 101') : '34 ABC 101';

        // Backend API'ye canlı yaz
        try {
          await fetch(`${API_BASE_URL}/api/work-orders/${currentCode}/use-part?part_code=${selectedCode}&vehicle_plate=${encodeURIComponent(plate)}`, {
            method: 'POST'
          });
        } catch (e) {}

        // Araç stoğundan düş
        deductTechVehicleStock(part, currentTechId, 1);
        renderStockTable();
        updateVehiclePartDropdown();

        // Parçayı aktif iş emrine ekle
        if (!state.activeOrder.usedParts) state.activeOrder.usedParts = [];
        state.activeOrder.usedParts.push({
          code: part.code,
          name: part.name,
          qty: 1,
          price: part.price,
          unitPrice: part.price,
          currency: part.currency || 'TRY',
          originalPrice: part.originalPrice || part.price,
          exchangeRate: part.exchangeRate || 1,
          source: `Mobil Araç Stoğu (${plate})`,
          warranty: part.warranty ? `${part.warranty} Parça Garantisi` : "12 Ay Parça Garantisi",
          isLocalPurchase: false
        });

        // Update in state.workOrders
        const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);
        if (matchingOrder) {
          if (!matchingOrder.used_parts) matchingOrder.used_parts = [];
          matchingOrder.used_parts.push({
            part_code: part.code,
            part_name: part.name,
            quantity: 1,
            unit_price: part.price,
            currency: part.currency || 'TRY',
            original_price: part.originalPrice || part.price,
            exchange_rate: part.exchangeRate || 1,
            warranty: part.warranty || "12 Ay",
            source: `Mobil Araç Stoğu (${plate})`,
            isLocalPurchase: false
          });
          matchingOrder.parts_cost = (matchingOrder.parts_cost || 0) + part.price;
          matchingOrder.total_cost = (matchingOrder.labor_cost || 600) + matchingOrder.parts_cost;
        }
        saveWorkOrdersToLocalStorage();
        saveStockToLocalStorage();

        renderUsedParts();
        showToast(`✅ ${part.name} araç stoğundan (${plate}) düşüldü ve #${currentCode} fişine işlendi!`);
      }
    });
  }

  // 6. Sahada Yerel Dış Tedarik Parça Ekleme Butonu
  const btnAddLocalPart = document.getElementById('btn-add-local-part');
  if (btnAddLocalPart) {
    btnAddLocalPart.addEventListener('click', () => {
      addLocalPurchasedPart();
    });
  }

  // 7. Teknisyen Yolculuk & Saha Masraf Formu
  const formExpense = document.getElementById('form-tech-expense');
  if (formExpense) {
    formExpense.addEventListener('submit', (e) => {
      e.preventDefault();
      const catInput = document.getElementById('tech-expense-cat');
      const descInput = document.getElementById('tech-expense-desc');
      const docInput = document.getElementById('tech-expense-doc');
      const amountInput = document.getElementById('tech-expense-amount');

      const cat = catInput ? catInput.value : 'Diğer';
      const desc = (descInput ? descInput.value : '').trim();
      const doc = (docInput ? docInput.value : '').trim();
      const amount = parseFloat(amountInput ? amountInput.value : 0) || 0;

      if (!desc) {
        showToast("⚠️ Lütfen masraf açıklamasını girin.");
        if (descInput) descInput.focus();
        return;
      }
      if (amount <= 0) {
        showToast("⚠️ Lütfen geçerli bir harcama tutarı girin.");
        if (amountInput) amountInput.focus();
        return;
      }

      const currentTechId = state.activeTechId || 2;
      const curTech = (state.staff || []).find(s => s.id == currentTechId);
      const techName = curTech ? curTech.name : "Saha Teknisyeni";
      const currentCode = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";

      const newExpense = {
        id: "EXP-" + Date.now().toString().slice(-6),
        techId: currentTechId,
        techName: techName,
        category: cat,
        desc: desc,
        docNo: doc || `Fiş-${Date.now().toString().slice(-4)}`,
        amount: amount,
        date: new Date().toLocaleString('tr-TR'),
        workOrderCode: currentCode,
        reimbursed: false
      };

      if (!state.technicianExpenses) state.technicianExpenses = [];
      state.technicianExpenses.unshift(newExpense);
      saveTechnicianExpensesToLocalStorage();
      renderTechExpenses();

      if (descInput) descInput.value = '';
      if (docInput) docInput.value = '';
      if (amountInput) amountInput.value = '';

      showToast(`💰 ${amount.toLocaleString('tr-TR')} ₺ ${cat} masrafı alacak hanenize kaydedildi!`);
    });
  }

  // 8. Durum Değiştirme (Canlı API & Yönetici Paneli Senkronizasyonu)
  const statusSelect = document.getElementById('select-job-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', async (e) => {
      const newStatus = e.target.value;
      if (state.activeOrder) {
        state.activeOrder.status = newStatus;
      }

      const code = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
      const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
      if (matchingOrder) {
        matchingOrder.status = newStatus;
        if (newStatus === 'Tamamlandı') {
          matchingOrder.completedAt = new Date().toISOString();
        }
      }

      // Personel iş listelerinde de güncelle
      if (state.staffJobs) {
        for (const sId in state.staffJobs) {
          const match = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
          if (match) match.status = newStatus;
        }
      }

      // İş Tamamlandı yapıldığında teknisyen saha çözümünü Yapay Zeka Bilgi Bankası'na da otomatik ekle
      if (newStatus === 'Tamamlandı' && typeof saveCurrentSolutionToKnowledgeBase === 'function') {
        saveCurrentSolutionToKnowledgeBase();
      }

      saveWorkOrdersToLocalStorage();

      try {
        await fetch(`${API_BASE_URL}/api/work-orders/${code}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
      } catch (err) {}

      syncStatusEverywhere(newStatus);
      updateActiveOrdersKPI();
      updateDispatchBanner();
      renderIncomingCalls();
      renderStaffList();
      renderTechJobs();
      showToast(`🎉 İş Emri #${code} durumu "${newStatus}" olarak kaydedildi ve Yönetici Kontrol Paneline yansıtıldı!`, "success");
    });
  }

  // 8.1. Teknisyen İş Adımları Günlüğü Buton Dinleyicileri
  const btnAddStep = document.getElementById('btn-add-work-step');
  const inputNewStep = document.getElementById('tech-new-step-input');
  const btnSaveKb = document.getElementById('btn-save-to-knowledge');

  if (btnAddStep && inputNewStep) {
    btnAddStep.addEventListener('click', () => {
      const val = inputNewStep.value.trim();
      if (val) {
        addTechWorkStep(val);
        inputNewStep.value = '';
        inputNewStep.focus();
      } else {
        showToast("⚠️ Lütfen eklenecek iş adımını yazın.");
      }
    });

    inputNewStep.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnAddStep.click();
      }
    });
  }

  // Hızlı şablon butonları
  document.querySelectorAll('.btn-tag-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepText = btn.getAttribute('data-step');
      if (stepText) {
        addTechWorkStep(stepText);
      }
    });
  });

  if (btnSaveKb) {
    btnSaveKb.addEventListener('click', () => {
      saveCurrentSolutionToKnowledgeBase();
    });
  }

  // 9. AI Servis Raporu Oluştur (Resmi Ekspertiz Rapor Motoru)
  const btnAiReport = document.getElementById('btn-generate-ai-report');
  const reportModal = document.getElementById('report-modal');
  const reportPreText = document.getElementById('report-pre-text');
  const btnCloseModal = document.getElementById('btn-close-report-modal');
  const btnCopyReport = document.getElementById('btn-copy-report');

  if (btnAiReport && reportModal) {
    btnAiReport.addEventListener('click', async () => {
      btnAiReport.innerHTML = `<span>⏳ Rapor Hazırlanıyor...</span>`;
      btnAiReport.disabled = true;

      const code = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";

      // Her zaman zengin, resmi 8 bölümlü raporu üret
      const formalReport = generateOfficialServiceReport(state.activeOrder);
      if (reportPreText) reportPreText.textContent = formalReport;

      // Backend API'ye de bildirmeyi dene
      try {
        await fetch(`${API_BASE_URL}/api/ai/generate-report?tracking_code=${code}`, {
          method: 'POST'
        });
      } catch (err) {}

      reportModal.style.display = 'flex';
      showToast(`📄 #${code} için Resmi Teknik Servis & Ekspertiz Raporu oluşturuldu!`);
      btnAiReport.innerHTML = `<span>📄 AI Otomatik Servis Raporu Yaz</span>`;
      btnAiReport.disabled = false;
    });

    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => {
        reportModal.style.display = 'none';
      });
    }

    if (btnCopyReport && reportPreText) {
      btnCopyReport.addEventListener('click', () => {
        navigator.clipboard.writeText(reportPreText.textContent).then(() => {
          showToast("📋 Rapor metni panoya kopyalandı!");
        });
      });
    }

    const btnPrintExpert = document.getElementById('btn-print-expert-report');
    if (btnPrintExpert) {
      btnPrintExpert.addEventListener('click', () => {
        document.body.classList.remove('printing-label', 'printing-report');
        document.body.classList.add('printing-expert-report');
        window.print();
        setTimeout(() => {
          document.body.classList.remove('printing-expert-report');
        }, 1000);
      });
    }
  }



  // 10. Teknisyen Yola Çıktım Aksiyonu (Canlı GPS Simülasyonu & WhatsApp Bildirimi)
  const btnOnTheWay = document.getElementById('btn-tech-on-the-way');
  if (btnOnTheWay) {
    btnOnTheWay.addEventListener('click', async () => {
      const code = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
      const now = new Date();
      const isoNow = now.toISOString();

      state.activeOrder.status = "Yolda";
      state.activeOrder.departedAt = isoNow;
      state.activeOrder.travel_start_time = isoNow;

      // Update in state.workOrders
      const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
      if (matchingOrder) {
        matchingOrder.status = "Yolda";
        matchingOrder.departed_at = isoNow;
        matchingOrder.travel_start_time = isoNow;
      }

      // Update in state.staffJobs
      if (state.staffJobs) {
        for (const sId in state.staffJobs) {
          const so = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
          if (so) {
            so.status = "Yolda";
            so.departed_at = isoNow;
            so.travel_start_time = isoNow;
          }
        }
      }

      // Update active technician status in state.staff
      const curTech = (state.staff || []).find(s => s.id == state.activeTechId);
      if (curTech) {
        curTech.status = 'Yolda';
        if (!curTech.baseAddress) {
          curTech.baseAddress = curTech.address || curTech.location.replace(/^Saha Seyri\s*➔\s*/i, '').replace(/\s*\(Merkeze bağlı\)/i, '').trim();
        }
        const orderAddr = state.activeOrder ? (state.activeOrder.customerAddress || state.activeOrder.customer_address || '') : '';
        const orderCust = state.activeOrder ? (state.activeOrder.customer || state.activeOrder.customer_name || 'Müşteri') : 'Müşteri';
        if (orderAddr) {
          curTech.destinationAddress = orderAddr;
          curTech.location = `Saha Seyri ➔ ${orderCust} (${orderAddr})`;
        }
        saveStaffToLocalStorage();
        renderStaffList();
        updateActiveTechProfileHeader();
      }

      saveWorkOrdersToLocalStorage();
      syncStatusEverywhere("Yolda");
      updateTechJourneyUI(state.activeOrder);
      renderTechJobs();
      renderIncomingCalls();

      try {
        await fetch(`${API_BASE_URL}/api/work-orders/${code}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            status: "Yolda",
            departed_at: isoNow,
            travel_start_time: isoNow
          })
        });
      } catch (err) {}

      showToast(`🚀 ${curTech ? curTech.name : 'Teknisyen'} yola çıktı! #${code} için GPS takibi başlatıldı.`);

      // Harita rotasını müşterinin adresine yönlendir
      if (state.activeOrder && (state.activeOrder.customerAddress || state.activeOrder.customer_address)) {
        const targetBubble = document.querySelector('.pin-target .pin-bubble');
        if (targetBubble) {
          targetBubble.textContent = `🎯 Hedef: ${state.activeOrder.customer || state.activeOrder.customer_name} (${state.activeOrder.customerAddress || state.activeOrder.customer_address})`;
        }
      }

      // Harita simülasyonunu başlat
      if (typeof gpsSimState !== 'undefined' && gpsSimState) {
        gpsSimState.isRunning = true;
        if (typeof updateSimControlsUI === 'function') updateSimControlsUI();
      }

      // Müşteriye anında 'Yoldayım' WhatsApp bildirimini aç
      setTimeout(() => {
        openNotificationModal(code, 'YOLDA');
      }, 700);
    });
  }

  // 10-B. Teknisyen Müşteriye Ulaştım & İşe Başla Aksiyonu
  const btnArrived = document.getElementById('btn-tech-arrived');
  if (btnArrived) {
    btnArrived.addEventListener('click', async () => {
      const code = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
      const now = new Date();
      const isoNow = now.toISOString();

      if (!state.activeOrder.departedAt && !state.activeOrder.travel_start_time) {
        state.activeOrder.departedAt = new Date(now.getTime() - 25 * 60000).toISOString();
      }
      state.activeOrder.arrivedAt = isoNow;
      state.activeOrder.work_start_time = isoNow;
      state.activeOrder.status = "Onarımda";

      const depDate = new Date(state.activeOrder.departedAt || state.activeOrder.travel_start_time);
      const travelM = Math.max(1, Math.round((now - depDate) / 60000));
      state.activeOrder.travelDurationMinutes = travelM;
      state.activeOrder.travel_duration_minutes = travelM;

      // Update in state.workOrders
      const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
      if (matchingOrder) {
        matchingOrder.status = "Onarımda";
        matchingOrder.departed_at = state.activeOrder.departedAt;
        matchingOrder.arrived_at = isoNow;
        matchingOrder.travel_start_time = state.activeOrder.departedAt;
        matchingOrder.work_start_time = isoNow;
        matchingOrder.travel_duration_minutes = travelM;
      }

      // Update in state.staffJobs
      if (state.staffJobs) {
        for (const sId in state.staffJobs) {
          const so = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
          if (so) {
            so.status = "Onarımda";
            so.arrived_at = isoNow;
            so.travel_duration_minutes = travelM;
          }
        }
      }

      // Update technician status in state.staff
      const curTech = (state.staff || []).find(s => s.id == state.activeTechId);
      if (curTech) {
        curTech.status = 'Görevde';
        const orderCust = state.activeOrder ? (state.activeOrder.customer || state.activeOrder.customer_name || 'Müşteri') : 'Müşteri';
        const orderAddr = state.activeOrder ? (state.activeOrder.customerAddress || state.activeOrder.customer_address || '') : '';
        curTech.location = `📍 ${orderCust} (${orderAddr}) [Cihaz Başında Onarımda]`;
        saveStaffToLocalStorage();
        renderStaffList();
        updateActiveTechProfileHeader();
      }

      // GPS simülasyonunu durdur
      if (typeof gpsSimState !== 'undefined' && gpsSimState) {
        gpsSimState.isRunning = false;
        if (typeof updateSimControlsUI === 'function') updateSimControlsUI();
      }

      saveWorkOrdersToLocalStorage();
      syncStatusEverywhere("Onarımda");
      updateTechJourneyUI(state.activeOrder);
      renderTechJobs();
      renderIncomingCalls();

      try {
        await fetch(`${API_BASE_URL}/api/work-orders/${code}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            status: "Onarımda",
            arrived_at: isoNow,
            travel_duration_minutes: travelM
          })
        });
      } catch (err) {}

      showToast(`📍 Müşteri adresine ulaşıldı! İntikal: ${travelM} dk. Cihaz başında onarım aşaması başladı.`);
    });
  }

  // 11. Onarımı Tamamla & Teste Gönder (Süre Hesaplama ve Performans Kaydı)
  const btnFinish = document.getElementById('btn-finish-job');
  if (btnFinish) {
    btnFinish.addEventListener('click', async () => {
      const code = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
      const now = new Date();
      const isoNow = now.toISOString();

      if (!state.activeOrder.departedAt) {
        state.activeOrder.departedAt = new Date(now.getTime() - 70 * 60000).toISOString();
      }
      if (!state.activeOrder.arrivedAt) {
        state.activeOrder.arrivedAt = new Date(now.getTime() - 45 * 60000).toISOString();
      }
      state.activeOrder.completedAt = isoNow;
      state.activeOrder.repair_finish_time = isoNow;
      state.activeOrder.status = "Tamamlandı";

      const arrDate = new Date(state.activeOrder.arrivedAt);
      const repairM = Math.max(1, Math.round((now - arrDate) / 60000));
      const travelM = state.activeOrder.travelDurationMinutes || state.activeOrder.travel_duration_minutes || 25;
      const totalM = travelM + repairM;

      state.activeOrder.repairDurationMinutes = repairM;
      state.activeOrder.repair_duration_minutes = repairM;
      state.activeOrder.totalDurationMinutes = totalM;
      state.activeOrder.total_duration_minutes = totalM;

      const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
      if (matchingOrder) {
        matchingOrder.status = "Tamamlandı";
        matchingOrder.departed_at = state.activeOrder.departedAt;
        matchingOrder.arrived_at = state.activeOrder.arrivedAt;
        matchingOrder.completed_at = isoNow;
        matchingOrder.repair_finish_time = isoNow;
        matchingOrder.travel_duration_minutes = travelM;
        matchingOrder.repair_duration_minutes = repairM;
        matchingOrder.total_duration_minutes = totalM;
      }
      if (state.staffJobs) {
        for (const sId in state.staffJobs) {
          const so = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
          if (so) {
            so.status = "Tamamlandı";
            so.completed_at = isoNow;
            so.travel_duration_minutes = travelM;
            so.repair_duration_minutes = repairM;
            so.total_duration_minutes = totalM;
          }
        }
      }

      // Update technician status
      const curTech = (state.staff || []).find(s => s.id == state.activeTechId);
      if (curTech) {
        curTech.status = 'Müsait';
        const finishedAddr = state.activeOrder ? (state.activeOrder.customerAddress || state.activeOrder.customer_address || '') : '';
        const finishedCust = state.activeOrder ? (state.activeOrder.customer || state.activeOrder.customer_name || 'Müşteri') : 'Müşteri';
        if (finishedAddr) {
          curTech.currentLocation = finishedAddr;
          curTech.currentCustomer = finishedCust;
          curTech.location = `📍 ${finishedCust} (${finishedAddr}) [İş Tamamlandı]`;
        }
        saveStaffToLocalStorage();
        renderStaffList();
        updateActiveTechProfileHeader();
      }

      saveWorkOrdersToLocalStorage();
      syncStatusEverywhere("Tamamlandı");
      updateTechJourneyUI(state.activeOrder);
      renderTechJobs();
      renderIncomingCalls();
      updateActiveOrdersKPI();

      try {
        await fetch(`${API_BASE_URL}/api/work-orders/${code}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            status: "Tamamlandı",
            completed_at: isoNow,
            travel_duration_minutes: travelM,
            repair_duration_minutes: repairM,
            total_duration_minutes: totalM
          })
        });
      } catch (err) {}

      showToast(`🎉 Tebrikler! #${code} onarımı tamamlandı! İntikal: ${travelM} dk • Onarım: ${repairM} dk • Toplam: ${totalM} dk.`);

      setTimeout(() => {
        openNotificationModal(code, 'TAMAMLANDI');
      }, 700);
    });
  }
}

// ==================== 3. Customer Portal Functions ====================
let currentSearchedCode = "SRV-2026-104";

function initCustomerActions() {
  const btnApprove = document.getElementById('btn-cust-approve');
  const btnReject = document.getElementById('btn-cust-reject');
  const btnSearch = document.getElementById('btn-cust-search');

  if (btnApprove) {
    btnApprove.addEventListener('click', async () => {
      const code = currentSearchedCode || (state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104");

      // 1. state.activeOrder güncelle
      if (state.activeOrder) {
        state.activeOrder.customerApproved = true;
        state.activeOrder.customer_approved = true;
        if (state.activeOrder.status === 'Kabul Edildi' || state.activeOrder.status === 'Onay Bekliyor') {
          state.activeOrder.status = "Onaylandı / Onarımda";
        }
      }

      // 2. state.workOrders içinde ilgili iş emrini bul ve onayla
      const targetOrder = (state.workOrders || []).find(o => 
        (o.tracking_code && o.tracking_code.toLowerCase() === code.toLowerCase()) || 
        (o.code && o.code.toLowerCase() === code.toLowerCase())
      );

      if (targetOrder) {
        targetOrder.customer_approved = true;
        targetOrder.customerApproved = true;
        targetOrder.approval_date = new Date().toLocaleDateString('tr-TR');
        if (targetOrder.status === 'Kabul Edildi' || targetOrder.status === 'Onay Bekliyor') {
          targetOrder.status = "Onaylandı / Onarımda";
        }
      }

      // 3. state.staffJobs içinde varsa orada da güncelle
      if (state.staffJobs) {
        for (const sId in state.staffJobs) {
          const so = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
          if (so) {
            so.customer_approved = true;
            so.customerApproved = true;
            if (so.status === 'Kabul Edildi' || so.status === 'Onay Bekliyor') {
              so.status = "Onaylandı / Onarımda";
            }
          }
        }
      }

      // 4. Kalıcı hafızaya (localStorage) kaydet
      saveWorkOrdersToLocalStorage();

      // 5. Backend FastAPI senkronizasyonu
      try {
        await fetch(`${API_BASE_URL}/api/work-orders/${code}/approve`, { method: 'POST' });
      } catch (e) {
        console.warn("Backend bağlantı hatası, yerel güncellendi.");
      }

      // 6. Müşteri arayüzü buton alanını onay rozetiyle yenile
      const actionsBox = document.getElementById('customer-action-buttons');
      if (actionsBox) {
        actionsBox.innerHTML = `
          <div class="chip chip-success" style="font-size: 0.95rem; padding: 10px 18px; border: 1px solid #10b981; background: rgba(16, 185, 129, 0.15); display: inline-flex; align-items: center; gap: 8px;">
            ✓ Onarım ve Masraf Tarafınızca Onaylandı (Yönetici & Teknisyen Ekranına Aktarıldı)
          </div>
        `;
      }

      // 7. Yönetici & Kontrol Paneli Görünümlerini Anında Yenile
      renderIncomingCalls();
      renderTechJobs();
      updateActiveOrdersKPI();
      if (typeof updateFleetKPI === 'function') updateFleetKPI();

      const bannerOrder = targetOrder || (state.workOrders && state.workOrders.length > 0 ? state.workOrders[0] : null);
      if (typeof updateDispatchBanner === 'function' && bannerOrder) {
        const assignedTech = (state.staff || []).find(s => s.name === bannerOrder.assigned_tech || s.id === bannerOrder.assigned_user_id);
        updateDispatchBanner(bannerOrder, assignedTech);
      }

      showToast(`✅ #${code} için müşteri onayı alındı ve Yönetici Kontrol Paneline anında işlendi!`);
    });
  }

  if (btnReject) {
    btnReject.addEventListener('click', () => {
      showToast("Talebiniz alındı. Müşteri temsilcimiz 15 dakika içinde sizi arayacaktır.");
    });
  }

  if (btnSearch) {
    btnSearch.addEventListener('click', async () => {
      const inputEl = document.getElementById('cust-search-input');
      const query = inputEl ? inputEl.value.trim() : '';
      if (!query) return;

      btnSearch.disabled = true;
      btnSearch.innerHTML = `<span>Aranıyor...</span>`;

      // 1. Önce canlı backend API'den sorgula
      let foundData = null;
      try {
        const res = await fetch(`${API_BASE_URL}/api/work-orders/${query}`);
        if (res.ok) {
          foundData = await res.json();
        }
      } catch (err) {}

      // 2. Canlı API'de yoksa veya offline ise yerel state'den esnek (kod, telefon, isim, seri no) sorgula
      if (!foundData && state.workOrders) {
        const cleanQuery = query.toLowerCase();
        const cleanDigits = query.replace(/\D/g, '');

        foundData = state.workOrders.find(o => {
          const oCode = (o.tracking_code || o.code || '').toLowerCase();
          const oPhone = (o.customer_phone || '').replace(/\D/g, '');
          const oName = (o.customer_name || '').toLowerCase();
          const oSn = (o.serial_number || '').toLowerCase();
          return oCode === cleanQuery || 
                 (cleanDigits.length >= 7 && oPhone.includes(cleanDigits)) ||
                 (cleanQuery.length >= 3 && oName.includes(cleanQuery)) ||
                 (cleanQuery.length >= 4 && oSn.includes(cleanQuery));
        });
      }

      if (!foundData && state.activeOrder) {
        const activeCode = (state.activeOrder.code || state.activeOrder.tracking_code || '').toLowerCase();
        if (activeCode === query.toLowerCase()) {
          foundData = state.activeOrder;
        }
      }

      if (foundData) {
        currentSearchedCode = foundData.tracking_code || foundData.code;
        renderCustomerTrackingResult(foundData);
        showToast(`✓ #${currentSearchedCode} iş emri başarıyla sorgulandı.`);
      } else {
        showToast(`❌ "${query}" ile eşleşen iş emri bulunamadı. Takip kodunu veya telefon numaranızı kontrol edin.`);
      }

      btnSearch.disabled = false;
      btnSearch.innerHTML = `
        <span>Sorgula</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      `;
    });
  }
}

// ==================== Helper: Status Sync ====================
function syncStatusEverywhere(newStatus) {
  // Teknisyen select
  const statusSelect = document.getElementById('select-job-status');
  if (statusSelect && statusSelect.value !== newStatus) {
    statusSelect.value = newStatus;
  }

  // Teknisyen sol kart badge
  const techBadge = document.getElementById('tech-badge-status');
  if (techBadge) techBadge.textContent = newStatus;

  // Müşteri ekranı badge ve stepper
  const custBadge = document.getElementById('cust-status-text');
  if (custBadge) custBadge.textContent = newStatus;

  const steps = document.querySelectorAll('.stepper-wrapper .step');
  if (newStatus === 'Kabul Edildi') {
    setStepperActiveIndex(0);
  } else if (newStatus === 'İncelemede') {
    setStepperActiveIndex(1);
  } else if (newStatus === 'Onarımda' || newStatus === 'Parça Bekliyor') {
    setStepperActiveIndex(2);
  } else if (newStatus === 'Test Aşamasında') {
    setStepperActiveIndex(3);
  } else if (newStatus === 'Tamamlandı' || newStatus === 'Teslime Hazır') {
    setStepperActiveIndex(4);
  }
}

function setStepperActiveIndex(activeIndex) {
  const steps = document.querySelectorAll('.stepper-wrapper .step');
  steps.forEach((step, idx) => {
    step.classList.remove('active', 'completed');
    if (idx < activeIndex) {
      step.classList.add('completed');
      step.querySelector('.step-circle').textContent = '✓';
    } else if (idx === activeIndex) {
      step.classList.add('active');
      step.querySelector('.step-circle').textContent = idx + 1;
    } else {
      step.querySelector('.step-circle').textContent = idx + 1;
    }
  });
}

// ==================== Toast Notifications ====================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>ℹ️</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==================== 4. CANLI SAHA GPS SİMÜLASYONU ====================
let gpsSimState = {
  isRunning: true,
  progress: 0.25, // 0.0 -> 1.0 (başlangıçta %25'inde olsun)
  totalDistanceKm: 3.8,
  timer: null
};

function initGpsSimulation() {
  const marker = document.getElementById('vehicle-marker');
  const etaDisplay = document.getElementById('eta-display');
  const distanceDisplay = document.getElementById('distance-display');
  const speedDisplay = document.getElementById('speed-display');
  const routeProgress = document.getElementById('route-progress');
  const lastPing = document.getElementById('last-ping');
  const btnToggle = document.getElementById('btn-toggle-simulation');
  const btnArrived = document.getElementById('btn-arrived-simulation');

  // Gerçek WebSocket GPS Hattı Bağlantısı (FastAPI /ws/gps)
  let gpsSocket = null;
  try {
    gpsSocket = new WebSocket("ws://127.0.0.1:8000/ws/gps");
    gpsSocket.onopen = () => {
      console.log("ServisAI: Canlı WebSocket GPS hattı aktif.");
    };
    gpsSocket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (lastPing) lastPing.textContent = "şimdi (WS-GPS)";
      } catch (err) {}
    };
  } catch (err) {
    console.warn("WebSocket yerel simülasyon modunda çalışıyor.");
  }

  // Kübik Bezier Eğrisi Noktaları (SVG viewBox 700x240 referanslı vektör radar için)
  function getBezierPoint(t) {
    let p0, p1, p2, p3;
    let localT;

    if (t < 0.5) {
      localT = t * 2;
      p0 = { x: 60, y: 180 };
      p1 = { x: 180, y: 180 };
      p2 = { x: 220, y: 70 };
      p3 = { x: 360, y: 70 };
    } else {
      localT = (t - 0.5) * 2;
      p0 = { x: 360, y: 70 };
      p1 = { x: 480, y: 70 };
      p2 = { x: 540, y: 150 };
      p3 = { x: 640, y: 110 };
    }

    const u = 1 - localT;
    const tt = localT * localT;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * localT;

    const x = uuu * p0.x + 3 * uu * localT * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
    const y = uuu * p0.y + 3 * uu * localT * p1.y + 3 * u * tt * p2.y + ttt * p3.y;

    return { x, y };
  }

  function updateTelemetry() {
    const t = gpsSimState.progress;

    // 1. Vektör SVG Radar Marker Pozisyonu
    if (marker) {
      const pt = getBezierPoint(t);
      const leftPct = (pt.x / 700) * 100;
      const topPct = (pt.y / 240) * 100;
      marker.style.left = `${leftPct}%`;
      marker.style.top = `${topPct}%`;
    }

    // 2. Gerçek Google Haritası (Leaflet) Üzerinde Canlı GPS Takibi
    const currentRoute = leafletMapState ? leafletMapState.currentRoute : null;
    if (leafletMapState && leafletMapState.map && leafletMapState.vehicleMarker && currentRoute && currentRoute.waypoints && currentRoute.waypoints.length > 1) {
      const wps = currentRoute.waypoints;
      const exactIdx = t * (wps.length - 1);
      const baseIdx = Math.min(Math.floor(exactIdx), wps.length - 2);
      const frac = exactIdx - baseIdx;

      const [latA, lngA] = wps[baseIdx];
      const [latB, lngB] = wps[baseIdx + 1];
      const curLat = latA + (latB - latA) * frac;
      const curLng = lngA + (lngB - lngA) * frac;

      leafletMapState.vehicleMarker.setLatLng([curLat, curLng]);

      // Kat edilen yolu dinamik çiz
      const traveledPoints = wps.slice(0, baseIdx + 1);
      traveledPoints.push([curLat, curLng]);
      if (leafletMapState.traveledPolyline) {
        leafletMapState.traveledPolyline.setLatLngs(traveledPoints);
      }
    }

    // 3. Metrik ve Telemetri Hesaplamaları
    const remainingKm = Math.max(0, (1 - t) * gpsSimState.totalDistanceKm).toFixed(1);
    const baseSpeed = (currentRoute && currentRoute.speed) ? currentRoute.speed : 50;
    const speed = t >= 1 ? 0 : Math.floor(baseSpeed + Math.sin(t * 14) * (baseSpeed * 0.04));
    const totalEta = (currentRoute && currentRoute.etaMinutes) ? currentRoute.etaMinutes : Math.ceil(gpsSimState.totalDistanceKm * 1.8);
    const etaMinutes = t >= 1 ? 0 : Math.max(1, Math.ceil((1 - t) * totalEta));

    if (distanceDisplay) distanceDisplay.textContent = `${remainingKm} km`;
    if (speedDisplay) speedDisplay.textContent = `${speed} km/s`;
    if (routeProgress) routeProgress.style.width = `${(t * 100).toFixed(0)}%`;

    if (t >= 0.98) {
      if (etaDisplay) etaDisplay.textContent = "Ulaştı (Kapıda)";
      if (speedDisplay) speedDisplay.textContent = "0 km/s (Tamamlandı)";
    } else {
      if (etaDisplay) etaDisplay.textContent = `${etaMinutes} Dakika`;
    }

    // Canlı GPS ping simülasyonu
    if (lastPing) {
      const pings = ["şimdi (Canlı GPS)", "1 sn önce (GPS)", "2 sn önce (GPS)"];
      lastPing.textContent = pings[Math.floor(Math.random() * pings.length)];
    }

    // Canlı WebSocket üzerinden sunucuya telemetri ilet
    if (gpsSocket && gpsSocket.readyState === WebSocket.OPEN) {
      try {
        const currentPerson = leafletMapState ? leafletMapState.currentPerson : null;
        gpsSocket.send(JSON.stringify({
          tech_id: currentPerson ? currentPerson.id : 1,
          vehicle_plate: currentPerson ? currentPerson.vehiclePlate : "34 ABC 101",
          progress: t,
          speed: speed,
          distance_km: remainingKm,
          eta_min: etaMinutes,
          travel_mode: currentRoute && currentRoute.travelMode ? currentRoute.travelMode.type : 'car'
        }));
      } catch (e) {}
    }
  }

  // Timer Döngüsü
  if (gpsSimState.timer) clearInterval(gpsSimState.timer);
  gpsSimState.timer = setInterval(() => {
    if (gpsSimState.isRunning && gpsSimState.progress < 1) {
      const curRoute = leafletMapState ? leafletMapState.currentRoute : null;
      const simStep = (curRoute && curRoute.travelMode && curRoute.travelMode.type === 'flight') ? 0.016 :
                      (curRoute && curRoute.travelMode && curRoute.travelMode.type === 'train') ? 0.020 : 0.024;
      gpsSimState.progress += simStep;
      if (gpsSimState.progress >= 1) {
        gpsSimState.progress = 1;
        gpsSimState.isRunning = false;
        updateSimControlsUI();
        const techName = (leafletMapState && leafletMapState.currentPerson) ? leafletMapState.currentPerson.name : "Saha Teknisyeni";
        const custName = (leafletMapState && leafletMapState.currentRoute) ? leafletMapState.currentRoute.targetCustomer : "Müşteri";
        showToast(`📍 ${techName} müşteri adresi (${custName}) kapısına ulaştı!`);
        if (leafletMapState && leafletMapState.vehicleMarker) {
          leafletMapState.vehicleMarker.openPopup();
        }
      }
      updateTelemetry();
    }
  }, 1200);

  // Başlangıç güncellemesi
  updateTelemetry();

  // Duraklat / Devam Et Butonu
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      if (gpsSimState.progress >= 1) {
        gpsSimState.progress = 0; // Başa sar
      }
      gpsSimState.isRunning = !gpsSimState.isRunning;
      updateSimControlsUI();
      showToast(gpsSimState.isRunning ? "▶️ Canlı Google Harita GPS Takibi Başlatıldı" : "⏸️ GPS Takip Simülasyonu Duraklatıldı");
    });
  }

  // Müşteriye Ulaştı Butonu
  if (btnArrived) {
    btnArrived.addEventListener('click', () => {
      gpsSimState.progress = 1;
      gpsSimState.isRunning = false;
      updateTelemetry();
      updateSimControlsUI();
      const techName = (leafletMapState && leafletMapState.currentPerson) ? leafletMapState.currentPerson.name : "Saha Teknisyeni";
      showToast(`✓ ${techName} müşteriye ulaştı olarak onaylandı. Onarım ve parça işlemine geçilebilir.`);
      if (leafletMapState && leafletMapState.vehicleMarker) {
        leafletMapState.vehicleMarker.openPopup();
      }
    });
  }
}

function updateSimControlsUI() {
  const icon = document.getElementById('sim-play-icon');
  const text = document.getElementById('sim-btn-text');
  if (icon && text) {
    if (gpsSimState.isRunning) {
      icon.textContent = "⏸️";
      text.textContent = "Simülasyonu Duraklat";
    } else {
      icon.textContent = "▶️";
      text.textContent = gpsSimState.progress >= 1 ? "Yeniden Simüle Et" : "Takibe Devam Et";
    }
  }
}

// ==================== 5. Dynamic Synchronization Helpers ====================

function renderCustomerTrackingResult(data) {
  const resultBox = document.getElementById('tracking-result-box');
  if (!resultBox) return;

  const trackingCode = data.tracking_code || data.code || 'SRV-2026-104';
  const trackingCodePill = resultBox.querySelector('.tracking-code-pill');
  if (trackingCodePill) trackingCodePill.innerHTML = `Takip Kodu: <strong>${trackingCode}</strong>`;

  const brand = data.device_brand || (data.device && typeof data.device === 'object' ? data.device.brand : '') || '';
  const model = data.device_model || (data.device && typeof data.device === 'object' ? data.device.model : '') || (typeof data.device === 'string' ? data.device : '');
  const serialNo = data.serial_number || (data.device && typeof data.device === 'object' ? data.device.serial_number : 'SN-2026-BELIRTILMEDI');

  const deviceName = resultBox.querySelector('.device-name');
  if (deviceName) deviceName.textContent = `${brand} ${model}`.trim() || (typeof data.device === 'string' ? data.device : "Endüstriyel Cihaz");

  const deviceSn = resultBox.querySelector('.device-sn');
  if (deviceSn) {
    const intakeDate = data.created_at ? new Date(data.created_at).toLocaleDateString('tr-TR') : 'Bugün';
    deviceSn.innerHTML = `Seri No: <strong>${serialNo}</strong> • Kabul Tarihi: <strong>${intakeDate}</strong>`;
  }

  const custStatus = document.getElementById('cust-status-text');
  if (custStatus) custStatus.textContent = data.status || 'Kabul Edildi';

  // Stepper güncelle
  syncStatusEverywhere(data.status || 'Kabul Edildi');

  // Şikayet ve tespit
  const blocks = resultBox.querySelectorAll('.detail-block .block-text');
  if (blocks.length >= 2) {
    blocks[0].textContent = data.customer_complaint || "Belirtilmedi";
    blocks[1].textContent = data.technician_findings || "Teknisyen inceleme aşamasındadır.";
  }

  // Fiyat
  const priceEl = resultBox.querySelector('.approval-price');
  if (priceEl) priceEl.innerHTML = `${(data.total_cost || 0).toLocaleString('tr-TR')} ₺ <small>(KDV Dahil)</small>`;

  const subEl = resultBox.querySelector('.approval-sub');
  if (subEl) subEl.textContent = `Parça: ${(data.parts_cost || 0).toLocaleString('tr-TR')} ₺ • İşçilik ve Test: ${(data.labor_cost || 0).toLocaleString('tr-TR')} ₺`;

  // Onay kutusu
  const actionsBox = document.getElementById('customer-action-buttons');
  if (actionsBox) {
    if (data.customer_approved || data.customerApproved) {
      actionsBox.innerHTML = `
        <div class="chip chip-success" style="font-size: 0.95rem; padding: 10px 18px; border: 1px solid #10b981; background: rgba(16, 185, 129, 0.15); display: inline-flex; align-items: center; gap: 8px;">
          ✓ Onarım ve Masraf Tarafınızca Onaylandı (Yönetici & Teknisyen Ekranına Aktarıldı)
        </div>
      `;
    } else {
      actionsBox.innerHTML = `
        <button class="btn btn-success" id="btn-cust-approve">
          <span>✓ Onaylıyorum</span>
        </button>
        <button class="btn btn-outline-danger" id="btn-cust-reject">
          <span>Reddet / İletişim İste</span>
        </button>
      `;
      initCustomerActions();
    }
  }
}

async function loadWorkOrderToWorkbench(trackingCode) {
  const codeEl = document.getElementById('active-job-code');
  const titleEl = document.getElementById('active-job-title');
  const custEl = document.getElementById('active-job-customer');
  const symptomInput = document.getElementById('ai-symptom-input');
  const intikalAddress = document.getElementById('tech-intikal-address');

  let orderData = null;
  if (state.workOrders) {
    orderData = state.workOrders.find(o => (o.tracking_code || o.code) === trackingCode);
  }
  if (!orderData && state.staffJobs) {
    for (const sId in state.staffJobs) {
      const match = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === trackingCode);
      if (match) {
        orderData = match;
        break;
      }
    }
  }

  if (!orderData) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/work-orders/${trackingCode}`);
      if (res.ok) {
        orderData = await res.json();
      }
    } catch (e) {}
  }

  if (orderData) {
    const custName = orderData.customer ? (orderData.customer.name || orderData.customer) : (orderData.customer_name || "Müşteri");
    const custAddr = orderData.customer ? (orderData.customer.address || "") : (orderData.customer_address || "İstanbul");
    const brand = orderData.device ? (orderData.device.brand || "") : (orderData.device_brand || "");
    const model = orderData.device ? (orderData.device.model || "") : (orderData.device_model || "");
    const sn = orderData.device ? (orderData.device.serial_number || "") : (orderData.serial_number || "");
    const complaint = orderData.customer_complaint || orderData.complaint || "Arıza detayı belirtilmedi.";

    state.activeOrder = {
      code: orderData.tracking_code || orderData.code,
      customer: custName,
      customerAddress: custAddr,
      customerPhone: orderData.customer_phone || "",
      device: `${brand} ${model}`.trim() || (orderData.device || "Endüstriyel Cihaz"),
      brand: brand,
      model: model,
      serialNo: sn,
      status: orderData.status || "Kabul Edildi",
      complaint: complaint,
      findings: orderData.technician_findings || orderData.findings || "",
      solution: orderData.technician_solution || orderData.solution || "",
      action: orderData.technician_action || orderData.action || "",
      laborCost: (orderData.laborCost !== undefined ? orderData.laborCost : (orderData.labor_cost !== undefined ? orderData.labor_cost : 600)),
      usedParts: orderData.used_parts ? orderData.used_parts.map(p => ({
        code: p.part_code || p.code,
        name: p.part_name || p.name,
        qty: p.quantity || p.qty || 1,
        price: p.unit_price || p.price || 450,
        unitPrice: p.unit_price || p.price || 450,
        warranty: p.warranty || "12 Ay",
        source: p.source || (p.isLocalPurchase ? `Yerel Tedarik (${p.supplierDoc || ''})` : "Mobil Araç Stoğu"),
        isLocalPurchase: !!p.isLocalPurchase,
        supplierDoc: p.supplierDoc || p.supplier_doc || "",
        movementId: p.movementId || p.movement_id || ""
      })) : [],
      customerApproved: !!(orderData.customer_approved || orderData.customerApproved),
      assignedTech: orderData.assigned_tech || "",
      workSteps: orderData.workSteps || orderData.work_steps || [],
      departedAt: orderData.departed_at || orderData.departedAt || orderData.travel_start_time || null,
      arrivedAt: orderData.arrived_at || orderData.arrivedAt || orderData.work_start_time || null,
      completedAt: orderData.completed_at || orderData.completedAt || orderData.repair_finish_time || null,
      travelDurationMinutes: orderData.travel_duration_minutes || orderData.travelDurationMinutes || (orderData.status === 'Tamamlandı' ? 25 : null),
      repairDurationMinutes: orderData.repair_duration_minutes || orderData.repairDurationMinutes || (orderData.status === 'Tamamlandı' ? 45 : null),
      totalDurationMinutes: orderData.total_duration_minutes || orderData.totalDurationMinutes || (orderData.status === 'Tamamlandı' ? 70 : null)
    };

    if (codeEl) codeEl.textContent = `#${state.activeOrder.code}`;
    if (titleEl) titleEl.textContent = `${brand} ${model} - ${complaint.length > 50 ? complaint.slice(0, 50) + '...' : complaint}`;
    if (custEl) custEl.textContent = `Müşteri: ${custName} • ${custAddr}`;
    if (symptomInput) symptomInput.value = complaint;
    if (intikalAddress) intikalAddress.textContent = `${custName} • ${custAddr}`;

    // Bu cihaza ve arızaya özel yapay zeka arıza analizini dinamik üret ve yaz
    const dynamicDiag = synthesizeAIDiagnosis(brand, model, complaint, orderData);
    renderAIDataToOutput(dynamicDiag);

    // Teknisyen 3 adımlı müdahale alanlarını yükle veya akıllı önerilerle başlat
    const findingsInput = document.getElementById('tech-findings-input');
    const solutionInput = document.getElementById('tech-solution-input');
    const actionInput = document.getElementById('tech-action-input');

    const initFindings = state.activeOrder.findings || dynamicDiag.probable_root_cause || '';
    const initSolution = state.activeOrder.solution || dynamicDiag.recommended_solution || '';
    const initAction = state.activeOrder.action || dynamicDiag.recommended_action || '';

    state.activeOrder.findings = initFindings;
    state.activeOrder.solution = initSolution;
    state.activeOrder.action = initAction;

    if (findingsInput) findingsInput.value = initFindings;
    if (solutionInput) solutionInput.value = initSolution;
    if (actionInput) actionInput.value = initAction;

    syncStatusEverywhere(orderData.status || "Kabul Edildi");
    updateTechJourneyUI(state.activeOrder);
    renderTechWorkSteps();
    renderUsedParts();
    renderTechExpenses();
    updateVehiclePartDropdown();

    // Kart seçimini güncelle
    const container = document.getElementById('job-cards-container');
    if (container) {
      container.querySelectorAll('.job-card').forEach(card => {
        if (card.getAttribute('data-code') === (orderData.tracking_code || orderData.code)) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    showToast(`📋 #${orderData.tracking_code || orderData.code} iş emri tezgahınıza yüklendi.`);
  }
}

function initServiceLabelActions() {
  const btnPrint = document.getElementById('btn-print-service-label');
  const labelModal = document.getElementById('label-modal');
  const btnClose = document.getElementById('btn-close-label-modal');
  const btnCloseFooter = document.getElementById('btn-close-label-modal-footer');
  const btnPrintNow = document.getElementById('btn-print-label-now');

  if (btnPrint && labelModal) {
    btnPrint.addEventListener('click', () => {
      const code = state.activeOrder ? state.activeOrder.code : "SRV-2026-104";
      loadAndShowServiceLabel(code);
    });
  }

  if (btnClose && labelModal) {
    btnClose.addEventListener('click', () => { labelModal.style.display = 'none'; });
  }
  if (btnCloseFooter && labelModal) {
    btnCloseFooter.addEventListener('click', () => { labelModal.style.display = 'none'; });
  }
  if (labelModal) {
    labelModal.addEventListener('click', (e) => {
      if (e.target === labelModal) labelModal.style.display = 'none';
    });
  }
  if (btnPrintNow) {
    btnPrintNow.addEventListener('click', () => {
      document.body.classList.remove('printing-report', 'printing-expert-report');
      document.body.classList.add('printing-label');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-label');
      }, 1000);
    });
  }
}

function loadAndShowServiceLabel(trackingCode) {
  const labelModal = document.getElementById('label-modal');
  if (!labelModal) return;

  let localOrder = (state.workOrders || []).find(o => (o.tracking_code === trackingCode || o.code === trackingCode));
  if (!localOrder && state.activeOrder && (state.activeOrder.code === trackingCode || state.activeOrder.tracking_code === trackingCode)) {
    localOrder = state.activeOrder;
  }
  if (!localOrder && state.staffJobs) {
    for (const sId in state.staffJobs) {
      const match = state.staffJobs[sId].find(o => o.tracking_code === trackingCode);
      if (match) { localOrder = match; break; }
    }
  }
  if (!localOrder) localOrder = state.activeOrder;

  const codeEl = document.getElementById('lbl-tracking-code');
  const custEl = document.getElementById('lbl-customer-name');
  const devEl = document.getElementById('lbl-device-name');
  const snEl = document.getElementById('lbl-serial-no');
  const dateEl = document.getElementById('lbl-intake-date');
  const techEl = document.getElementById('lbl-assigned-tech');
  const compEl = document.getElementById('lbl-complaint-text');

  const code = trackingCode || (localOrder ? (localOrder.tracking_code || localOrder.code) : "SRV-2026-104");

  if (codeEl) codeEl.textContent = code;
  if (custEl && localOrder) custEl.textContent = localOrder.customer_name || localOrder.customer || "Müşteri";
  if (devEl && localOrder) devEl.textContent = localOrder.device || `${localOrder.device_brand || ''} ${localOrder.device_model || ''}`.trim() || "Endüstriyel Cihaz";
  if (snEl && localOrder) snEl.textContent = localOrder.serial_number || localOrder.serialNo || "SN-2026-BELIRTILMEDI";
  if (compEl && localOrder) compEl.textContent = localOrder.customer_complaint || "Arıza açıklaması belirtilmedi.";
  if (techEl && localOrder) techEl.textContent = localOrder.assigned_tech ? `${localOrder.assigned_tech}` : "⏳ Atama Bekliyor (Henüz Sevk Edilmedi)";
  if (dateEl) {
    const d = (localOrder && localOrder.created_at) ? new Date(localOrder.created_at) : new Date();
    dateEl.textContent = d.toLocaleDateString('tr-TR') + ' ' + d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }

  // Modalı anında göster (Sıfır gecikme)
  labelModal.style.display = 'flex';
  showToast(`🏷️ #${code} cihaz servis kabul ve QR barkod etiketi hazırlandı.`);

  // Canlı backend API arka planda varsa senkronize et (Arayüzü bekletmez)
  fetch(`${API_BASE_URL}/api/work-orders/${code}/label`)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (!data) return;
      if (codeEl && data.tracking_code) codeEl.textContent = data.tracking_code;
      if (custEl && data.customer_name) custEl.textContent = data.customer_name;
      if (devEl && data.device_brand) devEl.textContent = `${data.device_brand} ${data.device_model}`;
      if (snEl && data.serial_number) snEl.textContent = data.serial_number;
      if (dateEl && data.intake_date) dateEl.textContent = data.intake_date;
      if (techEl && data.assigned_tech) techEl.textContent = data.assigned_tech;
      if (compEl && data.complaint) compEl.textContent = data.complaint;
    })
    .catch(() => {});
}

async function syncInitialDataFromBackend() {
  try {
    // 1. Personel
    const staffRes = await fetch(`${API_BASE_URL}/api/staff`);
    if (staffRes.ok) {
      const staffData = await staffRes.json();
      if (staffData && staffData.length > 0) {
        state.staff = staffData
          .filter(u => u.role !== "Yönetici" && u.status !== "Ayrıldı")
          .map(u => ({
            id: u.id,
            name: u.full_name,
            role: u.role,
            specialty: u.specialty || "Genel Saha",
            status: u.status,
            location: u.current_lat ? `Kadıköy (${(Math.random() * 4 + 2).toFixed(1)} km)` : "Kadıköy (Müşteriye 2.4 km)",
            vehiclePlate: u.vehicle_plate || "34 ABC 101",
            avatar: u.full_name.split(' ').map(n => n[0]).join(''),
            distanceKm: 2.4
          }));
        renderStaffList();
        populateMapTechDropdown();
      }
    }

    // 2. Parça & Depo Matrisi
    const stockRes = await fetch(`${API_BASE_URL}/api/stock/matrix`);
    if (stockRes.ok) {
      const stockData = await stockRes.json();
      if (stockData && stockData.length > 0) {
        state.stock = stockData;
        renderStockTable();
        updateVehiclePartDropdown();
      }
    }

    // 3. Periyodik Bakım Sözleşmeleri
    const maintRes = await fetch(`${API_BASE_URL}/api/maintenance`);
    if (maintRes.ok) {
      const maintData = await maintRes.json();
      if (maintData && maintData.length > 0) {
        state.maintenance = maintData;
        renderMaintenance();
      }
    }

    // 4. İş Emirleri
    const ordersRes = await fetch(`${API_BASE_URL}/api/work-orders`);
    if (ordersRes.ok) {
      const ordersData = await ordersRes.json();
      if (ordersData && ordersData.length > 0) {
        state.workOrders = ordersData;
        const kpiOrders = document.getElementById('kpi-active-orders');
        if (kpiOrders) kpiOrders.textContent = ordersData.length;

        // Dispatch banner'ı son gelen çağrıya göre ayarla
        const unassigned = ordersData.find(o => !o.assigned_user_id || o.status === "Kabul Edildi");
        if (unassigned) {
          updateDispatchBanner(unassigned, null);
        }

        renderTechJobs();
      }
    }
  } catch (err) {
    console.log("ServisAI: Backend çevrimdışı, yerel önbellek verileriyle devam ediliyor.");
  }
}

// ==================== 5. WhatsApp & SMS Müşteri Bildirim Motoru ====================
const notifState = {
  activeTemplate: 'KABUL',
  activeChannel: 'WhatsApp',
  currentTrackingCode: 'SRV-2026-104',
  recipientPhone: '0532 999 1122',
  recipientName: 'TermoTek Ltd.',
  etaMinutes: 20,
  cleanPhone: '905329991122'
};

function cleanPhoneForWhatsApp(phone) {
  if (!phone) return '905329991122';
  let cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '90' + cleaned.slice(1);
  } else if (cleaned.length === 10 && !cleaned.startsWith('90')) {
    cleaned = '90' + cleaned;
  }
  return cleaned;
}

function formatWhatsAppText(text) {
  if (!text) return '';
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  escaped = escaped.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/_(.*?)_/g, '<em>$1</em>');
  escaped = escaped.replace(/\n/g, '<br>');
  return escaped;
}

function updateNotifCharCounter(text) {
  const counterEl = document.getElementById('notif-char-counter');
  if (!counterEl) return;
  const len = text ? text.length : 0;
  const smsCount = Math.max(1, Math.ceil(len / 160));
  counterEl.textContent = `${len} Karakter • ${smsCount} SMS`;
}

function updateWhatsAppBubble(text) {
  const bubbleContent = document.getElementById('wa-bubble-content');
  const bubbleTime = document.getElementById('wa-bubble-time');
  if (bubbleContent) {
    bubbleContent.innerHTML = formatWhatsAppText(text);
  }
  if (bubbleTime) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    bubbleTime.textContent = `${hours}:${mins}`;
  }
}

async function loadNotificationPreview() {
  const code = notifState.currentTrackingCode || (state.activeOrder ? state.activeOrder.code : "SRV-2026-104");
  const template = notifState.activeTemplate || 'KABUL';
  const eta = notifState.etaMinutes || 20;

  const recNameEl = document.getElementById('notif-recipient-name');
  const recPhoneEl = document.getElementById('notif-recipient-phone');
  const trackBadgeEl = document.getElementById('notif-tracking-badge');
  const waDisplayCust = document.getElementById('wa-display-customer');
  const textarea = document.getElementById('notif-message-textarea');

  // 1. İlgili iş emrini tespit et
  let currentOrder = null;
  if (state.workOrders) {
    currentOrder = state.workOrders.find(o => (o.tracking_code || o.code) === code);
  }
  if (!currentOrder && state.staffJobs) {
    for (const sId in state.staffJobs) {
      const match = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
      if (match) {
        currentOrder = match;
        break;
      }
    }
  }
  if (!currentOrder) {
    currentOrder = state.activeOrder;
  }

  // 2. Aktif veya atanan saha teknisyenini tespit et (Levent İmekci vb.)
  let assignedTech = null;
  if (currentOrder) {
    if (currentOrder.assigned_user_id) {
      assignedTech = (state.staff || []).find(s => s.id == currentOrder.assigned_user_id);
    }
    if (!assignedTech && currentOrder.assigned_tech) {
      assignedTech = (state.staff || []).find(s => s.name && s.name.toLowerCase().trim() === currentOrder.assigned_tech.toLowerCase().trim());
    }
  }
  if (!assignedTech && state.activeTechId) {
    assignedTech = (state.staff || []).find(s => s.id == state.activeTechId);
  }
  if (!assignedTech && state.staff && state.staff.length > 0) {
    assignedTech = state.staff.find(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı') || state.staff[0];
  }

  const techName = assignedTech ? assignedTech.name : (currentOrder && currentOrder.assigned_tech ? currentOrder.assigned_tech : "Saha Mühendisimiz");
  const techPlate = assignedTech && assignedTech.vehiclePlate && assignedTech.vehiclePlate !== 'Zimmetsiz' ? assignedTech.vehiclePlate : "34 ABC 101";
  const techRole = assignedTech ? (assignedTech.role || "Saha Mühendisimiz") : "Saha Mühendisimiz";

  try {
    const res = await fetch(`${API_BASE_URL}/api/notifications/preview?tracking_code=${encodeURIComponent(code)}&template_id=${encodeURIComponent(template)}&eta_minutes=${eta}&tech_name=${encodeURIComponent(techName)}&vehicle_plate=${encodeURIComponent(techPlate)}`);
    if (res.ok) {
      const data = await res.json();
      notifState.recipientPhone = data.recipient_phone || (currentOrder ? (currentOrder.customer_phone || currentOrder.phone) : "") || "0532 999 1122";
      notifState.recipientName = data.recipient_name || (currentOrder ? (currentOrder.customer_name || currentOrder.customer) : "") || "Müşteri";
      notifState.cleanPhone = data.recipient_wa_phone || cleanPhoneForWhatsApp(notifState.recipientPhone);

      let messageText = (notifState.activeChannel === 'SMS') 
        ? (data.sms_text || data.whatsapp_text) 
        : (data.whatsapp_text || data.sms_text);

      // Güvenlik: Eğer backend varsayılan olarak "Murat Aydın" döndüyse ama aktif teknisyen farklıysa, metni teknisyenin adına uyarla
      if (techName && techName !== "Murat Aydın") {
        messageText = messageText.replace(/Murat Aydın/g, techName).replace(/34 ABC 101/g, techPlate);
      }

      if (recNameEl) recNameEl.textContent = notifState.recipientName;
      if (recPhoneEl) recPhoneEl.textContent = notifState.recipientPhone;
      if (trackBadgeEl) trackBadgeEl.textContent = data.tracking_code || code;
      if (waDisplayCust) waDisplayCust.textContent = notifState.recipientName;
      if (textarea) textarea.value = messageText;

      updateWhatsAppBubble(messageText);
      updateNotifCharCounter(messageText);
      return;
    }
  } catch (err) {
    console.log("ServisAI: Bildirim şablonu yerel simülasyon motoruyla oluşturuluyor.");
  }

  // Çevrimdışı (Offline) Dinamik Güvenli Fallback Şablon Motoru
  const custName = currentOrder ? (currentOrder.customer_name || currentOrder.customer || "Değerli Müşterimiz") : "Değerli Müşterimiz";
  const devName = currentOrder ? (
    (currentOrder.device_brand ? `${currentOrder.device_brand} ${currentOrder.device_model || ''}` : '') ||
    (currentOrder.device ? (typeof currentOrder.device === 'object' ? `${currentOrder.device.brand || ''} ${currentOrder.device.model || ''}` : currentOrder.device) : '') ||
    "Teknik Cihazınız"
  ).trim() : "Teknik Cihazınız";
  const phone = currentOrder ? (currentOrder.customer_phone || currentOrder.phone || "0532 999 1122") : "0532 999 1122";
  const partsTotal = currentOrder && currentOrder.usedParts ? currentOrder.usedParts.reduce((acc, p) => acc + (p.price || 0), 0) : (currentOrder ? (currentOrder.parts_cost || 0) : 0);
  const grandTotal = currentOrder ? ((currentOrder.laborCost || currentOrder.labor_cost || 600) + partsTotal) : 1050;

  let localText = "";
  if (template === "KABUL") {
    localText = `Sayın *${custName}*,\n\n*#${code}* takip kodlu *${devName}* cihazınız teknik servisimize kabul edilmiştir.\n\nCihazınızın test ve onarım durumunu canlı takip etmek için:\n👉 https://funzervicetech.ai/takip?code=${code}\n\nİyi günler dileriz.\n*FUNZerviceTech.ai Teknik Ekibi*`;
  } else if (template === "YOLDA") {
    localText = `Sayın *${custName}*,\n\n${techRole} *${techName}*, *${devName}* servis talebiniz için adresinize doğru yola çıkmıştır.\n\n⏱️ Tahmini Varış Süresi: *${eta} Dakika*\n🚗 Araç Plakası: *${techPlate}*\n\nHaritadan canlı takip için: https://funzervicetech.ai/takip?code=${code}`;
  } else if (template === "ONAY_TALEBI") {
    localText = `Sayın *${custName}*,\n\n*#${code}* kodlu cihazınız için arıza tespiti tamamlanmıştır.\n\n💰 Toplam Onarım & Parça Bedeli: *${grandTotal.toLocaleString('tr-TR')} TL* (KDV Dahil)\n\nOnayınız olmadan parça değişimi yapılmayacaktır. Tek tıkla onaylamak için:\n👉 https://funzervicetech.ai/onay?code=${code}`;
  } else if (template === "TAMAMLANDI") {
    localText = `Sayın *${custName}*,\n\n*#${code}* kodlu cihazınızın onarım ve testleri uzmanımız *${techName}* tarafından başarıyla *TAMAMLANMIŞTIR*.\n\nCihazınızı servis merkezimizden teslim alabilir veya kargo talebinde bulunabilirsiniz.\nFatura ve garanti belgeniz tarafınıza iletilmiştir.`;
  } else if (template === "BAKIM_HATIRLATMA") {
    localText = `Sayın *${custName}*,\n\n*${devName}* sisteminiz için periyodik bakım dönemi yaklaşmaktadır.\n\nArıza ve plansız duruşların önüne geçmek için bakım randevunuzu planlayabilirsiniz:\n📞 0850 300 00 00\nFUNZerviceTech.ai Endüstriyel Çözümler`;
  }

  notifState.recipientPhone = phone;
  notifState.recipientName = custName;
  notifState.cleanPhone = cleanPhoneForWhatsApp(phone);

  if (recNameEl) recNameEl.textContent = custName;
  if (recPhoneEl) recPhoneEl.textContent = phone;
  if (trackBadgeEl) trackBadgeEl.textContent = code;
  if (waDisplayCust) waDisplayCust.textContent = custName;
  if (textarea) textarea.value = localText;

  updateWhatsAppBubble(localText);
  updateNotifCharCounter(localText);
}

function openNotificationModal(trackingCode, defaultTemplate) {
  const modal = document.getElementById('notification-modal');
  if (!modal) return;

  if (trackingCode) notifState.currentTrackingCode = trackingCode;
  if (defaultTemplate) notifState.activeTemplate = defaultTemplate;

  // Pill butonlarını senkronize et
  const pillButtons = document.querySelectorAll('.template-pills-row .pill-btn');
  pillButtons.forEach(pill => {
    if (pill.getAttribute('data-template') === notifState.activeTemplate) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  modal.style.display = 'flex';
  loadNotificationPreview();
}

function initNotificationActions() {
  const btnOpenModal = document.getElementById('btn-open-notification-modal');
  const modal = document.getElementById('notification-modal');
  const btnClose = document.getElementById('btn-close-notif-modal');
  const btnCloseFooter = document.getElementById('btn-close-notif-footer');
  const btnChannelWa = document.getElementById('btn-channel-whatsapp');
  const btnChannelSms = document.getElementById('btn-channel-sms');
  const pillButtons = document.querySelectorAll('.template-pills-row .pill-btn');
  const textarea = document.getElementById('notif-message-textarea');
  const btnSendWa = document.getElementById('btn-send-whatsapp-now');
  const btnSendSms = document.getElementById('btn-send-sms-now');
  const btnCopy = document.getElementById('btn-copy-notif-text');
  const badgeChannel = document.getElementById('notif-badge-channel');
  const waPreviewBox = document.getElementById('whatsapp-preview-box');

  if (!modal) return;

  // 1. Modalı Aç
  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', () => {
      const code = state.activeOrder ? state.activeOrder.code : "SRV-2026-104";
      openNotificationModal(code, notifState.activeTemplate);
    });
  }

  // 2. Modalı Kapat
  if (btnClose) {
    btnClose.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  if (btnCloseFooter) {
    btnCloseFooter.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // 3. Kanal Seçimi (WhatsApp / SMS)
  function setChannel(channel) {
    notifState.activeChannel = channel;
    if (channel === 'WhatsApp') {
      if (btnChannelWa) btnChannelWa.classList.add('active');
      if (btnChannelSms) btnChannelSms.classList.remove('active');
      if (btnSendWa) btnSendWa.style.display = 'inline-flex';
      if (btnSendSms) btnSendSms.style.display = 'none';
      if (badgeChannel) {
        badgeChannel.textContent = '🟢 WhatsApp Bildirim Modu';
        badgeChannel.className = 'chip chip-success';
      }
      if (waPreviewBox) {
        waPreviewBox.style.opacity = '1';
        waPreviewBox.style.filter = 'none';
      }
    } else {
      if (btnChannelSms) btnChannelSms.classList.add('active');
      if (btnChannelWa) btnChannelWa.classList.remove('active');
      if (btnSendWa) btnSendWa.style.display = 'none';
      if (btnSendSms) btnSendSms.style.display = 'inline-flex';
      if (badgeChannel) {
        badgeChannel.textContent = '📱 Standart SMS Bildirim Modu';
        badgeChannel.className = 'chip chip-primary';
      }
      if (waPreviewBox) {
        waPreviewBox.style.opacity = '0.75';
      }
    }
    loadNotificationPreview();
  }

  if (btnChannelWa) {
    btnChannelWa.addEventListener('click', () => setChannel('WhatsApp'));
  }
  if (btnChannelSms) {
    btnChannelSms.addEventListener('click', () => setChannel('SMS'));
  }

  // 4. Şablon Değiştirme
  pillButtons.forEach(pill => {
    pill.addEventListener('click', () => {
      pillButtons.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      notifState.activeTemplate = pill.getAttribute('data-template');
      loadNotificationPreview();
    });
  });

  // 5. Canlı Metin Düzenleme & Dinamik Önizleme
  if (textarea) {
    textarea.addEventListener('input', () => {
      const currentText = textarea.value;
      updateWhatsAppBubble(currentText);
      updateNotifCharCounter(currentText);
    });
  }

  // 6. Metni Kopyala
  if (btnCopy && textarea) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(textarea.value).then(() => {
        showToast("📋 Bildirim metni panoya kopyalandı!");
      }).catch(() => {
        showToast("⚠️ Kopyalama izni verilmedi.");
      });
    });
  }

  // 7. WhatsApp ile Gönder (Tek Tıkla wa.me Linki & API Log Kaydı)
  if (btnSendWa && textarea) {
    btnSendWa.addEventListener('click', async () => {
      const currentText = textarea.value.trim();
      if (!currentText) {
        showToast("⚠️ Boş mesaj gönderilemez.");
        return;
      }

      const cleanPhone = cleanPhoneForWhatsApp(notifState.recipientPhone);
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(currentText)}`;

      // WhatsApp Web / Uygulamasını aç
      window.open(waUrl, '_blank');

      // Backend API'ye bildirim kaydı fırlat
      const code = notifState.currentTrackingCode || (state.activeOrder ? state.activeOrder.code : "SRV-2026-104");
      try {
        await fetch(`${API_BASE_URL}/api/notifications/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tracking_code: code,
            channel: "WhatsApp",
            template_type: notifState.activeTemplate,
            recipient_phone: notifState.recipientPhone,
            recipient_name: notifState.recipientName,
            message_text: currentText,
            status: "Gönderildi"
          })
        });
      } catch (e) {
        console.warn("ServisAI: Bildirim yerel olarak işaretlendi.");
      }

      modal.style.display = 'none';
      showToast(`🟢 WhatsApp yönlendirmesi açıldı ve #${code} bildirim günlüğü veri tabanına işlendi!`);
    });
  }

  // 8. SMS Gönder (Operatör Kuyruk Simülasyonu & API Log Kaydı)
  if (btnSendSms && textarea) {
    btnSendSms.addEventListener('click', async () => {
      const currentText = textarea.value.trim();
      if (!currentText) {
        showToast("⚠️ Boş SMS gönderilemez.");
        return;
      }

      const code = notifState.currentTrackingCode || (state.activeOrder ? state.activeOrder.code : "SRV-2026-104");
      try {
        await fetch(`${API_BASE_URL}/api/notifications/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tracking_code: code,
            channel: "SMS",
            template_type: notifState.activeTemplate,
            recipient_phone: notifState.recipientPhone,
            recipient_name: notifState.recipientName,
            message_text: currentText,
            status: "Gönderildi"
          })
        });
      } catch (e) {
        console.warn("ServisAI: SMS bildirimi yerel olarak kaydedildi.");
      }

      modal.style.display = 'none';
      showToast(`📱 SMS simülasyonu başarıyla operatör kuyruğuna iletildi (#${code} kayıt altına alındı)!`);
    });
  }
}

// ==================== 6. Gerçek Google Haritalar & Harita Teknisyen Seçici ====================
let leafletMapState = {
  map: null,
  vehicleMarker: null,
  targetMarker: null,
  routePolyline: null,
  traveledPolyline: null,
  activeLayer: 'road',
  layers: {
    road: null,
    sat: null,
    osm: null
  },
  currentRoute: null,
  currentPerson: null,
  isInitialized: false
};

// ==================== Türkiye Geneli Teknik Servis Merkezleri & Gerçek Sanayi Lokasyonları ====================
const TURKEY_HUBS = {
  istanbul_anadolu: {
    id: "istanbul_anadolu",
    name: "İstanbul (Anadolu / Kadıköy)",
    city: "İstanbul",
    region: "Marmara",
    coords: [40.9912, 29.0278],
    customer: "TermoTek Endüstriyel Elektronik",
    address: "Rıhtım Caddesi No:14, Kadıköy, İstanbul",
    note: "D-100 Karayolu → Kadıköy Rıhtım",
    airport: "Sabiha Gökçen Havalimanı (SAW)",
    airportCoords: [40.8986, 29.3092],
    yhtStation: "Söğütlüçeşme YHT Garı",
    yhtCoords: [40.9905, 29.0392]
  },
  istanbul_avrupa: {
    id: "istanbul_avrupa",
    name: "İstanbul (Avrupa / Levent & İkitelli)",
    city: "İstanbul",
    region: "Marmara",
    coords: [41.0450, 28.9850],
    customer: "Kanyon Veri Merkezi & Otomasyon",
    address: "Büyükdere Cad. No:185, Levent, İstanbul",
    note: "Büyükdere Caddesi → Levent Plazalar",
    airport: "İstanbul Havalimanı (IST)",
    airportCoords: [41.2753, 28.7519],
    yhtStation: "Halkalı YHT Garı",
    yhtCoords: [41.0189, 28.7672]
  },
  ankara: {
    id: "ankara",
    name: "Ankara (OSTİM OSB / TUSAŞ Havacılık)",
    city: "Ankara",
    region: "İç Anadolu",
    coords: [39.9980, 32.7450],
    customer: "TUSAŞ Havacılık & ASELSAN Güç Tesisleri",
    address: "Havacılık Bulvarı No:17, Kahramankazan / OSTİM OSB, Ankara",
    note: "Anadolu Otoyolu (O-4) → Ankara Çevre Yolu → OSTİM OSB",
    airport: "Ankara Esenboğa Havalimanı (ESB)",
    airportCoords: [40.1281, 32.9951],
    yhtStation: "Ankara YHT Garı",
    yhtCoords: [39.9360, 32.8443]
  },
  izmir: {
    id: "izmir",
    name: "İzmir (Aliağa Petkim / Kemalpaşa)",
    city: "İzmir",
    region: "Ege",
    coords: [38.5020, 27.0350],
    customer: "Petkim Petrokimya & Vestel City Manisa",
    address: "Petkim Tesisleri No:4, Aliağa / Kemalpaşa OSB, İzmir",
    note: "O-5 İstanbul-İzmir Otoyolu → Aliağa Çevre Yolu",
    airport: "İzmir Adnan Menderes Havalimanı (ADB)",
    airportCoords: [38.2924, 27.1570],
    yhtStation: "İzmir Basmane Garı",
    yhtCoords: [38.4237, 27.1428]
  },
  bursa: {
    id: "bursa",
    name: "Bursa (Demirtaş OSB / Tofaş)",
    city: "Bursa",
    region: "Marmara",
    coords: [40.2310, 29.0450],
    customer: "Tofaş Türk Otomobil Fabrikası & Bosch Rexroth",
    address: "Demirtaş Organize Sanayi Bölgesi 2. Cd. No:8, Bursa",
    note: "Osmangazi Köprüsü → O-5 Otoyolu → DOSAB Çıkışı",
    airport: "Bursa Yenişehir Havalimanı (YEI)",
    airportCoords: [40.2553, 29.5625],
    yhtStation: "Bursa Garı (YHT Bağlantılı)",
    yhtCoords: [40.2010, 29.0710]
  },
  kocaeli: {
    id: "kocaeli",
    name: "Kocaeli (Gebze Bilişim Vadisi / TOSB)",
    city: "Kocaeli",
    region: "Marmara",
    coords: [40.8028, 29.4307],
    customer: "Bilişim Vadisi & TOSB Otomotiv Yan Sanayi",
    address: "Muallimköy Mah. Deniz Cd. No:143, Gebze, Kocaeli",
    note: "TEM Otoyolu → Gebze Organize Sanayi Çıkışı",
    airport: "Sabiha Gökçen Havalimanı (SAW)",
    airportCoords: [40.8986, 29.3092],
    yhtStation: "Gebze YHT İstasyonu",
    yhtCoords: [40.7936, 29.4328]
  },
  konya: {
    id: "konya",
    name: "Konya (1. OSB / Torku Tesisleri)",
    city: "Konya",
    region: "İç Anadolu",
    coords: [37.9540, 32.5520],
    customer: "Torku Endüstriyel Şeker & Konya Motor Sanayi",
    address: "Konya Organize Sanayi Bölgesi Yaylacık Cd. No:19, Selçuklu, Konya",
    note: "D-715 Karayolu → Konya 1. OSB Sanayi Girişi",
    airport: "Konya Havalimanı (KYA)",
    airportCoords: [37.9790, 32.5619],
    yhtStation: "Konya YHT Garı",
    yhtCoords: [37.8686, 32.4844]
  },
  adana: {
    id: "adana",
    name: "Adana (Hacı Sabancı OSB / SASA)",
    city: "Adana",
    region: "Akdeniz",
    coords: [36.9850, 35.4500],
    customer: "SASA Polyester & Hacı Sabancı OSB Fabrikası",
    address: "Ceyhan Yolu Üzeri 20. km, Sarıçam / Hacı Sabancı OSB, Adana",
    note: "TAG Otoyolu → Ceyhan / OSB Çıkışı",
    airport: "Çukurova Uluslararası Havalimanı (COV)",
    airportCoords: [36.8983, 35.0683],
    yhtStation: "Adana Tren Garı",
    yhtCoords: [36.9989, 35.3211]
  },
  antalya: {
    id: "antalya",
    name: "Antalya (Antalya OSB / Serbest Bölge)",
    city: "Antalya",
    region: "Akdeniz",
    coords: [36.9880, 30.6120],
    customer: "CW Enerji Güneş Paneli & Serbest Bölge Tesisleri",
    address: "Antalya Organize Sanayi Bölgesi 1. Kısım No:22, Döşemealtı, Antalya",
    note: "D-650 Burdur-Antalya Yolu → Antalya OSB Girişi",
    airport: "Antalya Uluslararası Havalimanı (AYT)",
    airportCoords: [36.8987, 30.8005],
    yhtStation: "Antalya Otogarı / Transfer Merkezi",
    yhtCoords: [36.9200, 30.6700]
  },
  gaziantep: {
    id: "gaziantep",
    name: "Gaziantep (4. OSB / Sanko Tesisleri)",
    city: "Gaziantep",
    region: "Güneydoğu",
    coords: [37.1250, 37.4200],
    customer: "Sanko Holding Dokuma & Gaziantep İplik Kart Fabrikası",
    address: "Başpınar Organize Sanayi Bölgesi 4. Kısım No:11, Şehitkamil, Gaziantep",
    note: "İpekyolu Karayolu → Başpınar 4. OSB Sanayi Köprüsü",
    airport: "Gaziantep Oğuzeli Havalimanı (GZT)",
    airportCoords: [36.9472, 37.4786],
    yhtStation: "Gaziantep Garı",
    yhtCoords: [37.0697, 37.3831]
  },
  eskisehir: {
    id: "eskisehir",
    name: "Eskişehir (TUSAŞ Motor TEI / TÜRASAŞ)",
    city: "Eskişehir",
    region: "İç Anadolu",
    coords: [39.7820, 30.5480],
    customer: "TEI TUSAŞ Motor Sanayii & Raylı Sistemler Ar-Ge",
    address: "Organize Sanayi Bölgesi 22. Cadde No:9, Odunpazarı, Eskişehir",
    note: "D-200 Ankara-Eskişehir Karayolu → Eskişehir OSB",
    airport: "Eskişehir Hasan Polatkan Havalimanı (AOE)",
    airportCoords: [39.8122, 30.5256],
    yhtStation: "Eskişehir YHT Garı",
    yhtCoords: [39.7767, 30.5186]
  },
  kayseri: {
    id: "kayseri",
    name: "Kayseri (Kayseri OSB / Erbosan)",
    city: "Kayseri",
    region: "İç Anadolu",
    coords: [38.7450, 35.3850],
    customer: "Erbosan Boru & HES Hacılar Elektrik Kablo",
    address: "Kayseri OSB 12. Cadde No:5, Melikgazi, Kayseri",
    note: "Kayseri-Ankara Karayolu → Kayseri OSB Ana Kavşağı",
    airport: "Kayseri Erkilet Havalimanı (ASR)",
    airportCoords: [38.7706, 35.4956],
    yhtStation: "Kayseri Tren Garı",
    yhtCoords: [38.7300, 35.4800]
  },
  samsun: {
    id: "samsun",
    name: "Samsun (Medikal Sanayi / Tekkeköy)",
    city: "Samsun",
    region: "Karadeniz",
    coords: [41.2400, 36.4350],
    customer: "Samsun Medikal Cihaz & Cerrahi Alet Üretim Üssü",
    address: "Tekkeköy Sanayi Sitesi 4. Blok No:18, Tekkeköy, Samsun",
    note: "Karadeniz Sahil Yolu → Tekkeköy Sanayi Kavşağı",
    airport: "Samsun Çarşamba Havalimanı (SZF)",
    airportCoords: [41.2581, 36.5486],
    yhtStation: "Samsun Garı",
    yhtCoords: [41.2910, 36.3380]
  },
  trabzon: {
    id: "trabzon",
    name: "Trabzon (Arsin OSB / Liman)",
    city: "Trabzon",
    region: "Karadeniz",
    coords: [40.9550, 39.9200],
    customer: "Arsin Organize Sanayi Soğutma & Otomasyon Fabrikası",
    address: "Arsin OSB 3. Cadde No:14, Arsin, Trabzon",
    note: "D-010 Karadeniz Sahil Yolu → Arsin OSB",
    airport: "Trabzon Uluslararası Havalimanı (TZX)",
    airportCoords: [40.9951, 39.7897],
    yhtStation: "Trabzon Otogarı / Karadeniz Transfer",
    yhtCoords: [41.0010, 39.7350]
  },
  diyarbakir: {
    id: "diyarbakir",
    name: "Diyarbakır (Diyarbakır OSB / Dicle)",
    city: "Diyarbakır",
    region: "Güneydoğu",
    coords: [37.9850, 40.1800],
    customer: "Dicle Elektrik Dağıtım Trafo & Pano Merkezi",
    address: "Diyarbakır OSB 1. Etap No:7, Yenişehir, Diyarbakır",
    note: "D-885 Karayolu → Diyarbakır OSB",
    airport: "Diyarbakır Havalimanı (DIY)",
    airportCoords: [37.8939, 40.2011],
    yhtStation: "Diyarbakır Tren Garı",
    yhtCoords: [37.9150, 40.2180]
  },
  mersin: {
    id: "mersin",
    name: "Mersin (Akdeniz Liman & Şişecam)",
    city: "Mersin",
    region: "Akdeniz",
    coords: [36.8150, 34.6400],
    customer: "Şişecam Düzcam Fabrikası & Mersin Liman Otomasyonu",
    address: "Akdeniz Liman Yolu No:8, Akdeniz, Mersin",
    note: "D-400 Karayolu → Mersin Liman Bağlantısı",
    airport: "Çukurova Havalimanı (COV)",
    airportCoords: [36.8983, 35.0683],
    yhtStation: "Mersin Tren Garı",
    yhtCoords: [36.8010, 34.6290]
  },
  denizli: {
    id: "denizli",
    name: "Denizli (Tekstil Otomasyonu / Honaz)",
    city: "Denizli",
    region: "Ege",
    coords: [37.7900, 29.2100],
    customer: "Menderes Tekstil & Zorlu Dokuma Kart Servis Merkezi",
    address: "Denizli OSB 2. Kısım No:16, Honaz, Denizli",
    note: "D-320 Karayolu → Denizli OSB",
    airport: "Denizli Çardak Havalimanı (DNZ)",
    airportCoords: [37.7856, 29.7014],
    yhtStation: "Denizli Tren Garı",
    yhtCoords: [37.7780, 29.0880]
  },
  tekirdag: {
    id: "tekirdag",
    name: "Tekirdağ (Çorlu / Çerkezköy OSB)",
    city: "Tekirdağ",
    region: "Trakya",
    coords: [41.2850, 27.9850],
    customer: "Çerkezköy Kimya & İlaç Otomasyon Tesisleri",
    address: "Çerkezköy OSB Gazi Osman Paşa Mah. 5. Cd., Tekirdağ",
    note: "TEM Otoyolu → Çorlu/Çerkezköy Gişeleri",
    airport: "Tekirdağ Çorlu Havalimanı (TEQ)",
    airportCoords: [41.1383, 27.9061],
    yhtStation: "Çerkezköy Hızlı Tren Garı",
    yhtCoords: [41.2910, 28.0010]
  },
  malatya: {
    id: "malatya",
    name: "Malatya (Malatya 2. OSB)",
    city: "Malatya",
    region: "Doğu Anadolu",
    coords: [38.3750, 38.2500],
    customer: "Malatya Entegre Soğuk Hava & İklimlendirme Tesisleri",
    address: "2. Organize Sanayi Bölgesi No:12, Yeşilyurt, Malatya",
    note: "D-300 Karayolu → Malatya 2. OSB",
    airport: "Malatya Erhaç Havalimanı (MLX)",
    airportCoords: [38.4353, 38.0908],
    yhtStation: "Malatya Garı",
    yhtCoords: [38.3580, 38.3120]
  },
  erzurum: {
    id: "erzurum",
    name: "Erzurum (1. OSB / Soğuk Zincir)",
    city: "Erzurum",
    region: "Doğu Anadolu",
    coords: [39.9350, 41.2200],
    customer: "Doğu Anadolu Endüstriyel Soğutma & Süt İşleme",
    address: "Erzurum 1. Organize Sanayi Bölgesi 4. Cd., Aziziye, Erzurum",
    note: "D-100 Karayolu → Erzurum 1. OSB",
    airport: "Erzurum Havalimanı (ERZ)",
    airportCoords: [39.9564, 41.1703],
    yhtStation: "Erzurum Tren Garı",
    yhtCoords: [39.9080, 41.2720]
  }
};

// ==================== Türkiye & İstanbul İlçe / Sanayi Bölgesi Gerçek Koordinat Veritabanı ====================
const TURKEY_GEO_POINTS = {
  // İstanbul Anadolu Yakası
  kadikoy: { name: "Kadıköy", city: "İstanbul", coords: [40.9912, 29.0278] },
  osmanaga: { name: "Osmanağa / Kadıköy Rıhtım", city: "İstanbul", coords: [40.9912, 29.0278] },
  sogutlucesme: { name: "Söğütlüçeşme", city: "İstanbul", coords: [40.9905, 29.0392] },
  uskudar: { name: "Üsküdar", city: "İstanbul", coords: [41.0255, 29.0160] },
  umraniye: { name: "Ümraniye / Dudullu", city: "İstanbul", coords: [41.0165, 29.1345] },
  dudullu: { name: "Dudullu OSB", city: "İstanbul", coords: [41.0165, 29.1345] },
  imes: { name: "İMES Sanayi Sitesi", city: "İstanbul", coords: [41.0080, 29.1450] },
  des: { name: "DES Sanayi Sitesi", city: "İstanbul", coords: [41.0095, 29.1550] },
  kadosan: { name: "KADOSAN Oto Sanayi", city: "İstanbul", coords: [41.0080, 29.1720] },
  modoko: { name: "MODOKO Mobilyacılar", city: "İstanbul", coords: [41.0000, 29.1480] },
  keyap: { name: "KEYAP Ticaret Merkezi", city: "İstanbul", coords: [41.0040, 29.1520] },
  atasehir: { name: "Ataşehir", city: "İstanbul", coords: [40.9839, 29.1177] },
  maltepe: { name: "Maltepe", city: "İstanbul", coords: [40.9333, 29.1333] },
  kartal: { name: "Kartal", city: "İstanbul", coords: [40.8906, 29.1866] },
  pendik: { name: "Pendik", city: "İstanbul", coords: [40.8785, 29.2325] },
  kurtkoy: { name: "Kurtköy", city: "İstanbul", coords: [40.9100, 29.2950] },
  tuzla: { name: "Tuzla OSB / Tersaneler", city: "İstanbul", coords: [40.8166, 29.3000] },
  birlik: { name: "Birlik Organize Sanayi (BOSB)", city: "İstanbul", coords: [40.8750, 29.3800] },
  cekmekoy: { name: "Çekmeköy", city: "İstanbul", coords: [41.0350, 29.1800] },
  tasdelen: { name: "Taşdelen", city: "İstanbul", coords: [41.0310, 29.2150] },
  sancaktepe: { name: "Sancaktepe", city: "İstanbul", coords: [41.0000, 29.2300] },
  sarigazi: { name: "Sarıgazi", city: "İstanbul", coords: [41.0150, 29.2100] },
  samandira: { name: "Samandıra", city: "İstanbul", coords: [40.9850, 29.2450] },
  sultanbeyli: { name: "Sultanbeyli", city: "İstanbul", coords: [40.9667, 29.2667] },
  beykoz: { name: "Beykoz", city: "İstanbul", coords: [41.1333, 29.1000] },
  kavacik: { name: "Kavacık", city: "İstanbul", coords: [41.0920, 29.0940] },
  sile: { name: "Şile", city: "İstanbul", coords: [41.1764, 29.6133] },
  adalar: { name: "Adalar", city: "İstanbul", coords: [40.8750, 29.1250] },

  // İstanbul Avrupa Yakası & Sanayi Siteleri
  levent: { name: "Levent", city: "İstanbul", coords: [41.0800, 29.0120] },
  balmumcu: { name: "Balmumcu", city: "İstanbul", coords: [41.0580, 29.0100] },
  barbaros: { name: "Barbaros Bulvarı", city: "İstanbul", coords: [41.0520, 29.0080] },
  zincirlikuyu: { name: "Zincirlikuyu", city: "İstanbul", coords: [41.0680, 29.0140] },
  gayrettepe: { name: "Gayrettepe", city: "İstanbul", coords: [41.0660, 29.0080] },
  yildiz: { name: "Yıldız", city: "İstanbul", coords: [41.0500, 29.0120] },
  ortakoy: { name: "Ortaköy", city: "İstanbul", coords: [41.0480, 29.0260] },
  bebek: { name: "Bebek", city: "İstanbul", coords: [41.0770, 29.0430] },
  etiler: { name: "Etiler", city: "İstanbul", coords: [41.0830, 29.0300] },
  nisantasi: { name: "Nişantaşı", city: "İstanbul", coords: [41.0520, 28.9910] },
  fulya: { name: "Fulya", city: "İstanbul", coords: [41.0580, 28.9990] },
  besiktas: { name: "Beşiktaş", city: "İstanbul", coords: [41.0428, 29.0077] },
  sisli: { name: "Şişli", city: "İstanbul", coords: [41.0600, 28.9870] },
  mecidiyekoy: { name: "Mecidiyeköy", city: "İstanbul", coords: [41.0660, 28.9930] },
  maslak: { name: "Maslak", city: "İstanbul", coords: [41.1090, 29.0220] },
  sariyer: { name: "Sarıyer", city: "İstanbul", coords: [41.1667, 29.0500] },
  ayazaga: { name: "Ayazağa", city: "İstanbul", coords: [41.1150, 28.9950] },
  kagithane: { name: "Kağıthane", city: "İstanbul", coords: [41.0810, 28.9740] },
  caglayan: { name: "Çağlayan", city: "İstanbul", coords: [41.0720, 28.9740] },
  kemerburgaz: { name: "Kemerburgaz", city: "İstanbul", coords: [41.1500, 28.9150] },
  seyrantepe: { name: "Seyrantepe", city: "İstanbul", coords: [41.0950, 28.9950] },
  beyoglu: { name: "Beyoğlu / Taksim", city: "İstanbul", coords: [41.0370, 28.9770] },
  taksim: { name: "Taksim", city: "İstanbul", coords: [41.0370, 28.9850] },
  karakoy: { name: "Karaköy", city: "İstanbul", coords: [41.0230, 28.9770] },
  eyup: { name: "Eyüpsultan", city: "İstanbul", coords: [41.0480, 28.9340] },
  alibeykoy: { name: "Alibeyköy", city: "İstanbul", coords: [41.0680, 28.9450] },
  fatih: { name: "Fatih / Aksaray", city: "İstanbul", coords: [41.0180, 28.9480] },
  aksaray: { name: "Aksaray", city: "İstanbul", coords: [41.0090, 28.9510] },
  topkapi: { name: "Topkapı", city: "İstanbul", coords: [41.0200, 28.9220] },
  zeytinburnu: { name: "Zeytinburnu", city: "İstanbul", coords: [40.9920, 28.9030] },
  bakirkoy: { name: "Bakırköy", city: "İstanbul", coords: [40.9780, 28.8720] },
  yesilkoy: { name: "Yeşilköy", city: "İstanbul", coords: [40.9630, 28.8250] },
  atakoy: { name: "Ataköy", city: "İstanbul", coords: [40.9850, 28.8650] },
  florya: { name: "Florya", city: "İstanbul", coords: [40.9720, 28.7880] },
  bahcelievler: { name: "Bahçelievler", city: "İstanbul", coords: [41.0000, 28.8550] },
  yenibosna: { name: "Yenibosna", city: "İstanbul", coords: [40.9950, 28.8280] },
  sirinevler: { name: "Şirinevler", city: "İstanbul", coords: [40.9970, 28.8450] },
  gungoren: { name: "Güngören", city: "İstanbul", coords: [41.0190, 28.8820] },
  merter: { name: "Merter", city: "İstanbul", coords: [41.0120, 28.8880] },
  bagcilar: { name: "Bağcılar", city: "İstanbul", coords: [41.0340, 28.8570] },
  istoc: { name: "İSTOÇ Ticaret Merkezi", city: "İstanbul", coords: [41.0620, 28.8250] },
  gunesli: { name: "Güneşli", city: "İstanbul", coords: [41.0280, 28.8250] },
  kucukcekmece: { name: "Küçükçekmece", city: "İstanbul", coords: [41.0000, 28.7750] },
  sefakoy: { name: "Sefaköy Sanayi Sitesi", city: "İstanbul", coords: [40.9950, 28.7880] },
  halkali: { name: "Halkalı", city: "İstanbul", coords: [41.0300, 28.7900] },
  basaksehir: { name: "Başakşehir", city: "İstanbul", coords: [41.0820, 28.8040] },
  ikitelli: { name: "İkitelli OSB", city: "İstanbul", coords: [41.0740, 28.7980] },
  hes: { name: "HES Tıbbi Cihazlar", city: "İstanbul", coords: [41.0740, 28.7980] },
  triko: { name: "İkitelli Triko Center", city: "İstanbul", coords: [41.0710, 28.7960] },
  demirciler: { name: "Demirciler Sanayi Sitesi", city: "İstanbul", coords: [41.0730, 28.7880] },
  mutsan: { name: "Mutsan Sanayi Sitesi", city: "İstanbul", coords: [41.0750, 28.7910] },
  aykosan: { name: "Aykosan Sanayi Sitesi", city: "İstanbul", coords: [41.0710, 28.7850] },
  tormak: { name: "Tormak Sanayi Sitesi", city: "İstanbul", coords: [41.0780, 28.7950] },
  avcilar: { name: "Avcılar", city: "İstanbul", coords: [40.9800, 28.7200] },
  ambarlı: { name: "Ambarlı Limanı", city: "İstanbul", coords: [40.9700, 28.6950] },
  ambarli: { name: "Ambarlı", city: "İstanbul", coords: [40.9700, 28.6950] },
  beylikduzu: { name: "Beylikdüzü OSB", city: "İstanbul", coords: [41.0010, 28.6430] },
  mermerciler: { name: "Mermerciler Sanayi Sitesi", city: "İstanbul", coords: [40.9850, 28.6650] },
  bakircilar: { name: "Bakırcılar Sanayi Sitesi", city: "İstanbul", coords: [40.9880, 28.6600] },
  haramidere: { name: "Haramidere", city: "İstanbul", coords: [41.0060, 28.6820] },
  esenyurt: { name: "Esenyurt", city: "İstanbul", coords: [41.0340, 28.6800] },
  kirac: { name: "Kıraç Sanayi", city: "İstanbul", coords: [41.0550, 28.6550] },
  evren: { name: "Evren Oto Sanayi", city: "İstanbul", coords: [41.0450, 28.6750] },
  isisan: { name: "Isısan Sanayi Sitesi", city: "İstanbul", coords: [41.0770, 28.6470] },
  hosdere: { name: "Hoşdere / Isısan", city: "İstanbul", coords: [41.0750, 28.6500] },
  hadimkoy: { name: "Hadımköy Sanayi", city: "İstanbul", coords: [41.1550, 28.6250] },
  buyukcekmece: { name: "Büyükçekmece", city: "İstanbul", coords: [41.0210, 28.5830] },
  silivri: { name: "Silivri", city: "İstanbul", coords: [41.0740, 28.2480] },
  catalca: { name: "Çatalca", city: "İstanbul", coords: [41.1440, 28.4610] },
  arnavutkoy: { name: "Arnavutköy", city: "İstanbul", coords: [41.1850, 28.7400] },
  sultangazi: { name: "Sultangazi", city: "İstanbul", coords: [41.1050, 28.8680] },
  gaziosmanpasa: { name: "Gaziosmanpaşa", city: "İstanbul", coords: [41.0600, 28.9100] },
  bayrampasa: { name: "Bayrampaşa", city: "İstanbul", coords: [41.0450, 28.9020] },
  esenler: { name: "Esenler / Tekstilkent", city: "İstanbul", coords: [41.0400, 28.8700] },
  giyimkent: { name: "Giyimkent", city: "İstanbul", coords: [41.0650, 28.8650] },
  tekstilkent: { name: "Tekstilkent", city: "İstanbul", coords: [41.0660, 28.8680] },

  // Kocaeli & Çevre Sanayi
  gebze: { name: "Gebze / GOSB", city: "Kocaeli", coords: [40.8028, 29.4307] },
  tosb: { name: "TOSB Otomotiv OSB", city: "Kocaeli", coords: [40.8350, 29.4200] },
  cayirova: { name: "Çayırova", city: "Kocaeli", coords: [40.8150, 29.3750] },
  dilovasi: { name: "Dilovası İMES", city: "Kocaeli", coords: [40.7850, 29.5400] },
  izmit: { name: "İzmit", city: "Kocaeli", coords: [40.7654, 29.9408] },
  kocaeli: { name: "Kocaeli", city: "Kocaeli", coords: [40.7654, 29.9408] },

  // Ankara
  ostim: { name: "OSTİM OSB", city: "Ankara", coords: [39.9980, 32.7450] },
  ivedik: { name: "İvedik OSB", city: "Ankara", coords: [40.0050, 32.7600] },
  sincan: { name: "Sincan OSB", city: "Ankara", coords: [39.9700, 32.5500] },
  cankaya: { name: "Çankaya", city: "Ankara", coords: [39.9208, 32.8541] },
  kizilay: { name: "Kızılay", city: "Ankara", coords: [39.9208, 32.8541] },
  yenimahalle: { name: "Yenimahalle", city: "Ankara", coords: [39.9700, 32.8000] },
  kazan: { name: "Kahramankazan / TUSAŞ", city: "Ankara", coords: [40.1800, 32.6800] },
  ankara: { name: "Ankara", city: "Ankara", coords: [39.9334, 32.8597] },

  // İzmir
  aliaga: { name: "Aliağa Petkim", city: "İzmir", coords: [38.7980, 26.9720] },
  kemalpasa: { name: "Kemalpaşa OSB", city: "İzmir", coords: [38.4260, 27.4170] },
  cigli: { name: "Çiğli AOSB", city: "İzmir", coords: [38.5020, 27.0350] },
  bornova: { name: "Bornova", city: "İzmir", coords: [38.4650, 27.2180] },
  konak: { name: "Konak", city: "İzmir", coords: [38.4237, 27.1428] },
  karsiyaka: { name: "Karşıyaka", city: "İzmir", coords: [38.4550, 27.1120] },
  torbali: { name: "Torbalı", city: "İzmir", coords: [38.1500, 27.3600] },
  izmir: { name: "İzmir", city: "İzmir", coords: [38.4237, 27.1428] },

  // Bursa
  dosab: { name: "Demirtaş DOSAB", city: "Bursa", coords: [40.2310, 29.0450] },
  nosab: { name: "Nilüfer NOSAB", city: "Bursa", coords: [40.2100, 28.9200] },
  nilufer: { name: "Nilüfer", city: "Bursa", coords: [40.2100, 28.9500] },
  osmangazi: { name: "Osmangazi", city: "Bursa", coords: [40.2000, 29.0600] },
  bursa: { name: "Bursa", city: "Bursa", coords: [40.1885, 29.0610] },

  // Diğer Büyükşehirler & Sanayi Merkezleri
  antalya: { name: "Antalya OSB", city: "Antalya", coords: [36.9880, 30.6120] },
  adana: { name: "Adana Hacı Sabancı OSB", city: "Adana", coords: [36.9850, 35.4500] },
  mersin: { name: "Mersin Liman", city: "Mersin", coords: [36.8150, 34.6400] },
  konya: { name: "Konya 1. OSB", city: "Konya", coords: [37.9540, 32.5520] },
  gaziantep: { name: "Gaziantep 4. OSB", city: "Gaziantep", coords: [37.1250, 37.4200] },
  kayseri: { name: "Kayseri OSB", city: "Kayseri", coords: [38.7450, 35.3850] },
  eskisehir: { name: "Eskişehir OSB / TEI", city: "Eskişehir", coords: [39.7820, 30.5480] },
  samsun: { name: "Samsun Medikal OSB", city: "Samsun", coords: [41.2400, 36.4350] },
  trabzon: { name: "Trabzon Arsin OSB", city: "Trabzon", coords: [40.9550, 39.9200] },
  diyarbakir: { name: "Diyarbakır OSB", city: "Diyarbakır", coords: [37.9850, 40.1800] },
  denizli: { name: "Denizli OSB", city: "Denizli", coords: [37.7900, 29.2100] },
  corlu: { name: "Çorlu OSB", city: "Tekirdağ", coords: [41.1550, 27.8000] },
  cerkezkoy: { name: "Çerkezköy OSB", city: "Tekirdağ", coords: [41.2850, 27.9850] },
  tekirdag: { name: "Tekirdağ", city: "Tekirdağ", coords: [40.9780, 27.5110] },
  manisa: { name: "Manisa OSB", city: "Manisa", coords: [38.6191, 27.4289] },
  balikesir: { name: "Balıkesir / Bandırma", city: "Balıkesir", coords: [39.6484, 27.8826] },
  sakarya: { name: "Sakarya 1. OSB", city: "Sakarya", coords: [40.7569, 30.3783] },
  malatya: { name: "Malatya 2. OSB", city: "Malatya", coords: [38.3552, 38.3095] },
  erzurum: { name: "Erzurum 1. OSB", city: "Erzurum", coords: [39.9043, 41.2678] },
  canakkale: { name: "Çanakkale", city: "Çanakkale", coords: [40.1553, 26.4142] },
  aydin: { name: "Aydın", city: "Aydın", coords: [37.8560, 27.8416] },
  mugla: { name: "Muğla", city: "Muğla", coords: [37.2153, 28.3636] },
  sivas: { name: "Sivas", city: "Sivas", coords: [39.7477, 37.0179] }
};

// Gerçek Türkçe Adres Metnini Coğrafi Koordinata Çözen Akıllı Geocoder
function geocodeTurkishAddress(addressText, fallbackCoords = null, defaultCity = "İstanbul") {
  if (!addressText || typeof addressText !== 'string' || addressText.trim() === '') {
    return {
      coords: fallbackCoords || [41.0450, 28.9850],
      city: defaultCity,
      district: "Merkez",
      cleanName: defaultCity
    };
  }

  const clean = addressText
    .replace(/^Saha Seyri\s*➔\s*/i, '')
    .replace(/^📍\s*/i, '')
    .replace(/\s*\(Merkeze bağlı\)/i, '')
    .trim();

  // Türkçe karakter normalizasyonu (küçük harf, noktalama ve aksan toleransı)
  const normalized = clean.toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');

  // Akıllı Adres Puanlama:
  // 1. Cadde / sokak / bulvar isimleri (örn: "Kemerburgaz Cad.", "Bağdat Caddesi", "Ankara Cad.")
  //    sokak göstergesidir; asıl ilçe/lokasyon eşleşmelerine (örn: Kağıthane, Balmumcu) öncelik verilir.
  // 2. Türk adres yapısında [Cadde/Sokak] [No] [İlçe] [İl] sırası takip edildiğinden, metnin sonuna
  //    (ilçe/şehir kısmına) yakın olan eşleşmelere daha yüksek ağırlık verilir.
  let matchedKey = null;
  let bestScore = -1;

  for (const key in TURKEY_GEO_POINTS) {
    if (normalized.includes(key)) {
      const isStreet = new RegExp('\\b' + key + '\\s+(?:cad|cd|caddesi|sok|sk|sokak|bulvar|blv|bulvari|yolu|asf|asfalti)\\b', 'i').test(normalized);
      const score = (isStreet ? 0 : 1000) + (key.length * 10) + normalized.lastIndexOf(key);
      if (score > bestScore) {
        bestScore = score;
        matchedKey = key;
      }
    }
  }

  let basePoint = matchedKey ? TURKEY_GEO_POINTS[matchedKey] : null;

  if (!basePoint) {
    // Şehir bazlı TURKEY_HUBS kontrolü yap (İstanbul genel kelimesini atlayarak Kadıköy defaultuna düşmeyi önle)
    for (const key in TURKEY_HUBS) {
      const h = TURKEY_HUBS[key];
      const hNorm = h.city.toLowerCase()
        .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
        .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
      if (hNorm !== 'istanbul' && normalized.includes(hNorm)) {
        basePoint = { name: h.name, city: h.city, coords: h.coords };
        break;
      }
    }
  }

  if (!basePoint) {
    // İstanbul içi bölgesel akıllı tahmin: Avrupa mı Anadolu mu?
    const isAnadolu = normalized.includes('kadikoy') || normalized.includes('atasehir') || 
                      normalized.includes('umraniye') || normalized.includes('kartal') || 
                      normalized.includes('pendik') || normalized.includes('maltepe') || 
                      normalized.includes('tuzla') || normalized.includes('anadolu');

    const defaultCoords = fallbackCoords || (isAnadolu ? [40.9912, 29.0278] : [41.0450, 28.9850]);
    const defaultDistrict = isAnadolu ? "Kadıköy / Anadolu Yakası" : "Avrupa Yakası Sanayi Havzası";

    basePoint = { name: defaultDistrict, city: "İstanbul", coords: defaultCoords };
  }

  // Aynı ilçedeki farklı binaların üst üste binmemesi için adres metninden deterministik mikro-offset
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = ((hash << 5) - hash) + clean.charCodeAt(i);
    hash |= 0;
  }
  const microLat = (((Math.abs(hash) % 100) - 50) / 100) * 0.005;
  const microLng = ((((Math.abs(hash >> 3)) % 100) - 50) / 100) * 0.006;

  const lat = parseFloat((basePoint.coords[0] + microLat).toFixed(5));
  const lng = parseFloat((basePoint.coords[1] + microLng).toFixed(5));

  return {
    coords: [lat, lng],
    city: basePoint.city,
    district: basePoint.name,
    cleanName: basePoint.name
  };
}

// Haversine formülü ile iki koordinat arası gerçek kuş uçuşu mesafeyi (km) hesaplar
function getHaversineDistanceKm(coords1, coords2) {
  if (!coords1 || !coords2) return 15;
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // Dünya yarıçapı km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.max(1, Math.round(R * c));
}

// Ulaşım ve Seyahat Modunu Belirleyici (Uçak, Hızlı Tren, Şehirler Arası Otobüs, Servis Aracı, Motosiklet)
function resolveTravelMode(person, startGeo, destGeo, distanceKm) {
  const plate = (person && person.vehiclePlate ? person.vehiclePlate.toLowerCase() : '');
  const loc = (person && (person.location || person.baseAddress) ? (person.location || person.baseAddress).toLowerCase() : '');
  const startCity = startGeo ? startGeo.city : 'İstanbul';
  const destCity = destGeo ? destGeo.city : 'İstanbul';
  const startDistrict = startGeo ? (startGeo.district || startCity) : startCity;
  const destDistrict = destGeo ? (destGeo.district || destCity) : destCity;
  const isIntercity = startCity.toLowerCase() !== destCity.toLowerCase() || distanceKm > 75;

  // 1. Scooter / Motosiklet Kurye (Şehir içi)
  if (!isIntercity && (plate.includes('scooter') || plate.includes('motor') || plate.includes('kurye') || plate.includes('motosiklet'))) {
    return {
      type: 'scooter',
      icon: '🛵',
      title: 'Motosiklet & Hızlı Kurye',
      detail: `${startCity} İçi Ekspres İntikal (${startDistrict} ➔ ${destDistrict})`,
      speed: 55,
      etaMinutes: Math.max(5, Math.ceil(distanceKm * 1.5)),
      cssClass: 'mode-scooter',
      colorClass: 'highlight-emerald'
    };
  }

  // 2. Uçak (Hava Yolu Seyahati)
  const isExplicitFlight = plate.includes('thy') || plate.includes('pegasus') || plate.includes('tk') || loc.includes('uçak') || plate.includes('uçuş') || plate.includes('hava');
  const isLongFlightDistance = isIntercity && distanceKm >= 360 && !(
    (startCity === 'İstanbul' && destCity === 'Ankara') || 
    (startCity === 'Ankara' && destCity === 'İstanbul') ||
    (startCity === 'İstanbul' && destCity === 'Eskişehir') ||
    (startCity === 'Ankara' && destCity === 'Konya')
  );

  if (isExplicitFlight || isLongFlightDistance) {
    const flightNo = plate.toUpperCase().includes('TK') ? plate.toUpperCase() : `THY-TK${Math.floor(2100 + ((person ? person.id : 1) * 19) % 700)}`;
    return {
      type: 'flight',
      icon: '✈️',
      title: `Uçak Seyahati (${flightNo})`,
      detail: `${startCity} (${startDistrict}) ➔ ${destCity} (${destDistrict}) Uçuş Koridoru`,
      speed: Math.floor(790 + ((person ? person.id : 1) % 5) * 12),
      etaMinutes: Math.max(35, Math.ceil(distanceKm / 12.5)),
      cssClass: 'mode-flight',
      colorClass: 'highlight-cyan'
    };
  }

  // 3. Yüksek Hızlı Tren (TCDD YHT)
  const yhtCities = ['İstanbul', 'Kocaeli', 'Eskişehir', 'Ankara', 'Konya', 'Bilecik', 'Sakarya'];
  const isYhtRoute = isIntercity && yhtCities.includes(startCity) && yhtCities.includes(destCity);
  const isExplicitTrain = plate.includes('yht') || plate.includes('tcdd') || plate.includes('tren') || loc.includes('tren') || loc.includes('yht');

  if (isExplicitTrain || isYhtRoute) {
    const trainNo = plate.toUpperCase().includes('YHT') ? plate.toUpperCase() : `YHT-${Math.floor(9100 + ((person ? person.id : 1) * 13) % 80)}`;
    return {
      type: 'train',
      icon: '🚆',
      title: `TCDD Yüksek Hızlı Tren (${trainNo})`,
      detail: `${startCity} (${startDistrict}) ➔ ${destCity} (${destDistrict}) YHT Demiryolu`,
      speed: Math.floor(225 + ((person ? person.id : 1) % 4) * 8),
      etaMinutes: Math.max(25, Math.ceil(distanceKm / 3.4)),
      cssClass: 'mode-train',
      colorClass: 'highlight-purple'
    };
  }

  // 4. Şehirler Arası Otobüs / Toplu Taşıma
  const isExplicitBus = plate.includes('otobüs') || plate.includes('kamil koç') || plate.includes('pamukkale') || plate.includes('metro turizm') || loc.includes('otobüs');
  if (isExplicitBus || (isIntercity && (person && (person.vehiclePlate === 'Zimmetsiz' || !person.vehiclePlate)))) {
    return {
      type: 'bus',
      icon: '🚌',
      title: 'Şehirler Arası Otobüs Seyahati',
      detail: `${startCity} Otogarı ➔ ${destCity} Otogarı Karayolu Hattı`,
      speed: 90,
      etaMinutes: Math.max(45, Math.ceil(distanceKm / 1.45)),
      cssClass: 'mode-bus',
      colorClass: 'highlight-amber'
    };
  }

  // 5. Servis Aracı / Filo Aracı (Şehirler Arası Otoyol veya Şehir İçi)
  const speed = isIntercity ? 104 : 48;
  return {
    type: 'car',
    icon: (person && person.vehiclePlate) ? getVehicleIcon(person.vehiclePlate) : '🚗',
    title: isIntercity ? 'Servis Aracı (Şehirler Arası Otoyol)' : 'Servis Aracı (Şehir İçi İntikal)',
    detail: isIntercity ? `${startCity} (${startDistrict}) ➔ ${destCity} (${destDistrict}) Otoyol İntikali` : `${startCity} İçi Saha Seyri (${startDistrict} ➔ ${destDistrict})`,
    speed: speed,
    etaMinutes: Math.max(10, Math.ceil(isIntercity ? (distanceKm / 1.6) : (distanceKm * 2.1))),
    cssClass: 'mode-car',
    colorClass: 'highlight-cyan'
  };
}

// Ulaşım Moduna Göre Türkiye Haritası Waypoint Üreticisi
function generateTurkeyWaypoints(start, dest, mode = 'car', count = 20) {
  const points = [];
  const [lat1, lng1] = start;
  const [lat2, lng2] = dest;

  // Uçak: Yüksek irtifa kavisli büyük daire hava koridoru yayı
  if (mode === 'flight') {
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const arc = Math.sin(t * Math.PI) * 0.42;
      const lat = lat1 + (lat2 - lat1) * t + arc * 0.35;
      const lng = lng1 + (lng2 - lng1) * t - arc * 0.2;
      points.push([lat, lng]);
    }
    return points;
  }

  // YHT: Demiryolu güzergahı geçiş eğrileri
  if (mode === 'train') {
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const curve = Math.sin(t * Math.PI) * 0.18;
      const lat = lat1 + (lat2 - lat1) * t + curve * 0.22;
      const lng = lng1 + (lng2 - lng1) * t + curve * 0.15;
      points.push([lat, lng]);
    }
    return points;
  }

  // Karayolu / Servis Aracı / Otobüs: Doğal otoyol kıvrımları
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const curve = Math.sin(t * Math.PI) * 0.08;
    const microJitter = Math.sin(t * Math.PI * 4) * 0.012;
    const lat = lat1 + (lat2 - lat1) * t + curve * 0.3 + microJitter;
    const lng = lng1 + (lng2 - lng1) * t + curve * 0.25;
    points.push([lat, lng]);
  }
  return points;
}

// Personelin ve Atanan İşin Gerçek Adreslerine Göre Aktif Rota ve Telemetri Bilgisini Çözer
function getTechRoute(person) {
  if (!person) return null;

  // 1. Personele ait sistemdeki TÜM işleri topla (state.staffJobs ve state.workOrders birleşimi)
  const allPersonJobs = [];
  if (state.staffJobs && state.staffJobs[person.id] && Array.isArray(state.staffJobs[person.id])) {
    state.staffJobs[person.id].forEach(j => allPersonJobs.push(j));
  }
  if (state.workOrders && Array.isArray(state.workOrders)) {
    state.workOrders.forEach(o => {
      const matchId = o.assigned_user_id && String(o.assigned_user_id) === String(person.id);
      const matchName = o.assigned_tech && person.name && o.assigned_tech.toLowerCase().trim() === person.name.toLowerCase().trim();
      if (matchId || matchName) {
        const oCode = o.tracking_code || o.code;
        if (!allPersonJobs.some(j => (j.tracking_code || j.code) === oCode)) {
          allPersonJobs.push(o);
        }
      }
    });
  }

  // Açık olan en güncel iş emrini hedef olarak al
  let assignedOrder = allPersonJobs.find(j => j.status !== 'Tamamlandı');
  if (!assignedOrder && allPersonJobs.length > 0) {
    assignedOrder = allPersonJobs[0];
  }
  if (!assignedOrder && state.activeOrder && (
    (state.activeOrder.assigned_user_id && String(state.activeOrder.assigned_user_id) === String(person.id)) ||
    (state.activeOrder.assignedTech && person.name && state.activeOrder.assignedTech.toLowerCase().trim() === person.name.toLowerCase().trim()) ||
    (state.activeTechId && String(state.activeTechId) === String(person.id))
  )) {
    assignedOrder = state.activeOrder;
  }

  // 2. Hedef Müşteri ve Varış Adresini Tespit Et
  let targetCustomer = "Müşteri";
  let targetAddress = "";
  let activeCode = null;
  if (assignedOrder) {
    activeCode = assignedOrder.tracking_code || assignedOrder.code;
    targetCustomer = assignedOrder.customer_name || assignedOrder.customer || "Müşteri";
    targetAddress = assignedOrder.customer_address || assignedOrder.customerAddress || "";
  } else if (person.destinationAddress) {
    targetAddress = person.destinationAddress;
    targetCustomer = "Atanan Müşteri";
  }

  // 3. Teknisyenin Başlangıç Noktasını Akıllıca Tespit Et
  // KURAL: Eğer teknisyenin başka bir görevi varsa (örn: HES Tıbbi Cihazlar'daydı),
  // intikalinin başlangıcı o önceki müşteridir.
  // Başka bir müşteri görevi yoksa, personelin kendi kayıtlı adresinden (baseAddress) başlar.
  let startLocationText = "";
  let startCustomerName = "";

  // A) Öncelikle teknisyenin diğer / önceki iş emirlerini ara (HES Tıbbi Cihazlar vb.)
  if (allPersonJobs.length > 1) {
    const prevJob = allPersonJobs.find(j => 
      (j.tracking_code || j.code) !== activeCode &&
      (j.customer_name || j.customer) !== targetCustomer
    );
    if (prevJob) {
      startLocationText = prevJob.customer_address || prevJob.customerAddress || "";
      startCustomerName = prevJob.customer_name || prevJob.customer || "Önceki Müşteri Lokasyonu";
    }
  }

  // B) Eğer person.currentLocation veya person.currentCustomer varsa
  if (!startLocationText && person.currentLocation && person.currentCustomer && person.currentCustomer !== targetCustomer) {
    startLocationText = person.currentLocation;
    startCustomerName = person.currentCustomer;
  }

  // C) Eğer person.location aktif hedef iş dışında başka bir müşteri lokasyonu belirtiyorsa
  if (!startLocationText && person.location) {
    const locClean = person.location
      .replace(/^Saha Seyri\s*➔\s*/i, '')
      .replace(/^📍\s*/i, '')
      .replace(/\s*\(Merkeze bağlı\)/i, '')
      .trim();
    const isBaseAddr = (person.baseAddress && locClean.toLowerCase().includes(person.baseAddress.toLowerCase().slice(0, 15))) ||
                       (person.address && locClean.toLowerCase().includes(person.address.toLowerCase().slice(0, 15)));
    if (locClean && !isBaseAddr && !locClean.toLowerCase().includes('müsait') && !locClean.toLowerCase().includes('merkez')) {
      if (locClean.includes('(') && locClean.includes(')')) {
        const parts = locClean.split('(');
        startCustomerName = parts[0].trim();
        startLocationText = parts[1].replace(')', '').trim();
      } else {
        startLocationText = locClean;
        startCustomerName = "Önceki Müşteri Lokasyonu";
      }
    }
  }

  // D) Eğer hiçbir önceki müşteri/saha görevi yoksa personelin kendi ev / merkez adresinden başlat
  if (!startLocationText) {
    startLocationText = person.baseAddress || person.address || "İstanbul";
    startCustomerName = person.name ? `${person.name} (İkamet/Merkez)` : "Teknisyen Başlangıç Noktası";
  }

  const startGeo = geocodeTurkishAddress(startLocationText, [40.9800, 28.7200]);
  const destGeo = geocodeTurkishAddress(targetAddress || (startGeo.city + " Organize Sanayi Bölgesi"), [41.0550, 29.0050]);

  // 4. Mesafe, seyahat modu ve waypoint rotası hesapla
  let distanceKm = getHaversineDistanceKm(startGeo.coords, destGeo.coords);
  if (distanceKm < 2) distanceKm = 4; // minimum rota mesafesi

  const travelMode = resolveTravelMode(person, startGeo, destGeo, distanceKm);
  const waypoints = generateTurkeyWaypoints(startGeo.coords, destGeo.coords, travelMode.type, 24);

  const cleanStartAddress = startLocationText
    .replace(/^Saha Seyri\s*➔\s*/i, '')
    .replace(/^📍\s*/i, '')
    .replace(/\s*\(Merkeze bağlı\)/i, '')
    .trim();

  return {
    person: person,
    startCoords: startGeo.coords,
    destCoords: destGeo.coords,
    startCity: startGeo.city,
    targetCity: destGeo.city,
    startDistrict: startGeo.district,
    targetDistrict: destGeo.district,
    startCustomer: startCustomerName,
    startAddress: cleanStartAddress,
    targetCustomer: targetCustomer,
    targetAddress: targetAddress || `${destGeo.district}, ${destGeo.city}`,
    targetCoordsStr: `${destGeo.coords[0].toFixed(4)}° N, ${destGeo.coords[1].toFixed(4)}° E`,
    routeNote: `${travelMode.detail} (${distanceKm} km)`,
    distanceKm: distanceKm,
    etaMinutes: travelMode.etaMinutes,
    speed: travelMode.speed,
    travelMode: travelMode,
    waypoints: waypoints
  };
}

function initLeafletMap() {
  const container = document.getElementById('real-google-map');
  if (!container || typeof L === 'undefined') {
    console.warn("ServisAI: Leaflet harita kütüphanesi henüz yüklenmedi veya konteyner bulunamadı.");
    return;
  }

  if (leafletMapState.isInitialized && leafletMapState.map) {
    leafletMapState.map.invalidateSize();
    return;
  }

  try {
    // 1. Leaflet Haritasını Başlat (Tüm Türkiye Genel Görünümü)
    const map = L.map('real-google-map', {
      zoomControl: true,
      attributionControl: false
    }).setView([39.1, 35.2], 6);

    // 2. Google Harita Katmanları (Sokak / Cadde ve Hibrit Uydu)
    const googleRoadLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleSatLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    });

    // Varsayılan: Google Sokak Haritası
    googleRoadLayer.addTo(map);

    leafletMapState.map = map;
    leafletMapState.layers = {
      road: googleRoadLayer,
      sat: googleSatLayer,
      osm: osmLayer
    };
    leafletMapState.activeLayer = 'road';
    leafletMapState.isInitialized = true;

    // 3. Harita Katman Değiştirici Butonları
    const btnRoad = document.getElementById('btn-map-layer-road');
    const btnSat = document.getElementById('btn-map-layer-sat');
    const btnRadar = document.getElementById('btn-map-layer-radar');
    const btnFitTurkey = document.getElementById('btn-map-fit-turkey');
    const realMapEl = document.getElementById('real-google-map');
    const vectorMapEl = document.getElementById('vector-map');

    function setActiveToggle(btn) {
      document.querySelectorAll('.map-layer-toggles .map-toggle-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
    }

    if (btnRoad) {
      btnRoad.addEventListener('click', () => {
        setActiveToggle(btnRoad);
        if (realMapEl) realMapEl.style.display = 'block';
        if (vectorMapEl) vectorMapEl.style.display = 'none';
        if (map.hasLayer(googleSatLayer)) map.removeLayer(googleSatLayer);
        if (!map.hasLayer(googleRoadLayer)) googleRoadLayer.addTo(map);
        leafletMapState.activeLayer = 'road';
        setTimeout(() => map.invalidateSize(), 50);
        showToast("🗺️ Google Sokak & Cadde Haritası moduna geçildi.");
      });
    }

    if (btnSat) {
      btnSat.addEventListener('click', () => {
        setActiveToggle(btnSat);
        if (realMapEl) realMapEl.style.display = 'block';
        if (vectorMapEl) vectorMapEl.style.display = 'none';
        if (map.hasLayer(googleRoadLayer)) map.removeLayer(googleRoadLayer);
        if (!map.hasLayer(googleSatLayer)) googleSatLayer.addTo(map);
        leafletMapState.activeLayer = 'sat';
        setTimeout(() => map.invalidateSize(), 50);
        showToast("🛰️ Google Hibrit Uydu görünümüne geçildi.");
      });
    }

    if (btnRadar) {
      btnRadar.addEventListener('click', () => {
        setActiveToggle(btnRadar);
        if (realMapEl) realMapEl.style.display = 'none';
        if (vectorMapEl) vectorMapEl.style.display = 'block';
        leafletMapState.activeLayer = 'radar';
        showToast("📡 Siber Vektör Radar görünümüne geçildi.");
      });
    }

    if (btnFitTurkey) {
      btnFitTurkey.addEventListener('click', () => {
        if (realMapEl) realMapEl.style.display = 'block';
        if (vectorMapEl) vectorMapEl.style.display = 'none';
        map.fitBounds([
          [35.8, 25.8], // Türkiye Güneybatı
          [42.3, 44.8]  // Türkiye Kuzeydoğu
        ], { padding: [30, 30] });
        showToast("🇹🇷 Tüm Türkiye genel harita görünümüne odaklanıldı.");
      });
    }

    // Google Maps Buton Tıklama Dinleyicisi (Her tıklandığında aktif rotayı taze adreslerle yeniler)
    const btnOpenGmaps = document.getElementById('btn-open-google-maps-ext');
    if (btnOpenGmaps) {
      btnOpenGmaps.addEventListener('click', () => {
        const r = leafletMapState.currentRoute;
        if (r) {
          const gMode = r.travelMode && (r.travelMode.type === 'train' || r.travelMode.type === 'bus') ? 'transit' : 'driving';
          const startQ = r.startAddress 
            ? `${r.startCustomer && !r.startAddress.includes(r.startCustomer) ? r.startCustomer + ', ' : ''}${r.startAddress}`
            : `${r.startCoords[0]},${r.startCoords[1]}`;
          const destQ = r.targetAddress 
            ? `${r.targetCustomer && !r.targetAddress.includes(r.targetCustomer) ? r.targetCustomer + ', ' : ''}${r.targetAddress}`
            : `${r.destCoords[0]},${r.destCoords[1]}`;
          btnOpenGmaps.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(startQ)}&destination=${encodeURIComponent(destQ)}&travelmode=${gMode}`;
        }
      });
    }

    // İlk aktif teknisyeni haritaya yerleştir
    const initialTech = state.staff.find(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı') || state.staff[0];
    if (initialTech) {
      selectMapTech(initialTech.id);
    }
  } catch (err) {
    console.error("ServisAI: Leaflet Google Harita başlatılırken hata:", err);
  }
}

function selectMapTech(identifier) {
  let person = null;

  // Sayısal ID ile ara
  if (typeof identifier === 'number' || (!isNaN(parseInt(identifier)) && String(identifier).length < 6)) {
    const numId = parseInt(identifier);
    person = state.staff.find(s => s.id === numId);
  }

  // İsim veya plaka ile ara
  if (!person && typeof identifier === 'string') {
    person = state.staff.find(s => 
      s.name.toLowerCase().includes(identifier.toLowerCase()) || 
      (s.vehiclePlate && s.vehiclePlate.toLowerCase().includes(identifier.toLowerCase()))
    );
  }

  // Bulunamazsa ilk uygun personeli seç
  if (!person) {
    person = state.staff.find(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı') || state.staff[0];
  }

  if (!person) return;

  const route = getTechRoute(person);
  if (!route) return;

  leafletMapState.currentRoute = route;
  leafletMapState.currentPerson = person;

  // 1. Dropdown seçimini senkronize et
  const dropdown = document.getElementById('select-map-tech');
  if (dropdown && dropdown.value !== String(person.id)) {
    dropdown.value = String(person.id);
  }

  // 2. Dış bağlantı: Resmi Google Haritalar Canlı Navigasyon Linki (Tam İsim ve Adres Destekli)
  const gmapsLink = document.getElementById('btn-open-google-maps-ext');
  if (gmapsLink) {
    const gMode = route.travelMode.type === 'train' || route.travelMode.type === 'bus' ? 'transit' : 'driving';
    const startQ = route.startAddress 
      ? `${route.startCustomer && !route.startAddress.includes(route.startCustomer) ? route.startCustomer + ', ' : ''}${route.startAddress}`
      : `${route.startCoords[0]},${route.startCoords[1]}`;
    const destQ = route.targetAddress 
      ? `${route.targetCustomer && !route.targetAddress.includes(route.targetCustomer) ? route.targetCustomer + ', ' : ''}${route.targetAddress}`
      : `${route.destCoords[0]},${route.destCoords[1]}`;
    gmapsLink.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(startQ)}&destination=${encodeURIComponent(destQ)}&travelmode=${gMode}`;
  }

  // 3. Telemetri metinlerini güncelle
  const cityTag = document.getElementById('map-city-tag');
  if (cityTag) {
    cityTag.textContent = `${route.startCity} ➔ ${route.targetCity} • Canlı Trafik: ${route.speed >= 40 ? 'Akıcı' : 'Yoğun'}`;
  }

  const routeNote = document.getElementById('map-route-note');
  if (routeNote) routeNote.textContent = `Güzergah: ${route.routeNote}`;

  const routeCoords = document.getElementById('map-route-coords');
  if (routeCoords) routeCoords.textContent = `Hedef Koordinat: ${route.targetCoordsStr} (${route.targetCity})`;

  const distEl = document.getElementById('distance-display');
  if (distEl) distEl.textContent = `${route.distanceKm} km`;

  const etaEl = document.getElementById('eta-display');
  if (etaEl) etaEl.textContent = `${route.etaMinutes} Dakika`;

  const speedEl = document.getElementById('speed-display');
  if (speedEl) speedEl.textContent = `${route.speed} km/s`;

  // Ulaşım ve Seyahat Modu Göstergesi
  const travelIcon = document.getElementById('travel-mode-icon');
  const travelTitle = document.getElementById('travel-mode-title');
  const travelDetail = document.getElementById('travel-mode-detail');
  if (travelIcon) travelIcon.textContent = route.travelMode.icon;
  if (travelTitle) {
    travelTitle.textContent = route.travelMode.title;
    travelTitle.className = route.travelMode.colorClass || 'highlight-cyan';
  }
  if (travelDetail) travelDetail.textContent = route.travelMode.detail;

  // 4. Vektör Radar Markerını güncelle (Kullanıcı Radar moduna geçtiğinde)
  const vehicleTag = document.querySelector('#vehicle-marker .vehicle-tag');
  if (vehicleTag) {
    vehicleTag.innerHTML = `<strong>${route.travelMode.icon} ${person.vehiclePlate}</strong><span>${person.name}</span>`;
  }
  const vectorIcon = document.getElementById('vector-vehicle-icon');
  if (vectorIcon) {
    vectorIcon.textContent = route.travelMode.icon;
  }
  const targetBubble = document.querySelector('.pin-target .pin-bubble');
  if (targetBubble) {
    targetBubble.textContent = `🎯 Hedef: ${route.targetCustomer} (${route.targetCity})`;
  }

  // 5. Simülasyon durumunu güncelle
  if (gpsSimState) {
    gpsSimState.totalDistanceKm = route.distanceKm;
    gpsSimState.progress = 0.25;
  }

  // 6. Gerçek Leaflet Google Harita Katmanını Güncelle
  if (leafletMapState.map && typeof L !== 'undefined') {
    const map = leafletMapState.map;

    // Haritayı Türkiye genelinde veya şehirler arası rotanın tamamını kapsayacak şekilde fitBounds ile odakla
    try {
      if (route.waypoints && route.waypoints.length > 0) {
        const bounds = L.latLngBounds(route.waypoints);
        if (route.distanceKm > 50) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, duration: 1.0 });
        } else {
          map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15, duration: 1.0 });
        }
      } else {
        map.setView(route.startCoords, route.distanceKm > 100 ? 7 : 13);
      }
    } catch (zoomErr) {
      console.warn("Harita odaklama hatası:", zoomErr);
    }

    // Özel HTML Araç / Seyahat İşaretçisi
    const vehIconHtml = `
      <div class="leaflet-veh-marker ${route.travelMode.cssClass}">
        <div class="leaflet-veh-pin">
          <span>${route.travelMode.icon}</span>
          <span class="leaflet-veh-pulse"></span>
        </div>
        <div class="leaflet-veh-label">
          <strong>${route.travelMode.icon} ${person.vehiclePlate || 'Zimmetsiz'}</strong>
          <span>${person.name}</span>
        </div>
      </div>
    `;
    const vehDivIcon = L.divIcon({
      html: vehIconHtml,
      className: '',
      iconSize: [40, 65],
      iconAnchor: [20, 20]
    });

    if (leafletMapState.vehicleMarker) {
      leafletMapState.vehicleMarker.setLatLng(route.startCoords);
      leafletMapState.vehicleMarker.setIcon(vehDivIcon);
    } else {
      leafletMapState.vehicleMarker = L.marker(route.startCoords, { icon: vehDivIcon, zIndexOffset: 1000 }).addTo(map);
    }

    leafletMapState.vehicleMarker.bindPopup(`
      <h4>${route.travelMode.icon} ${person.name} • ${person.vehiclePlate}</h4>
      <p>
        <strong>Başlangıç Konumu:</strong> ${route.startCustomer ? `<em>${route.startCustomer}</em> — ` : ''}${route.startAddress}<br>
        <strong>Hedef Müşteri:</strong> ${route.targetCustomer} (${route.targetCity})<br>
        <strong>Varış Adresi:</strong> ${route.targetAddress}<br>
        <strong>Mesafe:</strong> ${route.distanceKm} km • <strong>Tahmini Varış (ETA):</strong> ${route.etaMinutes} Dakika<br>
        <strong>Ulaşım Modu:</strong> <span style="color:#38bdf8; font-weight:700;">${route.travelMode.title}</span><br>
        <strong>Güzergah:</strong> ${route.travelMode.detail}<br>
        <strong>Uzmanlık Alanı:</strong> ${person.specialty}
      </p>
    `);

    // Özel HTML Hedef Müşteri İşaretçisi
    const targetIconHtml = `
      <div class="leaflet-target-marker">
        <div class="leaflet-target-pin">🎯</div>
        <div class="leaflet-target-label">
          <strong>${route.targetCustomer}</strong>
          <span>${route.targetAddress.split(',')[0]}</span>
        </div>
      </div>
    `;
    const targetDivIcon = L.divIcon({
      html: targetIconHtml,
      className: '',
      iconSize: [40, 65],
      iconAnchor: [20, 20]
    });

    if (leafletMapState.targetMarker) {
      leafletMapState.targetMarker.setLatLng(route.destCoords);
      leafletMapState.targetMarker.setIcon(targetDivIcon);
    } else {
      leafletMapState.targetMarker = L.marker(route.destCoords, { icon: targetDivIcon, zIndexOffset: 900 }).addTo(map);
    }

    leafletMapState.targetMarker.bindPopup(`
      <h4>🎯 ${route.targetCustomer} (${route.targetCity})</h4>
      <p>
        <strong>Servis Adresi:</strong> ${route.targetAddress}<br>
        <strong>Atanan Teknisyen:</strong> ${person.name} (${person.vehiclePlate})<br>
        <strong>Ulaşım:</strong> ${route.routeNote}<br>
        <strong>Mesafe:</strong> ${route.distanceKm} km • <strong>Varış:</strong> ${route.etaMinutes} Dk
      </p>
    `);

    // Planlanan Rota Çizgisi (Seyahat Moduna Göre Stil)
    const polylineOptions = {
      color: route.travelMode.type === 'flight' ? '#38bdf8' :
             route.travelMode.type === 'train' ? '#c084fc' :
             route.travelMode.type === 'bus' ? '#fbbf24' : '#06b6d4',
      weight: route.travelMode.type === 'flight' ? 4 : 5,
      opacity: 0.85,
      dashArray: route.travelMode.type === 'flight' ? '6, 10' :
                 route.travelMode.type === 'train' ? '12, 6' : '8, 8',
      lineCap: 'round'
    };

    if (leafletMapState.routePolyline) {
      leafletMapState.routePolyline.setLatLngs(route.waypoints);
      leafletMapState.routePolyline.setStyle(polylineOptions);
    } else {
      leafletMapState.routePolyline = L.polyline(route.waypoints, polylineOptions).addTo(map);
    }

    // Kat edilen aktif yol çizgisi
    const initialTraveled = route.waypoints.slice(0, Math.max(2, Math.floor(route.waypoints.length * 0.25)));
    const traveledOptions = {
      color: route.travelMode.type === 'flight' ? '#0284c7' :
             route.travelMode.type === 'train' ? '#9333ea' :
             route.travelMode.type === 'bus' ? '#f59e0b' : '#38bdf8',
      weight: 6,
      opacity: 0.95,
      lineCap: 'round'
    };

    if (leafletMapState.traveledPolyline) {
      leafletMapState.traveledPolyline.setLatLngs(initialTraveled);
      leafletMapState.traveledPolyline.setStyle(traveledOptions);
    } else {
      leafletMapState.traveledPolyline = L.polyline(initialTraveled, traveledOptions).addTo(map);
    }
  }
}

function populateMapTechDropdown(filterQuery = '') {
  const dropdown = document.getElementById('select-map-tech');
  const countBadge = document.getElementById('map-tech-count-badge');
  if (!dropdown) return;

  const allFieldStaff = state.staff.filter(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı');
  const query = (filterQuery || '').toLowerCase().trim();

  // 50+ Personel Arama Filtresi
  const filtered = query ? allFieldStaff.filter(s => 
    (s.name && s.name.toLowerCase().includes(query)) ||
    (s.vehiclePlate && s.vehiclePlate.toLowerCase().includes(query)) ||
    (s.specialty && s.specialty.toLowerCase().includes(query)) ||
    (s.location && s.location.toLowerCase().includes(query)) ||
    (s.role && s.role.toLowerCase().includes(query))
  ) : allFieldStaff;

  if (countBadge) {
    countBadge.textContent = query 
      ? `${filtered.length} / ${allFieldStaff.length} Uzman` 
      : `${allFieldStaff.length} Uzman`;
  }

  if (filtered.length === 0) {
    dropdown.innerHTML = `<option value="">Eşleşen personel bulunamadı ("${escapeHtml(filterQuery)}")</option>`;
    return;
  }

  // Gruplara ayır: Görevde/Sahada, Yolda, Müsait, Diğerleri
  const onDuty = filtered.filter(s => s.status === 'Görevde');
  const onTheWay = filtered.filter(s => s.status === 'Yolda');
  const available = filtered.filter(s => s.status === 'Müsait');
  const others = filtered.filter(s => !['Görevde', 'Yolda', 'Müsait'].includes(s.status));

  const buildGroup = (label, list) => {
    if (list.length === 0) return '';
    return `
      <optgroup label="${label} (${list.length})">
        ${list.map(s => {
          const vehIcon = getVehicleIcon(s.vehiclePlate);
          const plateStr = s.vehiclePlate && s.vehiclePlate !== 'Zimmetsiz' ? s.vehiclePlate : 'Zimmetsiz';
          const locStr = s.location ? s.location.split('(')[0].trim() : 'İstanbul';
          return `<option value="${s.id}">${vehIcon} ${escapeHtml(s.name)} (${plateStr} • ${escapeHtml(locStr)}) [${s.status}]</option>`;
        }).join('')}
      </optgroup>
    `;
  };

  let html = '';
  html += buildGroup('🟢 Sahada & Görevde', onDuty);
  html += buildGroup('🟡 Yolda / İntikal Halinde', onTheWay);
  html += buildGroup('⚪ Müsait / Göreve Hazır', available);
  html += buildGroup('🔵 Diğer Kadro', others);

  const prevVal = dropdown.value;
  dropdown.innerHTML = html;

  // Seçili değeri koru veya filtrelenen ilk elemana odaklan
  if (prevVal && filtered.some(s => String(s.id) === String(prevVal))) {
    dropdown.value = prevVal;
  } else if (filtered.length > 0) {
    dropdown.value = String(filtered[0].id);
  }
}

function initMapTechSelector() {
  populateMapTechDropdown();

  const dropdown = document.getElementById('select-map-tech');
  const searchInput = document.getElementById('map-tech-search-input');

  if (dropdown) {
    dropdown.addEventListener('change', (e) => {
      const techId = parseInt(e.target.value);
      if (techId) {
        selectMapTech(techId);
        const person = state.staff.find(s => s.id === techId);
        if (person) {
          showToast(`📍 Harita odağı ${person.name} (${person.vehiclePlate}) aracına çevrildi.`);
        }
      }
    });
  }

  // 50+ Personel Arama Kutusu Canlı Dinleyicisi
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      populateMapTechDropdown(q);
      if (dropdown && dropdown.value) {
        selectMapTech(parseInt(dropdown.value));
      }
    });
  }
}

// ==================== 7. Saha Personeli Atanan İşler Modalı ====================
let currentModalStaffId = null;

async function openStaffJobsModal(staffId) {
  currentModalStaffId = staffId;
  const modal = document.getElementById('staff-jobs-modal');
  if (!modal) return;

  const avatarEl = document.getElementById('staff-modal-avatar');
  const nameEl = document.getElementById('staff-modal-name');
  const metaEl = document.getElementById('staff-modal-meta');
  const totalJobsEl = document.getElementById('staff-modal-total-jobs');
  const activeJobsEl = document.getElementById('staff-modal-active-jobs');
  const completedJobsEl = document.getElementById('staff-modal-completed-jobs');
  const listContainer = document.getElementById('staff-jobs-list-container');

  modal.style.display = 'flex';
  listContainer.innerHTML = '<div class="rep-empty-state">⏳ Atanan iş emirleri sorgulanıyor...</div>';

  let staffInfo = state.staff.find(s => s.id === staffId) || state.staff[0];
  let orders = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/staff/${staffId}/orders`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.orders && data.orders.length > 0) {
        orders = data.orders;
        staffInfo = {
          id: data.staff_id || staffInfo.id,
          name: data.full_name || staffInfo.name,
          role: data.role || staffInfo.role,
          specialty: data.specialty || staffInfo.specialty,
          vehiclePlate: data.vehicle_plate || staffInfo.vehiclePlate,
          status: data.status || staffInfo.status,
          avatar: (data.full_name || staffInfo.name).split(' ').map(n => n[0]).join('')
        };
      }
    }
  } catch (err) {
    console.warn("ServisAI: Backend çevrimdışı veya yanıt vermedi, yerel personel iş listesi yükleniyor.");
  }

  // Eğer backend'den veri gelmediyse yerel state.staffJobs veya state.workOrders'tan ilgili personele ait işleri çek
  // Eğer backend'den veri gelmediyse yerel state.workOrders veya state.staffJobs'tan ilgili personele ait işleri çek
  if (!orders || orders.length === 0) {
    if (state.workOrders && state.workOrders.length > 0) {
      orders = state.workOrders.filter(o => 
        (o.assigned_user_id && String(o.assigned_user_id) === String(staffId)) ||
        (staffInfo && o.assigned_tech && o.assigned_tech.toLowerCase() === staffInfo.name.toLowerCase())
      );
    }
    if ((!orders || orders.length === 0) && state.staffJobs && state.staffJobs[staffId]) {
      orders = state.staffJobs[staffId];
    }
  }

  // Header ve KPI Bilgilerini Doldur
  const initials = staffInfo.avatar || staffInfo.name.split(' ').map(n => n[0]).join('');
  if (avatarEl) avatarEl.textContent = initials;
  if (nameEl) nameEl.textContent = `${staffInfo.name} - Atanan Saha İşleri`;
  if (metaEl) {
    const badgeClass = staffInfo.status === 'Müsait' ? 'badge-success' : staffInfo.status === 'Görevde' ? 'badge-primary' : 'badge-warning';
    metaEl.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; width: 100%;">
        <div>
          ${staffInfo.role} (${staffInfo.specialty || 'Genel'}) • 🚗 Araç: <strong>${staffInfo.vehiclePlate || 'Zimmetsiz'}</strong> • Durum: <span class="badge ${badgeClass}">${staffInfo.status}</span>
        </div>
        <button class="btn btn-outline btn-sm btn-staff-veh-from-jobs" style="padding: 2px 10px; font-size: 0.75rem; border-color: rgba(56,189,248,0.4); color: var(--accent-cyan);" title="Personelin servis aracını değiştir veya geri al">
          🚗 Araç Yönet / Değiştir
        </button>
      </div>
    `;
    const btnVehFromJobs = metaEl.querySelector('.btn-staff-veh-from-jobs');
    if (btnVehFromJobs) {
      btnVehFromJobs.addEventListener('click', () => {
        openStaffVehicleModal(staffInfo.id);
      });
    }
  }

  const activeCount = orders.filter(o => o.status !== 'Tamamlandı').length;
  const completedCount = orders.filter(o => o.status === 'Tamamlandı').length;

  if (totalJobsEl) totalJobsEl.textContent = orders.length;
  if (activeJobsEl) activeJobsEl.textContent = activeCount;
  if (completedJobsEl) completedJobsEl.textContent = completedCount;

  if (orders.length === 0) {
    listContainer.innerHTML = `
      <div class="rep-empty-state">
        <span style="font-size: 2.2rem;">📭</span>
        <p class="mt-2" style="font-weight: 600; color: var(--text-main);">Bu personele atanmış açık servis iş emri bulunmuyor.</p>
        <p class="text-xs text-muted">Yönetici panelindeki çağrı banner'ından yeni bir arızayı bu personele yönlendirebilirsiniz.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = orders.map(order => {
    const badgeClass = order.status === 'Tamamlandı' ? 'badge-success' :
                       order.status === 'Onarımda' ? 'badge-warning' :
                       order.status === 'Yolda' ? 'badge-warning' :
                       order.status === 'İncelemede' ? 'badge-primary' : 'badge-primary';
    const cost = order.total_cost ? Number(order.total_cost).toLocaleString('tr-TR') : '0';
    const isApproved = !!(order.customer_approved || order.customerApproved);
    const approvedBadge = isApproved 
      ? `<span class="badge badge-success badge-customer-approved" style="font-size: 0.72rem; padding: 2px 7px;">✅ Müşteri Onayladı</span>` 
      : '';

    return `
      <div class="staff-job-card">
        <div class="staff-job-card-header">
          <span class="staff-job-code">#${order.tracking_code || order.code}</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            ${approvedBadge}
            <span class="badge ${badgeClass}">${order.status}</span>
          </div>
        </div>
        <div class="staff-job-device">⚙️ ${order.device_brand || ''} ${order.device_model || ''}</div>
        <div class="staff-job-customer">📍 <strong>${order.customer_name || 'Müşteri'}</strong> • ${order.customer_address || 'İstanbul'} ${order.customer_phone ? `(${order.customer_phone})` : ''}</div>
        <div class="staff-job-complaint"><strong>Arıza Şikayeti:</strong> ${order.customer_complaint}</div>
        ${order.technician_findings ? `<div class="staff-job-findings" style="font-size: 0.82rem; color: var(--text-dim); margin-top: 4px;"><strong>Bulgu:</strong> ${order.technician_findings}</div>` : ''}
        <div class="staff-job-duration-row" style="font-size: 0.74rem; color: var(--accent-cyan); margin: 6px 0; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span>🚗 Seyahat: <strong>${order.travel_duration_minutes || order.travelDurationMinutes || 25} dk</strong></span>
          <span>•</span>
          <span>🛠️ Onarım: <strong>${order.repair_duration_minutes || order.repairDurationMinutes || 45} dk</strong></span>
          <span>•</span>
          <span>⏳ Toplam Mesai: <strong>${formatDurationMinutes(order.total_duration_minutes || order.totalDurationMinutes || 70)}</strong></span>
        </div>
        <div class="staff-job-actions">
          <span class="staff-job-cost">Tutar: ${cost} ₺</span>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${order.status !== 'Tamamlandı' ? `
              <button class="btn btn-transfer btn-sm btn-transfer-job" data-code="${order.tracking_code}" data-source-id="${staffInfo.id}" title="Bu görevi başka bir saha personeline devret / aktar">
                🔄 Başka Uzmana Aktar
              </button>
            ` : ''}
            <button class="btn btn-outline btn-sm btn-load-to-bench" data-code="${order.tracking_code}" title="İşi teknisyen tezgahına yükle">
              🔧 Tezgâha Al
            </button>
            <button class="btn btn-whatsapp btn-sm btn-open-wa-for-job" data-code="${order.tracking_code}" title="Müşteriye WhatsApp mesajı hazırla">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Buton Aksiyonları
  listContainer.querySelectorAll('.btn-transfer-job').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.currentTarget.getAttribute('data-code');
      const sourceId = parseInt(e.currentTarget.getAttribute('data-source-id'));
      openDispatchAssignModal(code, sourceId);
    });
  });

  listContainer.querySelectorAll('.btn-load-to-bench').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.currentTarget.getAttribute('data-code');
      modal.style.display = 'none';
      const techTabBtn = document.getElementById('btn-tab-tech');
      if (techTabBtn) techTabBtn.click();
      loadWorkOrderToWorkbench(code);
    });
  });

  listContainer.querySelectorAll('.btn-open-wa-for-job').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.currentTarget.getAttribute('data-code');
      modal.style.display = 'none';
      openNotificationModal(code, 'YOLDA');
    });
  });
}

function initStaffJobsModal() {
  const modal = document.getElementById('staff-jobs-modal');
  const btnClose = document.getElementById('btn-close-staff-jobs-modal');
  const btnCloseFooter = document.getElementById('btn-close-staff-jobs-footer');
  const btnTrack = document.getElementById('btn-staff-track-from-modal');

  if (!modal) return;

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    modal.style.display = 'none';
  };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(e);
  });

  if (btnTrack) {
    btnTrack.addEventListener('click', (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const targetTechId = currentModalStaffId;

      // 1. Modalı derhal gizle
      modal.style.display = 'none';

      // 2. Yönetici & Kontrol Paneli sekmesine geç (harita admin-view içindedir)
      const adminBtn = document.getElementById('btn-tab-admin');
      if (adminBtn) {
        adminBtn.click();
      }

      // 3. Haritanın boyutunu Leaflet kütüphanesine yeniden hesaplat
      if (leafletMapState && leafletMapState.map) {
        setTimeout(() => {
          try {
            leafletMapState.map.invalidateSize();
          } catch (mErr) {
            console.warn("Harita invalidateSize uyarısı:", mErr);
          }
        }, 50);
      }

      // 4. Hedef teknisyeni haritada seç ve odakla
      if (targetTechId) {
        setTimeout(() => {
          try {
            selectMapTech(targetTechId);
            const p = state.staff.find(s => s.id === targetTechId);
            if (p) {
              showToast(`📍 Harita odağı ${p.name} (${p.vehiclePlate}) personeline çevrildi.`);
            }
          } catch (tErr) {
            console.error("selectMapTech çalıştırılırken hata:", tErr);
          }
        }, 120);
      }

      // 5. Harita ve telemetri kartına yumuşak kaydır
      const gpsCard = document.getElementById('gps-tracking-card');
      if (gpsCard) {
        setTimeout(() => {
          gpsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 160);
      }
    });
  }
}

// ==================== Modern Custom Select Dropdown System ====================
function initCustomSelect(selectEl) {
  if (!selectEl) return null;
  if (selectEl._customSelectWrapper) {
    refreshCustomSelect(selectEl);
    return selectEl._customSelectWrapper;
  }

  // Visually hide the native select while keeping it in DOM for forms/tests
  if (selectEl.classList && selectEl.classList.add) {
    selectEl.classList.add('custom-select-hidden');
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select-wrapper';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  const textSpan = document.createElement('span');
  textSpan.className = 'trigger-text';

  const arrowSpan = document.createElement('span');
  arrowSpan.className = 'arrow-icon';
  arrowSpan.textContent = '▼';

  trigger.appendChild(textSpan);
  trigger.appendChild(arrowSpan);
  wrapper.appendChild(trigger);

  const dropdown = document.createElement('div');
  dropdown.className = 'custom-select-dropdown';
  dropdown.setAttribute('role', 'listbox');
  wrapper.appendChild(dropdown);

  // Insert wrapper right after the native select if parent exists
  if (selectEl.parentNode && selectEl.parentNode.insertBefore) {
    selectEl.parentNode.insertBefore(wrapper, selectEl.nextSibling);
  }

  // Store references
  selectEl._customSelectWrapper = wrapper;
  wrapper._targetSelect = selectEl;
  wrapper._triggerText = textSpan;
  wrapper._dropdown = dropdown;
  wrapper._trigger = trigger;

  // Toggle dropdown on trigger click
  trigger.addEventListener('click', (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const isOpen = wrapper.classList && wrapper.classList.contains('is-open');
    if (document.querySelectorAll) {
      const openWrappers = document.querySelectorAll('.custom-select-wrapper.is-open') || [];
      openWrappers.forEach(w => {
        if (w !== wrapper) {
          if (w.classList) w.classList.remove('is-open');
          if (w._trigger) w._trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }
    if (isOpen) {
      if (wrapper.classList) wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      if (wrapper.classList) wrapper.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard navigation on trigger
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (wrapper.classList) wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (e.preventDefault) e.preventDefault();
      if (!wrapper.classList.contains('is-open')) {
        wrapper.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    }
  });

  // Listen for programmatic value / change updates on the select
  selectEl.addEventListener('change', () => {
    refreshCustomSelect(selectEl);
  });

  // Observe dynamically added/removed options
  if (typeof MutationObserver !== 'undefined' && selectEl.nodeType) {
    try {
      const observer = new MutationObserver(() => {
        refreshCustomSelect(selectEl);
      });
      observer.observe(selectEl, { childList: true, subtree: true, characterData: true });
      selectEl._customSelectObserver = observer;
    } catch (err) {}
  }

  // Global click-outside & escape listener
  if (typeof window !== 'undefined' && !window._customSelectGlobalHandlerAttached && document.addEventListener) {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.closest && target.closest('.custom-select-wrapper')) return;
      if (document.querySelectorAll) {
        const openWrappers = document.querySelectorAll('.custom-select-wrapper.is-open') || [];
        openWrappers.forEach(w => {
          if (w.classList) w.classList.remove('is-open');
          if (w._trigger) w._trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.querySelectorAll) {
        const openWrappers = document.querySelectorAll('.custom-select-wrapper.is-open') || [];
        openWrappers.forEach(w => {
          if (w.classList) w.classList.remove('is-open');
          if (w._trigger) w._trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });

    window._customSelectGlobalHandlerAttached = true;
  }

  // Initial population
  refreshCustomSelect(selectEl);

  return wrapper;
}

function refreshCustomSelect(selectEl) {
  if (!selectEl || !selectEl._customSelectWrapper) return;
  const wrapper = selectEl._customSelectWrapper;
  const textSpan = wrapper._triggerText;
  const dropdown = wrapper._dropdown;
  const trigger = wrapper._trigger;

  // Extract options either from selectEl.options or by querySelectorAll('option') or innerHTML
  let options = [];
  if (selectEl.options && selectEl.options.length) {
    options = Array.from(selectEl.options);
  } else if (selectEl.querySelectorAll) {
    const found = selectEl.querySelectorAll('option');
    if (found && found.length) {
      options = Array.from(found);
    }
  }
  if (!options.length && selectEl.innerHTML) {
    const matches = Array.from(selectEl.innerHTML.matchAll(/<option[^>]*value="([^"]*)"[^>]*>(.*?)<\/option>/gi));
    options = matches.map(m => ({ value: m[1], textContent: m[2].trim(), selected: false }));
  }

  let selectedOpt = null;
  if (selectEl.selectedOptions && selectEl.selectedOptions[0]) {
    selectedOpt = selectEl.selectedOptions[0];
  } else if (options.length > 0) {
    selectedOpt = options.find(o => o.value === selectEl.value) || options[0];
  }

  const currentText = selectedOpt ? (selectedOpt.textContent || selectedOpt.text || '') : '';
  if (textSpan) {
    textSpan.textContent = currentText;
  }

  if (!dropdown) return;
  dropdown.innerHTML = '';

  options.forEach(opt => {
    const optVal = opt.value !== undefined ? opt.value : (opt.getAttribute ? opt.getAttribute('value') : '');
    const optText = opt.textContent || opt.text || optVal;

    const optDiv = document.createElement('div');
    optDiv.className = 'custom-option';
    optDiv.setAttribute('role', 'option');
    optDiv.setAttribute('data-value', optVal);

    const isSel = (selectedOpt && (optVal === selectedOpt.value || optVal === selectEl.value));
    if (isSel) {
      if (optDiv.classList) optDiv.classList.add('is-selected');
      optDiv.setAttribute('aria-selected', 'true');
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'custom-option-label';
    labelSpan.textContent = optText;
    optDiv.appendChild(labelSpan);

    if (isSel) {
      const checkSpan = document.createElement('span');
      checkSpan.className = 'custom-option-check';
      checkSpan.textContent = '✓';
      optDiv.appendChild(checkSpan);
    }

    optDiv.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      const prevVal = selectEl.value;
      selectEl.value = optVal;
      refreshCustomSelect(selectEl);
      if (wrapper.classList) wrapper.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (prevVal !== optVal) {
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    dropdown.appendChild(optDiv);
  });
}

window.initCustomSelect = initCustomSelect;
window.refreshCustomSelect = refreshCustomSelect;

// ==================== 8. Yönetici Raporlama & BI Motoru ====================
let lastReportResults = null;

function updateReportStaffDropdown() {
  const staffFilter = document.getElementById('report-staff-filter');
  if (!staffFilter) return;
  const currentVal = staffFilter.value || 'all';
  let html = `<option value="all">Tüm Saha Ekibi (Konsolide)</option>`;
  const activeStaff = (state.staff || []).filter(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı');
  activeStaff.forEach(s => {
    const cleanRole = (s.role || s.specialty || 'Saha').replace(/[()]/g, '').trim();
    html += `<option value="${s.id}">${escapeHtml(s.name)} - ${cleanRole}</option>`;
  });
  staffFilter.innerHTML = html;
  if (currentVal && staffFilter.options && Array.from(staffFilter.options).some(o => o.value === currentVal)) {
    staffFilter.value = currentVal;
  }
  if (typeof refreshCustomSelect === 'function') {
    refreshCustomSelect(staffFilter);
  }
}
window.updateReportStaffDropdown = updateReportStaffDropdown;

async function executeCustomReport() {
  const reportTypeSelect = document.getElementById('report-type-select');
  const staffFilter = document.getElementById('report-staff-filter');
  const statusFilter = document.getElementById('report-status-filter');
  const criticalOnly = document.getElementById('report-critical-only');
  const tableContent = document.getElementById('report-table-content');
  const activeTitle = document.getElementById('report-active-title');
  const activeTimestamp = document.getElementById('report-active-timestamp');

  const reportType = reportTypeSelect ? reportTypeSelect.value : 'staff';
  const staffId = staffFilter ? staffFilter.value : 'all';
  const status = statusFilter ? statusFilter.value : 'all';
  const onlyCritical = criticalOnly ? criticalOnly.checked : false;

  let data = null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/reports/custom-query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        report_type: reportType,
        staff_id: staffId,
        status: status,
        only_critical: onlyCritical
      })
    });

    if (res.ok) {
      data = await res.json();
    }
  } catch (err) {
    // Backend offline modunda yerel veri motoru devreye girer
  }

  // Çevrimdışı / Simülasyon Rapor Verisi (Doğrudan canlı state ile senkronize)
  if (!data) {
    // 1. Personel Raporu Verisi
    let staffData = (state.staff || [])
      .filter(s => s.status !== 'Ayrıldı')
      .map(s => {
        const staffJobs = (state.staffJobs && state.staffJobs[s.id]) ? state.staffJobs[s.id] : [];
        const directOrders = (state.workOrders || []).filter(o => o.assigned_user_id == s.id || o.assigned_tech === s.name);
        const allJobs = staffJobs.length > 0 ? staffJobs : directOrders;
        const completed = allJobs.filter(j => j.status === 'Tamamlandı').length;
        const totalAssigned = allJobs.length > 0 ? allJobs.length : (s.status === 'Görevde' ? 2 : 1);
        const completedCount = completed > 0 ? completed : (s.status === 'Müsait' ? 1 : 1);
        const compRate = totalAssigned > 0 ? Math.round((completedCount / totalAssigned) * 100) : 100;
        const totalRev = allJobs.length > 0 
          ? allJobs.reduce((acc, curr) => acc + (curr.total_cost || 850), 0)
          : (s.id == 2 ? 1450 : s.id == 3 ? 950 : 750);

        const completedJobs = allJobs.filter(j => j.status === 'Tamamlandı');
        let avgTravelM = 25;
        let avgRepairM = 45;
        let totalOnsiteM = 0;

        if (completedJobs.length > 0) {
          const sumTravel = completedJobs.reduce((acc, j) => acc + (j.travel_duration_minutes || j.travelDurationMinutes || 25), 0);
          const sumRepair = completedJobs.reduce((acc, j) => acc + (j.repair_duration_minutes || j.repairDurationMinutes || 45), 0);
          avgTravelM = Math.round(sumTravel / completedJobs.length);
          avgRepairM = Math.round(sumRepair / completedJobs.length);
          totalOnsiteM = sumTravel + sumRepair;
        } else {
          totalOnsiteM = (s.id == 2 ? 140 : s.id == 3 ? 90 : 70);
        }

        return {
          staff_id: s.id,
          full_name: s.name,
          role: s.role || 'Saha Personeli',
          specialty: s.specialty || 'Elektronik & Mekanik',
          vehicle_plate: s.vehiclePlate || 'Zimmetsiz',
          status: s.status || 'Müsait',
          total_assigned: totalAssigned,
          completed_count: completedCount,
          completion_rate_pct: compRate,
          total_revenue_tl: totalRev,
          avg_travel_minutes: avgTravelM,
          avg_repair_minutes: avgRepairM,
          total_onsite_minutes: totalOnsiteM,
          satisfaction_score: 4.9
        };
      });

    // 2. Cihaz / İş Emri Raporu Verisi: Hem state.workOrders hem de state.staffJobs içindeki tüm kayıtlar
    const allDeviceMap = new Map();

    // staffJobs içindeki saha görevlerini ekle
    if (state.staffJobs) {
      for (const sId in state.staffJobs) {
        const staffMember = (state.staff || []).find(s => s.id == sId);
        const techName = staffMember ? staffMember.name : "Saha Teknisyeni";
        state.staffJobs[sId].forEach(j => {
          const code = j.tracking_code || j.code;
          if (code && !allDeviceMap.has(code)) {
            allDeviceMap.set(code, {
              tracking_code: code,
              device_brand: j.device_brand || "Endüstriyel Cihaz",
              device_model: j.device_model || "",
              serial_number: j.serial_number || j.serialNo || "-",
              customer_name: j.customer_name || j.customer || "Müşteri",
              customer_phone: j.customer_phone || "",
              assigned_tech: techName,
              assigned_user_id: parseInt(sId),
              status: j.status || "Onarımda",
              total_cost: j.total_cost || 850,
              created_at: "23.10.2026"
            });
          }
        });
      }
    }

    // workOrders içindeki çağrıları ekle
    if (state.workOrders && state.workOrders.length > 0) {
      state.workOrders.forEach(o => {
        const code = o.tracking_code || o.code;
        if (code) {
          allDeviceMap.set(code, {
            tracking_code: code,
            device_brand: o.device_brand || "Endüstriyel Cihaz",
            device_model: o.device_model || "",
            serial_number: o.serial_number || o.serialNo || "-",
            customer_name: o.customer_name || o.customer || "Müşteri",
            customer_phone: o.customer_phone || "",
            assigned_tech: o.assigned_tech || "Atama Bekliyor",
            assigned_user_id: o.assigned_user_id || null,
            status: o.status || "Kabul Edildi",
            total_cost: o.total_cost || (o.labor_cost || 500) + (o.parts_cost || 0),
            created_at: o.created_at ? (typeof o.created_at === 'string' && o.created_at.includes('T') ? new Date(o.created_at).toLocaleDateString('tr-TR') : o.created_at) : "24.10.2026"
          });
        }
      });
    }

    let devData = Array.from(allDeviceMap.values());
    if (devData.length === 0) {
      devData = [
        { tracking_code: "SRV-2026-104", device_brand: "Delta Electronics", device_model: "VFD-075 Sürücü Kartı", customer_name: "TermoTek Ltd.", assigned_tech: "Murat Aydın", assigned_user_id: 2, status: "Tamamlandı", total_cost: 1050, created_at: "21.10.2026" },
        { tracking_code: "SRV-2026-338", device_brand: "Siemens", device_model: "S7-1200 Güç Modülü", customer_name: "Marmara Ambalaj", assigned_tech: "Caner Güler", assigned_user_id: 3, status: "Tamamlandı", total_cost: 850, created_at: "21.10.2026" },
        { tracking_code: "SRV-2026-451", device_brand: "Omron", device_model: "Frekans Sürücü 15kW", customer_name: "Mega Tekstil", assigned_tech: "Murat Aydın", assigned_user_id: 2, status: "Yolda", total_cost: 1200, created_at: "22.10.2026" },
        { tracking_code: "SRV-2026-215", device_brand: "Schneider", device_model: "Altivar ATV320", customer_name: "Ekol Lojistik", assigned_tech: "Selin Kaya", assigned_user_id: 4, status: "Kabul Edildi", total_cost: 500, created_at: "22.10.2026" },
        { tracking_code: "SRV-2026-792", device_brand: "ABB", device_model: "ACS580 Sürücü", customer_name: "Doğuş İklimlendirme", assigned_tech: "Caner Güler", assigned_user_id: 3, status: "Tamamlandı", total_cost: 850, created_at: "22.10.2026" }
      ];
    }

    // 3. Stok Raporu Verisi
    let stockData = (state.stock || []).map(s => {
      const wQty = s.workshop !== undefined ? s.workshop : 10;
      const v1Qty = s.vehicle1 || 0;
      const v2Qty = s.vehicle2 || 0;
      const centralQty = s.central || 0;
      const total = centralQty + wQty + v1Qty + v2Qty;
      const isCritical = (v1Qty <= 2 || v2Qty <= 2 || wQty <= 2 || centralQty <= 5);
      return {
        part_code: s.code,
        part_name: s.name,
        unit_price: s.price,
        central_qty: centralQty,
        workshop_qty: wQty,
        vehicle1_qty: v1Qty,
        vehicle2_qty: v2Qty,
        total_qty: total,
        total_value_tl: total * s.price,
        is_critical: isCritical,
        status_label: isCritical ? "Kritik Stok" : "Normal Stok"
      };
    });

    data = {
      generated_at: new Date().toLocaleTimeString('tr-TR'),
      kpis: {},
      staff_report: staffData,
      device_report: devData,
      stock_report: stockData
    };
  }

  // ==================== KATI FİLTRELEME UYGULAMASI (HER İKİ MOD İÇİN) ====================
  // A. Personel Filtresi
  if (staffId && staffId !== 'all') {
    if (data.staff_report) {
      data.staff_report = data.staff_report.filter(s => String(s.staff_id) === String(staffId) || String(s.id) === String(staffId) || s.full_name.includes(staffId));
    }
    if (data.device_report) {
      const selectedPerson = (state.staff || []).find(s => String(s.id) === String(staffId));
      const targetName = selectedPerson ? selectedPerson.name : null;
      data.device_report = data.device_report.filter(d => 
        (d.assigned_user_id && String(d.assigned_user_id) === String(staffId)) || 
        (targetName && d.assigned_tech === targetName)
      );
    }
  }

  // B. Servis Durumu Filtresi
  if (status && status !== 'all') {
    if (data.device_report) {
      data.device_report = data.device_report.filter(d => d.status === status);
    }
  }

  // C. Yalnızca Kritik Stoklar Filtresi
  if (onlyCritical && data.stock_report) {
    data.stock_report = data.stock_report.filter(p => p.is_critical);
  }

  // ==================== DİNAMİK KPI HESAPLAMALARI ====================
  const devList = data.device_report || [];
  const stockList = data.stock_report || [];
  const staffList = data.staff_report || [];

  const totalOrdersCount = reportType === 'devices' ? devList.length : (reportType === 'staff' ? staffList.reduce((acc, s) => acc + (s.total_assigned || 0), 0) : devList.length);
  const completedOrdersCount = reportType === 'devices' 
    ? devList.filter(d => d.status === 'Tamamlandı').length 
    : (reportType === 'staff' ? staffList.reduce((acc, s) => acc + (s.completed_count || 0), 0) : devList.filter(d => d.status === 'Tamamlandı').length);

  const totalRevenueCalc = reportType === 'devices'
    ? devList.reduce((acc, curr) => acc + (curr.total_cost || 0), 0)
    : (reportType === 'staff' ? staffList.reduce((acc, s) => acc + (s.total_revenue_tl || 0), 0) : (reportType === 'stock' ? stockList.reduce((acc, s) => acc + (s.total_value_tl || 0), 0) : devList.reduce((acc, curr) => acc + (curr.total_cost || 0), 0)));

  const criticalPartsCount = (state.stock || []).filter(s => (s.vehicle1 <= 2 || s.vehicle2 <= 2 || (s.workshop !== undefined && s.workshop <= 2) || s.central <= 5)).length;
  const totalInventoryValueCalc = (state.stock || []).reduce((acc, s) => {
    const w = s.workshop !== undefined ? s.workshop : 10;
    return acc + ((s.central + w + s.vehicle1 + s.vehicle2) * s.price);
  }, 0);

  data.kpis = {
    total_orders: totalOrdersCount,
    completed_orders: completedOrdersCount,
    total_revenue_tl: totalRevenueCalc,
    critical_stock_count: criticalPartsCount,
    total_inventory_value_tl: totalInventoryValueCalc
  };

  lastReportResults = data;
  renderReportView(data, reportType, { staffId, status, onlyCritical });
}

function renderReportView(data, reportType, activeFilters = {}) {
  const tableContent = document.getElementById('report-table-content');
  const activeTitle = document.getElementById('report-active-title');
  const activeTimestamp = document.getElementById('report-active-timestamp');

  // KPI'ları Doldur
  const kpiTotal = document.getElementById('rep-kpi-total-orders');
  const kpiCompleted = document.getElementById('rep-kpi-completed-orders');
  const kpiRevenue = document.getElementById('rep-kpi-total-revenue');
  const kpiCritical = document.getElementById('rep-kpi-critical-stock');

  if (data.kpis) {
    if (kpiTotal) kpiTotal.textContent = data.kpis.total_orders;
    if (kpiCompleted) {
      const pct = data.kpis.total_orders > 0 ? Math.round((data.kpis.completed_orders / data.kpis.total_orders) * 100) : 100;
      kpiCompleted.textContent = `${data.kpis.completed_orders} (%${pct})`;
    }
    if (kpiRevenue) kpiRevenue.textContent = `${(data.kpis.total_revenue_tl || 0).toLocaleString('tr-TR')} ₺`;
    if (kpiCritical) kpiCritical.textContent = `${data.kpis.critical_stock_count} Parça`;
  }

  if (activeTimestamp) {
    activeTimestamp.textContent = `Rapor Tarihi: ${data.generated_at || new Date().toLocaleString('tr-TR')}`;
  }

  // 1. Personel Performans Raporu
  if (reportType === 'staff') {
    let staffList = data.staff_report || [];
    const staffId = activeFilters.staffId || (document.getElementById('report-staff-filter') ? document.getElementById('report-staff-filter').value : 'all');

    // Ekstra güvenlik: Eğer tek personel seçildiyse doğrudan filtrele
    if (staffId && staffId !== 'all') {
      staffList = staffList.filter(s => String(s.staff_id) === String(staffId) || String(s.id) === String(staffId) || s.full_name.includes(staffId));
    }

    if (activeTitle) {
      if (staffList.length === 1) {
        activeTitle.textContent = `👨‍🔧 ${staffList[0].full_name} - Bireysel Performans & Ciro Raporu`;
      } else {
        activeTitle.textContent = "👨‍🔧 Saha Personeli Performans & Ciro Dağılım Raporu";
      }
    }

    if (staffList.length === 0) {
      tableContent.innerHTML = '<div class="rep-empty-state">⚠️ Seçilen kriterlere uygun personel kaydı bulunamadı.</div>';
      return;
    }

    tableContent.innerHTML = `
      <table class="rep-table" id="exportable-table">
        <thead>
          <tr>
            <th>Personel</th>
            <th>Uzmanlık Alanı</th>
            <th>Araç Plakası</th>
            <th>Durum</th>
            <th>Atanan İş</th>
            <th>Tamamlanan</th>
            <th>Başarı Oranı</th>
            <th>Üretilen Ciro</th>
            <th>Ort. İntikal</th>
            <th>Ort. Onarım</th>
            <th>Toplam Mesai</th>
            <th>Müşteri Puanı</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          ${staffList.map(s => `
            <tr>
              <td><strong>${s.full_name}</strong></td>
              <td><span class="badge badge-purple">${s.specialty}</span></td>
              <td><code>${s.vehicle_plate}</code></td>
              <td><span class="badge ${s.status === 'Müsait' ? 'badge-success' : s.status === 'Görevde' ? 'badge-primary' : 'badge-warning'}">${s.status}</span></td>
              <td><strong>${s.total_assigned}</strong></td>
              <td class="text-success"><strong>${s.completed_count}</strong></td>
              <td>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-weight: 700;">%${s.completion_rate_pct}</span>
                  <div style="width: 50px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                    <div style="width: ${s.completion_rate_pct}%; height: 100%; background: #10B981;"></div>
                  </div>
                </div>
              </td>
              <td class="highlight-cyan font-mono"><strong>${(s.total_revenue_tl || 0).toLocaleString('tr-TR')} ₺</strong></td>
              <td style="white-space: nowrap;"><span class="badge badge-info" style="font-size: 0.72rem;">🚗 ${s.avg_travel_minutes || 25} Dk</span></td>
              <td style="white-space: nowrap;"><span class="badge badge-warning" style="font-size: 0.72rem;">🛠️ ${s.avg_repair_minutes || 45} Dk</span></td>
              <td style="white-space: nowrap; font-weight: 600; color: var(--accent-cyan);">${formatDurationMinutes(s.total_onsite_minutes || 70)}</td>
              <td>⭐ <strong>${s.satisfaction_score}</strong> / 5.0</td>
              <td>
                <button class="btn btn-primary btn-sm btn-view-staff-jobs" data-id="${s.staff_id}">
                  📋 İşleri Gör
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Modal açma butonlarını bağla
    tableContent.querySelectorAll('.btn-view-staff-jobs').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        openStaffJobsModal(id);
      });
    });
  }

  // 2. Servis ve Bakımı Yapılan Cihazlar Raporu
  else if (reportType === 'devices') {
    let devList = data.device_report || [];
    const staffId = activeFilters.staffId || (document.getElementById('report-staff-filter') ? document.getElementById('report-staff-filter').value : 'all');
    const status = activeFilters.status || (document.getElementById('report-status-filter') ? document.getElementById('report-status-filter').value : 'all');

    if (staffId && staffId !== 'all') {
      const selectedPerson = (state.staff || []).find(s => String(s.id) === String(staffId));
      const targetName = selectedPerson ? selectedPerson.name : null;
      devList = devList.filter(d => 
        (d.assigned_user_id && String(d.assigned_user_id) === String(staffId)) || 
        (targetName && d.assigned_tech === targetName)
      );
    }
    if (status && status !== 'all') {
      devList = devList.filter(d => d.status === status);
    }

    if (activeTitle) {
      const subTitle = (staffId !== 'all' || status !== 'all') ? " (Filtrelenmiş)" : "";
      activeTitle.textContent = `🛠️ Servis & Bakımı Yapılan Cihazlar ve İş Emri Dökümü${subTitle}`;
    }

    if (devList.length === 0) {
      tableContent.innerHTML = '<div class="rep-empty-state">⚠️ Seçilen kriterlere uygun cihaz veya iş emri kaydı bulunamadı.</div>';
      return;
    }

    tableContent.innerHTML = `
      <table class="rep-table" id="exportable-table">
        <thead>
          <tr>
            <th>Takip No</th>
            <th>Cihaz Bilgisi</th>
            <th>Müşteri & İletişim</th>
            <th>Atanan Uzman</th>
            <th>Durum</th>
            <th>Toplam Ücret</th>
            <th>Kabul Tarihi</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          ${devList.map(d => {
            const badgeClass = d.status === 'Tamamlandı' ? 'badge-success' :
                               d.status === 'Onarımda' ? 'badge-warning' :
                               d.status === 'Yolda' ? 'badge-warning' : 'badge-primary';
            return `
              <tr>
                <td><code>#${d.tracking_code}</code></td>
                <td>
                  <strong>${d.device_brand} ${d.device_model}</strong>
                  <div class="text-xs text-muted">SN: ${d.serial_number || '-'}</div>
                </td>
                <td>
                  <strong>${d.customer_name}</strong>
                  <div class="text-xs text-muted">${d.customer_phone || ''}</div>
                </td>
                <td>${d.assigned_tech}</td>
                <td><span class="badge ${badgeClass}">${d.status}</span></td>
                <td class="highlight-cyan font-mono"><strong>${(d.total_cost || 0).toLocaleString('tr-TR')} ₺</strong></td>
                <td>${d.created_at || '-'}</td>
                <td>
                  <button class="btn btn-whatsapp btn-sm btn-report-open-wa" data-code="${d.tracking_code}">
                    💬 WhatsApp
                  </button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    tableContent.querySelectorAll('.btn-report-open-wa').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.getAttribute('data-code');
        openNotificationModal(code, 'KABUL');
      });
    });
  }

  // 3. Yedek Parça & Kritik Stok Raporu
  else if (reportType === 'stock') {
    let stockList = data.stock_report || [];
    const onlyCritical = activeFilters.onlyCritical !== undefined 
      ? activeFilters.onlyCritical 
      : (document.getElementById('report-critical-only') ? document.getElementById('report-critical-only').checked : false);

    if (onlyCritical) {
      stockList = stockList.filter(p => p.is_critical);
    }

    if (activeTitle) {
      activeTitle.textContent = onlyCritical 
        ? "⚠️ Kritik Stok ve Acil İkmal Listesi (Eşik Değer Altı)" 
        : "📦 Yedek Parça Stok Listesi & Kritik Stok İkmal Analizi";
    }

    if (stockList.length === 0) {
      tableContent.innerHTML = onlyCritical
        ? '<div class="rep-empty-state">✅ Kritik seviyenin altında yedek parça bulunmuyor. Tüm araç ve merkez stokları güvenli düzeyde.</div>'
        : '<div class="rep-empty-state">Kriterlere uygun parça kaydı bulunamadı.</div>';
      return;
    }

    tableContent.innerHTML = `
      <table class="rep-table" id="exportable-table">
        <thead>
          <tr>
            <th>Parça Kodu</th>
            <th>Yedek Parça Adı</th>
            <th>Birim Fiyat</th>
            <th>Merkez Depo</th>
            <th>Atölye</th>
            <th>34 ABC 101</th>
            <th>34 DEF 202</th>
            <th>Toplam Stok</th>
            <th>Toplam Değer</th>
            <th>Kritiklik Durumu</th>
          </tr>
        </thead>
        <tbody>
          ${stockList.map(p => `
            <tr style="${p.is_critical ? 'background: rgba(245, 158, 11, 0.04);' : ''}">
              <td><code>${p.part_code}</code></td>
              <td><strong>${p.part_name}</strong></td>
              <td>${p.unit_price} ₺</td>
              <td>${p.central_qty} Adet</td>
              <td>${p.workshop_qty} Adet</td>
              <td><span class="badge ${p.vehicle1_qty <= 1 ? 'badge-danger' : 'badge-primary'}">${p.vehicle1_qty}</span></td>
              <td><span class="badge ${p.vehicle2_qty <= 1 ? 'badge-danger' : 'badge-primary'}">${p.vehicle2_qty}</span></td>
              <td><strong>${p.total_qty} Adet</strong></td>
              <td class="highlight-cyan font-mono"><strong>${(p.total_value_tl || 0).toLocaleString('tr-TR')} ₺</strong></td>
              <td>
                ${p.is_critical 
                  ? '<span class="badge badge-warning">⚠️ Kritik Seviye</span>' 
                  : '<span class="badge badge-success">✓ Yeterli</span>'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // 4. Yönetici Konsolide Özet Raporu
  else {
    if (activeTitle) activeTitle.textContent = "📈 Yönetici Konsolide İş ve Operasyon Raporu";
    const devList = data.device_report || [];
    tableContent.innerHTML = `
      <div style="padding: 16px; background: rgba(15, 23, 42, 0.4); border-radius: var(--radius-md); margin-bottom: 20px;">
        <h4 style="margin: 0 0 10px 0; color: var(--text-main);">Özet Operasyon Karnesi</h4>
        <p class="text-sm text-dim" style="line-height: 1.6;">
          Teknik servis bünyesinde şu ana kadar toplam <strong>${data.kpis.total_orders} adet iş emri</strong> açılmış olup, 
          <strong>${data.kpis.completed_orders} adedi başarıyla tamamlanmıştır</strong>. 
          Üretilen toplam brüt ciro <strong>${(data.kpis.total_revenue_tl || 0).toLocaleString('tr-TR')} ₺</strong> seviyesindedir. 
          Envanterde takip edilen toplam stok değeri <strong>${(data.kpis.total_inventory_value_tl || 0).toLocaleString('tr-TR')} ₺</strong> olup, 
          acil ikmal yapılması gereken <strong>${data.kpis.critical_stock_count} kalem kritik parça</strong> tespit edilmiştir.
        </p>
      </div>
      <table class="rep-table" id="exportable-table">
        <thead>
          <tr>
            <th>Takip Kodu</th>
            <th>Cihaz</th>
            <th>Müşteri</th>
            <th>Sorumlu Personel</th>
            <th>Süreç Durumu</th>
            <th>Fatura Tutarı</th>
          </tr>
        </thead>
        <tbody>
          ${devList.map(d => `
            <tr>
              <td><code>#${d.tracking_code}</code></td>
              <td><strong>${d.device_brand} ${d.device_model}</strong></td>
              <td>${d.customer_name}</td>
              <td>${d.assigned_tech}</td>
              <td><span class="badge ${d.status === 'Tamamlandı' ? 'badge-success' : 'badge-warning'}">${d.status}</span></td>
              <td class="highlight-cyan font-mono"><strong>${(d.total_cost || 0).toLocaleString('tr-TR')} ₺</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

function exportReportToCSV() {
  const table = document.getElementById('exportable-table');
  if (!table) {
    showToast("⚠️ Dışa aktarılacak aktif rapor tablosu bulunamadı.");
    return;
  }

  const rows = Array.from(table.querySelectorAll('tr'));
  const csvContent = rows.map(row => {
    const cols = Array.from(row.querySelectorAll('th, td'));
    return cols
      .map(col => {
        let text = col.innerText.replace(/"/g, '""').trim();
        if (text.includes("İşleri Gör") || text.includes("WhatsApp")) {
          text = "";
        }
        return `"${text}"`;
      })
      .filter((_, idx) => idx < cols.length)
      .join(';');
  }).join('\r\n');

  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const now = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `FUNZerviceTech_Teknik_Rapor_${now}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("📥 Excel / CSV rapor dosyası başarıyla indirildi!");
}

function initReportsEngine() {
  const btnRun = document.getElementById('btn-run-custom-report');
  const btnExport = document.getElementById('btn-export-csv');
  const btnPrint = document.getElementById('btn-print-report');
  const reportTypeSelect = document.getElementById('report-type-select');
  const staffFilter = document.getElementById('report-staff-filter');
  const statusFilter = document.getElementById('report-status-filter');
  const criticalOnly = document.getElementById('report-critical-only');

  // Personel dropdown'ını dinamik doldur
  updateReportStaffDropdown();

  // Custom Select Dropdown UI (Windows / Chromium yatay kaydırma ve harf kesilme sorununu kökten çözen modern UI)
  if (typeof initCustomSelect === 'function') {
    if (reportTypeSelect) initCustomSelect(reportTypeSelect);
    if (staffFilter) initCustomSelect(staffFilter);
    if (statusFilter) initCustomSelect(statusFilter);
  }

  if (btnRun) {
    btnRun.addEventListener('click', () => {
      executeCustomReport();
      showToast("🔍 Özel değişkenli rapor başarıyla derlendi!");
    });
  }

  // Tüm filtrelerin değişiminde otomatik ve anlık rapor güncelleme
  if (reportTypeSelect) {
    reportTypeSelect.addEventListener('change', () => {
      executeCustomReport();
    });
  }

  if (staffFilter) {
    staffFilter.addEventListener('change', () => {
      executeCustomReport();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener('change', () => {
      executeCustomReport();
    });
  }

  if (criticalOnly) {
    criticalOnly.addEventListener('change', () => {
      executeCustomReport();
    });
  }

  if (btnExport) {
    btnExport.addEventListener('click', exportReportToCSV);
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      document.body.classList.remove('printing-label', 'printing-expert-report');
      document.body.classList.add('printing-report');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-report');
      }, 1000);
    });
  }

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-label', 'printing-report', 'printing-expert-report');
  });

  executeCustomReport();
}

// ==================== 14. Personel Yönetimi (İşe Giriş & Çıkış) ====================
function initStaffManagement() {
  const btnOpenEntry = document.getElementById('btn-open-staff-entry-modal');
  const entryModal = document.getElementById('staff-entry-modal');
  const btnCloseEntry = document.getElementById('btn-close-staff-entry-modal');
  const btnCancelEntry = document.getElementById('btn-cancel-staff-entry');
  const formEntry = document.getElementById('form-staff-entry');

  const exitModal = document.getElementById('staff-exit-modal');
  const btnCloseExit = document.getElementById('btn-close-staff-exit-modal');
  const btnCancelExit = document.getElementById('btn-cancel-staff-exit');
  const formExit = document.getElementById('form-staff-exit');

  // Personel İşe Giriş Modal Açma
  if (btnOpenEntry && entryModal) {
    btnOpenEntry.addEventListener('click', () => {
      updateStaffEntryVehicleDropdown();
      entryModal.style.display = 'flex';
      const nameInp = document.getElementById('staff-entry-name');
      if (nameInp) setTimeout(() => nameInp.focus(), 50);
    });

    if (btnCloseEntry) btnCloseEntry.addEventListener('click', () => { entryModal.style.display = 'none'; });
    if (btnCancelEntry) btnCancelEntry.addEventListener('click', () => { entryModal.style.display = 'none'; });
    entryModal.addEventListener('click', (e) => {
      if (e.target === entryModal) entryModal.style.display = 'none';
    });

    if (formEntry) {
      formEntry.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('staff-entry-name').value.trim();
        const role = document.getElementById('staff-entry-role').value;
        const specialty = document.getElementById('staff-entry-specialty').value.trim();
        const phone = document.getElementById('staff-entry-phone').value.trim();
        const email = document.getElementById('staff-entry-email').value.trim();
        const location = document.getElementById('staff-entry-location').value.trim();
        const vehiclePlate = document.getElementById('staff-entry-vehicle').value.trim();
        const status = document.getElementById('staff-entry-status').value;

        // Avatar harfleri üret (Örn: Levent Ersöz -> LE)
        const parts = name.split(' ');
        const avatar = (parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
        const newId = Math.floor(Math.random() * 800 + 100);

        const newStaff = {
          id: newId,
          name: name,
          role: role,
          specialty: specialty,
          phone: phone,
          email: email || `${name.toLowerCase().replace(/ /g, '.')}@kocasteknik.com`,
          status: status,
          address: location,
          baseAddress: location,
          location: `${location} (Merkeze bağlı)`,
          vehiclePlate: vehiclePlate || "Zimmetsiz",
          avatar: avatar,
          distanceKm: parseFloat((Math.random() * 5 + 1.5).toFixed(1))
        };

        // Eğer araç seçildiyse state.vehicles içinde aracı bu personele zimmetle
        if (vehiclePlate) {
          const veh = state.vehicles.find(v => v.plate === vehiclePlate);
          if (veh) {
            veh.driverId = newId;
            veh.driverName = name;
          }
        }

        state.staff.push(newStaff);
        saveStaffToLocalStorage();
        saveVehiclesToLocalStorage();

        // Backend senkronizasyonu
        try {
          await fetch(`${API_BASE_URL}/api/staff`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              full_name: name,
              role: role,
              specialty: specialty,
              phone: phone,
              email: newStaff.email,
              vehicle_plate: vehiclePlate,
              status: status
            })
          });
        } catch (err) {}

        renderStaffList();
        updateFleetKPI();
        populateActiveTechDropdown();
        updateVehiclePartDropdown();
        populateMapTechDropdown();
        selectMapTech(newId);
        entryModal.style.display = 'none';
        formEntry.reset();
        showToast(`🎉 ${name} (${role}) başarıyla sisteme kaydedildi, harita radarına ve araç sevk listesine dahil edildi!`);
      });
    }
  }

  // Personel İşten Çıkış Modalı
  if (exitModal) {
    const btnSubmitExit = document.getElementById('btn-submit-staff-exit');

    const closeExitModal = () => {
      exitModal.style.display = 'none';
      if (formExit) formExit.reset();
    };

    if (btnCloseExit) btnCloseExit.addEventListener('click', closeExitModal);
    if (btnCancelExit) btnCancelExit.addEventListener('click', closeExitModal);
    exitModal.addEventListener('click', (e) => {
      if (e.target === exitModal) closeExitModal();
    });

    const handleStaffExit = async (e) => {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }

      const staffIdVal = document.getElementById('staff-exit-id').value;
      const staffId = parseInt(staffIdVal);
      let person = state.staff.find(s => s.id == staffId || String(s.id) === String(staffIdVal));
      if (!person) {
        const nameEl = document.getElementById('staff-exit-name');
        if (nameEl && nameEl.textContent) {
          person = state.staff.find(s => s.name === nameEl.textContent.trim());
        }
      }

      if (!person) {
        showToast("⚠️ İşlem yapılacak personel sistemde bulunamadı.");
        closeExitModal();
        return;
      }

      const freeVehicle = document.getElementById('staff-exit-free-vehicle') ? document.getElementById('staff-exit-free-vehicle').checked : true;
      const reassignJobs = document.getElementById('staff-exit-reassign-jobs') ? document.getElementById('staff-exit-reassign-jobs').checked : true;
      const exitReasonEl = document.getElementById('staff-exit-reason');
      const exitReason = exitReasonEl ? exitReasonEl.value : 'Ayrılış';

      // 1. Aracı boşa çıkar ve havuz statüsüne al
      if (freeVehicle && person.vehiclePlate && person.vehiclePlate !== "Zimmetsiz") {
        const veh = (state.vehicles || []).find(v => v.plate === person.vehiclePlate || (v.driverId && v.driverId == person.id));
        if (veh) {
          veh.driverId = null;
          veh.driverName = "Boşta / Zimmetsiz";
          veh.status = "Merkezde Hazır";
        }
        person.vehiclePlate = "Zimmetsiz";
      }

      // 2. Açık işleri Sevk Masası Havuzuna aktar
      if (reassignJobs) {
        if (state.workOrders && state.workOrders.length > 0) {
          state.workOrders.forEach(o => {
            if (o.assigned_user_id == staffId || o.assigned_tech === person.name) {
              o.assigned_tech = null;
              o.assigned_user_id = null;
              o.status = "Kabul Edildi";
            }
          });
        }

        if (state.staffJobs && state.staffJobs[person.id]) {
          state.staffJobs[person.id] = [];
        }
      }

      // 3. Personeli sistemden ayrıldı statüsüne al ve aktif kadrodan çıkar
      person.status = "Ayrıldı";
      state.staff = state.staff.filter(s => s.id != person.id);

      // Çıkış yapan personeli localStorage kara listesine ekle (yeniden hortlamasın)
      try {
        const terminated = JSON.parse(localStorage.getItem('servisai_staff_terminated') || '[]');
        if (!terminated.includes(person.id)) terminated.push(person.id);
        localStorage.setItem('servisai_staff_terminated', JSON.stringify(terminated));
      } catch (err) {}

      saveStaffToLocalStorage();
      saveVehiclesToLocalStorage();

      // Modalı anında kapat ve UI'yı güncelle (Kullanıcıyı bekletmez)
      closeExitModal();
      renderStaffList();
      renderIncomingCalls();
      updateFleetKPI();
      if (typeof populateMapTechDropdown === 'function') {
        populateMapTechDropdown();
      }

      // Sevk afişini güncelle
      const nextPending = (state.workOrders || []).find(o => !o.assigned_tech || o.status === 'Kabul Edildi') || (state.workOrders ? state.workOrders[0] : null);
      updateDispatchBanner(nextPending, null);
      showToast(`🚪 ${person.name} personelinin işten çıkış işlemi tamamlandı. Atanan işler Sevk Masası Havuzuna devredildi.`);

      // Arka plan senkronizasyonu
      fetch(`${API_BASE_URL}/api/staff/${person.id}/terminate`, { method: 'POST' }).catch(() => {});
    };

    if (formExit) {
      formExit.addEventListener('submit', handleStaffExit);
    }
    if (btnSubmitExit) {
      btnSubmitExit.addEventListener('click', handleStaffExit);
    }
  }
}

function openStaffExitModal(staffId) {
  const person = state.staff.find(s => s.id == staffId);
  if (!person) return;

  const modal = document.getElementById('staff-exit-modal');
  if (!modal) return;

  document.getElementById('staff-exit-id').value = staffId;
  const avatarEl = document.getElementById('staff-exit-avatar');
  if (avatarEl) avatarEl.textContent = person.avatar;
  const nameEl = document.getElementById('staff-exit-name');
  if (nameEl) nameEl.textContent = person.name;
  const metaEl = document.getElementById('staff-exit-meta');
  if (metaEl) metaEl.textContent = `${person.role || 'Saha Personeli'} • 🚗 Araç: ${person.vehiclePlate || 'Zimmetsiz'}`;

  // Bugünün tarihini ata
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('staff-exit-date');
  if (dateInput) dateInput.value = today;

  // Atanmış işleri hem state.staffJobs hem de state.workOrders üzerinden kontrol et
  const jobsInStaffJobs = (state.staffJobs && state.staffJobs[staffId]) ? state.staffJobs[staffId] : [];
  const jobsInWorkOrders = (state.workOrders || []).filter(o => o.assigned_user_id === staffId || o.assigned_tech === person.name);
  const totalActiveJobs = Math.max(jobsInStaffJobs.length, jobsInWorkOrders.length);

  const alertEl = document.getElementById('staff-exit-jobs-alert');
  if (alertEl) {
    if (totalActiveJobs > 0) {
      alertEl.innerHTML = `⚠️ Bu personele atanmış <strong>${totalActiveJobs} aktif iş emri</strong> bulunmaktadır. Çıkış onaylandığında bu işler otomatik olarak <em>Sevk Masası Havuzuna</em> iade edilecektir.`;
      alertEl.style.display = 'block';
    } else {
      alertEl.innerHTML = `✅ Personele atanmış açık bir iş emri bulunmamaktadır. Çıkış doğrudan yapılabilir.`;
      alertEl.style.display = 'block';
    }
  }

  modal.style.display = 'flex';
}

function updateStaffEntryVehicleDropdown() {
  const select = document.getElementById('staff-entry-vehicle');
  if (!select) return;

  let html = `<option value="">Araçsız / Havuz Aracı Kullanacak</option>`;
  if (state.vehicles && state.vehicles.length > 0) {
    state.vehicles.forEach(v => {
      const isAssigned = v.driverName && !v.driverName.includes("Boşta") && !v.driverName.includes("Zimmetsiz");
      const statusNote = isAssigned ? `(Mevcut: ${v.driverName})` : `(Boşta)`;
      html += `<option value="${v.plate}">🚗 ${v.plate} - ${v.model} ${statusNote}</option>`;
    });
  }
  select.innerHTML = html;
}

// ==================== 15. Servis Araçları & Filo Yönetimi ====================
function initFleetManagement() {
  const btnOpenFleet = document.getElementById('btn-open-fleet-modal');
  const btnKpiFleet = document.getElementById('kpi-card-fleet');
  const fleetModal = document.getElementById('fleet-modal');
  const btnCloseFleet = document.getElementById('btn-close-fleet-modal');
  const btnCloseFleetFooter = document.getElementById('btn-close-fleet-footer');
  const formVehicle = document.getElementById('form-new-vehicle');

  const openModal = () => {
    updateFleetDriverDropdown();
    renderFleetCards();
    fleetModal.style.display = 'flex';
  };

  if (btnOpenFleet && fleetModal) btnOpenFleet.addEventListener('click', openModal);
  if (btnKpiFleet && fleetModal) btnKpiFleet.addEventListener('click', openModal);

  if (btnCloseFleet && fleetModal) btnCloseFleet.addEventListener('click', () => { fleetModal.style.display = 'none'; });
  if (btnCloseFleetFooter && fleetModal) btnCloseFleetFooter.addEventListener('click', () => { fleetModal.style.display = 'none'; });
  if (fleetModal) {
    fleetModal.addEventListener('click', (e) => {
      if (e.target === fleetModal) fleetModal.style.display = 'none';
    });
  }

  // Yeni Araç Kaydetme
  if (formVehicle) {
    formVehicle.addEventListener('submit', async (e) => {
      e.preventDefault();
      const plate = document.getElementById('fleet-new-plate').value.trim().toUpperCase();
      const model = document.getElementById('fleet-new-model').value.trim();
      const type = document.getElementById('fleet-new-type').value;
      const driverIdStr = document.getElementById('fleet-new-driver').value;
      const status = document.getElementById('fleet-new-status').value;

      if (state.vehicles.some(v => v.plate === plate)) {
        showToast(`⚠️ ${plate} plakalı araç zaten filoda kayıtlı!`);
        return;
      }

      let driverId = driverIdStr ? parseInt(driverIdStr) : null;
      let driverName = "Boşta / Zimmetsiz";
      if (driverId) {
        const driver = state.staff.find(s => s.id === driverId);
        if (driver) {
          driverName = driver.name;
          driver.vehiclePlate = plate;
        }
      }

      const newVehicle = {
        id: Math.floor(Math.random() * 800 + 100),
        plate: plate,
        model: model,
        type: type,
        driverId: driverId,
        driverName: driverName,
        status: status
      };

      state.vehicles.push(newVehicle);
      saveVehiclesToLocalStorage();
      saveStaffToLocalStorage();

      // Backend kaydı
      try {
        await fetch(`${API_BASE_URL}/api/vehicles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vehicle_plate: plate,
            model: model,
            responsible_user_id: driverId
          })
        });
      } catch (err) {}

      renderFleetCards();
      renderStaffList();
      updateFleetKPI();
      updateFleetDriverDropdown();
      formVehicle.reset();
      showToast(`🚗 ${plate} plakalı ${model} aracı başarıyla filoya eklendi.`);
    });
  }
}

function renderFleetCards() {
  const container = document.getElementById('fleet-cards-container');
  if (!container) return;

  const badgeEl = document.getElementById('fleet-active-badge');
  if (badgeEl) badgeEl.textContent = `${state.vehicles.length} Araç Kayıtlı`;

  if (state.vehicles.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 24px;">Henüz kayıtlı servis aracı bulunmuyor.</div>`;
    return;
  }

  container.innerHTML = state.vehicles.map(v => {
    const isAssigned = v.driverName && !v.driverName.includes("Boşta") && !v.driverName.includes("Zimmetsiz");
    const statusChip = v.status === "Sahada Aktif" 
      ? '<span class="badge badge-success">Sahada Aktif</span>'
      : v.status === "Merkezde Hazır"
        ? '<span class="badge badge-info">Merkezde Hazır</span>'
        : '<span class="badge badge-warning">Periyodik Bakımda</span>';

    // Bu araçtaki toplam yedek parça sayısı (state.stock üzerinden)
    let partStockCount = 0;
    if (v.plate.includes("101")) {
      partStockCount = state.stock.reduce((acc, curr) => acc + (curr.vehicle1 || 0), 0);
    } else if (v.plate.includes("202")) {
      partStockCount = state.stock.reduce((acc, curr) => acc + (curr.vehicle2 || 0), 0);
    } else {
      partStockCount = 0;
    }

    const vehIcon = getVehicleIcon(v.type);

    return `
      <div class="fleet-vehicle-card" data-plate="${v.plate}">
        <div class="fleet-vehicle-header">
          <div class="plate-badge">
            <span class="plate-tr">TR</span>
            <span>${v.plate}</span>
          </div>
          ${statusChip}
        </div>
        <div class="fleet-vehicle-body">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 1.15rem;">${vehIcon}</span>
            <strong style="color: var(--text-main); font-size: 0.88rem;">${v.model}</strong>
          </div>
          <span style="font-size: 0.78rem; color: var(--accent-cyan); display: block; margin-top: 2px;">${v.type}</span>
          <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
            <span>👤 Sorumlu:</span>
            <strong style="color: ${isAssigned ? 'var(--text-main)' : 'var(--accent-amber)'};">
              ${v.driverName}
            </strong>
          </div>
        </div>
        <div class="fleet-vehicle-footer">
          <span style="color: var(--text-muted);">📦 Araç Stoğu: <strong>${partStockCount} Adet</strong></span>
          <div style="display: flex; gap: 6px; align-items: center;">
            <button class="btn btn-primary btn-sm btn-manage-vehicle" data-plate="${v.plate}" title="Aracı geri al, başka elemana ver veya durumunu değiştir" style="padding: 2px 8px; font-size: 0.72rem;">
              ⚙️ İşlem & Zimmet
            </button>
            <button class="btn btn-outline btn-sm btn-delete-vehicle" data-plate="${v.plate}" title="Aracı filodan çıkar ve parçaları Merkeze devret" style="color: var(--accent-rose); border-color: rgba(244,63,94,0.3); padding: 2px 8px; font-size: 0.72rem;">
              ❌ Sil
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Araç Kartı veya İşlem Butonuna Tıklanınca Operasyon & Zimmet Modalını Aç
  container.querySelectorAll('.fleet-vehicle-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-delete-vehicle')) return;
      const plate = card.getAttribute('data-plate');
      openVehicleActionModal(plate);
    });
  });

  // Filodan Çıkarma Butonları
  container.querySelectorAll('.btn-delete-vehicle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const plate = e.currentTarget.getAttribute('data-plate');
      handleDeleteVehicle(plate);
    });
  });
}

function updateFleetDriverDropdown() {
  const select = document.getElementById('fleet-new-driver');
  if (!select) return;

  let html = `<option value="">Boşta / Zimmetsiz (Havuz Aracı)</option>`;
  state.staff.filter(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı').forEach(person => {
    const hasVehicle = person.vehiclePlate && person.vehiclePlate !== "Zimmetsiz";
    const note = hasVehicle ? `(Şu an: ${person.vehiclePlate})` : `(Zimmetsiz - Müsait)`;
    html += `<option value="${person.id}">${person.name} - ${person.role} ${note}</option>`;
  });
  select.innerHTML = html;
}

async function handleDeleteVehicle(plate) {
  const veh = state.vehicles.find(v => v.plate === plate);
  if (!veh) return;

  const confirmMsg = `🚗 ${plate} (${veh.model}) aracını filodan çıkarmak istediğinize emin misiniz?\n\n• Araçtaki mevcut parça stokları otomatik olarak Merkez Ana Depo'ya iade edilecektir.\n• Varsa personelin araç zimmeti kaldırılacaktır.`;
  if (!confirm(confirmMsg)) return;

  // 1. Parçaları merkeze aktar
  if (plate.includes("101")) {
    state.stock.forEach(p => {
      if (p.vehicle1 > 0) {
        p.central += p.vehicle1;
        p.vehicle1 = 0;
      }
    });
  } else if (plate.includes("202")) {
    state.stock.forEach(p => {
      if (p.vehicle2 > 0) {
        p.central += p.vehicle2;
        p.vehicle2 = 0;
      }
    });
  }

  // 2. Personelin zimmetini kaldır
  const assignedStaff = state.staff.find(s => s.vehiclePlate === plate);
  if (assignedStaff) {
    assignedStaff.vehiclePlate = "Zimmetsiz";
  }

  // 3. Araçlar listesinden sil
  state.vehicles = state.vehicles.filter(v => v.plate !== plate);
  saveVehiclesToLocalStorage();
  saveStaffToLocalStorage();

  // Backend senkronizasyonu
  try {
    await fetch(`${API_BASE_URL}/api/vehicles/${plate}`, { method: 'DELETE' });
  } catch (err) {}

  renderFleetCards();
  renderStaffList();
  renderStockTable();
  updateFleetKPI();
  updateVehiclePartDropdown();
  showToast(`🚗 ${plate} aracı filodan çıkarıldı. Araçtaki tüm stoklar Merkez Depo'ya iade edildi.`);
}

function updateFleetKPI() {
  const elCount = document.getElementById('kpi-fleet-count');
  const elSub = document.getElementById('kpi-fleet-subtext');
  if (!elCount) return;

  const activeVehicles = state.vehicles.filter(v => v.status === "Sahada Aktif").length;
  elCount.textContent = `${state.vehicles.length} Araç / Ekip`;
  if (elSub) elSub.textContent = `${activeVehicles} aktif mobil depo görevde`;
}

// ==================== 15.B Servis Araçları Zimmet & Operasyon Yönetimi ====================
let currentActionVehiclePlate = null;
let currentStaffVehicleId = null;

/**
 * Bir aracı personele zimmetler.
 * Personelin eski aracı varsa havuza çeker; aracın eski sürücüsü varsa boşa çıkarır.
 */
async function assignVehicleToStaff(plate, staffId) {
  const veh = state.vehicles.find(v => v.plate === plate);
  const targetStaff = state.staff.find(s => s.id === staffId);
  if (!veh || !targetStaff) return false;

  // 1. Bu aracın önceki sürücüsü varsa onun zimmetini kaldır
  const previousDriver = state.staff.find(s => s.vehiclePlate === plate && s.id !== staffId);
  if (previousDriver) {
    previousDriver.vehiclePlate = "Zimmetsiz";
  }

  // 2. Hedef personelin elinde başka bir araç varsa o aracı boşa çıkar
  let previousVehicle = null;
  if (targetStaff.vehiclePlate && targetStaff.vehiclePlate !== "Zimmetsiz" && targetStaff.vehiclePlate !== plate) {
    previousVehicle = state.vehicles.find(v => v.plate === targetStaff.vehiclePlate);
    if (previousVehicle) {
      previousVehicle.driverId = null;
      previousVehicle.driverName = "Boşta / Zimmetsiz";
      if (previousVehicle.status === "Sahada Aktif") {
        previousVehicle.status = "Merkezde Hazır";
      }
    }
  }

  // 3. Aracı hedef personele bağla
  veh.driverId = targetStaff.id;
  veh.driverName = targetStaff.name;
  if (veh.status === "Merkezde Hazır") {
    veh.status = "Sahada Aktif";
  }
  targetStaff.vehiclePlate = plate;

  saveVehiclesToLocalStorage();
  saveStaffToLocalStorage();

  // 4. Backend API senkronizasyonu
  try {
    await fetch(`${API_BASE_URL}/api/vehicles/${plate}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        responsible_user_id: targetStaff.id,
        status: veh.status
      })
    });
    if (previousVehicle) {
      await fetch(`${API_BASE_URL}/api/vehicles/${previousVehicle.plate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responsible_user_id: null,
          status: previousVehicle.status
        })
      });
    }
  } catch (err) {
    console.warn("Backend araç atama API senkronizasyonu başarısız, yerel durum güncellendi:", err);
  }

  renderFleetCards();
  renderStaffList();
  updateFleetKPI();
  updateFleetDriverDropdown();
  populateMapTechDropdown();
  populateActiveTechDropdown();
  updateActiveTechProfileHeader();
  return true;
}

/**
 * Aracın zimmetini kaldırıp havuza (merkeze) çeker.
 */
async function unassignVehicle(plate) {
  const veh = state.vehicles.find(v => v.plate === plate);
  if (!veh) return false;

  const assignedStaff = state.staff.find(s => s.vehiclePlate === plate || s.id === veh.driverId);
  if (assignedStaff) {
    assignedStaff.vehiclePlate = "Zimmetsiz";
  }

  veh.driverId = null;
  veh.driverName = "Boşta / Zimmetsiz";
  if (veh.status === "Sahada Aktif") {
    veh.status = "Merkezde Hazır";
  }

  saveVehiclesToLocalStorage();
  saveStaffToLocalStorage();

  try {
    await fetch(`${API_BASE_URL}/api/vehicles/${plate}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        responsible_user_id: null,
        status: veh.status
      })
    });
  } catch (err) {
    console.warn("Backend araç geri alma API senkronizasyonu başarısız:", err);
  }

  renderFleetCards();
  renderStaffList();
  updateFleetKPI();
  updateFleetDriverDropdown();
  populateMapTechDropdown();
  populateActiveTechDropdown();
  updateActiveTechProfileHeader();
  return true;
}

/**
 * Araç çalışma veya bakım durumunu günceller.
 */
async function updateVehicleStatus(plate, newStatus) {
  const veh = state.vehicles.find(v => v.plate === plate);
  if (!veh) return false;

  veh.status = newStatus;
  saveVehiclesToLocalStorage();

  try {
    await fetch(`${API_BASE_URL}/api/vehicles/${plate}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: newStatus
      })
    });
  } catch (err) {
    console.warn("Backend araç durum güncelleme başarısız:", err);
  }

  renderFleetCards();
  renderStaffList();
  updateFleetKPI();
  return true;
}

/**
 * Araç Operasyon & Zimmet Modalı (Araç merkezli açılır)
 */
function openVehicleActionModal(plate) {
  const veh = state.vehicles.find(v => v.plate === plate);
  if (!veh) return;

  currentActionVehiclePlate = plate;
  const modal = document.getElementById('vehicle-action-modal');
  if (!modal) return;

  // Başlık ve Temel Bilgiler
  const elPlate = document.getElementById('veh-action-plate');
  const elStatus = document.getElementById('veh-action-status-badge');
  const elModel = document.getElementById('veh-action-model');
  const elType = document.getElementById('veh-action-type');
  const elDriver = document.getElementById('veh-action-driver');
  const elStockText = document.getElementById('veh-action-stock-text');

  if (elPlate) elPlate.textContent = veh.plate;
  if (elModel) elModel.textContent = veh.model;
  if (elType) elType.textContent = veh.type;
  if (elDriver) {
    const isAssigned = veh.driverName && !veh.driverName.includes("Boşta") && !veh.driverName.includes("Zimmetsiz");
    elDriver.textContent = veh.driverName || "Boşta / Zimmetsiz";
    elDriver.style.color = isAssigned ? "var(--accent-cyan)" : "var(--accent-amber)";
  }

  if (elStatus) {
    elStatus.textContent = veh.status;
    elStatus.className = 'badge ' + (
      veh.status === "Sahada Aktif" ? "badge-success" :
      veh.status === "Merkezde Hazır" ? "badge-info" : "badge-warning"
    );
  }

  // Araçtaki parça sayısı
  let partCount = 0;
  if (veh.plate.includes("101")) {
    partCount = state.stock.reduce((acc, curr) => acc + (curr.vehicle1 || 0), 0);
  } else if (veh.plate.includes("202")) {
    partCount = state.stock.reduce((acc, curr) => acc + (curr.vehicle2 || 0), 0);
  }
  if (elStockText) {
    elStockText.textContent = `📦 Araçta ${partCount} Adet Parça Yüklü`;
  }

  // Zimmetlenecek Personel Seçim Menüsü
  const selectStaff = document.getElementById('veh-action-target-staff');
  if (selectStaff) {
    let opts = `<option value="">-- Personel Seçin --</option>`;
    state.staff.filter(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı').forEach(person => {
      const isCurrent = person.id === veh.driverId || person.vehiclePlate === veh.plate;
      const note = isCurrent ? " ⭐ (Şu anki Sorumlu)" : (person.vehiclePlate && person.vehiclePlate !== "Zimmetsiz" ? ` (${person.vehiclePlate} zimmetli)` : " (Zimmetsiz)");
      opts += `<option value="${person.id}" ${isCurrent ? 'selected' : ''}>${person.name} - ${person.role} ${note}</option>`;
    });
    selectStaff.innerHTML = opts;
  }

  // Zimmet Geri Alma Bölümü
  const unassignSection = document.getElementById('veh-unassign-section');
  const isAssigned = veh.driverId || (veh.driverName && !veh.driverName.includes("Boşta") && !veh.driverName.includes("Zimmetsiz"));
  if (unassignSection) {
    unassignSection.style.display = isAssigned ? 'block' : 'none';
  }

  // Durum Butonları Aktif Seçim Vurgusu
  const statusButtons = modal.querySelectorAll('.btn-status-option');
  statusButtons.forEach(btn => {
    const btnStatus = btn.getAttribute('data-status');
    if (btnStatus === veh.status) {
      btn.classList.add('is-selected');
    } else {
      btn.classList.remove('is-selected');
    }
  });

  modal.style.display = 'flex';
}

function initVehicleActionModal() {
  const modal = document.getElementById('vehicle-action-modal');
  if (!modal) return;

  const btnClose = document.getElementById('btn-close-vehicle-action-modal');
  const btnCloseFooter = document.getElementById('btn-close-veh-action-modal');
  const closeModal = () => { modal.style.display = 'none'; };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 1. Aracı Başka Elemana Verme
  const btnAssign = document.getElementById('btn-veh-assign-driver');
  if (btnAssign) {
    btnAssign.addEventListener('click', async () => {
      if (!currentActionVehiclePlate) return;
      const selectStaff = document.getElementById('veh-action-target-staff');
      const staffId = selectStaff ? parseInt(selectStaff.value) : null;
      if (!staffId) {
        showToast("⚠️ Lütfen aracı devretmek istediğiniz personeli seçin.");
        return;
      }
      const staff = state.staff.find(s => s.id === staffId);
      await assignVehicleToStaff(currentActionVehiclePlate, staffId);
      showToast(`🚗 ${currentActionVehiclePlate} plakalı araç ${staff ? staff.name : 'personele'} başarıyla zimmetlendi.`);
      openVehicleActionModal(currentActionVehiclePlate);
    });
  }

  // 2. Aracı Geri Alma (Boşa Çıkarma)
  const btnUnassign = document.getElementById('btn-veh-unassign-driver');
  if (btnUnassign) {
    btnUnassign.addEventListener('click', async () => {
      if (!currentActionVehiclePlate) return;
      await unassignVehicle(currentActionVehiclePlate);
      showToast(`🔄 ${currentActionVehiclePlate} plakalı araç personelden geri alındı ve merkez araç havuzuna aktarıldı.`);
      openVehicleActionModal(currentActionVehiclePlate);
    });
  }

  // 3. Durum Değiştirme (Sahada Aktif, Merkezde Hazır, Periyodik Bakımda)
  const statusButtons = modal.querySelectorAll('.btn-status-option');
  statusButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!currentActionVehiclePlate) return;
      const newStatus = btn.getAttribute('data-status');
      await updateVehicleStatus(currentActionVehiclePlate, newStatus);
      showToast(`🛠️ ${currentActionVehiclePlate} plakalı aracın durumu "${newStatus}" olarak güncellendi.`);
      openVehicleActionModal(currentActionVehiclePlate);
    });
  });

  // 4. Filodan Çıkarma Butonu
  const btnDelete = document.getElementById('btn-veh-action-delete');
  if (btnDelete) {
    btnDelete.addEventListener('click', async () => {
      if (!currentActionVehiclePlate) return;
      const plate = currentActionVehiclePlate;
      closeModal();
      await handleDeleteVehicle(plate);
    });
  }
}

/**
 * Personel Araç Zimmet Kartı Modalı (Sevk masasından personel merkezli açılır)
 */
function openStaffVehicleModal(staffId) {
  const person = state.staff.find(s => s.id === staffId);
  if (!person) return;

  currentStaffVehicleId = staffId;
  const modal = document.getElementById('staff-vehicle-modal');
  if (!modal) return;

  // Personel Bilgilerini Doldur
  const elAvatar = document.getElementById('staff-veh-avatar');
  const elName = document.getElementById('staff-veh-name');
  const elRole = document.getElementById('staff-veh-role');
  const elCurrentPlate = document.getElementById('staff-veh-current-plate-badge');
  const elTitle = document.getElementById('staff-veh-modal-title');

  if (elTitle) elTitle.textContent = `🚗 ${person.name} - Araç Zimmet Kartı`;
  if (elAvatar) elAvatar.textContent = person.avatar || person.name.slice(0, 2).toUpperCase();
  if (elName) elName.textContent = person.name;
  if (elRole) elRole.textContent = `${person.role} • ${person.specialty || 'Genel Saha Uzmanı'}`;

  const hasVehicle = person.vehiclePlate && person.vehiclePlate !== "Zimmetsiz";
  if (elCurrentPlate) {
    if (hasVehicle) {
      const veh = state.vehicles.find(v => v.plate === person.vehiclePlate);
      const modelStr = veh ? `(${veh.model})` : '';
      elCurrentPlate.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="plate-badge" style="font-size: 0.9rem;"><span class="plate-tr">TR</span> ${person.vehiclePlate}</span>
          <span class="text-xs text-cyan" style="font-weight: 600;">${modelStr}</span>
        </div>
      `;
    } else {
      elCurrentPlate.innerHTML = `<span class="badge badge-warning">Zimmetsiz / Araç Tahsis Edilmemiş</span>`;
    }
  }

  // Filodan Araç Seçim Menüsünü Doldur (Boşta olanlar öncelikli)
  const selectFleet = document.getElementById('staff-veh-select-fleet');
  if (selectFleet) {
    let opts = `<option value="">-- Filodan Bir Servis Aracı Seçin --</option>`;
    
    // 1. Grup: Havuzda Boşta / Zimmetsiz Araçlar
    const idleVehicles = state.vehicles.filter(v => !v.driverId || (v.driverName && (v.driverName.includes("Boşta") || v.driverName.includes("Zimmetsiz"))));
    if (idleVehicles.length > 0) {
      opts += `<optgroup label="🟢 Havuzdaki Müsait Araçlar">`;
      idleVehicles.forEach(v => {
        const icon = getVehicleIcon(v.type);
        opts += `<option value="${v.plate}">🟢 ${icon} ${v.plate} - ${v.model} (${v.type}) [Müsait]</option>`;
      });
      opts += `</optgroup>`;
    }

    // 2. Grup: Diğer Araçlar (Zaten başka personelde olanlar)
    const assignedVehicles = state.vehicles.filter(v => v.driverId && v.driverName && !v.driverName.includes("Boşta") && !v.driverName.includes("Zimmetsiz"));
    if (assignedVehicles.length > 0) {
      opts += `<optgroup label="🔄 Başka Personeldeki Araçlar (Devralınabilir)">`;
      assignedVehicles.forEach(v => {
        const isCurrentPerson = v.plate === person.vehiclePlate;
        const icon = getVehicleIcon(v.type);
        opts += `<option value="${v.plate}" ${isCurrentPerson ? 'disabled' : ''}>🔄 ${icon} ${v.plate} - ${v.model} (${v.driverName} üzerinde)</option>`;
      });
      opts += `</optgroup>`;
    }

    selectFleet.innerHTML = opts;
  }

  // Geri Alma Bölümü (Personelin aracı varsa göster)
  const takeBackBlock = document.getElementById('staff-veh-take-back-block');
  if (takeBackBlock) {
    takeBackBlock.style.display = hasVehicle ? 'block' : 'none';
  }

  modal.style.display = 'flex';
}

function initStaffVehicleModal() {
  const modal = document.getElementById('staff-vehicle-modal');
  if (!modal) return;

  const btnClose = document.getElementById('btn-close-staff-vehicle-modal');
  const btnCloseFooter = document.getElementById('btn-close-staff-veh-footer');
  const closeModal = () => { modal.style.display = 'none'; };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 1. Aracı Personele Ver Butonu
  const btnGive = document.getElementById('btn-staff-veh-give');
  if (btnGive) {
    btnGive.addEventListener('click', async () => {
      if (!currentStaffVehicleId) return;
      const selectFleet = document.getElementById('staff-veh-select-fleet');
      const plate = selectFleet ? selectFleet.value : '';
      if (!plate) {
        showToast("⚠️ Lütfen personele tahsis etmek istediğiniz servis aracını seçin.");
        return;
      }
      const person = state.staff.find(s => s.id === currentStaffVehicleId);
      await assignVehicleToStaff(plate, currentStaffVehicleId);
      showToast(`🚗 ${plate} plakalı servis aracı başarıyla ${person ? person.name : 'personele'} zimmetlendi.`);
      openStaffVehicleModal(currentStaffVehicleId);
    });
  }

  // 2. Personelden Aracı Geri Al Butonu
  const btnTakeBack = document.getElementById('btn-staff-veh-take-back');
  if (btnTakeBack) {
    btnTakeBack.addEventListener('click', async () => {
      if (!currentStaffVehicleId) return;
      const person = state.staff.find(s => s.id === currentStaffVehicleId);
      if (!person || !person.vehiclePlate || person.vehiclePlate === "Zimmetsiz") {
        showToast("ℹ️ Bu personelin üzerinde kayıtlı bir servis aracı bulunmuyor.");
        return;
      }
      const plate = person.vehiclePlate;
      await unassignVehicle(plate);
      showToast(`🔄 ${person.name} personelinin ${plate} plakalı aracı geri alındı ve merkez araç havuzuna devredildi.`);
      openStaffVehicleModal(currentStaffVehicleId);
    });
  }
}

// ==================== 15.C Yedek Parça Kategori Yönetimi ====================
const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Yarı İletken & Güç", icon: "⚡", description: "IGBT, Tristör, Mosfet, Güç Kaynakları" },
  { id: "cat-2", name: "Pasif & Trafo", icon: "🔋", description: "Kondansatör, Direnç, Bobin, İzolasyon Trafosu" },
  { id: "cat-3", name: "Röle & Şalt", icon: "🔲", description: "Güç Rölesi, Kontaktör, Otomat Sigorta, Klemens" },
  { id: "cat-4", name: "Elektronik & Kart", icon: "💾", description: "Optokuplör, Mikrodenetleyici, SMD Devre Kartları" },
  { id: "cat-5", name: "Mekanik & Rulman", icon: "⚙️", description: "Rulman, Kayış, Vana, Pompa, Keçe" },
  { id: "cat-6", name: "Sensör & Termal", icon: "🌡️", description: "NTC, PT100, Termostat, Basınç Sensörü" },
  { id: "cat-7", name: "Genel Parça & Sarf", icon: "📦", description: "Kablo, Vida, Lehim, Termal Macun, Genel Sarf" }
];

function loadCustomCategories() {
  try {
    const saved = localStorage.getItem('servisai_custom_categories');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.categories = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn("Kategoriler localStorage'dan okunurken hata:", e);
  }
  state.categories = [...DEFAULT_CATEGORIES];
}

function saveCustomCategories() {
  try {
    localStorage.setItem('servisai_custom_categories', JSON.stringify(state.categories));
  } catch (e) {
    console.warn("Kategoriler kaydedilirken hata:", e);
  }
}

function loadStockFromLocalStorage() {
  try {
    const saved = localStorage.getItem('servisai_stock');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.stock = parsed;
      }
    }
  } catch (e) {
    console.warn("Stok localStorage'dan okunurken hata:", e);
  }
}

function saveStockToLocalStorage() {
  try {
    localStorage.setItem('servisai_stock', JSON.stringify(state.stock));
  } catch (e) {
    console.warn("Stok kaydedilirken hata:", e);
  }
}

function getVehicleIcon(type) {
  if (!type) return '🚗';
  const t = type.toLowerCase();
  if (t.includes('uçak') || t.includes('uçuş') || t.includes('thy') || t.includes('pegasus') || t.includes('hava')) return '✈️';
  if (t.includes('yht') || t.includes('tren') || t.includes('demiryolu') || t.includes('tcdd')) return '🚆';
  if (t.includes('otobüs') || t.includes('kamil koç') || t.includes('pamukkale') || t.includes('metro')) return '🚌';
  if (t.includes('scooter') || t.includes('motosiklet') || t.includes('motor') || t.includes('kurye')) return '🛵';
  if (t.includes('suv') || t.includes('crossover')) return '🚙';
  if (t.includes('elektrik')) return '⚡';
  if (t.includes('iklimlendirme') || t.includes('soğutma')) return '❄️';
  if (t.includes('kamyonet') || t.includes('ağır') || t.includes('nakil') || t.includes('lift')) return '🚚';
  if (t.includes('yönetici') || t.includes('operasyon')) return '🏢';
  if (t.includes('otomobil') || t.includes('binek') || t.includes('sedan') || t.includes('hatchback') || t.includes('golf') || t.includes('egea')) return '🚗';
  return '🚐';
}

function loadStaffFromLocalStorage() {
  try {
    const appMode = localStorage.getItem('servisai_app_mode');
    const saved = localStorage.getItem('servisai_staff');
    const terminated = JSON.parse(localStorage.getItem('servisai_staff_terminated') || '[]');
    if (appMode === 'clean') {
      if (saved) {
        state.staff = JSON.parse(saved) || [];
      }
      return;
    }
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Mevcut varsayılan personeli ve kullanıcının eklediklerini harmanla
        const defaultStaff = state.staff;
        const merged = [...parsed];
        defaultStaff.forEach(defPerson => {
          if (terminated.includes(defPerson.id)) return;
          const existing = merged.find(p => p.id === defPerson.id);
          if (!existing) {
            merged.push(defPerson);
          } else {
            // Şehirler arası güncel görev lokasyonunu ve plakasını aktar
            existing.location = defPerson.location;
            existing.vehiclePlate = defPerson.vehiclePlate;
            existing.distanceKm = defPerson.distanceKm;
          }
        });
        state.staff = merged.filter(s => s.status !== 'Ayrıldı' && !terminated.includes(s.id));
        populateMapTechDropdown();
        return;
      }
    }
  } catch (e) {
    console.warn("Personel localStorage'dan okunurken hata:", e);
  }
}

function saveStaffToLocalStorage() {
  try {
    localStorage.setItem('servisai_staff', JSON.stringify(state.staff));
  } catch (e) {
    console.warn("Personel kaydedilirken hata:", e);
  }
}

function loadVehiclesFromLocalStorage() {
  try {
    const saved = localStorage.getItem('servisai_vehicles');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const defaultVehicles = state.vehicles;
        const merged = [...parsed];
        defaultVehicles.forEach(defV => {
          if (!merged.some(v => v.id === defV.id || v.plate === defV.plate)) {
            merged.push(defV);
          }
        });
        state.vehicles = merged;
        return;
      }
    }
  } catch (e) {
    console.warn("Araçlar localStorage'dan okunurken hata:", e);
  }
}

function saveVehiclesToLocalStorage() {
  try {
    localStorage.setItem('servisai_vehicles', JSON.stringify(state.vehicles));
  } catch (e) {
    console.warn("Araçlar kaydedilirken hata:", e);
  }
}

function loadWorkOrdersFromLocalStorage() {
  try {
    const appMode = localStorage.getItem('servisai_app_mode');
    const saved = localStorage.getItem('servisai_work_orders');
    if (appMode === 'clean') {
      if (saved) {
        state.workOrders = JSON.parse(saved) || [];
      } else {
        state.workOrders = [];
      }
      return;
    }
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const defaultOrders = state.workOrders || [];
        const merged = [...parsed];
        defaultOrders.forEach(defO => {
          const defCode = defO.tracking_code || defO.code;
          if (!merged.some(o => (o.tracking_code || o.code) === defCode)) {
            merged.push(defO);
          }
        });
        state.workOrders = merged;
      }
    }
  } catch (e) {
    console.warn("İş emirleri localStorage'dan okunurken hata:", e);
  }
}

function saveWorkOrdersToLocalStorage() {
  try {
    localStorage.setItem('servisai_work_orders', JSON.stringify(state.workOrders || []));
  } catch (e) {
    console.warn("İş emirleri kaydedilirken hata:", e);
  }
}


async function addCustomCategory(name, icon = '🏷️', description = '') {
  if (!name || !name.trim()) return false;
  const cleanName = name.trim();
  const existing = state.categories.find(c => c.name.toLowerCase() === cleanName.toLowerCase());
  if (existing) {
    showToast(`⚠️ "${cleanName}" kategorisi zaten tanımlı.`);
    return false;
  }

  const newCat = {
    id: 'cat-' + Date.now(),
    name: cleanName,
    icon: icon || '🏷️',
    description: description || 'Servis özel kategorisi'
  };

  state.categories.push(newCat);
  saveCustomCategories();

  try {
    await fetch(`${API_BASE_URL}/api/stock/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: cleanName,
        icon: icon,
        description: description
      })
    });
  } catch (e) {}

  renderStockCategoryPills();
  updateStockCategoryDropdown();
  renderCategoryManagerTable();
  return true;
}

async function deleteCustomCategory(name) {
  if (!name) return;
  const cleanName = name.trim();
  const partsInCat = state.stock.filter(p => (p.category || '').toLowerCase() === cleanName.toLowerCase());

  if (partsInCat.length > 0) {
    const confirmMsg = `🏷️ "${cleanName}" kategorisine ait ${partsInCat.length} kalem parça bulunuyor.\n\nBu kategoriyi silerseniz bu parçalar otomatik olarak "Genel Parça & Sarf" kategorisine aktarılacaktır.\n\nDevam etmek istiyor musunuz?`;
    if (!confirm(confirmMsg)) return;

    partsInCat.forEach(p => {
      p.category = "Genel Parça & Sarf";
    });
  } else {
    if (!confirm(`🏷️ "${cleanName}" kategorisini sistemden silmek istediğinize emin misiniz?`)) return;
  }

  state.categories = state.categories.filter(c => c.name.toLowerCase() !== cleanName.toLowerCase());
  if (state.stockFilter && state.stockFilter.category.toLowerCase() === cleanName.toLowerCase()) {
    state.stockFilter.category = 'all';
  }
  saveCustomCategories();

  try {
    await fetch(`${API_BASE_URL}/api/stock/categories/${encodeURIComponent(cleanName)}`, {
      method: 'DELETE'
    });
  } catch (e) {}

  renderStockCategoryPills();
  updateStockCategoryDropdown();
  renderStockTable();
  renderCategoryManagerTable();
  showToast(`🗑️ "${cleanName}" kategorisi kaldırıldı.`);
}

async function editCustomCategory(oldName) {
  const cat = state.categories.find(c => c.name.toLowerCase() === oldName.toLowerCase());
  if (!cat) return;

  const newName = prompt(`"${cat.name}" kategorisi için yeni ismi girin:`, cat.name);
  if (!newName || !newName.trim() || newName.trim() === cat.name) return;
  const cleanNewName = newName.trim();

  if (state.categories.some(c => c.name.toLowerCase() === cleanNewName.toLowerCase() && c.name.toLowerCase() !== oldName.toLowerCase())) {
    showToast(`⚠️ "${cleanNewName}" adında başka bir kategori zaten mevcut.`);
    return;
  }

  const oldClean = cat.name;
  cat.name = cleanNewName;

  state.stock.forEach(p => {
    if ((p.category || '').toLowerCase() === oldClean.toLowerCase()) {
      p.category = cleanNewName;
    }
  });

  if (state.stockFilter && state.stockFilter.category.toLowerCase() === oldClean.toLowerCase()) {
    state.stockFilter.category = cleanNewName;
  }

  saveCustomCategories();
  renderStockCategoryPills();
  updateStockCategoryDropdown();
  renderStockTable();
  renderCategoryManagerTable();
  showToast(`✏️ Kategori "${cleanNewName}" olarak güncellendi.`);
}

function renderCategoryManagerTable() {
  const tbody = document.getElementById('category-manager-table-body');
  const countBadge = document.getElementById('cat-list-count-badge');
  if (!tbody) return;

  if (countBadge) {
    countBadge.textContent = `${state.categories.length} Kategori Mevcut`;
  }

  tbody.innerHTML = state.categories.map(cat => {
    const partCount = state.stock.filter(p => (p.category || '').toLowerCase() === cat.name.toLowerCase()).length;
    return `
      <tr>
        <td style="text-align: center;">
          <span class="cat-row-icon">${cat.icon || '🏷️'}</span>
        </td>
        <td>
          <strong style="color: var(--text-main); font-size: 0.88rem;">${cat.name}</strong>
        </td>
        <td>
          <span class="text-xs text-muted">${cat.description || '-'}</span>
        </td>
        <td style="text-align: center;">
          <span class="cat-part-badge">${partCount} Kalem</span>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-outline btn-xs btn-edit-category" data-name="${cat.name}" title="Kategoriyi yeniden adlandır" style="padding: 2px 6px; font-size: 0.72rem; margin-right: 4px;">
            ✏️ Düzenle
          </button>
          <button class="btn btn-outline btn-xs btn-delete-category" data-name="${cat.name}" title="Kategoriyi sil" style="padding: 2px 6px; font-size: 0.72rem; color: var(--accent-rose); border-color: rgba(244,63,94,0.3);">
            🗑️ Sil
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.btn-edit-category').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      editCustomCategory(name);
    });
  });

  tbody.querySelectorAll('.btn-delete-category').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      deleteCustomCategory(name);
    });
  });
}

function openCategoryManagerModal() {
  const modal = document.getElementById('category-manager-modal');
  if (!modal) return;
  renderCategoryManagerTable();
  modal.style.display = 'flex';
}

function initCategoryManagerModal() {
  const btnOpen = document.getElementById('btn-open-category-modal');
  const modal = document.getElementById('category-manager-modal');
  const btnClose = document.getElementById('btn-close-category-manager-modal');
  const btnCloseFooter = document.getElementById('btn-close-cat-mgr-footer');
  const formAdd = document.getElementById('form-add-category');

  const closeModal = () => { if (modal) modal.style.display = 'none'; };

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', openCategoryManagerModal);
  }
  if (btnClose && modal) btnClose.addEventListener('click', closeModal);
  if (btnCloseFooter && modal) btnCloseFooter.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (formAdd) {
    formAdd.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputName = document.getElementById('cat-new-name');
      const selectIcon = document.getElementById('cat-new-icon');
      const inputDesc = document.getElementById('cat-new-desc');

      const name = inputName ? inputName.value.trim() : '';
      const icon = selectIcon ? selectIcon.value : '🏷️';
      const desc = inputDesc ? inputDesc.value.trim() : '';

      if (!name) return;
      const success = await addCustomCategory(name, icon, desc);
      if (success) {
        if (inputName) inputName.value = '';
        if (inputDesc) inputDesc.value = '';
        showToast(`✨ "${icon} ${name}" kategorisi başarıyla oluşturuldu.`);
      }
    });
  }
}

function renderStockCategoryPills() {
  const container = document.getElementById('stock-category-pills');
  if (!container) return;

  const currentCat = state.stockFilter ? state.stockFilter.category : 'all';
  const totalCount = state.stock ? state.stock.length : 0;

  let html = `
    <button class="category-pill ${currentCat === 'all' ? 'active' : ''}" data-category="all">
      Tümü <span class="category-pill-count">${totalCount}</span>
    </button>
  `;

  (state.categories || []).forEach(cat => {
    const count = (state.stock || []).filter(item => (item.category || '').toLowerCase() === cat.name.toLowerCase()).length;
    const isActive = currentCat.toLowerCase() === cat.name.toLowerCase();
    html += `
      <button class="category-pill ${isActive ? 'active' : ''}" data-category="${cat.name}">
        ${cat.icon || '🏷️'} ${cat.name} <span class="category-pill-count">${count}</span>
      </button>
    `;
  });

  html += `
    <button class="category-pill pill-add-category" id="btn-pill-add-category" title="Yeni kategori tanımla veya yönet">
      ➕ Yeni Kategori
    </button>
  `;

  container.innerHTML = html;

  container.querySelectorAll('.category-pill:not(.pill-add-category)').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.stockFilter.category = pill.getAttribute('data-category');
      renderStockTable();
    });
  });

  const btnPillAdd = document.getElementById('btn-pill-add-category');
  if (btnPillAdd) {
    btnPillAdd.addEventListener('click', () => {
      openCategoryManagerModal();
    });
  }
}

function updateStockCategoryDropdown(selectedCategory = null) {
  const select = document.getElementById('stock-part-category');
  if (!select) return;

  let html = `<option value="">-- Kategori Seçin --</option>`;
  (state.categories || []).forEach(cat => {
    const isSel = selectedCategory && selectedCategory.toLowerCase() === cat.name.toLowerCase();
    html += `<option value="${cat.name}" ${isSel ? 'selected' : ''}>${cat.icon || '🏷️'} ${cat.name}</option>`;
  });
  select.innerHTML = html;
}

// ==================== 16. Yönetici Tanımlama & Profil Yönetimi ====================
function initManagerManagement() {
  const btnOpenHeader = document.getElementById('btn-open-manager-modal');
  const btnOpenAlt = document.getElementById('btn-open-manager-modal-alt');
  const managerModal = document.getElementById('manager-modal');
  const btnClose = document.getElementById('btn-close-manager-modal');
  const btnCloseFooter = document.getElementById('btn-close-manager-footer');
  const formManager = document.getElementById('form-new-manager');

  const openModal = () => {
    renderManagerCards();
    managerModal.style.display = 'flex';
  };

  if (btnOpenHeader && managerModal) btnOpenHeader.addEventListener('click', openModal);
  if (btnOpenAlt && managerModal) btnOpenAlt.addEventListener('click', openModal);

  if (btnClose && managerModal) btnClose.addEventListener('click', () => { managerModal.style.display = 'none'; });
  if (btnCloseFooter && managerModal) btnCloseFooter.addEventListener('click', () => { managerModal.style.display = 'none'; });
  if (managerModal) {
    managerModal.addEventListener('click', (e) => {
      if (e.target === managerModal) managerModal.style.display = 'none';
    });
  }

  // Yeni Yönetici Ekleme
  if (formManager) {
    formManager.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('mgr-new-name').value.trim();
      const title = document.getElementById('mgr-new-title').value.trim();
      const email = document.getElementById('mgr-new-email').value.trim();
      const phone = document.getElementById('mgr-new-phone').value.trim();
      const role = document.getElementById('mgr-new-role').value;

      const parts = name.split(' ');
      const avatar = (parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
      const newId = Math.floor(Math.random() * 800 + 100);

      const newMgr = {
        id: newId,
        name: name,
        title: title,
        email: email,
        phone: phone || "053X XXX XX XX",
        role: role,
        avatar: avatar,
        status: "Aktif"
      };

      state.managers.push(newMgr);

      // Backend kaydı
      try {
        await fetch(`${API_BASE_URL}/api/managers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: name,
            title: title,
            email: email,
            phone: phone
          })
        });
      } catch (err) {}

      renderManagerCards();
      formManager.reset();
      showToast(`👔 ${name} (${title}) başarıyla yönetici kadrosuna eklendi.`);
    });
  }
}

function renderManagerCards() {
  const container = document.getElementById('manager-cards-container');
  if (!container) return;

  const badgeEl = document.getElementById('manager-count-badge');
  if (badgeEl) badgeEl.textContent = `${state.managers.length} Yönetici Kayıtlı`;

  container.innerHTML = state.managers.map(m => {
    const isActive = state.currentManager && state.currentManager.id === m.id;
    return `
      <div class="manager-card ${isActive ? 'is-active' : ''}">
        <div class="manager-profile-info">
          <div class="manager-avatar">${m.avatar}</div>
          <div class="manager-details">
            <div class="manager-name-row">
              <strong class="manager-name">${m.name}</strong>
              ${isActive ? '<span class="badge badge-success">Aktif Oturum ✅</span>' : ''}
            </div>
            <span class="manager-title">${m.title}</span>
            <span class="manager-meta-text">✉️ ${m.email} • 📞 ${m.phone}</span>
          </div>
        </div>
        <div class="manager-actions">
          ${!isActive ? `
            <button class="btn btn-primary btn-sm btn-switch-manager" data-id="${m.id}" title="Bu yönetici profili ile sisteme giriş yap">
              👤 Oturum Aç
            </button>
            <button class="btn btn-outline btn-sm btn-delete-manager" data-id="${m.id}" title="Yönetici kaydını sil" style="color: var(--accent-rose); border-color: rgba(244,63,94,0.3);">
              ❌ Sil
            </button>
          ` : `
            <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600;">(Mevcut Kullanıcı)</span>
          `}
        </div>
      </div>
    `;
  }).join('');

  // Oturum Değiştirme
  container.querySelectorAll('.btn-switch-manager').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const targetMgr = state.managers.find(m => m.id === id);
      if (targetMgr) {
        state.currentManager = targetMgr;
        const avatarEl = document.getElementById('header-user-avatar');
        const nameEl = document.getElementById('header-user-name');
        if (avatarEl) avatarEl.textContent = targetMgr.avatar;
        if (nameEl) nameEl.textContent = `${targetMgr.name} (Yönetici)`;
        renderManagerCards();
        showToast(`👤 Aktif yönetici oturumu: ${targetMgr.name} (${targetMgr.title}) olarak değiştirildi.`);
      }
    });
  });

  // Yönetici Silme
  container.querySelectorAll('.btn-delete-manager').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      if (state.currentManager && state.currentManager.id === id) {
        showToast("⚠️ Aktif oturumdaki yönetici sistemden silinemez!");
        return;
      }
      const targetMgr = state.managers.find(m => m.id === id);
      if (confirm(`👔 ${targetMgr.name} yöneticisini sistemden çıkarmak istediğinize emin misiniz?`)) {
        state.managers = state.managers.filter(m => m.id !== id);
        renderManagerCards();
        showToast(`Yönetici kaydı silindi.`);
      }
    });
  });
}

// ==================== 16. Çağrı Sevk & Saha Uzmanı Seçim Modalı ====================
let currentAssignOrderCode = null;
let currentAssignSourceStaffId = null;
let selectedAssignTechId = null;

function openDispatchAssignModal(targetCode, sourceStaffId = null) {
  currentAssignOrderCode = targetCode;
  currentAssignSourceStaffId = sourceStaffId;
  selectedAssignTechId = null;

  const modal = document.getElementById('dispatch-assign-modal');
  if (!modal) return;

  // 1. İş Emri Bilgilerini Bul (state.workOrders veya state.staffJobs)
  let order = (state.workOrders || []).find(o => (o.tracking_code === targetCode || o.code === targetCode));
  if (!order && state.staffJobs) {
    for (const sId in state.staffJobs) {
      const match = state.staffJobs[sId].find(o => (o.tracking_code === targetCode || o.code === targetCode));
      if (match) {
        order = match;
        break;
      }
    }
  }
  if (!order && state.activeOrder && (state.activeOrder.code === targetCode || state.activeOrder.tracking_code === targetCode)) {
    order = state.activeOrder;
  }

  if (!order) {
    showToast(`⚠️ #${targetCode} numaralı iş emri bulunamadı.`);
    return;
  }

  const code = order.tracking_code || order.code;
  const priority = order.priority || "Normal";
  const channel = order.channel || "Telefon";
  const custName = order.customer_name || order.customer || "Müşteri";
  const custAddr = order.customer_address || "İstanbul";
  const devBrand = order.device_brand || "";
  const devModel = order.device_model || (typeof order.device === 'string' ? order.device : "");
  const serialNo = order.serial_number || order.serialNo || "SN-2026-BELIRTILMEDI";
  const complaint = order.customer_complaint || order.complaint || "Arıza açıklaması bulunmuyor.";

  // 2. Modal Başlık & Detayları Doldur
  const codeEl = document.getElementById('assign-modal-order-code');
  const prioEl = document.getElementById('assign-modal-order-priority');
  const chanEl = document.getElementById('assign-modal-order-channel');
  const custEl = document.getElementById('assign-modal-customer');
  const addrEl = document.getElementById('assign-modal-address');
  const devEl = document.getElementById('assign-modal-device');
  const snEl = document.getElementById('assign-modal-serial');
  const compEl = document.getElementById('assign-modal-complaint');
  const currentTechEl = document.getElementById('assign-modal-current-tech-tag');
  const noteInput = document.getElementById('assign-dispatch-note');
  const confirmBtn = document.getElementById('btn-confirm-dispatch-assign');

  if (codeEl) codeEl.textContent = `#${code}`;

  if (prioEl) {
    prioEl.className = priority === 'Acil' ? 'badge badge-danger' :
                       priority === 'Yüksek' ? 'badge badge-warning' : 'badge badge-secondary';
    prioEl.textContent = priority === 'Acil' ? '🚨 Kritik Acil' :
                         priority === 'Yüksek' ? '⚡ Yüksek Öncelik' : 'Normal Öncelik';
  }

  if (chanEl) {
    const channelIcon = channel === 'WhatsApp' ? '💬 WhatsApp Talebi' :
                        channel === 'E-posta' ? '✉️ E-posta Talebi' :
                        channel === 'Elden Teslim' ? '🏢 Elden Teslim' : '📞 Telefon Çağrısı';
    chanEl.textContent = channelIcon;
  }

  if (custEl) custEl.textContent = custName;
  if (addrEl) addrEl.textContent = `📍 ${custAddr}`;
  if (devEl) devEl.textContent = `${devBrand} ${devModel}`.trim() || (order.device || "Endüstriyel Cihaz");
  if (snEl) snEl.textContent = `Seri No: ${serialNo}`;
  if (compEl) compEl.textContent = complaint;

  // Mevcut Uzman Rozeti
  let sourcePerson = null;
  if (sourceStaffId) {
    sourcePerson = state.staff.find(s => s.id === sourceStaffId);
  } else if (order.assigned_user_id) {
    sourcePerson = state.staff.find(s => s.id === order.assigned_user_id);
  } else if (order.assigned_tech) {
    sourcePerson = state.staff.find(s => s.name === order.assigned_tech);
  }

  if (currentTechEl) {
    if (sourcePerson) {
      currentTechEl.className = 'badge badge-warning';
      currentTechEl.innerHTML = `👨‍🔧 Mevcut Görevli: <strong>${sourcePerson.name}</strong> ${sourceStaffId ? '(Devredilecek)' : ''}`;
    } else {
      currentTechEl.className = 'badge badge-secondary';
      currentTechEl.textContent = '⏳ Atama Bekliyor';
    }
  }

  if (noteInput) {
    noteInput.value = '';
    if (sourceStaffId && sourcePerson) {
      noteInput.placeholder = `Örn: ${sourcePerson.name} uzmanından görev devri / yeniden yönlendirme sebebi`;
    } else {
      noteInput.placeholder = 'Örn: Müşteri acil müdahale talep etti, öncelikli arıza tespiti yapılacak.';
    }
  }

  if (confirmBtn) {
    confirmBtn.innerHTML = sourceStaffId 
      ? `<span>🔄 Görevi Yeni Uzmana Aktar & Devret</span>` 
      : `<span>⚡ Seçilen Uzmana Görevi Sevk Et & Ata</span>`;
  }

  // 3. Saha Personeli Kartlarını Listele
  const candidatesContainer = document.getElementById('assign-tech-cards-container');
  if (!candidatesContainer) return;

  const availableStaff = state.staff.filter(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı');

  if (availableStaff.length === 0) {
    candidatesContainer.innerHTML = `<div class="rep-empty-state">⚠️ Sistemde aktif saha personeli bulunamadı. Lütfen yeni personel ekleyin.</div>`;
    modal.style.display = 'flex';
    return;
  }

  // Yapay Zeka Tavsiye Hesabı:
  let bestCandidate = null;
  let minScore = Infinity;

  availableStaff.forEach(s => {
    if (sourceStaffId && s.id === sourceStaffId) return; // Kaynak personele geri devretmeyi ilk tercih yapma

    const assignedJobs = (state.staffJobs && state.staffJobs[s.id]) ? state.staffJobs[s.id].filter(j => j.status !== 'Tamamlandı') : [];
    const jobCount = assignedJobs.length;
    const distance = s.distanceKm || 5;

    let score = (s.status === 'Müsait' ? 0 : s.status === 'Görevde' ? 10 : 15) + (jobCount * 5) + distance;
    if (score < minScore) {
      minScore = score;
      bestCandidate = s;
    }
  });

  if (!bestCandidate && availableStaff.length > 0) {
    bestCandidate = availableStaff.find(s => !sourceStaffId || s.id !== sourceStaffId) || availableStaff[0];
  }

  selectedAssignTechId = bestCandidate ? bestCandidate.id : availableStaff[0].id;

  candidatesContainer.innerHTML = availableStaff.map(s => {
    const isSource = sourceStaffId && s.id === sourceStaffId;
    const isRecommended = bestCandidate && s.id === bestCandidate.id && !isSource;
    const isSelected = s.id === selectedAssignTechId;

    const assignedJobs = (state.staffJobs && state.staffJobs[s.id]) ? state.staffJobs[s.id].filter(j => j.status !== 'Tamamlandı') : [];
    const activeJobCount = assignedJobs.length;

    const statusBadge = s.status === 'Müsait' ? 'badge-success' :
                        s.status === 'Görevde' ? 'badge-primary' : 'badge-warning';

    return `
      <div class="assign-tech-card ${isSelected ? 'is-selected' : ''}" data-staff-id="${s.id}" style="${isSource ? 'opacity: 0.7;' : ''}">
        <div class="assign-tech-left">
          <div class="assign-radio-indicator"></div>
          <div class="assign-tech-avatar">${s.avatar || s.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="assign-tech-details">
            <div class="assign-tech-name-row">
              <span class="assign-tech-name">${s.name}</span>
              ${isRecommended ? '<span class="badge-recommended">⭐ AI Sistem Önerisi</span>' : ''}
              ${isSource ? '<span class="badge badge-secondary" style="font-size: 0.7rem;">(Mevcut Görevli - Devrediliyor)</span>' : ''}
              <span class="badge ${statusBadge}">${s.status}</span>
            </div>
            <span class="assign-tech-sub">${s.role} (${s.specialty || 'Saha'}) • 🚗 ${s.vehiclePlate || 'Zimmetsiz'} • 📍 ${s.distanceKm || 2.5} km uzakta</span>
          </div>
        </div>
        <div class="assign-tech-right">
          <span class="assign-tech-jobs-badge badge ${activeJobCount === 0 ? 'badge-success' : activeJobCount <= 2 ? 'badge-secondary' : 'badge-warning'}">
            📋 ${activeJobCount} Aktif Görev
          </span>
        </div>
      </div>
    `;
  }).join('');

  // Kart seçim dinleyicileri
  candidatesContainer.querySelectorAll('.assign-tech-card').forEach(card => {
    card.addEventListener('click', () => {
      const staffId = parseInt(card.getAttribute('data-staff-id'));
      selectedAssignTechId = staffId;
      candidatesContainer.querySelectorAll('.assign-tech-card').forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
    });
  });

  modal.style.display = 'flex';
}

function initDispatchAssignModal() {
  const modal = document.getElementById('dispatch-assign-modal');
  const btnClose = document.getElementById('btn-close-dispatch-assign-modal');
  const btnCancel = document.getElementById('btn-cancel-dispatch-assign');
  const btnConfirm = document.getElementById('btn-confirm-dispatch-assign');

  if (!modal) return;

  const closeModal = (e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    modal.style.display = 'none';
    currentAssignOrderCode = null;
    currentAssignSourceStaffId = null;
    selectedAssignTechId = null;
  };
  window.closeDispatchAssignModal = closeModal;

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(e);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal(e);
    }
  });

  if (btnConfirm) {
    btnConfirm.addEventListener('click', async (e) => {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }

      if (!currentAssignOrderCode) {
        const fallbackOrder = (state.workOrders || []).find(o => !o.assigned_tech || o.status === 'Kabul Edildi') || (state.workOrders ? state.workOrders[0] : null);
        currentAssignOrderCode = fallbackOrder ? (fallbackOrder.tracking_code || fallbackOrder.code) : "SRV-2026-106";
      }

      if (!selectedAssignTechId) {
        const available = state.staff.filter(s => s.role !== 'Yönetici' && s.status !== 'Ayrıldı');
        if (available.length > 0) {
          selectedAssignTechId = available[0].id;
        } else {
          showToast("⚠️ Lütfen işin atanacağı veya devredileceği bir saha uzmanı seçin.");
          return;
        }
      }

      const targetTech = state.staff.find(s => s.id == selectedAssignTechId);
      if (!targetTech) {
        showToast("⚠️ Seçilen saha personeli sistemde bulunamadı.");
        return;
      }

      const noteInput = document.getElementById('assign-dispatch-note');
      const managerNote = noteInput ? noteInput.value.trim() : '';

      // Hedef iş emrini bul
      let order = (state.workOrders || []).find(o => (o.tracking_code === currentAssignOrderCode || o.code === currentAssignOrderCode));
      if (!order && state.staffJobs) {
        for (const sId in state.staffJobs) {
          const match = state.staffJobs[sId].find(o => (o.tracking_code === currentAssignOrderCode || o.code === currentAssignOrderCode));
          if (match) {
            order = match;
            break;
          }
        }
      }
      if (!order && state.activeOrder && (state.activeOrder.code === currentAssignOrderCode || state.activeOrder.tracking_code === currentAssignOrderCode)) {
        order = state.activeOrder;
      }

      if (!order) {
        order = {
          id: Date.now(),
          tracking_code: currentAssignOrderCode,
          code: currentAssignOrderCode,
          customer_name: "ABC Lojistik",
          customer_address: "Kadıköy Rıhtım, İstanbul",
          device_brand: "Schneider Electric",
          device_model: "3-Faz İnverter Sürücü",
          customer_complaint: "Cihaz aşırı ısınıyor ve aşırı akım çekip korumaya geçiyor.",
          priority: "Yüksek",
          channel: "Telefon"
        };
        state.workOrders.unshift(order);
      }

      const orderCode = order.tracking_code || order.code;

      // ==================== DURUM 1: BAŞKA UZMANA DEVİR / AKTARMA (TRANSFER) ====================
      if (currentAssignSourceStaffId) {
        if (currentAssignSourceStaffId === targetTech.id) {
          showToast("⚠️ Görev zaten bu personele ait. Lütfen devredeceğiniz farklı bir uzman seçin.");
          return;
        }

        const sourceStaff = state.staff.find(s => s.id == currentAssignSourceStaffId);
        const sourceName = sourceStaff ? sourceStaff.name : "Önceki Personel";

        // Kaynak personelin staffJobs listesinden çıkar
        if (state.staffJobs && state.staffJobs[currentAssignSourceStaffId]) {
          state.staffJobs[currentAssignSourceStaffId] = state.staffJobs[currentAssignSourceStaffId].filter(
            j => (j.tracking_code !== orderCode && j.code !== orderCode)
          );
        }

        // Hedef personelin staffJobs listesine ekle
        if (!state.staffJobs) state.staffJobs = {};
        if (!state.staffJobs[targetTech.id]) state.staffJobs[targetTech.id] = [];

        const transferFinding = managerNote 
          ? `[Yönetici Devri]: ${sourceName} uzmanından ${targetTech.name} uzmanına aktarıldı. Not: ${managerNote}`
          : `[Yönetici Devri]: ${sourceName} uzmanından ${targetTech.name} uzmanına aktarıldı.`;

        const jobEntry = {
          id: order.id || Date.now(),
          tracking_code: orderCode,
          status: "Onarımda",
          device_brand: order.device_brand,
          device_model: order.device_model,
          serial_number: order.serial_number || order.serialNo || "SN-2026-BELIRTILMEDI",
          customer_name: order.customer_name || order.customer,
          customer_phone: order.customer_phone || "",
          customer_address: order.customer_address || "İstanbul",
          customer_complaint: order.customer_complaint || order.complaint,
          technician_findings: order.technician_findings ? `${order.technician_findings} | ${transferFinding}` : transferFinding,
          total_cost: order.total_cost || 750
        };

        state.staffJobs[targetTech.id].unshift(jobEntry);

        // Global workOrders güncelle
        order.assigned_tech = targetTech.name;
        order.assigned_user_id = targetTech.id;
        order.status = "Onarımda";
        if (order.technician_findings) {
          order.technician_findings = `${order.technician_findings} | ${transferFinding}`;
        } else {
          order.technician_findings = transferFinding;
        }

        // Personel Durum Güncellemeleri
        targetTech.status = "Görevde";
        if (sourceStaff) {
          const remainingJobs = (state.staffJobs && state.staffJobs[sourceStaff.id]) ? state.staffJobs[sourceStaff.id].filter(j => j.status !== 'Tamamlandı') : [];
          if (remainingJobs.length === 0) {
            sourceStaff.status = "Müsait";
          }
        }

        // Arka plan API Senkronizasyonu (Arayüzü bekletmez)
        fetch(`${API_BASE_URL}/api/work-orders/${orderCode}/assign`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: targetTech.id })
        }).catch(() => {});

        showToast(`🔄 #${orderCode} iş emri ${sourceName} üzerinden ${targetTech.name} (${targetTech.vehiclePlate}) personeline başarıyla aktarıldı!`);

        // Eğer personel işleri modalı açıksa onu da yeni duruma göre güncelle
        const staffJobsModal = document.getElementById('staff-jobs-modal');
        if (staffJobsModal && staffJobsModal.style.display === 'flex') {
          openStaffJobsModal(currentAssignSourceStaffId);
        }
      } 
      // ==================== DURUM 2: SEVK MASASINDAN YA DA ÇAĞRI BANNER'INDAN İLK ATAMA ====================
      else {
        targetTech.status = "Görevde";
        order.assigned_tech = targetTech.name;
        order.assigned_user_id = targetTech.id;
        order.status = "Onarımda";

        if (!state.staffJobs) state.staffJobs = {};
        if (!state.staffJobs[targetTech.id]) state.staffJobs[targetTech.id] = [];

        const alreadyInStaff = state.staffJobs[targetTech.id].some(j => (j.tracking_code === orderCode || j.code === orderCode));
        if (!alreadyInStaff) {
          const initialFinding = managerNote
            ? `[Yönetici Sevk Notu]: ${managerNote}`
            : "Yönetici tarafından sahaya sevk edildi. İlk inceleme ve arıza tespiti bekleniyor.";

          state.staffJobs[targetTech.id].unshift({
            id: order.id || Date.now(),
            tracking_code: orderCode,
            status: "Onarımda",
            device_brand: order.device_brand,
            device_model: order.device_model,
            serial_number: order.serial_number || order.serialNo || "SN-2026-BELIRTILMEDI",
            customer_name: order.customer_name || order.customer,
            customer_phone: order.customer_phone || "",
            customer_address: order.customer_address || "İstanbul",
            customer_complaint: order.customer_complaint || order.complaint,
            technician_findings: initialFinding,
            total_cost: order.total_cost || 750
          });
        }

        state.activeOrder = {
          code: orderCode,
          customer: order.customer_name || order.customer,
          customer_name: order.customer_name || order.customer,
          customerAddress: order.customer_address || order.customerAddress || "İstanbul",
          customer_address: order.customer_address || order.customerAddress || "İstanbul",
          device: `${order.device_brand || ''} ${order.device_model || ''}`.trim() || (order.device || "Endüstriyel Cihaz"),
          brand: order.device_brand,
          model: order.device_model,
          serialNo: order.serial_number || order.serialNo || "SN-2026-BELIRTILMEDI",
          status: "Onarımda",
          complaint: order.customer_complaint || order.complaint,
          laborCost: order.labor_cost || 500,
          usedParts: [],
          customerApproved: false
        };

        // Arka plan API Senkronizasyonu (Arayüzü bekletmez)
        fetch(`${API_BASE_URL}/api/work-orders/${orderCode}/assign`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: targetTech.id })
        }).catch(() => {});

        updateDispatchBanner(order, targetTech);
        showToast(`⚡ #${orderCode} çağrısı yönetici tercihiyle ${targetTech.name} (${targetTech.vehiclePlate}) personeline atandı!`);
      }

      // Kalıcı hafızaya kaydet & Aktif teknisyeni atanan personele çevir
      state.activeTechId = targetTech.id;
      saveWorkOrdersToLocalStorage();
      populateActiveTechDropdown();

      // Modalı anında kapat ve Genel Arayüzü / Haritayı Yenile
      closeModal();
      renderStaffList();
      renderIncomingCalls();
      renderTechJobs();
      updateActiveOrdersKPI();
      if (typeof selectMapTech === 'function') {
        selectMapTech(targetTech.id);
      }
    });
  }
}

// ==================== 17. Güvenlik, Oturum & Yetkilendirme Motoru (Auth Hub) ====================
function initTechMobileControls() {
  const btnToggleJobs = document.getElementById('btn-toggle-m-jobs');
  const btnToggleBench = document.getElementById('btn-toggle-m-bench');
  const techLayout = document.querySelector('.tech-layout');

  if (btnToggleJobs && btnToggleBench && techLayout) {
    btnToggleJobs.addEventListener('click', () => {
      btnToggleJobs.classList.add('active');
      btnToggleBench.classList.remove('active');
      techLayout.classList.add('tech-show-jobs');
      techLayout.classList.remove('tech-show-bench');
    });

    btnToggleBench.addEventListener('click', () => {
      btnToggleBench.classList.add('active');
      btnToggleJobs.classList.remove('active');
      techLayout.classList.add('tech-show-bench');
      techLayout.classList.remove('tech-show-jobs');
    });
  }
}

function initAuthSystem() {
  const loginModal = document.getElementById('login-modal');
  const btnHeaderAuth = document.getElementById('btn-header-auth-action');
  const tabAdmin = document.getElementById('tab-login-admin');
  const tabTech = document.getElementById('tab-login-tech');
  const paneAdmin = document.getElementById('pane-login-admin');
  const paneTech = document.getElementById('pane-login-tech');
  const btnTogglePwd = document.getElementById('btn-toggle-admin-pwd');
  const pwdInput = document.getElementById('login-admin-password');
  const btnQuickZafer = document.getElementById('btn-quick-fill-zafer');
  const btnSubmitAdmin = document.getElementById('btn-submit-admin-login');
  const btnSubmitTech = document.getElementById('btn-submit-tech-login');
  const techSelect = document.getElementById('login-tech-select');
  const techPinInput = document.getElementById('login-tech-pin');
  const techPinHint = document.getElementById('tech-pin-hint');
  const btnCustomerBypass = document.getElementById('btn-login-as-customer');
  const adminError = document.getElementById('login-admin-error');
  const techError = document.getElementById('login-tech-error');
  const keypad = document.querySelector('.mobile-pin-keypad');

  // Load existing session or default to Zafer Koçaş (Yönetici)
  let savedUser = null;
  try {
    const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('servisai_auth_user') : null;
    if (raw) savedUser = JSON.parse(raw);
  } catch (e) {}

  if (savedUser && savedUser.name && savedUser.role) {
    state.currentUser = savedUser;
  } else {
    // Default initial session is Zafer Koçaş (Yönetici) for seamless out-of-the-box experience
    state.currentUser = {
      id: 1,
      name: "Zafer Koçaş",
      email: "zafer@kocasteknik.com",
      role: "Yönetici",
      avatar: "ZK"
    };
  }

  // Apply role permissions to UI
  applyRoleAccess(state.currentUser);

  // Tab Switcher inside Modal
  if (tabAdmin && tabTech && paneAdmin && paneTech) {
    tabAdmin.addEventListener('click', () => {
      tabAdmin.classList.add('active');
      tabTech.classList.remove('active');
      paneAdmin.style.display = 'block';
      paneTech.style.display = 'none';
      if (adminError) adminError.style.display = 'none';
    });

    tabTech.addEventListener('click', () => {
      tabTech.classList.add('active');
      tabAdmin.classList.remove('active');
      paneTech.style.display = 'block';
      paneAdmin.style.display = 'none';
      if (techError) techError.style.display = 'none';
    });
  }

  // Toggle Password Visibility
  if (btnTogglePwd && pwdInput) {
    btnTogglePwd.addEventListener('click', () => {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        btnTogglePwd.textContent = '🙈';
      } else {
        pwdInput.type = 'password';
        btnTogglePwd.textContent = '👁️';
      }
    });
  }

  // Tech Select Change -> Update PIN Hint
  if (techSelect && techPinHint) {
    techSelect.addEventListener('change', () => {
      const opt = techSelect.options[techSelect.selectedIndex];
      const pin = opt ? opt.getAttribute('data-pin') || '1234' : '1234';
      const name = opt ? opt.textContent.split('-')[0].trim() : 'Teknisyen';
      techPinHint.textContent = `${name} PIN: ${pin}`;
      if (techPinInput) techPinInput.value = '';
    });
  }

  // Keypad clicks for Mobile PIN entry
  if (keypad && techPinInput) {
    keypad.querySelectorAll('.pin-key').forEach(key => {
      key.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const digit = key.getAttribute('data-digit');
        if (digit !== null) {
          if (techPinInput.value.length < 4) {
            techPinInput.value += digit;
          }
        } else if (key.id === 'btn-pin-clear') {
          techPinInput.value = '';
        } else if (key.id === 'btn-pin-back') {
          techPinInput.value = techPinInput.value.slice(0, -1);
        }
      });
    });
  }

  // Quick Demo Login: Zafer Koçaş
  if (btnQuickZafer) {
    btnQuickZafer.addEventListener('click', () => {
      const emailEl = document.getElementById('login-admin-email');
      const pwdEl = document.getElementById('login-admin-password');
      if (emailEl) emailEl.value = 'zafer@kocasteknik.com';
      if (pwdEl) pwdEl.value = 'admin123';
      performAdminLogin('zafer@kocasteknik.com', 'admin123');
    });
  }

  // Admin Login Submit
  if (btnSubmitAdmin) {
    btnSubmitAdmin.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const emailEl = document.getElementById('login-admin-email');
      const pwdEl = document.getElementById('login-admin-password');
      const email = (emailEl ? emailEl.value : '').trim();
      const pwd = (pwdEl ? pwdEl.value : '').trim();
      performAdminLogin(email, pwd);
    });
  }

  // Tech Login Submit
  if (btnSubmitTech) {
    btnSubmitTech.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const staffId = techSelect ? parseInt(techSelect.value, 10) : 2;
      const pin = (techPinInput ? techPinInput.value : '').trim();
      performTechLogin(staffId, pin);
    });
  }

  // Customer Portal Bypass
  if (btnCustomerBypass) {
    btnCustomerBypass.addEventListener('click', () => {
      if (loginModal) loginModal.style.display = 'none';
      const custTabBtn = document.getElementById('btn-tab-customer');
      if (custTabBtn) custTabBtn.click();
      showToast("🔍 Müşteri Cihaz Sorgulama Portalı açıldı.");
    });
  }

  // Header Auth Button (Login / Logout)
  if (btnHeaderAuth) {
    btnHeaderAuth.addEventListener('click', () => {
      if (state.currentUser) {
        logoutUser();
      } else {
        openLoginModal();
      }
    });
  }
}

function openLoginModal(defaultTab = 'admin') {
  const loginModal = document.getElementById('login-modal');
  if (!loginModal) return;
  loginModal.style.display = 'flex';
  const tabAdmin = document.getElementById('tab-login-admin');
  const tabTech = document.getElementById('tab-login-tech');
  if (defaultTab === 'tech' && tabTech) {
    tabTech.click();
  } else if (tabAdmin) {
    tabAdmin.click();
  }
}

async function performAdminLogin(email, password) {
  const adminError = document.getElementById('login-admin-error');
  const loginModal = document.getElementById('login-modal');

  let success = false;
  let user = null;

  // 1. Try Backend API
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        user = data.user;
        success = true;
      }
    }
  } catch (err) {
    // Offline mode
  }

  // 2. Fallback local verification
  if (!success) {
    if ((email === 'zafer@kocasteknik.com' || email === 'admin@kocasteknik.com') && (password === 'admin123' || password === '123456')) {
      user = {
        id: 1,
        name: "Zafer Koçaş",
        email: "zafer@kocasteknik.com",
        role: "Yönetici",
        avatar: "ZK"
      };
      success = true;
    } else {
      const matched = (state.staff || []).find(s => s.email && s.email.toLowerCase() === email.toLowerCase());
      if (matched && (password === 'admin123' || password === matched.password_hash)) {
        const parts = matched.name.split(' ');
        const av = (parts.length >= 2 ? parts[0][0] + parts[1][0] : matched.name.slice(0, 2)).toUpperCase();
        user = {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          role: matched.role || 'Yönetici',
          avatar: av
        };
        success = true;
      }
    }
  }

  if (success && user) {
    if (adminError) adminError.style.display = 'none';
    state.currentUser = user;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('servisai_auth_user', JSON.stringify(user));
      }
    } catch (e) {}
    applyRoleAccess(user);
    if (loginModal) loginModal.style.display = 'none';
    showToast(`✅ Giriş Başarılı: Hoş geldiniz, ${user.name}!`);
    const adminTab = document.getElementById('btn-tab-admin');
    if (adminTab) adminTab.click();
  } else {
    if (adminError) {
      adminError.textContent = "❌ Hatalı e-posta veya şifre girdiniz. (Varsayılan: zafer@kocasteknik.com / admin123)";
      adminError.style.display = 'block';
    }
  }
}

async function performTechLogin(staffId, pin) {
  const techError = document.getElementById('login-tech-error');
  const loginModal = document.getElementById('login-modal');

  let success = false;
  let user = null;

  // 1. Try Backend API
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/tech-pin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staff_id: staffId, pin_code: pin })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        user = data.user;
        success = true;
      }
    }
  } catch (err) {
    // Offline mode
  }

  // 2. Fallback local verification
  if (!success) {
    const staff = (state.staff || []).find(s => s.id == staffId);
    const validPins = { 2: '1234', 3: '2345', 4: '3456', 5: '4567' };
    const expectedPin = validPins[staffId] || '1234';

    if (pin === expectedPin || pin === '1234') {
      const staffName = staff ? staff.name : (staffId == 2 ? 'Murat Aydın' : staffId == 3 ? 'Caner Güler' : 'Teknisyen');
      const staffPlate = staff ? staff.vehiclePlate : (staffId == 2 ? '34 ABC 101' : '34 DEF 202');
      const parts = staffName.split(' ');
      const av = (parts.length >= 2 ? parts[0][0] + parts[1][0] : staffName.slice(0, 2)).toUpperCase();
      user = {
        id: staffId,
        name: staffName,
        email: staff ? staff.email : `${staffName.toLowerCase().replace(' ', '.')}@kocasteknik.com`,
        role: "Teknisyen",
        specialty: staff ? (staff.specialty || staff.role) : "Saha Mühendisi",
        vehiclePlate: staffPlate,
        avatar: av
      };
      success = true;
    }
  }

  if (success && user) {
    if (techError) techError.style.display = 'none';
    state.currentUser = user;
    state.activeTechId = user.id;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('servisai_auth_user', JSON.stringify(user));
      }
    } catch (e) {}
    applyRoleAccess(user);
    if (loginModal) loginModal.style.display = 'none';
    showToast(`🚀 Saha Tezgâhı Açıldı: İyi çalışmalar, ${user.name}!`);

    // Otomatik olarak Teknisyen Saha Ekranına geç ve tezgâhı bu teknisyene kitle
    const techTab = document.getElementById('btn-tab-tech');
    if (techTab) techTab.click();
    const selectActiveTech = document.getElementById('select-active-tech');
    if (selectActiveTech) {
      selectActiveTech.value = String(user.id);
      populateActiveTechDropdown();
      renderTechJobs();
    }
  } else {
    if (techError) {
      techError.textContent = "❌ Hatalı 4 haneli PIN kodu girdiniz. Lütfen kontrol ediniz.";
      techError.style.display = 'block';
    }
  }
}

function logoutUser() {
  state.currentUser = null;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('servisai_auth_user');
    }
  } catch (e) {}

  const avatarEl = document.getElementById('header-user-avatar');
  const nameEl = document.getElementById('header-user-name');
  const authIcon = document.getElementById('btn-header-auth-icon');
  const authText = document.getElementById('btn-header-auth-text');

  if (avatarEl) avatarEl.textContent = '🔒';
  if (nameEl) nameEl.textContent = 'Giriş Yapılmadı';
  if (authIcon) authIcon.textContent = '🔑';
  if (authText) authText.textContent = 'Giriş Yap';

  showToast("👋 Oturum başarıyla kapatıldı.");
  openLoginModal();
}

function applyRoleAccess(user) {
  if (!user) return;
  const avatarEl = document.getElementById('header-user-avatar');
  const nameEl = document.getElementById('header-user-name');
  const authIcon = document.getElementById('btn-header-auth-icon');
  const authText = document.getElementById('btn-header-auth-text');
  const btnAdminTab = document.getElementById('btn-tab-admin');
  const btnReportsTab = document.getElementById('btn-tab-reports');
  const btnIntake = document.getElementById('btn-open-intake-modal');
  const techSwitcherBox = document.querySelector('.tech-switcher-box');

  const avatar = user.avatar || (user.name ? user.name.slice(0, 2).toUpperCase() : 'US');
  if (avatarEl) avatarEl.textContent = avatar;
  if (nameEl) nameEl.textContent = `${user.name} (${user.role})`;
  if (authIcon) authIcon.textContent = '🚪';
  if (authText) authText.textContent = 'Çıkış Yap';

  if (user.role === 'Yönetici') {
    if (btnAdminTab) btnAdminTab.style.display = 'flex';
    if (btnReportsTab) btnReportsTab.style.display = 'flex';
    if (btnIntake) btnIntake.style.display = 'inline-flex';
    if (techSwitcherBox) techSwitcherBox.style.display = 'block';
  } else if (user.role === 'Teknisyen') {
    if (btnAdminTab) btnAdminTab.style.display = 'none';
    if (btnReportsTab) btnReportsTab.style.display = 'none';
    if (techSwitcherBox) techSwitcherBox.style.display = 'none';
    state.activeTechId = user.id;
    const selectActiveTech = document.getElementById('select-active-tech');
    if (selectActiveTech) {
      selectActiveTech.value = String(user.id);
    }
    const techProfileInfo = document.getElementById('tech-profile-info');
    if (techProfileInfo) {
      techProfileInfo.innerHTML = `Teknisyen: <strong>${escapeHtml(user.name)}</strong> • Araç: <strong>${escapeHtml(user.vehiclePlate || 'Zimmetsiz')}</strong>`;
    }
  }
}

window.initAuthSystem = initAuthSystem;
window.initTechMobileControls = initTechMobileControls;
window.openLoginModal = openLoginModal;
window.performAdminLogin = performAdminLogin;
window.performTechLogin = performTechLogin;
window.logoutUser = logoutUser;
window.applyRoleAccess = applyRoleAccess;
window.openServiceReportModal = openServiceReportModal;
window.openAccountingReceiptModal = openAccountingReceiptModal;
window.initAccountingReceiptActions = initAccountingReceiptActions;
window.getDefaultServiceRates = getDefaultServiceRates;
window.loadServiceRatesFromLocalStorage = loadServiceRatesFromLocalStorage;
window.saveServiceRatesToLocalStorage = saveServiceRatesToLocalStorage;
window.renderLaborPresets = renderLaborPresets;
window.renderServiceRatesSettings = renderServiceRatesSettings;
window.openSettingsModal = openSettingsModal;
window.closeSettingsModal = closeSettingsModal;
window.initSettingsActions = initSettingsActions;
window.getDefaultExchangeRates = getDefaultExchangeRates;
window.loadExchangeRatesFromLocalStorage = loadExchangeRatesFromLocalStorage;
window.saveExchangeRatesToLocalStorage = saveExchangeRatesToLocalStorage;
window.fetchTCMBExchangeRates = fetchTCMBExchangeRates;
window.convertCurrencyToTRY = convertCurrencyToTRY;
window.renderExchangeRatesInSettings = renderExchangeRatesInSettings;
window.updateStockCurrencyPreview = updateStockCurrencyPreview;
window.initStockCurrencyConverter = initStockCurrencyConverter;
window.formatTimeOnly = formatTimeOnly;
window.formatDurationMinutes = formatDurationMinutes;
window.updateTechJourneyUI = updateTechJourneyUI;

// ==================== 21. Cihaz Sicil Kartı & Seri No Takip Sistemi ====================

function getDefaultEquipmentRegistry() {
  return [
    {
      serial_number: "DLT-2024-99823",
      brand: "Delta Electronics",
      model: "VFD-075 Endüstriyel Sürücü Kartı (7.5kW)",
      category: "Frekans İnverteri & Güç Elektroniği",
      customer_name: "TermoTek Endüstriyel Ltd.",
      customer_phone: "0532 999 1122",
      customer_address: "Kadıköy Rıhtım Cd. No:14, Kadıköy, İstanbul",
      commissioning_date: "2024-03-15",
      warranty_status: "Garantili",
      warranty_end_date: "2027-03-15",
      current_location: "🔬 Merkez Servis Atölyesi (Tezgâh 1 • Test Aşamasında)",
      current_location_type: "workshop",
      location_detail: "Onarım sonrası tam yük ve osiloskop testinde",
      service_count: 2,
      fault_history: [
        {
          order_code: "SRV-2026-104",
          date: "2026-10-21",
          complaint: "Cihaz giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor ve koruma rölesi devreyi kesiyor.",
          findings: "Çıkış IGBT güç transistöründe termal stres kaynaklı mikro sızıntı/kısa devre saptandı.",
          action: "IGBT-600V-40A sökülüp yenisi lehimlendi, soğutucu blok termal macunlandı, gate sinyalleri doğrulandı ve 30 dk tam yük testi tamamlandı.",
          technician: "Murat Aydın (Saha Mühendisi)",
          replaced_parts: [
            { code: "IGBT-600V-40A", name: "IGBT-600V-40A Güç Transistörü", qty: 1, originalPrice: 45.00, currency: "USD", exchangeRate: 38.50, priceTRY: 1732.50 }
          ],
          laborCost: 600,
          totalCost: 2332.50,
          status: "Onarımda"
        },
        {
          order_code: "SRV-2025-042",
          date: "2025-08-10",
          complaint: "Aşırı tozlanma ve fan gürültüsü",
          findings: "Radyatör soğutma fanında balans bozulması ve rulman sürtünmesi.",
          action: "Fan ünitesi yenilendi, PCB ultrasonik kimyasal yıkama ve fırınlama yapıldı.",
          technician: "Murat Aydın (Saha Mühendisi)",
          replaced_parts: [
            { code: "FAN-DELTA-80", name: "Delta 80mm Rulmanlı DC Fan", qty: 1, originalPrice: 320, currency: "TRY", exchangeRate: 1.0, priceTRY: 320 }
          ],
          laborCost: 400,
          totalCost: 720,
          status: "Tamamlandı & Teslim Edildi"
        }
      ]
    },
    {
      serial_number: "SCH-2025-44120",
      brand: "Schneider Electric",
      model: "Altivar ATV320 Frekans Sürücü (15kW)",
      category: "Ağır Şart Motor Kontrolörü",
      customer_name: "Ümran Çelik Boru A.Ş.",
      customer_phone: "0216 555 4411",
      customer_address: "Dudullu OSB 2. Cadde No:15, Ümraniye, İstanbul",
      commissioning_date: "2025-01-20",
      warranty_status: "Garantili",
      warranty_end_date: "2027-01-20",
      current_location: "🏢 Müşteri Sahasında (Boru Çekme Hattı Pano 3 - Faal Devrede)",
      current_location_type: "customer",
      location_detail: "Üretim hattında aktif çalışıyor",
      service_count: 1,
      fault_history: [
        {
          order_code: "SRV-2026-108",
          date: "2026-10-18",
          complaint: "Motor kalkış anında SCF4 kısa devre hatası verip kilitleniyor.",
          findings: "DC bara kondansatör bankında kapasite kaybı ve tetikleme optokuplör sızıntısı.",
          action: "DC bara kondansatör bankı ve tetikleme optokuplörleri yenilendi, testler başarıyla geçti.",
          technician: "Murat Aydın (Saha Mühendisi)",
          replaced_parts: [
            { code: "CAP-DC-450V", name: "DC Bara Kondansatör Grubu", qty: 1, originalPrice: 120.00, currency: "EUR", exchangeRate: 41.20, priceTRY: 4944.00 },
            { code: "OPTO-HCPL", name: "HCPL-3120 Hızlı Optokuplör", qty: 2, originalPrice: 140.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 280.00 }
          ],
          laborCost: 750,
          totalCost: 5974.00,
          status: "Tamamlandı & Teslim Edildi"
        }
      ]
    },
    {
      serial_number: "GRF-2024-77192",
      brand: "Grundfos",
      model: "CR-15 Endüstriyel Dikey Hidrofor Pompası",
      category: "Hidrofor & Basınçlandırma",
      customer_name: "Marmara Ambalaj Sanayi",
      customer_phone: "0216 333 7788",
      customer_address: "Bağlarbaşı Cd. No:42, Üsküdar, İstanbul",
      commissioning_date: "2024-06-10",
      warranty_status: "Garanti Dışı",
      warranty_end_date: "2026-06-10",
      current_location: "🚐 Mobil Servis Aracında (33 EKS 18 - Levent İmekci)",
      current_location_type: "vehicle",
      location_detail: "Yerinde salmastra montajı için adrese intikalde",
      service_count: 2,
      fault_history: [
        {
          order_code: "SRV-2026-112",
          date: "2026-10-24",
          complaint: "Mekanik salmastra bölgesinden su sızıntısı var ve basınç şalteri kontaktör çekmiyor.",
          findings: "Karbon-seramik mekanik salmastra aşınması ve 24V yardımcı kontaktör bobin yanığı.",
          action: "Mekanik salmastra kiti ve 24V Schneider kontaktör değişimi için sahaya intikal ediliyor.",
          technician: "Caner Güler (Kıdemli Tekniker)",
          replaced_parts: [
            { code: "SALM-CR15", name: "Grundfos CR-15 Mekanik Salmastra Kiti", qty: 1, originalPrice: 950.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 950.00 },
            { code: "KONT-24V", name: "24V Schneider Kontaktör", qty: 1, originalPrice: 450.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 450.00 }
          ],
          laborCost: 650,
          totalCost: 2050.00,
          status: "Yolda / Montajda"
        },
        {
          order_code: "SRV-2025-088",
          date: "2025-11-04",
          complaint: "Motor yatak sesi ve vibrasyon",
          findings: "Ön rulman bilye yuvarlanma yolu aşınması.",
          action: "SKF 6306 C3 yüksek devir rulmanları takıldı, balans alındı.",
          technician: "Caner Güler (Kıdemli Tekniker)",
          replaced_parts: [
            { code: "RUL-SKF-6306", name: "SKF 6306 C3 Rulman", qty: 2, originalPrice: 270.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 540.00 }
          ],
          laborCost: 500,
          totalCost: 1040.00,
          status: "Tamamlandı"
        }
      ]
    },
    {
      serial_number: "DAI-2023-88214",
      brand: "Daikin",
      model: "VRV IV Soğutma Kompresör İnverteri",
      category: "İklimlendirme & Soğutma",
      customer_name: "Ekol Lojistik Depo Tesisleri",
      customer_phone: "0216 666 9900",
      customer_address: "Samandıra Tesisleri No:8, Sancaktepe, İstanbul",
      commissioning_date: "2023-09-01",
      warranty_status: "Garanti Dışı",
      warranty_end_date: "2025-09-01",
      current_location: "🏢 Müşteri Sahasında (Soğuk Hava Deposu Ünite 1 - Faal)",
      current_location_type: "customer",
      location_detail: "Depolama alanında faal devrede",
      service_count: 1,
      fault_history: [
        {
          order_code: "SRV-2026-098",
          date: "2026-10-15",
          complaint: "E4 alçak basınç koruma alarmı veriyor, kompresör devreye girmiyor.",
          findings: "NTC sıcaklık sensörü ve genleşme valfi soket korozyonu, gaz basınç kaybı.",
          action: "NTC sıcaklık sensörü ve genleşme valfi soket korozyonu giderildi, gaz basınçları dengelendi.",
          technician: "Caner Güler (Kıdemli Tekniker)",
          replaced_parts: [
            { code: "SENS-NTC-DK", name: "Daikin NTC Sıcaklık Sensörü", qty: 1, originalPrice: 380.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 380.00 },
            { code: "VALF-GEN-DK", name: "Elektronik Genleşme Valfi", qty: 1, originalPrice: 820.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 820.00 }
          ],
          laborCost: 1000,
          totalCost: 2200.00,
          status: "Tamamlandı & Teslim Edildi"
        }
      ]
    },
    {
      serial_number: "SIE-2025-1214C",
      brand: "Siemens",
      model: "S7-1200 CPU 1214C & SM1223 PLC Modülü",
      category: "PLC & Endüstriyel Otomasyon",
      customer_name: "Mega Tekstil A.Ş.",
      customer_phone: "0216 777 2233",
      customer_address: "Ataşehir Bulvarı No:8, Ataşehir, İstanbul",
      commissioning_date: "2025-04-12",
      warranty_status: "Garantili",
      warranty_end_date: "2027-04-12",
      current_location: "🔬 Merkez Servis Atölyesi (Otomasyon Test İstasyonu)",
      current_location_type: "workshop",
      location_detail: "Giriş sinyal katı onarımı ve firmware testi",
      service_count: 1,
      fault_history: [
        {
          order_code: "SRV-2026-115",
          date: "2026-10-22",
          complaint: "PROFINET haberleşme kaybı oluşuyor, SF kırmızı led sürekli yanıp sönüyor.",
          findings: "Giriş optik izolasyon katında aşırı gerilim pik darbesi kaynaklı entegre hasarı.",
          action: "Giriş sinyal kartı onarıldı, donanım teşhisi ve yazılım yedeklemesi yapılıyor.",
          technician: "Selin Kaya (Otomasyon Mühendisi)",
          replaced_parts: [
            { code: "MOD-SM1223", name: "Siemens SM1223 Giriş Katı Çipi", qty: 1, originalPrice: 120.00, currency: "EUR", exchangeRate: 41.20, priceTRY: 4944.00 }
          ],
          laborCost: 800,
          totalCost: 5744.00,
          status: "İncelemede"
        }
      ]
    },
    {
      serial_number: "OMR-2024-31902",
      brand: "Omron",
      model: "CJ2M-CPU31 Modüler PLC Ünitesi",
      category: "PLC & Endüstriyel Otomasyon",
      customer_name: "Kartal Kimya Sanayi",
      customer_phone: "0216 888 5544",
      customer_address: "Kartal Sanayi Cd. No:19, Kartal, İstanbul",
      commissioning_date: "2024-02-18",
      warranty_status: "Garantili",
      warranty_end_date: "2027-02-18",
      current_location: "🏢 Müşteri Sahasında (Reaktör Otomasyon Panosu - Faal)",
      current_location_type: "customer",
      location_detail: "Kimyasal reaktör panosunda çalışıyor",
      service_count: 1,
      fault_history: [
        {
          order_code: "SRV-2026-101",
          date: "2026-10-17",
          complaint: "Elektrik kesintisinden sonra PLC programı silindi, ERR ledi yanıyor.",
          findings: "Dahili lityum yedekleme pilinin tükenmesi ve EEPROM veri tutarsızlığı.",
          action: "Lityum yedekleme pili yenilendi, kaynak kod EEPROM üzerinden geri yüklendi ve I/O testleri yapıldı.",
          technician: "Selin Kaya (Otomasyon Mühendisi)",
          replaced_parts: [
            { code: "BAT-CJ1W", name: "Omron CJ1W-BAT01 Lityum Pil", qty: 1, originalPrice: 350.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 350.00 }
          ],
          laborCost: 850,
          totalCost: 1200.00,
          status: "Tamamlandı & Teslim Edildi"
        }
      ]
    },
    {
      serial_number: "AUT-2025-45512",
      brand: "Autonics",
      model: "TK4S Sayısal PID Sıcaklık Kontrolörü",
      category: "Sensör & Termal Kontrol",
      customer_name: "Doğuş Medikal Ltd.",
      customer_phone: "0216 444 1155",
      customer_address: "Maltepe Sahil Cd. No:25, Maltepe, İstanbul",
      commissioning_date: "2025-05-30",
      warranty_status: "Garantili",
      warranty_end_date: "2027-05-30",
      current_location: "📦 Merkez Depo (Sterilizasyon Cihazı Yedek Ünitesi)",
      current_location_type: "warehouse",
      location_detail: "Onarıldı, yedek konsinye olarak rafta",
      service_count: 1,
      fault_history: [
        {
          order_code: "SRV-2026-119",
          date: "2026-10-23",
          complaint: "SSR çıkış vermiyor, fırın sıcaklığı 45 derece sapma gösteriyor.",
          findings: "PT100 sensör ucu kopukluğu ve röle çıkış katı arızası belirlendi.",
          action: "PT100 sensör ucu yenilendi, çıkış katı kompanze edildi, test fırınında doğrulandı.",
          technician: "Emre Yıldız (Teknisyen)",
          replaced_parts: [
            { code: "PROB-PT100", name: "PT100 Hassas Sıcaklık Probu", qty: 1, originalPrice: 240.00, currency: "TRY", exchangeRate: 1.0, priceTRY: 240.00 }
          ],
          laborCost: 450,
          totalCost: 690.00,
          status: "Kabul Edildi"
        }
      ]
    },
    {
      serial_number: "SCH-2025-1104",
      brand: "Schneider Electric",
      model: "3-Faz İnverter Sürücü (22kW)",
      category: "Frekans İnverteri",
      customer_name: "ABC Lojistik",
      customer_phone: "0216 444 8899",
      customer_address: "Kadıköy Rıhtım, İstanbul",
      commissioning_date: "2025-08-15",
      warranty_status: "Garantili",
      warranty_end_date: "2027-08-15",
      current_location: "🔬 Merkez Servis Atölyesi (Tezgâh 2 • İncelemede)",
      current_location_type: "workshop",
      location_detail: "Giriş kabulü yapıldı, teknisyen ataması bekleniyor",
      service_count: 1,
      fault_history: [
        {
          order_code: "SRV-2026-106",
          date: "2026-10-25",
          complaint: "Cihaz aşırı ısınıyor ve aşırı akım çekip korumaya geçiyor.",
          findings: "Dahili soğutma bloğu toz tıkalı ve fan devresi arızalı.",
          action: "Ön ekspertiz yapıldı, fan değişimi planlandı.",
          technician: "Murat Aydın (Saha Mühendisi)",
          replaced_parts: [],
          laborCost: 500,
          totalCost: 500.00,
          status: "Kabul Edildi"
        }
      ]
    }
  ];
}

function initEquipmentRegistry() {
  try {
    const saved = localStorage.getItem('servisai_equipment_registry');
    if (saved) {
      state.equipmentRegistry = JSON.parse(saved);
    } else {
      state.equipmentRegistry = getDefaultEquipmentRegistry();
      saveEquipmentRegistryToLocalStorage();
    }
  } catch (err) {
    console.warn("Equipment registry load error:", err);
    state.equipmentRegistry = getDefaultEquipmentRegistry();
  }
  updateEquipmentBadge();
}

function saveEquipmentRegistryToLocalStorage() {
  try {
    localStorage.setItem('servisai_equipment_registry', JSON.stringify(state.equipmentRegistry));
  } catch (err) {
    console.warn("Equipment registry save error:", err);
  }
}

function updateEquipmentBadge() {
  const badge = document.getElementById('equipment-count-badge');
  if (badge) {
    badge.textContent = `${state.equipmentRegistry.length} Cihaz`;
  }
}

// Cihaz Sicil Tablosunu ve Sayaçları Ekrana Basıcı
function renderEquipmentRegistry() {
  const container = document.getElementById('equipment-table-container');
  if (!container) return;

  const registry = state.equipmentRegistry || [];
  const totalCount = registry.length;
  const warrantyCount = registry.filter(e => e.warranty_status === 'Garantili').length;
  const outWarrantyCount = totalCount - warrantyCount;
  const workshopCount = registry.filter(e => e.current_location_type === 'workshop').length;
  const customerCount = registry.filter(e => e.current_location_type === 'customer' || e.current_location_type === 'delivered').length;
  const vehicleCount = registry.filter(e => e.current_location_type === 'vehicle').length;

  // KPI Sayaçlarını Güncelle
  const elTotal = document.getElementById('eq-kpi-total');
  const elWar = document.getElementById('eq-kpi-warranty');
  const elOutWar = document.getElementById('eq-kpi-out-warranty');
  const elWork = document.getElementById('eq-kpi-workshop');
  const elCust = document.getElementById('eq-kpi-customer');
  if (elTotal) elTotal.textContent = totalCount;
  if (elWar) elWar.textContent = warrantyCount;
  if (elOutWar) elOutWar.textContent = outWarrantyCount;
  if (elWork) elWork.textContent = workshopCount;
  if (elCust) elCust.textContent = customerCount;

  // Filtre Hapları Sayaçlarını Güncelle
  const pAll = document.getElementById('pill-count-all');
  const pWar = document.getElementById('pill-count-warranty');
  const pOutWar = document.getElementById('pill-count-out-warranty');
  const pWork = document.getElementById('pill-count-workshop');
  const pCust = document.getElementById('pill-count-customer');
  const pVeh = document.getElementById('pill-count-vehicle');
  if (pAll) pAll.textContent = totalCount;
  if (pWar) pWar.textContent = warrantyCount;
  if (pOutWar) pOutWar.textContent = outWarrantyCount;
  if (pWork) pWork.textContent = workshopCount;
  if (pCust) pCust.textContent = customerCount;
  if (pVeh) pVeh.textContent = vehicleCount;

  updateEquipmentBadge();

  // Filtreleme & Arama
  const activeFilter = state.activeEquipmentFilter || 'all';
  const searchTerm = (state.equipmentSearchTerm || '').toLowerCase().trim();

  let filtered = registry.filter(eq => {
    // 1. Hap Filtresi
    if (activeFilter === 'warranty' && eq.warranty_status !== 'Garantili') return false;
    if (activeFilter === 'out-warranty' && eq.warranty_status === 'Garantili') return false;
    if (activeFilter === 'workshop' && eq.current_location_type !== 'workshop') return false;
    if (activeFilter === 'customer' && eq.current_location_type !== 'customer' && eq.current_location_type !== 'delivered') return false;
    if (activeFilter === 'vehicle' && eq.current_location_type !== 'vehicle') return false;

    // 2. Metin Arama
    if (searchTerm) {
      const matchSerial = (eq.serial_number || '').toLowerCase().includes(searchTerm);
      const matchBrand = (eq.brand || '').toLowerCase().includes(searchTerm);
      const matchModel = (eq.model || '').toLowerCase().includes(searchTerm);
      const matchCustomer = (eq.customer_name || '').toLowerCase().includes(searchTerm);
      const matchLocation = (eq.current_location || '').toLowerCase().includes(searchTerm);
      const matchComplaint = (eq.fault_history || []).some(f => (f.complaint || '').toLowerCase().includes(searchTerm) || (f.findings || '').toLowerCase().includes(searchTerm));
      if (!matchSerial && !matchBrand && !matchModel && !matchCustomer && !matchLocation && !matchComplaint) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 2.2rem; margin-bottom: 10px;">🏷️</div>
        <strong style="color: var(--text-main); font-size: 1rem; display: block; margin-bottom: 6px;">Kriterlere Uygun Cihaz Sicil Kaydı Bulunamadı</strong>
        <p style="font-size: 0.84rem; margin: 0;">Arama terimini değiştirebilir veya "Tüm Cihazlar" filtresine geçebilirsiniz.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="equipment-table">
      <thead>
        <tr>
          <th style="min-width: 140px;">Seri No (S/N)</th>
          <th>Cihaz & Model</th>
          <th>Sahip Müşteri / Tesis</th>
          <th>Ürünün Nerede Olduğu</th>
          <th>Garanti Durumu</th>
          <th>Son Arıza / Müdahale</th>
          <th style="text-align: center;">Servis / Parça</th>
          <th style="text-align: right; min-width: 160px;">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(eq => {
          const lastFault = (eq.fault_history && eq.fault_history.length > 0) ? eq.fault_history[0] : null;
          let totalPartsCount = 0;
          (eq.fault_history || []).forEach(f => {
            if (f.replaced_parts && Array.isArray(f.replaced_parts)) {
              totalPartsCount += f.replaced_parts.length;
            }
          });

          const locType = eq.current_location_type || 'workshop';
          const locText = eq.current_location || 'Belirtilmedi';
          const isWar = eq.warranty_status === 'Garantili';

          return `
            <tr>
              <td>
                <a href="javascript:void(0)" class="equipment-serial-link" onclick="openDevicePassportModal('${escapeHtml(eq.serial_number)}')">
                  🏷️ <span>${escapeHtml(eq.serial_number)}</span>
                </a>
              </td>
              <td>
                <strong style="color: var(--text-main);">${escapeHtml(eq.brand)} ${escapeHtml(eq.model)}</strong>
                <div style="font-size: 0.74rem; color: var(--text-dim); margin-top: 2px;">${escapeHtml(eq.category || 'Genel Endüstriyel')}</div>
              </td>
              <td>
                <strong style="color: var(--text-main);">${escapeHtml(eq.customer_name)}</strong>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">📍 ${escapeHtml(eq.customer_address || 'İstanbul')}</div>
              </td>
              <td>
                <span class="equipment-loc-badge loc-${locType}">
                  ${escapeHtml(locText)}
                </span>
                ${eq.location_detail ? `<div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 2px;">${escapeHtml(eq.location_detail)}</div>` : ''}
              </td>
              <td>
                <span class="equipment-war-badge ${isWar ? 'war-active' : 'war-expired'}">
                  ${isWar ? `🛡️ Garantili` : `⚠️ Garanti Dışı`}
                </span>
                ${eq.warranty_end_date ? `<div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 2px;">Bitiş: ${escapeHtml(eq.warranty_end_date)}</div>` : ''}
              </td>
              <td>
                ${lastFault ? `
                  <div style="font-size: 0.78rem; font-weight: 600; color: #fbbf24;">${escapeHtml(lastFault.complaint.slice(0, 48))}${lastFault.complaint.length > 48 ? '...' : ''}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">${escapeHtml(lastFault.action.slice(0, 52))}...</div>
                ` : `<span style="color: var(--text-dim); font-size: 0.76rem;">Kayıtlı Arıza Yok</span>`}
              </td>
              <td style="text-align: center;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan);">${eq.service_count || (eq.fault_history ? eq.fault_history.length : 0)} Servis</span>
                <div style="font-size: 0.7rem; color: var(--text-muted);">${totalPartsCount} Parça Değişti</div>
              </td>
              <td style="text-align: right;">
                <div style="display: inline-flex; gap: 6px;">
                  <button class="btn btn-outline btn-xs" onclick="openDevicePassportModal('${escapeHtml(eq.serial_number)}')" title="Resmi Cihaz Pasaportunu Aç">
                    📋 Pasaport
                  </button>
                  <button class="btn btn-warning btn-xs" onclick="openUpdateDeviceLocationModal('${escapeHtml(eq.serial_number)}')" title="Cihaz Konumunu Değiştir">
                    📍 Konum
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

// Cihaz Sicil Pasaportu Modalı
let currentPassportDevice = null;

function openDevicePassportModal(serialNo) {
  if (!serialNo) return;
  const eq = (state.equipmentRegistry || []).find(e => String(e.serial_number).trim().toLowerCase() === String(serialNo).trim().toLowerCase());
  if (!eq) {
    showToast(`⚠️ '${serialNo}' seri numaralı cihaz sicil sisteminde bulunamadı.`);
    return;
  }
  currentPassportDevice = eq;

  const modal = document.getElementById('equipment-passport-modal');
  if (!modal) return;

  // Başlık ve Temel Bilgiler
  const elSerial = document.getElementById('pass-serial-display');
  const elTitle = document.getElementById('passport-modal-title');
  const elDevName = document.getElementById('pass-device-name');
  const elDevCat = document.getElementById('pass-device-cat');
  const elPrintDate = document.getElementById('pass-print-date');

  if (elSerial) elSerial.textContent = eq.serial_number;
  if (elTitle) elTitle.textContent = `${eq.brand} ${eq.model} - Cihaz Sicil Kartı`;
  if (elDevName) elDevName.textContent = `${eq.brand} ${eq.model}`;
  if (elDevCat) elDevCat.textContent = eq.category || 'Genel Endüstriyel Ekipman';
  if (elPrintDate) elPrintDate.textContent = `Belge Tarihi: ${new Date().toLocaleDateString('tr-TR')}`;

  // Konum Rozeti
  const elLocBadge = document.getElementById('pass-location-badge');
  const elLocDetail = document.getElementById('pass-location-detail');
  if (elLocBadge) {
    elLocBadge.className = `pass-location-badge pass-loc-${eq.current_location_type || 'workshop'}`;
    elLocBadge.textContent = eq.current_location || 'Merkez Servis Atölyesi';
  }
  if (elLocDetail) {
    elLocDetail.textContent = eq.location_detail || 'Mevcut faal lokasyon';
  }

  // Garanti Rozeti
  const elWarBadge = document.getElementById('pass-warranty-badge');
  const elWarSub = document.getElementById('pass-warranty-sub');
  const isWar = eq.warranty_status === 'Garantili';
  if (elWarBadge) {
    elWarBadge.className = `pass-warranty-badge ${isWar ? 'pass-war-active' : 'pass-war-expired'}`;
    elWarBadge.textContent = isWar ? '🛡️ Garanti Kapsamında' : '⚠️ Garanti Dışı / Ücretli';
  }
  if (elWarSub) {
    elWarSub.textContent = isWar ? `Bitiş Tarihi: ${eq.warranty_end_date || '2027'} (Faal Garanti)` : `Garanti Süresi Sona Erdi / Kapsam Dışı`;
  }

  // Müşteri Bilgisi
  const elCustName = document.getElementById('pass-customer-name');
  const elCustAddr = document.getElementById('pass-customer-address');
  if (elCustName) elCustName.textContent = eq.customer_name;
  if (elCustAddr) elCustAddr.textContent = `${eq.customer_address || 'İstanbul'} • Tel: ${eq.customer_phone || '-'}`;

  // Kronolojik Arıza & Müdahale Defteri (Timeline)
  const timelineContainer = document.getElementById('pass-timeline-container');
  const serviceCountTag = document.getElementById('pass-service-count-tag');
  const history = eq.fault_history || [];

  if (serviceCountTag) serviceCountTag.textContent = `${history.length} Servis Kaydı`;

  if (timelineContainer) {
    if (history.length === 0) {
      timelineContainer.innerHTML = `<div style="color: var(--text-muted); font-size: 0.82rem; padding: 10px;">Bu cihaza ait kayıtlı arıza geçmişi bulunmamaktadır.</div>`;
    } else {
      timelineContainer.innerHTML = history.map((f, idx) => `
        <div class="timeline-card">
          <div class="timeline-card-header">
            <div>
              <span class="timeline-badge-order">#${escapeHtml(f.order_code || 'SRV')}</span>
              <span style="margin-left: 8px; font-weight: 700; color: var(--text-main); font-size: 0.84rem;">Müdahale ${history.length - idx}</span>
            </div>
            <span class="timeline-date">📅 ${escapeHtml(f.date || '-')}</span>
          </div>
          <div class="timeline-complaint">
            ⚡ Arıza / Müşteri Şikayeti: <span>${escapeHtml(f.complaint || '-')}</span>
          </div>
          <div style="font-size: 0.78rem; color: #38bdf8; margin-bottom: 4px;">
            🔬 Teknisyen Tespiti & Kök Neden: <span>${escapeHtml(f.findings || '-')}</span>
          </div>
          <div class="timeline-action">
            🛠️ Yapılan İşlem & Müdahale: <span>${escapeHtml(f.action || '-')}</span>
          </div>
          ${f.replaced_parts && f.replaced_parts.length > 0 ? `
            <div style="margin-top: 6px; padding: 6px 8px; background: rgba(255, 255, 255, 0.03); border-radius: 4px; font-size: 0.76rem;">
              <strong style="color: #34d399;">⚙️ Takılan Parçalar:</strong>
              ${f.replaced_parts.map(p => `
                <span style="display: inline-block; margin-left: 6px; color: var(--text-main);">
                  • ${escapeHtml(p.name)} (${p.qty}x) 
                  ${p.currency && p.currency !== 'TRY' ? `[<strong style="color: #38bdf8;">${p.currency === 'USD' ? '$' : '€'}${p.originalPrice}</strong> ➔ ${p.priceTRY?.toLocaleString('tr-TR')} ₺]` : `[${p.priceTRY?.toLocaleString('tr-TR')} ₺]`}
                </span>
              `).join('')}
            </div>
          ` : ''}
          <div class="timeline-footer">
            <span>👨‍🔧 Müdahale Eden: <strong>${escapeHtml(f.technician || 'Saha Uzmanı')}</strong></span>
            <span>Durum: <strong style="color: #34d399;">${escapeHtml(f.status || 'Tamamlandı')}</strong> • Maliyet: <strong>${(f.totalCost || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</strong></span>
          </div>
        </div>
      `).join('');
    }
  }

  // Değiştirilen Parçalar Tablosu
  const partsTbody = document.getElementById('pass-parts-tbody');
  const partsCountTag = document.getElementById('pass-parts-count-tag');

  let allReplacedParts = [];
  let totalPartsCostTRY = 0;
  let totalLaborCostTRY = 0;

  history.forEach(f => {
    totalLaborCostTRY += (f.laborCost || 0);
    if (f.replaced_parts && Array.isArray(f.replaced_parts)) {
      f.replaced_parts.forEach(p => {
        allReplacedParts.push({
          ...p,
          date: f.date,
          technician: f.technician
        });
        totalPartsCostTRY += (p.priceTRY || (p.originalPrice * (p.exchangeRate || 1))) * (p.qty || 1);
      });
    }
  });

  if (partsCountTag) partsCountTag.textContent = `${allReplacedParts.length} Kalem Parça`;

  if (partsTbody) {
    if (allReplacedParts.length === 0) {
      partsTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-dim); padding: 14px;">Bu cihazda bugüne kadar parça değişimi yapılmamıştır.</td></tr>`;
    } else {
      partsTbody.innerHTML = allReplacedParts.map(p => {
        const lineTotal = (p.priceTRY || p.originalPrice) * (p.qty || 1);
        return `
          <tr>
            <td style="color: var(--text-muted); font-size: 0.74rem;">${escapeHtml(p.date || '-')}</td>
            <td>
              <strong style="color: var(--text-main); font-family: 'JetBrains Mono', monospace;">${escapeHtml(p.code || 'PARÇA')}</strong>
              <div style="font-size: 0.76rem; color: var(--text-dim);">${escapeHtml(p.name)}</div>
            </td>
            <td><span class="stock-cat-tag">Elektronik & Sarf</span></td>
            <td style="text-align: center; font-weight: 700; color: #34d399;">${p.qty || 1} Adet</td>
            <td style="text-align: right;">
              ${p.currency && p.currency !== 'TRY' ? `
                <span class="currency-badge currency-badge-${p.currency.toLowerCase()}">${p.currency === 'USD' ? '$' : '€'}${p.originalPrice}</span>
                <div style="font-size: 0.72rem; color: var(--text-dim);">${(p.priceTRY || p.originalPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</div>
              ` : `
                <strong>${(p.priceTRY || p.originalPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</strong>
              `}
            </td>
            <td style="text-align: right; font-weight: 700; color: #10b981;">
              ${lineTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
            </td>
            <td style="font-size: 0.74rem; color: var(--text-dim);">${escapeHtml(p.technician || '-')}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // Kümülatif Maliyetler
  const elSumCalls = document.getElementById('pass-sum-total-calls');
  const elSumParts = document.getElementById('pass-sum-parts-cost');
  const elSumLabor = document.getElementById('pass-sum-labor-cost');
  const elSumGrand = document.getElementById('pass-sum-grand-total');

  if (elSumCalls) elSumCalls.textContent = `${history.length} Kez Müdahale`;
  if (elSumParts) elSumParts.textContent = `${totalPartsCostTRY.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`;
  if (elSumLabor) elSumLabor.textContent = `${totalLaborCostTRY.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`;
  if (elSumGrand) elSumGrand.textContent = `${(totalPartsCostTRY + totalLaborCostTRY).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`;

  modal.style.display = 'flex';
}

function printDevicePassport() {
  document.body.classList.add('printing-equipment-passport');
  window.print();
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-equipment-passport');
  }, { once: true });
}

// Cihaz Konumu Değiştirme
let deviceToChangeLoc = null;

function openUpdateDeviceLocationModal(serialNo) {
  const eq = (state.equipmentRegistry || []).find(e => e.serial_number === serialNo);
  if (!eq) return;
  deviceToChangeLoc = eq;

  const modal = document.getElementById('equipment-location-modal');
  const title = document.getElementById('eq-loc-device-title');
  const sel = document.getElementById('eq-loc-select');
  const det = document.getElementById('eq-loc-detail');

  if (title) title.textContent = `${eq.brand} ${eq.model} (${eq.serial_number})`;
  if (sel) sel.value = eq.current_location_type || 'workshop';
  if (det) det.value = eq.location_detail || '';

  if (modal) modal.style.display = 'flex';
}

function saveDeviceLocation() {
  if (!deviceToChangeLoc) return;
  const sel = document.getElementById('eq-loc-select');
  const det = document.getElementById('eq-loc-detail');

  const locType = sel ? sel.value : 'workshop';
  const locDetail = det ? det.value.trim() : '';

  const locLabels = {
    workshop: '🔬 Merkez Servis Atölyesi (Onarımda)',
    customer: '🏢 Müşteri Sahasında (Montajlı)',
    warehouse: '📦 Merkez Depo (Konsinye / Yedek)',
    vehicle: '🚐 Mobil Servis Aracında (Sevkiyatta)',
    delivered: '✅ Müşteriye Teslim Edildi (Devrede)'
  };

  deviceToChangeLoc.current_location_type = locType;
  deviceToChangeLoc.current_location = locLabels[locType] || 'Merkez Servis Atölyesi';
  deviceToChangeLoc.location_detail = locDetail;

  saveEquipmentRegistryToLocalStorage();
  renderEquipmentRegistry();

  if (currentPassportDevice && currentPassportDevice.serial_number === deviceToChangeLoc.serial_number) {
    openDevicePassportModal(deviceToChangeLoc.serial_number);
  }

  const modal = document.getElementById('equipment-location-modal');
  if (modal) modal.style.display = 'none';

  showToast(`📍 Cihaz konumu başarıyla güncellendi: [${deviceToChangeLoc.current_location}]`);
}

// Yeni Cihaz Kaydı
function openNewEquipmentModal() {
  const modal = document.getElementById('new-equipment-modal');
  if (modal) modal.style.display = 'flex';
}

function saveNewEquipment() {
  const serial = (document.getElementById('new-eq-serial')?.value || '').trim();
  const brand = (document.getElementById('new-eq-brand')?.value || '').trim();
  const model = (document.getElementById('new-eq-model')?.value || '').trim();
  const category = document.getElementById('new-eq-category')?.value || 'Genel Endüstriyel Cihaz';
  const customer = (document.getElementById('new-eq-customer')?.value || '').trim();
  const phone = (document.getElementById('new-eq-phone')?.value || '').trim();
  const address = (document.getElementById('new-eq-address')?.value || '').trim();
  const locType = document.getElementById('new-eq-location')?.value || 'customer';
  const warrantyStatus = document.getElementById('new-eq-warranty-status')?.value || 'Garantili';
  const warrantyDate = document.getElementById('new-eq-warranty-date')?.value || '2027-10-27';

  if (!serial || !brand || !model || !customer) {
    showToast("⚠️ Lütfen Seri No, Marka, Model ve Müşteri alanlarını doldurun.");
    return;
  }

  // Seri No benzersizlik kontrolü
  const exists = (state.equipmentRegistry || []).some(e => e.serial_number.toLowerCase() === serial.toLowerCase());
  if (exists) {
    showToast(`⚠️ '${serial}' seri numaralı cihaz zaten sicil sisteminde kayıtlı.`);
    return;
  }

  const locLabels = {
    workshop: '🔬 Merkez Servis Atölyesi (Onarımda)',
    customer: '🏢 Müşteri Sahasında (Montajlı)',
    warehouse: '📦 Merkez Depo (Konsinye / Yedek)',
    vehicle: '🚐 Mobil Servis Aracında (Sevkiyatta)',
    delivered: '✅ Müşteriye Teslim Edildi (Devrede)'
  };

  const newDevice = {
    serial_number: serial.toUpperCase(),
    brand,
    model,
    category,
    customer_name: customer,
    customer_phone: phone,
    customer_address: address,
    commissioning_date: new Date().toISOString().split('T')[0],
    warranty_status: warrantyStatus,
    warranty_end_date: warrantyDate,
    current_location: locLabels[locType] || '🏢 Müşteri Sahasında',
    current_location_type: locType,
    location_detail: 'Yeni sicil kaydı açıldı',
    service_count: 0,
    fault_history: []
  };

  state.equipmentRegistry.unshift(newDevice);
  saveEquipmentRegistryToLocalStorage();
  renderEquipmentRegistry();

  const modal = document.getElementById('new-equipment-modal');
  if (modal) modal.style.display = 'none';

  showToast(`✅ '${serial}' seri numaralı cihaz sicil sistemine başarıyla kaydedildi.`);
}

// Cihaz Sicil Sistemi Event Listener'ları
function initEquipmentActions() {
  // Arama Kutusu
  const searchInput = document.getElementById('equipment-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.equipmentSearchTerm = e.target.value;
      renderEquipmentRegistry();
    });
  }

  const btnClearSearch = document.getElementById('btn-clear-equipment-search');
  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.equipmentSearchTerm = '';
      renderEquipmentRegistry();
    });
  }

  // Filtre Hapları
  const pillBtns = document.querySelectorAll('.eq-pill-btn');
  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeEquipmentFilter = btn.getAttribute('data-filter') || 'all';
      renderEquipmentRegistry();
    });
  });

  // Modal Açma / Kapatma
  const btnClosePassport = document.getElementById('btn-close-passport-modal');
  const btnClosePassportFooter = document.getElementById('btn-close-passport-modal-footer');
  const passportModal = document.getElementById('equipment-passport-modal');

  if (btnClosePassport && passportModal) {
    btnClosePassport.addEventListener('click', () => { passportModal.style.display = 'none'; });
  }
  if (btnClosePassportFooter && passportModal) {
    btnClosePassportFooter.addEventListener('click', () => { passportModal.style.display = 'none'; });
  }
  if (passportModal) {
    passportModal.addEventListener('click', (e) => {
      if (e.target === passportModal) passportModal.style.display = 'none';
    });
  }

  // Pasaport Yazdırma
  const btnPrintPassport = document.getElementById('btn-print-device-passport');
  if (btnPrintPassport) {
    btnPrintPassport.addEventListener('click', printDevicePassport);
  }

  // Pasaport üzerinden konum değiştir
  const btnPassportChangeLoc = document.getElementById('btn-passport-change-loc');
  if (btnPassportChangeLoc) {
    btnPassportChangeLoc.addEventListener('click', () => {
      if (currentPassportDevice) {
        openUpdateDeviceLocationModal(currentPassportDevice.serial_number);
      }
    });
  }

  // Pasaport üzerinden yeni çağrı aç
  const btnPassportNewCall = document.getElementById('btn-passport-new-call');
  if (btnPassportNewCall) {
    btnPassportNewCall.addEventListener('click', () => {
      if (currentPassportDevice) {
        if (passportModal) passportModal.style.display = 'none';
        const intakeModal = document.getElementById('intake-modal');
        if (intakeModal) {
          intakeModal.style.display = 'flex';
          const custNameInput = document.getElementById('intake-customer-name');
          const devBrandInput = document.getElementById('intake-device-brand');
          const devModelInput = document.getElementById('intake-device-model');
          const devSerialInput = document.getElementById('intake-serial-number');
          if (custNameInput) custNameInput.value = currentPassportDevice.customer_name;
          if (devBrandInput) devBrandInput.value = currentPassportDevice.brand;
          if (devModelInput) devModelInput.value = currentPassportDevice.model;
          if (devSerialInput) devSerialInput.value = currentPassportDevice.serial_number;
        }
      }
    });
  }

  // Konum modalı
  const btnCloseLocModal = document.getElementById('btn-close-eq-loc-modal');
  const btnCancelLoc = document.getElementById('btn-cancel-eq-loc');
  const btnSaveLoc = document.getElementById('btn-save-eq-loc');
  const locModal = document.getElementById('equipment-location-modal');

  if (btnCloseLocModal && locModal) btnCloseLocModal.addEventListener('click', () => { locModal.style.display = 'none'; });
  if (btnCancelLoc && locModal) btnCancelLoc.addEventListener('click', () => { locModal.style.display = 'none'; });
  if (btnSaveLoc) btnSaveLoc.addEventListener('click', saveDeviceLocation);
  if (locModal) {
    locModal.addEventListener('click', (e) => {
      if (e.target === locModal) locModal.style.display = 'none';
    });
  }

  // Yeni cihaz modalı
  const btnOpenNewEq = document.getElementById('btn-open-new-equipment-modal');
  const btnCloseNewEq = document.getElementById('btn-close-new-eq-modal');
  const btnCancelNewEq = document.getElementById('btn-cancel-new-eq');
  const btnSaveNewEq = document.getElementById('btn-save-new-eq');
  const newEqModal = document.getElementById('new-equipment-modal');

  if (btnOpenNewEq) btnOpenNewEq.addEventListener('click', openNewEquipmentModal);
  if (btnCloseNewEq && newEqModal) btnCloseNewEq.addEventListener('click', () => { newEqModal.style.display = 'none'; });
  if (btnCancelNewEq && newEqModal) btnCancelNewEq.addEventListener('click', () => { newEqModal.style.display = 'none'; });
  if (btnSaveNewEq) btnSaveNewEq.addEventListener('click', saveNewEquipment);
  if (newEqModal) {
    newEqModal.addEventListener('click', (e) => {
      if (e.target === newEqModal) newEqModal.style.display = 'none';
    });
  }
}

window.initEquipmentRegistry = initEquipmentRegistry;
window.renderEquipmentRegistry = renderEquipmentRegistry;
window.openDevicePassportModal = openDevicePassportModal;
window.openUpdateDeviceLocationModal = openUpdateDeviceLocationModal;
window.openNewEquipmentModal = openNewEquipmentModal;
window.saveDeviceLocation = saveDeviceLocation;
window.saveNewEquipment = saveNewEquipment;
window.printDevicePassport = printDevicePassport;
window.initEquipmentActions = initEquipmentActions;

// ================================================================================
//   19. SESLİ SAHA MÜDAHALE ASİSTANI (VOICE-TO-TEXT & AI AYRIŞTIRMA MOTORU)
// ================================================================================

let speechRecognitionInstance = null;
let isVoiceRecordingActive = false;
let activeVoiceTargetId = null; // null: Akıllı 3 Adıma Ayrıştırma, ya da input ID'si

function initVoiceInterventionEngine() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRec) {
    try {
      speechRecognitionInstance = new SpeechRec();
      speechRecognitionInstance.continuous = true;
      speechRecognitionInstance.interimResults = true;
      speechRecognitionInstance.lang = 'tr-TR';

      speechRecognitionInstance.onstart = () => {
        isVoiceRecordingActive = true;
        updateVoiceUIState(true);
      };

      speechRecognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const liveTextEl = document.getElementById('tech-voice-live-text');
        const currentSpoken = (finalTranscript || interimTranscript).trim();
        if (liveTextEl && currentSpoken) {
          liveTextEl.textContent = `Dinleniyor: "${currentSpoken}"`;
        }

        if (finalTranscript) {
          applySpokenText(finalTranscript);
        }
      };

      speechRecognitionInstance.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          showToast('⚠️ Mikrofon erişim izni verilmedi. Tarayıcı ayarlarından mikrofon iznini açın.', 'warning');
        }
        stopVoiceRecognition();
      };

      speechRecognitionInstance.onend = () => {
        isVoiceRecordingActive = false;
        updateVoiceUIState(false);
      };
    } catch (e) {
      console.warn('Speech recognition başlatılamadı:', e);
    }
  }

  // Buton Olay Dinleyicileri
  const btnSmartVoice = document.getElementById('btn-voice-dictate-smart');
  if (btnSmartVoice) {
    btnSmartVoice.addEventListener('click', () => {
      if (isVoiceRecordingActive) {
        stopVoiceRecognition();
      } else {
        startVoiceRecognition(null); // Akıllı mod
      }
    });
  }

  const btnStopVoice = document.getElementById('btn-voice-stop');
  if (btnStopVoice) {
    btnStopVoice.addEventListener('click', stopVoiceRecognition);
  }

  // Mini Tekil Dikte Butonları
  const bindMiniMic = (btnId, targetInputId) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (isVoiceRecordingActive && activeVoiceTargetId === targetInputId) {
        stopVoiceRecognition();
      } else {
        startVoiceRecognition(targetInputId);
      }
    });
  };

  bindMiniMic('btn-voice-findings', 'tech-findings-input');
  bindMiniMic('btn-voice-solution', 'tech-solution-input');
  bindMiniMic('btn-voice-action', 'tech-action-input');
  bindMiniMic('btn-voice-step', 'tech-new-step-input');
}

function startVoiceRecognition(targetId = null) {
  activeVoiceTargetId = targetId;

  if (speechRecognitionInstance) {
    try {
      speechRecognitionInstance.start();
      return;
    } catch (e) {
      // Zaten çalışıyorsa yeniden dene
      try {
        speechRecognitionInstance.stop();
        setTimeout(() => speechRecognitionInstance.start(), 200);
        return;
      } catch (err) {}
    }
  }

  // Tarayıcı Web Speech API desteklemiyorsa veya mikrofon yoksa simülasyon/kullanıcı rehberi sun
  simulateVoiceDictationFallback(targetId);
}

function stopVoiceRecognition() {
  if (speechRecognitionInstance && isVoiceRecordingActive) {
    try { speechRecognitionInstance.stop(); } catch (e) {}
  }
  isVoiceRecordingActive = false;
  updateVoiceUIState(false);
}

function updateVoiceUIState(recording) {
  const bar = document.getElementById('tech-voice-bar');
  const banner = document.getElementById('tech-voice-transcript-banner');
  const btnSmart = document.getElementById('btn-voice-dictate-smart');
  const btnText = document.getElementById('btn-voice-text');

  if (bar) bar.classList.toggle('is-listening', recording);
  if (banner) banner.style.display = recording ? 'flex' : 'none';
  if (btnSmart) btnSmart.classList.toggle('recording', recording);
  if (btnText) btnText.textContent = recording ? 'Dinleniyor... (Durdur)' : 'Konuşarak Kaydet (Canlı Dikte)';

  // Mini butonların durumu
  ['btn-voice-findings', 'btn-voice-solution', 'btn-voice-action', 'btn-voice-step'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('recording');
  });

  if (recording && activeVoiceTargetId) {
    if (activeVoiceTargetId === 'tech-findings-input') document.getElementById('btn-voice-findings')?.classList.add('recording');
    if (activeVoiceTargetId === 'tech-solution-input') document.getElementById('btn-voice-solution')?.classList.add('recording');
    if (activeVoiceTargetId === 'tech-action-input') document.getElementById('btn-voice-action')?.classList.add('recording');
    if (activeVoiceTargetId === 'tech-new-step-input') document.getElementById('btn-voice-step')?.classList.add('recording');
  }
}

function applySpokenText(spokenText) {
  if (!spokenText || !spokenText.trim()) return;
  const clean = spokenText.trim();

  // 1. Durum: Belirli tek bir kutuya dikte ediliyor
  if (activeVoiceTargetId) {
    const targetEl = document.getElementById(activeVoiceTargetId);
    if (targetEl) {
      if (activeVoiceTargetId === 'tech-new-step-input') {
        targetEl.value = clean;
        addTechWorkStep(clean);
        targetEl.value = '';
      } else {
        const existing = targetEl.value.trim();
        targetEl.value = existing ? `${existing} ${clean}` : clean;
        targetEl.dispatchEvent(new Event('input', { bubbles: true }));
      }
      showToast(`🎙️ Ses metne döküldü: "${clean.slice(0, 35)}..."`, 'info');
    }
    return;
  }

  // 2. Durum: AKILLI AI MÜDAHALE AYRIŞTIRMA (Smart Voice Distribution)
  // Teknisyen serbest konuştuğunda metni cümlelere bölüp tespit, çözüm ve müdahale kutularına dağıt
  distributeVoiceTranscriptSmartly(clean);
}

function distributeVoiceTranscriptSmartly(transcript) {
  const sentences = transcript.split(/(?<=[.?!])\s+/).filter(Boolean);
  let findingsPart = [];
  let solutionPart = [];
  let actionPart = [];

  const findingsKeywords = ['arıza', 'ariza', 'tespit', 'hata', 'yandı', 'yandi', 'patlak', 'kısa devre', 'kisa devre', 'yanık', 'yanik', 'şase', 'sase', 'ölçüm', 'olcum', 'kod', 'oc-a', 'err', 'f00', 'voltaj', 'akım', 'akim'];
  const solutionKeywords = ['çözüm', 'cozum', 'plan', 'değişecek', 'degisecek', 'yenilenecek', 'sipariş', 'siparis', 'metot', 'yapılmalı', 'yapilmali', 'lehimlenecek', 'gerekiyor'];
  const actionKeywords = ['yaptım', 'yaptim', 'değiştirdim', 'degistirdim', 'lehimledim', 'taktım', 'taktim', 'bağladım', 'bagladim', 'temizledim', 'test ettim', 'çalışıyor', 'calisiyor', 'tamamlandı', 'tamamlandi', 'onarıldı', 'onarildi'];

  sentences.forEach(s => {
    const lower = s.toLowerCase();
    if (actionKeywords.some(kw => lower.includes(kw))) {
      actionPart.push(s);
    } else if (solutionKeywords.some(kw => lower.includes(kw))) {
      solutionPart.push(s);
    } else if (findingsKeywords.some(kw => lower.includes(kw))) {
      findingsPart.push(s);
    } else {
      // Genel cümleyse müdahaleye ekle
      actionPart.push(s);
    }
  });

  // Eğer tüm cümleler tek bir kategoriye düşmüşse akıllı doldur
  if (findingsPart.length === 0 && actionPart.length > 0) {
    findingsPart.push(`Cihaz arıza belirtileri ve sesli saha tespiti: ${transcript}`);
  }
  if (actionPart.length === 0) {
    actionPart.push(transcript);
  }

  const findingsInput = document.getElementById('tech-findings-input');
  const solutionInput = document.getElementById('tech-solution-input');
  const actionInput = document.getElementById('tech-action-input');

  if (findingsInput && findingsPart.length > 0) {
    const text = findingsPart.join(' ');
    findingsInput.value = findingsInput.value ? `${findingsInput.value} ${text}` : text;
    findingsInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  if (solutionInput && solutionPart.length > 0) {
    const text = solutionPart.join(' ');
    solutionInput.value = solutionInput.value ? `${solutionInput.value} ${text}` : text;
    solutionInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  if (actionInput && actionPart.length > 0) {
    const text = actionPart.join(' ');
    actionInput.value = actionInput.value ? `${actionInput.value} ${text}` : text;
    actionInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // İş Adımları günlüğüne de ekle
  addTechWorkStep(actionPart.join(' ') || transcript);

  showToast(`🧠 Yapay Zeka sesinizi dinledi: Tespit, Çözüm ve Müdahale kutuları otomatik dolduruldu!`, 'success');
}

// Mikrofon olmayan veya simülasyon ortamları için test diktesi
function simulateVoiceDictationFallback(targetId) {
  updateVoiceUIState(true);
  const liveTextEl = document.getElementById('tech-voice-live-text');
  if (liveTextEl) {
    liveTextEl.textContent = `🎙️ Mikrofon Simülasyonu: "Saha teknisyeni konuşuyor..."`;
  }

  setTimeout(() => {
    let sampleText = "Sürücüde OC-A aşırı akım arızası ve IGBT kısa devresi tespit edildi. Hasarlı IGBT modülü sökülüp yenisi lehimlendi ve 30 dakika tam yükte test edildi.";
    if (targetId === 'tech-findings-input') sampleText = "Cihaz giriş köprü diyotunda ve IGBT modülünde aşırı akım sızıntısı saptandı.";
    if (targetId === 'tech-solution-input') sampleText = "Hasarlı IGBT ve tetikleme dirençleri yenilenecek, filtre kondansatörleri ESR testinden geçirilecek.";
    if (targetId === 'tech-action-input') sampleText = "Yeni IGBT monte edildi, termal macun tazelendi, 24V bara gerilimi doğrulandı ve yük testi tamamlandı.";
    if (targetId === 'tech-new-step-input') sampleText = "SMPS kartındaki T2A cam sigorta ve köprü diyot yenilendi.";

    applySpokenText(sampleText);
    stopVoiceRecognition();
  }, 1600);
}

window.initVoiceInterventionEngine = initVoiceInterventionEngine;
window.startVoiceRecognition = startVoiceRecognition;
window.stopVoiceRecognition = stopVoiceRecognition;
window.applySpokenText = applySpokenText;


// ================================================================================
//   20. İNTERAKTİF WEB & SOSYAL MEDYA SERVİS TALEP FORMU (EMBED HUB)
// ================================================================================

function initEmbedWidgetActions() {
  const btnOpenEmbed = document.getElementById('btn-open-embed-modal');
  const btnCloseEmbed = document.getElementById('btn-close-embed-modal');
  const btnCloseEmbedFooter = document.getElementById('btn-close-embed-modal-footer');
  const modal = document.getElementById('embed-widget-modal');

  if (btnOpenEmbed && modal) {
    btnOpenEmbed.addEventListener('click', () => { modal.style.display = 'flex'; });
  }
  if (btnCloseEmbed && modal) {
    btnCloseEmbed.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  if (btnCloseEmbedFooter && modal) {
    btnCloseEmbedFooter.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Iframe Kodu Kopyalama
  const btnCopyIframe = document.getElementById('btn-copy-embed-iframe');
  if (btnCopyIframe) {
    btnCopyIframe.addEventListener('click', () => {
      const codeInput = document.getElementById('embed-iframe-code');
      if (codeInput) {
        codeInput.select();
        navigator.clipboard.writeText(codeInput.value).then(() => {
          showToast('📋 Iframe kodu panoya kopyalandı! Web sitenize dilediğiniz bloğa yapıştırabilirsiniz.', 'success');
        });
      }
    });
  }

  // Biyo Linki Kopyalama
  const btnCopyLink = document.getElementById('btn-copy-embed-link');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      const linkInput = document.getElementById('embed-direct-link');
      if (linkInput) {
        linkInput.select();
        navigator.clipboard.writeText(linkInput.value).then(() => {
          showToast('🔗 Sosyal medya biyo / WhatsApp linki kopyalandı!', 'success');
        });
      }
    });
  }

  // Örnek Web Çağrısı Gönder Simülasyonu
  const btnSimulateWeb = document.getElementById('btn-simulate-web-intake');
  if (btnSimulateWeb) {
    btnSimulateWeb.addEventListener('click', () => {
      simulateIncomingWebIntakeOrder();
    });
  }

  // Iframe içi postMessage dinleyicisi (widget.html'den gelen gerçek form gönderimleri)
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SERVISAI_NEW_INTAKE' && event.data.order) {
      handleIncomingWebOrder(event.data.order);
    }
  });
}

function handleIncomingWebOrder(order) {
  if (!order) return;
  if (!state.workOrders) state.workOrders = [];

  // Zaten var mı kontrol et
  const exists = state.workOrders.some(o => (o.code || o.tracking_code || o.id) === (order.code || order.tracking_code || order.id));
  if (!exists) {
    state.workOrders.unshift(order);
    saveWorkOrdersToLocalStorage();
    consolidateAllWorkOrders();
    renderIncomingCalls();
    updateActiveOrdersKPI();
    showToast(`🌐 Yeni Müşteri Web Kaydı Düştü: #${order.id || order.tracking_code} - ${order.customer_name}`, 'success');

    // Aktif Sevk Masası sekmesine odaklan
    const tabActive = document.getElementById('tab-dispatch-active');
    if (tabActive) tabActive.click();
  }
}

function simulateIncomingWebIntakeOrder() {
  const rndNum = Math.floor(100 + Math.random() * 900);
  const webOrder = {
    id: `SRV-WEB-2026-${rndNum}`,
    tracking_code: `SRV-WEB-2026-${rndNum}`,
    code: `SRV-WEB-2026-${rndNum}`,
    customer_name: "Borusan Çelik Boru Fabrikası (Web Formu)",
    contact_person: "Mühendis Serkan Öz",
    phone: "0216 585 90 00",
    city: "Kocaeli / Dilovası OSB",
    address: "Dilovası OSB 4. Kısım D-100 Yanı, Kocaeli",
    device_brand: "ABB",
    device_model: "ACS880 37kW Ağır Sanayi Sürücü",
    device_type: "İnvertör / AC Sürücü",
    device_serial: `ABB-2025-${rndNum}`,
    symptom: "Ekstrüzyon hattı hızlanırken F0001 aşırı akım kesmesi veriyor, üretim durdu.",
    status: "Yeni",
    channel: "web_form",
    channel_badge: "🌐 Web Sitesi Çağrısı",
    urgency: "Kritik",
    created_at: new Date().toISOString(),
    assigned_tech: null,
    estimated_cost: 850
  };

  handleIncomingWebOrder(webOrder);

  const embedModal = document.getElementById('embed-widget-modal');
  if (embedModal) embedModal.style.display = 'none';
}

window.initEmbedWidgetActions = initEmbedWidgetActions;
window.handleIncomingWebOrder = handleIncomingWebOrder;
window.simulateIncomingWebIntakeOrder = simulateIncomingWebIntakeOrder;


// ================================================================================
//   21. RESMİ e-FATURA / e-ARŞİV VE BULUT MUHASEBE ENTEGRASYON MOTORU
//   (PARAŞÜT, KOLAYBİ, BİZİMHESAP VE GİB UBL-TR 2.1)
// ================================================================================

state.efaturaSettings = {
  provider: 'parasut',
  apiKey: 'prs_live_9921_kocas_tek',
  apiSecret: '••••••••••••••••',
  prefix: 'GIB',
  sandbox: true,
  autoSync: true
};

let currentEfaturaData = null;

function loadEfaturaSettings() {
  try {
    const raw = localStorage.getItem('servisai_efatura_settings');
    if (raw) {
      state.efaturaSettings = { ...state.efaturaSettings, ...JSON.parse(raw) };
    }
  } catch (e) {}

  // Arayüz elemanlarını güncelle
  const provEl = document.getElementById('setting-efatura-provider');
  const keyEl = document.getElementById('setting-efatura-key');
  const secretEl = document.getElementById('setting-efatura-secret');
  const prefixEl = document.getElementById('setting-efatura-prefix');
  const sandEl = document.getElementById('setting-efatura-sandbox');
  const autoEl = document.getElementById('setting-efatura-auto-sync');

  if (provEl) provEl.value = state.efaturaSettings.provider || 'parasut';
  if (keyEl) keyEl.value = state.efaturaSettings.apiKey || '';
  if (secretEl && state.efaturaSettings.apiSecret) secretEl.value = state.efaturaSettings.apiSecret;
  if (prefixEl) prefixEl.value = state.efaturaSettings.prefix || 'GIB';
  if (sandEl) sandEl.checked = !!state.efaturaSettings.sandbox;
  if (autoEl) autoEl.checked = !!state.efaturaSettings.autoSync;
}

function saveEfaturaSettings() {
  const provEl = document.getElementById('setting-efatura-provider');
  const keyEl = document.getElementById('setting-efatura-key');
  const secretEl = document.getElementById('setting-efatura-secret');
  const prefixEl = document.getElementById('setting-efatura-prefix');
  const sandEl = document.getElementById('setting-efatura-sandbox');
  const autoEl = document.getElementById('setting-efatura-auto-sync');

  state.efaturaSettings = {
    provider: provEl ? provEl.value : 'parasut',
    apiKey: keyEl ? keyEl.value.trim() : '',
    apiSecret: secretEl ? secretEl.value.trim() : '',
    prefix: (prefixEl ? prefixEl.value.trim().toUpperCase() : 'GIB') || 'GIB',
    sandbox: sandEl ? sandEl.checked : true,
    autoSync: autoEl ? autoEl.checked : true
  };

  try {
    localStorage.setItem('servisai_efatura_settings', JSON.stringify(state.efaturaSettings));
    showToast('💾 e-Fatura & Muhasebe Entegratör Ayarları Kaydedildi!', 'success');
  } catch (e) {}
}

function initEfaturaEngine() {
  loadEfaturaSettings();

  const btnSaveSettings = document.getElementById('btn-save-efatura-settings');
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', saveEfaturaSettings);
  }

  // Muhasebe Fişi içindeki e-Fatura Açma Butonu
  const btnOpenEfatura = document.getElementById('btn-open-efatura-modal');
  if (btnOpenEfatura) {
    btnOpenEfatura.addEventListener('click', () => {
      openEfaturaPreviewModal();
    });
  }

  // e-Fatura Modalı Kapatma
  const btnCloseModal = document.getElementById('btn-close-efatura-modal');
  const btnCloseModalAlt = document.getElementById('btn-close-efatura-modal-alt');
  const efaturaModal = document.getElementById('efatura-preview-modal');

  if (btnCloseModal && efaturaModal) {
    btnCloseModal.addEventListener('click', () => { efaturaModal.style.display = 'none'; });
  }
  if (btnCloseModalAlt && efaturaModal) {
    btnCloseModalAlt.addEventListener('click', () => { efaturaModal.style.display = 'none'; });
  }
  if (efaturaModal) {
    efaturaModal.addEventListener('click', (e) => {
      if (e.target === efaturaModal) efaturaModal.style.display = 'none';
    });
  }

  // API İletim Butonu (Paraşüt / KolayBi)
  const btnSendApi = document.getElementById('btn-send-to-integrator-api');
  if (btnSendApi) {
    btnSendApi.addEventListener('click', transmitInvoiceToIntegratorApi);
  }

  // UBL-TR 2.1 XML İndirme
  const btnDownloadXml = document.getElementById('btn-download-ubl-xml');
  if (btnDownloadXml) {
    btnDownloadXml.addEventListener('click', downloadUblTrXml);
  }

  // e-Fatura Yazdırma
  const btnPrintEfatura = document.getElementById('btn-print-efatura');
  if (btnPrintEfatura) {
    btnPrintEfatura.addEventListener('click', printEfaturaDocument);
  }
}

function openEfaturaPreviewModal(orderCode = null) {
  const modal = document.getElementById('efatura-preview-modal');
  if (!modal) return;

  // Aktif siparişi ya da fişteki siparişi çöz
  const currentCode = orderCode || (document.getElementById('rcpt-tracking-code')?.textContent || '').replace('#', '').trim() || (state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : 'SRV-2026-104');
  const order = (state.workOrders || []).find(o => (o.tracking_code || o.code || o.id) === currentCode) || state.activeOrder || {};

  const customerName = order.customer_name || document.getElementById('rcpt-customer-name')?.textContent || 'ISISAN İklimlendirme A.Ş.';
  const customerAddress = order.customer_address || document.getElementById('rcpt-customer-address')?.textContent || 'Dudullu OSB 2. Cadde No: 14 Ümraniye / İstanbul';
  const customerPhone = order.phone || document.getElementById('rcpt-customer-phone')?.textContent || '0216 455 10 20';

  // Vergi mükellefi mi yoksa şahıs mı kontrolü
  const isCompany = !customerName.includes('Yılmaz') && !customerName.includes('Demir') && (customerName.includes('A.Ş.') || customerName.includes('Ltd') || customerName.includes('Sanayi') || customerName.includes('Fabrika') || customerName.includes('Tesis'));
  const vkn = isCompany ? '4810928371' : '19827364521';
  const vd = isCompany ? 'Sarıgazi Vergi Dairesi' : 'Kadıköy Vergi Dairesi';
  const invoiceType = isCompany ? 'e-Fatura (VKN Kurumsal Mükellef)' : 'e-Arşiv Fatura (Bireysel / TCKN)';
  const invoiceBadgeTitle = isCompany ? 'E-FATURA' : 'E-ARŞİV FATURA';

  // Maliyet hesapları
  const laborCost = order.labor_cost || (state.activeOrder ? state.activeOrder.laborCost : 600) || 600;
  let parts = order.used_parts || order.usedParts || (state.activeOrder ? state.activeOrder.usedParts : []) || [];
  if (parts.length === 0) {
    parts = [
      { name: "Semikron 1200V 50A IGBT Güç Modülü (İthal)", qty: 1, unit_price: 1732.50, total: 1732.50, currency: "USD" }
    ];
  }

  let subtotal = laborCost;
  parts.forEach(p => {
    subtotal += (parseFloat(p.total || (p.qty * p.unit_price) || 0) || 0);
  });

  const vatRate = 0.20;
  const vatAmount = Math.round(subtotal * vatRate * 100) / 100;
  const grandTotal = Math.round((subtotal + vatAmount) * 100) / 100;

  const prefix = state.efaturaSettings.prefix || 'GIB';
  const orderNum = currentCode.replace(/[^0-9]/g, '').slice(-3) || '104';
  const invoiceNo = `${prefix}2026000000${orderNum}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('tr-TR');
  const timeStr = now.toLocaleTimeString('tr-TR');
  const uuid = generatePseudoUuid();

  currentEfaturaData = {
    invoiceNo,
    uuid,
    invoiceType: isCompany ? 'EFATURA' : 'EARSIV',
    date: dateStr,
    time: timeStr,
    customerName,
    customerAddress,
    customerPhone,
    vkn,
    vd,
    laborCost,
    parts,
    subtotal,
    vatRate: 20,
    vatAmount,
    grandTotal,
    provider: state.efaturaSettings.provider || 'parasut',
    orderCode: currentCode
  };

  // DOM Doldurma
  const provNames = {
    parasut: 'Paraşüt (Mikro Yazılım API v4)',
    kolaybi: 'KolayBi (REST API v1)',
    bizimhesap: 'BizimHesap API',
    logoisbasi: 'Logo İşbaşı API',
    gib_direct: 'GİB UBL-TR Doğrudan Entegratör'
  };

  document.getElementById('efatura-active-provider-name').textContent = provNames[currentEfaturaData.provider] || 'Paraşüt API';
  document.getElementById('efatura-env-badge').textContent = state.efaturaSettings.sandbox ? 'Sandbox / Test Modu' : 'Canlı (GİB Production)';
  document.getElementById('efatura-detected-type').textContent = invoiceType;
  document.getElementById('efatura-title-badge').textContent = invoiceBadgeTitle;
  document.getElementById('efatura-invoice-no').textContent = invoiceNo;
  document.getElementById('efatura-uuid').textContent = uuid;

  document.getElementById('efat-cust-name').textContent = customerName;
  document.getElementById('efat-cust-address').textContent = customerAddress;
  document.getElementById('efat-cust-vkn').textContent = vkn;
  document.getElementById('efat-cust-vd').textContent = vd;
  document.getElementById('efat-date').textContent = dateStr;
  document.getElementById('efat-time').textContent = timeStr;

  // Kalemler Tablosu
  const tbody = document.getElementById('efat-items-tbody');
  if (tbody) {
    let rowsHtml = `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 8px 6px;">1</td>
        <td style="padding: 8px 6px;">
          <strong>Uzman Saha Mühendisliği ve Elektronik Onarım Hizmet Bedeli</strong>
          <div style="font-size: 0.72rem; color: #6b7280;">İş Emri: #${currentCode} Teknik Müdahale Hizmeti</div>
        </td>
        <td style="padding: 8px 6px; text-align: center;">1 Adet</td>
        <td style="padding: 8px 6px; text-align: right;">${formatMoney(laborCost)} ₺</td>
        <td style="padding: 8px 6px; text-align: center;">%20</td>
        <td style="padding: 8px 6px; text-align: right;">${formatMoney(laborCost * 0.2)} ₺</td>
        <td style="padding: 8px 6px; text-align: right; font-weight: 700;">${formatMoney(laborCost)} ₺</td>
      </tr>
    `;

    parts.forEach((p, idx) => {
      const pQty = p.qty || 1;
      const pPrice = parseFloat(p.unit_price || p.unitPrice || 0) || 0;
      const pTot = parseFloat(p.total || (pQty * pPrice)) || 0;
      const pVat = pTot * 0.20;

      rowsHtml += `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 8px 6px;">${idx + 2}</td>
          <td style="padding: 8px 6px;">
            <strong>${escapeHtml(p.name || 'Yedek Parça')}</strong>
            <div style="font-size: 0.72rem; color: #6b7280;">Parça Kodu: ${escapeHtml(p.code || 'PRC-001')}</div>
          </td>
          <td style="padding: 8px 6px; text-align: center;">${pQty} Adet</td>
          <td style="padding: 8px 6px; text-align: right;">${formatMoney(pPrice)} ₺</td>
          <td style="padding: 8px 6px; text-align: center;">%20</td>
          <td style="padding: 8px 6px; text-align: right;">${formatMoney(pVat)} ₺</td>
          <td style="padding: 8px 6px; text-align: right; font-weight: 700;">${formatMoney(pTot)} ₺</td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;
  }

  document.getElementById('efat-subtotal-display').textContent = `${formatMoney(subtotal)} ₺`;
  document.getElementById('efat-vat-display').textContent = `${formatMoney(vatAmount)} ₺`;
  document.getElementById('efat-grandtotal-display').textContent = `${formatMoney(grandTotal)} ₺`;

  const btnSendText = document.getElementById('btn-integrator-send-text');
  if (btnSendText) {
    const provNameShort = currentEfaturaData.provider === 'kolaybi' ? 'KolayBi' : 'Paraşüt';
    btnSendText.textContent = `🚀 ${provNameShort} API ile Faturayı Gönder & Onayla`;
  }

  modal.style.display = 'flex';
}

function transmitInvoiceToIntegratorApi() {
  if (!currentEfaturaData) return;

  const btnSend = document.getElementById('btn-send-to-integrator-api');
  const btnText = document.getElementById('btn-integrator-send-text');

  if (btnSend) btnSend.disabled = true;
  if (btnText) btnText.textContent = `⏳ ${currentEfaturaData.provider === 'kolaybi' ? 'KolayBi' : 'Paraşüt'} API'ye Gönderiliyor...`;

  // Paraşüt / KolayBi REST API Payload Simülasyonu
  const payload = {
    data: {
      type: "sales_invoices",
      attributes: {
        item_type: "invoice",
        description: `Teknik Servis Müdahale Faturası (#${currentEfaturaData.orderCode})`,
        issue_date: new Date().toISOString().split('T')[0],
        invoice_series: state.efaturaSettings.prefix || 'GIB',
        invoice_id: currentEfaturaData.invoiceNo,
        currency: "TRL",
        vat_withholding_code: null,
        billing_address: currentEfaturaData.customerAddress,
        tax_office: currentEfaturaData.vd,
        tax_number: currentEfaturaData.vkn,
        total_subtotal: currentEfaturaData.subtotal,
        total_vat: currentEfaturaData.vatAmount,
        net_total: currentEfaturaData.grandTotal
      }
    }
  };

  setTimeout(() => {
    if (btnSend) btnSend.disabled = false;
    if (btnText) btnText.textContent = `✅ GİB'e Başarıyla İletildi (Onaylandı)`;

    // İlgili iş emrine fatura numarasını ve durumunu yaz
    const matchOrder = (state.workOrders || []).find(o => (o.code || o.tracking_code || o.id) === currentEfaturaData.orderCode);
    if (matchOrder) {
      matchOrder.invoice_status = 'efatura_sent';
      matchOrder.invoice_number = currentEfaturaData.invoiceNo;
      matchOrder.einvoice_uuid = currentEfaturaData.uuid;
      saveWorkOrdersToLocalStorage();
      consolidateAllWorkOrders();
      renderIncomingCalls();
    }

    // Muhasebe Fişi modalındaki statüyü de güncelle
    const rcptStatus = document.getElementById('rcpt-payment-status');
    if (rcptStatus) {
      rcptStatus.textContent = `e-Fatura Kesildi (#${currentEfaturaData.invoiceNo})`;
      rcptStatus.className = 'badge badge-success';
    }

    showToast(`🎉 Resmi e-Fatura (${currentEfaturaData.invoiceNo}) ${currentEfaturaData.provider.toUpperCase()} API üzerinden GİB sistemine başarıyla iletildi ve onaylandı!`, 'success');
  }, 900);
}

function downloadUblTrXml() {
  if (!currentEfaturaData) return;

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>TR1.2</cbc:CustomizationID>
  <cbc:ProfileID>TICARIFATURA</cbc:ProfileID>
  <cbc:ID>${currentEfaturaData.invoiceNo}</cbc:ID>
  <cbc:CopyIndicator>false</cbc:CopyIndicator>
  <cbc:UUID>${currentEfaturaData.uuid}</cbc:UUID>
  <cbc:IssueDate>${new Date().toISOString().split('T')[0]}</cbc:IssueDate>
  <cbc:IssueTime>${currentEfaturaData.time}</cbc:IssueTime>
  <cbc:InvoiceTypeCode>${currentEfaturaData.invoiceType === 'EFATURA' ? 'SATIS' : 'EARSIV'}</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>TRY</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyIdentification><cbc:ID schemeID="VKN">5740192831</cbc:ID></cac:PartyIdentification>
      <cac:PartyName><cbc:Name>KOÇAŞ TEKNİK SERVİS VE MÜHENDİSLİK HİZMETLERİ</cbc:Name></cac:PartyName>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyIdentification><cbc:ID schemeID="VKN">${currentEfaturaData.vkn}</cbc:ID></cac:PartyIdentification>
      <cac:PartyName><cbc:Name>${escapeXml(currentEfaturaData.customerName)}</cbc:Name></cac:PartyName>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="TRY">${currentEfaturaData.vatAmount.toFixed(2)}</cbc:TaxAmount>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="TRY">${currentEfaturaData.subtotal.toFixed(2)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="TRY">${currentEfaturaData.subtotal.toFixed(2)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="TRY">${currentEfaturaData.grandTotal.toFixed(2)}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="TRY">${currentEfaturaData.grandTotal.toFixed(2)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
</Invoice>`;

  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentEfaturaData.invoiceNo}_UBL_TR_2_1.xml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`📄 GİB UBL-TR 2.1 XML dosyası (${currentEfaturaData.invoiceNo}_UBL_TR_2_1.xml) indirildi!`, 'info');
}

function printEfaturaDocument() {
  document.body.classList.add('printing-efatura');
  window.print();
  document.body.classList.remove('printing-efatura');
}

function generatePseudoUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

window.initEfaturaEngine = initEfaturaEngine;
window.openEfaturaPreviewModal = openEfaturaPreviewModal;
window.saveEfaturaSettings = saveEfaturaSettings;
window.transmitInvoiceToIntegratorApi = transmitInvoiceToIntegratorApi;
window.downloadUblTrXml = downloadUblTrXml;
window.printEfaturaDocument = printEfaturaDocument;

// ==========================================================================
// 25. CANLI DEMO TURU & UZMAN İNCELEME ASİSTANI
// ==========================================================================
function initDemoGuideEngine() {
  const modal = document.getElementById('demo-guide-modal');
  const btnOpen = document.getElementById('btn-open-demo-guide-modal');
  const btnClose = document.getElementById('btn-close-demo-guide-modal');
  const btnCloseAlt = document.getElementById('btn-close-demo-guide-modal-alt');
  const btnReset = document.getElementById('btn-demo-reset-factory');
  const btnCopyNotes = document.getElementById('btn-copy-expert-review-notes');

  const btnScenario1 = document.getElementById('btn-run-scenario-1');
  const btnScenario2 = document.getElementById('btn-run-scenario-2');
  const btnScenario3 = document.getElementById('btn-run-scenario-3');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      if (modal) modal.style.display = 'flex';
    });
  }

  function closeGuideModal() {
    if (modal) modal.style.display = 'none';
  }

  if (btnClose) btnClose.addEventListener('click', closeGuideModal);
  if (btnCloseAlt) btnCloseAlt.addEventListener('click', closeGuideModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGuideModal();
    });
  }

  // Senaryo 1: Teknisyen Saha & Sesli Dikte
  if (btnScenario1) {
    btnScenario1.addEventListener('click', () => {
      closeGuideModal();
      const tabTech = document.getElementById('btn-tab-tech');
      if (tabTech) tabTech.click();

      // Delta Sürücü iş emrini seç
      const orderSelect = document.getElementById('assigned-order-select');
      if (orderSelect) {
        orderSelect.value = 'SRV-2026-103';
        orderSelect.dispatchEvent(new Event('change'));
      }

      // Sesli dikte barına odaklan
      const voiceBar = document.getElementById('tech-voice-bar');
      if (voiceBar) {
        voiceBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        voiceBar.style.boxShadow = '0 0 25px #10b981';
        setTimeout(() => {
          voiceBar.style.boxShadow = '';
        }, 2500);
      }

      showToast("🎯 Senaryo 1 Başlatıldı: Delta Sürücü seçildi. Sesli dikte barına basarak konuşabilirsiniz!", "success");
    });
  }

  // Senaryo 2: Web Arıza Çağrısı & Sevk Masası
  if (btnScenario2) {
    btnScenario2.addEventListener('click', () => {
      closeGuideModal();
      const tabAdmin = document.getElementById('btn-tab-admin');
      if (tabAdmin) tabAdmin.click();

      const tabActive = document.getElementById('tab-dispatch-active');
      if (tabActive) tabActive.click();

      if (typeof simulateIncomingWebIntakeOrder === 'function') {
        simulateIncomingWebIntakeOrder();
      }

      showToast("🎯 Senaryo 2 Başlatıldı: Müşteri web çağrısı simüle edildi ve Sevk Masasına düştü!", "success");
    });
  }

  // Senaryo 3: Cihaz Pasaportu & e-Fatura
  if (btnScenario3) {
    btnScenario3.addEventListener('click', () => {
      closeGuideModal();
      const tabEquip = document.getElementById('btn-tab-equipment');
      if (tabEquip) tabEquip.click();

      setTimeout(() => {
        if (typeof openEquipmentDetailModal === 'function') {
          openEquipmentDetailModal('DLT-2024-99823');
        }
      }, 300);

      showToast("🎯 Senaryo 3 Başlatıldı: Delta VFD Cihaz Pasaportu açıldı!", "success");
    });
  }

  // Demo Verilerini Sıfırla
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm("Demo verileri orijinal fabrika ayarlarına sıfırlansın mı? Tüm yerel değişiklikler ilk haline dönecektir.")) {
        localStorage.removeItem('servisai_work_orders');
        localStorage.removeItem('servisai_equipments');
        localStorage.removeItem('servisai_service_rates');
        localStorage.removeItem('servisai_efatura_settings');
        localStorage.removeItem('servisai_bulk_stok_records');
        showToast("🔄 Tüm demo verileri orijinal durumuna sıfırlandı! Sayfa yenileniyor...", "info");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    });
  }

  // Uzman Notunu Kopyala
  if (btnCopyNotes) {
    btnCopyNotes.addEventListener('click', () => {
      const expertText = `Sayın Hocam / Değerli Meslektaşım,\n\n` +
        `Geliştirdiğim "FUNZerviceTech.ai - Yapay Zeka Destekli Teknik Servis & Saha Operasyonları" platformunu incelemeniz için paylaşıyorum:\n\n` +
        `🔬 Öne Çıkan Mühendislik ve Test Noktaları:\n` +
        `1. Teknisyen Saha Ekranı: Web Speech API ile eller serbest canlı sesli dikte ve Türkçe NLP ile teşhis/müdahale kutularına otomatik ayrıştırma.\n` +
        `2. İthal Yedek Parça & TCMB Kuru: Sembol bazlı ($/€/EUR/USD) canlı kur korumalı fiyatlama ve çoklu para birimli Excel aktarımı.\n` +
        `3. Web Sitesi & Sosyal Medya Widget: WordPress/Wix iframe veya biyo linkiyle Sevk Masası'na anında canlı arıza düşüşü.\n` +
        `4. Cihaz Sicili & Dijital Pasaport: Seri numarası barkodu, geçmiş onarım ve takılan parçaların kronolojik takibi.\n` +
        `5. Resmi Muhasebe & e-Fatura/e-Arşiv: GİB UBL-TR 2.1 XML dosya çıktısı, Paraşüt/KolayBi API entegrasyonu ve resmi A4 baskı şablonu.\n\n` +
        `Uygulamayı açtığınızda üst menüdeki [🎯 Demo Turu & Rehber] butonuna tıklayarak 3 dakikalık canlı senaryoları hemen test edebilirsiniz.\n\n` +
        `Değerli görüş, eleştiri ve önerilerinizi merakla bekliyorum.\n\n` +
        `Zafer Koçaş\nElektronik ve Haberleşme Mühendisi`;

      navigator.clipboard.writeText(expertText).then(() => {
        showToast("📋 Uzman inceleme davet metni panoya kopyalandı! WhatsApp veya e-postaya yapıştırabilirsiniz.", "success");
      }).catch(() => {
        showToast("⚠️ Pano kopyalama izni verilmedi.", "warning");
      });
    });
  }
}

window.initDemoGuideEngine = initDemoGuideEngine;

// ==========================================================================
// 26. DİJİTAL MÜŞTERİ TESLİM İMZASI MOTORU (CANVAS & TOUCH)
// ==========================================================================
let activeSignatureOrderCode = null;
let isDrawingSignature = false;
let sigCanvasContext = null;

function initCustomerSignatureEngine() {
  const modal = document.getElementById('customer-signature-modal');
  const btnClose = document.getElementById('btn-close-sig-modal');
  const btnCloseAlt = document.getElementById('btn-close-sig-modal-alt');
  const btnClear = document.getElementById('btn-clear-sig-canvas');
  const btnConfirm = document.getElementById('btn-confirm-save-signature');
  const btnTechOpen = document.getElementById('btn-open-customer-signature-modal');
  const canvas = document.getElementById('customer-sig-canvas');

  if (btnTechOpen) {
    btnTechOpen.addEventListener('click', () => {
      const activeCode = document.getElementById('assigned-order-select')?.value || 'SRV-2026-103';
      openCustomerSignatureModal(activeCode);
    });
  }

  function closeSigModal() {
    if (modal) modal.style.display = 'none';
  }

  if (btnClose) btnClose.addEventListener('click', closeSigModal);
  if (btnCloseAlt) btnCloseAlt.addEventListener('click', closeSigModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSigModal();
    });
  }

  if (!canvas) return;
  sigCanvasContext = canvas.getContext('2d');

  function initCanvasContext() {
    if (!sigCanvasContext) return;
    sigCanvasContext.strokeStyle = '#0f172a';
    sigCanvasContext.lineWidth = 3;
    sigCanvasContext.lineCap = 'round';
    sigCanvasContext.lineJoin = 'round';
  }

  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function startDrawing(e) {
    isDrawingSignature = true;
    initCanvasContext();
    const coords = getCanvasCoords(e);
    sigCanvasContext.beginPath();
    sigCanvasContext.moveTo(coords.x, coords.y);
    if (e.type.startsWith('touch')) e.preventDefault();
  }

  function drawMove(e) {
    if (!isDrawingSignature || !sigCanvasContext) return;
    const coords = getCanvasCoords(e);
    sigCanvasContext.lineTo(coords.x, coords.y);
    sigCanvasContext.stroke();
    if (e.type.startsWith('touch')) e.preventDefault();
  }

  function stopDrawing(e) {
    if (isDrawingSignature && sigCanvasContext) {
      sigCanvasContext.closePath();
    }
    isDrawingSignature = false;
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', drawMove);
  window.addEventListener('mouseup', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing, { passive: false });
  canvas.addEventListener('touchmove', drawMove, { passive: false });
  window.addEventListener('touchend', stopDrawing);

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (sigCanvasContext && canvas) {
        sigCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      if (!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      const targetCode = activeSignatureOrderCode || 'SRV-2026-104';

      const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === targetCode);
      if (order) {
        order.customer_signature = dataUrl;
        order.customer_signed_at = new Date().toISOString();
        saveWorkOrdersToLocalStorage();
      }

      // Muhasebe fişi açıksa içindeki imza resmini güncelle
      const rcptImg = document.getElementById('rcpt-sig-customer-img');
      const rcptContainer = document.getElementById('rcpt-sig-customer-canvas-container');
      if (rcptImg && rcptContainer) {
        rcptImg.src = dataUrl;
        rcptContainer.style.display = 'block';
      }

      // Teknisyen ekranındaki buton rozetini güncelle
      if (btnTechOpen) {
        btnTechOpen.innerHTML = '<span>✅ Müşteri İmzası Alındı (Güncelle)</span>';
        btnTechOpen.classList.remove('btn-outline-cyan');
        btnTechOpen.classList.add('btn-success');
      }

      showToast(`✍️ #${targetCode} Müşteri teslim imzası başarıyla kaydedildi ve servis fişine eklendi!`, 'success');
      closeSigModal();
    });
  }
}

function openCustomerSignatureModal(orderCode) {
  activeSignatureOrderCode = orderCode || 'SRV-2026-104';
  const modal = document.getElementById('customer-signature-modal');
  const canvas = document.getElementById('customer-sig-canvas');
  const elCode = document.getElementById('sig-order-code');
  const elCust = document.getElementById('sig-customer-name');
  const elTotal = document.getElementById('sig-grand-total');

  const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === activeSignatureOrderCode);
  
  if (elCode) elCode.textContent = activeSignatureOrderCode;
  if (elCust) elCust.textContent = (order ? (order.customer || order.customer_name) : 'ISISAN İklimlendirme A.Ş.');
  if (elTotal) elTotal.textContent = (order && order.grand_total ? `${order.grand_total.toLocaleString('tr-TR', {minimumFractionDigits: 2})} ₺` : '2.582,50 ₺');

  if (sigCanvasContext && canvas) {
    sigCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
    if (order && order.customer_signature) {
      const img = new Image();
      img.onload = () => {
        sigCanvasContext.drawImage(img, 0, 0);
      };
      img.src = order.customer_signature;
    }
  }

  if (modal) modal.style.display = 'flex';
}

// ==========================================================================
// 27. SANAL POS (PayTR / iyzico 3D SECURE) MOTORU
// ==========================================================================
let activePosOrderCode = null;

function initSanalPosEngine() {
  const modal = document.getElementById('sanal-pos-modal');
  const btnClose = document.getElementById('btn-close-pos-modal');
  const btnCloseAlt = document.getElementById('btn-close-pos-modal-alt');
  const btnCopy = document.getElementById('btn-copy-pos-url');
  const btnWa = document.getElementById('btn-send-pos-whatsapp');
  const btnSimSuccess = document.getElementById('btn-simulate-pos-success');
  const btnSaveSettings = document.getElementById('btn-save-pos-settings');
  const btnTechOpenPos = document.getElementById('btn-tech-open-sanal-pos-modal');
  const btnTechQuickPos = document.getElementById('btn-tech-quick-pos');
  const btnRcptOpenPos = document.getElementById('btn-open-sanal-pos-modal');
  const btnOpenTechPhone = document.getElementById('btn-open-pos-on-tech-phone');

  function closePosModal() {
    if (modal) modal.style.display = 'none';
  }

  if (btnClose) btnClose.addEventListener('click', closePosModal);
  if (btnCloseAlt) btnCloseAlt.addEventListener('click', closePosModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePosModal();
    });
  }

  // 1. TEKNİSYEN MOBİL SAHA EKRANINDAN SANAL POS AÇMA
  function handleTechPosTrigger() {
    const activeCode = document.getElementById('assigned-order-select')?.value || 'SRV-2026-103';
    openSanalPosModal(activeCode);
  }

  if (btnTechOpenPos) btnTechOpenPos.addEventListener('click', handleTechPosTrigger);
  if (btnTechQuickPos) btnTechQuickPos.addEventListener('click', handleTechPosTrigger);

  // 2. MUHASEBE FİŞİ / SEVK MASASINDAN SANAL POS AÇMA
  if (btnRcptOpenPos) {
    btnRcptOpenPos.addEventListener('click', () => {
      const rcptCode = document.getElementById('rcpt-tracking-code')?.textContent?.trim() || activePosOrderCode || 'SRV-2026-104';
      openSanalPosModal(rcptCode);
    });
  }

  // 3. TEKNİSYEN KENDİ TELEFONUNDA ÖDEME EKRANINI AÇMA (3D SECURE GİRİŞİ)
  if (btnOpenTechPhone) {
    btnOpenTechPhone.addEventListener('click', () => {
      const url = document.getElementById('pos-generated-url')?.value || 'https://odeme.funzervicetech.ai/pos/paytr_demo';
      window.open(url, '_blank');
      showToast('💳 PayTR 3D Secure güvenli ödeme sayfası açıldı. Müşteri kart bilgilerini bu ekrana girebilir.', 'info');
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const urlInput = document.getElementById('pos-generated-url');
      if (urlInput) {
        navigator.clipboard.writeText(urlInput.value).then(() => {
          showToast('📋 PayTR / iyzico ödeme linki panoya kopyalandı!', 'success');
        });
      }
    });
  }

  if (btnWa) {
    btnWa.addEventListener('click', () => {
      const url = document.getElementById('pos-generated-url')?.value || 'https://odeme.funzervicetech.ai/pos/paytr_demo';
      const orderCode = activePosOrderCode || 'SRV-2026-104';
      const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === orderCode);
      const cust = order ? (order.customer || order.customer_name) : 'Değerli Müşterimiz';
      const amt = document.getElementById('pos-summary-amount')?.textContent || '2.582,50 ₺';

      const waMsg = `Sayın ${cust} Yetkilisi,\n\n` +
        `FUNZerviceTech.ai Sisteminde #${orderCode} numaralı teknik servis işleminiz tamamlanmıştır.\n` +
        `• Ödenecek Hizmet Bedeli: ${amt} (KDV Dahil)\n` +
        `• Ödeme Seçeneği: Kredi Kartı Tek Çekim veya Peşin Fiyatına 3 Taksit\n\n` +
        `Güvenli 3D Secure kredi kartı ödeme linkiniz:\n${url}\n\n` +
        `Ödemeniz tamamlandığında e-Faturanız otomatik olarak tarafınıza iletilecektir.\n` +
        `Koçaş Teknik Servis & Mühendislik`;

      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');
      showToast('📲 PayTR ödeme linki WhatsApp penceresinde hazırlandı!', 'success');
    });
  }

  if (btnSimSuccess) {
    btnSimSuccess.addEventListener('click', () => {
      const orderCode = activePosOrderCode || 'SRV-2026-104';
      const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === orderCode);
      const paidAmt = document.getElementById('pos-summary-amount')?.textContent || '2.582,50 ₺';
      if (order) {
        order.accountingSettled = true;
        order.status = 'Tamamlandı / Teslim Edildi';
        order.paymentMethod = 'PayTR Sanal POS (Kredi Kartı)';
        saveWorkOrdersToLocalStorage();
      }

      // Teknisyen ekranındaki butonları yeşil rozete dönüştür
      if (btnTechOpenPos) {
        btnTechOpenPos.innerHTML = `<span>✅ ${paidAmt} Kartla Tahsil Edildi</span>`;
        btnTechOpenPos.style.background = '#059669';
      }
      if (btnTechQuickPos) {
        btnTechQuickPos.innerHTML = '<span>✅ Kartla Ödendi</span>';
        btnTechQuickPos.classList.remove('btn-outline-cyan');
        btnTechQuickPos.classList.add('btn-success');
      }

      showToast(`🎉 #${orderCode} için PayTR 3D Secure kredi kartı ödemesi (${paidAmt}) onaylandı! Tahsilat kapatıldı.`, 'success');
      closePosModal();

      const rcptModal = document.getElementById('accounting-receipt-modal');
      if (rcptModal) rcptModal.style.display = 'none';
      if (typeof renderIncomingCalls === 'function') renderIncomingCalls();
    });
  }

  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      const provider = document.getElementById('setting-pos-provider')?.value || 'paytr';
      const mId = document.getElementById('setting-pos-merchant-id')?.value || '';
      const mKey = document.getElementById('setting-pos-merchant-key')?.value || '';
      const isSandbox = document.getElementById('setting-pos-sandbox')?.checked ?? true;

      const posSettings = { provider, mId, mKey, isSandbox };
      localStorage.setItem('servisai_pos_settings', JSON.stringify(posSettings));
      showToast(`💾 Sanal POS (${provider.toUpperCase()}) ayarları başarıyla kaydedildi!`, 'success');
    });
  }
}

function openSanalPosModal(orderCode) {
  activePosOrderCode = orderCode || 'SRV-2026-104';
  const modal = document.getElementById('sanal-pos-modal');
  const elSumOrder = document.getElementById('pos-summary-order');
  const elSumAmt = document.getElementById('pos-summary-amount');
  const elUrl = document.getElementById('pos-generated-url');

  const order = (state.workOrders || []).find(o => (o.tracking_code || o.code) === activePosOrderCode);
  const cust = order ? (order.customer || order.customer_name) : 'ISISAN İklimlendirme A.Ş.';
  
  // Teknisyen ekranı aktifse ve dinamik toplam varsa onu al, yoksa kayıtlı sipariş tutarını al
  const techGrandTotalEl = document.getElementById('grand-total-cost');
  let amt = '2.582,50 ₺';
  if (techGrandTotalEl && techGrandTotalEl.textContent && techGrandTotalEl.textContent.trim()) {
    amt = techGrandTotalEl.textContent.trim();
  } else if (order && order.grand_total) {
    amt = `${order.grand_total.toLocaleString('tr-TR', {minimumFractionDigits: 2})} ₺`;
  }

  if (elSumOrder) elSumOrder.textContent = `${activePosOrderCode} • ${cust}`;
  if (elSumAmt) elSumAmt.textContent = amt;

  const cleanNum = (activePosOrderCode.match(/\d+/) || ['104'])[0];
  const token = `paytr_token_srv${cleanNum}_${Math.random().toString(36).substring(2, 7)}`;
  if (elUrl) elUrl.value = `https://odeme.funzervicetech.ai/pos/${token}`;

  if (modal) modal.style.display = 'flex';
}

// ==========================================================================
// 28. ÇOKLU ŞİRKET (MULTI-TENANT SAAS) MOTORU
// ==========================================================================
const defaultSaasTenants = [
  {
    id: 1,
    name: "Koçaş Endüstriyel Elektronik & Otomasyon A.Ş.",
    shortName: "Koçaş Teknik Servis",
    industry: "Endüstriyel Elektronik, PLC & Sürücü",
    plan: "Kurumsal SaaS (Limitsiz)",
    vkn: "5760129841",
    city: "Bursa / Nilüfer",
    isActive: true
  },
  {
    id: 2,
    name: "Ege İklimlendirme & Soğutma Sistemleri Ltd.",
    shortName: "Ege İklimlendirme",
    industry: "Klima, VRF, Chiller & Soğutma",
    plan: "Profesyonel (10 Teknisyen)",
    vkn: "3829104921",
    city: "İzmir / Bornova",
    isActive: false
  },
  {
    id: 3,
    name: "Marmara CNC & Robotik Mekatronik Hizmetleri",
    shortName: "Marmara CNC Robotik",
    industry: "Talaşlı İmalat, Servo & Robotik",
    plan: "Kurumsal SaaS (Limitsiz)",
    vkn: "6648291038",
    city: "İstanbul / Tuzla",
    isActive: false
  }
];

function initMultiTenantSaaSEngine() {
  const modal = document.getElementById('saas-tenant-modal');
  const btnOpen = document.getElementById('btn-open-tenant-modal');
  const btnClose = document.getElementById('btn-close-tenant-modal');
  const btnCloseAlt = document.getElementById('btn-close-tenant-modal-alt');
  const btnCreate = document.getElementById('btn-create-new-tenant');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      renderTenantList();
      if (modal) modal.style.display = 'flex';
    });
  }

  function closeTenantModal() {
    if (modal) modal.style.display = 'none';
  }

  if (btnClose) btnClose.addEventListener('click', closeTenantModal);
  if (btnCloseAlt) btnCloseAlt.addEventListener('click', closeTenantModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTenantModal();
    });
  }

  if (btnCreate) {
    btnCreate.addEventListener('click', () => {
      const nameInput = document.getElementById('new-tenant-name');
      const indInput = document.getElementById('new-tenant-industry');
      const planInput = document.getElementById('new-tenant-plan');

      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        showToast('⚠️ Lütfen firma / işletme adını giriniz.', 'warning');
        return;
      }

      const tenants = getStoredTenants();
      const newTenant = {
        id: Date.now(),
        name: name,
        shortName: name.length > 20 ? name.substring(0, 18) + '...' : name,
        industry: indInput ? indInput.value : 'Teknik Servis',
        plan: planInput ? planInput.value : 'Kurumsal (Sınırsız)',
        vkn: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        city: 'Türkiye',
        isActive: false
      };

      tenants.push(newTenant);
      saveStoredTenants(tenants);

      if (nameInput) nameInput.value = '';
      renderTenantList();
      showToast(`🏢 '${name}' firması başarıyla SaaS sistemine kaydedildi!`, 'success');
    });
  }
}

function getStoredTenants() {
  try {
    const raw = localStorage.getItem('servisai_saas_tenants');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return defaultSaasTenants;
}

function saveStoredTenants(tenants) {
  try {
    localStorage.setItem('servisai_saas_tenants', JSON.stringify(tenants));
  } catch (e) {}
}

function renderTenantList() {
  const container = document.getElementById('tenant-list-container');
  if (!container) return;

  const tenants = getStoredTenants();
  let html = '';

  tenants.forEach(t => {
    html += `
      <div class="tenant-item-card ${t.isActive ? 'is-active' : ''}">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="color: #f8fafc; font-size: 0.92rem;">${escapeHtml(t.name)}</strong>
            ${t.isActive ? '<span class="badge" style="background: #10b981; color: #fff; font-size: 0.65rem;">Şu An Seçili</span>' : ''}
          </div>
          <div style="font-size: 0.74rem; color: #94a3b8; margin-top: 3px;">
            Sektör: ${escapeHtml(t.industry)} • VKN: ${escapeHtml(t.vkn)} • Paket: ${escapeHtml(t.plan)}
          </div>
        </div>
        <div>
          ${t.isActive 
            ? '<button class="btn btn-xs btn-outline" disabled style="opacity: 0.6; font-size: 0.72rem;">Aktif Şirket</button>'
            : `<button class="btn btn-xs btn-outline-cyan" onclick="switchSaaSTenant(${t.id})" style="font-size: 0.72rem; padding: 4px 10px;">🏢 Bu Şirkete Geç</button>`
          }
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function switchSaaSTenant(tenantId) {
  const tenants = getStoredTenants();
  let selectedTenant = null;

  tenants.forEach(t => {
    if (t.id === tenantId) {
      t.isActive = true;
      selectedTenant = t;
    } else {
      t.isActive = false;
    }
  });

  saveStoredTenants(tenants);
  renderTenantList();

  if (selectedTenant) {
    const elHdr = document.getElementById('header-tenant-name');
    if (elHdr) elHdr.textContent = selectedTenant.shortName || selectedTenant.name;

    const elCur = document.getElementById('tenant-current-title');
    if (elCur) elCur.textContent = selectedTenant.name;

    showToast(`🏢 Aktif Şirket Değiştirildi: ${selectedTenant.name}`, 'info');
  }

  const modal = document.getElementById('saas-tenant-modal');
  if (modal) modal.style.display = 'none';
}

window.initCustomerSignatureEngine = initCustomerSignatureEngine;
window.openCustomerSignatureModal = openCustomerSignatureModal;
window.initSanalPosEngine = initSanalPosEngine;
window.openSanalPosModal = openSanalPosModal;
window.initMultiTenantSaaSEngine = initMultiTenantSaaSEngine;
window.switchSaaSTenant = switchSaaSTenant;







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
  if (!profile) return;
  state.companyProfile = profile;
  saveStoredCompanyProfile(profile);

  if (profile.name || profile.legalName) {
    document.title = `${profile.name || profile.legalName} | Yapay Zeka Destekli Teknik Servis`;
  }

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
