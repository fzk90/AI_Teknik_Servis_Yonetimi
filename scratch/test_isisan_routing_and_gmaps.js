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
    const optionMatches = String(val).match(/<option[^>]*value=["'](.*?)["'][^>]*>(.*?)<\/option>/gi);
    if (optionMatches) {
      this.options = optionMatches.map(opt => {
        const valMatch = opt.match(/value=["'](.*?)["']/i);
        const textMatch = opt.match(/>(.*?)<\/option>/i);
        const isSelected = opt.includes('selected');
        return {
          value: valMatch ? valMatch[1] : '',
          text: textMatch ? textMatch[1] : '',
          selected: isSelected
        };
      });
    }
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
  scrollIntoView() {}
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
console.log("🧪 TEST: ISISAN ÇAĞRISI, HES TIBBİ CİHAZLAR BAŞLANGICI & GMAPS");
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

// 1. Coğrafi Çözümleme (Geocoding) Testleri
console.log("--- 1. Coğrafi Çözümleme: ISISAN ve HES Adresleri ---");
const isisanGeo = geocodeTurkishAddress("ISISAN Sanayi Sitesi 2. Yol No:15 Hoşdere / Esenyurt");
assert(isisanGeo.district.includes("Isısan") || isisanGeo.district.includes("Esenyurt"), "ISISAN adresi Isısan Sanayi Sitesi / Esenyurt olarak çözümlendi");
assert(Math.abs(isisanGeo.coords[0] - 41.077) < 0.05, `ISISAN enlemi doğru (~41.077, hesaplanan: ${isisanGeo.coords[0]})`);
assert(Math.abs(isisanGeo.coords[1] - 28.647) < 0.05, `ISISAN boylamı doğru (~28.647, hesaplanan: ${isisanGeo.coords[1]})`);
assert(!isisanGeo.district.includes("Kadıköy") && !isisanGeo.district.includes("Söğütlüçeşme"), "ISISAN adresi KESİNLİKLE Kadıköy/Söğütlüçeşme'ye düşmüyor");

const hesGeo = geocodeTurkishAddress("HES Tıbbi Cihazlar, İkitelli OSB Triko Center No:24");
assert(hesGeo.district.includes("İkitelli") || hesGeo.district.includes("HES"), "HES Tıbbi Cihazlar adresi İkitelli OSB olarak çözümlendi");
assert(Math.abs(hesGeo.coords[0] - 41.074) < 0.05, `HES enlemi doğru (~41.074, hesaplanan: ${hesGeo.coords[0]})`);

// 2. Levent İmekci'yi Sisteme Tanımla
console.log("\n--- 2. Personel Kurulumu (Levent İmekci) ---");
const leventId = 301;
const levent = {
  id: leventId,
  name: "Levent İmekci",
  role: "Kıdemli Saha Mühendisi",
  specialty: "Sürücü & PLC Uzmanı",
  phone: "0532 555 44 33",
  status: "Müsait",
  address: "Avcılar Merkez Mah. Reşitpaşa Cad. No:44, Avcılar, İstanbul",
  baseAddress: "Avcılar Merkez Mah. Reşitpaşa Cad. No:44, Avcılar, İstanbul",
  location: "Avcılar Merkez Mah. Reşitpaşa Cad. No:44, Avcılar, İstanbul (Merkeze bağlı)",
  vehiclePlate: "34 LEV 99"
};
state.staff.push(levent);
state.staffJobs[leventId] = [];

// 3. İlk İş: HES Tıbbi Cihazlar Görevi
console.log("\n--- 3. 1. Görev: Levent HES Tıbbi Cihazlar Firmasında ---");
const hesOrder = {
  id: 101,
  tracking_code: "SRV-2026-HES",
  code: "SRV-2026-HES",
  customer_name: "HES Tıbbi Cihazlar",
  customer: "HES Tıbbi Cihazlar",
  customer_address: "İkitelli OSB Triko Center San. Sit. M Blok No:12, Başakşehir, İstanbul",
  customerAddress: "İkitelli OSB Triko Center San. Sit. M Blok No:12, Başakşehir, İstanbul",
  status: "Onarımda"
};
state.staffJobs[leventId].push(hesOrder);
state.activeOrder = hesOrder;
state.activeTechId = leventId;

// Levent HES Tıbbi Cihazlar'a vardı ve onarım yaptı (veya tamamladı)
levent.currentLocation = hesOrder.customer_address;
levent.currentCustomer = hesOrder.customer_name;
levent.location = `📍 ${hesOrder.customer_name} (${hesOrder.customer_address})`;

// 4. İkinci İş: ISISAN Çağrısı Oluşturuldu ve Levent'e Verildi
console.log("\n--- 4. 2. Görev: ISISAN Çağrısı Açıldı ve Levent'e Atandı ---");
const isisanOrder = {
  id: 102,
  tracking_code: "SRV-2026-ISISAN",
  code: "SRV-2026-ISISAN",
  customer_name: "ISISAN Sanayi",
  customer: "ISISAN Sanayi",
  customer_address: "Isısan Sanayi Sitesi 2. Yol No:15, Hoşdere / Esenyurt, İstanbul",
  customerAddress: "Isısan Sanayi Sitesi 2. Yol No:15, Hoşdere / Esenyurt, İstanbul",
  status: "Onarımda"
};

// Sevk Masası ataması gibi unshift yapılıyor (en yeni iş en başta)
state.staffJobs[leventId].unshift(isisanOrder);
state.activeOrder = isisanOrder;

// 5. Haritada İzle & Rota Doğrulama
console.log("\n--- 5. Haritada İzle: Başlangıç ve Varış Doğrulaması ---");
const route = getTechRoute(levent);
assert(route !== null, "Levent için aktif rota başarıyla üretildi");
assert(route.targetCustomer === "ISISAN Sanayi", `Hedef Müşteri ISISAN Sanayi (Gerçek: ${route.targetCustomer})`);
assert(route.targetAddress.includes("Isısan Sanayi Sitesi"), "Hedef Adres Isısan Sanayi Sitesi");
assert(route.startCustomer.includes("HES Tıbbi Cihazlar"), `Başlangıç Konumu HES Tıbbi Cihazlar (Gerçek: ${route.startCustomer})`);
assert(route.startAddress.includes("İkitelli OSB"), `Başlangıç Adresi İkitelli OSB (Gerçek: ${route.startAddress})`);
assert(!route.startAddress.includes("Avcılar"), "Başlangıç adresi Levent'in evi (Avcılar) DEĞİL, bulunduğu HES Tıbbi Cihazlar firması");

// Koordinat ve mesafe teyidi
assert(Math.abs(route.startCoords[0] - 41.074) < 0.05, `Başlangıç koordinatı İkitelli OSB (~41.074)`);
assert(Math.abs(route.destCoords[0] - 41.077) < 0.05, `Varış koordinatı Isısan (~41.077)`);
assert(route.distanceKm >= 10 && route.distanceKm <= 25, `İkitelli-Isısan mesafesi gerçekçi (~15 km, hesaplanan: ${route.distanceKm} km)`);
assert(!route.routeNote.includes("Söğütlüçeşme"), "Rota açıklamasında Söğütlüçeşme geçmiyor");

// 6. Google Maps'te Aç Butonu Doğrulaması
console.log("\n--- 6. Google Maps'te Aç Buton Linki Doğrulaması ---");
selectMapTech(leventId);
const gmapsBtn = sandbox.document.getElementById('btn-open-google-maps-ext');
assert(gmapsBtn !== null, "Google Maps'te Aç butonu DOM'da mevcut");

// Butona tıkla (recalculation dinleyicisi de tetiklensin)
gmapsBtn.click();
const linkHref = decodeURIComponent(gmapsBtn.href);

console.log(`🔗 Oluşturulan Google Maps Linki: ${linkHref}`);
assert(linkHref.includes("HES Tıbbi Cihazlar") || linkHref.includes("İkitelli OSB"), "Google Maps linkinin başlangıç (origin) parametresinde HES Tıbbi Cihazlar / İkitelli OSB var");
assert(linkHref.includes("ISISAN Sanayi") || linkHref.includes("Isısan Sanayi Sitesi"), "Google Maps linkinin varış (destination) parametresinde ISISAN / Isısan Sanayi Sitesi var");
assert(!linkHref.includes("Söğütlüçeşme"), "Google Maps linkinde Söğütlüçeşme KESİNLİKLE YOK");
assert(!linkHref.includes("Osmanağa"), "Google Maps linkinde Osmanağa KESİNLİKLE YOK");
assert(!linkHref.includes("40.9912"), "Google Maps linkinde Kadıköy/Osmanağa default koordinatı (40.9912) YOK");

console.log("\n================================================================");
console.log(`📊 SONUÇ: ${passed} / ${total} TEST BAŞARIYLA GEÇTİ (%${Math.round(passed/total*100)})`);
console.log("================================================================");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
