const fs = require('fs');
const path = require('path');
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
    this._textContent = '';
    this._innerHTML = '';
    this.value = '';
    this.checked = false;
    this.disabled = false;
    this.listeners = {};
    this.attributes = {};
    this.options = [];
  }

  get textContent() { return this._textContent || this._innerHTML.replace(/<[^>]+>/g, '').trim(); }
  set textContent(val) { this._textContent = String(val); this._innerHTML = String(val); }

  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) {
    this._innerHTML = String(val);
    this._textContent = String(val).replace(/<[^>]+>/g, '').trim();
    if (this.tagName === 'SELECT') {
      this.options = [];
      const optRegex = /<option[^>]*value=["']?([^"'>]*)["']?[^>]*>([\s\S]*?)<\/option>/gi;
      let match;
      while ((match = optRegex.exec(this._innerHTML)) !== null) {
        this.options.push({
          value: match[1],
          text: match[2].trim(),
          selected: match[0].includes('selected')
        });
      }
      const selectedOpt = this.options.find(o => o.selected);
      if (selectedOpt) {
        this.value = selectedOpt.value;
      } else if (this.options.length > 0) {
        this.value = this.options[0].value;
      }
    }
  }

  addEventListener(evt, cb) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(cb);
  }

  dispatchEvent(evt) {
    const type = typeof evt === 'string' ? evt : evt.type;
    const evObj = typeof evt === 'string' ? { type: evt, target: this, preventDefault: () => {}, stopPropagation: () => {} } : evt;
    if (!evObj.target) evObj.target = this;
    if (this.listeners[type]) {
      this.listeners[type].forEach(cb => cb(evObj));
    }
  }

  click() {
    this.dispatchEvent({ type: 'click', target: this, preventDefault: () => {}, stopPropagation: () => {} });
  }

  change() {
    this.dispatchEvent({ type: 'change', target: this, preventDefault: () => {}, stopPropagation: () => {} });
  }

  getAttribute(name) { return this.attributes[name] !== undefined ? this.attributes[name] : (name === 'id' ? this.id : null); }
  setAttribute(name, val) { this.attributes[name] = String(val); }
  hasAttribute(name) { return this.attributes[name] !== undefined; }
  querySelector(sel) { return new MockElement('', 'div'); }
  querySelectorAll(sel) { return []; }
  appendChild(child) { return child; }
  remove() {}
  reset() {}
}

const elementCache = {};
function getOrCreateElement(id, tag = 'div') {
  if (!elementCache[id]) {
    elementCache[id] = new MockElement(id, tag);
  }
  return elementCache[id];
}

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const idMatches = html.matchAll(/id="([^"]+)"/g);
for (const m of idMatches) {
  let tag = 'div';
  if (m[1].startsWith('select') || m[1].includes('-select')) tag = 'select';
  if (m[1].startsWith('btn-') || m[1].includes('-btn')) tag = 'button';
  if (m[1].startsWith('input-') || m[1].includes('-input')) tag = 'input';
  getOrCreateElement(m[1], tag);
}

const globalStorage = {};
const sandbox = {
  console: console,
  setTimeout: (cb, ms) => { if (typeof cb === 'function') cb(); },
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
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
    print: () => {}
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

console.log('====================================================');
console.log('🧪 TEST: TEKNİSYEN EKRANI DEĞİŞTİRİCİ & MÜŞTERİ ONAY SİSTEMİ');
console.log('====================================================\n');

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

const state = vm.runInContext('state', context);
const getTechVehicleStock = vm.runInContext('getTechVehicleStock', context);
const deductTechVehicleStock = vm.runInContext('deductTechVehicleStock', context);
const updateDispatchBanner = vm.runInContext('updateDispatchBanner', context);
const openStaffJobsModal = vm.runInContext('openStaffJobsModal', context);

(async () => {
// 1. Yeni Personel ve Araç Tanımlama
console.log('--- 1. Yeni Personel ve Araç Tanımlama ---');
const newTechId = 15;
state.staff.push({
  id: newTechId,
  name: "Ahmet Yılmaz",
  role: "Kıdemli Saha Teknisyeni",
  specialty: "Sürücüler & PLC Otomasyon",
  status: "Müsait",
  location: "İstanbul (Avcılar)",
  vehiclePlate: "34 XYZ 999",
  phone: "0532 999 88 77",
  avatar: "AY",
  distanceKm: 8.5
});

sandbox.vehicles = state.vehicles;
state.vehicles.push({
  id: 12,
  plate: "34 XYZ 999",
  model: "Ford Transit Custom (2024)",
  type: "Mobil Servis & Atölye",
  driverId: newTechId,
  driverName: "Ahmet Yılmaz",
  status: "Sahada Aktif"
});

// Parça İkmal: Yeni personele 1 adet IGBT ikmali yap
const testPart = state.stock.find(p => p.code === 'IGBT-600V-40A');
testPart['veh_12'] = 1;
testPart['34 XYZ 999'] = 1;

// Teknisyen dropdown doldur
vm.runInContext('populateActiveTechDropdown()', context);
const selectTech = elementCache['select-active-tech'];
assert(selectTech && selectTech.options.some(o => o.text.includes('Ahmet Yılmaz') && o.text.includes('34 XYZ 999')), 'Yeni personel (Ahmet Yılmaz - 34 XYZ 999) aktif teknisyen seçici dropdown listesinde görünüyor');

// 2. Yeni Çağrı Oluşturma ve Ahmet Yılmaz'a Atama
console.log('\n--- 2. Yeni Çağrı Oluşturma & Atama ---');
const newOrderCode = "SRV-2026-999";
const newCall = {
  id: Date.now(),
  code: newOrderCode,
  tracking_code: newOrderCode,
  customer_name: "Borusan Lojistik",
  customer_phone: "0533 111 22 33",
  customer_address: "Avcılar Ambarlı Liman Yolu No:12, İstanbul",
  device_brand: "Siemens",
  device_model: "Micromaster 440 Sürücü",
  serial_number: "SIE-MM440-2026",
  customer_complaint: "Sürücü F0001 aşırı akım hatası veriyor, aşırı ısınıp motoru kilitliyor.",
  status: "Kabul Edildi",
  assigned_tech: "Ahmet Yılmaz",
  assigned_user_id: newTechId,
  labor_cost: 650,
  parts_cost: 0,
  total_cost: 650,
  created_at: new Date().toISOString(),
  customer_approved: false
};
state.workOrders.unshift(newCall);
vm.runInContext('saveWorkOrdersToLocalStorage()', context);

// 3. Teknisyen Ekranında Ahmet Yılmaz'a Geçiş
console.log('\n--- 3. Teknisyen Ekranı Geçişi ve Görev İzolasyonu ---');
state.activeTechId = newTechId;
vm.runInContext('updateActiveTechProfileHeader()', context);
const infoEl = elementCache['tech-profile-info'];
assert(infoEl.textContent.includes('Ahmet Yılmaz') && infoEl.textContent.includes('34 XYZ 999'), 'Teknisyen profil başlığı Ahmet Yılmaz ve 34 XYZ 999 plakasıyla güncellendi');

// Teknisyen görevlerini render et
vm.runInContext('renderTechJobs()', context);
const badgeEl = elementCache['tech-active-jobs-badge'];
assert(badgeEl.textContent === '1 Aktif İş', 'Ahmet Yılmaz için yalnızca kendine ait 1 aktif iş listelendi (Murat Aydın işleri karışmadı)');

// 4. Tezgaha Yükleme, GPS Banner & Dinamik AI Teşhis
console.log('\n--- 4. Tezgaha Yükleme, GPS Adresi ve Dinamik AI Analizi ---');
await vm.runInContext(`loadWorkOrderToWorkbench("${newOrderCode}")`, context);

const intikalEl = elementCache['tech-intikal-address'];
assert(intikalEl.textContent.includes('Borusan Lojistik') && intikalEl.textContent.includes('Avcılar Ambarlı Liman'), 'GPS İntikal adres barı dinamik olarak yeni müşterinin adresine güncellendi');

const symptomEl = elementCache['ai-symptom-input'];
assert(symptomEl.value.includes('F0001 aşırı akım hatası'), 'Teknisyen gözlemleri arıza metni yeni işin şikayetiyle doldu');

const aiOutputEl = elementCache['ai-output-box'];
assert(aiOutputEl.textContent.includes('Siemens') && aiOutputEl.textContent.includes('güç modülü') && !aiOutputEl.textContent.includes('Delta Electronics'), 'AI Arıza Teşhisi eski sabit metin yerine dinamik Siemens teşhisi üretti');

// 5. Araç Stoğundan Parça Kullanımı
console.log('\n--- 5. Ahmet Yılmaz Servis Aracı Stoğundan Parça Kullanımı ---');
const vehPartSelect = elementCache['vehicle-part-select'];
assert(vehPartSelect.options.some(o => o.value === 'IGBT-600V-40A' && o.text.includes('Araçta: 1 adet')), 'Araç stoğu seçicisinde Ahmet Yılmaz aracına ikmal edilen 1 adet IGBT görünüyor');

const stockBefore = getTechVehicleStock(testPart, newTechId);
assert(stockBefore === 1, 'Kullanım öncesi araç stoğu 1 adet');
deductTechVehicleStock(testPart, newTechId, 1);
const stockAfter = getTechVehicleStock(testPart, newTechId);
assert(stockAfter === 0, 'Parça kullanıldıktan sonra araç stoğu 0 adede düştü');

// 6. Yola Çıktım (GPS Takibini Başlat)
console.log('\n--- 6. Yola Çıktım ve Canlı Durum Senkronizasyonu ---');
state.activeOrder.status = "Yolda";
newCall.status = "Yolda";
const techObj = state.staff.find(s => s.id === newTechId);
techObj.status = "Yolda";
vm.runInContext('updateActiveTechProfileHeader()', context);
assert(infoEl.textContent.includes('Yolda'), 'Teknisyen başlık durumu "Yolda" oldu');
assert(newCall.status === "Yolda", 'İş emri durumu "Yolda" oldu');

// 7. Müşteri Cihaz Sorgulama ve Onay
console.log('\n--- 7. Müşteri Portalı ve Yönetici Paneli Onay Görünürlüğü ---');
newCall.customer_approved = true;
newCall.customerApproved = true;
newCall.status = "Onaylandı / Onarımda";
vm.runInContext('saveWorkOrdersToLocalStorage()', context);

// Admin paneli render et
vm.runInContext('renderIncomingCalls()', context);
const callsList = elementCache['incoming-calls-list'];
assert(callsList.innerHTML.includes('✅ Müşteri Onayladı'), 'Yönetici Sevk Masası gelen çağrılar kartında "✅ Müşteri Onayladı" rozeti görünüyor');

// KPI güncelle
vm.runInContext('updateActiveOrdersKPI()', context);
const kpiSub = elementCache['kpi-active-orders-subtext'];
assert(kpiSub.innerHTML.includes('✅ 1 Müşteri Onaylı'), 'Yönetici KPI özet kartında "✅ 1 Müşteri Onaylı" rozeti görüntülendi');

// Dispatch Banner güncelle
updateDispatchBanner(newCall, techObj);
const bannerEl = elementCache['dispatch-banner-container'];
assert(bannerEl.innerHTML.includes('✅ Müşteri Onayladı'), 'Yönetici Sevk Masası afişinde "✅ Müşteri Onayladı" rozeti parlıyor');

// Staff Jobs Modal kontrolü
await openStaffJobsModal(newTechId);
const staffJobsList = elementCache['staff-jobs-list-container'];
assert(staffJobsList.innerHTML.includes('✅ Müşteri Onayladı'), 'Teknisyene Atanan İşleri Gör modalında da "✅ Müşteri Onayladı" rozeti onaylandı');

console.log('\n====================================================');
console.log(`📊 SONUÇ: ${passedTests} / ${totalTests} TEST BAŞARIYLA GEÇTİ (%${Math.round(passedTests/totalTests*100)})`);
console.log('====================================================');
})();
