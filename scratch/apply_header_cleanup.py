import sys
import re

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

index_path = r"c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi\index.html"
styles_path = r"c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi\styles.css"
app_path = r"c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi\app.js"

# -------------------------------------------------------------
# 1. UPDATE index.html
# -------------------------------------------------------------
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1a. Update Header: Role Nav & Header Actions
old_header_target = re.search(r'(<nav class="role-nav" aria-label="Kullanıcı Rolü Seçimi">.*?</nav>\s*<!-- Header Meta & Status -->\s*<div class="header-actions">.*?</div>\s*</header>)', html, re.DOTALL)
if not old_header_target:
    print("ERROR: old_header_target not found!")
    sys.exit(1)

new_header_content = """<nav class="role-nav" aria-label="Kullanıcı Rolü Seçimi">
      <button class="role-btn active" data-tab="admin-view" id="btn-tab-admin">
        <span class="icon">📊</span>
        <span>Yönetici & Kontrol Paneli</span>
      </button>
      <button class="role-btn" data-tab="tech-view" id="btn-tab-tech">
        <span class="icon">🔧</span>
        <span>Teknisyen Saha Ekranı</span>
        <span class="badge" id="assigned-jobs-badge">2 İş</span>
      </button>
      <button class="role-btn" data-tab="customer-view" id="btn-tab-customer">
        <span class="icon">🔍</span>
        <span>Müşteri Cihaz Sorgulama</span>
      </button>
    </nav>

    <!-- Header Meta & Status (Derli Toplu ve Ferah Eylemler) -->
    <div class="header-actions">
      <button class="btn btn-primary btn-sm" id="btn-open-intake-modal" title="Yeni Müşteri Çağrısı ve Atölye Cihaz Kabulü">
        <span>➕ Yeni Çağrı / Cihaz Kabul</span>
      </button>
      <div class="user-pill" id="btn-open-manager-modal" style="cursor: pointer;" title="Profil ve Yönetici Bilgileri">
        <span class="avatar" id="header-user-avatar">ZK</span>
        <span class="user-name" id="header-user-name">Zafer Koçaş (Yönetici)</span>
      </div>
      <button class="btn btn-outline btn-sm" id="btn-header-settings" title="Sistem Ayarları, Şirket Bilgileri & Tarifeler">
        <span>⚙️ Ayarlar</span>
      </button>
    </div>
  </header>"""

html = html[:old_header_target.start()] + new_header_content + html[old_header_target.end():]
print("✓ Top navbar cleaned up successfully.")

# 1b. Add Subnav Bar to admin-view (above KPI grid)
admin_kpi_target = '<section id="admin-view" class="view-panel active">\n      <!-- KPI Cards -->'
new_admin_top = """<section id="admin-view" class="view-panel active">
      <!-- Yönetici & Kontrol Paneli Üst Komuta Çubuğu (Admin Subnav Bar) -->
      <div class="admin-subnav-bar">
        <div class="admin-subnav-left">
          <button type="button" class="admin-subnav-btn active" id="btn-admin-sub-dispatch" onclick="switchToAdminSection('admin-view')">
            <span class="subnav-icon">📋</span>
            <span>Sevk Masası & Operasyon</span>
          </button>
          <button type="button" class="admin-subnav-btn" id="btn-tab-equipment" data-tab="equipment-view" onclick="switchToAdminSection('equipment-view')" title="Cihaz Sicil Kartları ve Dijital Pasaport Yönetimi">
            <span class="subnav-icon">🏷️</span>
            <span>Cihaz Sicil & Seri No</span>
            <span class="badge" id="equipment-count-badge">8 Cihaz</span>
          </button>
          <button type="button" class="admin-subnav-btn" id="btn-tab-reports" data-tab="reports-view" onclick="switchToAdminSection('reports-view')" title="İş Zekası (BI), Personel ve Finans Raporları">
            <span class="subnav-icon">📈</span>
            <span>Raporlama & Analitik</span>
          </button>
        </div>
        <div class="admin-subnav-right">
          <div class="system-status" id="admin-system-status" title="Saha Ekipleri ve Canlı GPS Bağlantısı Aktif">
            <span class="pulse-dot"></span>
            <span class="status-label">Saha Senkronize</span>
          </div>
        </div>
      </div>

      <!-- KPI Cards -->"""

if admin_kpi_target not in html:
    print("ERROR: admin_kpi_target not found!")
    sys.exit(1)

html = html.replace(admin_kpi_target, new_admin_top, 1)
print("✓ Admin subnav bar added to admin-view.")

# 1c. Add Subnav Bar to reports-view
reports_target = '<section id="reports-view" class="view-panel">\n      <div class="content-card">'
new_reports_top = """<section id="reports-view" class="view-panel">
      <!-- Yönetici Gezinim & Komuta Çubuğu -->
      <div class="admin-subnav-bar">
        <div class="admin-subnav-left">
          <button type="button" class="admin-subnav-btn" onclick="switchToAdminSection('admin-view')">
            <span class="subnav-icon">📋</span>
            <span>Sevk Masası & Operasyon</span>
          </button>
          <button type="button" class="admin-subnav-btn" onclick="switchToAdminSection('equipment-view')">
            <span class="subnav-icon">🏷️</span>
            <span>Cihaz Sicil & Seri No</span>
          </button>
          <button type="button" class="admin-subnav-btn active">
            <span class="subnav-icon">📈</span>
            <span>Raporlama & Analitik</span>
          </button>
        </div>
        <div class="admin-subnav-right">
          <div class="system-status" title="Saha Ekipleri ve Canlı GPS Bağlantısı Aktif">
            <span class="pulse-dot"></span>
            <span class="status-label">Saha Senkronize</span>
          </div>
          <button type="button" class="btn btn-outline btn-xs" onclick="switchToAdminSection('admin-view')">
            <span>← Sevk Masasına Dön</span>
          </button>
        </div>
      </div>

      <div class="content-card">"""

if reports_target not in html:
    print("ERROR: reports_target not found!")
    sys.exit(1)

html = html.replace(reports_target, new_reports_top, 1)
print("✓ Admin subnav bar added to reports-view.")

# 1d. Add Subnav Bar to equipment-view
equipment_target = '<section id="equipment-view" class="view-panel">\n      <div class="equipment-view-header">'
new_equipment_top = """<section id="equipment-view" class="view-panel">
      <!-- Yönetici Gezinim & Komuta Çubuğu -->
      <div class="admin-subnav-bar">
        <div class="admin-subnav-left">
          <button type="button" class="admin-subnav-btn" onclick="switchToAdminSection('admin-view')">
            <span class="subnav-icon">📋</span>
            <span>Sevk Masası & Operasyon</span>
          </button>
          <button type="button" class="admin-subnav-btn active">
            <span class="subnav-icon">🏷️</span>
            <span>Cihaz Sicil & Seri No</span>
          </button>
          <button type="button" class="admin-subnav-btn" onclick="switchToAdminSection('reports-view')">
            <span class="subnav-icon">📈</span>
            <span>Raporlama & Analitik</span>
          </button>
        </div>
        <div class="admin-subnav-right">
          <div class="system-status" title="Saha Ekipleri ve Canlı GPS Bağlantısı Aktif">
            <span class="pulse-dot"></span>
            <span class="status-label">Saha Senkronize</span>
          </div>
          <button type="button" class="btn btn-outline btn-xs" onclick="switchToAdminSection('admin-view')">
            <span>← Sevk Masasına Dön</span>
          </button>
        </div>
      </div>

      <div class="equipment-view-header">"""

if equipment_target not in html:
    print("ERROR: equipment_target not found!")
    sys.exit(1)

html = html.replace(equipment_target, new_equipment_top, 1)
print("✓ Admin subnav bar added to equipment-view.")

# 1e. Update Settings Modal Header: Add Web Form, Onboarding, Demo Guide & Logout
old_settings_header_actions = re.search(r'(<div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end;">.*?<button class="modal-close-btn" id="btn-close-settings-modal".*?</div>)', html, re.DOTALL)
if not old_settings_header_actions:
    print("ERROR: old_settings_header_actions not found!")
    sys.exit(1)

new_settings_header_actions = """<div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end;">
          <button type="button" class="btn btn-warning-glow btn-xs" id="btn-quick-to-rates" style="border: 1px solid #f59e0b; font-weight: 700; padding: 6px 11px; font-size: 0.76rem;" title="İşçilik ve onarım tarifeleri yönetimine doğrudan geç">
            <span>💰 Tarifeleri Güncelle</span>
          </button>
          <button type="button" class="btn btn-outline-cyan btn-xs" id="btn-settings-open-embed" style="padding: 6px 9px; font-size: 0.74rem;" title="Web Sitenize veya Sosyal Medyanıza Arıza Kayıt Formu Ekleyin (Iframe & Link)">
            <span>🌐 Web Formu & Link</span>
          </button>
          <button type="button" class="btn btn-primary btn-xs" id="btn-open-onboarding-wizard" style="padding: 6px 9px; font-size: 0.74rem;" title="Yeni servis için hızlı kurulum sihirbazını başlat">
            <span>🚀 Kurulum Sihirbazı</span>
          </button>
          <button type="button" class="btn btn-warning-glow btn-xs" id="btn-open-demo-guide-modal" style="padding: 6px 9px; font-size: 0.74rem;" title="İnteraktif Canlı Demo Turu & Hızlı Başlangıç Rehberi">
            <span>🎯 Demo Turu</span>
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
          <button type="button" class="btn btn-outline-danger btn-xs" id="btn-header-auth-action" style="border: 1px solid #ef4444; color: #fca5a5; font-weight: 600; padding: 6px 10px; font-size: 0.74rem;" title="Oturumu Kapat / Giriş Yap">
            <span id="btn-header-auth-icon">🚪</span>
            <span id="btn-header-auth-text">Çıkış Yap</span>
          </button>
          <button class="modal-close-btn" id="btn-close-settings-modal" style="padding: 0 4px; line-height: 1; margin-left: 4px;">&times;</button>
        </div>"""

html = html[:old_settings_header_actions.start()] + new_settings_header_actions + html[old_settings_header_actions.end():]
print("✓ Settings header updated with Web Form & Logout.")

# 1f. Add Web Form Embed Box inside Tab 5 (tab-settings-integrations)
tab5_target = '<!-- Sanal POS Entegratör Ayarları (PayTR, iyzico, ParamPOS) -->'
if tab5_target not in html:
    print("ERROR: tab5_target not found!")
    sys.exit(1)

# Find end of Sanal POS box inside tab-settings-integrations
pos_box_end = html.find('</div>\n          </div>\n\n        </div>', html.find(tab5_target))
if pos_box_end == -1:
    # Try finding without extra whitespace
    pos_box_end = html.find('</div>\r\n          </div>\r\n\r\n        </div>', html.find(tab5_target))

embed_card_html = """
          <!-- Web Sitesi & Sosyal Medya Arıza Kayıt Formu (Embed Hub) -->
          <div class="settings-embed-box" style="background: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 8px; padding: 14px 16px; margin-top: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.15rem;">🌐</span>
                <strong style="font-size: 0.95rem; color: var(--text-main);">Web Sitesi & Sosyal Medya Arıza Kayıt Formu (Embed Hub)</strong>
                <span class="badge badge-cyan">Canlı Entegrasyon</span>
              </div>
              <span class="text-xs text-muted">Iframe Kodu, Direkt URL & WhatsApp Biyo Linki</span>
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
              Müşterilerinizin firmanızın web sitesinden veya Instagram, TikTok, Facebook ve WhatsApp biyo alanındaki bağlantıya tıklayarak 7/24 doğrudan servis kaydı açmasını sağlayın. Gelen tüm talepler anında <strong>Sevk Masası</strong>'na canlı düşer.
            </p>
            <div style="display: flex; justify-content: flex-end;">
              <button type="button" class="btn btn-outline-cyan btn-sm" id="btn-open-embed-modal" title="Web Formu Iframe ve Link Kodlarını Görüntüle">
                <span>🌐 Web Formu, Iframe Kodu ve Biyo Linki Sihirbazını Aç</span>
              </button>
            </div>
          </div>"""

# Insert before closing tag of tab-settings-integrations
tab5_close_tag = '</div>\n\n      </div>\n\n      <div class="modal-footer"'
if tab5_close_tag not in html:
    tab5_close_tag = '</div>\r\n\r\n      </div>\r\n\r\n      <div class="modal-footer"'

if tab5_close_tag in html:
    html = html.replace(tab5_close_tag, embed_card_html + '\n        </div>\n\n      </div>\n\n      <div class="modal-footer"', 1)
    print("✓ Web Form Embed Card added to Settings Tab 5.")
else:
    print("WARNING: Could not find exact tab5_close_tag. Checking alternative...")
    idx_tab5 = html.find('id="tab-settings-integrations"')
    idx_pane_close = html.find('</div>\n\n      </div>', idx_tab5)
    if idx_pane_close == -1:
        idx_pane_close = html.find('</div>\r\n\r\n      </div>', idx_tab5)
    html = html[:idx_pane_close] + embed_card_html + '\n        ' + html[idx_pane_close:]
    print("✓ Web Form Embed Card inserted into Tab 5 using offset.")

# 1g. Update Cache Buster
html = re.sub(r'styles\.css\?v=[0-9_]+', 'styles.css?v=20261029_1635', html)
html = re.sub(r'app\.js\?v=[0-9_]+', 'app.js?v=20261029_1635', html)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ index.html written successfully.")

# -------------------------------------------------------------
# 2. UPDATE styles.css
# -------------------------------------------------------------
with open(styles_path, 'r', encoding='utf-8') as f:
    css = f.read()

subnav_css = """
/* ==========================================================================
   YÖNETİCİ & KONTROL PANELİ ÜST KOMUTA ÇUBUĞU (ADMIN SUBNAV BAR)
   ========================================================================== */
.admin-subnav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px 14px;
  margin-bottom: 18px;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-subnav-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-subnav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-subnav-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 7px;
  color: var(--text-dim, #94a3b8);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.admin-subnav-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text-main, #f8fafc);
  border-color: rgba(255, 255, 255, 0.16);
}

.admin-subnav-btn.active {
  background: rgba(56, 189, 248, 0.14);
  border-color: rgba(56, 189, 248, 0.45);
  color: #38bdf8;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.18);
}

.admin-subnav-btn .subnav-icon {
  font-size: 1rem;
}

.admin-subnav-btn .badge {
  font-size: 0.7rem;
  padding: 2px 7px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  font-weight: 700;
}
"""

if '.admin-subnav-bar' not in css:
    css += subnav_css
    with open(styles_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("✓ styles.css updated with admin-subnav-bar styles.")
else:
    print("Note: .admin-subnav-bar already exists in styles.css.")

# -------------------------------------------------------------
# 3. UPDATE app.js
# -------------------------------------------------------------
with open(app_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Add switchToAdminSection function right after initTabs
target_init_tabs_end = "showToast(`Ekran Değiştirildi: ${btn.querySelector('span:last-child').textContent}`);\n    });\n  });\n}"
if target_init_tabs_end not in js:
    # Try with \r\n
    target_init_tabs_end = "showToast(`Ekran Değiştirildi: ${btn.querySelector('span:last-child').textContent}`);\r\n    });\r\n  });\r\n}"

switch_to_admin_code = """

// ==================== Yönetici Alt Modül Gezinimi ====================
function switchToAdminSection(targetId) {
  if (state.currentUser && state.currentUser.role === 'Teknisyen') {
    showToast('🔒 Bu ekrana erişim için Şirket Yöneticisi yetkisi gereklidir.');
    return;
  }

  const panels = document.querySelectorAll('.view-panel');
  panels.forEach(p => p.classList.remove('active'));

  const targetPanel = document.getElementById(targetId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Header'daki 3 ana rol butonundan Yönetici sekmesini aktif tut
  const roleButtons = document.querySelectorAll('.role-nav .role-btn');
  roleButtons.forEach(b => b.classList.remove('active'));
  const adminTab = document.getElementById('btn-tab-admin');
  if (adminTab) adminTab.classList.add('active');

  // Subnav butonlarındaki aktiflik durumunu güncelle
  const subnavBtns = document.querySelectorAll('.admin-subnav-btn');
  subnavBtns.forEach(sb => {
    const sbTarget = sb.getAttribute('data-tab');
    if (sbTarget === targetId || (targetId === 'admin-view' && sb.id === 'btn-admin-sub-dispatch')) {
      sb.classList.add('active');
    } else {
      sb.classList.remove('active');
    }
  });

  state.activeTab = targetId;
  if (targetId === 'admin-view') {
    renderIncomingCalls();
    if (typeof updateDispatchBanner === 'function') updateDispatchBanner();
    updateFleetKPI();
    updateActiveOrdersKPI();
  } else if (targetId === 'reports-view') {
    updateReportStaffDropdown();
    if (typeof initCustomSelect === 'function') {
      initCustomSelect(document.getElementById('report-type-select'));
      initCustomSelect(document.getElementById('report-staff-filter'));
      initCustomSelect(document.getElementById('report-status-filter'));
    }
    executeCustomReport();
  } else if (targetId === 'equipment-view') {
    renderEquipmentRegistry();
  }

  const titles = {
    'admin-view': 'Sevk Masası & Operasyon',
    'reports-view': 'Raporlama & Analitik',
    'equipment-view': 'Cihaz Sicil & Seri No'
  };
  if (titles[targetId]) {
    showToast(`Bölüm: ${titles[targetId]}`);
  }
}
window.switchToAdminSection = switchToAdminSection;"""

if 'function switchToAdminSection' not in js:
    if target_init_tabs_end in js:
        js = js.replace(target_init_tabs_end, target_init_tabs_end + switch_to_admin_code, 1)
        print("✓ switchToAdminSection added right after initTabs.")
    else:
        print("WARNING: target_init_tabs_end not matched exactly, appending before window.initTabs.")
        js = js.replace('window.initTabs = initTabs;', switch_to_admin_code + '\nwindow.initTabs = initTabs;')

# Also in initEmbedWidgetActions: ensure btn-settings-open-embed is wired
embed_hook_target = "const btnOpenEmbed = document.getElementById('btn-open-embed-modal');"
embed_hook_replacement = """const btnOpenEmbed = document.getElementById('btn-open-embed-modal');
  const btnSettingsOpenEmbed = document.getElementById('btn-settings-open-embed');"""

if 'btnSettingsOpenEmbed' not in js and embed_hook_target in js:
    js = js.replace(embed_hook_target, embed_hook_replacement, 1)
    # also add click listener
    embed_listener_target = "if (btnOpenEmbed && modal) {\n    btnOpenEmbed.addEventListener('click', () => { modal.style.display = 'flex'; });\n  }"
    if embed_listener_target not in js:
        embed_listener_target = "if (btnOpenEmbed && modal) {\r\n    btnOpenEmbed.addEventListener('click', () => { modal.style.display = 'flex'; });\r\n  }"
    embed_listener_replacement = """if (btnOpenEmbed && modal) {
    btnOpenEmbed.addEventListener('click', () => { modal.style.display = 'flex'; });
  }
  if (btnSettingsOpenEmbed && modal) {
    btnSettingsOpenEmbed.addEventListener('click', () => { modal.style.display = 'flex'; });
  }"""
    js = js.replace(embed_listener_target, embed_listener_replacement, 1)
    print("✓ btn-settings-open-embed wired in initEmbedWidgetActions.")

# Also in initOnboardingWizardEngine: ensure btn-start-onboarding-wizard also triggers
wizard_target = "const btnOpen = document.getElementById('btn-open-onboarding-wizard');"
wizard_replacement = """const btnOpen = document.getElementById('btn-open-onboarding-wizard');
  const btnStart = document.getElementById('btn-start-onboarding-wizard');"""
if 'btnStart' not in js and wizard_target in js:
    js = js.replace(wizard_target, wizard_replacement, 1)
    wizard_listen_target = "if (btnOpen) {\n    btnOpen.addEventListener('click', () => {\n      openOnboardingWizard(1);\n    });\n  }"
    if wizard_listen_target not in js:
        wizard_listen_target = "if (btnOpen) {\r\n    btnOpen.addEventListener('click', () => {\r\n      openOnboardingWizard(1);\r\n    });\r\n  }"
    wizard_listen_replacement = """if (btnOpen) {
    btnOpen.addEventListener('click', () => { openOnboardingWizard(1); });
  }
  if (btnStart) {
    btnStart.addEventListener('click', () => { openOnboardingWizard(1); });
  }"""
    js = js.replace(wizard_listen_target, wizard_listen_replacement, 1)
    print("✓ btnStart wired in initOnboardingWizardEngine.")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ app.js written successfully.")
