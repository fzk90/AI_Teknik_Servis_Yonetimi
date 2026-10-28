const fs = require('fs');
const js = fs.readFileSync('app.js', 'utf8');

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  Date,
  Math,
  String,
  Number,
  Boolean,
  Array,
  Object,
  RegExp,
  JSON,
  parseInt,
  parseFloat,
  isNaN
};
sandbox.window = sandbox;
sandbox.global = sandbox;

const vm = require('vm');
const context = vm.createContext(sandbox);

vm.runInContext(`
  document = {
    addEventListener: () => {},
    getElementById: (id) => ({
      innerHTML: '',
      textContent: '',
      classList: { add: ()=>{}, remove: ()=>{} },
      querySelectorAll: () => []
    }),
    querySelectorAll: () => []
  };
`, context);

// Lines 1 to 1261
const part1 = js.split('\n').slice(0, 1261).join('\n');
vm.runInContext(part1, context);

vm.runInContext(`
  // Mark 104 as completed
  const o104 = state.workOrders.find(o => (o.tracking_code || o.code) === 'SRV-2026-104');
  if (o104) o104.status = 'Tamamlandı';

  consolidateAllWorkOrders();

  let capturedHTML = "";
  document.getElementById = (id) => ({
    set innerHTML(val) { capturedHTML = val; },
    get innerHTML() { return capturedHTML; },
    textContent: '',
    classList: { add: ()=>{}, remove: ()=>{} },
    querySelectorAll: () => []
  });

  state.dispatchTray = 'completed';
  renderIncomingCalls();

  console.log("Captured HTML length:", capturedHTML.length);
  const matches = capturedHTML.match(/data-code="([^"]+)"/g);
  console.log("Total Cards Rendered:", matches ? matches.length : 0);
  console.log("Cards in HTML:", matches);
  console.log("Does it contain duration tag?:", capturedHTML.includes('call-duration-tag'));
`, context);
