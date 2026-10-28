const fs = require('fs');
const assert = require('assert');

// 1. Mock minimal browser environment
global.state = {
  activeOrder: {
    code: 'SRV-2026-104',
    customer: 'TermoTek Ltd.',
    brand: 'Delta Electronics',
    model: 'VFD-075 Endüstriyel Sürücü Kartı',
    device: 'Delta Electronics VFD-075 Endüstriyel Sürücü Kartı',
    complaint: 'Cihaz giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor ve koruma rölesi devreyi kesiyor.'
  },
  stock: [
    { code: 'IGBT-600V-40A', name: 'IGBT-600V-40A Güç Transistörü', central: 10, veh_1: 4, veh_2: 4 },
    { code: 'KOND-470UF', name: 'KOND-470UF 450V Düşük ESR Kondansatör', central: 20, veh_1: 6, veh_2: 6 },
    { code: 'ROLE-24V-16A', name: 'ROLE-24V-16A Koruma Rölesi', central: 15, veh_1: 2, veh_2: 2 }
  ],
  staff: [{ id: 2, name: 'Murat Aydın' }],
  vehicles: [{ id: 1, driverId: 2, plate: '34 ABC 101' }],
  activeTechId: 2
};

global.getTechVehicleStock = function(part, techId) {
  return part.veh_1 || 0;
};

global.localStorage = {
  _store: {},
  getItem: function(key) { return this._store[key] || null; },
  setItem: function(key, val) { this._store[key] = String(val); }
};

// 2. Load functions from app.js
const appCode = fs.readFileSync('Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'utf8');

// Evaluate loadServiceKnowledgeBaseFromLocalStorage & synthesizeAIDiagnosis
const kbFnMatch = appCode.match(/function loadServiceKnowledgeBaseFromLocalStorage\(\)[\s\S]*?\n\}/);
const synthFnMatch = appCode.match(/function synthesizeAIDiagnosis[\s\S]*?\n\}/);

assert(kbFnMatch, 'loadServiceKnowledgeBaseFromLocalStorage bulunamadı!');
assert(synthFnMatch, 'synthesizeAIDiagnosis bulunamadı!');

eval(kbFnMatch[0]);
eval(synthFnMatch[0]);

console.log('▶ TEST A: SRV-2026-104 Temel Teşhis Doğrulaması...');
loadServiceKnowledgeBaseFromLocalStorage();

const res104 = synthesizeAIDiagnosis('Delta Electronics', 'VFD-075 Endüstriyel Sürücü Kartı', state.activeOrder.complaint, state.activeOrder);

console.log('  Kök Neden:', res104.probable_root_cause);
console.log('  Çözüm:', res104.recommended_solution);
console.log('  Müdahale:', res104.recommended_action);
console.log('  Adımlar Sayısı:', res104.inspection_steps.length);

assert(res104.probable_root_cause.includes('Delta Electronics VFD-075'), 'Kök neden Delta Electronics VFD-075 içermeli');
assert(res104.probable_root_cause.includes('IGBT'), 'Kök neden IGBT içermeli');
assert(res104.recommended_solution.includes('IGBT-600V-40A'), 'Çözüm IGBT-600V-40A içermeli');
assert(res104.recommended_action.includes('IGBT-600V-40A'), 'Müdahale IGBT-600V-40A içermeli');
assert.strictEqual(res104.inspection_steps.length, 4, '4 adet kontrol adımı olmalı');
assert(res104.recommended_parts.some(p => p.includes('IGBT-600V-40A')), 'IGBT-600V-40A parça listesinde olmalı');

console.log('✓ TEST A BAŞARILI: SRV-2026-104 için doğru Delta VFD-075 IGBT teşhisi üretildi!');

console.log('\n▶ TEST B: Yabancı / Hatalı (143 vb.) Bilgi Bankası Kayıtlarının İzolasyonu...');
// localStorage'a hatalı bir SRV-2026-143 kaydı koyalım
localStorage.setItem('servisai_knowledge_base', JSON.stringify([
  {
    id: 'KB-SAVED-143',
    orderCode: 'SRV-2026-143',
    keywordMatch: ['kart', 'ariza', 'cozum', 'voltaj', '143'],
    rootCause: 'Bu 143 nolu servise ait yabancı arızadır',
    solution: 'Bu 143 nolu çözümdür',
    action: '143 müdahalesi',
    steps: ['143 adımı 1', '143 adımı 2']
  }
]));

// Yeniden yükleme yapıldığında 143 kaydı otomatik ayıklanmalı
loadServiceKnowledgeBaseFromLocalStorage();
assert(!state.serviceKnowledgeBase.some(kb => JSON.stringify(kb).includes('143')), '143 nolu kayıt sanitize edilmiş olmalı');

const resAfterClean = synthesizeAIDiagnosis('Delta Electronics', 'VFD-075 Endüstriyel Sürücü Kartı', state.activeOrder.complaint, state.activeOrder);
assert(!resAfterClean.probable_root_cause.includes('143'), 'SRV-2026-104 asla 143 nolu kaydı getirmemeli');
assert(resAfterClean.probable_root_cause.includes('Delta Electronics VFD-075'), 'Hala doğru Delta VFD teşhisi gelmeli');

console.log('✓ TEST B BAŞARILI: 143 nolu yabancı kayıt filtreye takıldı ve izole edildi!');

console.log('\n▶ TEST C: Stop-Words Koruması (Yalnızca "kart", "arıza" ile eşleşme engellendi)...');
// Başka bir servis için stop words içeren kayıt ekleyelim (143 içermeyen ama gevşek)
state.serviceKnowledgeBase.unshift({
  id: 'KB-GENERIC-OTHER',
  orderCode: 'SRV-2026-999',
  keywordMatch: ['kart', 'ariza', 'cihaz'],
  rootCause: 'Genel sahte arıza',
  solution: 'Genel sahte çözüm'
});

const resCheck = synthesizeAIDiagnosis('Delta Electronics', 'VFD-075 Endüstriyel Sürücü Kartı', state.activeOrder.complaint, state.activeOrder);
assert.strictEqual(resCheck.probable_root_cause.includes('Genel sahte'), false, 'Gevşek stop-words kaydı eşleşmemeli!');
assert(resCheck.probable_root_cause.includes('Delta Electronics VFD-075'), 'SRV-2026-104 korundu!');

console.log('✓ TEST C BAŞARILI: Gevşek genel anahtar kelimeler başka iş emirlerini bozmuyor!');

console.log('\n======================================================');
console.log('🎉 TÜM AI TEŞHİS VE BİLGİ BANKASI DOĞRULAMA TESTLERİ GEÇTİ!');
console.log('======================================================');

