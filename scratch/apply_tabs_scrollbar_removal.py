# -*- coding: utf-8 -*-
import os
import sys
import re

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

proj_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_path = os.path.join(proj_dir, 'index.html')
css_path = os.path.join(proj_dir, 'styles.css')

print(f"Project directory: {proj_dir}")

# 1. Update index.html
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

normalized_html = html_content.replace('\r\n', '\n')

target_modal_header_and_tabs = '''    <div class="modal-box settings-modal-box" style="max-width: 980px; width: 95%;">
      <div class="modal-header">
        <div class="modal-title-row">
          <span class="chip chip-purple">Sistem & Kurulum Yönetimi</span>
          <h3 class="modal-title">⚙️ Servis Kurulumu, Firma Bilgileri & Sistem Ayarları</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn btn-warning-glow btn-xs" id="btn-quick-to-rates" style="border: 1px solid #f59e0b; font-weight: 700;" title="İşçilik ve onarım tarifeleri yönetimine doğrudan geç">
            <span>💰 Tarifeleri Güncelle</span>
          </button>
          <button type="button" class="btn btn-primary btn-xs" id="btn-start-onboarding-wizard" title="Yeni servis için hızlı kurulum sihirbazını başlat">
            <span>🚀 Hızlı Kurulum Sihirbazı</span>
          </button>
          <button type="button" class="btn btn-outline-danger btn-xs" id="btn-settings-clean-slate" title="Tüm demo çağrılarını temizle ve sıfırdan kendi servisini başlat">
            <span>🗑️ Sıfırdan Başla</span>
          </button>
          <button type="button" class="btn btn-outline-cyan btn-xs" id="btn-settings-load-demo" title="Örnek Koçaş Teknik demo verilerini geri yükle">
            <span>⚡ Demo Yükle</span>
          </button>
          <button type="button" class="btn btn-outline-warning btn-xs" id="btn-clear-knowledge-base" title="Öğrenen AI Bilgi Bankasını temizle ve firmanızın kendi çözümleriyle dolduracağı boş kütüphaneyle başlat">
            <span>🧠 AI Hafızasını Temizle</span>
          </button>
          <button class="modal-close-btn" id="btn-close-settings-modal">&times;</button>
        </div>
      </div>

      <!-- Ayarlar Sekme Gezinti Çubuğu -->
      <div class="settings-nav-tabs">
        <button type="button" class="settings-tab-btn active" data-tab="tab-settings-company" id="btn-set-tab-company">
          <span>🏢 1. Firma & Servis Kimliği</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-staff" id="btn-set-tab-staff">
          <span>👥 2. Saha Elemanları & Kadro</span>
          <span class="badge badge-purple" id="badge-settings-staff-count">4 Uzman</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-devices" id="btn-set-tab-devices">
          <span>🏷️ 3. Hizmet Verilen Cihazlar</span>
          <span class="badge badge-cyan" id="badge-settings-device-count">8 Kategori</span>
        </button>
        <button type="button" class="settings-tab-btn settings-tab-rates-highlight" data-tab="tab-settings-rates" id="btn-set-tab-rates">
          <span style="font-weight: 700; color: #fbbf24;">💰 4. İşçilik & Onarım Tarifeleri</span>
          <span class="badge badge-warning" style="font-size: 0.68rem; margin-left: 4px; padding: 2px 6px;">Fiyat Değiştir</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-integrations" id="btn-set-tab-integrations">
          <span>🧾 5. e-Fatura & Sanal POS</span>
        </button>
      </div>'''

replacement_modal_header_and_tabs = '''    <div class="modal-box settings-modal-box" style="max-width: 1040px; width: 96%;">
      <div class="modal-header" style="padding: 12px 20px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <div class="modal-title-row" style="gap: 2px;">
          <span class="chip chip-purple" style="font-size: 0.7rem; padding: 1px 7px; width: fit-content;">Sistem & Kurulum Yönetimi</span>
          <h3 class="modal-title" style="font-size: 1.12rem; margin: 0;">⚙️ Servis Kurulumu, Firma Bilgileri & Sistem Ayarları</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end;">
          <button type="button" class="btn btn-warning-glow btn-xs" id="btn-quick-to-rates" style="border: 1px solid #f59e0b; font-weight: 700; padding: 6px 12px; font-size: 0.78rem;" title="İşçilik ve onarım tarifeleri yönetimine doğrudan geç">
            <span>💰 Tarifeleri Güncelle</span>
          </button>
          <button type="button" class="btn btn-primary btn-xs" id="btn-start-onboarding-wizard" style="padding: 6px 10px; font-size: 0.76rem;" title="Yeni servis için hızlı kurulum sihirbazını başlat">
            <span>🚀 Kurulum Sihirbazı</span>
          </button>
          <button type="button" class="btn btn-outline-danger btn-xs" id="btn-settings-clean-slate" style="padding: 6px 8px; font-size: 0.74rem;" title="Tüm demo çağrılarını temizle ve sıfırdan kendi servisini başlat">
            <span>🗑️ Sıfırla</span>
          </button>
          <button type="button" class="btn btn-outline-cyan btn-xs" id="btn-settings-load-demo" style="padding: 6px 8px; font-size: 0.74rem;" title="Örnek Koçaş Teknik demo verilerini geri yükle">
            <span>⚡ Demo</span>
          </button>
          <button type="button" class="btn btn-outline-warning btn-xs" id="btn-clear-knowledge-base" style="padding: 6px 8px; font-size: 0.74rem;" title="Öğrenen AI Bilgi Bankasını temizle">
            <span>🧠 AI Hafıza</span>
          </button>
          <button class="modal-close-btn" id="btn-close-settings-modal" style="padding: 0 4px; line-height: 1; margin-left: 4px;">&times;</button>
        </div>
      </div>

      <!-- Ayarlar Sekme Gezinti Çubuğu (5 Eşit Kolon, Sıfır Kaydırma, Kristal Netliğinde) -->
      <div class="settings-nav-tabs">
        <button type="button" class="settings-tab-btn active" data-tab="tab-settings-company" id="btn-set-tab-company">
          <span class="tab-icon">🏢</span>
          <span class="tab-text">1. Firma & Kimlik</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-staff" id="btn-set-tab-staff">
          <span class="tab-icon">👥</span>
          <span class="tab-text">2. Saha Kadrosu</span>
          <span class="badge badge-purple" id="badge-settings-staff-count" style="font-size: 0.68rem; padding: 1px 5px;">4 Uzman</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-devices" id="btn-set-tab-devices">
          <span class="tab-icon">🏷️</span>
          <span class="tab-text">3. Cihaz Kapsamı</span>
          <span class="badge badge-cyan" id="badge-settings-device-count" style="font-size: 0.68rem; padding: 1px 5px;">8 Kategori</span>
        </button>
        <button type="button" class="settings-tab-btn settings-tab-rates-highlight" data-tab="tab-settings-rates" id="btn-set-tab-rates">
          <span class="tab-icon">💰</span>
          <span class="tab-text" style="font-weight: 700; color: #fbbf24;">4. Onarım Tarifeleri</span>
          <span class="badge badge-warning" style="font-size: 0.68rem; padding: 1px 6px;">₺ Fiyatlar</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-integrations" id="btn-set-tab-integrations">
          <span class="tab-icon">🧾</span>
          <span class="tab-text">5. e-Fatura & POS</span>
        </button>
      </div>'''

if target_modal_header_and_tabs.replace('\r\n', '\n') in normalized_html:
    normalized_html = normalized_html.replace(target_modal_header_and_tabs.replace('\r\n', '\n'), replacement_modal_header_and_tabs.replace('\r\n', '\n'))
    print("[OK] Successfully updated modal header and nav tabs in index.html")
else:
    print("[SKIP] target_modal_header_and_tabs not found in index.html")

# Bump cache buster
normalized_html = re.sub(r'app\.js\?v=\d+_\d+', 'app.js?v=20261029_1605', normalized_html)
print("[OK] Updated cache buster to app.js?v=20261029_1605")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(normalized_html)


# 2. Update styles.css
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

normalized_css = css_content.replace('\r\n', '\n')

target_css_tabs_block = '''.settings-nav-tabs {
  display: flex;
  gap: 8px;
  padding: 12px 18px 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  overflow-x: auto;
  white-space: nowrap;
}

.settings-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: none;
  color: var(--text-muted);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px 8px 0 0;
}

.settings-tab-btn:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.settings-tab-btn.active {
  color: #38bdf8;
  background: rgba(15, 23, 42, 1);
  border-color: rgba(56, 189, 248, 0.5);
  border-top: 2px solid #38bdf8;
  font-weight: 700;
  box-shadow: 0 -2px 10px rgba(56, 189, 248, 0.15);
}

.settings-tab-rates-highlight {
  border-color: rgba(251, 191, 36, 0.4) !important;
  background: rgba(251, 191, 36, 0.07) !important;
}

.settings-tab-rates-highlight.active {
  border-color: rgba(251, 191, 36, 0.8) !important;
  border-top: 2px solid #fbbf24 !important;
  background: rgba(15, 23, 42, 1) !important;
  color: #fbbf24 !important;
  box-shadow: 0 -2px 12px rgba(251, 191, 36, 0.2) !important;
}'''

replacement_css_tabs_block = '''.settings-nav-tabs {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 8px !important;
  padding: 10px 18px !important;
  border-bottom: 2px solid rgba(255, 255, 255, 0.08) !important;
  background: rgba(15, 23, 42, 0.98) !important;
  overflow: hidden !important; /* Kaydırma çubuğunu ve sağdaki aşağı/yukarı hareket oklarını tamamen kaldırır */
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* IE/Edge */
  box-sizing: border-box !important;
}

.settings-nav-tabs::-webkit-scrollbar {
  display: none !important; /* Chrome / Safari / Edge */
  width: 0 !important;
  height: 0 !important;
}

.settings-tab-btn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  padding: 10px 8px !important;
  background: rgba(30, 41, 59, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #cbd5e1 !important;
  font-size: 0.83rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  border-radius: 8px !important;
  white-space: nowrap !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
}

.settings-tab-btn .tab-icon {
  font-size: 0.95rem;
  flex-shrink: 0;
}

.settings-tab-btn .tab-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.settings-tab-btn:hover {
  color: #ffffff !important;
  background: rgba(51, 65, 85, 0.9) !important;
  border-color: rgba(255, 255, 255, 0.28) !important;
  transform: translateY(-1px);
}

.settings-tab-btn.active {
  color: #38bdf8 !important;
  background: rgba(15, 23, 42, 1) !important;
  border-color: #38bdf8 !important;
  font-weight: 700 !important;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.25), inset 0 0 6px rgba(56, 189, 248, 0.1) !important;
}

.settings-tab-rates-highlight {
  border-color: rgba(251, 191, 36, 0.55) !important;
  background: rgba(251, 191, 36, 0.12) !important;
  color: #fbbf24 !important;
}

.settings-tab-rates-highlight:hover {
  border-color: rgba(251, 191, 36, 0.85) !important;
  background: rgba(251, 191, 36, 0.2) !important;
  color: #fef08a !important;
}

.settings-tab-rates-highlight.active {
  border-color: #f59e0b !important;
  background: rgba(245, 158, 11, 0.22) !important;
  color: #fef08a !important;
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.35), inset 0 0 8px rgba(245, 158, 11, 0.15) !important;
}'''

if target_css_tabs_block.replace('\r\n', '\n') in normalized_css:
    normalized_css = normalized_css.replace(target_css_tabs_block.replace('\r\n', '\n'), replacement_css_tabs_block.replace('\r\n', '\n'))
    print("[OK] Successfully updated tabs CSS in styles.css")
else:
    print("[SKIP] target_css_tabs_block not found in styles.css")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(normalized_css)

print("[DONE] apply_tabs_scrollbar_removal.py execution completed.")

