// Test Turkish lower-case and Euro detection
console.log("=== TÜRKÇE KARAKTER LOWERCASE TESTİ ===");
const str = "FİYAT (€)";
console.log("Standard toLowerCase:", str.toLowerCase()); // "fıyat (€)" -> 'fiyat' ile eşleşmez!
console.log("Locale 'tr' toLowerCase:", str.toLocaleLowerCase('tr-TR')); // "fiyat (€)" -> 'fiyat' ile eşleşir!

// matchCol fonksiyonu:
const keywords = ['fiyat', 'birim fiyat', 'birim fiyatı', 'satış fiyatı', 'tutar', 'ücret', 'maliyet', 'bedel', 'price', 'unit price', 'cost'];
const cell1 = str.toLowerCase();
const match1 = keywords.some(kw => cell1 === kw || cell1.includes(kw));
console.log("Standard match:", match1); // false!

const cell2 = str.toLocaleLowerCase('tr-TR');
const match2 = keywords.some(kw => cell2 === kw || cell2.includes(kw));
console.log("Locale 'tr' match:", match2); // true!
