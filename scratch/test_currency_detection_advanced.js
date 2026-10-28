const XLSX = require('../xlsx.full.min.js');

// Test Suite: Euro ve Dolar Ayrıştırma Tüm Senaryolar
console.log("=================================================");
console.log("   EURO & DOLAR TÜM YÜKLEME SENARYOLARI TESTİ    ");
console.log("=================================================");

// 1. Akıllı Currency Algılama Fonksiyonu (Gelişmiş)
function detectCurrencyFromText(val) {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  const upper = str.toUpperCase();

  // Dolar tespiti
  if (
    str.includes('$') ||
    upper.includes('USD') ||
    upper.includes('US$') ||
    upper.includes('DOLAR') ||
    upper.includes('DOLLAR')
  ) {
    return 'USD';
  }

  // Euro tespiti (Tüm karakter, kod ve encoding varyantları)
  if (
    str.includes('€') ||
    str.includes('\u20AC') ||
    str.includes('\u0080') ||
    str.includes('â‚¬') ||
    upper.includes('&EURO;') ||
    str.includes('&#8364;') ||
    upper.includes('EUR') ||
    upper.includes('EURO') ||
    upper.includes('AVRO') ||
    upper.includes('EVRO') ||
    upper === 'E'
  ) {
    return 'EUR';
  }

  // TL tespiti
  if (
    str.includes('₺') ||
    upper.includes('TRY') ||
    upper.includes('TL') ||
    upper.includes('TURK LIRASI') ||
    upper.includes('TÜRK LİRASI')
  ) {
    return 'TRY';
  }

  return null;
}

// Test senaryoları
const testCases = [
  // Hücre içi semboller
  { input: "120.00 €", expected: "EUR" },
  { input: "€ 120.00", expected: "EUR" },
  { input: "120€", expected: "EUR" },
  { input: "€120", expected: "EUR" },
  { input: "120.00 EUR", expected: "EUR" },
  { input: "120.00 EURO", expected: "EUR" },
  { input: "120.00 Euro", expected: "EUR" },
  { input: "120 \u20AC", expected: "EUR" },
  { input: "120 \u0080", expected: "EUR" },
  { input: "120 â‚¬", expected: "EUR" },
  { input: "$45.00", expected: "USD" },
  { input: "45.00 $", expected: "USD" },
  { input: "US$ 45.00", expected: "USD" },
  { input: "45 USD", expected: "USD" },
  { input: "180 ₺", expected: "TRY" },
  { input: "180 TL", expected: "TRY" },
  { input: "180 TRY", expected: "TRY" },
];

let passed = 0;
testCases.forEach(tc => {
  const detected = detectCurrencyFromText(tc.input);
  const ok = detected === tc.expected;
  if (ok) passed++;
  console.log(`${ok ? '✓' : '✗'} Input: "${tc.input}" ➔ Detected: ${detected} (Expected: ${tc.expected})`);
});

console.log(`\nSonuç: ${passed}/${testCases.length} test başarılı.`);
