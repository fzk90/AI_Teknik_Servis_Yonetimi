const XLSX = require('../xlsx.full.min.js');

// Excel'de Türkçe ayarlarında kullanıcı hücreye "120 €" yazdığında ne olur?
// 1. Hücre değeri sayı (120), formatı '€'
// 2. Veya kullanıcı hücreye metin olarak '120 €' yazsa bile bazı durumlarda
console.log("SheetJS Cell Formats Test:");

// Bir worksheet oluşturalım
const ws = {};
ws['!ref'] = 'A1:C2';
ws['A1'] = { t: 's', v: 'PARCA_ADI' };
ws['B1'] = { t: 's', v: 'FIYAT' };
ws['C1'] = { t: 's', v: 'PB' };

// Satır 2: Kullanıcı Excel'de 120 € yazınca Excel formatı:
ws['A2'] = { t: 's', v: 'Inverter Karti' };
ws['B2'] = { t: 'n', v: 120, z: '#,##0.00 €', w: '120,00 €' }; // Excel'in ürettiği hücre!
ws['C2'] = { t: 's', v: '€' };

const wb = { SheetNames: ['Sheet1'], Sheets: { Sheet1: ws } };

console.log("\n1. XLSX.utils.sheet_to_json(ws, { header: 1 }) [raw: true]:");
const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1 });
console.log(rawRows);

console.log("\n2. XLSX.utils.sheet_to_json(ws, { header: 1, raw: false }) [formatted text]:");
const formattedRows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
console.log(formattedRows);
