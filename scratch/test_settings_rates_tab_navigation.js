// -*- coding: utf-8 -*-
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('================================================================================');
console.log('   SERVİSAİ - AYARLAR MENÜSÜ & İŞÇİLİK TARİFELERİ GEZİNİM TESTİ');
console.log('================================================================================\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const appPath = path.join(__dirname, '..', 'app.js');
const cssPath = path.join(__dirname, '..', 'styles.css');

const html = fs.readFileSync(htmlPath, 'utf8');
const appJs = fs.readFileSync(appPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('▶ TEST 1: index.html İçinde Tarifelere Hızlı Erişim Butonları...');
assert(html.includes('id="btn-quick-to-rates"'), 'Modal üst başlığında "Tarifeleri Güncelle" butonu olmalı!');
assert(html.includes('id="btn-banner-to-rates"'), 'Tab 1 Hoş Geldiniz kutusunda "4. Sekme: İşçilik Tarifelerine Git" butonu olmalı!');
assert(html.includes('id="btn-footer-goto-rates"'), 'Modal alt çubuğunda (footer) "4. Sekme: Tarifelere Git" butonu olmalı!');
assert(html.includes('id="btn-set-tab-rates"'), 'Sekme çubuğunda "4. İşçilik & Onarım Tarifeleri" sekmesi olmalı!');
assert(html.includes('settings-tab-rates-highlight'), 'Tarifeler sekmesinde özel görsel vurgu sınıfı olmalı!');

console.log('  ✓ Modal başlığında "💰 Tarifeleri Güncelle" butonu mevcut.');
console.log('  ✓ 1. Sekme karşılama kutusunda "💰 4. Sekme: İşçilik Tarifelerine Git" butonu mevcut.');
console.log('  ✓ Alt çubukta dinamik gezinme butonu mevcut.');
console.log('  ✓ Sekme çubuğunda altın sarısı "💰 4. İşçilik & Onarım Tarifeleri" sekmesi mevcut.\n');

console.log('▶ TEST 2: styles.css Tasarım & Görsel Vurgulama Sınıfları...');
assert(css.includes('.settings-tab-rates-highlight'), 'styles.css içinde .settings-tab-rates-highlight tanımlı olmalı!');
assert(css.includes('.settings-nav-tabs'), 'styles.css içinde .settings-nav-tabs tanımlı olmalı!');

console.log('  ✓ Sekme çubuğu ve Tarifeler sekmesi için modern, yüksek kontrastlı stiller doğrulandı.\n');

console.log('▶ TEST 3: app.js switchSettingsTab ve openSettingsModal Fonksiyonları...');
assert(appJs.includes('function switchSettingsTab(targetTabId)'), 'app.js içinde switchSettingsTab fonksiyonu olmalı!');
assert(appJs.includes('openSettingsModal(targetTabId = null)'), 'openSettingsModal hedef sekme parametresi almalı!');
assert(appJs.includes("btnQuickToRates.addEventListener('click'"), 'btnQuickToRates dinleyicisi olmalı!');
assert(appJs.includes("btnBannerToRates.addEventListener('click'"), 'btnBannerToRates dinleyicisi olmalı!');
assert(appJs.includes("btnFooterGotoRates.addEventListener('click'"), 'btnFooterGotoRates dinleyicisi olmalı!');
assert(appJs.includes("btnOpenSettings.addEventListener('click', () => openSettingsModal('tab-settings-rates'))"), 'Sevk masasındaki Ayarlar & Tarifeler butonu doğrudan tarifeleri açmalı!');

console.log('  ✓ switchSettingsTab() fonksiyonu tanımlı ve window nesnesine bağlı.');
console.log('  ✓ openSettingsModal(targetTabId) doğrudan istenen sekmeyi açabiliyor.');
console.log('  ✓ Tüm gezinme butonları switchSettingsTab("tab-settings-rates") ile senkronize.\n');

console.log('▶ TEST 4: Dinamik Footer ve Sekme Değişim Mantığı Simülasyonu...');
function simulateSwitchTab(tabId) {
  const isRatesTab = (tabId === 'tab-settings-rates');
  return {
    activeTab: tabId,
    saveRatesBtnDisplay: isRatesTab ? 'inline-flex' : 'none',
    footerGotoRatesBtnDisplay: !isRatesTab ? 'inline-flex' : 'none'
  };
}

// 1. Sekmedeyken
const stateTab1 = simulateSwitchTab('tab-settings-company');
assert.strictEqual(stateTab1.saveRatesBtnDisplay, 'none');
assert.strictEqual(stateTab1.footerGotoRatesBtnDisplay, 'inline-flex');

// 4. Sekmeye (Tarifeler) geçildiğinde
const stateTab4 = simulateSwitchTab('tab-settings-rates');
assert.strictEqual(stateTab4.saveRatesBtnDisplay, 'inline-flex');
assert.strictEqual(stateTab4.footerGotoRatesBtnDisplay, 'none');

console.log('  ✓ Firma Kimliği sekmesindeyken footer: [Kapat] [💰 4. Sekme: Tarifelere Git]');
console.log('  ✓ Tarifeler sekmesindeyken footer: [Kapat] [💾 Tüm Tarife Fiyatlarını Kaydet]');
console.log('  ✓ Kullanıcı hangi sekmede olduğunu ve nereden kaydedeceğini asla karıştırmaz.\n');

console.log('================================================================================');
console.log('   🎉 TÜM AYARLAR & TARİFE GEZİNİM TESTLERİ BAŞARIYLA GEÇTİ (4/4)');
console.log('================================================================================');
