/**
 * Test: Yedek Parça Listeden Çıkarma, Kayan Bant Lokasyonları ve Saha Araçları Filtreleme
 */
const fs = require('fs');
const vm = require('vm');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
    failCount++;
  }
}

class MockElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.innerHTML = '';
    this.value = '';
    this.style = {};
    this.className = '';
    this.classList = {
      _classes: new Set(),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList._classes.has(c)) this.classList._classes.delete(c);
          else this.classList._classes.add(c);
        } else if (force) {
          this.classList._classes.add(c);
        } else {
          this.classList._classes.delete(c);
        }
      },
      contains: (c) => this.classList._classes.has(c)
    };
    this.attributes = {};
    this.listeners = {};
    this.children = [];
  }

  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k] !== undefined ? this.attributes[k] : null; }
  addEventListener(evt, cb) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(cb);
  }
  dispatchEvent(evt) {
    const type = typeof evt === 'string' ? evt : evt.type;
    if (this.listeners[type]) {
      this.listeners[type].forEach(cb => cb({
        type,
        target: this,
        currentTarget: this,
        preventDefault: () => {},
        stopPropagation: () => {}
      }));
    }
  }
  click() { this.dispatchEvent('click'); }
  appendChild(child) { this.children.push(child); }
  remove() {}

  querySelector(sel) {
    if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
    return new MockElement('', sel);
  }
  querySelectorAll(sel) {
    if (this.innerHTML) {
      const matches = [];
      const tagMatch = sel.match(/^[a-z0-9]+/i);
      const classMatch = sel.match(/\.([a-z0-9_-]+)/i);

      if (sel.includes('.btn-delete-stock')) {
        const regex = /class=["'][^"']*btn-delete-stock[^"']*["'][^>]*data-code=["']([^"']+)["']/g;
        let m;
        while ((m = regex.exec(this.innerHTML)) !== null) {
          const el = new MockElement('', 'button');
          el.setAttribute('data-code', m[1]);
          el.className = 'btn-delete-stock';
          matches.push(el);
        }
      } else if (sel.includes('.location-pill')) {
        const regex = /class=["'][^"']*location-pill([^"']*)["'][^>]*data-location=["']([^"']+)["']/g;
        let m;
        while ((m = regex.exec(this.innerHTML)) !== null) {
          const el = new MockElement('', 'button');
          el.setAttribute('data-location', m[2]);
          el.className = 'location-pill' + m[1];
          if (m[1].includes('active')) el.classList.add('active');
          matches.push(el);
        }
      } else if (sel.includes('.btn-quick-transfer')) {
        const regex = /class=["'][^"']*btn-quick-transfer[^"']*["'][^>]*data-code=["']([^"']+)["']/g;
        let m;
        while ((m = regex.exec(this.innerHTML)) !== null) {
          const el = new MockElement('', 'button');
          el.setAttribute('data-code', m[1]);
          el.className = 'btn-quick-transfer';
          matches.push(el);
        }
      }
      return matches;
    }
    return [];
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
  confirm: (msg) => true, // Auto-confirm deletions
  document: {
    createElement: (tag) => new MockElement('', tag),
    getElementById: (id) => getOrCreateElement(id),
    querySelector: (sel) => {
      if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
      return new MockElement('', sel);
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
    latLngBounds: () => ({ isValid: () => true }),
    divIcon: () => ({}),
    marker: () => ({ addTo: () => ({ bindPopup: () => {}, setLatLng: () => {}, setIcon: () => {} }) }),
    polyline: () => ({ addTo: () => ({ setLatLngs: () => {} }) }),
    map: () => ({ setView: () => {}, fitBounds: () => {}, removeLayer: () => {}, invalidateSize: () => {} }),
    tileLayer: () => ({ addTo: () => {} })
  },
  API_BASE_URL: 'http://localhost:8000',
  fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
};

console.log("==================================================================");
console.log("🧪 TEST: YEDEK PARÇA SİLME, KAYAN BANT LOKASYONLARI & SAHA ARAÇLARI");
console.log("==================================================================");

const appCode = fs.readFileSync('app.js', 'utf8');
const context = vm.createContext(sandbox);
vm.runInContext(appCode, context);

const state = vm.runInContext('state', context);
const deleteStockItem = vm.runInContext('deleteStockItem', context);
const renderStockLocationPills = vm.runInContext('renderStockLocationPills', context);
const updateStockLocationFilterDropdown = vm.runInContext('updateStockLocationFilterDropdown', context);
const renderStockTable = vm.runInContext('renderStockTable', context);
const getActiveFieldVehicles = vm.runInContext('getActiveFieldVehicles', context);

// -------------------------------------------------------------
// 1. TEST: Aktif Saha Araçlarının Listelenmesi (Filo + Personel Araçları)
// -------------------------------------------------------------
console.log("\n--- 1. Saha Araçları Envanteri Testi ---");
const activeVehicles = getActiveFieldVehicles();
assert(activeVehicles.length >= 2, `Saha araçları başarıyla listelendi (Toplam: ${activeVehicles.length})`);
assert(activeVehicles.some(v => v.plate === '34 ABC 101'), "Murat Aydın'ın aracı (34 ABC 101) mevcut");
assert(activeVehicles.some(v => v.plate === '34 DEF 202'), "Caner Güler'in aracı (34 DEF 202) mevcut");
assert(!activeVehicles.some(v => v.type.includes('Hava') || v.type.includes('Uçak')), "Uçak/THY saha aracı listesinden hariç tutuldu");

// Levent İmekçi personeli ekleyelim
state.staff.push({
  id: 401,
  name: "Levent İmekçi",
  role: "Saha Teknisyeni",
  vehiclePlate: "33 EKS 18",
  status: "Sahada Aktif"
});
const activeVehiclesWithLevent = getActiveFieldVehicles();
assert(activeVehiclesWithLevent.some(v => v.plate === '33 EKS 18'), "Levent İmekçi'nin aracı (33 EKS 18) otomatik olarak saha araçlarına dahil edildi");

// -------------------------------------------------------------
// 2. TEST: Lokasyon Kayan Bandı (Location Pills) Testi
// -------------------------------------------------------------
console.log("\n--- 2. Lokasyon Kayan Bandı (stock-location-pills) Testi ---");
const pillsContainer = elementCache['stock-location-pills'] || getOrCreateElement('stock-location-pills');
renderStockLocationPills();

assert(pillsContainer.innerHTML.includes('TÜM LOKASYONLAR'), "Kayan bantta 'TÜM LOKASYONLAR' butonu var");
assert(pillsContainer.innerHTML.includes('MERKEZ DEPO'), "Kayan bantta 'MERKEZ DEPO' butonu var");
assert(pillsContainer.innerHTML.includes('MERKEZ ATÖLYE / LAB'), "Kayan bantta 'MERKEZ ATÖLYE / LAB' butonu var");
assert(pillsContainer.innerHTML.includes('ARAÇ (34 ABC 101 - MURAT)'), "Kayan bantta 'ARAÇ (34 ABC 101 - MURAT)' butonu var");
assert(pillsContainer.innerHTML.includes('ARAÇ (34 DEF 202 - CANER)'), "Kayan bantta 'ARAÇ (34 DEF 202 - CANER)' butonu var");
assert(pillsContainer.innerHTML.includes('33 EKS 18'), "Kayan bantta Levent'in aracı 'ARAÇ (33 EKS 18 - LEVENT)' dinamik yer aldı");

// -------------------------------------------------------------
// 3. TEST: Tüm Lokasyonlar Dropdown Seçimi Testi
// -------------------------------------------------------------
console.log("\n--- 3. Üst Bar Tüm Lokasyonlar Dropdown Testi ---");
const locDropdown = getOrCreateElement('stock-location-view-filter');
updateStockLocationFilterDropdown();

assert(locDropdown.innerHTML.includes('Tüm Lokasyonlar'), "Dropdown içinde 'Tüm Lokasyonlar' seçeneği var");
assert(locDropdown.innerHTML.includes('Tüm Saha Araçları'), "Dropdown içinde 'Tüm Saha Araçları' dinamik seçeneği var");
assert(!locDropdown.innerHTML.includes('Yalnızca Saha Araçları (Murat & Caner)'), "Eski daraltılmış '(Murat & Caner)' ibaresi kaldırıldı");
assert(locDropdown.innerHTML.includes('33 EKS 18'), "Dropdown optgroup içinde Levent İmekçi'nin aracı da mevcut");

// -------------------------------------------------------------
// 4. TEST: Tablo Başlığı (THEAD) ve Kolonların Dinamik Çizimi
// -------------------------------------------------------------
console.log("\n--- 4. Tablo Kolonları ve THEAD Dinamizmi Testi ---");
const thead = getOrCreateElement('stock-thead');
const tbody = getOrCreateElement('stock-tbody');

// A) Tüm Lokasyonlar Modu
state.stockFilter.locationView = 'all';
renderStockTable();
assert(thead.innerHTML.includes('MERKEZ DEPO'), "THEAD içinde 'MERKEZ DEPO' kolonu var");
assert(thead.innerHTML.includes('MERKEZ ATÖLYE / LAB'), "THEAD içinde 'MERKEZ ATÖLYE / LAB' kolonu var");
assert(thead.innerHTML.includes('ARAÇ (34 ABC 101 - MURAT)'), "THEAD içinde 'ARAÇ (34 ABC 101 - MURAT)' kolonu var");
assert(thead.innerHTML.includes('ARAÇ (34 DEF 202 - CANER)'), "THEAD içinde 'ARAÇ (34 DEF 202 - CANER)' kolonu var");
assert(thead.innerHTML.includes('İşlem / İkmal & Sil'), "THEAD içinde 'İşlem / İkmal & Sil' kolonu var");

// B) Yalnızca Merkez Depolar Modu
state.stockFilter.locationView = 'central';
renderStockTable();
assert(thead.innerHTML.includes('MERKEZ DEPO'), "Central modunda Merkez Depo görünüyor");
assert(!thead.innerHTML.includes('ARAÇ (34 ABC 101 - MURAT)'), "Central modunda araç kolonları gizlendi");

// C) Yalnızca Tek Bir Araç Modu (Örn: Levent 33 EKS 18)
state.stockFilter.locationView = 'veh_33 EKS 18';
renderStockTable();
assert(thead.innerHTML.includes('33 EKS 18'), "Seçili araç modunda Levent'in aracı kolonu görünüyor");
assert(!thead.innerHTML.includes('34 DEF 202'), "Diğer araçlar gizlendi");

// -------------------------------------------------------------
// 5. TEST: Yedek Parçayı Listeden Çıkarma / Silme (deleteStockItem)
// -------------------------------------------------------------
console.log("\n--- 5. Yedek Parçayı Listeden Çıkarma / Silme Testi ---");
state.stockFilter.locationView = 'all';
renderStockTable();

// Tabloda Sil butonu var mı?
assert(tbody.innerHTML.includes('btn-delete-stock'), "Tablo satırlarında [🗑️ Sil] butonu mevcut");

const initialCount = state.stock.length;
const testPartCode = "RULMAN-6204";
const partExistsBefore = state.stock.some(s => s.code === testPartCode);
assert(partExistsBefore, `${testPartCode} silme öncesi stokta mevcut`);

// deleteStockItem fonksiyonunu çalıştır
deleteStockItem(testPartCode);

const partExistsAfter = state.stock.some(s => s.code === testPartCode);
assert(!partExistsAfter, `${testPartCode} stok listesinden başarıyla çıkarıldı`);
assert(state.stock.length === initialCount - 1, `Stok kalemi sayısı azaldı (${initialCount} -> ${state.stock.length})`);

// localStorage kontrolü
const savedStorage = JSON.parse(globalStorage['servisai_stock'] || '[]');
assert(!savedStorage.some(s => s.code === testPartCode), "Silinen parça localStorage kalıcı hafızasından da çıkarıldı");

console.log("\n==================================================================");
console.log(`📊 SONUÇ: ${passCount} / ${passCount + failCount} TEST GEÇTİ (%${Math.round(passCount / (passCount + failCount) * 100)})`);
console.log("==================================================================");

if (failCount > 0) process.exit(1);
