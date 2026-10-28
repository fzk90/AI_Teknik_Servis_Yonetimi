const fs = require('fs');
const XLSX = require('../xlsx.full.min.js');

function normalizeMatchText(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/\u0130/g, 'i')
    .replace(/\u0131/g, 'i')
    .replace(/\u0307/g, '')
    .toLowerCase()
    .trim();
}

function matchCol(cell, keywords) {
  if (!cell) return false;
  const normCell = normalizeMatchText(cell);
  return keywords.some(kw => {
    const normKw = normalizeMatchText(kw);
    if (normKw === 'ad') {
      return normCell === 'ad' || normCell === 'adi' || normCell.startsWith('ad ') || normCell.endsWith(' adi') || normCell.includes('parca adi') || normCell.includes('malzeme adi') || normCell.includes('urun adi');
    }
    return normCell === normKw || normCell.includes(normKw);
  });
}

function detectCurrencyFromText(val) {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  if (!str) return null;
  const upper = str.toUpperCase();

  if (
    str.includes('$') ||
    upper.includes('USD') ||
    upper.includes('US$') ||
    upper.includes('DOLAR') ||
    upper.includes('DOLLAR')
  ) {
    return 'USD';
  }

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

function parseCleanFloat(val) {
  if (val === null || val === undefined) return 100;
  let str = String(val)
    .replace(/[₺$€\u20AC\u0080â‚¬\s]/g, '')
    .replace(/&euro;|&#8364;/gi, '')
    .replace(/usd|us\$|eur|euro|avro|try|tl/gi, '')
    .trim();
  if (str.includes(',') && str.includes('.')) {
    if (str.lastIndexOf(',') > str.lastIndexOf('.')) {
      str = str.replace(/\./g, '').replace(',', '.');
    } else {
      str = str.replace(/,/g, '');
    }
  } else if (str.includes(',')) {
    str = str.replace(',', '.');
  }
  const num = parseFloat(str);
  return isNaN(num) || num <= 0 ? 100 : num;
}

function parsePriceAndCurrency(val, currencyColVal = '', forcedMode = null, headerCurrency = null) {
  const rates = { USD: 38.50, EUR: 41.20, TRY: 1.0 };
  const usdRate = rates.USD || 38.50;
  const eurRate = rates.EUR || 41.20;

  const activeMode = (forcedMode || 'AUTO').toUpperCase();

  let detectedCurr = 'TRY';

  if (activeMode === 'USD') {
    detectedCurr = 'USD';
  } else if (activeMode === 'EUR') {
    detectedCurr = 'EUR';
  } else if (activeMode === 'TRY') {
    detectedCurr = 'TRY';
  } else {
    const fromCol = detectCurrencyFromText(currencyColVal);
    const fromVal = detectCurrencyFromText(val);
    const fromHeader = headerCurrency || null;

    if (fromCol) {
      detectedCurr = fromCol;
    } else if (fromVal) {
      detectedCurr = fromVal;
    } else if (fromHeader) {
      detectedCurr = fromHeader;
    } else {
      detectedCurr = 'TRY';
    }
  }

  const rawPrice = parseCleanFloat(val);

  let price = rawPrice;
  let originalPrice = rawPrice;
  let exchangeRate = 1.0;

  if (detectedCurr === 'USD') {
    exchangeRate = usdRate;
    price = Math.round(rawPrice * exchangeRate * 100) / 100;
    originalPrice = rawPrice;
  } else if (detectedCurr === 'EUR') {
    exchangeRate = eurRate;
    price = Math.round(rawPrice * exchangeRate * 100) / 100;
    originalPrice = rawPrice;
  } else {
    detectedCurr = 'TRY';
    exchangeRate = 1.0;
    price = rawPrice;
    originalPrice = rawPrice;
  }

  return { price, currency: detectedCurr, originalPrice, exchangeRate };
}

function extractWorksheetRows(worksheet) {
  if (!worksheet) return [];
  if (typeof XLSX === 'undefined') return [];
  const formattedRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

  const maxRows = Math.max(formattedRows.length, rawRows.length);
  const result = [];

  for (let rIdx = 0; rIdx < maxRows; rIdx++) {
    const fRow = formattedRows[rIdx] || [];
    const rRow = rawRows[rIdx] || [];
    const maxCols = Math.max(fRow.length, rRow.length);
    const row = [];

    for (let cIdx = 0; cIdx < maxCols; cIdx++) {
      let fCell = fRow[cIdx];
      const rCell = rRow[cIdx];

      const cellRef = XLSX.utils.encode_cell ? XLSX.utils.encode_cell({ r: rIdx, c: cIdx }) : null;
      const cellObj = (cellRef && worksheet[cellRef]) ? worksheet[cellRef] : null;

      if (cellObj && cellObj.w && (String(cellObj.w).includes('€') || String(cellObj.w).includes('\u20AC') || String(cellObj.w).includes('$') || String(cellObj.w).includes('₺'))) {
        fCell = cellObj.w;
      }

      if (cellObj && cellObj.z && typeof cellObj.z === 'string') {
        const zCode = cellObj.z;
        const zUpper = zCode.toUpperCase();
        const curValStr = String(fCell || rCell || '');
        const alreadyHasCurrency = curValStr.includes('€') || curValStr.includes('\u20AC') || curValStr.includes('$') || curValStr.includes('₺') || curValStr.toUpperCase().includes('EUR') || curValStr.toUpperCase().includes('USD');

        if (!alreadyHasCurrency) {
          if (zCode.includes('€') || zCode.includes('\u20AC') || zUpper.includes('EUR')) {
            fCell = `${curValStr} €`.trim();
          } else if (zCode.includes('₺') || zUpper.includes('TRY') || zUpper.includes('TL')) {
            fCell = `${curValStr} ₺`.trim();
          } else if (zCode.includes('[$$-') || (zCode.includes('$') && !zCode.includes('[$€') && !zCode.includes('[$₺')) || zUpper.includes('USD')) {
            fCell = `$${curValStr}`.trim();
          }
        }
      }

      if (fCell && (String(fCell).includes('€') || String(fCell).includes('\u20AC') || String(fCell).includes('$') || String(fCell).includes('₺'))) {
        row.push(fCell);
      } else {
        row.push((fCell !== undefined && fCell !== null && fCell !== '') ? fCell : rCell);
      }
    }
    result.push(row);
  }
  return result;
}

function parseStockData(input, sourceName = 'Metin', forcedCurrencyMode = null) {
  let rows = [];
  let delimiterDetected = 'Otomatik';

  if (Array.isArray(input)) {
    rows = input;
    delimiterDetected = `Excel (.xlsx) - ${sourceName}`;
  }

  rows = rows.filter(r => r && Array.isArray(r) && r.some(c => c !== null && c !== undefined && String(c).trim() !== ''));
  if (rows.length === 0) return { items: [], delimiter: delimiterDetected };

  let startIndex = 0;
  const firstRow = rows[0].map(s => String(s || '').trim());

  let colMap = { seq: -1, code: -1, name: -1, category: -1, qty: -1, price: -1, currency: -1, warranty: -1, priceHeaderCurrency: null };
  let headerMatchCount = 0;

  firstRow.forEach((col, idx) => {
    if (matchCol(col, ['sıra', 's.no', 'sira', '#', 'no']) && col.length <= 6 && colMap.seq === -1) {
      colMap.seq = idx;
      headerMatchCount++;
    } else if (matchCol(col, ['parça kodu', 'malzeme kodu', 'stok kodu', 'ürün kodu', 'kod', 'code', 'part code', 'part no', 'part_number', 'p.kodu', 'p_kodu']) && colMap.code === -1) {
      colMap.code = idx;
      headerMatchCount++;
    } else if (matchCol(col, ['parça adı', 'parça tanımı', 'malzeme adı', 'malzeme tanımı', 'malzeme cinsi', 'ürün adı', 'ürün tanımı', 'açıklama', 'tanım', 'ad', 'adı', 'cinsi', 'tanımı', 'name', 'item', 'description']) && colMap.name === -1) {
      colMap.name = idx;
      headerMatchCount++;
    } else if (matchCol(col, ['kategori', 'kategorisi', 'grup', 'parça grubu', 'tür', 'türü', 'category', 'group']) && colMap.category === -1) {
      colMap.category = idx;
      headerMatchCount++;
    } else if (matchCol(col, ['adet', 'miktar', 'miktarı', 'stok', 'stok adedi', 'mevcut', 'mevcud', 'mevcudu', 'bakiye', 'sayı', 'kalan', 'envanter', 'qty', 'quantity', 'stock', 'count']) && colMap.qty === -1) {
      colMap.qty = idx;
      headerMatchCount++;
    } else if (matchCol(col, ['fiyat', 'birim fiyat', 'birim fiyatı', 'satış fiyatı', 'tutar', 'ücret', 'maliyet', 'bedel', 'price', 'unit price', 'cost']) && colMap.price === -1) {
      colMap.price = idx;
      headerMatchCount++;
      colMap.priceHeaderCurrency = detectCurrencyFromText(col);
    } else if (matchCol(col, ['para birimi', 'döviz', 'döviz cinsi', 'para birim', 'currency', 'kur', 'pb', 'doviz', 'valuta', 'para', 'birim', '€', '$', 'eur', 'usd', 'tl', 'try']) && colMap.currency === -1) {
      colMap.currency = idx;
      headerMatchCount++;
    } else if (matchCol(col, ['garanti', 'garanti süresi', 'garanti (ay)', 'garanti ay', 'warranty', 'garanti_ay']) && colMap.warranty === -1) {
      colMap.warranty = idx;
      headerMatchCount++;
    }
  });

  const isHeader = rows.length > 1 && headerMatchCount >= 1 && (colMap.code !== -1 || colMap.name !== -1 || colMap.qty !== -1);
  if (isHeader) {
    startIndex = 1;
  }

  const items = [];
  for (let i = startIndex; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length === 0) continue;

    let pCode = '';
    let pName = '';
    let pCategory = 'Genel';
    let pQty = 1;
    let pPrice = 100;
    let pCurrency = 'TRY';
    let pOrigPrice = 100;
    let pRate = 1.0;
    let pWar = '12';

    if (isHeader && (colMap.name !== -1 || colMap.code !== -1)) {
      if (colMap.code !== -1 && r[colMap.code]) pCode = String(r[colMap.code]).trim();
      if (colMap.name !== -1 && r[colMap.name]) pName = String(r[colMap.name]).trim();
      if (colMap.category !== -1 && r[colMap.category]) pCategory = String(r[colMap.category]).trim();
      if (colMap.qty !== -1 && r[colMap.qty]) pQty = parseInt(r[colMap.qty], 10) || 1;

      const rawPriceVal = colMap.price !== -1 ? r[colMap.price] : '';
      const rawCurrVal = colMap.currency !== -1 ? r[colMap.currency] : '';
      const parsedCur = parsePriceAndCurrency(rawPriceVal, rawCurrVal, forcedCurrencyMode, colMap.priceHeaderCurrency);
      pPrice = parsedCur.price;
      pCurrency = parsedCur.currency;
      pOrigPrice = parsedCur.originalPrice;
      pRate = parsedCur.exchangeRate;

      if (colMap.warranty !== -1 && r[colMap.warranty]) pWar = String(r[colMap.warranty]).replace(/[^0-9]/g, '') || '12';
    }

    items.push({
      code: pCode,
      name: pName,
      category: pCategory,
      qty: pQty,
      price: pPrice,
      currency: pCurrency,
      originalPrice: pOrigPrice,
      exchangeRate: pRate,
      warranty: `${pWar} Ay`
    });
  }

  return { items, delimiter: delimiterDetected };
}

console.log('--- TEST 1: Header "FİYAT", Cell "120 €" ---');
const ws1 = XLSX.utils.aoa_to_sheet([
  ['Parça Kodu', 'Parça Adı', 'Kategori', 'Miktar', 'FİYAT', 'Garanti'],
  ['PRC-1', 'Rulman 6204', 'Mekanik', 10, '120 €', 12]
]);
const res1 = parseStockData(extractWorksheetRows(ws1), 'test1.xlsx');
console.log('Result 1 items:', res1.items);

console.log('\n--- TEST 2: Header "FİYAT (€)", Cell 120 ---');
const ws2 = XLSX.utils.aoa_to_sheet([
  ['Parça Kodu', 'Parça Adı', 'Kategori', 'Miktar', 'FİYAT (€)', 'Garanti'],
  ['PRC-1', 'Rulman 6204', 'Mekanik', 10, 120, 12]
]);
const res2 = parseStockData(extractWorksheetRows(ws2), 'test2.xlsx');
console.log('Result 2 items:', res2.items);

console.log('\n--- TEST 3: Header "FİYAT" & "DÖVİZ", Cell 120 & "€" ---');
const ws3 = XLSX.utils.aoa_to_sheet([
  ['Parça Kodu', 'Parça Adı', 'Kategori', 'Miktar', 'FİYAT', 'DÖVİZ', 'Garanti'],
  ['PRC-1', 'Rulman 6204', 'Mekanik', 10, 120, '€', 12]
]);
const res3 = parseStockData(extractWorksheetRows(ws3), 'test3.xlsx');
console.log('Result 3 items:', res3.items);

console.log('\n--- TEST 4: Header "BİRİM FİYAT", Cell "120 €" ---');
const ws4 = XLSX.utils.aoa_to_sheet([
  ['Parça Kodu', 'Parça Adı', 'Kategori', 'Miktar', 'BİRİM FİYAT', 'Garanti'],
  ['PRC-1', 'Rulman 6204', 'Mekanik', 10, '120 €', 12]
]);
const res4 = parseStockData(extractWorksheetRows(ws4), 'test4.xlsx');
console.log('Result 4 items:', res4.items);

console.log('\n--- TEST 5: Excel Format Cell without w: cell.z = "[$€-tr-TR] #.##0,00" ---');
const ws5 = XLSX.utils.aoa_to_sheet([
  ['Parça Kodu', 'Parça Adı', 'Kategori', 'Miktar', 'FİYAT', 'Garanti'],
  ['PRC-1', 'Rulman 6204', 'Mekanik', 10, 120, 12]
]);
ws5['E2'].z = '[$€-tr-TR] #.##0,00';
delete ws5['E2'].w;
const res5 = parseStockData(extractWorksheetRows(ws5), 'test5.xlsx');
console.log('Result 5 items:', res5.items);
