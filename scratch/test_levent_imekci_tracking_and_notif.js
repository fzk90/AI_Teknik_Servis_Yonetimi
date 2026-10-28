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
  addEventListener(evt, cb) {}
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
    addEventListener: () => {},
    localStorage: {
      getItem: (k) => globalStorage[k] || null,
      setItem: (k, v) => { globalStorage[k] = String(v); },
      removeItem: (k) => { delete globalStorage[k]; }
    },
    location: { href: 'http://localhost/' },
    print: () => {},
    open: () => {}
  },
  localStorage: {
    getItem: (k) => globalStorage[k] || null,
    setItem: (k, v) => { globalStorage[k] = String(v); },
    removeItem: (k) => { delete globalStorage[k]; }
  },
  fetch: async () => ({ ok: false, json: async () => ({}) })
};

const context = vm.createContext(sandbox);
const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
vm.runInContext(appCode, context);

const state = vm.runInContext('state', context);
const notifState = vm.runInContext('notifState', context);
const geocodeTurkishAddress = vm.runInContext('geocodeTurkishAddress', context);
const getTechRoute = vm.runInContext('getTechRoute', context);
const loadNotificationPreview = vm.runInContext('loadNotificationPreview', context);
const updateActiveTechProfileHeader = vm.runInContext('updateActiveTechProfileHeader', context);
const renderTechJobs = vm.runInContext('renderTechJobs', context);
const loadWorkOrderToWorkbench = vm.runInContext('loadWorkOrderToWorkbench', context);

console.log('================================================================');
console.log('🧪 TEST: LEVENT İMEKCİ - MESAJLAŞMA & GERÇEK HARİTA ROTA TESTİ');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
  }
}

(async () => {
  // 1. Yeni Personel Tanımlama: Levent İmekci
  console.log('--- 1. Personel Tanımlama (Levent İmekci) ---');
  const leventId = 42;
  const leventTech = {
    id: leventId,
    name: "Levent İmekci",
    role: "Kıdemli Saha Mühendisi",
    specialty: "Tıbbi Cihazlar & Güç Sistemleri",
    phone: "0533 888 77 66",
    status: "Müsait",
    address: "Avcılar Merkez Mah. Liman Yolu No:14, İstanbul",
    baseAddress: "Avcılar Merkez Mah. Liman Yolu No:14, İstanbul",
    location: "Avcılar Merkez Mah. Liman Yolu No:14, İstanbul",
    vehiclePlate: "34 LEV 99",
    avatar: "Lİ",
    distanceKm: 6.4
  };
  state.staff.push(leventTech);

  // 2. Yeni Çağrı Tanımlama: HES Tıbbi Cihazlar (İkitelli OSB)
  console.log('\n--- 2. Çağrı Tanımlama & Levent İmekci\'ye Atama ---');
  const orderCode = "SRV-2026-HES-01";
  const hesOrder = {
    id: Date.now(),
    code: orderCode,
    tracking_code: orderCode,
    customer_name: "HES Tıbbi Cihazlar",
    customer_phone: "0532 555 44 33",
    customer_address: "İkitelli OSB Triko Center 3. Blok No:45, Başakşehir, İstanbul",
    device_brand: "Siemens",
    device_model: "Tıbbi Güç Kartı 30kW",
    serial_number: "HES-SIE-9901",
    customer_complaint: "Cihaz güç dalgalanmasında kendini korumaya alıyor.",
    status: "Kabul Edildi",
    assigned_tech: "Levent İmekci",
    assigned_user_id: leventId,
    labor_cost: 750,
    parts_cost: 0,
    total_cost: 750,
    created_at: new Date().toISOString(),
    customer_approved: false
  };
  state.workOrders.unshift(hesOrder);

  // 3. Teknisyen Ekranında Levent İmekci'yi Aktif Et
  console.log('\n--- 3. Teknisyen Ekranında Levent İmekci\'ye Geçiş ---');
  state.activeTechId = leventId;
  updateActiveTechProfileHeader();
  renderTechJobs();
  await loadWorkOrderToWorkbench(orderCode);

  assert(state.activeOrder && state.activeOrder.code === orderCode, 'Levent İmekci tezgâhına HES Tıbbi Cihazlar iş emri yüklendi');
  assert(state.activeOrder.customer === 'HES Tıbbi Cihazlar', 'Aktif müşteri HES Tıbbi Cihazlar olarak teyit edildi');

  // 4. Müşteri Bildirim ve Mesajlaşma Merkezi (WhatsApp / SMS) Testi
  console.log('\n--- 4. Müşteri Bildirim ve Mesajlaşma Merkezi (WhatsApp/SMS) Testi ---');
  notifState.currentTrackingCode = orderCode;
  notifState.activeTemplate = 'YOLDA';
  notifState.etaMinutes = 25;

  await loadNotificationPreview();

  const textarea = elementCache['notif-message-textarea'];
  const msgContent = textarea ? textarea.value : '';

  assert(msgContent.includes('Levent İmekci'), 'WhatsApp/SMS mesajında teknisyen ismi olarak Levent İmekci yer alıyor');
  assert(msgContent.includes('34 LEV 99'), 'WhatsApp/SMS mesajında Levent İmekci\'nin zimmetli plakası (34 LEV 99) yer alıyor');
  assert(!msgContent.includes('Murat Aydın'), 'WhatsApp/SMS mesajında hardcoded Murat Aydın ismi KESİNLİKLE BULUNMUYOR');
  assert(!msgContent.includes('34 ABC 101'), 'WhatsApp/SMS mesajında eski araç plakası (34 ABC 101) bulunmuyor');
  assert(msgContent.includes('HES Tıbbi Cihazlar'), 'WhatsApp/SMS mesajında müşteri olarak HES Tıbbi Cihazlar yer alıyor');

  // 5. Gerçek Coğrafi Koordinat ve Adres Çözümleme (Geocoding) Testi
  console.log('\n--- 5. Gerçek Adres & İlçe Geocoding Testi ---');
  const leventGeo = geocodeTurkishAddress(leventTech.baseAddress);
  assert(leventGeo.district.includes('Avcılar') || leventGeo.name === 'Avcılar', 'Levent İmekci\'nin Avcılar adresi Avcılar koordinatlarına ([40.98, 28.72]) çözümlendi');

  const hesGeo = geocodeTurkishAddress(hesOrder.customer_address);
  assert(hesGeo.district.includes('İkitelli') || hesGeo.district.includes('Başakşehir'), 'HES Tıbbi Cihazlar adresi İkitelli OSB / Başakşehir koordinatlarına ([41.07, 28.79]) çözümlendi');

  // 6. Haritada Canlı İzleme ve Rota Testi
  console.log('\n--- 6. Levent İmekci\'yi Haritada İzle Rota ve Telemetri Testi ---');
  const route = getTechRoute(leventTech);

  assert(route !== null, 'Levent İmekci için aktif rota üretildi');
  assert(route.targetCustomer === 'HES Tıbbi Cihazlar', 'Rotanın hedef müşterisi HES Tıbbi Cihazlar');
  assert(route.targetAddress.includes('İkitelli OSB') || route.targetAddress.includes('Başakşehir'), 'Rotanın hedef adresi HES Tıbbi Cihazlar\'ın İkitelli OSB adresi');
  assert(route.startAddress.includes('Avcılar'), 'Rotanın başlangıç adresi Levent İmekci\'nin Avcılar adresi');
  
  // Koordinat doğruluğu kontrolü (Avcılar ~ 40.98, 28.72; İkitelli ~ 41.07, 28.79)
  const startLatValid = Math.abs(route.startCoords[0] - 40.98) < 0.05;
  const startLngValid = Math.abs(route.startCoords[1] - 28.72) < 0.05;
  const destLatValid = Math.abs(route.destCoords[0] - 41.07) < 0.05;
  const destLngValid = Math.abs(route.destCoords[1] - 28.79) < 0.05;

  assert(startLatValid && startLngValid, 'Başlangıç koordinatı Avcılar semti sınırları içinde');
  assert(destLatValid && destLngValid, 'Varış koordinatı İkitelli OSB semti sınırları içinde');
  assert(route.distanceKm >= 10 && route.distanceKm <= 35, `Avcılar-İkitelli mesafesi gerçekçi (${route.distanceKm} km, yanlış şehirler arası sıçrama yok)`);
  assert(route.travelMode.title.includes('Şehir İçi'), 'Ulaşım modu doğru şekilde Şehir İçi İntikal olarak algılandı');
  assert(route.waypoints && route.waypoints.length > 10, 'Gerçek yol güzergahı waypoint eğrileri oluşturuldu');

  console.log('\n================================================================');
  console.log(`📊 SONUÇ: ${passedTests} / ${totalTests} TEST BAŞARIYLA GEÇTİ (%${Math.round(passedTests/totalTests*100)})`);
  console.log('================================================================');
})();
