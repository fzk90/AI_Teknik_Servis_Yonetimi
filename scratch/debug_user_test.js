const fs = require('fs');

// app.js içeriğini oku ve parseStockData / parsePriceAndCurrency fonksiyonlarını test et
const appJs = fs.readFileSync('./app.js', 'utf8');

// Global state simülasyonu
global.state = {
  exchangeRates: { USD: 38.50, EUR: 41.20, TRY: 1.0 }
};
global.document = {
  getElementById: (id) => {
    if (id === 'bulk-currency-mode') return { value: 'AUTO' };
    return null;
  }
};

// Fonksiyonları çalıştırabileceğimiz bir sandbox
const vm = require('vm');
const context = {
  state: global.state,
  document: global.document,
  console: console,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  Array: Array,
  String: String,
  Math: Math
};
vm.createContext(context);

// app.js içinden gerekli fonksiyonları ayıkla
// detectCurrencyFromText, parseCleanFloat, cleanCellValue, parseCleanNumber, parsePriceAndCurrency, generatePartCode, guessCategory, parseCsvLine, parseStockData
const codeToRun = `
${appJs.slice(appJs.indexOf('function cleanCellValue'), appJs.indexOf('// Canlı Önizleme Render Fonksiyonu'))}
`;

vm.runInContext(codeToRun, context);

console.log("=== TESTLER BAŞLIYOR ===");

const testInputs = [
  // 1. Hücre içi semboller (TAB ayrılmış kopyala yapıştır)
  "KOD1\tParca 1\tElektronik\t5\t120 €\t12",
  "KOD2\tParca 2\tElektronik\t5\t€ 120\t12",
  "KOD3\tParca 3\tElektronik\t5\t120€\t12",
  "KOD4\tParca 4\tElektronik\t5\t€120\t12",
  "KOD5\tParca 5\tElektronik\t5\t120,00 €\t12",
  "KOD6\tParca 6\tElektronik\t5\t120.00 €\t12",
  // 2. Ayrı döviz kolonu ile
  "KOD7\tParca 7\tElektronik\t5\t120\t€\t12",
  "KOD8\tParca 8\tElektronik\t5\t120\tEUR\t12",
  // 3. Başlıklı tablo
  "PARCA_KODU\tPARCA_ADI\tKATEGORI\tADET\tFIYAT\tGARANTI\nPRC-E1\tTest Euro\tElektronik\t1\t120 €\t12\nPRC-E2\tTest Euro 2\tElektronik\t1\t€120\t12",
  // 4. Başlıkta € olan tablo
  "PARCA_KODU\tPARCA_ADI\tKATEGORI\tADET\tFIYAT (€)\tGARANTI\nPRC-E3\tTest Euro 3\tElektronik\t1\t120\t12",
  // 5. Başlıkta Fiyat (EUR) olan tablo
  "PARCA_KODU\tPARCA_ADI\tKATEGORI\tADET\tFİYAT (EUR)\tGARANTI\nPRC-E4\tTest Euro 4\tElektronik\t1\t120\t12",
  // 6. Sadece 4 kolonlu (Kategori yok)
  "PRC-E5\tTest Euro 5\t10\t120 €\t12",
  // 7. Sadece 3 kolonlu
  "PRC-E6\tTest Euro 6\t120 €"
];

testInputs.forEach((inp, idx) => {
  console.log(`\n--- Senaryo ${idx + 1} ---`);
  try {
    const res = context.parseStockData(inp, 'Test');
    res.items.forEach(it => {
      console.log(`Item: ${it.code} | ${it.name} | Qty: ${it.qty} | Price: ${it.price} ₺ | Curr: ${it.currency} (Orig: ${it.originalPrice} @ ${it.exchangeRate})`);
    });
  } catch(e) {
    console.error("HATA:", e);
  }
});
