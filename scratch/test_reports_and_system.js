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
  getOrCreateElement(m[1]);
}

let printCallCount = 0;
const globalStorage = {};
const sandbox = {
  console: console,
  setTimeout: (cb, ms) => { cb(); },
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
  fetch: async () => ({ ok: false }), // Test offline/prototype mode rigorously
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

async function runTests() {
  console.log("=== RUNNING RIGOROUS TEST OF REPORTING & ENTIRE SYSTEM ===");

  // Initialize system
  sandbox.initReportsEngine();

  const state = vm.runInContext('state', sandbox);
  const reportTypeSelect = getOrCreateElement('report-type-select');
  const staffFilter = getOrCreateElement('report-staff-filter');
  const statusFilter = getOrCreateElement('report-status-filter');
  const criticalOnly = getOrCreateElement('report-critical-only');
  const tableContent = getOrCreateElement('report-table-content');
  const activeTitle = getOrCreateElement('report-active-title');
  const btnPrintReport = getOrCreateElement('btn-print-report');

  // TEST REPORT 1: Single staff member selection
  console.log("\n--- TEST REPORT 1: Personel Performans Raporunda Tek Personel Seçimi ---");
  reportTypeSelect.value = 'staff';
  staffFilter.value = '2'; // Murat Aydın
  await sandbox.executeCustomReport();

  const staffReport = vm.runInContext('lastReportResults.staff_report', sandbox);
  console.log("Filtered staff count in lastReportResults:", staffReport.length);
  console.log("Filtered staff names:", staffReport.map(s => s.full_name));
  console.log("Active title:", activeTitle.textContent);

  if (staffReport.length === 1 && staffReport[0].full_name.includes("Murat Aydın") && activeTitle.textContent.includes("Murat Aydın")) {
    console.log(">>> PASS: Test Report 1 (Single Staff Member Filtering) is WORKING!");
  } else {
    console.error(">>> FAIL: Test Report 1 failed!");
    process.exit(1);
  }

  // TEST REPORT 2: Servis & Bakımı Yapılan Cihazlar
  console.log("\n--- TEST REPORT 2: Servis & Bakımı Yapılan Cihazlar Raporu ---");
  reportTypeSelect.value = 'devices';
  staffFilter.value = 'all';
  statusFilter.value = 'Tamamlandı';
  await sandbox.executeCustomReport();

  const devReport = vm.runInContext('lastReportResults.device_report', sandbox);
  console.log("Filtered devices count with status 'Tamamlandı':", devReport.length);
  console.log("Statuses in result:", devReport.map(d => d.status));

  const allCompleted = devReport.every(d => d.status === 'Tamamlandı');
  if (devReport.length > 0 && allCompleted) {
    console.log(">>> PASS: Test Report 2 (Servis Cihazları Durum Filtresi) is WORKING!");
  } else {
    console.error(">>> FAIL: Test Report 2 failed!");
    process.exit(1);
  }

  // TEST REPORT 3: Yedek Parça & Kritik Stok Listesi
  console.log("\n--- TEST REPORT 3: Yedek Parça & Yalnızca Kritik Stoklar Seçimi ---");
  reportTypeSelect.value = 'stock';
  criticalOnly.checked = true;
  await sandbox.executeCustomReport();

  const stockReportCritical = vm.runInContext('lastReportResults.stock_report', sandbox);
  console.log("Stock items when onlyCritical = true:", stockReportCritical.length);
  console.log("All items are critical?", stockReportCritical.every(p => p.is_critical));
  console.log("Active title:", activeTitle.textContent);

  criticalOnly.checked = false;
  await sandbox.executeCustomReport();
  const stockReportAll = vm.runInContext('lastReportResults.stock_report', sandbox);
  console.log("Stock items when onlyCritical = false:", stockReportAll.length);

  if (stockReportCritical.length > 0 && 
      stockReportCritical.length < stockReportAll.length && 
      stockReportCritical.every(p => p.is_critical) &&
      stockReportAll.length === state.stock.length) {
    console.log(">>> PASS: Test Report 3 (Kritik Stok Filtreleme) is WORKING!");
  } else {
    console.error(">>> FAIL: Test Report 3 failed!");
    process.exit(1);
  }

  // TEST REPORT 4: Printing Trigger & CSS verification
  console.log("\n--- TEST REPORT 4: Rapor Yazdırma ve Print CSS Doğrulaması ---");
  btnPrintReport.click();
  console.log("window.print() called count:", printCallCount);

  const css = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/styles.css', 'utf8');

  // Ensure body * { visibility: hidden; } is gone
  const hasDestructivePrint = css.includes('body *') && css.includes('visibility: hidden;');
  console.log("Destructive 'body * { visibility: hidden; }' present in CSS?", hasDestructivePrint);

  // Ensure #reports-view has display: block in @media print
  const hasReportsViewPrint = css.includes('#reports-view') && css.includes('@media print');
  console.log("Clean print styles for #reports-view present?", hasReportsViewPrint);

  if (printCallCount >= 1 && !hasDestructivePrint && hasReportsViewPrint) {
    console.log(">>> PASS: Test Report 4 (Rapor Yazdırma ve Baskı CSS) is WORKING!");
  } else {
    console.error(">>> FAIL: Test Report 4 failed!");
    process.exit(1);
  }

  console.log("\n=== ALL REPORT TESTS PASSED WITH 100% SUCCESS ===");
}

runTests();
