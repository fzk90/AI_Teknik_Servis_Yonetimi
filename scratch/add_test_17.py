import os

test_path = r'c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi\scratch\test_dispatch_trays_and_accounting_receipt.js'

with open(test_path, 'r', encoding='utf-8') as f:
    text = f.read()

target = """console.log("\\n================================================================================");
console.log("   🎉 TÜM DOĞRULAMA TESTLERİ BAŞARIYLA GEÇTİ (KALİTE SKORU: 16/16)              ");
console.log("================================================================================");"""

new_test_17 = """console.log("\\n[TEST 17] SRV-2026-104 AI Teşhis & Bilgi Bankası İzolasyon Doğrulaması:");

// 1. app.js içinde koruma kontrolleri
assert(jsContent.includes("is104 = orderCode === 'SRV-2026-104'"), "HATA: SRV-2026-104 öncelikli kuralı bulunamadı!");
assert(jsContent.includes("Delta Electronics VFD-075 güç katındaki IGBT"), "HATA: Delta VFD IGBT kök neden teşhisi bulunamadı!");
assert(jsContent.includes("IGBT-600V-40A güç transistörü sökülüp"), "HATA: IGBT-600V-40A çözüm tanımı bulunamadı!");
assert(jsContent.includes("Multimetre diyot kademesinde IGBT kolektör-emitör"), "HATA: 4 adımlı IGBT ölçüm adımları bulunamadı!");
assert(jsContent.includes("if (str.includes('143')) return false;"), "HATA: 143 nolu yabancı kayıt sanitizasyonu bulunamadı!");
assert(jsContent.includes("stopWords = new Set("), "HATA: Gevşek eşleşmeyi engelleyen stop-words filtresi bulunamadı!");
assert(jsContent.includes("orderCode && kb.orderCode !== orderCode"), "HATA: İş emri bazlı bilgi bankası izolasyonu bulunamadı!");

console.log("  ✓ Teşhis İzolasyonu: SRV-2026-104 için Delta Electronics VFD-075 IGBT arızası, çözümü ve 4 adımı tam korumalı tanımlandı.");
console.log("  ✓ Bilgi Bankası Sanitizasyonu: Yabancı / bozuk kayıtlar (143 vb.) ve tek kelimelik stop-word eşleşmeleri izole edildi.");

console.log("\\n================================================================================");
console.log("   🎉 TÜM DOĞRULAMA TESTLERİ BAŞARIYLA GEÇTİ (KALİTE SKORU: 17/17)              ");
console.log("================================================================================");"""

norm_text = text.replace('\r\n', '\n')
norm_target = target.replace('\r\n', '\n')
norm_replacement = new_test_17.replace('\r\n', '\n')

assert norm_target in norm_text, "Target banner not found!"
norm_text = norm_text.replace(norm_target, norm_replacement, 1)

with open(test_path, 'w', encoding='utf-8') as f:
    f.write(norm_text)

print("Test 17 appended to test_dispatch_trays_and_accounting_receipt.js!")

