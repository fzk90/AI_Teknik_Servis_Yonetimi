const fs = require('fs');
const XLSX = require('../xlsx.full.min.js');

// Test 1: XLSX oluştur ve Euro simgeli hücreleri test et
const wb = XLSX.utils.book_new();
const ws_data = [
  ["PARCA_KODU", "PARCA_ADI", "KATEGORI", "ADET", "FIYAT", "GARANTI_AY"],
  ["PRC-USD1", "Parca Dolar Metin", "Elektronik", 5, "$45.00", 12],
  ["PRC-USD2", "Parca Dolar US", "Elektronik", 5, "US$ 45.00", 12],
  ["PRC-EUR1", "Parca Euro Simge", "Elektronik", 5, "120.00 €", 12],
  ["PRC-EUR2", "Parca Euro On", "Elektronik", 5, "€ 120.00", 12],
  ["PRC-EUR3", "Parca Euro Text", "Elektronik", 5, "120.00 EUR", 12],
  ["PRC-EUR4", "Parca Euro Word", "Elektronik", 5, "120.00 EURO", 12],
  ["PRC-EUR5", "Parca Euro NumFmt", "Elektronik", 5, 120.00, 12] // Sayısal para formatı
];

const ws = XLSX.utils.aoa_to_sheet(ws_data);
// PRC-EUR5 hücresine currency formatı ata
ws['E8'].z = '"€"#,##0.00';

XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

// Şimdi app.js'deki gibi oku:
const readWb = XLSX.read(buf, { type: 'buffer' });
const readWs = readWb.Sheets[readWb.SheetNames[0]];

console.log("=== sheet_to_json default (raw: true) ===");
const rowsDefault = XLSX.utils.sheet_to_json(readWs, { header: 1 });
rowsDefault.forEach((r, idx) => console.log(`Row ${idx}:`, JSON.stringify(r)));

console.log("\n=== sheet_to_json raw: false (formatted text) ===");
const rowsFormatted = XLSX.utils.sheet_to_json(readWs, { header: 1, raw: false });
rowsFormatted.forEach((r, idx) => console.log(`Row ${idx}:`, JSON.stringify(r)));
