# -*- coding: utf-8 -*-
import os

path_app = r'app.js'
with open(path_app, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add initSendToWorkshopModal call after initPartHoldModal();
old_call = '  initPartHoldModal();'
new_call = '  initPartHoldModal();\n  if (typeof initSendToWorkshopModal === \'function\') initSendToWorkshopModal();'

if old_call in code:
    code = code.replace(old_call, new_call, 1)
    print('1. initSendToWorkshopModal call added.')
else:
    print('1. initPartHoldModal target not matched!')

# 2. Add intake-channel listener and role change listener
old_intake = '''  if (btnOpenIntake && intakeModal) {
    btnOpenIntake.addEventListener('click', () => {'''

new_intake = '''  const intakeChannelSel = document.getElementById('intake-channel');
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

  if (btnOpenIntake && intakeModal) {
    btnOpenIntake.addEventListener('click', () => {'''

if old_intake in code:
    code = code.replace(old_intake, new_intake, 1)
    print('2. intake-channel listener added.')
else:
    print('2. btnOpenIntake target not matched!')

# 3. Add #setting-new-staff-role listener in Settings
old_role_place = '''  // Yeni Teknisyen Ekleme Formu (Tab 2)'''
new_role_listener = '''  const roleSelectEl = document.getElementById('setting-new-staff-role');
  if (roleSelectEl) {
    roleSelectEl.addEventListener('change', () => {
      const val = roleSelectEl.value || '';
      const isW = val.includes('Atölye') || val.includes('Laboratuvar');
      if (isW) {
        const plateInput = document.getElementById('setting-new-staff-plate');
        const addrInput = document.getElementById('setting-new-staff-address');
        const specInput = document.getElementById('setting-new-staff-specialty');
        if (plateInput && (!plateInput.value || plateInput.value === 'Zimmetsiz')) plateInput.value = '🏢 Merkez Atölye (Sabit)';
        if (addrInput && !addrInput.value) addrInput.value = '🏢 Merkez Servis Atölyesi / Laboratuvar';
        if (specInput && !specInput.value) specInput.value = 'Mikroelektronik, SMD & BGA Onarımı';
      }
    });
  }

  // Yeni Teknisyen Ekleme Formu (Tab 2)'''

if old_role_place in code:
    code = code.replace(old_role_place, new_role_listener, 1)
    print('3. roleSelectEl listener added.')
else:
    print('3. old_role_place target not matched!')

with open(path_app, 'w', encoding='utf-8') as f:
    f.write(code)

print('app.js additions completed.')

