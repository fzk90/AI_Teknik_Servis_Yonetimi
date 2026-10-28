const XLSX = require('../xlsx.full.min.js');

function extractWorksheetRows(worksheet) {
  const formattedRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
  
  return formattedRows.map((fRow, rIdx) => {
    const rRow = rawRows[rIdx] || [];
    return fRow.map((fCell, cIdx) => {
      const rCell = rRow[cIdx];
      if (fCell && (String(fCell).includes('€') || String(fCell).includes('$') || String(fCell).includes('₺'))) {
        return fCell;
      }
      return (fCell !== undefined && fCell !== null && fCell !== '') ? fCell : rCell;
    });
  });
}

// Test: Excel'de Para Birimi Formatı ile kaydedilmiş 120 €
const ws = {};
ws['!ref'] = 'A1:C2';
ws['A1'] = { t: 's', v: 'PARCA_ADI' };
ws['B1'] = { t: 's', v: 'FIYAT' };
ws['C1'] = { t: 's', v: 'GARANTI' };

ws['A2'] = { t: 's', v: 'Inverter Karti' };
ws['B2'] = { t: 'n', v: 120, z: '#,##0.00 €', w: '120,00 €' }; // Excel'in formatlı hücresi
ws['C2'] = { t: 'n', v: 12, w: '12' };

const extracted = extractWorksheetRows(ws);
console.log("Extracted Rows:", JSON.stringify(extracted));
console.log("Hücre B2 Değeri:", extracted[1][1]);
console.log("Euro Sembolü Korundu mu?:", extracted[1][1].includes('€') ? "EVET, KORUNDU! ✓" : "HAYIR ✗");
