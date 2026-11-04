# -*- coding: utf-8 -*-
import os

path_app = r'app.js'
with open(path_app, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add Serdar Yılmaz to initial state.staff
serdar_entry = '''    {
      id: 15,
      name: "Serdar Yılmaz",
      role: "Atölye & Laboratuvar Şefi",
      specialty: "Mikroelektronik, SMD & BGA Çip Onarımı",
      status: "Müsait",
      location: "🏢 Merkez Servis Atölyesi / Laboratuvar",
      baseAddress: "🏢 Merkez Servis Atölyesi / Laboratuvar",
      vehiclePlate: "🏢 Merkez Atölye (Sabit)",
      avatar: "SY",
      distanceKm: 0.0,
      staffType: "workshop"
    },
'''

old_levent = '''    {
      id: 12,
      name: "Levent İmekci",'''

if old_levent in code:
    code = code.replace(old_levent, serdar_entry + old_levent, 1)
    print('1. Serdar Yılmaz added to state.staff.')
else:
    print('1. Target for Serdar Yılmaz not found!')

# 2. Add initSendToWorkshopModal call around line 543
old_init_call = '''    initPartHoldModal();'''
new_init_call = '''    initPartHoldModal();
    if (typeof initSendToWorkshopModal === 'function') initSendToWorkshopModal();'''

if old_init_call in code:
    code = code.replace(old_init_call, new_init_call, 1)
    print('2. initSendToWorkshopModal call added.')
else:
    print('2. Target for initSendToWorkshopModal not found!')

# 3. Update staff-container rendering for workshop staff (renderStaffList)
old_staff_plate = '''          <div class="staff-meta-chip staff-vehicle-chip" data-id="${person.id}" title="Personelin araç zimmetini değiştir veya aracı geri al">
            <span>🚗</span>
            <span>Araç: <strong class="${person.vehiclePlate === 'Zimmetsiz' ? 'text-amber' : 'text-cyan'}">${person.vehiclePlate}</strong></span>
            <span class="badge ${person.vehiclePlate === 'Zimmetsiz' ? 'badge-warning' : 'badge-secondary'}" style="font-size: 0.68rem; margin-left: 4px; padding: 1px 5px;">
              ${person.vehiclePlate === 'Zimmetsiz' ? '➕ Araç Ver' : '🔄 Değiştir/Al'}
            </span>
          </div>'''

new_staff_plate = '''          <div class="staff-meta-chip staff-vehicle-chip" data-id="${person.id}" title="${(person.staffType === 'workshop' || (person.role && person.role.includes('Atölye'))) ? 'Atölye ve laboratuvar tezgâh birimi' : 'Personelin araç zimmetini değiştir veya aracı geri al'}">
            <span>${(person.staffType === 'workshop' || (person.role && person.role.includes('Atölye'))) ? '🏢' : '🚗'}</span>
            <span>${(person.staffType === 'workshop' || (person.role && person.role.includes('Atölye'))) ? 'Birim' : 'Araç'}: <strong class="${person.vehiclePlate === 'Zimmetsiz' ? 'text-amber' : 'text-cyan'}">${person.vehiclePlate}</strong></span>
            ${(person.staffType === 'workshop' || (person.role && person.role.includes('Atölye'))) ? '<span class=\"badge badge-secondary\" style=\"font-size: 0.68rem; margin-left: 4px; padding: 1px 5px;\">Merkez Lab</span>' : `<span class=\"badge ${person.vehiclePlate === 'Zimmetsiz' ? 'badge-warning' : 'badge-secondary'}\" style=\"font-size: 0.68rem; margin-left: 4px; padding: 1px 5px;\">
              ${person.vehiclePlate === 'Zimmetsiz' ? '➕ Araç Ver' : '🔄 Değiştir/Al'}
            </span>`}
          </div>'''

if old_staff_plate in code:
    code = code.replace(old_staff_plate, new_staff_plate, 1)
    print('3. renderStaffList workshop chip updated.')
else:
    print('3. renderStaffList target not matched!')

# 4. Update updateTechJourneyUI
old_journey = '''  const btnOnTheWay = document.getElementById('btn-tech-on-the-way');
  const btnArrived = document.getElementById('btn-tech-arrived');
  const btnCompleteBanner = document.getElementById('btn-tech-complete-banner');
  const btnHoldBanner = document.getElementById('btn-tech-hold-banner');
  const btnResumeBanner = document.getElementById('btn-tech-resume-banner');
  const btnViewReportBanner = document.getElementById('btn-tech-view-report-banner');
  const btnResetLifecycle = document.getElementById('btn-tech-reset-lifecycle');'''

new_journey = '''  const btnOnTheWay = document.getElementById('btn-tech-on-the-way');
  const btnArrived = document.getElementById('btn-tech-arrived');
  const btnCompleteBanner = document.getElementById('btn-tech-complete-banner');
  const btnHoldBanner = document.getElementById('btn-tech-hold-banner');
  const btnResumeBanner = document.getElementById('btn-tech-resume-banner');
  const btnWorkshopBanner = document.getElementById('btn-tech-workshop-banner');
  const btnStartWorkshopBanner = document.getElementById('btn-tech-start-workshop-banner');
  const btnViewReportBanner = document.getElementById('btn-tech-view-report-banner');
  const btnResetLifecycle = document.getElementById('btn-tech-reset-lifecycle');'''

if old_journey in code:
    code = code.replace(old_journey, new_journey, 1)
    print('4. updateTechJourneyUI button variables added.')
else:
    print('4. updateTechJourneyUI button variables target not matched!')

# In step 1 of updateTechJourneyUI:
old_step1 = '''    if (btnOnTheWay) btnOnTheWay.style.display = 'inline-flex';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnHoldBanner) btnHoldBanner.style.display = 'none';
    if (btnResumeBanner) btnResumeBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'none';
    if (durationBadge) durationBadge.style.display = 'none';
    if (pulse) pulse.style.background = '#64748B';
    if (departedText) departedText.textContent = '⏳ İntikal Bekliyor (Henüz yola çıkılmadı)';
    if (durationText) durationText.textContent = '';'''

new_step1 = '''    const isWorkshopOrder = order.repair_location === 'workshop' || order.channel === 'Elden Teslim' || (order.status && order.status.includes('Atölye'));
    if (isWorkshopOrder) {
      if (btnOnTheWay) btnOnTheWay.style.display = 'none';
      if (btnStartWorkshopBanner) btnStartWorkshopBanner.style.display = 'inline-flex';
      if (departedText) departedText.textContent = '🏢 Merkez Atölyede (Cihaz Tezgâhta Kabul Edildi)';
    } else {
      if (btnOnTheWay) btnOnTheWay.style.display = 'inline-flex';
      if (btnStartWorkshopBanner) btnStartWorkshopBanner.style.display = 'none';
      if (departedText) departedText.textContent = '⏳ İntikal Bekliyor (Henüz yola çıkılmadı)';
    }
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnHoldBanner) btnHoldBanner.style.display = 'none';
    if (btnWorkshopBanner) btnWorkshopBanner.style.display = 'none';
    if (btnResumeBanner) btnResumeBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'none';
    if (durationBadge) durationBadge.style.display = 'none';
    if (pulse) pulse.style.background = isWorkshopOrder ? '#0891b2' : '#64748B';
    if (durationText) durationText.textContent = isWorkshopOrder ? '• 🔬 Tezgâh Onarımı Bekleniyor' : '';'''

if old_step1 in code:
    code = code.replace(old_step1, new_step1, 1)
    print('5. updateTechJourneyUI Step 1 updated.')
else:
    print('5. updateTechJourneyUI Step 1 target not matched!')

# In step 3-B of updateTechJourneyUI:
old_step3 = '''    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'inline-flex'; // TEZGAHIN TEPESİNDE BİTİRME BUTONU
    if (btnHoldBanner) btnHoldBanner.style.display = 'inline-flex'; // PARÇA BEKLEMEYE AL BUTONU
    if (btnResumeBanner) btnResumeBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';'''

new_step3 = '''    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnStartWorkshopBanner) btnStartWorkshopBanner.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'inline-flex'; // TEZGAHIN TEPESİNDE BİTİRME BUTONU
    if (btnHoldBanner) btnHoldBanner.style.display = 'inline-flex'; // PARÇA BEKLEMEYE AL BUTONU
    if (order.repair_location !== 'workshop' && order.channel !== 'Elden Teslim' && !status.includes('Atölye')) {
      if (btnWorkshopBanner) btnWorkshopBanner.style.display = 'inline-flex'; // CİHAZI ATÖLYEYE AL BUTONU
    } else {
      if (btnWorkshopBanner) btnWorkshopBanner.style.display = 'none';
    }
    if (btnResumeBanner) btnResumeBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';'''

if old_step3 in code:
    code = code.replace(old_step3, new_step3, 1)
    print('6. updateTechJourneyUI Step 3 updated.')
else:
    print('6. updateTechJourneyUI Step 3 target not matched!')

# Also handle Atölyeye Alındı status in updateTechJourneyUI
old_step4_marker = '''  // 4. Durum: Tamamlandı
  else if (status === 'Tamamlandı') {'''

workshop_step = '''  // 3-C. Durum: Sahadan Merkez Atölyeye Sevk Edildi
  else if (status === 'Atölyeye Alındı / Lab Onarımında' || status.includes('Atölye')) {
    setStepStyle(nodeAccepted, 'completed');
    setStepStyle(nodeOnTheWay, 'completed');
    setStepStyle(nodeRepair, 'active');
    if (nodeRepair) {
      nodeRepair.innerHTML = `<span style="font-size: 0.95rem;">🏢</span> <span>3. Atölye Lab Onarımı</span>`;
    }
    setStepStyle(nodeCompleted, 'inactive');

    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnStartWorkshopBanner) btnStartWorkshopBanner.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'inline-flex';
    if (btnHoldBanner) btnHoldBanner.style.display = 'inline-flex';
    if (btnWorkshopBanner) btnWorkshopBanner.style.display = 'none';
    if (btnResumeBanner) btnResumeBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';

    if (durationBadge) {
      durationBadge.style.display = 'inline-block';
      durationBadge.className = 'badge badge-primary';
      durationBadge.textContent = '🏢 Atölye Lab Onarımında';
    }
    if (pulse) pulse.style.background = '#06B6D4';
    const reasonText = order.workshop_transfer_reason ? (order.workshop_transfer_reason.length > 50 ? order.workshop_transfer_reason.slice(0, 50) + '...' : order.workshop_transfer_reason) : 'Merkez Atölye Tezgâh Onarımı';
    if (departedText) departedText.innerHTML = `🏢 Cihaz Merkez Atölyede: <strong>${reasonText}</strong>`;
    if (durationText) durationText.innerHTML = `• 🔬 Lab İnceleme ve Test Sürüyor`;
  }
  ''' + old_step4_marker

if old_step4_marker in code:
    code = code.replace(old_step4_marker, workshop_step, 1)
    print('7. updateTechJourneyUI Workshop step added.')
else:
    print('7. Target for updateTechJourneyUI Workshop step not found!')

# 8. Update renderIncomingCalls for workshop actions
old_call_assign = '''                <button class="btn btn-primary btn-sm btn-call-assign" data-code="${code}" style="padding: 3px 8px; font-size: 0.75rem;" title="Görevi saha personeline sevk et ve ata">
                  ⚡ Uzmana Ata
                </button>'''

new_call_assign = '''                <button class="btn btn-primary btn-sm btn-call-assign" data-code="${code}" style="padding: 3px 8px; font-size: 0.75rem;" title="${(order.repair_location === 'workshop' || order.channel === 'Elden Teslim' || (order.status && order.status.includes('Atölye'))) ? 'Görevi atölye laboratuvar uzmanına sevk et ve tezgâha ata' : 'Görevi saha personeline sevk et ve ata'}">
                  ${(order.repair_location === 'workshop' || order.channel === 'Elden Teslim' || (order.status && order.status.includes('Atölye'))) ? '🏢 Atölye Uzmanına Ata' : '⚡ Uzmana Ata'}
                </button>'''

if old_call_assign in code:
    code = code.replace(old_call_assign, new_call_assign, 1)
    print('8. renderIncomingCalls assign button updated for workshop.')
else:
    print('8. renderIncomingCalls target not matched!')

# 9. Update updateDispatchBanner for workshop orders
old_unassigned_banner_btn = '''        <button class="btn btn-primary btn-sm" id="btn-smart-dispatch" data-code="${code}">
          ⚡ En Yakın Uzmana Ata
        </button>'''

new_unassigned_banner_btn = '''        <button class="btn btn-primary btn-sm" id="btn-smart-dispatch" data-code="${code}">
          ${(order && (order.repair_location === 'workshop' || order.channel === 'Elden Teslim' || (order.status && order.status.includes('Atölye')))) ? '🏢 Atölye Uzmanına Ata' : '⚡ En Yakın Uzmana Ata'}
        </button>'''

if old_unassigned_banner_btn in code:
    code = code.replace(old_unassigned_banner_btn, new_unassigned_banner_btn, 1)
    print('9. updateDispatchBanner button updated.')
else:
    print('9. updateDispatchBanner button target not matched!')

# In assignedTech banner:
old_assigned_banner_header = '''          <span class="dispatch-badge" style="background: rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.4);">
            ✓ Göreve Sevk Edildi #${code}
          </span>
          <span class="badge badge-success">✓ Saha Uzmanı Görevlendirildi (${order && order.status ? order.status : 'Yolda'})</span>'''

new_assigned_banner_header = '''          <span class="dispatch-badge" style="background: ${(order && (order.repair_location === 'workshop' || (order.status && order.status.includes('Atölye')))) ? 'rgba(6, 182, 212, 0.2); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.4);' : 'rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.4);'}">
            ${(order && (order.repair_location === 'workshop' || (order.status && order.status.includes('Atölye')))) ? `🏢 Atölye Tezgâhına Sevk Edildi #${code}` : `✓ Göreve Sevk Edildi #${code}`}
          </span>
          <span class="badge ${(order && (order.repair_location === 'workshop' || (order.status && order.status.includes('Atölye')))) ? 'badge-primary' : 'badge-success'}">
            ${(order && (order.repair_location === 'workshop' || (order.status && order.status.includes('Atölye')))) ? `✓ Atölye Uzmanı Görevlendirildi (${order.status || 'Atölyede'})` : `✓ Saha Uzmanı Görevlendirildi (${order && order.status ? order.status : 'Yolda'})`}
          </span>'''

if old_assigned_banner_header in code:
    code = code.replace(old_assigned_banner_header, new_assigned_banner_header, 1)
    print('10. updateDispatchBanner assigned header updated.')
else:
    print('10. updateDispatchBanner assigned header target not matched!')

# 11. Update Quick Intake Form (#form-quick-intake)
old_intake_submit = '''          const newOrder = {
            id: codeNum,
            tracking_code: trackingCode,
            code: trackingCode,
            channel: channel,
            priority: priority,
            customer_name: custName,
            customer_phone: custPhone,
            customer_address: custAddr,
            device_brand: devBrand,
            device_model: devModel,
            device: `${devBrand} ${devModel}`,
            serial_number: serialNo,
            customer_complaint: `[${channel} Çağrısı] ${complaint}`,
            status: "Kabul Edildi",
            assigned_tech: null,
            assigned_user_id: null,'''

new_intake_submit = '''          const isWorkshopIntake = channel === 'Elden Teslim';
          const finalAddr = custAddr || (isWorkshopIntake ? "🏢 Merkez Servis Atölyesi (Elden Teslim)" : "İstanbul");
          const finalStatus = isWorkshopIntake ? "Kabul Edildi (Atölyede)" : "Kabul Edildi";
          const finalLoc = isWorkshopIntake ? "🏢 Merkez Servis Atölyesi / Laboratuvar" : "Müşteri Adresinde";

          const newOrder = {
            id: codeNum,
            tracking_code: trackingCode,
            code: trackingCode,
            channel: channel,
            priority: priority,
            customer_name: custName,
            customer_phone: custPhone,
            customer_address: finalAddr,
            device_brand: devBrand,
            device_model: devModel,
            device: `${devBrand} ${devModel}`,
            serial_number: serialNo,
            customer_complaint: `[${channel} Çağrısı] ${complaint}`,
            status: finalStatus,
            repair_location: isWorkshopIntake ? 'workshop' : 'field',
            device_current_location: finalLoc,
            assigned_tech: null,
            assigned_user_id: null,'''

if old_intake_submit in code:
    code = code.replace(old_intake_submit, new_intake_submit, 1)
    print('11. quick-intake submit updated for workshop/Elden Teslim.')
else:
    print('11. quick-intake submit target not matched!')

# Also add intake-channel change listener:
old_intake_modal_setup = '''    if (btnOpenIntake && intakeModal) {
      btnOpenIntake.addEventListener('click', () => {'''

intake_channel_listener = '''    const intakeChannelSel = document.getElementById('intake-channel');
    if (intakeChannelSel) {
      intakeChannelSel.addEventListener('change', () => {
        const isElden = intakeChannelSel.value === 'Elden Teslim';
        const addrInput = document.getElementById('intake-cust-address');
        const submitBtn = document.getElementById('btn-submit-intake');
        if (isElden) {
          if (addrInput && !addrInput.value) addrInput.value = "🏢 Merkez Servis Atölyesi (Elden Teslim)";
          if (submitBtn) submitBtn.innerHTML = `<span>🏢 Cihazı Atölyeye Kabul Et & Tezgâha Sevk Et</span>`;
        } else {
          if (submitBtn) submitBtn.innerHTML = `<span>💾 Çağrıyı Kaydet & Göreve Ata</span>`;
        }
      });
    }
'''

if old_intake_modal_setup in code:
    code = code.replace(old_intake_modal_setup, intake_channel_listener + '\n' + old_intake_modal_setup, 1)
    print('12. intake-channel change listener added.')
else:
    print('12. Target for intake-channel change listener not found!')

# 13. Update Settings Tab 2 (#form-new-staff)
old_staff_submit = '''      const newId = Date.now();
      const avatar = name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();

      if (!state.staff) state.staff = [];
      state.staff.push({
        id: newId,
        name: name,
        role: role,
        specialty: specialty,
        location: address,
        baseAddress: address,
        phone: phone,
        email: email,
        tc: tc,
        sgk: sgk,
        vehiclePlate: plate,
        pin: pin,
        avatar: avatar,
        status: "Müsait",
        distanceKm: 5.0
      });'''

new_staff_submit = '''      const newId = Date.now();
      const avatar = name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
      const isWorkshop = role.includes('Atölye') || role.includes('Laboratuvar') || specialty.includes('Atölye') || specialty.includes('Laboratuvar');
      const finalPlate = ((plate === 'Zimmetsiz' || !plate) && isWorkshop) ? '🏢 Merkez Atölye (Sabit)' : plate;
      const finalLoc = (!address && isWorkshop) ? '🏢 Merkez Servis Atölyesi / Laboratuvar' : (address || 'Bölge Belirtilmedi');
      const staffType = isWorkshop ? 'workshop' : 'field';

      if (!state.staff) state.staff = [];
      state.staff.push({
        id: newId,
        name: name,
        role: role,
        specialty: specialty,
        location: finalLoc,
        baseAddress: finalLoc,
        phone: phone,
        email: email,
        tc: tc,
        sgk: sgk,
        vehiclePlate: finalPlate,
        pin: pin,
        avatar: avatar,
        status: "Müsait",
        distanceKm: isWorkshop ? 0.0 : 5.0,
        staffType: staffType
      });'''

if old_staff_submit in code:
    code = code.replace(old_staff_submit, new_staff_submit, 1)
    print('13. form-new-staff submit updated for workshop.')
else:
    print('13. form-new-staff submit target not matched!')

# 14. Update loadStaffFromLocalStorage to ensure workshop specialist exists
old_load_staff = '''function loadStaffFromLocalStorage() {
  try {
    const appMode = localStorage.getItem('servisai_app_mode');
    const saved = localStorage.getItem('servisai_staff');
    const terminated = JSON.parse(localStorage.getItem('servisai_staff_terminated') || '[]');
    if (appMode === 'clean') {
      if (saved) {
        state.staff = JSON.parse(saved) || [];
      }
      return;
    }'''

new_load_staff = '''function loadStaffFromLocalStorage() {
  try {
    const appMode = localStorage.getItem('servisai_app_mode');
    const saved = localStorage.getItem('servisai_staff');
    const terminated = JSON.parse(localStorage.getItem('servisai_staff_terminated') || '[]');
    if (appMode === 'clean') {
      if (saved) {
        state.staff = JSON.parse(saved) || [];
      }
      const hasWorkshopClean = (state.staff || []).some(s => s.staffType === 'workshop' || (s.role && (s.role.includes('Atölye') || s.role.includes('Laboratuvar'))));
      if (!hasWorkshopClean && !terminated.includes(15)) {
        state.staff.push({
          id: 15,
          name: "Serdar Yılmaz",
          role: "Atölye & Laboratuvar Şefi",
          specialty: "Mikroelektronik, SMD & BGA Çip Onarımı",
          status: "Müsait",
          location: "🏢 Merkez Servis Atölyesi / Laboratuvar",
          baseAddress: "🏢 Merkez Servis Atölyesi / Laboratuvar",
          vehiclePlate: "🏢 Merkez Atölye (Sabit)",
          avatar: "SY",
          distanceKm: 0.0,
          staffType: "workshop"
        });
      }
      return;
    }'''

if old_load_staff in code:
    code = code.replace(old_load_staff, new_load_staff, 1)
    print('14. loadStaffFromLocalStorage clean mode updated.')
else:
    print('14. loadStaffFromLocalStorage clean mode target not matched!')

# In normal mode of loadStaffFromLocalStorage, check if Serdar Yılmaz is kept
old_load_staff_end = '''        state.staff = merged.filter(s => s.status !== 'Ayrıldı' && !terminated.includes(s.id));
        populateMapTechDropdown();
        return;'''

new_load_staff_end = '''        const hasWorkshopNormal = merged.some(s => s.staffType === 'workshop' || (s.role && (s.role.includes('Atölye') || s.role.includes('Laboratuvar'))));
        if (!hasWorkshopNormal && !terminated.includes(15)) {
          merged.push({
            id: 15,
            name: "Serdar Yılmaz",
            role: "Atölye & Laboratuvar Şefi",
            specialty: "Mikroelektronik, SMD & BGA Çip Onarımı",
            status: "Müsait",
            location: "🏢 Merkez Servis Atölyesi / Laboratuvar",
            baseAddress: "🏢 Merkez Servis Atölyesi / Laboratuvar",
            vehiclePlate: "🏢 Merkez Atölye (Sabit)",
            avatar: "SY",
            distanceKm: 0.0,
            staffType: "workshop"
          });
        }
        state.staff = merged.filter(s => s.status !== 'Ayrıldı' && !terminated.includes(s.id));
        populateMapTechDropdown();
        return;'''

if old_load_staff_end in code:
    code = code.replace(old_load_staff_end, new_load_staff_end, 1)
    print('15. loadStaffFromLocalStorage normal mode updated.')
else:
    print('15. loadStaffFromLocalStorage normal mode target not matched!')

# 16. Update openDispatchAssignModal
old_dispatch_modal = '''  if (chanEl) {
    const channelIcon = channel === 'WhatsApp' ? '💬 WhatsApp Talebi' :
                        channel === 'E-posta' ? '✉️ E-posta Talebi' :
                        channel === 'Elden Teslim' ? '🏢 Elden Teslim' : '📞 Telefon Çağrısı';
    chanEl.textContent = channelIcon;
  }'''

new_dispatch_modal = '''  const isWorkshopJob = order.repair_location === 'workshop' || 
                        order.channel === 'Elden Teslim' || 
                        (order.status && (order.status.includes('Atölye') || order.status.includes('Atolyede'))) ||
                        (order.customer_address && (order.customer_address.includes('Atölye') || order.customer_address.includes('Elden')));

  const isWorkshopStaff = (s) => (s && s.staffType === 'workshop') || 
                                 (s && s.role && (s.role.includes('Atölye') || s.role.includes('Laboratuvar'))) ||
                                 (s && s.specialty && (s.specialty.includes('Atölye') || s.specialty.includes('Laboratuvar')));

  if (chanEl) {
    const channelIcon = isWorkshopJob ? '🏢 Elden Teslim (Merkez Atölye)' :
                        channel === 'WhatsApp' ? '💬 WhatsApp Talebi' :
                        channel === 'E-posta' ? '✉️ E-posta Talebi' :
                        channel === 'Elden Teslim' ? '🏢 Elden Teslim' : '📞 Telefon Çağrısı';
    chanEl.textContent = channelIcon;
  }'''

if old_dispatch_modal in code:
    code = code.replace(old_dispatch_modal, new_dispatch_modal, 1)
    print('16. openDispatchAssignModal isWorkshopJob detection added.')
else:
    print('16. openDispatchAssignModal target not matched!')

# Update confirmBtn in openDispatchAssignModal
old_confirm_btn = '''  if (confirmBtn) {
    confirmBtn.innerHTML = sourceStaffId 
      ? `<span>🔄 Görevi Yeni Uzmana Aktar & Devret</span>` 
      : `<span>⚡ Seçilen Uzmana Görevi Sevk Et & Ata</span>`;
  }'''

new_confirm_btn = '''  if (confirmBtn) {
    confirmBtn.innerHTML = isWorkshopJob
      ? `<span>🏢 Atölye Uzmanına Tezgâh Görevini Sevk Et & Ata</span>`
      : (sourceStaffId 
          ? `<span>🔄 Görevi Yeni Uzmana Aktar & Devret</span>` 
          : `<span>⚡ Seçilen Uzmana Görevi Sevk Et & Ata</span>`);
  }'''

if old_confirm_btn in code:
    code = code.replace(old_confirm_btn, new_confirm_btn, 1)
    print('17. openDispatchAssignModal confirmBtn updated.')
else:
    print('17. openDispatchAssignModal confirmBtn target not matched!')

# Update candidate scoring and sorting in openDispatchAssignModal
old_calc_loop = '''  availableStaff.forEach(s => {
    if (sourceStaffId && s.id === sourceStaffId) return; // Kaynak personele geri devretmeyi ilk tercih yapma

    const assignedJobs = (state.staffJobs && state.staffJobs[s.id]) ? state.staffJobs[s.id].filter(j => j.status !== 'Tamamlandı') : [];
    const jobCount = assignedJobs.length;
    
    // Canlı konum ve hedef çağrı adresine göre dinamik mesafe hesabı:
    const liveLoc = getStaffLiveLocationAndDistance(s, custAddr);
    staffDistances.set(s.id, liveLoc);
    const distance = liveLoc.distanceKm;

    let score = (s.status === 'Müsait' ? 0 : s.status === 'Görevde' ? 10 : 15) + (jobCount * 5) + distance;
    if (score < minScore) {
      minScore = score;
      bestCandidate = s;
    }
  });'''

new_calc_loop = '''  availableStaff.forEach(s => {
    if (sourceStaffId && s.id === sourceStaffId) return;

    const assignedJobs = (state.staffJobs && state.staffJobs[s.id]) ? state.staffJobs[s.id].filter(j => j.status !== 'Tamamlandı') : [];
    const jobCount = assignedJobs.length;
    const isWStaff = isWorkshopStaff(s);

    let distance = 0;
    let liveLoc = null;

    if (isWorkshopJob) {
      if (isWStaff) {
        distance = 0.0;
        liveLoc = { distanceKm: 0.0, locationLabel: "Merkez Atölye Tezgâhı" };
      } else {
        liveLoc = getStaffLiveLocationAndDistance(s, custAddr);
        distance = liveLoc.distanceKm;
      }
    } else {
      liveLoc = getStaffLiveLocationAndDistance(s, custAddr);
      distance = liveLoc.distanceKm;
    }
    staffDistances.set(s.id, liveLoc);

    let score = 0;
    if (isWorkshopJob) {
      if (isWStaff) {
        score = (s.status === 'Müsait' ? -100 : 0) + (jobCount * 5);
      } else {
        score = 60 + (s.status === 'Müsait' ? 0 : 10) + (jobCount * 5) + distance;
      }
    } else {
      if (isWStaff) {
        score = 120 + (s.status === 'Müsait' ? 0 : 10) + (jobCount * 5);
      } else {
        score = (s.status === 'Müsait' ? 0 : s.status === 'Görevde' ? 10 : 15) + (jobCount * 5) + distance;
      }
    }

    if (score < minScore) {
      minScore = score;
      bestCandidate = s;
    }
  });'''

if old_calc_loop in code:
    code = code.replace(old_calc_loop, new_calc_loop, 1)
    print('18. openDispatchAssignModal candidate scoring updated.')
else:
    print('18. openDispatchAssignModal candidate scoring target not matched!')

# Update candidate rendering in openDispatchAssignModal
old_card_map = '''  candidatesContainer.innerHTML = availableStaff.map(s => {
    const isSource = sourceStaffId && s.id === sourceStaffId;
    const isRecommended = bestCandidate && s.id === bestCandidate.id && !isSource;
    const isSelected = s.id === selectedAssignTechId;

    const assignedJobs = (state.staffJobs && state.staffJobs[s.id]) ? state.staffJobs[s.id].filter(j => j.status !== 'Tamamlandı') : [];
    const activeJobCount = assignedJobs.length;

    const liveLoc = staffDistances.get(s.id) || getStaffLiveLocationAndDistance(s, custAddr);
    const distText = liveLoc.distanceKm.toFixed(1);

    const statusBadge = s.status === 'Müsait' ? 'badge-success' :
                        s.status === 'Görevde' ? 'badge-primary' : 'badge-warning';

    return `
      <div class="assign-tech-card ${isSelected ? 'is-selected' : ''}" data-staff-id="${s.id}" style="${isSource ? 'opacity: 0.7;' : ''}">
        <div class="assign-tech-left">
          <div class="assign-radio-indicator"></div>
          <div class="assign-tech-avatar">${s.avatar || s.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="assign-tech-details">
            <div class="assign-tech-name-row">
              <span class="assign-tech-name">${s.name}</span>
              ${isRecommended ? '<span class="badge-recommended">⭐ AI Sistem Önerisi</span>' : ''}
              ${isSource ? '<span class="badge badge-secondary" style="font-size: 0.7rem;">(Mevcut Görevli - Devrediliyor)</span>' : ''}
              <span class="badge ${statusBadge}">${s.status}</span>
            </div>
            <span class="assign-tech-sub">${s.role} (${s.specialty || 'Saha'}) • 🚗 ${s.vehiclePlate || 'Zimmetsiz'} • 📍 <strong>${distText} km</strong> uzakta <em style="color:#94a3b8; font-size:0.75rem;">(${liveLoc.locationLabel})</em></span>
          </div>
        </div>
        <div class="assign-tech-right">
          <span class="assign-tech-jobs-badge badge ${activeJobCount === 0 ? 'badge-success' : activeJobCount <= 2 ? 'badge-secondary' : 'badge-warning'}">
            📋 ${activeJobCount} Aktif Görev
          </span>
        </div>
      </div>
    `;
  }).join('');'''

new_card_map = '''  const sortedStaff = [...availableStaff].sort((a, b) => {
    if (isWorkshopJob) {
      const aW = isWorkshopStaff(a);
      const bW = isWorkshopStaff(b);
      if (aW && !bW) return -1;
      if (!aW && bW) return 1;
    }
    return 0;
  });

  candidatesContainer.innerHTML = sortedStaff.map(s => {
    const isSource = sourceStaffId && s.id === sourceStaffId;
    const isRecommended = bestCandidate && s.id === bestCandidate.id && !isSource;
    const isSelected = s.id === selectedAssignTechId;
    const isWStaff = isWorkshopStaff(s);

    const assignedJobs = (state.staffJobs && state.staffJobs[s.id]) ? state.staffJobs[s.id].filter(j => j.status !== 'Tamamlandı') : [];
    const activeJobCount = assignedJobs.length;

    const liveLoc = staffDistances.get(s.id) || getStaffLiveLocationAndDistance(s, custAddr);
    const distText = (isWStaff && isWorkshopJob) ? '0.0' : liveLoc.distanceKm.toFixed(1);
    const locLabel = (isWStaff && isWorkshopJob) ? 'Merkez Atölye Tezgâhı' : liveLoc.locationLabel;
    const vehicleStation = isWStaff 
      ? `🏢 ${s.vehiclePlate && s.vehiclePlate.includes('Atölye') ? s.vehiclePlate : 'Merkez Atölye (Sabit)'}`
      : `🚗 ${s.vehiclePlate || 'Zimmetsiz'}`;

    const statusBadge = s.status === 'Müsait' ? 'badge-success' :
                        s.status === 'Görevde' ? 'badge-primary' : 'badge-warning';

    return `
      <div class="assign-tech-card ${isSelected ? 'is-selected' : ''}" data-staff-id="${s.id}" style="${isSource ? 'opacity: 0.7;' : ''}">
        <div class="assign-tech-left">
          <div class="assign-radio-indicator"></div>
          <div class="assign-tech-avatar" style="${isWStaff ? 'background: linear-gradient(135deg, rgba(6,182,212,0.3), rgba(59,130,246,0.3)); color: #38bdf8;' : ''}">${s.avatar || s.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="assign-tech-details">
            <div class="assign-tech-name-row">
              <span class="assign-tech-name">${s.name}</span>
              ${isRecommended ? '<span class="badge-recommended">⭐ AI Sistem Önerisi</span>' : ''}
              ${isWStaff ? '<span class="badge badge-purple" style="font-size: 0.68rem;">🏢 Atölye Uzmanı</span>' : ''}
              ${isSource ? '<span class="badge badge-secondary" style="font-size: 0.7rem;">(Mevcut Görevli - Devrediliyor)</span>' : ''}
              <span class="badge ${statusBadge}">${s.status}</span>
            </div>
            <span class="assign-tech-sub">${s.role} (${s.specialty || 'Atölye/Saha'}) • ${vehicleStation} • 📍 <strong>${distText} km</strong> uzakta <em style="color:#94a3b8; font-size:0.75rem;">(${locLabel})</em></span>
          </div>
        </div>
        <div class="assign-tech-right">
          <span class="assign-tech-jobs-badge badge ${activeJobCount === 0 ? 'badge-success' : activeJobCount <= 2 ? 'badge-secondary' : 'badge-warning'}">
            📋 ${activeJobCount} Aktif Görev
          </span>
        </div>
      </div>
    `;
  }).join('');'''

if old_card_map in code:
    code = code.replace(old_card_map, new_card_map, 1)
    print('19. openDispatchAssignModal candidate rendering updated.')
else:
    print('19. openDispatchAssignModal candidate rendering target not matched!')

# In btnConfirm handler of openDispatchAssignModal:
old_confirm_handler = '''        updateDispatchBanner(order, targetTech);
        showToast(`⚡ #${orderCode} çağrısı yönetici tercihiyle ${targetTech.name} (${targetTech.vehiclePlate}) personeline atandı!`);'''

new_confirm_handler = '''        const isTargetWorkshop = isWorkshopStaff(targetTech);
        if (isWorkshopJob || isTargetWorkshop) {
          order.repair_location = 'workshop';
          order.device_current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
          if (state.activeOrder) {
            state.activeOrder.repair_location = 'workshop';
            state.activeOrder.device_current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
          }
        }

        updateDispatchBanner(order, targetTech);
        if (isWorkshopJob || isTargetWorkshop) {
          showToast(`🏢 #${orderCode} çağrısı atölye tezgâhına sevk edildi ve ${targetTech.name} (${targetTech.vehiclePlate || 'Merkez Atölye'}) uzmanına atandı!`);
        } else {
          showToast(`⚡ #${orderCode} çağrısı yönetici tercihiyle ${targetTech.name} (${targetTech.vehiclePlate}) personeline atandı!`);
        }'''

if old_confirm_handler in code:
    code = code.replace(old_confirm_handler, new_confirm_handler, 1)
    print('20. btnConfirm handler updated for workshop.')
else:
    print('20. btnConfirm handler target not matched!')

# 21. Append Workshop Modal functions right after initPartHoldModal
workshop_modal_funcs = '''
// ==================== Sahada Yapılamayan Cihazı Atölyeye Sevk Etme (Workshop Transfer Lifecycle) ====================

function openSendToWorkshopModal(order) {
  const currentOrder = order || state.activeOrder;
  if (!currentOrder) {
    showToast("⚠️ Atölyeye sevk etmek için aktif bir iş emri bulunamadı.", "warning");
    return;
  }

  const modal = document.getElementById('send-to-workshop-modal');
  if (!modal) return;

  const code = currentOrder.tracking_code || currentOrder.code;
  const cust = currentOrder.customer_name || currentOrder.customer || "Müşteri";
  const dev = `${currentOrder.device_brand || ''} ${currentOrder.device_model || ''}`.trim() || (currentOrder.device || "Cihaz");
  const tech = currentOrder.assigned_tech || (state.staff && state.staff[0] ? state.staff[0].name : "Saha Teknisyeni");

  const codeEl = document.getElementById('workshop-modal-order-code');
  const custEl = document.getElementById('workshop-modal-customer');
  const devEl = document.getElementById('workshop-modal-device');
  const techEl = document.getElementById('workshop-modal-tech');

  if (codeEl) codeEl.textContent = `#${code}`;
  if (custEl) custEl.textContent = cust;
  if (devEl) devEl.textContent = dev;
  if (techEl) techEl.textContent = tech;

  // Varsayılan geri teslim tarihi: bugünden 3 gün sonra
  const d = new Date();
  d.setDate(d.getDate() + 3);
  const defDateStr = d.toISOString().split('T')[0];

  const dateInput = document.getElementById('workshop-estimated-date');
  if (dateInput) dateInput.value = defDateStr;

  const notesInput = document.getElementById('workshop-transfer-notes');
  if (notesInput) {
    if (currentOrder.workshop_transfer_reason) {
      notesInput.value = currentOrder.workshop_transfer_reason;
    } else {
      const diagStr = (currentOrder.technician_findings || currentOrder.findings || '').toLowerCase();
      if (diagStr.includes('igbt') || diagStr.includes('kart') || diagStr.includes('yanık') || diagStr.includes('çip')) {
        notesInput.value = "Elektronik kontrol kartında yanık ve BGA sürücü çip arızası tespit edildi. Mikroskop altında incelenmesi ve SMD lehimleme istasyonunda tamir edilmesi gerekiyor.";
      } else if (diagStr.includes('pin') || diagStr.includes('kafa')) {
        notesInput.value = "Yazıcı kafa mekanizmasında mekanik deformasyon ve pin kırığı var. Atölye tezgâhında hassas kalibrasyon ve test gerekiyor.";
      } else {
        notesInput.value = "Sahada yapılan ilk kontrolde arızanın yerinde giderilemeyeceği tespit edildi. Detaylı test ve laboratuvar onarımı için merkez atölyeye sevk ediliyor.";
      }
    }
  }

  modal.style.display = 'flex';
}
window.openSendToWorkshopModal = openSendToWorkshopModal;

function closeSendToWorkshopModal() {
  const modal = document.getElementById('send-to-workshop-modal');
  if (modal) modal.style.display = 'none';
}
window.closeSendToWorkshopModal = closeSendToWorkshopModal;

function submitSendToWorkshopForm(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  const currentOrder = state.activeOrder;
  if (!currentOrder) return;

  const reasonCat = document.getElementById('workshop-transfer-reason-cat')?.value || 'Mikroelektronik Kart & BGA/SMD Onarımı';
  const notes = (document.getElementById('workshop-transfer-notes')?.value || '').trim();
  const estDate = document.getElementById('workshop-estimated-date')?.value || '';

  if (!notes) {
    showToast("⚠️ Lütfen atölye teknisyenine iletilecek inceleme notunu yazın.", "warning");
    return;
  }

  const combinedReason = `${reasonCat}. Not: ${notes}`;
  const targetCode = currentOrder.tracking_code || currentOrder.code;
  const prevTechName = currentOrder.assigned_tech || (state.staff && state.staff[0] ? state.staff[0].name : "Saha Teknisyeni");
  const prevUserId = currentOrder.assigned_user_id;

  // 1. İş Emrini Güncelle
  currentOrder.status = "Atölyeye Alındı / Lab Onarımında";
  currentOrder.repair_location = "workshop";
  currentOrder.device_current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
  currentOrder.workshop_transfer_reason = combinedReason;
  currentOrder.workshop_estimated_date = estDate;
  currentOrder.workshop_transferred_at = new Date().toISOString();
  currentOrder.previous_field_tech = prevTechName;
  currentOrder.technician_findings = (currentOrder.technician_findings ? currentOrder.technician_findings + ' | ' : '') + `[Sahadan Atölyeye Sevk]: ${combinedReason}`;

  // Saha teknisyenini bu iş emrinden boşa çıkar
  currentOrder.assigned_tech = null;
  currentOrder.assigned_user_id = null;

  // state.workOrders güncelle
  const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === targetCode);
  if (matchingOrder) {
    matchingOrder.status = "Atölyeye Alındı / Lab Onarımında";
    matchingOrder.repair_location = "workshop";
    matchingOrder.device_current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
    matchingOrder.workshop_transfer_reason = combinedReason;
    matchingOrder.workshop_estimated_date = estDate;
    matchingOrder.workshop_transferred_at = currentOrder.workshop_transferred_at;
    matchingOrder.previous_field_tech = prevTechName;
    matchingOrder.technician_findings = currentOrder.technician_findings;
    matchingOrder.assigned_tech = null;
    matchingOrder.assigned_user_id = null;
  }

  // 2. Saha Teknisyenini Müsait Duruma Getir
  const techObj = (state.staff || []).find(s => s.name === prevTechName || s.id === prevUserId);
  if (techObj) {
    // Teknisyenin aktif iş listesinden bu işi çıkar
    if (state.staffJobs && state.staffJobs[techObj.id]) {
      state.staffJobs[techObj.id] = state.staffJobs[techObj.id].filter(j => (j.tracking_code !== targetCode && j.code !== targetCode));
    }
    const remainingJobs = (state.staffJobs && state.staffJobs[techObj.id]) ? state.staffJobs[techObj.id].filter(j => j.status !== 'Tamamlandı') : [];
    if (remainingJobs.length === 0) {
      techObj.status = "Müsait";
      techObj.location = techObj.baseAddress || "Merkez";
    }
    saveStaffToLocalStorage();
  }

  // 3. Cihaz Sicil Kartı & Pasaport Konumunu Güncelle
  if (state.equipmentRegistry && currentOrder.serial_number) {
    const eq = state.equipmentRegistry.find(e => String(e.serial_number).trim().toLowerCase() === String(currentOrder.serial_number).trim().toLowerCase());
    if (eq) {
      eq.current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
      eq.status = "Atölyede Onarımda";
      try {
        localStorage.setItem('servisai_equipment_registry', JSON.stringify(state.equipmentRegistry));
      } catch (e) {}
    }
  }

  saveWorkOrdersToLocalStorage();
  closeSendToWorkshopModal();

  // 4. UI Güncellemeleri
  updateTechJourneyUI(currentOrder);
  renderIncomingCalls();
  renderStaffList();
  renderTechJobs();
  updateActiveOrdersKPI();
  if (typeof updateDispatchBanner === 'function') {
    updateDispatchBanner(currentOrder, null);
  }

  showToast(`🏢 #${targetCode} cihazı Merkez Atölyeye sevk edildi! Teknisyen (${prevTechName}) yeni görev için MÜSAİT durumuna geçti.`, 'success');
}
window.submitSendToWorkshopForm = submitSendToWorkshopForm;

function initSendToWorkshopModal() {
  const modal = document.getElementById('send-to-workshop-modal');
  const btnClose = document.getElementById('btn-close-send-to-workshop-modal');
  const btnCancel = document.getElementById('btn-cancel-send-to-workshop');
  const form = document.getElementById('form-send-to-workshop');

  if (!modal) return;

  if (btnClose) btnClose.addEventListener('click', closeSendToWorkshopModal);
  if (btnCancel) btnCancel.addEventListener('click', closeSendToWorkshopModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSendToWorkshopModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      submitSendToWorkshopForm(e);
    });
  }

  // Banner butonları bağlaması
  const btnWorkshopBanner = document.getElementById('btn-tech-workshop-banner');
  if (btnWorkshopBanner) {
    btnWorkshopBanner.addEventListener('click', () => {
      openSendToWorkshopModal(state.activeOrder);
    });
  }

  const btnStartWorkshop = document.getElementById('btn-tech-start-workshop-banner');
  if (btnStartWorkshop) {
    btnStartWorkshop.addEventListener('click', () => {
      const code = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-284";
      const now = new Date();
      const isoNow = now.toISOString();

      state.activeOrder.status = "Onarımda";
      state.activeOrder.repair_location = "workshop";
      state.activeOrder.arrivedAt = isoNow;
      state.activeOrder.work_start_time = isoNow;
      state.activeOrder.travel_duration_minutes = 0;
      state.activeOrder.travelDurationMinutes = 0;

      const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
      if (matchingOrder) {
        matchingOrder.status = "Onarımda";
        matchingOrder.repair_location = "workshop";
        matchingOrder.arrived_at = isoNow;
        matchingOrder.work_start_time = isoNow;
        matchingOrder.travel_duration_minutes = 0;
      }

      saveWorkOrdersToLocalStorage();
      updateTechJourneyUI(state.activeOrder);
      renderIncomingCalls();
      renderTechJobs();
      showToast(`🔬 #${code} cihazı merkez atölye tezgâhında inceleme ve teste alındı!`, 'success');
    });
  }
}
window.initSendToWorkshopModal = initSendToWorkshopModal;
'''

old_hold_end = '''window.initPartHoldModal = initPartHoldModal;'''
if old_hold_end in code:
    code = code.replace(old_hold_end, old_hold_end + '\n' + workshop_modal_funcs, 1)
    print('21. Workshop modal functions appended.')
else:
    print('21. Target for appending workshop modal functions not found!')

with open(path_app, 'w', encoding='utf-8') as f:
    f.write(code)

print('app.js update completed successfully.')

