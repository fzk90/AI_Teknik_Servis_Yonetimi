const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log("=== COMPREHENSIVE VERIFICATION: AUTH HUB & MOBILE CONTROLS SYSTEM ===");

// 1. Read files
const appJs = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'utf8');
const stylesCss = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/styles.css', 'utf8');
const indexHtml = fs.readFileSync('c:/Users/KABIN OSGB/Desktop/Antigravity/Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'utf8');

// 2. Verify HTML elements exist
console.log("\n[STEP 1: HTML VERIFICATION]");
assert(indexHtml.includes('id="login-modal"'), "login-modal must exist in index.html");
assert(indexHtml.includes('id="tab-login-admin"'), "tab-login-admin must exist");
assert(indexHtml.includes('id="tab-login-tech"'), "tab-login-tech must exist");
assert(indexHtml.includes('id="login-tech-pin"'), "login-tech-pin input must exist");
assert(indexHtml.includes('class="mobile-pin-keypad"'), "mobile-pin-keypad must exist");
assert(indexHtml.includes('id="btn-header-auth-action"'), "btn-header-auth-action must exist in header");
assert(indexHtml.includes('id="tech-mobile-toggle-bar"'), "tech-mobile-toggle-bar must exist in tech-view");
assert(indexHtml.includes('id="btn-toggle-m-jobs"'), "btn-toggle-m-jobs must exist");
assert(indexHtml.includes('id="btn-toggle-m-bench"'), "btn-toggle-m-bench must exist");
console.log(">>> PASS: All required Auth & Mobile HTML elements exist in index.html.");

// 3. Verify CSS rules
console.log("\n[STEP 2: CSS VERIFICATION]");
assert(stylesCss.includes('.login-modal-box'), "CSS must include .login-modal-box");
assert(stylesCss.includes('.mobile-pin-keypad'), "CSS must include .mobile-pin-keypad");
assert(stylesCss.includes('.pin-key'), "CSS must include .pin-key");
assert(stylesCss.includes('.tech-mobile-toggle-bar'), "CSS must include .tech-mobile-toggle-bar");
assert(stylesCss.includes('@media (max-width: 860px)'), "CSS must include mobile/tablet media query for tech view");
console.log(">>> PASS: All required Auth & Mobile CSS rules exist in styles.css.");

// 4. Create DOM Sandbox
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
    this.type = 'text';
    this.selectedIndex = 0;
    this.options = [];
  }
  appendChild(c) { this.children.push(c); c.parentNode = this; return c; }
  insertBefore(newEl, refEl) { this.children.push(newEl); newEl.parentNode = this; return newEl; }
  removeChild(c) { const i = this.children.indexOf(c); if (i !== -1) this.children.splice(i, 1); return c; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  addEventListener(evt, cb) { if (!this.listeners[evt]) this.listeners[evt] = []; this.listeners[evt].push(cb); }
  dispatchEvent(evt) {
    const ev = typeof evt === 'string' ? { type: evt, preventDefault: () => {}, stopPropagation: () => {} } : evt;
    if (this.listeners[ev.type]) this.listeners[ev.type].forEach(cb => cb(ev));
  }
  click() { this.dispatchEvent('click'); }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k]; }
  querySelectorAll(sel) { return []; }
  closest(sel) { return null; }
}

const elementCache = {};
function getEl(id, tag = 'div') {
  if (!elementCache[id]) {
    elementCache[id] = new Element(id, tag);
  }
  return elementCache[id];
}

// Populate elements
const allIds = Array.from(indexHtml.matchAll(/id="([^"]+)"/g)).map(m => m[1]);
allIds.forEach(id => getEl(id));

const storage = {};
const sandbox = {
  console: console,
  setTimeout: (cb) => cb(),
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  Event: function(t) { this.type = t; },
  document: {
    body: new Element('body', 'body'),
    getElementById: (id) => getEl(id),
    createElement: (tag) => new Element('', tag),
    querySelector: (sel) => {
      if (sel.startsWith('#')) return getEl(sel.slice(1));
      if (sel === '.tech-layout') return getEl('tech-layout-mock');
      if (sel === '.mobile-pin-keypad') return getEl('keypad-mock');
      return new Element('', 'div');
    },
    querySelectorAll: (sel) => [],
    addEventListener: () => {}
  },
  window: {
    innerWidth: 1024,
    addEventListener: () => {}
  },
  localStorage: {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; }
  },
  fetch: async () => ({ ok: false })
};

vm.createContext(sandbox);
vm.runInContext(appJs, sandbox);

async function runTests() {
  console.log("\n[STEP 3: TESTING INITIAL DEFAULT SESSION]");
  sandbox.initAuthSystem();
  const currentUser = vm.runInContext('state.currentUser', sandbox);
  console.log("Current user:", currentUser.name, `(${currentUser.role})`);
  assert.strictEqual(currentUser.role, "Yönetici", "Default user should be Yönetici");

  const headerName = getEl('header-user-name').textContent;
  console.log("Header user text:", headerName);
  assert(headerName.includes("Zafer Koçaş"), "Header must display Zafer Koçaş");
  console.log(">>> PASS: Initial session correctly defaults to Zafer Koçaş (Yönetici).");

  console.log("\n[STEP 4: TESTING ADMIN LOGIN]");
  // Test wrong password
  await sandbox.performAdminLogin('zafer@kocasteknik.com', 'wrongpassword');
  const errorAlert = getEl('login-admin-error');
  assert.strictEqual(errorAlert.style.display, 'block', "Error alert should show on wrong password");

  // Test correct password
  await sandbox.performAdminLogin('zafer@kocasteknik.com', 'admin123');
  assert.strictEqual(errorAlert.style.display, 'none', "Error alert should hide on correct password");
  assert.strictEqual(vm.runInContext('state.currentUser.role', sandbox), 'Yönetici', "Current user role should be Yönetici");
  console.log(">>> PASS: Admin login validation and role assignment works.");

  console.log("\n[STEP 5: TESTING TECHNICIAN PIN LOGIN]");
  // Test tech login: Murat Aydın (ID 2, PIN: 1234)
  await sandbox.performTechLogin(2, '9999'); // Wrong PIN
  const techError = getEl('login-tech-error');
  assert.strictEqual(techError.style.display, 'block', "Tech error alert should show on wrong PIN");

  await sandbox.performTechLogin(2, '1234'); // Correct PIN
  assert.strictEqual(techError.style.display, 'none', "Tech error alert should hide on correct PIN");
  const techUser = vm.runInContext('state.currentUser', sandbox);
  console.log("Logged in tech user:", techUser.name, `(${techUser.role})`);
  assert.strictEqual(techUser.role, "Teknisyen", "Current user role should now be Teknisyen");
  assert.strictEqual(vm.runInContext('state.activeTechId', sandbox), 2, "state.activeTechId must be 2 (Murat Aydın)");

  // Verify admin tabs are hidden/restricted for technician
  const adminTab = getEl('btn-tab-admin');
  const reportsTab = getEl('btn-tab-reports');
  console.log("Admin tab display for technician:", adminTab.style.display);
  console.log("Reports tab display for technician:", reportsTab.style.display);
  assert.strictEqual(adminTab.style.display, 'none', "Admin tab must be hidden from technician");
  assert.strictEqual(reportsTab.style.display, 'none', "Reports tab must be hidden from technician");
  console.log(">>> PASS: Technician PIN login, active tech binding and role restriction work perfectly.");

  console.log("\n[STEP 6: TESTING LOGOUT & SESSION RESET]");
  sandbox.logoutUser();
  assert.strictEqual(vm.runInContext('state.currentUser', sandbox), null, "User must be null after logout");
  assert.strictEqual(getEl('header-user-name').textContent, "Giriş Yapılmadı", "Header must show Giriş Yapılmadı");
  console.log(">>> PASS: Logout completely clears state and shows login prompt.");

  console.log("\n[STEP 7: TESTING MOBILE TECH TOGGLE BAR]");
  const techLayout = getEl('tech-layout-mock');
  const btnMJobs = getEl('btn-toggle-m-jobs');
  const btnMBench = getEl('btn-toggle-m-bench');

  sandbox.initTechMobileControls();

  btnMBench.click();
  assert(techLayout.classList.contains('tech-show-bench'), "tech-layout should have tech-show-bench class");
  assert(!techLayout.classList.contains('tech-show-jobs'), "tech-layout should not have tech-show-jobs class");

  btnMJobs.click();
  assert(techLayout.classList.contains('tech-show-jobs'), "tech-layout should have tech-show-jobs class");
  assert(!techLayout.classList.contains('tech-show-bench'), "tech-layout should not have tech-show-bench class");
  console.log(">>> PASS: Mobile toggle bar between job list and workbench works seamlessly.");

  console.log("\n=== ALL AUTH HUB & MOBILE CONTROLS TESTS PASSED WITH 100% SUCCESS! ===");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
