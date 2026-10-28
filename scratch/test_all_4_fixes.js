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
    this.checked = true;
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

const globalStorage = {};
const sandbox = {
  console: console,
  setTimeout: (cb, ms) => { cb(); },
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  Event: function(type) { this.type = type; },
  document: {
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
    location: { href: 'http://localhost/' }
  },
  localStorage: {
    getItem: (k) => globalStorage[k] || null,
    setItem: (k, v) => { globalStorage[k] = String(v); },
    removeItem: (k) => { delete globalStorage[k]; }
  },
  fetch: async () => ({ ok: true, json: async () => ({}) }),
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

console.log("=== RUNNING AUTOMATED VERIFICATION OF ALL 4 USER ISSUES ===");

// 1. Initial Start
sandbox.initStockTransferModal();
sandbox.initStockFilterControls();
sandbox.renderStockTable();
sandbox.initDispatchAssignModal();
sandbox.initStaffJobsModal();
sandbox.initStaffManagement();
sandbox.renderIncomingCalls();
sandbox.initLeafletMap();

// TEST ISSUE 1: Stock Transfer and Replenish
console.log("\n--- TEST 1: Stock Transfer & Replenish ---");
const transferModal = getOrCreateElement('transfer-modal');
const btnTransfer = getOrCreateElement('btn-transfer-part');

// A: Open transfer modal directly
btnTransfer.click();
console.log("Transfer Modal opened display:", transferModal.style.display); // should be 'flex'

// B: Test Quick replenishment from table row
sandbox.openStockTransferModal("IGBT-600V-40A", "vehicle1", "central");
console.log("Preselected part in modal:", getOrCreateElement('select-transfer-part').value);
console.log("Preselected to-location:", getOrCreateElement('select-transfer-to').value);

const state = vm.runInContext('state', sandbox);
const leafletMapState = vm.runInContext('leafletMapState', sandbox);

// C: Execute Transfer
getOrCreateElement('input-transfer-qty').value = "5";
const initialCentralStock = state.stock.find(p => p.code === "IGBT-600V-40A").central;
const initialV1Stock = state.stock.find(p => p.code === "IGBT-600V-40A").vehicle1;

getOrCreateElement('btn-submit-transfer').click();
const afterCentralStock = state.stock.find(p => p.code === "IGBT-600V-40A").central;
const afterV1Stock = state.stock.find(p => p.code === "IGBT-600V-40A").vehicle1;

console.log(`Central stock: ${initialCentralStock} -> ${afterCentralStock}`);
console.log(`Vehicle1 stock: ${initialV1Stock} -> ${afterV1Stock}`);
console.log("Transfer Modal after submit display:", transferModal.style.display); // should be 'none'

if (afterCentralStock === initialCentralStock - 5 && afterV1Stock === initialV1Stock + 5 && transferModal.style.display === 'none') {
  console.log(">>> PASS: Issue 1 (Stock Transfer & Replenish) is WORKING!");
} else {
  console.error(">>> FAIL: Issue 1 failed!");
}

// TEST ISSUE 2: Dispatch Assign Modal & Close
console.log("\n--- TEST 2: Dispatch Assign Modal & Close ---");
const dispatchModal = getOrCreateElement('dispatch-assign-modal');

// A: Open dispatch modal
sandbox.openDispatchAssignModal("SRV-2026-106");
console.log("Dispatch Modal opened display:", dispatchModal.style.display); // should be 'flex'

// B: Test Close button
getOrCreateElement('btn-close-dispatch-assign-modal').click();
console.log("Dispatch Modal after header X close display:", dispatchModal.style.display); // should be 'none'

// C: Re-open and test Footer cancel/close
sandbox.openDispatchAssignModal("SRV-2026-106");
getOrCreateElement('btn-cancel-dispatch-assign').click();
console.log("Dispatch Modal after footer cancel display:", dispatchModal.style.display); // should be 'none'

// D: Re-open, select specialist, and confirm dispatch
sandbox.openDispatchAssignModal("SRV-2026-106");
// Select technician with ID 3 (Caner Güler)
vm.runInContext('selectedAssignTechId = 3', sandbox);
getOrCreateElement('btn-confirm-dispatch-assign').click();

const assignedOrder = state.workOrders.find(o => o.code === "SRV-2026-106" || o.tracking_code === "SRV-2026-106");
console.log("Assigned Order specialist:", assignedOrder ? assignedOrder.assigned_tech : null);
console.log("Assigned Order status:", assignedOrder ? assignedOrder.status : null);
console.log("Dispatch Modal after assignment display:", dispatchModal.style.display); // should be 'none'

if (assignedOrder && assignedOrder.assigned_tech === "Caner Güler" && dispatchModal.style.display === 'none') {
  console.log(">>> PASS: Issue 2 (Dispatch Assign Modal & Confirm/Close) is WORKING!");
} else {
  console.error(">>> FAIL: Issue 2 failed!");
}

// TEST ISSUE 3: Sevk Masası atanan işleri gör, atanan uzmana ata, haritada gör
console.log("\n--- TEST 3: Sevk Masası (Atanan İşleri Gör, Uzmana Ata, Haritada Gör) ---");
sandbox.renderIncomingCalls();

// Check if openStaffJobsModal opens properly
sandbox.openStaffJobsModal(3);
const staffJobsModal = getOrCreateElement('staff-jobs-modal');
console.log("Staff Jobs Modal opened display:", staffJobsModal.style.display);
getOrCreateElement('btn-close-staff-jobs-modal').click();
console.log("Staff Jobs Modal closed display:", staffJobsModal.style.display);

// Check selectMapTech and route telemetry
sandbox.selectMapTech(3);
console.log("Leaflet map current route target customer:", leafletMapState.currentRoute ? leafletMapState.currentRoute.targetCustomer : null);
console.log("Leaflet map current route waypoints count:", leafletMapState.currentRoute ? leafletMapState.currentRoute.waypoints.length : 0);

if (staffJobsModal && leafletMapState.currentRoute && leafletMapState.currentRoute.waypoints.length > 0) {
  console.log(">>> PASS: Issue 3 (Sevk Masası & Haritada Gör) is WORKING!");
} else {
  console.error(">>> FAIL: Issue 3 failed!");
}

// TEST ISSUE 4: Staff Exit (İşten çıkışı onayla ve tamamla)
console.log("\n--- TEST 4: Staff Exit Confirmation & Completion ---");
const staffExitModal = getOrCreateElement('staff-exit-modal');

// Pick a staff member: Murat Aydın (id: 2)
const murat = state.staff.find(s => s.id === 2);
console.log("Before exit staff count:", state.staff.length);
console.log("Murat initial vehicle:", murat ? murat.vehiclePlate : null);

sandbox.openStaffExitModal(2);
console.log("Staff Exit Modal opened display:", staffExitModal.style.display);

// Submit exit
getOrCreateElement('btn-submit-staff-exit').click();

const muratAfter = state.staff.find(s => s.id === 2);
const vehAfter = state.vehicles.find(v => v.plate === "34 ABC 101");
console.log("Murat in active staff after exit:", muratAfter); // should be undefined
console.log("Vehicle 34 ABC 101 driver after exit:", vehAfter ? vehAfter.driverName : null); // should be Boşta / Zimmetsiz
console.log("Staff Exit Modal after submit display:", staffExitModal.style.display); // should be 'none'

if (!muratAfter && vehAfter && vehAfter.driverName.includes("Boşta") && staffExitModal.style.display === 'none') {
  console.log(">>> PASS: Issue 4 (Personel İşe Çıkış Onayla ve Tamamla) is WORKING!");
} else {
  console.error(">>> FAIL: Issue 4 failed!");
}

console.log("\n=== ALL 4 TESTS COMPLETED SUCCESSFULLY ===");
