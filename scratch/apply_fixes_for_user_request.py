# -*- coding: utf-8 -*-
import os

path_app = r'app.js'
with open(path_app, 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Fix line 918 in updateTechJourneyUI: Remove buggy `|| !order.departedAt`
old_step1_check = '''  // 1. Durum: Kabul Edildi / Henüz Yola Çıkılmadı
  if (status === 'Kabul Edildi' || status === 'İncelemede' || !order.departedAt) {'''

new_step1_check = '''  // 1. Durum: Kabul Edildi / Henüz Yola Çıkılmadı / Henüz Tezgâha Alınmadı
  const isFreshState = status === 'Kabul Edildi' || 
                       status === 'Kabul Edildi (Atölyede)' || 
                       status === 'İncelemede' || 
                       (status !== 'Yolda' && status !== 'Onarımda' && status !== 'Atölyeye Alındı / Lab Onarımında' && status !== 'Parça Bekliyor' && status !== 'Beklemede' && status !== 'Tamamlandı');

  if (isFreshState) {'''

if old_step1_check in app_code:
    app_code = app_code.replace(old_step1_check, new_step1_check, 1)
    print('1. updateTechJourneyUI isFreshState check fixed (removed buggy !order.departedAt).')
else:
    print('1. Target for step1 check not matched!')

# 2. In updateTechJourneyUI, make btnResetLifecycle ALWAYS visible
old_hide_reset = '''    if (btnResetLifecycle) btnResetLifecycle.style.display = 'none';'''
new_show_reset = '''    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';'''

if old_hide_reset in app_code:
    app_code = app_code.replace(old_hide_reset, new_show_reset, 1)
    print('2. btnResetLifecycle made visible in Step 1.')
else:
    print('2. Target for hide reset not matched!')

# 3. Update updateVehiclePartDropdown to handle Workshop stock vs Vehicle stock dynamically
old_dropdown_fn = '''function updateVehiclePartDropdown() {
  const select = document.getElementById('vehicle-part-select');
  if (!select) return;

  const currentTechId = state.activeTechId || 2;
  const parts = state.stock || [];
  select.innerHTML = '<option value="">-- Araçtan Kullanılacak Parçayı Seçin --</option>' +
    parts.map(p => {
      const qty = getTechVehicleStock(p, currentTechId);
      const isAvailable = qty > 0;
      let currencyInfo = '';
      if (p.currency && p.currency !== 'TRY' && p.originalPrice) {
        const symbol = p.currency === 'USD' ? '$' : '€';
        currencyInfo = ` [İthal: ${symbol}${p.originalPrice} @ ${(p.exchangeRate || 0).toFixed(2)} ₺]`;
      }
      return `<option value="${p.code}" ${!isAvailable ? 'disabled' : ''}>${p.name} (${p.code}) - Araçta: ${qty} adet - ${p.price} ₺${currencyInfo}</option>`;
    }).join('');
}'''

new_dropdown_fn = '''function updateVehiclePartDropdown() {
  const select = document.getElementById('vehicle-part-select');
  const tabVehicle = document.getElementById('tab-btn-vehicle-stock');
  const vehSubtitle = document.getElementById('vehicle-part-subtitle');
  if (!select) return;

  const currentTechId = state.activeTechId || 2;
  const curTech = (state.staff || []).find(s => s.id == currentTechId);
  const curOrder = state.activeOrder;
  const isWorkshop = (curOrder && (curOrder.repair_location === 'workshop' || curOrder.channel === 'Elden Teslim' || (curOrder.status && curOrder.status.includes('Atölye')))) ||
                     (curTech && (curTech.staffType === 'workshop' || (curTech.role && curTech.role.includes('Atölye'))));

  if (tabVehicle) {
    tabVehicle.innerHTML = isWorkshop 
      ? '🏢 Merkez Atölye & Ana Depo Stoğundan Kullan' 
      : '🚐 Servis Aracı Stoğundan Kullan';
  }
  if (vehSubtitle) {
    vehSubtitle.textContent = isWorkshop
      ? 'Merkez atölye ve ana depo stoğundaki yedek parçaları kullanabilir veya harici tedarik faturasını belgeleyebilirsiniz.'
      : `Araç stoğunuzdan (${curTech ? curTech.vehiclePlate || 'Zimmetsiz' : 'Zimmetsiz'}) seçtiğiniz parça anında iş emrine eklenir ve araç stoğundan düşülür.`;
  }

  const parts = state.stock || [];
  const placeholderText = isWorkshop 
    ? '-- 🏢 Merkez Atölye & Ana Depodan Parça Seçin --'
    : '-- 🚐 Araçtan Kullanılacak Parçayı Seçin --';

  select.innerHTML = `<option value="">${placeholderText}</option>` +
    parts.map(p => {
      const qty = isWorkshop ? (p.qty || 0) : getTechVehicleStock(p, currentTechId);
      const isAvailable = qty > 0;
      let currencyInfo = '';
      if (p.currency && p.currency !== 'TRY' && p.originalPrice) {
        const symbol = p.currency === 'USD' ? '$' : '€';
        currencyInfo = ` [İthal: ${symbol}${p.originalPrice} @ ${(p.exchangeRate || 0).toFixed(2)} ₺]`;
      }
      const stockLabel = isWorkshop ? `Atölye Deposu: ${qty} adet` : `Araçta: ${qty} adet`;
      return `<option value="${p.code}" ${!isAvailable ? 'disabled' : ''}>${p.name} (${p.code}) - ${stockLabel} - ${p.price} ₺${currencyInfo}</option>`;
    }).join('');
}'''

if old_dropdown_fn in app_code:
    app_code = app_code.replace(old_dropdown_fn, new_dropdown_fn, 1)
    print('3. updateVehiclePartDropdown updated for workshop.')
else:
    print('3. Target for updateVehiclePartDropdown not matched!')

# 4. Update btnAddPart click listener to deduct from Central Workshop stock when in workshop mode
old_btn_add_part = '''  // 5. Araç Stoğundan Parça Kullanma
  const btnAddPart = document.getElementById('btn-add-part-to-job');
  const partSelect = document.getElementById('vehicle-part-select');

  if (btnAddPart && partSelect) {
    btnAddPart.addEventListener('click', async () => {
      const selectedCode = partSelect.value;
      const part = state.stock.find(p => p.code === selectedCode);
      const currentTechId = state.activeTechId || 2;

      if (part) {
        const availableQty = getTechVehicleStock(part, currentTechId);
        if (availableQty <= 0) {
          showToast(`❌ Araç stoğunuzda ${part.name} kalmadı! Merkez depodan ikmal isteyin.`);
          return;
        }

        const currentCode = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
        const curTech = (state.staff || []).find(s => s.id == currentTechId);
        const plate = curTech ? (curTech.vehiclePlate || '34 ABC 101') : '34 ABC 101';

        // Backend API'ye canlı yaz
        try {
          await fetch(`${API_BASE_URL}/api/work-orders/${currentCode}/use-part?part_code=${selectedCode}&vehicle_plate=${encodeURIComponent(plate)}`, {
            method: 'POST'
          });
        } catch (e) {}

        // Araç stoğundan düş
        deductTechVehicleStock(part, currentTechId, 1);
        renderStockTable();
        updateVehiclePartDropdown();

        // Parçayı aktif iş emrine ekle
        if (!state.activeOrder.usedParts) state.activeOrder.usedParts = [];
        state.activeOrder.usedParts.push({
          code: part.code,
          name: part.name,
          qty: 1,
          price: part.price,
          unitPrice: part.price,
          currency: part.currency || 'TRY',
          originalPrice: part.originalPrice || part.price,
          exchangeRate: part.exchangeRate || 1,
          source: `Mobil Araç Stoğu (${plate})`,
          warranty: part.warranty ? `${part.warranty} Parça Garantisi` : "12 Ay Parça Garantisi",
          isLocalPurchase: false
        });

        // Update in state.workOrders
        const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);
        if (matchingOrder) {
          if (!matchingOrder.used_parts) matchingOrder.used_parts = [];
          if (!matchingOrder.usedParts) matchingOrder.usedParts = [];
          const partEntry = {
            part_code: part.code,
            code: part.code,
            part_name: part.name,
            name: part.name,
            quantity: 1,
            qty: 1,
            unit_price: part.price,
            unitPrice: part.price,
            price: part.price,
            currency: part.currency || 'TRY',
            original_price: part.originalPrice || part.price,
            originalPrice: part.originalPrice || part.price,
            exchange_rate: part.exchangeRate || 1,
            exchangeRate: part.exchangeRate || 1,
            warranty: part.warranty ? `${part.warranty} Parça Garantisi` : "12 Ay Parça Garantisi",
            source: `Mobil Araç Stoğu (${plate})`,
            isLocalPurchase: false
          };
          matchingOrder.used_parts.push(partEntry);
          matchingOrder.usedParts.push(partEntry);
          matchingOrder.parts_cost = (matchingOrder.parts_cost || 0) + part.price;
          matchingOrder.partsCost = matchingOrder.parts_cost;
          matchingOrder.total_cost = (matchingOrder.labor_cost || 600) + matchingOrder.parts_cost;
          matchingOrder.totalCost = matchingOrder.total_cost;
        }
        saveWorkOrdersToLocalStorage();
        saveStockToLocalStorage();

        renderUsedParts();
        showToast(`✅ ${part.name} araç stoğundan (${plate}) düşüldü ve #${currentCode} fişine işlendi!`);
      }
    });
  }'''

new_btn_add_part = '''  // 5. Yedek Parça Kullanma (Atölye Deposu veya Araç Stoğu)
  const btnAddPart = document.getElementById('btn-add-part-to-job');
  const partSelect = document.getElementById('vehicle-part-select');

  if (btnAddPart && partSelect) {
    btnAddPart.addEventListener('click', async () => {
      const selectedCode = partSelect.value;
      if (!selectedCode) {
        showToast("⚠️ Lütfen kullanılacak yedek parçayı seçin.", "warning");
        return;
      }
      const part = state.stock.find(p => p.code === selectedCode);
      const currentTechId = state.activeTechId || 2;
      const curTech = (state.staff || []).find(s => s.id == currentTechId);
      const currentCode = state.activeOrder ? (state.activeOrder.code || state.activeOrder.tracking_code) : "SRV-2026-104";
      const curOrder = state.activeOrder || (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);

      const isWorkshop = (curOrder && (curOrder.repair_location === 'workshop' || curOrder.channel === 'Elden Teslim' || (curOrder.status && curOrder.status.includes('Atölye')))) ||
                         (curTech && (curTech.staffType === 'workshop' || (curTech.role && curTech.role.includes('Atölye'))));

      if (part) {
        let availableQty = 0;
        let partSourceLabel = '';

        if (isWorkshop) {
          availableQty = part.qty !== undefined ? part.qty : 0;
          if (availableQty <= 0) {
            showToast(`❌ Merkez Atölye / Ana Depoda "${part.name}" kalmadı! Satın alma veya tedarik işlemi açılmalı.`, "warning");
            return;
          }
          partSourceLabel = "Merkez Atölye Stoğu";
          part.qty = Math.max(0, (part.qty || 0) - 1);
        } else {
          availableQty = getTechVehicleStock(part, currentTechId);
          if (availableQty <= 0) {
            showToast(`❌ Araç stoğunuzda ${part.name} kalmadı! Merkez depodan ikmal isteyin.`, "warning");
            return;
          }
          const plate = curTech ? (curTech.vehiclePlate || '34 ABC 101') : '34 ABC 101';
          partSourceLabel = `Mobil Araç Stoğu (${plate})`;
          deductTechVehicleStock(part, currentTechId, 1);
        }

        renderStockTable();
        updateVehiclePartDropdown();

        // Parçayı aktif iş emrine ekle
        if (!state.activeOrder.usedParts) state.activeOrder.usedParts = [];
        state.activeOrder.usedParts.push({
          code: part.code,
          name: part.name,
          qty: 1,
          price: part.price,
          unitPrice: part.price,
          currency: part.currency || 'TRY',
          originalPrice: part.originalPrice || part.price,
          exchangeRate: part.exchangeRate || 1,
          source: partSourceLabel,
          warranty: part.warranty ? `${part.warranty} Parça Garantisi` : "12 Ay Parça Garantisi",
          isLocalPurchase: false
        });

        // Update in state.workOrders
        const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === currentCode);
        if (matchingOrder) {
          if (!matchingOrder.used_parts) matchingOrder.used_parts = [];
          if (!matchingOrder.usedParts) matchingOrder.usedParts = [];
          const partEntry = {
            part_code: part.code,
            code: part.code,
            part_name: part.name,
            name: part.name,
            quantity: 1,
            qty: 1,
            unit_price: part.price,
            unitPrice: part.price,
            price: part.price,
            currency: part.currency || 'TRY',
            original_price: part.originalPrice || part.price,
            originalPrice: part.originalPrice || part.price,
            exchange_rate: part.exchangeRate || 1,
            exchangeRate: part.exchangeRate || 1,
            warranty: part.warranty ? `${part.warranty} Parça Garantisi` : "12 Ay Parça Garantisi",
            source: partSourceLabel,
            isLocalPurchase: false
          };
          matchingOrder.used_parts.push(partEntry);
          matchingOrder.usedParts.push(partEntry);
          matchingOrder.parts_cost = (matchingOrder.parts_cost || 0) + part.price;
          matchingOrder.partsCost = matchingOrder.parts_cost;
          matchingOrder.total_cost = (matchingOrder.labor_cost || 600) + matchingOrder.parts_cost;
          matchingOrder.totalCost = matchingOrder.total_cost;
        }
        saveWorkOrdersToLocalStorage();
        saveStockToLocalStorage();

        renderUsedParts();
        if (isWorkshop) {
          showToast(`✅ ${part.name} merkez atölye stoğundan düşüldü ve #${currentCode} fişine işlendi!`);
        } else {
          const plate = curTech ? (curTech.vehiclePlate || '34 ABC 101') : '34 ABC 101';
          showToast(`✅ ${part.name} araç stoğundan (${plate}) düşüldü ve #${currentCode} fişine işlendi!`);
        }
      }
    });
  }'''

if old_btn_add_part in app_code:
    app_code = app_code.replace(old_btn_add_part, new_btn_add_part, 1)
    print('4. btnAddPart updated with workshop stock deduction.')
else:
    print('4. Target for btnAddPart not matched!')

# 5. In deleteUsedPart, return to workshop stock if source was workshop
old_delete_part = '''  // Eğer araç stoğundan kullanılmış bir parça ise stoğu araca iade et
  if (!removed.isLocalPurchase && removed.code) {
    returnTechVehicleStock(removed.code, currentTechId, removed.qty || 1);
    renderStockTable();
    updateVehiclePartDropdown();
  }'''

new_delete_part = '''  // Eğer araç veya atölye stoğundan kullanılmış bir parça ise stoğa iade et
  if (!removed.isLocalPurchase && removed.code) {
    if (removed.source && (removed.source.includes('Merkez Atölye') || removed.source.includes('Ana Depo'))) {
      const p = (state.stock || []).find(item => item.code === removed.code);
      if (p) p.qty = (p.qty || 0) + (removed.qty || 1);
    } else {
      returnTechVehicleStock(removed.code, currentTechId, removed.qty || 1);
    }
    renderStockTable();
    updateVehiclePartDropdown();
  }'''

if old_delete_part in app_code:
    app_code = app_code.replace(old_delete_part, new_delete_part, 1)
    print('5. deleteUsedPart updated for workshop stock return.')
else:
    print('5. Target for deleteUsedPart not matched!')

# 6. Attach click event listener for #btn-tech-reset-lifecycle
# In initSendToWorkshopModal or initAdminActions:
old_init_workshop_end = '''  const btnStartWorkshop = document.getElementById('btn-tech-start-workshop-banner');'''

reset_lifecycle_listener = '''  // Başa Sar (Reset Lifecycle) Butonu Dinleyicisi
  const btnReset = document.getElementById('btn-tech-reset-lifecycle');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const currentOrder = state.activeOrder;
      if (!currentOrder) {
        showToast("⚠️ Başa sarmak için aktif bir iş emri bulunamadı.", "warning");
        return;
      }
      const code = currentOrder.tracking_code || currentOrder.code;
      const isWorkshop = (currentOrder.repair_location === 'workshop') || 
                         (currentOrder.channel === 'Elden Teslim') || 
                         (currentOrder.status && currentOrder.status.includes('Atölye')) ||
                         (currentOrder.device_current_location && currentOrder.device_current_location.includes('Atölye'));

      const initialStatus = isWorkshop ? "Kabul Edildi (Atölyede)" : "Kabul Edildi";

      // Yaşam döngüsü zaman damgalarını ve sayaçları sıfırla
      currentOrder.status = initialStatus;
      currentOrder.departedAt = null;
      currentOrder.departed_at = null;
      currentOrder.arrivedAt = null;
      currentOrder.arrived_at = null;
      currentOrder.travel_start_time = null;
      currentOrder.work_start_time = null;
      currentOrder.travel_duration_minutes = isWorkshop ? 0 : null;
      currentOrder.travelDurationMinutes = isWorkshop ? 0 : null;
      currentOrder.repair_duration_minutes = null;
      currentOrder.repairDurationMinutes = null;
      currentOrder.total_duration_minutes = null;
      currentOrder.totalDurationMinutes = null;
      currentOrder.accountingSettled = false;
      currentOrder.customer_signature = null;

      // state.workOrders güncelle
      const matchingOrder = (state.workOrders || []).find(o => (o.tracking_code || o.code) === code);
      if (matchingOrder) {
        matchingOrder.status = initialStatus;
        matchingOrder.departedAt = null;
        matchingOrder.departed_at = null;
        matchingOrder.arrivedAt = null;
        matchingOrder.arrived_at = null;
        matchingOrder.travel_start_time = null;
        matchingOrder.work_start_time = null;
        matchingOrder.travel_duration_minutes = isWorkshop ? 0 : null;
        matchingOrder.travelDurationMinutes = isWorkshop ? 0 : null;
        matchingOrder.repair_duration_minutes = null;
        matchingOrder.repairDurationMinutes = null;
        matchingOrder.total_duration_minutes = null;
        matchingOrder.totalDurationMinutes = null;
        matchingOrder.accountingSettled = false;
        matchingOrder.customer_signature = null;
      }

      // state.staffJobs güncelle
      if (state.staffJobs) {
        for (const sId in state.staffJobs) {
          const so = state.staffJobs[sId].find(o => (o.tracking_code || o.code) === code);
          if (so) {
            so.status = initialStatus;
            so.departed_at = null;
            so.arrived_at = null;
            so.travel_duration_minutes = isWorkshop ? 0 : null;
            so.repair_duration_minutes = null;
          }
        }
      }

      saveWorkOrdersToLocalStorage();
      updateTechJourneyUI(currentOrder);
      renderIncomingCalls();
      renderTechJobs();
      updateActiveOrdersKPI();
      if (typeof updateDispatchBanner === 'function') {
        updateDispatchBanner(currentOrder);
      }

      showToast(`🔄 #${code} adımları başa sarıldı (${initialStatus} aşamasına döndürüldü). Simülasyonu baştan test edebilirsiniz!`, "success");
    });
  }

  const btnStartWorkshop = document.getElementById('btn-tech-start-workshop-banner');'''

if old_init_workshop_end in app_code:
    app_code = app_code.replace(old_init_workshop_end, reset_lifecycle_listener, 1)
    print('6. btnResetLifecycle click listener attached.')
else:
    print('6. Target for btnResetLifecycle listener not matched!')

# 7. In loadWorkOrdersFromLocalStorage, migrate SRV-2026-284 and Elden Teslim records
old_load_wo = '''function loadWorkOrdersFromLocalStorage() {
  try {
    const appMode = localStorage.getItem('servisai_app_mode');
    const saved = localStorage.getItem('servisai_work_orders');
    if (appMode === 'clean') {
      if (saved) {
        state.workOrders = JSON.parse(saved) || [];
      } else {
        state.workOrders = [];
      }
      return;
    }'''

new_load_wo = '''function loadWorkOrdersFromLocalStorage() {
  try {
    const appMode = localStorage.getItem('servisai_app_mode');
    const saved = localStorage.getItem('servisai_work_orders');
    if (appMode === 'clean') {
      if (saved) {
        state.workOrders = JSON.parse(saved) || [];
      } else {
        state.workOrders = [];
      }
      // Migrate Elden Teslim & SRV-2026-284
      (state.workOrders || []).forEach(o => {
        if (o.channel === 'Elden Teslim' || (o.tracking_code === 'SRV-2026-284' || o.code === 'SRV-2026-284')) {
          o.channel = 'Elden Teslim';
          o.repair_location = 'workshop';
          if (!o.device_current_location) o.device_current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
          if (!o.delivery_address && o.customer_address && !o.customer_address.includes('Merkez Servis Atölyesi')) {
            o.delivery_address = o.customer_address;
          }
        }
      });
      return;
    }'''

if old_load_wo in app_code:
    app_code = app_code.replace(old_load_wo, new_load_wo, 1)
    print('7. loadWorkOrdersFromLocalStorage migration added.')
else:
    print('7. Target for loadWorkOrdersFromLocalStorage not matched!')

# In normal mode of loadWorkOrdersFromLocalStorage:
old_load_wo_end = '''        state.workOrders = merged;
      }
    }
  } catch (e) {'''

new_load_wo_end = '''        (merged || []).forEach(o => {
          if (o.channel === 'Elden Teslim' || (o.tracking_code === 'SRV-2026-284' || o.code === 'SRV-2026-284')) {
            o.channel = 'Elden Teslim';
            o.repair_location = 'workshop';
            if (!o.device_current_location) o.device_current_location = "🏢 Merkez Servis Atölyesi / Laboratuvar";
            if (!o.delivery_address && o.customer_address && !o.customer_address.includes('Merkez Servis Atölyesi')) {
              o.delivery_address = o.customer_address;
            }
          }
        });
        state.workOrders = merged;
      }
    }
  } catch (e) {'''

if old_load_wo_end in app_code:
    app_code = app_code.replace(old_load_wo_end, new_load_wo_end, 1)
    print('8. loadWorkOrdersFromLocalStorage normal mode migration added.')
else:
    print('8. Target for loadWorkOrdersFromLocalStorage normal mode not matched!')

# 9. In openDispatchAssignModal, show customer delivery address cleanly and route mobile techs to workshop
old_routing_dist = '''    // Canlı konum ve hedef çağrı adresine göre dinamik mesafe hesabı:
    const liveLoc = getStaffLiveLocationAndDistance(s, custAddr);
    staffDistances.set(s.id, liveLoc);
    const distance = liveLoc.distanceKm;'''

new_routing_dist = '''    const targetRoutingAddr = isWorkshopJob ? "🏢 Merkez Servis Atölyesi / Laboratuvar" : custAddr;
    const liveLoc = isWorkshopJob && isWStaff 
      ? { distanceKm: 0.0, locationLabel: "Merkez Atölye Tezgâhı" } 
      : getStaffLiveLocationAndDistance(s, targetRoutingAddr);
    staffDistances.set(s.id, liveLoc);
    const distance = liveLoc.distanceKm;'''

if old_routing_dist in app_code:
    app_code = app_code.replace(old_routing_dist, new_routing_dist, 1)
    print('9. openDispatchAssignModal routing destination updated.')
else:
    print('9. Target for openDispatchAssignModal routing dist not matched!')

# Update addrEl in openDispatchAssignModal:
old_modal_addr = '''  if (addrEl) addrEl.textContent = `📍 ${custAddr}`;'''
new_modal_addr = '''  if (addrEl) {
    if (isWorkshopJob) {
      addrEl.innerHTML = `🏢 <strong>Merkez Servis Atölyesi (Tezgâhta Onarım)</strong> <span style="color:#94a3b8; font-size:0.75rem;">• Teslimat Adresi: ${escapeHtml(custAddr)}</span>`;
    } else {
      addrEl.textContent = `📍 ${custAddr}`;
    }
  }'''

if old_modal_addr in app_code:
    app_code = app_code.replace(old_modal_addr, new_modal_addr, 1)
    print('10. openDispatchAssignModal addrEl display updated.')
else:
    print('10. Target for openDispatchAssignModal addrEl not matched!')

with open(path_app, 'w', encoding='utf-8') as f:
    f.write(app_code)

print('app.js successfully updated.')

# Also update index.html: bump cache buster and update address label on intake form
path_html = r'index.html'
with open(path_html, 'r', encoding='utf-8') as f:
    html_code = f.read()

html_code = html_code.replace('app.js?v=20261029_1400', 'app.js?v=20261029_1430')

old_addr_label = '''<label class="form-label" for="intake-cust-address">Servis Adresi / Lokasyon *</label>'''
new_addr_label = '''<label class="form-label" for="intake-cust-address" id="label-intake-cust-address">Servis Adresi / Lokasyon *</label>'''

if old_addr_label in html_code:
    html_code = html_code.replace(old_addr_label, new_addr_label, 1)
    print('11. index.html label-intake-cust-address id added.')

with open(path_html, 'w', encoding='utf-8') as f:
    f.write(html_code)

print('index.html successfully updated.')

