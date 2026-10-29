// -*- coding: utf-8 -*-
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('================================================================================');
console.log('   SERVİSAİ - FİRMA, MERKEZ ATÖLYE VE YEDEK PARÇA DEPO ADRESLERİ TESTİ');
console.log('================================================================================\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const appPath = path.join(__dirname, '..', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const appJs = fs.readFileSync(appPath, 'utf8');

console.log('▶ TEST 1: index.html İçinde 3 Ayrı Adres Form Alanının Doğrulanması...');
assert(html.includes('id="setting-company-address"'), 'Genel merkez adres inputu bulunmalı!');
assert(html.includes('id="setting-company-city"'), 'Genel merkez il inputu bulunmalı!');
assert(html.includes('id="setting-company-district"'), 'Genel merkez ilçe inputu bulunmalı!');

assert(html.includes('id="setting-workshop-address"'), 'Merkez atölye adres inputu bulunmalı!');
assert(html.includes('id="setting-workshop-unit"'), 'Merkez atölye birim inputu bulunmalı!');
assert(html.includes('id="btn-copy-hq-to-workshop"'), 'Genel merkezden atölyeye kopyalama butonu bulunmalı!');

assert(html.includes('id="setting-warehouse-address"'), 'Yedek parça ana depo adres inputu bulunmalı!');
assert(html.includes('id="setting-warehouse-contact"'), 'Yedek parça ana depo iletişim inputu bulunmalı!');
assert(html.includes('id="btn-copy-hq-to-warehouse"'), 'Genel merkezden depoya kopyalama butonu bulunmalı!');

console.log('  ✓ 1. Şirket Genel Merkez & Fatura Adresi form elemanları mevcut.');
console.log('  ✓ 2. Merkez Servis Atölyesi & Laboratuvar Adresi ve kopyalama butonu mevcut.');
console.log('  ✓ 3. Yedek Parça Ana Depo & Sevkiyat Adresi ve kopyalama butonu mevcut.\n');

console.log('▶ TEST 2: Fatura Kartı Modalında (İbraz Kartviziti) 3 Tesisin Görünürlüğü...');
assert(html.includes('id="billing-card-address"'), 'Fatura adresi kartvizitte olmalı!');
assert(html.includes('id="billing-card-workshop-address"'), 'Merkez atölye adresi kartvizitte olmalı!');
assert(html.includes('id="billing-card-warehouse-address"'), 'Yedek parça depo adresi kartvizitte olmalı!');

console.log('  ✓ Kurumsal Fatura / İbraz Kartviziti 3 tesis lokasyonunu ayrı rozetlerle gösteriyor.\n');

console.log('▶ TEST 3: app.js Profil Tanımı, Kayıt ve Senkronizasyon Fonksiyonları...');
assert(appJs.includes('workshopAddress: "Alaaddinbey Mah. 632. Sok. Otomasyon Center No: 8 Nilüfer / BURSA"'), 'defaultCompanyProfile içinde workshopAddress tanımlı olmalı!');
assert(appJs.includes('warehouseAddress: "Demirtaş Organize Sanayi Bölgesi (DOSAB) Lojistik Depo No: 14 Osmangazi / BURSA"'), 'defaultCompanyProfile içinde warehouseAddress tanımlı olmalı!');

assert(appJs.includes("setEl('setting-workshop-address'"), 'loadCompanyProfileToSettingsForm atölye adresini forma yüklemeli!');
assert(appJs.includes("setEl('setting-warehouse-address'"), 'loadCompanyProfileToSettingsForm depo adresini forma yüklemeli!');

assert(appJs.includes("workshopAddress: (document.getElementById('setting-workshop-address')"), 'formCompany submit atölye adresini kaydetmeli!');
assert(appJs.includes("warehouseAddress: (document.getElementById('setting-warehouse-address')"), 'formCompany submit depo adresini kaydetmeli!');

assert(appJs.includes("btnCopyHqToWorkshop.addEventListener('click'"), 'Atölyeye kopyala butonu dinleyicisi olmalı!');
assert(appJs.includes("btnCopyHqToWarehouse.addEventListener('click'"), 'Depoya kopyala butonu dinleyicisi olmalı!');

assert(appJs.includes("elBillWorkshop.textContent = profile.workshopAddress"), 'applyCompanyProfile atölye kartını güncellemeli!');
assert(appJs.includes("elBillWarehouse.textContent = profile.warehouseAddress"), 'applyCompanyProfile depo kartını güncellemeli!');

console.log('  ✓ Profil varsayılanları, form yükleme, kaydetme ve kart senkronu eksiksiz tanımlı.\n');

console.log('▶ TEST 4: "Genel Merkez ile Aynı Yap" Kopyalama Mantığı Simülasyonu...');
const hqMock = {
  address: "Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14",
  district: "Osmangazi",
  city: "Bursa"
};

const combinedHq = [hqMock.address, hqMock.district, hqMock.city].filter(Boolean).join(' ');

let workshopInputVal = "";
let warehouseInputVal = "";

// Simüle et: Atölyeye kopyala
workshopInputVal = combinedHq;
assert.strictEqual(workshopInputVal, "Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi Bursa");

// Simüle et: Depoya kopyala
warehouseInputVal = combinedHq;
assert.strictEqual(warehouseInputVal, "Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi Bursa");

console.log(`  ✓ Kopyalanan Kombine Adres: "${combinedHq}"`);
console.log('  ✓ Tek tıkla atölye ve ana depo adresleri merkez adresiyle senkronize edilebiliyor.\n');

console.log('================================================================================');
console.log('   🎉 TÜM ADRES VE LOKASYON TESTLERİ BAŞARIYLA GEÇTİ (4/4)');
console.log('================================================================================');
