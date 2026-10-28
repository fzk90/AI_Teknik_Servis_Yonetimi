# -*- coding: utf-8 -*-
import sys

with open('Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Header'a "Şirket Kurulum Sihirbazı" Butonu Ekleme
btn_wizard_header = '''      <button class="btn btn-gradient-purple btn-sm" id="btn-open-onboarding-wizard" style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); border: 1px solid #a78bfa; color: #fff; box-shadow: 0 0 15px rgba(124, 58, 237, 0.35);" title="Yeni Firma Kurulumu, Resmi Şirket Fatura Bilgileri ve Saha Yapılandırma Sihirbazı">
        <span>🚀 Şirket Kurulum Sihirbazı</span>
      </button>
'''

if 'id="btn-open-onboarding-wizard"' not in html:
    target_needle = '<button class="btn btn-warning-glow btn-sm" id="btn-open-demo-guide-modal"'
    if target_needle in html:
        html = html.replace(target_needle, btn_wizard_header + '      ' + target_needle)
        print('Header button added!')
    else:
        print('Target needle not found for header button!')

# 2. Teknisyen Ekranında Şirket Fatura Bilgilerini Göster Butonları
# A) Tezgâh Başlığı / Durum Barı
tech_billing_btn_1 = '''              <button type="button" class="btn btn-xs btn-outline-cyan ml-2" id="btn-tech-show-billing-card" style="font-size: 0.76rem; padding: 4px 10px; border-color: #818cf8; color: #c7d2fe; display: inline-flex; align-items: center; gap: 5px;" title="Dışarıda parça veya masraf yaparken satıcıya göstermek veya iletmek için şirket fatura bilgilerini aç">
                <span>🏢 Şirket Fatura Bilgilerimiz (Dış Alım İbrazı)</span>
              </button>
'''
if 'id="btn-tech-show-billing-card"' not in html:
    needle_tech_header = '<button class="btn btn-primary btn-sm" id="btn-tech-on-the-way">'
    if needle_tech_header in html:
        html = html.replace(needle_tech_header, tech_billing_btn_1 + '              ' + needle_tech_header)
        print('Tech header billing button added!')

# B) Yerel Tedarik Paneli Bilgi Çubuğu
tech_billing_link_2 = '''                  <button type="button" class="btn btn-xs btn-outline" id="btn-local-parts-billing-card" style="margin-left: 8px; font-size: 0.72rem; padding: 2px 8px; border-color: #818cf8; color: #c7d2fe;">
                    🏢 Şirket Fatura Bilgilerimizi Göster
                  </button>
'''
if 'id="btn-local-parts-billing-card"' not in html:
    needle_local_part = '🧾 Stoğa Giriş-Çıkış Yap, Fişe Ekle & Alacak Kaydet'
    if needle_local_part in html:
        # inject in the info bar
        needle_info = 'Otomatik Belgeleme ve Alacak Kaydı:</strong>'
        if needle_info in html:
            html = html.replace(needle_info, needle_info + ' ' + tech_billing_link_2)
            print('Local parts billing link added!')

# C) Teknisyen Masraf Formu Başlığı
tech_billing_btn_3 = '''                <button type="button" class="btn btn-xs btn-outline-cyan" id="btn-expense-show-billing-card" style="font-size: 0.74rem; padding: 3px 9px;">
                  🏢 Şirket Fatura Bilgilerini Gör
                </button>
'''
if 'id="btn-expense-show-billing-card"' not in html:
    needle_expense_box = '<span id="tech-total-reimbursement" class="tech-reimbursement-badge">0 ₺</span>'
    if needle_expense_box in html:
        html = html.replace(needle_expense_box, needle_expense_box + '\n                ' + tech_billing_btn_3)
        print('Expense box billing button added!')

# 3. İki Modalı index.html Sonuna (</body> öncesine) Ekleme
modals_html = '''
  <!-- ==================== 4. ŞİRKET FATURA BİLGİLERİ (TEKNİSYEN DIŞ HARCAMA İBRAZI) MODALI ==================== -->
  <div class="modal-backdrop" id="company-billing-info-modal" style="display: none;">
    <div class="modal-card" style="max-width: 640px; border: 2px solid #818cf8; box-shadow: 0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(99, 102, 241, 0.3);">
      <div class="modal-header" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(30, 41, 59, 0.9) 100%); border-bottom: 1px solid rgba(129, 140, 248, 0.3);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.6rem;">🏢</span>
          <div>
            <h3 style="margin: 0; color: #c7d2fe; font-size: 1.15rem; font-weight: 700;">Resmi Şirket Fatura Bilgilerimiz</h3>
            <p style="margin: 2px 0 0; font-size: 0.78rem; color: #94a3b8;">
              Dış Alımlarda / Harcamalarda Satıcıya İbraz Edilecek Kurumsal Bilgiler
            </p>
          </div>
        </div>
        <button class="modal-close" id="btn-close-billing-card-modal">&times;</button>
      </div>

      <div class="modal-body" style="padding: 20px;">
        <!-- Fatura Kartı (Yüksek Kontrastlı Ekran) -->
        <div class="company-billing-card" id="printable-billing-card">
          <div class="billing-card-header">
            <div>
              <span class="billing-card-badge">
                <span>🏛️ T.C. Resmi Fatura Ünvanı</span>
              </span>
              <h4 class="billing-card-legal-name" id="billing-card-legal-name">
                Koçaş Endüstriyel Elektronik ve Otomasyon Sistemleri San. ve Tic. A.Ş.
              </h4>
            </div>
            <div style="font-size: 2rem;">🇹🇷</div>
          </div>

          <!-- Vergi Dairesi ve VKN Satırı -->
          <div class="billing-card-tax-row">
            <div class="billing-card-tax-item">
              <span class="billing-card-tax-label">Vergi Dairesi</span>
              <span class="billing-card-tax-value" id="billing-card-tax-office" style="font-size: 1rem; color: #cbd5e1;">
                Nilüfer Vergi Dairesi
              </span>
            </div>
            <div class="billing-card-tax-item" style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 18px;">
              <span class="billing-card-tax-label">Vergi Kimlik No (VKN / TCKN)</span>
              <span class="billing-card-tax-value" id="billing-card-tax-id" style="font-size: 1.35rem; color: #38bdf8;">
                5760129841
              </span>
            </div>
          </div>

          <!-- Fatura Adresi -->
          <div class="billing-card-address-box">
            <span class="billing-card-tax-label">📍 Resmi Fatura Adresi</span>
            <p class="billing-card-address-text" id="billing-card-address">
              Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA
            </p>
          </div>

          <!-- İletişim & e-Fatura Detayı -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.8rem; color: #94a3b8; margin-bottom: 16px;">
            <div>
              <span style="color: #64748b;">E-Posta / e-Fatura:</span>
              <div id="billing-card-email" style="color: #e2e8f0; font-weight: 600;">muhasebe@kocasteknik.com</div>
            </div>
            <div>
              <span style="color: #64748b;">Firma Telefonu:</span>
              <div id="billing-card-phone" style="color: #e2e8f0; font-weight: 600;">+90 224 441 00 24</div>
            </div>
          </div>

          <!-- Hızlı Aksiyon Butonları -->
          <div class="billing-card-copy-box">
            <button type="button" class="btn btn-primary" id="btn-copy-billing-info" style="flex: 1; padding: 10px; font-weight: 700; background: #6366f1; border-color: #6366f1;">
              📋 Fatura Metnini Kopyala
            </button>
            <button type="button" class="btn btn-success" id="btn-whatsapp-billing-info" style="flex: 1; padding: 10px; font-weight: 700; background: #10b981; border-color: #10b981;">
              💬 WhatsApp ile Satıcıya Gönder
            </button>
            <button type="button" class="btn btn-outline" id="btn-print-billing-card" style="padding: 10px 14px;" title="Fatura kartviziti formatında yazdır">
              🖨️ Yazdır
            </button>
          </div>
        </div>

        <div style="margin-top: 14px; text-align: center;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-close-billing-card-modal-alt">
            Pencereyi Kapat
          </button>
          <button type="button" class="btn btn-outline-cyan btn-sm" id="btn-open-wizard-from-billing" style="margin-left: 8px;">
            ⚙️ Şirket & Fatura Bilgilerini Düzenle
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== 5. İLK KURULUM & ŞİRKET YAPILANDIRMA SİHİRBAZI MODALI ==================== -->
  <div class="modal-backdrop" id="onboarding-wizard-modal" style="display: none;">
    <div class="modal-card" style="max-width: 880px; width: 95%; border: 1px solid rgba(168, 85, 247, 0.4); box-shadow: 0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(168, 85, 247, 0.25);">
      <div class="modal-header" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(30, 41, 59, 0.95) 100%); border-bottom: 1px solid rgba(168, 85, 247, 0.3);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 1.8rem; background: rgba(168, 85, 247, 0.2); width: 46px; height: 46px; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(168, 85, 247, 0.4);">
            🚀
          </div>
          <div>
            <h3 style="margin: 0; color: #f3e8ff; font-size: 1.25rem; font-weight: 700;">Hızlı Şirket & Servis Kurulum Sihirbazı</h3>
            <p style="margin: 2px 0 0; font-size: 0.8rem; color: #cbd5e1;">
              Kendi firmanızın kurumsal kimliği, fatura bilgileri, teknisyenleri ve stoklarıyla sistemi 1 dakikada başlatın
            </p>
          </div>
        </div>
        <button class="modal-close" id="btn-close-wizard-modal">&times;</button>
      </div>

      <div class="modal-body" style="padding: 18px 22px; max-height: calc(85vh - 120px); overflow-y: auto;">
        
        <!-- Adım İlerleme Çubuğu (7 Adım) -->
        <div class="wizard-progress-track" id="wizard-progress-track">
          <div class="wizard-step-node active" data-step="1" id="wizard-step-node-1">
            <span class="wizard-step-num">1</span>
            <span class="wizard-step-title">Şirket & Sektör</span>
          </div>
          <div class="wizard-step-node" data-step="2" id="wizard-step-node-2">
            <span class="wizard-step-num">2</span>
            <span class="wizard-step-title">Fatura & Vergi</span>
          </div>
          <div class="wizard-step-node" data-step="3" id="wizard-step-node-3">
            <span class="wizard-step-num">3</span>
            <span class="wizard-step-title">Yönetici</span>
          </div>
          <div class="wizard-step-node" data-step="4" id="wizard-step-node-4">
            <span class="wizard-step-num">4</span>
            <span class="wizard-step-title">Saha Ekibi</span>
          </div>
          <div class="wizard-step-node" data-step="5" id="wizard-step-node-5">
            <span class="wizard-step-num">5</span>
            <span class="wizard-step-title">Stok & Depo</span>
          </div>
          <div class="wizard-step-node" data-step="6" id="wizard-step-node-6">
            <span class="wizard-step-num">6</span>
            <span class="wizard-step-title">Tarifeler</span>
          </div>
          <div class="wizard-step-node" data-step="7" id="wizard-step-node-7">
            <span class="wizard-step-num">7</span>
            <span class="wizard-step-title">Özet & Başlat</span>
          </div>
        </div>

        <!-- ==================== ADIM 1: ŞİRKET & SEKTÖR ==================== -->
        <div class="wizard-step-pane" id="wizard-pane-1" style="display: block;">
          <div style="background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
            <div style="font-size: 0.88rem; font-weight: 700; color: #e9d5ff;">🏢 1. Adım: Şirketinizin Faaliyet Alanını ve Temel Bilgilerini Belirleyin</div>
            <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">
              Aşağıdan sektörünüzü seçtiğinizde sistem otomatik olarak o sektöre uygun örnek parça, araç ve tarifeleri hazır getirecektir.
            </div>
          </div>

          <!-- Sektör Seçim Kartları -->
          <label class="form-label" style="font-weight: 700; color: #f8fafc;">Faaliyet Sektörünüzü Seçiniz:</label>
          <div class="wizard-sector-grid" id="wizard-sector-selector">
            <div class="wizard-sector-card selected" data-sector="endustriyel_otomasyon">
              <span class="wizard-sector-icon">⚡</span>
              <span class="wizard-sector-title">Endüstriyel Otomasyon</span>
              <span class="wizard-sector-desc">PLC, IGBT Sürücüler, Güç Kartları, Fabrika Hatları</span>
            </div>
            <div class="wizard-sector-card" data-sector="iklimlendirme_sogutma">
              <span class="wizard-sector-icon">❄️</span>
              <span class="wizard-sector-title">İklimlendirme & Soğutma</span>
              <span class="wizard-sector-desc">Chiller, VRF, Split Klima, Soğuk Hava Depoları</span>
            </div>
            <div class="wizard-sector-card" data-sector="biyomedikal_medikal">
              <span class="wizard-sector-icon">🔬</span>
              <span class="wizard-sector-title">Biyomedikal & Tıbbi Cihaz</span>
              <span class="wizard-sector-desc">Hasta Monitörleri, EKG, Otoklav, Laboratuvar Cihazları</span>
            </div>
            <div class="wizard-sector-card" data-sector="cnc_mekatronik">
              <span class="wizard-sector-icon">⚙️</span>
              <span class="wizard-sector-title">CNC & Mekatronik</span>
              <span class="wizard-sector-desc">Talaşlı İmalat, Vidalı Mil, Servo Sürücü, Hidrolik</span>
            </div>
            <div class="wizard-sector-card" data-sector="bilisim_elektronik">
              <span class="wizard-sector-icon">💻</span>
              <span class="wizard-sector-title">Bilişim & Elektronik</span>
              <span class="wizard-sector-desc">Sunucu, Network, Güvenlik Kamerası, UPS Güç Kaynakları</span>
            </div>
            <div class="wizard-sector-card" data-sector="kombi_beyazesya">
              <span class="wizard-sector-icon">🔥</span>
              <span class="wizard-sector-title">Kombi, Isıtma & Servis</span>
              <span class="wizard-sector-desc">Kombi Kartı, Sirkülasyon Pompası, Eşanjör, Beyaz Eşya</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 12px; margin-top: 16px;">
            <div>
              <label class="form-label">Şirket / Servis Ticari Kısa Adı *</label>
              <input type="text" id="wizard-company-name" class="form-input" value="Koçaş Teknik Servis" placeholder="Örn: Ege Soğutma Sistemleri">
            </div>
            <div>
              <label class="form-label">Merkez İl & İlçe *</label>
              <input type="text" id="wizard-company-city" class="form-input" value="Bursa / Nilüfer" placeholder="Örn: İzmir / Bornova">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 12px;">
            <div>
              <label class="form-label">Telefon Numarası</label>
              <input type="text" id="wizard-company-phone" class="form-input" value="+90 224 441 00 24" placeholder="+90 232 ...">
            </div>
            <div>
              <label class="form-label">Kurumsal E-Posta</label>
              <input type="email" id="wizard-company-email" class="form-input" value="info@kocasteknik.com" placeholder="servis@sirketiniz.com">
            </div>
            <div>
              <label class="form-label">Web Sitesi</label>
              <input type="text" id="wizard-company-website" class="form-input" value="https://kocasteknik.com" placeholder="https://sirketiniz.com">
            </div>
          </div>

          <div style="margin-top: 14px; text-align: right;">
            <button type="button" class="btn btn-outline-cyan btn-sm" id="btn-wizard-prefill-sector">
              ⚡ Seçili Sektörün Örnek Bilgilerini Doldur
            </button>
          </div>
        </div>

        <!-- ==================== ADIM 2: RESMİ FATURA & VERGİ BİLGİLERİ ==================== -->
        <div class="wizard-step-pane" id="wizard-pane-2" style="display: none;">
          <div style="background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
            <div style="font-size: 0.88rem; font-weight: 700; color: #c7d2fe;">🏛️ 2. Adım: Şirketinizin Resmi Fatura ve Vergi Bilgileri</div>
            <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">
              <strong>Zafer Bey'in Özel Saha İlkesi:</strong> Saha teknisyenleri dışarıda malzeme alırken veya harcama yaparken bu fatura bilgilerini satıcıya ibraz edebilecek ve faturaların şirketinize kesilmesini güvenceye alacaktır.
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <label class="form-label">Resmi Şirket Fatura Ünvanı (Yasal Ad) *</label>
            <input type="text" id="wizard-legal-name" class="form-input" value="Koçaş Endüstriyel Elektronik ve Otomasyon Sistemleri San. ve Tic. A.Ş." placeholder="Örn: Ege Soğutma ve İklimlendirme Sistemleri San. Tic. Ltd. Şti.">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div>
              <label class="form-label">Vergi Dairesi *</label>
              <input type="text" id="wizard-tax-office" class="form-input" value="Nilüfer Vergi Dairesi" placeholder="Örn: Bornova V.D.">
            </div>
            <div>
              <label class="form-label">Vergi Kimlik Numarası (VKN / TCKN) *</label>
              <input type="text" id="wizard-tax-id" class="form-input" value="5760129841" placeholder="Örn: 10 haneli VKN veya 11 haneli TCKN">
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <label class="form-label">Resmi Fatura Adresi *</label>
            <textarea id="wizard-billing-address" class="form-input w-100" rows="2" placeholder="Örn: Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA">Demirtaş Organize Sanayi Bölgesi (DOSAB), Yasemin Sk. No: 14 Osmangazi / BURSA</textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            <div>
              <label class="form-label">Ticaret Sicil No (Opsiyonel)</label>
              <input type="text" id="wizard-trade-reg-no" class="form-input" value="Bursa Tic. Sicil #98241" placeholder="Örn: İzmir Tic. Sicil #10293">
            </div>
            <div>
              <label class="form-label">MERSİS No (Opsiyonel)</label>
              <input type="text" id="wizard-mersis-no" class="form-input" value="0576012984100018" placeholder="Örn: 0382910492100015">
            </div>
            <div>
              <label class="form-label">e-Fatura Senaryosu</label>
              <select id="wizard-efatura-scenario" class="form-select">
                <option value="Ticari Fatura (UBL-TR 2.1)" selected>Ticari Fatura (UBL-TR 2.1)</option>
                <option value="Temel Fatura (UBL-TR 2.1)">Temel Fatura (UBL-TR 2.1)</option>
                <option value="Kamu Faturası">Kamu Faturası</option>
              </select>
            </div>
          </div>
        </div>

        <!-- ==================== ADIM 3: YÖNETİCİ HESABI ==================== -->
        <div class="wizard-step-pane" id="wizard-pane-3" style="display: none;">
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
            <div style="font-size: 0.88rem; font-weight: 700; color: #a7f3d0;">👨‍💼 3. Adım: Şirket Yöneticisi / Sistem Sorumlusu</div>
            <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">
              Sistemi tam yetkiyle yönetecek olan müdür veya şirket sahibinin erişim bilgileri.
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div>
              <label class="form-label">Yönetici Adı Soyadı *</label>
              <input type="text" id="wizard-manager-name" class="form-input" value="Zafer Koçaş" placeholder="Örn: Zafer Koçaş">
            </div>
            <div>
              <label class="form-label">Görevi / Unvanı *</label>
              <input type="text" id="wizard-manager-title" class="form-input" value="Elektronik ve Haberleşme Mühendisi / Firma Sahibi" placeholder="Örn: Servis Müdürü">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 120px; gap: 12px;">
            <div>
              <label class="form-label">Yönetici Telefonu</label>
              <input type="text" id="wizard-manager-phone" class="form-input" value="0532 999 88 77" placeholder="0532 ...">
            </div>
            <div>
              <label class="form-label">Yönetici E-Postası (Giriş İçin)</label>
              <input type="email" id="wizard-manager-email" class="form-input" value="zafer@kocasteknik.com" placeholder="yonetici@sirketiniz.com">
            </div>
            <div>
              <label class="form-label">Giriş PIN Kodu</label>
              <input type="text" id="wizard-manager-pin" class="form-input" value="1234" maxlength="6" style="font-weight: 800; text-align: center; color: #34d399;">
            </div>
          </div>
        </div>

        <!-- ==================== ADIM 4: SAHA EKİBİ & ARAÇLAR ==================== -->
        <div class="wizard-step-pane" id="wizard-pane-4" style="display: none;">
          <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <div style="font-size: 0.88rem; font-weight: 700; color: #fde68a;">🚐 4. Adım: Saha Teknisyenleri ve Zimmetli Servis Araçları</div>
              <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">
                Müşteri bildirimlerinde teknisyen adı, telefonu ve araç plakası dinamik olarak kullanılacaktır.
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-outline-warning btn-sm" id="btn-wizard-sample-tech">
                ⚡ 3 Örnek Teknisyen Doldur
              </button>
              <button type="button" class="btn btn-primary btn-sm" id="btn-wizard-add-tech-row">
                ➕ Teknisyen Ekle
              </button>
            </div>
          </div>

          <div style="max-height: 280px; overflow-y: auto;">
            <table class="mini-table">
              <thead>
                <tr>
                  <th>Teknisyen Adı Soyadı</th>
                  <th>Uzmanlık / Branş</th>
                  <th>Cep Telefonu</th>
                  <th style="width: 80px;">Mobil PIN</th>
                  <th>Zimmetli Araç & Plaka</th>
                  <th style="width: 45px; text-align: right;">Sil</th>
                </tr>
              </thead>
              <tbody id="wizard-tech-tbody">
                <!-- Dinamik JavaScript doldurur -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- ==================== ADIM 5: STOK & DEPO ==================== -->
        <div class="wizard-step-pane" id="wizard-pane-5" style="display: none;">
          <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <div style="font-size: 0.88rem; font-weight: 700; color: #bae6fd;">📦 5. Adım: Yedek Parça Envanteri & Depolar</div>
              <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">
                Seçtiğiniz sektöre uygun parçaları tek tıkla yükleyebilir veya kendi parça listenizi tanımlayabilirsiniz.
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-outline-cyan btn-sm" id="btn-wizard-load-sector-stock">
                ⚡ Sektörel Hazır Parça Paketini Yükle
              </button>
              <button type="button" class="btn btn-primary btn-sm" id="btn-wizard-add-stock-row">
                ➕ Parça Ekle
              </button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label class="form-label">Merkez Depo Adı:</label>
              <input type="text" id="wizard-main-warehouse" class="form-input" value="Bursa Merkez Depo (DOSAB)">
            </div>
            <div>
              <label class="form-label">Merkez Atölye / Laboratuvar Adı:</label>
              <input type="text" id="wizard-main-workshop" class="form-input" value="Elektronik ve Kart Test Laboratuvarı">
            </div>
          </div>

          <div style="max-height: 250px; overflow-y: auto;">
            <table class="mini-table">
              <thead>
                <tr>
                  <th style="width: 120px;">Parça Kodu</th>
                  <th>Parça Tanımı / Adı</th>
                  <th style="width: 70px;">Miktar</th>
                  <th style="width: 90px;">Birim Fiyat</th>
                  <th style="width: 80px;">Döviz</th>
                  <th style="width: 45px; text-align: right;">Sil</th>
                </tr>
              </thead>
              <tbody id="wizard-stock-tbody">
                <!-- Dinamik JavaScript doldurur -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- ==================== ADIM 6: TARİFELER ==================== -->
        <div class="wizard-step-pane" id="wizard-pane-6" style="display: none;">
          <div style="background: rgba(236, 72, 153, 0.08); border: 1px solid rgba(236, 72, 153, 0.25); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
            <div style="font-size: 0.88rem; font-weight: 700; color: #fbcfe8;">💰 6. Adım: Servis İşçilik Tarifeleri ve Garanti Şartları</div>
            <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">
              Teknisyenin sahada tek tıkla uygulayacağı standart işçilik bedelleri ve fatura temelleri.
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px;">
            <div>
              <label class="form-label">Hafif Bakım (₺)</label>
              <input type="number" id="wizard-rate-light" class="form-input" value="450" step="50">
            </div>
            <div>
              <label class="form-label">Standart Onarım (₺)</label>
              <input type="number" id="wizard-rate-standard" class="form-input" value="850" step="50">
            </div>
            <div>
              <label class="form-label">Kapsamlı Revizyon (₺)</label>
              <input type="number" id="wizard-rate-heavy" class="form-input" value="1600" step="50">
            </div>
            <div>
              <label class="form-label">Varsayılan Garanti (Ay)</label>
              <input type="number" id="wizard-warranty-months" class="form-input" value="12" min="1" max="60">
            </div>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: #94a3b8;">
            💡 <em>Bu tarifeleri daha sonra istediğiniz zaman üst menüdeki <strong>⚙️ Ayarlar</strong> bölümünden değiştirebilir veya yeni tarifeler ekleyebilirsiniz.</em>
          </div>
        </div>

        <!-- ==================== ADIM 7: ÖZET & BAŞLAT ==================== -->
        <div class="wizard-step-pane" id="wizard-pane-7" style="display: none;">
          <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(30, 41, 59, 0.9) 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 10px; padding: 16px 20px; margin-bottom: 16px;">
            <div style="font-size: 1.05rem; font-weight: 700; color: #34d399; display: flex; align-items: center; gap: 8px;">
              <span>🎉 Tebrikler! Kurulum Özeti Hazır</span>
            </div>
            <div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 4px;">
              Aşağıdaki bilgiler sisteme işlenecek ve tüm ekranlar yeni şirket kimliğinizle canlıya alınacaktır.
            </div>
          </div>

          <!-- Canlı Özet Kartları Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px;">
              <span style="font-size: 0.74rem; color: #a78bfa; font-weight: 700; text-transform: uppercase;">🏢 Şirket & Fatura Profili</span>
              <div id="summary-company-title" style="font-size: 0.95rem; font-weight: 800; color: #f8fafc; margin-top: 4px;">Koçaş Teknik Servis</div>
              <div id="summary-legal-title" style="font-size: 0.78rem; color: #cbd5e1; margin-top: 2px;">Koçaş Endüstriyel Elektronik A.Ş.</div>
              <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 6px;">
                VKN: <span id="summary-vkn" style="color: #38bdf8; font-weight: 700;">5760129841</span> • VD: <span id="summary-tax-office" style="color: #cbd5e1;">Nilüfer</span>
              </div>
              <div id="summary-address" style="font-size: 0.72rem; color: #94a3b8; margin-top: 4px; line-height: 1.35;">DOSAB / BURSA</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px;">
              <span style="font-size: 0.74rem; color: #34d399; font-weight: 700; text-transform: uppercase;">👥 Operasyon & Saha Gücü</span>
              <div style="font-size: 0.95rem; font-weight: 800; color: #f8fafc; margin-top: 4px;">
                Yönetici: <span id="summary-manager">Zafer Koçaş</span>
              </div>
              <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 4px;">
                Saha Kadrosu: <span id="summary-tech-count" style="color: #34d399; font-weight: 700;">3 Teknisyen</span> • <span id="summary-vehicle-count" style="color: #38bdf8; font-weight: 700;">3 Araç</span>
              </div>
              <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 4px;">
                Yedek Parça Stoğu: <span id="summary-stock-count" style="color: #fbbf24; font-weight: 700;">6 Kalem Parça</span>
              </div>
              <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px;">
                Tarife: Standart Onarım <span id="summary-rate" style="color: #34d399; font-weight: 700;">850 ₺</span>
              </div>
            </div>
          </div>

          <div style="background: rgba(99, 102, 241, 0.08); border: 1px dashed rgba(167, 139, 250, 0.4); border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.82rem; color: #e2e8f0;">
              <input type="checkbox" id="wizard-backup-demo-check" checked style="width: 16px; height: 16px; accent-color: #8b5cf6;">
              <span>Mevcut demo verilerini yedekle (Üst menüdeki çoklu şirket değiştirici ile dilediğinizde orijinal Koçaş Teknik demo verilerine geri dönebilirsiniz).</span>
            </label>
          </div>
        </div>

      </div>

      <!-- Sihirbaz Alt Navigasyon Çubuğu -->
      <div class="modal-footer" style="padding: 14px 20px; background: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center;">
        <button type="button" class="btn btn-secondary btn-sm" id="btn-wizard-cancel">
          ✕ İptal / Kapat
        </button>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-outline btn-sm" id="btn-wizard-prev" style="display: none;">
            ⬅️ Geri
          </button>
          <button type="button" class="btn btn-primary btn-sm" id="btn-wizard-next">
            İleri ➡️
          </button>
          <button type="button" class="btn btn-success btn-sm" id="btn-wizard-finish" style="display: none; background: #10b981; border-color: #10b981; font-weight: 700; padding: 6px 18px;">
            🚀 Kurulumu Tamamla ve Servisimi Başlat
          </button>
        </div>
      </div>
    </div>
  </div>
'''

if 'id="onboarding-wizard-modal"' not in html:
    idx_body_close = html.rfind('</body>')
    if idx_body_close != -1:
        html = html[:idx_body_close] + modals_html + '\n' + html[idx_body_close:]
        print('Modals added before </body>!')
    else:
        print('Could not find </body>!')

with open('Projeler/AI_Teknik_Servis_Yonetimi/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated index.html successfully!')

