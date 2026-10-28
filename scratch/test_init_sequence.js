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
    if (this.listeners[type]) {
      this.listeners[type].forEach(cb => cb(evt));
    }
  }
  click() {
    this.dispatchEvent('click');
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

// Extract all IDs from index.html so our mock has every real ID
const html = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'utf8');
const idMatches = html.matchAll(/id="([^"]+)"/g);
for (const m of idMatches) {
  getOrCreateElement(m[1]);
}

const sandbox = {
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  Event: function(type) { this.type = type; },
  document: {
    getElementById: (id) => getOrCreateElement(id),
    createElement: (tag) => new MockElement('', tag),
    querySelector: (sel) => {
      if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
      return new MockElement('', 'div');
    },
    querySelectorAll: (sel) => {
      return [];
    },
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {},
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    },
    location: { href: 'http://localhost/' }
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
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

try {
  vm.runInContext(appJs, sandbox);
  console.log("app.js loaded without syntax errors.");
} catch (e) {
  console.error("Error loading app.js:", e);
  process.exit(1);
}

// Now test calling all init functions that DOMContentLoaded runs
const inits = [
  'updateStats',
  'renderStaffList',
  'renderFleetList',
  'renderManagersList',
  'renderStockTable',
  'updateStockCategoryDropdown',
  'renderMaintenance',
  'renderTechJobs',
  'initTechActions',
  'initCustomerActions',
  'initAdminActions',
  'initStaffManagement',
  'initFleetManagement',
  'initVehicleActionModal',
  'initStaffVehicleModal',
  'initManagerManagement',
  'initCategoryManagerModal',
  'initServiceLabelActions',
  'initNotificationActions',
  'initMapTechSelector',
  'initStaffJobsModal',
  'initDispatchAssignModal',
  'initMaintenanceActions',
  'initStockTransferModal',
  'initStockFilterControls',
  'renderIncomingCalls',
  'updateFleetKPI',
  'initReportsEngine',
  'initGpsSimulation',
  'initLeafletMap'
];

for (const fn of inits) {
  try {
    if (typeof sandbox[fn] === 'function') {
      sandbox[fn]();
      console.log(`[OK] ${fn}`);
    } else {
      console.warn(`[MISSING] ${fn}`);
    }
  } catch (err) {
    console.error(`[ERROR in ${fn}]:`, err);
  }
}
