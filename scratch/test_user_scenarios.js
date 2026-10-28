const XLSX = require('../xlsx.full.min.js');

// Zafer Bey'in oluşturabileceği gerçek Excel dosyası simülasyonu
console.log("=== EXCEL DOSYASI GERÇEK KULLANICI TESTİ ===");

// Senaryo 1: Kullanıcı Excel açtı, sütun başlıklarını yazdı
// Başlıklar: Parça Kodu, Parça Adı, Kategori, Adet, Fiyat, Garanti
// Fiyat hücresine klavyeden: 120 € yazdı
const wb1 = XLSX.utils.book_new();
const data1 = [
  ["PARÇA KODU", "PARÇA TANIMI", "KATEGORİ", "ADET", "FİYAT", "GARANTİ"],
  ["IGBT-001", "IGBT Güç Modülü", "Elektronik", 5, "45 $", "12 Ay"],
  ["FAN-002", "Sürücü Fanı", "Sensör", 2, "120 €", "12 Ay"],
  ["FAN-003", "Sürücü Fanı 2", "Sensör", 2, "120 EUR", "12 Ay"],
  ["RUL-004", "Rulman", "Mekanik", 10, "180 TL", "12 Ay"]
];
const ws1 = XLSX.utils.aoa_to_sheet(data1);
XLSX.utils.book_append_sheet(wb1, ws1, "Sheet1");
const buf1 = XLSX.write(wb1, { type: 'buffer', bookType: 'xlsx' });

// Senaryo 2: Excel'de Para Birimi Formatı seçildi
const wb2 = XLSX.utils.book_new();
const data2 = [
  ["PARÇA KODU", "PARÇA TANIMI", "KATEGORİ", "ADET", "FİYAT", "GARANTİ"],
  ["IGBT-001", "IGBT Güç Modülü", "Elektronik", 5, 45.00, 12],
  ["FAN-002", "Sürücü Fanı", "Sensör", 2, 120.00, 12]
];
const ws2 = XLSX.utils.aoa_to_sheet(data2);
ws2['E2'].z = '$#,##0.00';
ws2['E2'].w = '$45.00';
ws2['E3'].z = '#,##0.00 €';
ws2['E3'].w = '120,00 €';
XLSX.utils.book_append_sheet(wb2, ws2, "Sheet1");
const buf2 = XLSX.write(wb2, { type: 'buffer', bookType: 'xlsx' });

// Senaryo 3: Ayrı kolon açıldı: DÖVİZ veya PARA BİRİMİ
const wb3 = XLSX.utils.book_new();
const data3 = [
  ["PARÇA KODU", "PARÇA TANIMI", "KATEGORİ", "ADET", "FİYAT", "DÖVİZ", "GARANTİ"],
  ["IGBT-001", "IGBT Güç Modülü", "Elektronik", 5, 45.00, "$", 12],
  ["FAN-002", "Sürücü Fanı", "Sensör", 2, 120.00, "€", 12]
];
const ws3 = XLSX.utils.aoa_to_sheet(data3);
XLSX.utils.book_append_sheet(wb3, ws3, "Sheet1");
const buf3 = XLSX.write(wb3, { type: 'buffer', bookType: 'xlsx' });

console.log("3 dosya oluşturuldu. Şimdi app.js fonksiyonlarıyla okuyacağız.");
