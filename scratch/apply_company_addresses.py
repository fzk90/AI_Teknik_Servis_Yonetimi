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

print(f"Project directory: {proj_dir}")

# 1. Update index.html
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace Section 3 in form-company-profile
target_html_sec3 = '''              <!-- 3. Adres ve Lokasyon Bilgileri -->
              <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label" for="setting-company-address">Merkez Servis Atölyesi Açık Adresi *</label>
                <input type="text" id="setting-company-address" class="form-input form-input-sm" value="Alaaddinbey Mah. 632. Sok. Otomasyon Center No:8" placeholder="Örn: Dudullu OSB 1. Cadde No:8" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-company-city">İl *</label>
                <input type="text" id="setting-company-city" class="form-input form-input-sm" value="Bursa" placeholder="Örn: Bursa, İstanbul, İzmir" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-company-district">İlçe *</label>
                <input type="text" id="setting-company-district" class="form-input form-input-sm" value="Nilüfer" placeholder="Örn: Nilüfer, Ümraniye, Bornova" required>
              </div>'''

replacement_html_sec3 = '''              <!-- 3. Adres ve Lokasyon Bilgileri (Merkez, Atölye, Ana Depo) -->
              <div style="grid-column: 1 / -1; margin-top: 10px; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;">
                  <span style="font-weight: 700; font-size: 0.95rem; color: #38bdf8; display: flex; align-items: center; gap: 8px;">
                    📍 Şirket Lokasyonları ve Tesis Adresleri
                  </span>
                  <span style="font-size: 0.72rem; color: var(--text-dim);">
                    Genel Merkez, Atölye ve Ana Depo adresleri ayrı ayrı yönetilir
                  </span>
                </div>
              </div>

              <!-- 3.1. Şirket Genel Merkez & Fatura Adresi -->
              <div style="grid-column: 1 / -1; background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <strong style="color: #38bdf8; font-size: 0.88rem; display: flex; align-items: center; gap: 6px;">
                    🏢 1. Şirket Genel Merkez & Resmi Fatura Adresi
                  </strong>
                  <span class="badge badge-blue" style="font-size: 0.68rem;">Resmi Belgeler & Fatura</span>
                </div>
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px;">
                  <div>
                    <label class="form-label" for="setting-company-address">Genel Merkez Açık Adresi *</label>
                    <input type="text" id="setting-company-address" class="form-input form-input-sm" value="Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14" placeholder="Örn: DOSAB Yasemin Sk. No: 14" required>
                  </div>
                  <div>
                    <label class="form-label" for="setting-company-city">İl *</label>
                    <input type="text" id="setting-company-city" class="form-input form-input-sm" value="Bursa" placeholder="Örn: Bursa" required>
                  </div>
                  <div>
                    <label class="form-label" for="setting-company-district">İlçe *</label>
                    <input type="text" id="setting-company-district" class="form-input form-input-sm" value="Osmangazi" placeholder="Örn: Osmangazi" required>
                  </div>
                </div>
              </div>

              <!-- 3.2. Merkez Servis Atölyesi & Laboratuvar Adresi -->
              <div style="grid-column: 1 / -1; background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 8px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <strong style="color: #c084fc; font-size: 0.88rem; display: flex; align-items: center; gap: 6px;">
                    🔬 2. Merkez Servis Atölyesi & Laboratuvar Adresi
                  </strong>
                  <button type="button" id="btn-copy-hq-to-workshop" class="btn btn-outline btn-xs" style="font-size: 0.72rem; padding: 3px 8px; border-color: #8b5cf6; color: #d8b4fe;" title="Genel merkez adres bilgilerini atölye adresine kopyalar">
                    📋 Genel Merkez ile Aynı Yap
                  </button>
                </div>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
                  <div>
                    <label class="form-label" for="setting-workshop-address">Atölye Açık Adresi (Cihaz Kabul & Tezgâh Lokasyonu) *</label>
                    <input type="text" id="setting-workshop-address" class="form-input form-input-sm" value="Alaaddinbey Mah. 632. Sok. Otomasyon Center No: 8 Nilüfer / BURSA" placeholder="Örn: Alaaddinbey Mah. 632. Sok. No: 8 Nilüfer / BURSA" required>
                  </div>
                  <div>
                    <label class="form-label" for="setting-workshop-unit">Birim / Laboratuvar Tanımı</label>
                    <input type="text" id="setting-workshop-unit" class="form-input form-input-sm" value="Elektronik Kart & BGA Rework Laboratuvarı" placeholder="Örn: Elektronik & Test Laboratuvarı">
                  </div>
                </div>
                <div class="text-xs text-muted" style="margin-top: 6px;">
                  ℹ️ Elden teslim alınan ve sahada çözülemeyip atölyeye sevk edilen cihazların kabul/onarım noktasıdır. Saha teknisyenleri atölye görevine yönlendirilirken bu adres baz alınır.
                </div>
              </div>

              <!-- 3.3. Yedek Parça Ana Depo & Sevkiyat Adresi -->
              <div style="grid-column: 1 / -1; background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <strong style="color: #34d399; font-size: 0.88rem; display: flex; align-items: center; gap: 6px;">
                    📦 3. Yedek Parça Ana Depo & Lojistik Sevkiyat Adresi
                  </strong>
                  <button type="button" id="btn-copy-hq-to-warehouse" class="btn btn-outline btn-xs" style="font-size: 0.72rem; padding: 3px 8px; border-color: #10b981; color: #a7f3d0;" title="Genel merkez adres bilgilerini ana depo adresine kopyalar">
                    📋 Genel Merkez ile Aynı Yap
                  </button>
                </div>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
                  <div>
                    <label class="form-label" for="setting-warehouse-address">Ana Depo Açık Adresi (Tedarikçi Teslimat & İkmal) *</label>
                    <input type="text" id="setting-warehouse-address" class="form-input form-input-sm" value="Demirtaş Organize Sanayi Bölgesi (DOSAB) Lojistik Depo No: 14 Osmangazi / BURSA" placeholder="Örn: DOSAB Lojistik Depo No: 14 Osmangazi / BURSA" required>
                  </div>
                  <div>
                    <label class="form-label" for="setting-warehouse-contact">Depo Sorumlusu & İletişim</label>
                    <input type="text" id="setting-warehouse-contact" class="form-input form-input-sm" value="Hasan Usta (Dahili: 104) • depo@kocasteknik.com" placeholder="Örn: Hasan Usta (Dahili: 104)">
                  </div>
                </div>
                <div class="text-xs text-muted" style="margin-top: 6px;">
                  ℹ️ Satın alınan yedek parçaların kabul edildiği, araç stok ikmallerinin yapıldığı ve atölye sarf malzemelerinin sevk edildiği ana lojistik merkezidir.
                </div>
              </div>'''

# Normalize newlines for matching
normalized_html = html_content.replace('\r\n', '\n')
normalized_target_sec3 = target_html_sec3.replace('\r\n', '\n')

if normalized_target_sec3 in normalized_html:
    normalized_html = normalized_html.replace(normalized_target_sec3, replacement_html_sec3.replace('\r\n', '\n'))
    print("[OK] Successfully replaced Section 3 in index.html")
else:
    print("[SKIP] Target Section 3 not found in index.html (may already be replaced)")

# Replace in billing card modal
target_billing_modal = '''          <!-- Fatura Adresi -->
          <div class="billing-card-address-box">
            <span class="billing-card-tax-label">📍 Resmi Fatura Adresi</span>
            <p class="billing-card-address-text" id="billing-card-address">
              Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA
            </p>
          </div>'''

replacement_billing_modal = '''          <!-- Şirket Lokasyonları (Fatura, Atölye, Depo) -->
          <div class="billing-card-address-box" style="margin-bottom: 8px;">
            <span class="billing-card-tax-label">🏢 Resmi Genel Merkez & Fatura Adresi</span>
            <p class="billing-card-address-text" id="billing-card-address" style="margin: 0;">
              Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
            <div style="background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 6px; padding: 8px 10px;">
              <div style="font-size: 0.72rem; color: #c084fc; font-weight: 700; margin-bottom: 3px;">🔬 Merkez Servis Atölyesi</div>
              <div id="billing-card-workshop-address" style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.3;">
                Alaaddinbey Mah. 632. Sok. Otomasyon Center No: 8 Nilüfer / BURSA
              </div>
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 6px; padding: 8px 10px;">
              <div style="font-size: 0.72rem; color: #34d399; font-weight: 700; margin-bottom: 3px;">📦 Yedek Parça Ana Depo</div>
              <div id="billing-card-warehouse-address" style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.3;">
                DOSAB Lojistik Depo No: 14 Osmangazi / BURSA
              </div>
            </div>
          </div>'''

normalized_target_billing = target_billing_modal.replace('\r\n', '\n')
if normalized_target_billing in normalized_html:
    normalized_html = normalized_html.replace(normalized_target_billing, replacement_billing_modal.replace('\r\n', '\n'))
    print("[OK] Successfully replaced billing modal addresses in index.html")
else:
    print("[SKIP] Target billing modal not found in index.html (may already be replaced)")

# Update cache buster
normalized_html = re.sub(r'app\.js\?v=\d+_\d+', 'app.js?v=20261029_1530', normalized_html)
print("[OK] Updated cache buster to app.js?v=20261029_1530")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(normalized_html)


# 2. Update app.js
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

normalized_app = app_content.replace('\r\n', '\n')

# 2.1 Update defaultCompanyProfile
target_default_profile = '''const defaultCompanyProfile = {
  name: "Koçaş Teknik Servis",
  legalName: "Koçaş Endüstriyel Elektronik ve Otomasyon Sistemleri San. ve Tic. A.Ş.",
  industry: "Endüstriyel Elektronik, PLC & Sürücü Onarımı",
  sectorKey: "endustriyel_otomasyon",
  taxOffice: "Nilüfer Vergi Dairesi",
  taxId: "5760129841",
  billingAddress: "Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA",
  city: "Bursa / Nilüfer",
  phone: "+90 224 441 00 24",
  email: "muhasebe@kocasteknik.com",
  website: "https://kocasteknik.com",
  tradeRegNo: "Bursa Tic. Sicil #98241",
  mersisNo: "0576012984100018",
  efaturaScenario: "Ticari Fatura (UBL-TR 2.1)",
  managerName: "Zafer Koçaş",
  managerTitle: "Elektronik ve Haberleşme Mühendisi / Firma Sahibi",
  managerPhone: "0532 999 88 77",
  managerEmail: "zafer@kocasteknik.com",
  managerPin: "1234",
  mainWarehouse: "Bursa Merkez Depo (DOSAB)",
  mainWorkshop: "Elektronik ve Kart Test Laboratuvarı"
};'''

replacement_default_profile = '''const defaultCompanyProfile = {
  name: "Koçaş Teknik Servis",
  legalName: "Koçaş Endüstriyel Elektronik ve Otomasyon Sistemleri San. ve Tic. A.Ş.",
  industry: "Endüstriyel Elektronik, PLC & Sürücü Onarımı",
  sectorKey: "endustriyel_otomasyon",
  taxOffice: "Nilüfer Vergi Dairesi",
  taxId: "5760129841",
  billingAddress: "Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14",
  city: "Bursa",
  district: "Osmangazi",
  phone: "+90 224 441 00 24",
  email: "muhasebe@kocasteknik.com",
  website: "https://kocasteknik.com",
  tradeRegNo: "Bursa Tic. Sicil #98241",
  mersisNo: "0576012984100018",
  efaturaScenario: "Ticari Fatura (UBL-TR 2.1)",
  managerName: "Zafer Koçaş",
  managerTitle: "Elektronik ve Haberleşme Mühendisi / Firma Sahibi",
  managerPhone: "0532 999 88 77",
  managerEmail: "zafer@kocasteknik.com",
  managerPin: "1234",
  mainWarehouse: "Bursa Merkez Depo (DOSAB)",
  mainWorkshop: "Elektronik ve Kart Test Laboratuvarı",
  workshopAddress: "Alaaddinbey Mah. 632. Sok. Otomasyon Center No: 8 Nilüfer / BURSA",
  workshopUnit: "Elektronik Kart & BGA Rework Laboratuvarı",
  warehouseAddress: "Demirtaş Organize Sanayi Bölgesi (DOSAB) Lojistik Depo No: 14 Osmangazi / BURSA",
  warehouseContact: "Hasan Usta (Dahili: 104) • depo@kocasteknik.com"
};'''

if target_default_profile.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_default_profile.replace('\r\n', '\n'), replacement_default_profile.replace('\r\n', '\n'))
    print("[OK] Successfully updated defaultCompanyProfile in app.js")
else:
    print("[SKIP] target_default_profile not found in app.js")

# 2.2 Update loadCompanyProfileToSettingsForm
target_load_func = '''  setEl('setting-company-address', p.billingAddress || '');
  setEl('setting-company-city', p.city || '');
  setEl('setting-company-district', p.district || '');
  setEl('setting-company-phone', p.phone || '');'''

replacement_load_func = '''  setEl('setting-company-address', p.billingAddress || '');
  setEl('setting-company-city', p.city || '');
  setEl('setting-company-district', p.district || '');
  setEl('setting-workshop-address', p.workshopAddress || 'Alaaddinbey Mah. 632. Sok. Otomasyon Center No: 8 Nilüfer / BURSA');
  setEl('setting-workshop-unit', p.workshopUnit || p.mainWorkshop || 'Elektronik Kart & BGA Rework Laboratuvarı');
  setEl('setting-warehouse-address', p.warehouseAddress || 'Demirtaş Organize Sanayi Bölgesi (DOSAB) Lojistik Depo No: 14 Osmangazi / BURSA');
  setEl('setting-warehouse-contact', p.warehouseContact || 'Hasan Usta (Dahili: 104) • depo@kocasteknik.com');
  setEl('setting-company-phone', p.phone || '');'''

if target_load_func.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_load_func.replace('\r\n', '\n'), replacement_load_func.replace('\r\n', '\n'))
    print("[OK] Successfully updated loadCompanyProfileToSettingsForm in app.js")
else:
    print("[SKIP] target_load_func not found in app.js")

# 2.3 Update formCompany submit handler
target_submit_profile = '''        billingAddress: (document.getElementById('setting-company-address')?.value || '').trim(),
        city: (document.getElementById('setting-company-city')?.value || '').trim(),
        district: (document.getElementById('setting-company-district')?.value || '').trim(),
        phone: (document.getElementById('setting-company-phone')?.value || '').trim(),'''

replacement_submit_profile = '''        billingAddress: (document.getElementById('setting-company-address')?.value || '').trim(),
        city: (document.getElementById('setting-company-city')?.value || '').trim(),
        district: (document.getElementById('setting-company-district')?.value || '').trim(),
        workshopAddress: (document.getElementById('setting-workshop-address')?.value || '').trim(),
        workshopUnit: (document.getElementById('setting-workshop-unit')?.value || '').trim(),
        mainWorkshop: (document.getElementById('setting-workshop-unit')?.value || '').trim() || current.mainWorkshop || 'Merkez Servis Atölyesi',
        warehouseAddress: (document.getElementById('setting-warehouse-address')?.value || '').trim(),
        warehouseContact: (document.getElementById('setting-warehouse-contact')?.value || '').trim(),
        mainWarehouse: current.mainWarehouse || 'Merkez Depo',
        phone: (document.getElementById('setting-company-phone')?.value || '').trim(),'''

if target_submit_profile.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_submit_profile.replace('\r\n', '\n'), replacement_submit_profile.replace('\r\n', '\n'))
    print("[OK] Successfully updated formCompany submit in app.js")
else:
    print("[SKIP] target_submit_profile not found in app.js")

# 2.4 Add click listeners for copy-hq-to-workshop and copy-hq-to-warehouse
target_after_submit = '''      applyCompanyProfile(updatedProfile);
      showToast(`🏢 "${updatedProfile.name || updatedProfile.legalName}" firma ve yönetici bilgileri başarıyla kaydedildi ve tüm sisteme uygulandı!`, 'success');
    });
  }'''

replacement_after_submit = '''      applyCompanyProfile(updatedProfile);
      showToast(`🏢 "${updatedProfile.name || updatedProfile.legalName}" firma, atölye ve depo adresleri başarıyla kaydedildi!`, 'success');
    });
  }

  // Genel Merkez Adresini Atölyeye Kopyala
  const btnCopyHqToWorkshop = document.getElementById('btn-copy-hq-to-workshop');
  if (btnCopyHqToWorkshop) {
    btnCopyHqToWorkshop.addEventListener('click', () => {
      const hqAddr = (document.getElementById('setting-company-address')?.value || '').trim();
      const hqCity = (document.getElementById('setting-company-city')?.value || '').trim();
      const hqDist = (document.getElementById('setting-company-district')?.value || '').trim();
      const parts = [hqAddr, hqDist, hqCity].filter(Boolean);
      const combined = parts.join(' ');
      const wsInput = document.getElementById('setting-workshop-address');
      if (wsInput && combined) {
        wsInput.value = combined;
        showToast('📋 Genel Merkez adresi Merkez Atölye adresi olarak kopyalandı.', 'info');
      }
    });
  }

  // Genel Merkez Adresini Depoya Kopyala
  const btnCopyHqToWarehouse = document.getElementById('btn-copy-hq-to-warehouse');
  if (btnCopyHqToWarehouse) {
    btnCopyHqToWarehouse.addEventListener('click', () => {
      const hqAddr = (document.getElementById('setting-company-address')?.value || '').trim();
      const hqCity = (document.getElementById('setting-company-city')?.value || '').trim();
      const hqDist = (document.getElementById('setting-company-district')?.value || '').trim();
      const parts = [hqAddr, hqDist, hqCity].filter(Boolean);
      const combined = parts.join(' ');
      const whInput = document.getElementById('setting-warehouse-address');
      if (whInput && combined) {
        whInput.value = combined;
        showToast('📋 Genel Merkez adresi Yedek Parça Depo adresi olarak kopyalandı.', 'info');
      }
    });
  }'''

if target_after_submit.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_after_submit.replace('\r\n', '\n'), replacement_after_submit.replace('\r\n', '\n'))
    print("[OK] Successfully added copy HQ buttons handlers in app.js")
else:
    print("[SKIP] target_after_submit not found in app.js")

# 2.5 Update btnLoadSampleCo
target_sample_co = '''      setEl('setting-company-address', tmpl.billingAddress);
      setEl('setting-company-city', tmpl.city);
      setEl('setting-company-phone', tmpl.phone);'''

replacement_sample_co = '''      setEl('setting-company-address', tmpl.billingAddress);
      setEl('setting-company-city', tmpl.city || 'Bursa');
      setEl('setting-company-district', tmpl.district || 'Osmangazi');
      setEl('setting-workshop-address', tmpl.workshopAddress || 'Alaaddinbey Mah. 632. Sok. Otomasyon Center No: 8 Nilüfer / BURSA');
      setEl('setting-workshop-unit', tmpl.workshopUnit || tmpl.mainWorkshop || 'Elektronik Kart & BGA Rework Laboratuvarı');
      setEl('setting-warehouse-address', tmpl.warehouseAddress || 'Demirtaş Organize Sanayi Bölgesi (DOSAB) Lojistik Depo No: 14 Osmangazi / BURSA');
      setEl('setting-warehouse-contact', tmpl.warehouseContact || 'Hasan Usta (Dahili: 104) • depo@kocasteknik.com');
      setEl('setting-company-phone', tmpl.phone);'''

if target_sample_co.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_sample_co.replace('\r\n', '\n'), replacement_sample_co.replace('\r\n', '\n'))
    print("[OK] Successfully updated btnLoadSampleCo in app.js")
else:
    print("[SKIP] target_sample_co not found in app.js")

# 2.6 Update applyCompanyProfile
target_apply_profile = '''  const elBillAddr = document.getElementById('billing-card-address');
  if (elBillAddr) elBillAddr.textContent = profile.billingAddress || profile.city || '—';

  const elBillEmail = document.getElementById('billing-card-email');'''

replacement_apply_profile = '''  const elBillAddr = document.getElementById('billing-card-address');
  if (elBillAddr) elBillAddr.textContent = profile.billingAddress || profile.city || '—';

  const elBillWorkshop = document.getElementById('billing-card-workshop-address');
  if (elBillWorkshop) elBillWorkshop.textContent = profile.workshopAddress || 'Alaaddinbey Mah. 632. Sok. Otomasyon Center No: 8 Nilüfer / BURSA';

  const elBillWarehouse = document.getElementById('billing-card-warehouse-address');
  if (elBillWarehouse) elBillWarehouse.textContent = profile.warehouseAddress || 'DOSAB Lojistik Depo No: 14 Osmangazi / BURSA';

  const elBillEmail = document.getElementById('billing-card-email');'''

if target_apply_profile.replace('\r\n', '\n') in normalized_app:
    normalized_app = normalized_app.replace(target_apply_profile.replace('\r\n', '\n'), replacement_apply_profile.replace('\r\n', '\n'))
    print("[OK] Successfully updated applyCompanyProfile in app.js")
else:
    print("[SKIP] target_apply_profile not found in app.js")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(normalized_app)

print("[DONE] apply_company_addresses.py execution completed.")
