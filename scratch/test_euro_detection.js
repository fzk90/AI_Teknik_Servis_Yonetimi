// Test Euro Symbol variations and detection
const euroVariants = [
  "120 €",
  "€ 120",
  "120€",
  "€120.00",
  "120.00 €",
  "120\u20AC",
  "120\u0080",
  "120 â‚¬", // Mojibake utf8 as ansi
  "120 &euro;",
  "120 &#8364;",
  "120 EUR",
  "120 EURO",
  "120 Euro",
  "120 euro",
  "120 Avro",
  "120 avro"
];

function isEuro(str) {
  if (!str) return false;
  const s = String(str);
  // Normalize and check
  return (
    s.includes('€') ||
    s.includes('\u20AC') ||
    s.includes('\u0080') ||
    s.includes('â‚¬') ||
    s.toLowerCase().includes('&euro;') ||
    s.includes('&#8364;') ||
    s.toUpperCase().includes('EUR') ||
    s.toUpperCase().includes('EURO') ||
    s.toUpperCase().includes('AVRO') ||
    s.toUpperCase().includes('EVRO')
  );
}

console.log("Testing Euro detection on variants:");
euroVariants.forEach(v => {
  console.log(`- "${v}": ${isEuro(v) ? "✓ DETECTED" : "✗ FAILED"}`);
});
