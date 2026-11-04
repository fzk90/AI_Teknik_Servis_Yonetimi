# -*- coding: utf-8 -*-
import os

path_html = r'index.html'
with open(path_html, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update lifecycle buttons
old_btn = '''                <!-- 3-B. Adım Butonu: Parça Beklemeye Al -->
                <button class="btn btn-warning btn-sm" id="btn-tech-hold-banner" style="display: none; background: #d97706; border-color: #d97706; font-weight: 700; color: #fff; box-shadow: 0 0 14px rgba(217, 119, 6, 0.4);" title="Parça temini için cihazı beklemeye al">
                  <span>⏸️ Parça Beklemeye Al</span>
                </button>'''

new_btn = '''                <!-- 3-B. Adım Butonu: Parça Beklemeye Al -->
                <button class="btn btn-warning btn-sm" id="btn-tech-hold-banner" style="display: none; background: #d97706; border-color: #d97706; font-weight: 700; color: #fff; box-shadow: 0 0 14px rgba(217, 119, 6, 0.4);" title="Parça temini için cihazı beklemeye al">
                  <span>⏸️ Parça Beklemeye Al</span>
                </button>
                <!-- 3-D. Adım Butonu: Cihazı Atölyeye Al (Merkeze Sevk) -->
                <button class="btn btn-outline-cyan btn-sm" id="btn-tech-workshop-banner" style="display: none; font-weight: 700; border-color: #06b6d4; color: #06b6d4;" title="Sahada çözülemeyen cihazı merkez servis atölyesine sevk et">
                  <span>🏢 Cihazı Atölyeye Al (Merkeze Sevk)</span>
                </button>
                <!-- Atölyede Onarıma Başla Butonu (Elden Teslim / Atölye Cihazları İçin Yola Çıkış Gerekmez) -->
                <button class="btn btn-primary btn-sm" id="btn-tech-start-workshop-banner" style="display: none; background: #0891b2; border-color: #0891b2; font-weight: 700; box-shadow: 0 0 14px rgba(8, 145, 178, 0.4);" title="Atölyedeki cihazın tezgâhta test ve onarımına doğrudan başla">
                  <span>🔬 Tezgâhta İncelemeye Başla</span>
                </button>'''

if old_btn in content:
    content = content.replace(old_btn, new_btn, 1)
    print('1. Lifecycle buttons updated.')
else:
    print('1. Lifecycle buttons target not matched!')

# 2. Update staff roles in Settings Tab 2
old_roles = '''                    <option value="Soğutma & HVAC Uzmanı">Soğutma & HVAC Uzmanı</option>
                    <option value="Genel Teknisyen">Genel Teknisyen</option>
                  </select>'''

new_roles = '''                    <option value="Soğutma & HVAC Uzmanı">Soğutma & HVAC Uzmanı</option>
                    <option value="Genel Teknisyen">Genel Teknisyen</option>
                    <option value="🏢 Atölye & Laboratuvar Uzmanı">🏢 Atölye & Laboratuvar Uzmanı</option>
                    <option value="🔬 Elektronik Kart & SMD Onarım Teknisyeni">🔬 Elektronik Kart & SMD Onarım Teknisyeni (Atölye)</option>
                  </select>'''

if old_roles in content:
    content = content.replace(old_roles, new_roles, 1)
    print('2. Staff roles updated.')
else:
    print('2. Staff roles target not matched!')

# 3. Add send-to-workshop-modal before </body>
workshop_modal = '''
  <!-- ==================== 16-C. Sahada Yapılamayan Cihazı Atölyeye Sevk Modalı ==================== -->
  <div class="modal-backdrop" id="send-to-workshop-modal" style="display: none;">
    <div class="modal-box" style="max-width: 660px;">
      <div class="modal-header">
        <div class="modal-title-row">
          <span class="chip chip-info" style="background: rgba(6,182,212,0.15); color: #06b6d4; border: 1px solid rgba(6,182,212,0.3);">Merkez Laboratuvar Transferi</span>
          <h3 class="modal-title">🏢 Cihazı Atölyeye Al (Merkeze Sevk Et)</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-send-to-workshop-modal">&times;</button>
      </div>

      <div class="modal-body" style="padding: 16px 20px;">
        <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 0.82rem; color: #a5f3fc;">
          <div style="font-weight: 700; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span>ℹ️ Operasyonel Bilgilendirme:</span>
          </div>
          Cihaz sahada giderilemeyen ileri düzey arıza (mikroelektronik, kart çatlağı, SMD/BGA çip arızası, fırın veya osiloskop testi vb.) sebebiyle <strong>Merkez Servis Atölyesi / Laboratuvarına</strong> sevk edilecektir. Bu işlem sonrası saha teknisyeniniz diğer servis çağrıları için anında <strong>"Müsait"</strong> duruma geçecek, iş emri ise Atölye Tezgâhına atanmak üzere Sevk Masası'nda listelenecektir.
        </div>

        <form id="form-send-to-workshop">
          <!-- İş Emri Bilgi Özeti -->
          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; border: 1px solid var(--border-color); font-size: 0.85rem;">
            <div>
              <span class="text-muted">İş Emri:</span> <strong id="workshop-modal-order-code" style="color: var(--accent-cyan);">#SRV-2026-104</strong><br>
              <span class="text-muted">Müşteri:</span> <strong id="workshop-modal-customer">TermoTek Ltd.</strong>
            </div>
            <div style="text-align: right;">
              <span class="text-muted">Cihaz:</span> <strong id="workshop-modal-device">Delta Electronics VFD</strong><br>
              <span class="text-muted">Sahadaki Teknisyen:</span> <strong id="workshop-modal-tech" style="color: var(--accent-green);">Özkan Çam</strong>
            </div>
          </div>

          <!-- Sevk Gerekçesi (Kategori & Seçim) -->
          <div class="form-group mb-3">
            <label class="form-label" for="workshop-transfer-reason-cat" style="font-weight: 600; font-size: 0.85rem;">
              🔬 Atölyeye Sevk Gerekçesi / Laboratuvar İhtiyacı <span style="color: #ef4444;">*</span>
            </label>
            <select id="workshop-transfer-reason-cat" class="form-select" required>
              <option value="Mikroelektronik Kart & BGA/SMD Çip Tamiri (Mikroskop & BGA İstasyonu)" selected>🔬 Mikroelektronik Kart & BGA/SMD Çip Tamiri (Mikroskop & BGA İstasyonu)</option>
              <option value="Ağır Güç Testi & Osiloskop / Yük Bankası Analizi">⚡ Ağır Güç Testi & Osiloskop / Yük Bankası Analizi</option>
              <option value="Ultrasonik Kimyasal Temizleme & Kurutma Fırını">🧼 Ultrasonik Kimyasal Temizleme & Kurutma Fırını</option>
              <option value="Mekanik Pres, Torna & Rulman Çektirme İşlemi">⚙️ Mekanik Pres, Torna & Rulman Çektirme İşlemi</option>
              <option value="Müşteri Sahasında Güvenlik / Test Koşullarının Yetersizliği">🛡️ Müşteri Sahasında Güvenlik / Test Koşullarının Yetersizliği</option>
              <option value="Diğer Özel Laboratuvar Onarım İhtiyacı">✍️ Diğer Özel Laboratuvar Onarım İhtiyacı</option>
            </select>
          </div>

          <!-- Saha Teknisyeni Notu -->
          <div class="form-group mb-3">
            <label class="form-label" for="workshop-transfer-notes" style="font-weight: 600; font-size: 0.85rem;">
              📝 Saha İnceleme Bulguları & Atölye Teknisyenine Not <span style="color: #ef4444;">*</span>
            </label>
            <textarea id="workshop-transfer-notes" rows="3" class="form-control" placeholder="Örn: Yerinde yapılan incelemede kontrol kartındaki IGBT sürücü hattında patlama ve yollarda yanık tespit edildi. Kartın mikroskop altında incelenmesi ve SMD transistörlerin yenilenmesi gerekiyor." required></textarea>
          </div>

          <!-- Tahmini Geri Teslim Tarihi -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div class="form-group">
              <label class="form-label" for="workshop-estimated-date" style="font-weight: 600; font-size: 0.82rem;">
                📅 Tahmini Atölye Teslim Tarihi <span style="color: #ef4444;">*</span>
              </label>
              <input type="date" id="workshop-estimated-date" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="workshop-target-location" style="font-size: 0.82rem;">
                🏢 Cihazın Gideceği Birim
              </label>
              <input type="text" id="workshop-target-location" class="form-control" value="🏢 Merkez Servis Atölyesi / Laboratuvar" readonly style="background: rgba(255,255,255,0.05); color: #cbd5e1;">
            </div>
          </div>

          <!-- Müşteri Teslim Tutanağı Onayı -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 10px 12px; margin-bottom: 16px;">
            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; cursor: pointer; color: var(--text-main);">
              <input type="checkbox" id="workshop-handover-slip-confirmed" checked required style="margin-top: 3px;">
              <span><strong>Müşteri Cihaz Teslim Tutanağı Alındı:</strong> Müşteri yetkilisine cihazın merkez atölyemize alındığına dair servis teslim formu/makbuzu ibraz edilmiş ve sözlü/yazılı mutabakat sağlanmıştır.</span>
            </label>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-send-to-workshop">Vazgeç</button>
            <button type="submit" class="btn btn-primary" id="btn-confirm-send-to-workshop" style="font-weight: 700; background: #0891b2; border-color: #0891b2; color: #fff;">
              <span>🏢 Cihazı Atölyeye Al & Sahadan Çık</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
'''

if '</body>' in content:
    content = content.replace('</body>', workshop_modal + '\n</body>', 1)
    print('3. Workshop modal added.')
else:
    print('3. </body> not matched!')

# 4. Bump cache buster
content = content.replace('app.js?v=20261029_1305', 'app.js?v=20261029_1400', 1)
print('4. Cache buster bumped.')

with open(path_html, 'w', encoding='utf-8') as f:
    f.write(content)

# 5. Add .chip-cyan to styles.css
path_css = r'styles.css'
with open(path_css, 'r', encoding='utf-8') as f:
    css_content = f.read()

if '.chip-cyan' not in css_content:
    css_content = css_content.replace(
        '.chip-info { background: rgba(6, 182, 212, 0.12); color: var(--accent-cyan); border: 1px solid rgba(6, 182, 212, 0.25); }',
        '.chip-info { background: rgba(6, 182, 212, 0.12); color: var(--accent-cyan); border: 1px solid rgba(6, 182, 212, 0.25); }\n.chip-cyan { background: rgba(6, 182, 212, 0.15); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.35); }'
    )
    with open(path_css, 'w', encoding='utf-8') as f:
        f.write(css_content)
    print('5. styles.css updated with .chip-cyan.')
else:
    print('5. .chip-cyan already present.')

