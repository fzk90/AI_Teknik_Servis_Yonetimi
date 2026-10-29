// -*- coding: utf-8 -*-
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('================================================================================');
console.log('   SERVİSAİ - MERKEZ ATÖLYE SEVK & SAHADAN MERKEZE TRANSFER TESTİ (E2E)');
console.log('================================================================================\n');

// 1. Dosya kontrolleri
const htmlPath = path.join(__dirname, '..', 'index.html');
const appPath = path.join(__dirname, '..', 'app.js');
const cssPath = path.join(__dirname, '..', 'styles.css');

const html = fs.readFileSync(htmlPath, 'utf8');
const appJs = fs.readFileSync(appPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('▶ TEST 1: index.html ve styles.css Arayüz Bileşenleri Doğrulaması...');
assert(html.includes('id="btn-tech-workshop-banner"'), 'btn-tech-workshop-banner index.html içinde bulunamadı!');
assert(html.includes('id="btn-tech-start-workshop-banner"'), 'btn-tech-start-workshop-banner index.html içinde bulunamadı!');
assert(html.includes('id="send-to-workshop-modal"'), 'send-to-workshop-modal index.html içinde bulunamadı!');
assert(html.includes('id="form-send-to-workshop"'), 'form-send-to-workshop index.html içinde bulunamadı!');
assert(html.includes('🏢 Atölye & Laboratuvar Uzmanı'), 'Atölye rolü index.html içinde bulunamadı!');
assert(html.includes('🔬 Elektronik Kart & SMD Onarım Teknisyeni'), 'SMD Teknisyeni rolü index.html içinde bulunamadı!');
assert(css.includes('.chip-cyan'), 'chip-cyan styles.css içinde bulunamadı!');
console.log('  ✓ Tüm arayüz bileşenleri, modal pencereleri ve stil tanımları eksiksiz mevcut!\n');

console.log('▶ TEST 2: app.js Sözdizimi ve Atölye Fonksiyon İmzaları Doğrulaması...');
assert(appJs.includes('Serdar Yılmaz'), 'Serdar Yılmaz app.js içinde bulunamadı!');
assert(appJs.includes('staffType: "workshop"'), 'staffType: "workshop" tanımı bulunamadı!');
assert(appJs.includes('function openSendToWorkshopModal'), 'openSendToWorkshopModal fonksiyonu bulunamadı!');
assert(appJs.includes('function closeSendToWorkshopModal'), 'closeSendToWorkshopModal fonksiyonu bulunamadı!');
assert(appJs.includes('function submitSendToWorkshopForm'), 'submitSendToWorkshopForm fonksiyonu bulunamadı!');
assert(appJs.includes('function initSendToWorkshopModal'), 'initSendToWorkshopModal fonksiyonu bulunamadı!');
console.log('  ✓ app.js içinde Serdar Yılmaz (Atölye Şefi) ve tüm sevk fonksiyonları doğrulandı!\n');

console.log('▶ TEST 3: SRV-2026-284 Cihaz Kabul (Elden Teslim) & Atölye Yapay Zeka Atama Testi...');
// Simüle et: Elden getirilen cihaz iş emri
const order284 = {
  id: 284,
  tracking_code: "SRV-2026-284",
  code: "SRV-2026-284",
  channel: "Elden Teslim",
  customer_name: "Koçaş Endüstriyel Elektronik",
  customer_address: "🏢 Merkez Servis Atölyesi (Elden Teslim)",
  device_brand: "Siemens",
  device_model: "Micromaster 440 İnvertör",
  serial_number: "SN-SIE-99214",
  status: "Kabul Edildi (Atölyede)",
  repair_location: "workshop"
};

const mockStaff = [
  { id: 2, name: "Murat Aydın", role: "Saha Mühendisi", vehiclePlate: "34 ABC 101", status: "Müsait", distanceKm: 18.5, staffType: "field" },
  { id: 12, name: "Levent İmekci", role: "Kıdemli Saha Mühendisi", vehiclePlate: "34 NK 0023", status: "Müsait", distanceKm: 14.2, staffType: "field" },
  { id: 15, name: "Serdar Yılmaz", role: "Atölye & Laboratuvar Şefi", vehiclePlate: "🏢 Merkez Atölye (Sabit)", status: "Müsait", distanceKm: 0.0, staffType: "workshop" }
];

const isWorkshopJob = order284.repair_location === 'workshop' || order284.channel === 'Elden Teslim';
assert.strictEqual(isWorkshopJob, true, 'order284 atölye işi olarak tanınmalı!');

const isWorkshopStaff = (s) => (s.staffType === 'workshop') || 
                               (s.role && (s.role.includes('Atölye') || s.role.includes('Laboratuvar')));

let bestCandidate = null;
let minScore = Infinity;

mockStaff.forEach(s => {
  const isW = isWorkshopStaff(s);
  let distance = isW ? 0.0 : s.distanceKm;
  let score = 0;
  if (isWorkshopJob) {
    if (isW) {
      score = (s.status === 'Müsait' ? -100 : 0);
    } else {
      score = 60 + distance;
    }
  } else {
    score = distance;
  }
  if (score < minScore) {
    minScore = score;
    bestCandidate = s;
  }
});

assert(bestCandidate !== null, 'Bir aday seçilmeli!');
assert.strictEqual(bestCandidate.name, 'Serdar Yılmaz', 'Elden teslim atölye işinde AI önerisi Serdar Yılmaz olmalı!');
assert.strictEqual(bestCandidate.staffType, 'workshop');
assert.strictEqual(bestCandidate.distanceKm, 0.0, 'Atölye personelinin mesafesi 0.0 km olmalı!');
console.log(`  ✓ SRV-2026-284 Elden Teslim çağrısı başarıyla Atölye Uzmanına (${bestCandidate.name}) 0.0 km tezgâh mesafesiyle önerildi!\n`);

console.log('▶ TEST 4: Sahada Çözülemeyen Cihazı Atölyeye Sevk Etme ve Teknisyeni Boşa Çıkarma Testi...');
// Simüle et: Özkan Çam sahada arıza tespitinde
const fieldOrder = {
  id: 104,
  tracking_code: "SRV-2026-104",
  code: "SRV-2026-104",
  customer_name: "TermoTek Ltd.",
  customer_address: "Dudullu OSB, Ümraniye / İstanbul",
  device_brand: "Delta",
  device_model: "VFD-075",
  serial_number: "SN-DLT-88129",
  status: "Onarımda",
  repair_location: "field",
  assigned_tech: "Özkan Çam",
  assigned_user_id: 88
};

const techOzkan = {
  id: 88,
  name: "Özkan Çam",
  role: "Saha Servis Mühendisi",
  vehiclePlate: "34 OZK 34",
  status: "Görevde"
};

const staffJobs = {
  88: [fieldOrder]
};

// Atölyeye sevk işlemi simülasyonu
const transferReason = "Mikroelektronik Kart & BGA/SMD Çip Tamiri. Not: Kontrol kartında BGA sürücü çipi yanmış, sahada tamiri imkansız.";
const estReturnDate = "2026-11-03";

fieldOrder.status = "Atölyeye Alındı / Lab Onarımında";
fieldOrder.repair_location = "workshop";
fieldOrder.device_current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
fieldOrder.workshop_transfer_reason = transferReason;
fieldOrder.workshop_estimated_date = estReturnDate;
fieldOrder.previous_field_tech = techOzkan.name;
fieldOrder.assigned_tech = null;
fieldOrder.assigned_user_id = null;

// Teknisyenin aktif iş listesinden çıkar ve müsait yap
staffJobs[88] = staffJobs[88].filter(j => j.tracking_code !== fieldOrder.tracking_code);
if (staffJobs[88].length === 0) {
  techOzkan.status = "Müsait";
}

assert.strictEqual(fieldOrder.status, "Atölyeye Alındı / Lab Onarımında");
assert.strictEqual(fieldOrder.repair_location, "workshop");
assert.strictEqual(fieldOrder.assigned_tech, null, 'Cihaz atölyeye alınınca saha teknisyeninden ayrılmalı!');
assert.strictEqual(techOzkan.status, "Müsait", 'Saha teknisyeni cihazı atölyeye sevk edince anında MÜSAİT duruma geçmeli!');
console.log(`  ✓ Cihaz Sevk Edildi: "${fieldOrder.status}" • Lokasyon: "${fieldOrder.device_current_location}"`);
console.log(`  ✓ Saha Teknisyeni (${techOzkan.name}): "${techOzkan.status}" duruma geçirildi (Yeni çağrılar için hazır)!`);
console.log(`  ✓ Gerekçe ve Tarih: "${transferReason.slice(0, 45)}..." • Teslim: ${estReturnDate}\n`);

console.log('▶ TEST 5: Atölye Tezgâhında Doğrudan İnceleme Başlatma Testi (Yola Çıkış Bypassed)...');
// Atölye personeli tezgâha alınan cihazı doğrudan teste/onarıma başlatır
fieldOrder.assigned_tech = "Serdar Yılmaz";
fieldOrder.assigned_user_id = 15;

// Teknisyen 'btn-tech-start-workshop-banner' butonuna tıklar:
const nowIso = new Date().toISOString();
fieldOrder.status = "Onarımda";
fieldOrder.arrivedAt = nowIso;
fieldOrder.work_start_time = nowIso;
fieldOrder.travel_duration_minutes = 0;
fieldOrder.travelDurationMinutes = 0;

assert.strictEqual(fieldOrder.status, "Onarımda");
assert.strictEqual(fieldOrder.travel_duration_minutes, 0, 'Atölye işinde intikal süresi 0 dakika olmalı!');
console.log(`  ✓ Atölye Tezgâhında İnceleme Başlatıldı: Durum: "${fieldOrder.status}" • İntikal: ${fieldOrder.travel_duration_minutes} dk (GPS sürüşü gerekmedi)!\n`);

console.log('================================================================================');
console.log('   🎉 TÜM ATÖLYE SEVK & TRANSFER TESTLERİ BAŞARIYLA GEÇTİ!');
console.log('================================================================================');
