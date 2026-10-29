// ================================================================================
//   SERVİSAİ - ÜST MENÜ FERAHLAŞTIRMA & YÖNETİCİ ALT KOMUTA ÇUBUĞU DOĞRULAMA TESTİ
// ================================================================================

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'styles.css');
const jsPath = path.join(rootDir, 'app.js');

console.log("================================================================================");
console.log("   SERVİSAİ - ÜST MENÜ FERAHLAŞTIRMA & YÖNETİCİ ALT ÇUBUK DOĞRULAMA TESTİ");
console.log("================================================================================\n");

// -------------------------------------------------------------
// TEST 1: index.html Üst Menü (app-header) Sadeliği ve Ferahlığı
// -------------------------------------------------------------
console.log("▶ TEST 1: index.html Üst Menü (app-header) Sadeliği ve Ferahlığı...");
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract app-header block
const headerMatch = htmlContent.match(/<header class="app-header">([\s\S]*?)<\/header>/);
assert(headerMatch, "HATA: <header class=\"app-header\"> bloğu bulunamadı!");
const headerHtml = headerMatch[1];

// Extract role-nav inside header
const roleNavMatch = headerHtml.match(/<nav class="role-nav"[\s\S]*?>([\s\S]*?)<\/nav>/);
assert(roleNavMatch, "HATA: <nav class=\"role-nav\"> bulunamadı!");
const roleNavHtml = roleNavMatch[1];

// Role nav must ONLY contain 3 core roles
assert(roleNavHtml.includes('id="btn-tab-admin"'), "HATA: #btn-tab-admin rol menüsünde bulunamadı!");
assert(roleNavHtml.includes('id="btn-tab-tech"'), "HATA: #btn-tab-tech rol menüsünde bulunamadı!");
assert(roleNavHtml.includes('id="btn-tab-customer"'), "HATA: #btn-tab-customer rol menüsünde bulunamadı!");

assert(!roleNavHtml.includes('id="btn-tab-reports"'), "HATA: #btn-tab-reports rol menüsünden kaldırılmalıydı (Yönetici Paneline taşındı)!");
assert(!roleNavHtml.includes('id="btn-tab-equipment"'), "HATA: #btn-tab-equipment rol menüsünden kaldırılmalıydı (Yönetici Paneline taşındı)!");

const roleButtons = roleNavHtml.match(/<button class="role-btn/g) || [];
assert.strictEqual(roleButtons.length, 3, `HATA: Üst rol menüsünde 3 buton olmalı, ${roleButtons.length} bulundu!`);
console.log("  ✓ Üst rol menüsü sadeleştirildi: Yalnızca 3 temel operasyonel rol mevcut (Yönetici, Teknisyen, Müşteri).");

// Extract header-actions (everything after class="header-actions"> up to </header>)
const headerActionsIdx = headerHtml.indexOf('class="header-actions">');
assert(headerActionsIdx !== -1, "HATA: <div class=\"header-actions\"> bulunamadı!");
const headerActionsHtml = headerHtml.substring(headerActionsIdx);

assert(headerActionsHtml.includes('id="btn-open-intake-modal"'), "HATA: #btn-open-intake-modal üst sağda olmalı!");
assert(headerActionsHtml.includes('id="btn-open-manager-modal"'), "HATA: #btn-open-manager-modal üst sağda olmalı!");
assert(headerActionsHtml.includes('id="btn-header-settings"'), "HATA: #btn-header-settings üst sağda olmalı!");

// Should NOT contain removed buttons in top header
assert(!headerActionsHtml.includes('id="btn-open-embed-modal"'), "HATA: #btn-open-embed-modal üst menüden Ayarlara taşınmalıydı!");
assert(!headerActionsHtml.includes('id="btn-header-auth-action"'), "HATA: #btn-header-auth-action üst menüden Ayarlara taşınmalıydı!");
assert(!headerActionsHtml.includes('id="btn-open-demo-guide-modal"'), "HATA: #btn-open-demo-guide-modal üst menüden Ayarlara taşınmalıydı!");

console.log("  ✓ Üst sağ eylemler ferahlatıldı: Yalnızca '+ Yeni Çağrı', 'Yönetici Profili' ve '⚙️ Ayarlar' kaldı.");

// -------------------------------------------------------------
// TEST 2: Yönetici & Kontrol Paneli Alt Komuta Çubuğu (admin-subnav-bar)
// -------------------------------------------------------------
console.log("\n▶ TEST 2: Yönetici & Kontrol Paneli Alt Komuta Çubuğu...");

const adminViewMatch = htmlContent.match(/<section id="admin-view"[\s\S]*?>([\s\S]*?)<\/section>/);
assert(adminViewMatch, "HATA: #admin-view bölümü bulunamadı!");
const adminViewHtml = adminViewMatch[1];

assert(adminViewHtml.includes('class="admin-subnav-bar"'), "HATA: #admin-view içinde 'admin-subnav-bar' bulunamadı!");
assert(adminViewHtml.includes('id="btn-admin-sub-dispatch"'), "HATA: 'Sevk Masası & Operasyon' subnav butonu bulunamadı!");
assert(adminViewHtml.includes('id="btn-tab-equipment"'), "HATA: 'Cihaz Sicil & Seri No' subnav butonu bulunamadı!");
assert(adminViewHtml.includes('id="equipment-count-badge"'), "HATA: 'equipment-count-badge' rozeti bulunamadı!");
assert(adminViewHtml.includes('id="btn-tab-reports"'), "HATA: 'Raporlama & Analitik' subnav butonu bulunamadı!");
assert(adminViewHtml.includes('id="admin-system-status"'), "HATA: 'Saha Senkronize' göstergesi Yönetici paneline taşınamadı!");
assert(adminViewHtml.includes('Saha Senkronize'), "HATA: 'Saha Senkronize' metni bulunamadı!");

console.log("  ✓ Yönetici panelinde alt komuta çubuğu mevcut: Sevk Masası, Cihaz Sicil & Seri No, Raporlama & Analitik ve Saha Senkronize.");

// -------------------------------------------------------------
// TEST 3: Raporlama ve Cihaz Sicil Ekranlarında Geri Dönüş ve Çapraz Gezinim
// -------------------------------------------------------------
console.log("\n▶ TEST 3: Raporlama ve Cihaz Sicil Ekranlarında Çapraz Gezinim Çubuğu...");

const reportsViewMatch = htmlContent.match(/<section id="reports-view"[\s\S]*?>([\s\S]*?)<\/section>/);
assert(reportsViewMatch, "HATA: #reports-view bölümü bulunamadı!");
assert(reportsViewMatch[1].includes('admin-subnav-bar'), "HATA: #reports-view içinde admin-subnav-bar bulunamadı!");

const equipmentViewMatch = htmlContent.match(/<section id="equipment-view"[\s\S]*?>([\s\S]*?)<\/section>/);
assert(equipmentViewMatch, "HATA: #equipment-view bölümü bulunamadı!");
assert(equipmentViewMatch[1].includes('admin-subnav-bar'), "HATA: #equipment-view içinde admin-subnav-bar bulunamadı!");

console.log("  ✓ Raporlama ve Cihaz Sicil ekranlarında yönetici modülleri arası kesintisiz geçiş çubuğu mevcut.");

// -------------------------------------------------------------
// TEST 4: Ayarlar Menüsünde Web Formu & Biyo Linki ve Çıkış Yap
// -------------------------------------------------------------
console.log("\n▶ TEST 4: Ayarlar Menüsünde Web Formu & Biyo Linki ve Çıkış Yap...");

const settingsModalMatch = htmlContent.match(/<div class="modal-backdrop" id="settings-modal"[\s\S]*?id="tab-settings-integrations"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
assert(settingsModalMatch, "HATA: #settings-modal bulunamadı!");

// Check Settings Header Actions
assert(htmlContent.includes('id="btn-settings-open-embed"'), "HATA: Ayarlar başlığında 'btn-settings-open-embed' butonu bulunamadı!");
assert(htmlContent.includes('id="btn-header-auth-action"'), "HATA: Ayarlar menüsünde 'btn-header-auth-action' (Çıkış Yap) bulunamadı!");
assert(htmlContent.includes('id="btn-header-auth-icon"'), "HATA: 'btn-header-auth-icon' bulunamadı!");
assert(htmlContent.includes('id="btn-header-auth-text"'), "HATA: 'btn-header-auth-text' bulunamadı!");

// Check Settings Tab 5 Web Form Card
assert(htmlContent.includes('id="btn-open-embed-modal"'), "HATA: Ayarlar 5. Sekmesinde 'btn-open-embed-modal' butonu bulunamadı!");
assert(htmlContent.includes('Web Sitesi & Sosyal Medya Arıza Kayıt Formu (Embed Hub)'), "HATA: Web Formu başlığı bulunamadı!");

console.log("  ✓ '🌐 Web Formu & Biyo Linki' ve '🚪 Çıkış Yap' başarıyla Ayarlar menüsüne yerleştirildi.");

// -------------------------------------------------------------
// TEST 5: styles.css Tasarım ve Responsive Stiller
// -------------------------------------------------------------
console.log("\n▶ TEST 5: styles.css Tasarım ve Görsel Bütünlük...");
const cssContent = fs.readFileSync(cssPath, 'utf8');

assert(cssContent.includes('.admin-subnav-bar'), "HATA: styles.css içinde .admin-subnav-bar sınıfı bulunamadı!");
assert(cssContent.includes('.admin-subnav-btn'), "HATA: styles.css içinde .admin-subnav-btn sınıfı bulunamadı!");
assert(cssContent.includes('.admin-subnav-btn.active'), "HATA: styles.css içinde .admin-subnav-btn.active sınıfı bulunamadı!");

console.log("  ✓ styles.css içinde yönetici alt çubuğu ve buton sınıfları eksiksiz tanımlı.");

// -------------------------------------------------------------
// TEST 6: app.js switchToAdminSection ve Gezinim Mantığı
// -------------------------------------------------------------
console.log("\n▶ TEST 6: app.js Gezinim ve Olay Dinleyici Mantığı...");
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(jsContent.includes('function switchToAdminSection('), "HATA: app.js içinde switchToAdminSection fonksiyonu bulunamadı!");
assert(jsContent.includes('window.switchToAdminSection = switchToAdminSection'), "HATA: switchToAdminSection global window nesnesine bağlanamadı!");
assert(jsContent.includes('btnSettingsOpenEmbed'), "HATA: app.js içinde btnSettingsOpenEmbed dinleyicisi bulunamadı!");

console.log("  ✓ app.js switchToAdminSection fonksiyonu ve Web Formu dinleyicileri hazır.");

console.log("\n================================================================================");
console.log("   🎉 TÜM MENÜ DÜZENLEME & FERAHLAŞTIRMA TESTLERİ BAŞARIYLA GEÇTİ (6/6)");
console.log("================================================================================\n");
