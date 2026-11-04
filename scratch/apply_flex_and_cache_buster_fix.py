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

# 1.1 Cache buster for styles.css
target_css_link = '<link rel="stylesheet" href="styles.css">'
replacement_css_link = '<link rel="stylesheet" href="styles.css?v=20261029_1615">'

if target_css_link in normalized_html:
    normalized_html = normalized_html.replace(target_css_link, replacement_css_link)
    print("[OK] Added cache buster to styles.css in index.html")
elif 'styles.css?v=' in normalized_html:
    normalized_html = re.sub(r'href="styles\.css\?v=[^"]*"', 'href="styles.css?v=20261029_1615"', normalized_html)
    print("[OK] Updated existing cache buster on styles.css in index.html")
else:
    print("[SKIP] styles.css link not found in index.html")

# 1.2 Settings modal box structure and tabs with inline flex protection
target_modal_chunk = '''    <div class="modal-box settings-modal-box" style="max-width: 1040px; width: 96%;">
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
      </div>

      <div class="modal-body" style="gap: 16px; padding: 18px; max-height: calc(85vh - 140px); overflow-y: auto;">'''

replacement_modal_chunk = '''    <div class="modal-box settings-modal-box" style="max-width: 1060px; width: 96%; height: 88vh; max-height: 88vh; display: flex; flex-direction: column; overflow: hidden;">
      <div class="modal-header" style="flex-shrink: 0; padding: 12px 20px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08);">
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

      <!-- Ayarlar Sekme Gezinti Çubuğu (5 Eşit Kolon, Sıfır Kaydırma, Sabit Yükseklik) -->
      <div class="settings-nav-tabs" style="flex-shrink: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; padding: 10px 18px; height: 56px; min-height: 56px; box-sizing: border-box; overflow: hidden; background: rgba(15, 23, 42, 0.98); border-bottom: 2px solid rgba(255, 255, 255, 0.08);">
        <button type="button" class="settings-tab-btn active" data-tab="tab-settings-company" id="btn-set-tab-company" style="height: 36px; min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 8px; box-sizing: border-box;">
          <span class="tab-icon">🏢</span>
          <span class="tab-text">1. Firma & Kimlik</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-staff" id="btn-set-tab-staff" style="height: 36px; min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 8px; box-sizing: border-box;">
          <span class="tab-icon">👥</span>
          <span class="tab-text">2. Saha Kadrosu</span>
          <span class="badge badge-purple" id="badge-settings-staff-count" style="font-size: 0.68rem; padding: 1px 5px;">4 Uzman</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-devices" id="btn-set-tab-devices" style="height: 36px; min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 8px; box-sizing: border-box;">
          <span class="tab-icon">🏷️</span>
          <span class="tab-text">3. Cihaz Kapsamı</span>
          <span class="badge badge-cyan" id="badge-settings-device-count" style="font-size: 0.68rem; padding: 1px 5px;">8 Kategori</span>
        </button>
        <button type="button" class="settings-tab-btn settings-tab-rates-highlight" data-tab="tab-settings-rates" id="btn-set-tab-rates" style="height: 36px; min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 8px; box-sizing: border-box;">
          <span class="tab-icon">💰</span>
          <span class="tab-text" style="font-weight: 700; color: #fbbf24;">4. Onarım Tarifeleri</span>
          <span class="badge badge-warning" style="font-size: 0.68rem; padding: 1px 6px;">₺ Fiyatlar</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-integrations" id="btn-set-tab-integrations" style="height: 36px; min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 8px; box-sizing: border-box;">
          <span class="tab-icon">🧾</span>
          <span class="tab-text">5. e-Fatura & POS</span>
        </button>
      </div>

      <div class="modal-body" style="flex: 1 1 auto; min-height: 0; gap: 16px; padding: 18px; overflow-y: auto; overflow-x: hidden;">'''

if target_modal_chunk.replace('\r\n', '\n') in normalized_html:
    normalized_html = normalized_html.replace(target_modal_chunk.replace('\r\n', '\n'), replacement_modal_chunk.replace('\r\n', '\n'))
    print("[OK] Successfully updated modal chunk with flex-shrink and fixed height in index.html")
else:
    print("[SKIP] target_modal_chunk not found in index.html")

# 1.3 Footer flex-shrink
target_footer = '<div class="modal-footer" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">'
replacement_footer = '<div class="modal-footer" style="flex-shrink: 0; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">'

if target_footer in normalized_html:
    normalized_html = normalized_html.replace(target_footer, replacement_footer)
    print("[OK] Added flex-shrink to modal footer in index.html")

# Bump app.js cache buster
normalized_html = re.sub(r'app\.js\?v=\d+_\d+', 'app.js?v=20261029_1615', normalized_html)
print("[OK] Bumped app.js cache buster to app.js?v=20261029_1615")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(normalized_html)


# 2. Update styles.css
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

normalized_css = css_content.replace('\r\n', '\n')

target_css_tabs_block = '''.settings-nav-tabs {
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
}'''

replacement_css_tabs_block = '''.settings-modal-box {
  max-width: 1060px !important;
  width: 96% !important;
  height: 88vh !important;
  max-height: 88vh !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

.settings-nav-tabs {
  flex-shrink: 0 !important;
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 8px !important;
  padding: 10px 18px !important;
  height: 56px !important;
  min-height: 56px !important;
  max-height: 56px !important;
  box-sizing: border-box !important;
  border-bottom: 2px solid rgba(255, 255, 255, 0.08) !important;
  background: rgba(15, 23, 42, 0.98) !important;
  overflow: hidden !important; /* Kaydırma çubuğunu ve sağdaki okları tamamen kaldırır */
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* IE/Edge */
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
  height: 36px !important;
  min-height: 36px !important;
  max-height: 36px !important;
  padding: 0 8px !important;
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
  line-height: 1 !important;
}'''

if target_css_tabs_block.replace('\r\n', '\n') in normalized_css:
    normalized_css = normalized_css.replace(target_css_tabs_block.replace('\r\n', '\n'), replacement_css_tabs_block.replace('\r\n', '\n'))
    print("[OK] Successfully updated settings-modal-box and nav tabs CSS in styles.css")
else:
    print("[SKIP] target_css_tabs_block not found in styles.css")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(normalized_css)

print("[DONE] apply_flex_and_cache_buster_fix.py execution completed.")

