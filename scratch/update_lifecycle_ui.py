# -*- coding: utf-8 -*-
import sys

with open('Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Eski tech-gps-lifecycle-banner blogunu bul
old_banner_start = '<div class="tech-gps-trigger-banner mb-3" id="tech-gps-lifecycle-banner">'
old_banner_end = '<!-- AI Arıza Teşhis & Saha Müdahale Defteri -->'

idx1 = html.find(old_banner_start)
idx2 = html.find(old_banner_end)

if idx1 == -1 or idx2 == -1:
    print(f"Error finding banner boundaries: idx1={idx1}, idx2={idx2}")
    sys.exit(1)

# Ayrica card-header icine btn-tech-show-billing-card'i guzelce koyalim
old_header_target = '<span class="chip chip-info" id="active-job-code">#SRV-2026-104</span>'
new_header_target = '''<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="chip chip-info" id="active-job-code">#SRV-2026-104</span>
                <button type="button" class="btn btn-xs btn-outline-cyan" id="btn-tech-show-billing-card" style="font-size: 0.74rem; padding: 3px 8px; border-color: #818cf8; color: #c7d2fe; display: inline-flex; align-items: center; gap: 5px;" title="Dışarıda parça veya masraf yaparken satıcıya göstermek veya iletmek için şirket fatura bilgilerini aç">
                  <span>🏢 Şirket Fatura Bilgilerimiz (Dış Alım İbrazı)</span>
                </button>
              </div>'''

if old_header_target in html and 'id="btn-tech-show-billing-card"' not in html[:idx1]:
    html = html.replace(old_header_target, new_header_target, 1)
    print("Added billing card button into workbench header!")
    # Recalculate indexes
    idx1 = html.find(old_banner_start)
    idx2 = html.find(old_banner_end)

# Yeni gelismis 4 asamali Saha Yasam Dongusu Banner'i
new_banner = '''<!-- Yola Çıkış, Müşteriye Ulaşım ve Canlı Süre / GPS Takip Barı (4 Aşamalı Saha Süreç Tüneli) -->
          <div class="tech-gps-trigger-banner mb-3" id="tech-gps-lifecycle-banner" style="flex-direction: column; align-items: stretch; gap: 12px; padding: 12px 18px; background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%); border: 1px solid rgba(6, 182, 212, 0.35); border-radius: 12px;">
            
            <!-- 1. Satır: 4 Aşamalı İnteraktif Saha Süreç Tüneli -->
            <div class="tech-lifecycle-stepper" style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px;">
              <div class="lifecycle-step-node" id="step-node-accepted" style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 700; color: #cbd5e1; padding: 4px 10px; border-radius: 6px; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4);">
                <span style="font-size: 0.95rem;">📋</span> <span>1. Çağrı Kabul</span>
              </div>
              <span style="color: #64748b; font-size: 0.8rem;">➔</span>
              <div class="lifecycle-step-node" id="step-node-ontheway" style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 700; color: #94a3b8; padding: 4px 10px; border-radius: 6px;">
                <span style="font-size: 0.95rem;">🚗</span> <span>2. Yola Çıkış (GPS)</span>
              </div>
              <span style="color: #64748b; font-size: 0.8rem;">➔</span>
              <div class="lifecycle-step-node" id="step-node-repair" style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 700; color: #94a3b8; padding: 4px 10px; border-radius: 6px;">
                <span style="font-size: 0.95rem;">🔬</span> <span>3. Cihazda Onarım</span>
              </div>
              <span style="color: #64748b; font-size: 0.8rem;">➔</span>
              <div class="lifecycle-step-node" id="step-node-completed" style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 700; color: #94a3b8; padding: 4px 10px; border-radius: 6px;">
                <span style="font-size: 0.95rem;">✅</span> <span>4. Tamamlandı</span>
              </div>
            </div>

            <!-- 2. Satır: Canlı Zamanlama Bilgisi & Operasyonel Aksiyon Butonları -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div class="trigger-left" style="margin: 0; display: flex; align-items: center; gap: 10px;">
                <span class="pulse-dot" id="tech-journey-pulse" style="width: 10px; height: 10px; background: #8B5CF6;"></span>
                <div class="journey-meta-info">
                  <span style="font-size: 0.84rem; color: #f8fafc;"><strong>Müşteri Adresine İntikal:</strong> <span id="tech-intikal-address" style="color: #38bdf8;">Kadıköy Rıhtım Cd. No:14</span></span>
                  <div class="tech-journey-timing-row mt-1" id="tech-journey-timing-row" style="font-size: 0.78rem; color: #94a3b8;">
                    <span id="tech-time-departed-text">⏳ İntikal Bekliyor (Henüz yola çıkılmadı)</span>
                    <span id="tech-time-duration-text" style="margin-left: 8px; font-weight: 600; color: #38bdf8;"></span>
                  </div>
                </div>
              </div>

              <!-- Saha Yaşam Döngüsü Aksiyon Butonları -->
              <div class="journey-actions-group" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <!-- 1. Adım Butonu: Yola Çıkış -->
                <button class="btn btn-primary btn-sm" id="btn-tech-on-the-way" style="box-shadow: 0 0 14px rgba(99, 102, 241, 0.4); font-weight: 700;">
                  🚀 1. Yola Çıktım (GPS Başlat)
                </button>
                <!-- 2. Adım Butonu: Adrese Varış -->
                <button class="btn btn-success btn-sm" id="btn-tech-arrived" style="display: none; background: #10B981; border-color: #10B981; box-shadow: 0 0 14px rgba(16, 185, 129, 0.4); font-weight: 700;">
                  📍 2. Müşteriye Ulaştım (İşe Başla)
                </button>
                <!-- 3. Adım Rozeti: Cihaz Başında Onarımda -->
                <div id="tech-job-duration-badge" class="badge badge-purple" style="display: none; font-size: 0.8rem; padding: 6px 12px;">
                  ⏱️ Onarım Sürüyor
                </div>
                <!-- 4. Adım Butonu: Onarımı Tamamla (Doğrudan Tezgâhın Üstünden) -->
                <button class="btn btn-success btn-sm" id="btn-tech-complete-banner" style="display: none; background: #059669; border-color: #059669; font-weight: 700; box-shadow: 0 0 14px rgba(5, 150, 105, 0.4);">
                  ✅ 4. Onarımı Tamamla & İşi Bitir
                </button>
                <!-- Tamamlandı Durumunda Raporu Açma Butonu -->
                <button class="btn btn-outline-cyan btn-sm" id="btn-tech-view-report-banner" style="display: none; font-size: 0.78rem;">
                  📄 Servis Raporunu Gör
                </button>
                <!-- Aşama Sıfırlama / Başa Sar (Test & Deneme İçin) -->
                <button class="btn btn-xs btn-outline" id="btn-tech-reset-lifecycle" title="Saha adımlarını başa sar (Kabul Edildi aşamasına döndür)" style="opacity: 0.75; font-size: 0.72rem; padding: 4px 8px;">
                  🔄 Başa Sar
                </button>
              </div>
            </div>
          </div>

          '''

html = html[:idx1] + new_banner + html[idx2:]

with open('Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html with new 4-stage lifecycle banner!")

