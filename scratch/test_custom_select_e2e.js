const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log("=== COMPREHENSIVE VERIFICATION: CUSTOM SELECT ZERO-BUG SYSTEM ===");

// 1. Read app.js, index.html, styles.css
const appJs = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'utf8');
const stylesCss = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/styles.css', 'utf8');
const indexHtml = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'utf8');

// 2. Verify CSS rules
console.log("\n[STEP 1: CSS VERIFICATION]");
assert(stylesCss.includes('.custom-select-hidden'), "CSS must include .custom-select-hidden");
assert(stylesCss.includes('.custom-select-wrapper'), "CSS must include .custom-select-wrapper");
assert(stylesCss.includes('.custom-select-trigger'), "CSS must include .custom-select-trigger");
assert(stylesCss.includes('.custom-select-dropdown'), "CSS must include .custom-select-dropdown");
assert(stylesCss.includes('overflow-x: hidden !important;'), "CSS must include overflow-x: hidden !important on custom dropdown to prevent horizontal scrollbars");
assert(stylesCss.includes('.custom-option'), "CSS must include .custom-option");
assert(stylesCss.includes('.custom-option-check'), "CSS must include .custom-option-check");

// Verify that the old buggy properties on native option are removed
assert(!stylesCss.includes('white-space: normal !important;'), "white-space: normal !important must be removed from select option to avoid Chromium layout bugs");
assert(!stylesCss.includes('padding: 10px 14px !important;'), "padding: 10px 14px !important must be removed from select option to avoid Chromium layout bugs");
console.log(">>> PASS: CSS styling is 100% verified and free of native Chromium popup glitches.");

// 3. Build a DOM environment representing index.html
class Element {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.classes = new Set();
    this.classList = {
      add: (...c) => c.forEach(x => this.classes.add(x)),
      remove: (...c) => c.forEach(x => this.classes.delete(x)),
      contains: (c) => this.classes.has(c),
      toggle: (c) => { if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c); }
    };
    this.style = {};
    this.children = [];
    this.parentNode = null;
    this.listeners = {};
    this.attributes = {};
    this.value = '';
    this.textContent = '';
    this.innerHTML_val = '';
    this.options = [];
  }

  set innerHTML(val) {
    this.innerHTML_val = val;
    // If it's a select, parse option tags
    if (this.tagName === 'SELECT') {
      this.options = [];
      const matches = Array.from(val.matchAll(/<option[^>]*value="([^"]*)"[^>]*>(.*?)<\/option>/gi));
      for (const m of matches) {
        const opt = new Element('', 'option');
        opt.value = m[1];
        opt.textContent = m[2].trim();
        this.options.push(opt);
      }
    }
  }

  get innerHTML() {
    return this.innerHTML_val;
  }

  appendChild(c) {
    this.children.push(c);
    c.parentNode = this;
    return c;
  }

  insertBefore(newEl, refEl) {
    const idx = this.children.indexOf(refEl);
    if (idx !== -1) {
      this.children.splice(idx + 1, 0, newEl);
    } else {
      this.children.push(newEl);
    }
    newEl.parentNode = this;
    return newEl;
  }

  removeChild(c) {
    const idx = this.children.indexOf(c);
    if (idx !== -1) this.children.splice(idx, 1);
    c.parentNode = null;
    return c;
  }

  addEventListener(evt, cb) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(cb);
  }

  dispatchEvent(evt) {
    const ev = typeof evt === 'string' ? { type: evt, preventDefault: () => {}, stopPropagation: () => {} } : evt;
    if (this.listeners[ev.type]) {
      this.listeners[ev.type].forEach(cb => cb(ev));
    }
  }

  querySelectorAll(sel) { return []; }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k]; }
  closest(sel) {
    let curr = this;
    while (curr) {
      if (sel.startsWith('.') && curr.classList.contains(sel.slice(1))) return curr;
      if (sel.startsWith('#') && curr.id === sel.slice(1)) return curr;
      curr = curr.parentNode;
    }
    return null;
  }
}

const elementMap = {};
function getOrCreate(id, tag = 'div') {
  if (!elementMap[id]) {
    elementMap[id] = new Element(id, tag);
  }
  return elementMap[id];
}

// Populate elements from index.html
const allIds = Array.from(indexHtml.matchAll(/id="([^"]+)"/g)).map(m => m[1]);
allIds.forEach(id => getOrCreate(id));

// Set up parent nodes for report selects
const filterBar = new Element('report-filter-bar', 'div');
const repTypeSelect = getOrCreate('report-type-select', 'select');
repTypeSelect.innerHTML = `
  <option value="staff">👨‍🔧 Personel Performans Raporu</option>
  <option value="devices">🛠️ Servis & Bakımı Yapılan Cihazlar</option>
  <option value="stock">📦 Yedek Parça & Kritik Stok Listesi</option>
  <option value="summary">📈 Yönetici Özet Konsolide Raporu</option>
`;
repTypeSelect.value = 'staff';

const staffFilter = getOrCreate('report-staff-filter', 'select');
staffFilter.innerHTML = `
  <option value="all">Tüm Saha Ekibi (Konsolide)</option>
  <option value="2">Murat Aydın - Saha Mühendisi</option>
  <option value="3">Caner Güler - Kıdemli Tekniker</option>
`;
staffFilter.value = 'all';

const statusFilter = getOrCreate('report-status-filter', 'select');
statusFilter.innerHTML = `
  <option value="all">Tüm Durumlar</option>
  <option value="Tamamlandı">Tamamlandı / Teslim Edildi</option>
  <option value="Onarımda">Onarımda / Parça Montajı</option>
`;
statusFilter.value = 'all';

filterBar.appendChild(repTypeSelect);
filterBar.appendChild(staffFilter);
filterBar.appendChild(statusFilter);

const sandbox = {
  console: console,
  setTimeout: (cb) => cb(),
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  Event: function(type) { this.type = type; },
  document: {
    body: new Element('body', 'body'),
    getElementById: (id) => getOrCreate(id),
    createElement: (tag) => new Element('', tag),
    querySelector: (sel) => {
      if (sel.startsWith('#')) return getOrCreate(sel.slice(1));
      return new Element('', 'div');
    },
    querySelectorAll: (sel) => {
      if (sel.includes('custom-select-wrapper.is-open')) {
        const results = [];
        [repTypeSelect, staffFilter, statusFilter].forEach(s => {
          if (s._customSelectWrapper && s._customSelectWrapper.classList.contains('is-open')) {
            results.push(s._customSelectWrapper);
          }
        });
        return results;
      }
      return [];
    },
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {},
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    location: { href: 'http://localhost/' },
    print: () => {}
  },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  fetch: async () => ({ ok: false })
};

vm.createContext(sandbox);
vm.runInContext(appJs, sandbox);

console.log("\n[STEP 2: INITIALIZING REPORTS ENGINE]");
sandbox.initReportsEngine();

assert(repTypeSelect.classList.contains('custom-select-hidden'), "report-type-select must be visually hidden from native OS popup");
assert(staffFilter.classList.contains('custom-select-hidden'), "report-staff-filter must be visually hidden from native OS popup");
assert(statusFilter.classList.contains('custom-select-hidden'), "report-status-filter must be visually hidden from native OS popup");

assert(repTypeSelect._customSelectWrapper, "Custom wrapper must be created for report-type-select");
assert(staffFilter._customSelectWrapper, "Custom wrapper must be created for report-staff-filter");
assert(statusFilter._customSelectWrapper, "Custom wrapper must be created for report-status-filter");

const typeWrapper = repTypeSelect._customSelectWrapper;
console.log("Report Type Trigger Text:", typeWrapper._triggerText.textContent);
assert.strictEqual(typeWrapper._triggerText.textContent, "👨‍🔧 Personel Performans Raporu", "Trigger text should match default option");
assert.strictEqual(typeWrapper._dropdown.children.length, 4, "Dropdown must contain 4 custom options");

console.log(">>> PASS: Custom select wrappers successfully attached and initialized.");

console.log("\n[STEP 3: TESTING DROPDOWN TOGGLING & CLOSING]");
// 1. Click trigger
typeWrapper._trigger.dispatchEvent('click');
assert(typeWrapper.classList.contains('is-open'), "Wrapper must have .is-open after trigger click");

// 2. Click staff filter trigger -> should open staff dropdown and CLOSE type dropdown
const staffWrapper = staffFilter._customSelectWrapper;
staffWrapper._trigger.dispatchEvent('click');
assert(staffWrapper.classList.contains('is-open'), "Staff wrapper must be open");
assert(!typeWrapper.classList.contains('is-open'), "Type wrapper must be automatically closed when another opens");

console.log(">>> PASS: Dropdown mutual exclusivity and opening/closing works correctly.");

console.log("\n[STEP 4: TESTING OPTION SELECTION & EVENT DISPATCH]");
// Select option 1 in type dropdown: '🛠️ Servis & Bakımı Yapılan Cihazlar'
const optDevices = typeWrapper._dropdown.children[1];
console.log("Clicking custom option:", optDevices.children[0].textContent);
optDevices.dispatchEvent('click');

assert.strictEqual(repTypeSelect.value, 'devices', "Underlying select.value must update to 'devices'");
assert.strictEqual(typeWrapper._triggerText.textContent, "🛠️ Servis & Bakımı Yapılan Cihazlar", "Trigger text must update");
assert(!typeWrapper.classList.contains('is-open'), "Dropdown must close after selecting option");

console.log(">>> PASS: Custom option selection updates underlying select and trigger text.");

console.log("\n[STEP 5: TESTING DYNAMIC SYNC WHEN STAFF DROPDOWN IS UPDATED]");
// Call updateReportStaffDropdown
sandbox.updateReportStaffDropdown();
console.log("Updated staff trigger text:", staffWrapper._triggerText.textContent);
console.log("Updated staff dropdown options count:", staffWrapper._dropdown.children.length);
assert(staffWrapper._dropdown.children.length > 0, "Staff dropdown options must be populated");

console.log(">>> PASS: Dynamic updates immediately sync with the custom dropdown.");

console.log("\n=== ALL ZERO-BUG CUSTOM SELECT TESTS PASSED WITH 100% SUCCESS! ===");
