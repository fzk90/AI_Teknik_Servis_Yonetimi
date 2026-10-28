const fs = require('fs');
const vm = require('vm');

class MockElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.style = {};
    this.classes = new Set();
    this.classList = {
      add: (...c) => c.forEach(x => this.classes.add(x)),
      remove: (...c) => c.forEach(x => this.classes.delete(x)),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c);
        } else if (force) this.classes.add(c); else this.classes.delete(c);
      },
      contains: (c) => this.classes.has(c)
    };
    this.textContent = '';
    this.innerHTML = '';
    this.value = '';
    this.checked = false;
    this.disabled = false;
    this.listeners = {};
    this.attributes = {};
  }
  addEventListener(evt, cb) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(cb);
  }
  dispatchEvent(evt) {
    const type = typeof evt === 'string' ? evt : evt.type;
    const evObj = typeof evt === 'string' ? { type: evt, preventDefault: () => {}, stopPropagation: () => {} } : evt;
    if (this.listeners[type]) {
      this.listeners[type].forEach(cb => cb(evObj));
    }
  }
  click() {
    this.dispatchEvent({ type: 'click', preventDefault: () => {}, stopPropagation: () => {} });
  }
  change() {
    this.dispatchEvent({ type: 'change', preventDefault: () => {}, stopPropagation: () => {} });
  }
  getAttribute(name) { return this.attributes[name] !== undefined ? this.attributes[name] : (name === 'id' ? this.id : null); }
  setAttribute(name, val) { this.attributes[name] = String(val); }
  hasAttribute(name) { return this.attributes[name] !== undefined; }
  querySelector(sel) {
    return new MockElement('', 'div');
  }
  querySelectorAll(sel) {
    return [];
  }
  appendChild(child) { return child; }
  remove() {}
  reset() {}
  focus() {}
  scrollIntoView() {}
}

const elementCache = {};
function getOrCreateElement(id) {
  if (!elementCache[id]) {
    elementCache[id] = new MockElement(id);
  }
  return elementCache[id];
}

const html = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'utf8');
const idMatches = html.matchAll(/id="([^"]+)"/g);
for (const m of idMatches) {
  const el = getOrCreateElement(m[1]);
  // Check if input has checked attribute in html
  const reg = new RegExp(`id="${m[1]}"[^>]*checked|checked[^>]*id="${m[1]}"`);
  if (reg.test(html)) {
    el.checked = true;
  }
}

let printCallCount = 0;
const globalStorage = {};
const sandbox = {
  console: console,
  setTimeout: (cb, ms) => { if (typeof cb === 'function') cb(); },
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  Event: function(type) { this.type = type; },
  document: {
    body: new MockElement('body', 'body'),
    getElementById: (id) => getOrCreateElement(id),
    createElement: (tag) => new MockElement('', tag),
    querySelector: (sel) => {
      if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
      return new MockElement('', 'div');
    },
    querySelectorAll: (sel) => [],
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {},
    localStorage: {
      getItem: (k) => globalStorage[k] || null,
      setItem: (k, v) => { globalStorage[k] = String(v); },
      removeItem: (k) => { delete globalStorage[k]; }
    },
    location: { href: 'http://localhost/' },
    print: () => {
      printCallCount++;
    }
  },
  localStorage: {
    getItem: (k) => globalStorage[k] || null,
    setItem: (k, v) => { globalStorage[k] = String(v); },
    removeItem: (k) => { delete globalStorage[k]; }
  },
  fetch: async () => ({ ok: false }),
  L: {
    map: () => ({
      setView: function() { return this; },
      fitBounds: function() { return this; },
      invalidateSize: function() { return this; },
      hasLayer: () => false,
      removeLayer: () => {},
      on: () => {}
    }),
    tileLayer: () => ({ addTo: () => {} }),
    marker: () => ({
      addTo: function() { return this; },
      setLatLng: function() { return this; },
      setIcon: function() { return this; },
      bindPopup: function() { return this; },
      openPopup: function() { return this; }
    }),
    divIcon: () => ({}),
    polyline: () => ({
      addTo: function() { return this; },
      setLatLngs: function() { return this; },
      setStyle: function() { return this; }
    }),
    latLngBounds: () => ({})
  }
};

const appJs = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'utf8');
vm.createContext(sandbox);
vm.runInContext(appJs, sandbox);

async function runFullSystemTest() {
  console.log("================================================================================");
  console.log("              SERVİS Aİ - KAPSAMLI UÇTAN UCA TÜM SİSTEM REGRESYON TESTİ        ");
  console.log("================================================================================");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`  [PASS ${totalTests}] ${testName}`);
      passedTests++;
    } else {
      console.error(`  [FAIL ${totalTests}] ${testName}`);
    }
  }

  const state = vm.runInContext('state', sandbox);

  // 1. MODÜL: SİSTEM İLKLENDİRMESİ
  console.log("\n>>> MODÜL 1: Başlangıç ve İlklendirme Fonksiyonları (Init Sequence)");
  const inits = [
    'renderStaffList', 'renderStockTable', 'renderMaintenance', 'renderTechJobs',
    'initTechActions', 'initCustomerActions', 'initAdminActions', 'initStaffManagement',
    'initFleetManagement', 'initVehicleActionModal', 'initStaffVehicleModal',
    'initManagerManagement', 'initCategoryManagerModal', 'initServiceLabelActions',
    'initNotificationActions', 'initMapTechSelector', 'initStaffJobsModal',
    'initDispatchAssignModal', 'initMaintenanceActions', 'initStockTransferModal',
    'initStockFilterControls', 'renderIncomingCalls', 'updateFleetKPI',
    'initReportsEngine', 'initLeafletMap'
  ];
  let initsOk = true;
  for (const fn of inits) {
    if (typeof sandbox[fn] === 'function') {
      try { sandbox[fn](); } catch (e) { initsOk = false; console.error("Error in " + fn, e); }
    } else {
      initsOk = false;
    }
  }
  assert(initsOk, "Tüm sistem bileşenleri ve olay dinleyicileri hatasız ilklendirildi.");

  // 2. MODÜL: STOK TRANSFER VE İKMAL MOTORU
  console.log("\n>>> MODÜL 2: Mobil Araç Stokları & Depo İkmal Motoru");
  const transferModal = getOrCreateElement('transfer-modal');
  sandbox.openStockTransferModal("IGBT-600V-40A", "vehicle1", "central");
  assert(transferModal.style.display === 'flex', "Parça satırından ikmal tıklandığında transfer modalı flex olarak açıldı.");

  const pItem = state.stock.find(p => p.code === "IGBT-600V-40A");
  const initCent = pItem.central;
  const initV1 = pItem.vehicle1;
  getOrCreateElement('input-transfer-qty').value = "4";
  getOrCreateElement('btn-submit-transfer').click();
  assert(pItem.central === initCent - 4 && pItem.vehicle1 === initV1 + 4, "Merkez depodan araca stok transferi ve miktar düşümü başarıyla gerçekleşti.");
  assert(transferModal.style.display === 'none', "Transfer sonrası modal anında kapatıldı.");

  // 3. MODÜL: SEVK MASASI VE AKILLI ATAMA
  console.log("\n>>> MODÜL 3: Sevk Masası, Akıllı Atama ve Modal Kontrolleri");
  const dispatchModal = getOrCreateElement('dispatch-assign-modal');
  sandbox.openDispatchAssignModal("SRV-2026-106");
  assert(dispatchModal.style.display === 'flex', "Bekleyen çağrı için Sevk Atama modalı açıldı.");

  // Kapatma butonunu test et
  getOrCreateElement('btn-close-dispatch-assign-modal').click();
  assert(dispatchModal.style.display === 'none', "Başlıktaki [×] butonu modalı kapattı.");

  // Tekrar aç ve alttaki iptal butonu ile kapat
  sandbox.openDispatchAssignModal("SRV-2026-106");
  getOrCreateElement('btn-cancel-dispatch-assign').click();
  assert(dispatchModal.style.display === 'none', "Alttaki [✕ Kapat / Vazgeç] butonu modalı kapattı.");

  // Tekrar aç, teknisyen seç ve sevk et
  sandbox.openDispatchAssignModal("SRV-2026-106");
  vm.runInContext('selectedAssignTechId = 3', sandbox); // Caner Güler
  getOrCreateElement('btn-confirm-dispatch-assign').click();
  const assigned106 = state.workOrders.find(o => o.code === "SRV-2026-106");
  assert(assigned106 && assigned106.assigned_tech === "Caner Güler" && assigned106.status === "Onarımda", "Çağrı hedeflenen saha teknisyenine atandı ve 'Onarımda' yapıldı.");
  assert(dispatchModal.style.display === 'none', "Atama onayı sonrası Sevk modalı anında kapandı.");

  // 4. MODÜL: ÇAĞRI KARTI AKSİYONLARI & PERSONEL İŞLERİ POP-UP
  console.log("\n>>> MODÜL 4: Sevk Masası Çağrı Aksiyonları & Personel İşleri Pop-up");
  sandbox.renderIncomingCalls();
  sandbox.openStaffJobsModal(3);
  const staffJobsModal = getOrCreateElement('staff-jobs-modal');
  assert(staffJobsModal.style.display === 'flex', "Atanan teknisyenin açık/tamamlanan işleri modalı başarıyla açıldı.");
  getOrCreateElement('btn-close-staff-jobs-modal').click();
  assert(staffJobsModal.style.display === 'none', "Personel işleri modalı [×] butonu ile kapatıldı.");

  // 5. MODÜL: PERSONEL İŞTEN ÇIKIŞ SÜRECİ
  console.log("\n>>> MODÜL 5: Personel İşe Çıkış, Araç ve İş Havuzu Yönetimi");
  const staffExitModal = getOrCreateElement('staff-exit-modal');
  sandbox.openStaffExitModal(2); // Murat Aydın
  assert(staffExitModal.style.display === 'flex', "Personel işten çıkış onay modalı açıldı.");

  getOrCreateElement('btn-submit-staff-exit').click();
  const muratInStaff = state.staff.find(s => s.id === 2);
  const veh101 = state.vehicles.find(v => v.plate === "34 ABC 101");
  assert(!muratInStaff, "Ayrılan personel aktif kadrodan çıkarıldı.");
  assert(veh101 && veh101.driverName.includes("Boşta"), "Personelin servis aracı 'Boşta / Zimmetsiz' durumuna alındı.");
  assert(staffExitModal.style.display === 'none', "Çıkış sonrası modal anında kapatıldı.");

  // 6. MODÜL: RAPORLAMA - PERSONEL PERFORMANS (TEK KİŞİ SEÇİMİ)
  console.log("\n>>> MODÜL 6: Raporlama - Personel Performans & Bireysel Filtre");
  const reportTypeSelect = getOrCreateElement('report-type-select');
  const staffFilter = getOrCreateElement('report-staff-filter');
  const statusFilter = getOrCreateElement('report-status-filter');
  const criticalOnly = getOrCreateElement('report-critical-only');
  const activeTitle = getOrCreateElement('report-active-title');

  reportTypeSelect.value = 'staff';
  staffFilter.value = '3'; // Caner Güler
  await sandbox.executeCustomReport();
  const repStaff = vm.runInContext('lastReportResults.staff_report', sandbox);
  assert(repStaff.length === 1 && repStaff[0].full_name.includes("Caner Güler"), "Personel filtresinde tek uzman seçildiğinde raporda SADECE o uzman listelendi.");
  assert(activeTitle.textContent.includes("Caner Güler"), "Rapor başlığı seçilen teknisyenin bireysel adına dinamik güncellendi.");

  // 7. MODÜL: RAPORLAMA - SERVİS VE BAKIMI YAPILAN CİHAZLAR
  console.log("\n>>> MODÜL 7: Raporlama - Servis & Bakımı Yapılan Cihazlar");
  reportTypeSelect.value = 'devices';
  staffFilter.value = 'all';
  statusFilter.value = 'Tamamlandı';
  await sandbox.executeCustomReport();
  const repDevices = vm.runInContext('lastReportResults.device_report', sandbox);
  assert(repDevices.length > 0 && repDevices.every(d => d.status === 'Tamamlandı'), "Cihaz raporunda 'Tamamlandı' filtresi tam uyumla filtrelendi.");

  // 8. MODÜL: RAPORLAMA - YEDEK PARÇA & KRİTİK STOK LİSTESİ
  console.log("\n>>> MODÜL 8: Raporlama - Yedek Parça & Kritik Stok Filtresi");
  reportTypeSelect.value = 'stock';
  criticalOnly.checked = true;
  await sandbox.executeCustomReport();
  const repStockCrit = vm.runInContext('lastReportResults.stock_report', sandbox);
  assert(repStockCrit.length > 0 && repStockCrit.every(p => p.is_critical), "'Yalnızca Kritik Stoklar' seçildiğinde sadece eşik altındaki parçalar listelendi.");
  assert(activeTitle.textContent.includes("Kritik Stok"), "Rapor başlığı kritik stok ikmal uyarısına dönüştürüldü.");

  criticalOnly.checked = false;
  await sandbox.executeCustomReport();
  const repStockAll = vm.runInContext('lastReportResults.stock_report', sandbox);
  assert(repStockAll.length === state.stock.length, "Kritik filtresi kaldırıldığında tüm envanter kalemi listelendi.");

  // 9. MODÜL: RAPOR YAZDIRMA (PRINT CSS VE BOŞ SAYFA ENGELİ)
  console.log("\n>>> MODÜL 9: Rapor Yazdırma ve Print CSS Güvencesi");
  getOrCreateElement('btn-print-report').click();
  assert(printCallCount >= 1, "Rapor yazdır butonuna basıldığında window.print() tetiklendi.");
  const css = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/styles.css', 'utf8');
  const hasDestructive = css.includes('body *') && css.includes('visibility: hidden;');
  assert(!hasDestructive, "Baskıda boş sayfa çıkaran 'body * { visibility: hidden; }' kuralı temizlendi.");
  assert(css.includes('#reports-view') && css.includes('@media print'), "@media print altında #reports-view görünürlük kuralları eksiksiz tanımlı.");

  // 10. MODÜL: ÇOK MODLU HARİTA VE TÜM TÜRKİYE ROTA SİSTEMİ
  console.log("\n>>> MODÜL 10: Canlı Harita & Çok Modlu (Multi-Modal) Şehirler Arası Telemetri");
  const leafletMapState = vm.runInContext('leafletMapState', sandbox);
  sandbox.selectMapTech(3);
  assert(leafletMapState.currentRoute && leafletMapState.currentRoute.waypoints.length > 0, "Teknisyen seçildiğinde rota koordinatları ve telemetri oluşturuldu.");

  console.log("\n================================================================================");
  console.log(`  SONUÇ: ${passedTests} / ${totalTests} TEST BAŞARIYLA GEÇTİ (%${Math.round(passedTests/totalTests*100)})`);
  console.log("================================================================================");

  if (passedTests === totalTests) {
    console.log(">>> TÜM SİSTEM BAŞTAN AŞAĞIYA HATASIZ ÇALIŞIYOR! <<<");
  } else {
    process.exit(1);
  }
}

runFullSystemTest();
