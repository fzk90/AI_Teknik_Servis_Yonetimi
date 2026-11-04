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
app_path = os.path.join(proj_dir, 'app.js')
css_path = os.path.join(proj_dir, 'styles.css')

print(f"Project directory: {proj_dir}")

# 1. Update index.html
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

normalized_html = html_content.replace('\r\n', '\n')

# 1.1 Modal Header buttons: Add "Tarifeleri Güncelle"
target_header_btns = '''        <div style="display: flex; align-items: center; gap: 8px;">
          <button type="button" class="btn btn-warning-glow btn-xs" id="btn-start-onboarding-wizard" title="Yeni servis için 3 adımlı hızlı kurulum sihirbazını başlat">
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
        </div>'''

replacement_header_btns = '''        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
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
        </div>'''

if target_header_btns.replace('\r\n', '\n') in normalized_html:
    normalized_html = normalized_html.replace(target_header_btns.replace('\r\n', '\n'), replacement_header_btns.replace('\r\n', '\n'))
    print("[OK] Successfully updated header buttons in index.html")
else:
    print("[SKIP] target_header_btns not found in index.html")

# 1.2 Settings Tab Bar: Highlight Tab 4 (Rates)
target_nav_tabs = '''      <!-- Ayarlar Sekme Gezinti Çubuğu -->
      <div class="settings-nav-tabs">
        <button type="button" class="settings-tab-btn active" data-tab="tab-settings-company" id="btn-set-tab-company">
          <span>🏢 1. İlk Ayarlar: Firma & Servis Kimliği</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-staff" id="btn-set-tab-staff">
          <span>👥 2. Saha Elemanları & Teknisyenler</span>
          <span class="badge badge-purple" id="badge-settings-staff-count">4 Uzman</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-devices" id="btn-set-tab-devices">
          <span>🏷️ 3. Hizmet Verilen Cihazlar & Kapsam</span>
          <span class="badge badge-cyan" id="badge-settings-device-count">8 Kategori</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-rates" id="btn-set-tab-rates">
          <span>💰 4. İşçilik Tarifeleri & TCMB</span>
        </button>
        <button type="button" class="settings-tab-btn" data-tab="tab-settings-integrations" id="btn-set-tab-integrations">
          <span>🧾 5. e-Fatura & Sanal POS</span>
        </button>
      </div>'''

replacement_nav_tabs = '''      <!-- Ayarlar Sekme Gezinti Çubuğu -->
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

if target_nav_tabs.replace('\r\n', '\n') in normalized_html:
    normalized_html = normalized_html.replace(target_nav_tabs.replace('\r\n', '\n'), replacement_nav_tabs.replace('\r\n', '\n'))
    print("[OK] Successfully updated settings-nav-tabs in index.html")
else:
    print("[SKIP] target_nav_tabs not found in index.html")

# 1.3 Tab 1 Banner: Add "Doğrudan 4. Tarifeler Sekmesine Git" button
target_banner_btns = '''            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-sm btn-outline-cyan" id="btn-load-sample-company" style="font-size: 0.76rem;" title="Örnek bir endüstriyel elektronik servisi bilgilerini doldur">
                <span>⚡ Örnek Firma Verisi Yükle</span>
              </button>
            </div>'''

replacement_banner_btns = '''            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" class="btn btn-sm btn-warning-glow" id="btn-banner-to-rates" style="font-size: 0.76rem;" title="Doğrudan işçilik ve onarım tarifelerine git">
                <span>💰 4. Sekme: İşçilik Tarifelerine Git</span>
              </button>
              <button type="button" class="btn btn-sm btn-outline-cyan" id="btn-load-sample-company" style="font-size: 0.76rem;" title="Örnek bir endüstriyel elektronik servisi bilgilerini doldur">
                <span>⚡ Örnek Firma Verisi Yükle</span>
              </button>
            </div>'''

if target_banner_btns.replace('\r\n', '\n') in normalized_html:
    normalized_html = normalized_html.replace(target_banner_btns.replace('\r\n', '\n'), replacement_banner_btns.replace('\r\n', '\n'))
    print("[OK] Successfully updated banner buttons in index.html")
else:
    print("[SKIP] target_banner_btns not found in index.html")

# 1.4 Wizard Step 6 note: Clarify navigation
target_wizard_note = '''💡 <em>Bu tarifeleri daha sonra istediğiniz zaman üst menüdeki <strong>⚙️ Ayarlar</strong> bölümünden değiştirebilir veya yeni tarifeler ekleyebilirsiniz.</em>'''
replacement_wizard_note = '''💡 <em>Bu tarifeleri daha sonra istediğiniz zaman üst menüdeki <strong>⚙️ Ayarlar</strong> menüsünden <strong>"💰 4. İşçilik & Onarım Tarifeleri"</strong> sekmesine (veya üstteki <strong>"💰 Tarifeleri Güncelle"</strong> butonuna) tıklayarak anında değiştirebilir veya yeni tarifeler ekleyebilirsiniz.</em>'''

if target_wizard_note in normalized_html:
    normalized_html = normalized_html.replace(target_wizard_note, replacement_wizard_note)
    print("[OK] Successfully updated wizard note in index.html")
else:
    print("[SKIP] target_wizard_note not found in index.html")

# 1.5 Modal Footer buttons: Add dynamic helper
target_footer = '''      <div class="modal-footer" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span class="text-xs text-muted" id="settings-save-status">💾 Değişiklikler kaydedildiğinde saha ekranları otomatik güncellenir.</span>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-secondary" id="btn-close-settings-footer">Kapat</button>
          <button type="button" class="btn btn-primary" id="btn-save-all-rates">
            <span>💾 Tüm Tarife Fiyatlarını Kaydet</span>
          </button>
        </div>
      </div>'''

replacement_footer = '''      <div class="modal-footer" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span class="text-xs text-muted" id="settings-save-status">💾 Değişiklikler kaydedildiğinde saha ekranları otomatik güncellenir.</span>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-secondary" id="btn-close-settings-footer">Kapat</button>
          <button type="button" class="btn btn-warning-glow" id="btn-footer-goto-rates" title="İşçilik ve onarım tarifeleri sekmesine geç">
            <span>💰 4. Sekme: Tarifelere Git</span>
          </button>
          <button type="button" class="btn btn-primary" id="btn-save-all-rates" style="display: none;">
            <span>💾 Tüm Tarife Fiyatlarını Kaydet</span>
          </button>
        </div>
      </div>'''

if target_footer.replace('\r\n', '\n') in normalized_html:
    normalized_html = normalized_html.replace(target_footer.replace('\r\n', '\n'), replacement_footer.replace('\r\n', '\n'))
    print("[OK] Successfully updated modal footer in index.html")
else:
    print("[SKIP] target_footer not found in index.html")

# Update cache buster
normalized_html = re.sub(r'app\.js\?v=\d+_\d+', 'app.js?v=20261029_1550', normalized_html)
print("[OK] Updated cache buster to app.js?v=20261029_1550")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(normalized_html)


# 2. Update styles.css
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

normalized_css = css_content.replace('\r\n', '\n')

target_css_tabs = '''.settings-nav-tabs {
  display: flex;
  gap: 6px;
  padding: 10px 16px 0;
  border-bottom: 1px solid var(--border-color);
  background: rgba(15, 23, 42, 0.7);
  overflow-x: auto;
  white-space: nowrap;
}

.settings-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px 6px 0 0;
}

.settings-tab-btn:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.04);
}

.settings-tab-btn.active {
  color: #38bdf8;
  border-bottom-color: #38bdf8;
  background: rgba(56, 189, 248, 0.08);
  font-weight: 700;
}'''

replacement_css_tabs = '''.settings-nav-tabs {
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

if target_css_tabs.replace('\r\n', '\n') in normalized_css:
    normalized_css = normalized_css.replace(target_css_tabs.replace('\r\n', '\n'), replacement_css_tabs.replace('\r\n', '\n'))
    print("[OK] Successfully updated tabs CSS in styles.css")
else:
    print("[SKIP] target_css_tabs not found in styles.css")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(normalized_css)


# 3. Update app.js
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

normalized_app = app_content.replace('\r\n', '\n')

# 3.1 Update openSettingsModal and introduce switchSettingsTab
target_open_settings = '''// ==================== 6. Ayarlar Modalı Açılış & Olay Yöneticisi ====================
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;

  loadCompanyProfileToSettingsForm();
  renderSettingsStaff();
  renderSettingsDevices();
  loadServiceRatesFromLocalStorage();
  loadExchangeRatesFromLocalStorage();
  renderServiceRatesSettings();
  renderExchangeRatesInSettings();
  loadIntegrationsSettings();

  modal.style.display = 'flex';
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) modal.style.display = 'none';
}'''

replacement_open_settings = '''// ==================== 6. Ayarlar Modalı Açılış & Olay Yöneticisi ====================
function switchSettingsTab(targetTabId) {
  if (!targetTabId) targetTabId = 'tab-settings-company';
  const tabBtns = document.querySelectorAll('.settings-tab-btn');
  const tabPanes = document.querySelectorAll('.settings-tab-pane');

  tabBtns.forEach(btn => {
    if (btn.getAttribute('data-tab') === targetTabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  tabPanes.forEach(pane => {
    if (pane.id === targetTabId) {
      pane.classList.add('active');
      pane.style.display = 'block';
    } else {
      pane.classList.remove('active');
      pane.style.display = 'none';
    }
  });

  // Footer Buton Yönetimi: Tarifeler sekmesindeyken "Tüm Tarife Fiyatlarını Kaydet" göster, diğer sekmelerde "Tarifelere Git" göster
  const btnSaveRates = document.getElementById('btn-save-all-rates');
  const btnFooterRates = document.getElementById('btn-footer-goto-rates');
  if (btnSaveRates) {
    btnSaveRates.style.display = (targetTabId === 'tab-settings-rates') ? 'inline-flex' : 'none';
  }
  if (btnFooterRates) {
    btnFooterRates.style.display = (targetTabId !== 'tab-settings-rates') ? 'inline-flex' : 'none';
  }

  if (targetTabId === 'tab-settings-company') {
    loadCompanyProfileToSettingsForm();
  } else if (targetTabId === 'tab-settings-staff') {
    renderSettingsStaff();
  } else if (targetTabId === 'tab-settings-devices') {
    renderSettingsDevices();
  } else if (targetTabId === 'tab-settings-rates') {
    renderServiceRatesSettings();
    renderExchangeRatesInSettings();
  } else if (targetTabId === 'tab-settings-integrations') {
    loadIntegrationsSettings();
  }
}
window.switchSettingsTab = switchSettingsTab;

function openSettingsModal(targetTabId = null) {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;

  loadCompanyProfileToSettingsForm();
  renderSettingsStaff();
  renderSettingsDevices();
  loadServiceRatesFromLocalStorage();
  loadExchangeRatesFromLocalStorage();
  renderServiceRatesSettings();
  renderExchangeRatesInSettings();
  loadIntegrationsSettings();

  if (targetTabId) {
    switchSettingsTab(targetTabId);
  } else {
    const currentActiveBtn = document.querySelector('.settings-tab-btn.active');
    const tabToOpen = currentActiveBtn ? currentActiveBtn.getAttribute('data-tab') : 'tab-settings-company';
    switchSettingsTab(tabToOpen);
  }

  modal.style.display = 'flex';
}
window.openSettingsModal = openSettingsModal;

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) modal.style.display = 'none';
}'''

if target_open_settings.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_open_settings.replace('\r\n', '\n'), replacement_open_settings.replace('\r\n', '\n'))
    print("[OK] Successfully updated openSettingsModal and switchSettingsTab in app.js")
else:
    print("[SKIP] target_open_settings not found in app.js")

# 3.2 Wire up click listeners in initSettingsActions
target_tab_loop = '''  // Ayarlar Sekme Gezintisi (.settings-tab-btn)
  const tabBtns = document.querySelectorAll('.settings-tab-btn');
  const tabPanes = document.querySelectorAll('.settings-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      if (!targetTabId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        pane.style.display = 'none';
      });

      const activePane = document.getElementById(targetTabId);
      if (activePane) {
        activePane.classList.add('active');
        activePane.style.display = 'block';
      }

      if (targetTabId === 'tab-settings-company') {
        loadCompanyProfileToSettingsForm();
      } else if (targetTabId === 'tab-settings-staff') {
        renderSettingsStaff();
      } else if (targetTabId === 'tab-settings-devices') {
        renderSettingsDevices();
      } else if (targetTabId === 'tab-settings-rates') {
        renderServiceRatesSettings();
        renderExchangeRatesInSettings();
      } else if (targetTabId === 'tab-settings-integrations') {
        loadIntegrationsSettings();
      }
    });
  });'''

replacement_tab_loop = '''  // Ayarlar Sekme Gezintisi (.settings-tab-btn)
  const tabBtns = document.querySelectorAll('.settings-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      if (targetTabId) switchSettingsTab(targetTabId);
    });
  });

  // Hızlı Tarifeler Kısayol Butonları (Header, Banner, Footer)
  const btnQuickToRates = document.getElementById('btn-quick-to-rates');
  if (btnQuickToRates) {
    btnQuickToRates.addEventListener('click', () => switchSettingsTab('tab-settings-rates'));
  }

  const btnBannerToRates = document.getElementById('btn-banner-to-rates');
  if (btnBannerToRates) {
    btnBannerToRates.addEventListener('click', () => switchSettingsTab('tab-settings-rates'));
  }

  const btnFooterGotoRates = document.getElementById('btn-footer-goto-rates');
  if (btnFooterGotoRates) {
    btnFooterGotoRates.addEventListener('click', () => switchSettingsTab('tab-settings-rates'));
  }'''

if target_tab_loop.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_tab_loop.replace('\r\n', '\n'), replacement_tab_loop.replace('\r\n', '\n'))
    print("[OK] Successfully updated tab click handlers in app.js")
else:
    print("[SKIP] target_tab_loop not found in app.js")

# 3.3 Update btnOpenSettings to directly open Rates tab
target_btn_open = '''  if (btnHeaderSettings) btnHeaderSettings.addEventListener('click', openSettingsModal);
  if (btnOpenSettings) btnOpenSettings.addEventListener('click', openSettingsModal);'''

replacement_btn_open = '''  if (btnHeaderSettings) btnHeaderSettings.addEventListener('click', () => openSettingsModal());
  if (btnOpenSettings) btnOpenSettings.addEventListener('click', () => openSettingsModal('tab-settings-rates'));'''

if target_btn_open.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_btn_open.replace('\r\n', '\n'), replacement_btn_open.replace('\r\n', '\n'))
    print("[OK] Successfully updated btnOpenSettings to open rates in app.js")
else:
    print("[SKIP] target_btn_open not found in app.js")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(normalized_app)

print("[DONE] apply_rates_tab_ux_enhancements.py execution completed.")

