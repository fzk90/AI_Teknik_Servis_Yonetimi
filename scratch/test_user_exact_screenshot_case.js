const fs = require('fs');
const path = require('path');
const vm = require('vm');

class MockElement {
  constructor(id, tagName = 'div') {
    this.id = id;
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this._innerHTML = '';
    this._textContent = '';
    this.style = {};
    this.classList = {
      _classes: new Set(),
      add: (...cls) => cls.forEach(c => this.classList._classes.add(c)),
      remove: (...cls) => cls.forEach(c => this.classList._classes.delete(c)),
      contains: (c) => this.classList._classes.has(c)
    };
    this.value = '';
    this.disabled = false;
    this.attributes = {};
    this.options = [];
    this.selectedIndex = 0;
    this.href = '';
  }
  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) {
    this._innerHTML = String(val);
    this._textContent = String(val).replace(/<[^>]*>/g, '');
  }
  get textContent() { return this._textContent; }
  set textContent(val) {
    this._textContent = String(val);
    this._innerHTML = String(val);
  }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k] || null; }
  hasAttribute(k) { return k in this.attributes; }
  removeAttribute(k) { delete this.attributes[k]; }
  appendChild(child) {
    if (child) child.parentNode = this;
    this.children.push(child);
  }
  remove() {
    if (this.parentNode && this.parentNode.children) {
      this.parentNode.children = this.parentNode.children.filter(c => c !== this);
    }
  }
  querySelector(sel) { return new MockElement('', 'div'); }
  querySelectorAll(sel) { return []; }
  addEventListener(evt, cb) {
    if (!this._listeners) this._listeners = {};
    this._listeners[evt] = cb;
  }
  click() {
    if (this._listeners && this._listeners['click']) {
      this._listeners['click']({ target: this, preventDefault: () => {} });
    }
  }
}

const elementCache = {};
function getOrCreateElement(id) {
  if (!elementCache[id]) {
    elementCache[id] = new MockElement(id);
  }
  return elementCache[id];
}

const globalStorage = {};

const sandbox = {
  console: console,
  setTimeout: (cb) => cb(),
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  Math: Math,
  Date: Date,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  encodeURIComponent: encodeURIComponent,
  decodeURIComponent: decodeURIComponent,
  document: {
    createElement: (tag) => new MockElement('', tag),
    getElementById: (id) => getOrCreateElement(id),
    querySelector: (sel) => {
      if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
      return new MockElement('', 'div');
    },
    querySelectorAll: (sel) => [],
    addEventListener: () => {}
  },
  window: {
    localStorage: {
      getItem: (k) => globalStorage[k] || null,
      setItem: (k, v) => { globalStorage[k] = String(v); },
      removeItem: (k) => { delete globalStorage[k]; },
      clear: () => { Object.keys(globalStorage).forEach(k => delete globalStorage[k]); }
    },
    addEventListener: () => {},
    dispatchEvent: () => {},
    print: () => {}
  },
  localStorage: {
    getItem: (k) => globalStorage[k] || null,
    setItem: (k, v) => { globalStorage[k] = String(v); },
    removeItem: (k) => { delete globalStorage[k]; },
    clear: () => { Object.keys(globalStorage).forEach(k => delete globalStorage[k]); }
  },
  L: {
    latLngBounds: (pts) => ({ isValid: () => true }),
    divIcon: () => ({}),
    marker: (coords, opts) => ({
      addTo: () => ({
        bindPopup: () => {},
        setLatLng: () => {},
        setIcon: () => {}
      }),
      setLatLng: () => {},
      setIcon: () => {},
      bindPopup: () => {}
    }),
    polyline: () => ({
      addTo: () => ({
        setLatLngs: () => {},
        setStyle: () => {}
      })
    }),
    tileLayer: () => ({ addTo: () => {} }),
    map: () => ({
      setView: () => {},
      fitBounds: () => {},
      hasLayer: () => false,
      removeLayer: () => {},
      invalidateSize: () => {}
    })
  },
  fetch: async () => ({ ok: true, json: async () => ({}) })
};

sandbox.window.document = sandbox.document;
const context = vm.createContext(sandbox);

const appJsPath = path.join(__dirname, '..', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

vm.runInContext(appJsCode, context);

const state = vm.runInContext('state', context);
const geocodeTurkishAddress = vm.runInContext('geocodeTurkishAddress', context);
const getTechRoute = vm.runInContext('getTechRoute', context);
const selectMapTech = vm.runInContext('selectMapTech', context);

console.log("================================================================");
console.log("🧪 TEST: KULLANICI EKRAN GÖRÜNTÜSÜ SENARYOSU (BALMUMCU & KAĞITHANE)");
console.log("================================================================\n");

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// 1. Balmumcu & Barbaros Bulvarı Coğrafi Çözümleme Testi
console.log("--- 1. Varış Adresi: Barbaros Bulvarı No: 39 Balmumcu İstanbul ---");
const balmumcuGeo = geocodeTurkishAddress("Barbaros Bulvarı No: 39 Balmumcu İstanbul");
console.log("Çözümlenen Coğrafi Nokta:", balmumcuGeo);
assert(balmumcuGeo.district.includes("Balmumcu") || balmumcuGeo.district.includes("Barbaros"), `İlçe Balmumcu/Barbaros olarak çözümlendi (${balmumcuGeo.district})`);
assert(Math.abs(balmumcuGeo.coords[0] - 41.058) < 0.05, `Enlem Balmumcu sınırlarında (~41.058, hesaplanan: ${balmumcuGeo.coords[0]})`);
assert(Math.abs(balmumcuGeo.coords[1] - 29.010) < 0.05, `Boylam Balmumcu sınırlarında (~29.010, hesaplanan: ${balmumcuGeo.coords[1]})`);
assert(!balmumcuGeo.district.includes("Kadıköy"), "Varış noktası KESİNLİKLE Kadıköy DEĞİL");
assert(!balmumcuGeo.district.includes("Söğütlüçeşme"), "Varış noktası KESİNLİKLE Söğütlüçeşme DEĞİL");

// 2. Ekran Görüntüsündeki Personel: Levent İmekçi (33 EKS 18, Kağıthane)
console.log("\n--- 2. Ekran Görüntüsündeki Teknisyenin Kurulumu ---");
const leventId = 401;
const levent = {
  id: leventId,
  name: "Levent İmekçi",
  role: "Saha Teknisyeni",
  specialty: "Joker, devre tamiri, tesisat işleri",
  vehiclePlate: "33 EKS 18",
  status: "Müsait",
  address: "Kemerburgaz Cad. Şafak Sok. No: 8 Kağıthane İstanbul",
  baseAddress: "Kemerburgaz Cad. Şafak Sok. No: 8 Kağıthane İstanbul",
  location: "Kemerburgaz Cad. Şafak Sok. No: 8 Kağıthane İstanbul (Merkeze bağlı)"
};
state.staff.push(levent);

// 3. Tek İş Durumu: Sadece ISISAN (Barbaros Bulvarı No: 39 Balmumcu İstanbul)
console.log("\n--- 3. Durum A: Tek İş (Evden Balmumcu'ya Gidiş) ---");
const isisanOrder = {
  id: 201,
  tracking_code: "SRV-2026-ISISAN-2",
  code: "SRV-2026-ISISAN-2",
  customer_name: "ISISAN (İstanbul)",
  customer: "ISISAN (İstanbul)",
  customer_address: "Barbaros Bulvarı No: 39 Balmumcu İstanbul",
  customerAddress: "Barbaros Bulvarı No: 39 Balmumcu İstanbul",
  assigned_tech: "Levent İmekçi",
  assigned_user_id: leventId,
  status: "Onarımda"
};
state.workOrders.push(isisanOrder);

const routeA = getTechRoute(levent);
assert(routeA !== null, "Rota başarıyla üretildi");
assert(routeA.targetCustomer === "ISISAN (İstanbul)", `Hedef Müşteri: ${routeA.targetCustomer}`);
assert(routeA.targetAddress.includes("Balmumcu"), `Varış Adresi: ${routeA.targetAddress}`);
assert(routeA.startAddress.includes("Kağıthane"), `Başlangıç Adresi: ${routeA.startAddress}`);
assert(!routeA.routeNote.includes("Kadıköy"), `Güzergah Kadıköy İÇERMİYOR (Gerçek: ${routeA.routeNote})`);
assert(!routeA.routeNote.includes("Söğütlüçeşme"), "Güzergah Söğütlüçeşme İÇERMİYOR");
assert(routeA.distanceKm >= 3 && routeA.distanceKm <= 12, `Mesafe gerçekçi (~7 km, hesaplanan: ${routeA.distanceKm} km)`);
assert(routeA.startCustomer.includes("İkamet") || routeA.startCustomer.includes("Levent"), `Başlangıç etiketi düzgün (Gerçek: ${routeA.startCustomer})`);

// 4. Çift İş Durumu: HES Tıbbi Cihazlar'dan Balmumcu'ya Gidiş
console.log("\n--- 4. Durum B: Çift İş (HES Tıbbi Cihazlar'dan Balmumcu'ya Gidiş) ---");
const hesOrder = {
  id: 200,
  tracking_code: "SRV-2026-HES-2",
  code: "SRV-2026-HES-2",
  customer_name: "HES Tıbbi Cihazlar",
  customer: "HES Tıbbi Cihazlar",
  customer_address: "İkitelli OSB Triko Center San. Sit. M Blok No:12, Başakşehir, İstanbul",
  customerAddress: "İkitelli OSB Triko Center San. Sit. M Blok No:12, Başakşehir, İstanbul",
  assigned_tech: "Levent İmekçi",
  assigned_user_id: leventId,
  status: "Tamamlandı"
};
state.workOrders.push(hesOrder);

const routeB = getTechRoute(levent);
assert(routeB.startCustomer.includes("HES Tıbbi Cihazlar"), `Levent HES Tıbbi Cihazlar'dayken başlangıç HES Tıbbi Cihazlar (Gerçek: ${routeB.startCustomer})`);
assert(routeB.startAddress.includes("İkitelli OSB"), `Başlangıç Adresi İkitelli OSB (Gerçek: ${routeB.startAddress})`);
assert(routeB.targetCustomer === "ISISAN (İstanbul)", `Hedef Müşteri: ${routeB.targetCustomer}`);
assert(routeB.targetAddress.includes("Balmumcu"), `Varış Adresi: ${routeB.targetAddress}`);

// 5. Google Maps Link Doğrulaması
console.log("\n--- 5. Google Maps Navigasyon Linki Doğrulaması ---");
selectMapTech(leventId);
const gmapsBtn = sandbox.document.getElementById('btn-open-google-maps-ext');
assert(gmapsBtn !== null, "Google Maps'te Aç butonu mevcut");
gmapsBtn.click();
const link = decodeURIComponent(gmapsBtn.href);
console.log(`🔗 Canlı Google Maps Linki: ${link}`);
assert(link.includes("Balmumcu") || link.includes("Barbaros Bulvarı"), "Google Maps linkinde varış adresi Balmumcu / Barbaros Bulvarı var");
assert(!link.includes("Söğütlüçeşme"), "Google Maps linkinde Söğütlüçeşme KESİNLİKLE YOK");
assert(!link.includes("Osmanağa"), "Google Maps linkinde Osmanağa KESİNLİKLE YOK");
assert(!link.includes("40.9912"), "Google Maps linkinde Kadıköy koordinatı (40.9912) YOK");

console.log("\n================================================================");
console.log(`📊 SONUÇ: ${passed} / ${total} TEST BAŞARIYLA GEÇTİ (%${Math.round(passed/total*100)})`);
console.log("================================================================");

if (passed === total) process.exit(0);
else process.exit(1);
