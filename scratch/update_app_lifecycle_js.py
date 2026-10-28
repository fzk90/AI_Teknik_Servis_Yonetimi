# -*- coding: utf-8 -*-
import sys

with open('Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Eski updateTechJourneyUI fonksiyonunu bul
func_start = 'function updateTechJourneyUI(order) {'
func_end = 'function consolidateAllWorkOrders() {'

idx1 = js.find(func_start)
idx2 = js.find(func_end)

if idx1 == -1 or idx2 == -1:
    print(f"Error finding function boundaries: idx1={idx1}, idx2={idx2}")
    sys.exit(1)

new_func = '''function updateTechJourneyUI(order) {
  const banner = document.getElementById('tech-gps-lifecycle-banner');
  const btnOnTheWay = document.getElementById('btn-tech-on-the-way');
  const btnArrived = document.getElementById('btn-tech-arrived');
  const btnCompleteBanner = document.getElementById('btn-tech-complete-banner');
  const btnViewReportBanner = document.getElementById('btn-tech-view-report-banner');
  const btnResetLifecycle = document.getElementById('btn-tech-reset-lifecycle');
  const durationBadge = document.getElementById('tech-job-duration-badge');
  const departedText = document.getElementById('tech-time-departed-text');
  const durationText = document.getElementById('tech-time-duration-text');
  const pulse = document.getElementById('tech-journey-pulse');

  // Stepper Düğümleri
  const nodeAccepted = document.getElementById('step-node-accepted');
  const nodeOnTheWay = document.getElementById('step-node-ontheway');
  const nodeRepair = document.getElementById('step-node-repair');
  const nodeCompleted = document.getElementById('step-node-completed');

  if (!banner || !order) return;

  const status = order.status || 'Kabul Edildi';

  // Stepper Stillerini Sıfırla
  function setStepStyle(node, stateType) {
    if (!node) return;
    if (stateType === 'active') {
      node.style.background = 'rgba(99, 102, 241, 0.25)';
      node.style.border = '1px solid #818cf8';
      node.style.color = '#ffffff';
      node.style.boxShadow = '0 0 12px rgba(129, 140, 248, 0.4)';
    } else if (stateType === 'completed') {
      node.style.background = 'rgba(16, 185, 129, 0.15)';
      node.style.border = '1px solid #10b981';
      node.style.color = '#34d399';
      node.style.boxShadow = 'none';
    } else {
      node.style.background = 'transparent';
      node.style.border = '1px solid transparent';
      node.style.color = '#64748b';
      node.style.boxShadow = 'none';
    }
  }

  // 1. Durum: Kabul Edildi / Henüz Yola Çıkılmadı
  if (status === 'Kabul Edildi' || status === 'İncelemede' || !order.departedAt) {
    setStepStyle(nodeAccepted, 'active');
    setStepStyle(nodeOnTheWay, 'inactive');
    setStepStyle(nodeRepair, 'inactive');
    setStepStyle(nodeCompleted, 'inactive');

    if (btnOnTheWay) btnOnTheWay.style.display = 'inline-flex';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'none';
    if (durationBadge) durationBadge.style.display = 'none';
    if (pulse) pulse.style.background = '#64748B';
    if (departedText) departedText.textContent = '⏳ İntikal Bekliyor (Henüz yola çıkılmadı)';
    if (durationText) durationText.textContent = '';
  }
  // 2. Durum: Yolda / Seyahat Halinde
  else if (status === 'Yolda') {
    setStepStyle(nodeAccepted, 'completed');
    setStepStyle(nodeOnTheWay, 'active');
    setStepStyle(nodeRepair, 'inactive');
    setStepStyle(nodeCompleted, 'inactive');

    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'inline-flex';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';

    if (durationBadge) {
      durationBadge.style.display = 'inline-block';
      durationBadge.className = 'badge badge-warning';
      durationBadge.textContent = '🚗 Yolda (GPS Aktif)';
    }
    if (pulse) pulse.style.background = '#06B6D4';
    const depTime = formatTimeOnly(order.departedAt);
    if (departedText) departedText.innerHTML = `🚗 Yola Çıkış: <strong>${depTime}</strong>`;
    if (durationText) durationText.innerHTML = `• 📡 Seyahat Sürüyor (Canlı GPS)`;
  }
  // 3. Durum: Onarımda / Cihaz Başında
  else if (status === 'Onarımda' || status === 'Onay Bekliyor' || status === 'Parça Bekliyor') {
    setStepStyle(nodeAccepted, 'completed');
    setStepStyle(nodeOnTheWay, 'completed');
    setStepStyle(nodeRepair, 'active');
    setStepStyle(nodeCompleted, 'inactive');

    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'inline-flex'; // TEZGAHIN TEPESİNDE BİTİRME BUTONU
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'none';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';

    if (durationBadge) {
      durationBadge.style.display = 'inline-block';
      durationBadge.className = 'badge badge-primary';
      durationBadge.textContent = '🔬 Cihaz Başında Onarımda';
    }
    if (pulse) pulse.style.background = '#8B5CF6';
    const arrTime = formatTimeOnly(order.arrivedAt || order.departedAt);
    const travelM = order.travelDurationMinutes || order.travel_duration_minutes || 25;
    if (departedText) departedText.innerHTML = `🏢 Adrese Ulaşıldı: <strong>${arrTime}</strong> (İntikal: <strong>${travelM} Dk</strong>)`;
    if (durationText) durationText.innerHTML = `• ⏱️ Fiili Onarım Sürüyor`;
  }
  // 4. Durum: Tamamlandı
  else if (status === 'Tamamlandı') {
    setStepStyle(nodeAccepted, 'completed');
    setStepStyle(nodeOnTheWay, 'completed');
    setStepStyle(nodeRepair, 'completed');
    setStepStyle(nodeCompleted, 'completed');

    if (btnOnTheWay) btnOnTheWay.style.display = 'none';
    if (btnArrived) btnArrived.style.display = 'none';
    if (btnCompleteBanner) btnCompleteBanner.style.display = 'none';
    if (btnViewReportBanner) btnViewReportBanner.style.display = 'inline-flex';
    if (btnResetLifecycle) btnResetLifecycle.style.display = 'inline-flex';

    if (durationBadge) {
      durationBadge.style.display = 'inline-block';
      durationBadge.className = 'badge badge-success';
      durationBadge.textContent = `✅ Tamamlandı`;
    }
    if (pulse) pulse.style.background = '#10B981';
    const travelM = order.travelDurationMinutes || order.travel_duration_minutes || 25;
    const repM = order.repairDurationMinutes || order.repair_duration_minutes || 45;
    const totM = order.totalDurationMinutes || order.total_duration_minutes || (travelM + repM);
    if (departedText) departedText.innerHTML = `✅ Görev Tamamlandı • İntikal: <strong>${travelM} Dk</strong> • Onarım: <strong>${repM} Dk</strong>`;
    if (durationText) durationText.innerHTML = `• Toplam Mesai: <strong>${formatDurationMinutes(totM)}</strong>`;
  }
}

'''

js = js[:idx1] + new_func + js[idx2:]

# Şimdi banner içindeki yeni butonların olay dinleyicilerini init fonksiyonuna ekleyelim
# initTechMobileControls icine veya benzer bir yere ekleyelim
needle_listeners = "const btnFinish = document.getElementById('btn-finish-job');"
extra_listeners = '''  // Banner Üstü Onarımı Tamamla Butonu (Tepe Hızlı Aksiyon)
  const btnCompleteBanner = document.getElementById('btn-tech-complete-banner');
  if (btnCompleteBanner) {
    btnCompleteBanner.addEventListener('click', () => {
      const mainFinish = document.getElementById('btn-finish-job');
      if (mainFinish) mainFinish.click();
    });
  }

  // Banner Üstü Servis Raporunu Gör Butonu
  const btnViewReportBanner = document.getElementById('btn-tech-view-report-banner');
  if (btnViewReportBanner) {
    btnViewReportBanner.addEventListener('click', () => {
      const btnRep = document.getElementById('btn-generate-ai-report');
      if (btnRep) btnRep.click();
    });
  }

  // Banner Üstü Başa Sar / Süreci Sıfırla Butonu (Test Kolaylığı İçin)
  const btnResetLifecycle = document.getElementById('btn-tech-reset-lifecycle');
  if (btnResetLifecycle) {
    btnResetLifecycle.addEventListener('click', () => {
      if (!state.activeOrder) return;
      state.activeOrder.status = "Kabul Edildi";
      state.activeOrder.departedAt = null;
      state.activeOrder.arrivedAt = null;
      state.activeOrder.completedAt = null;
      state.activeOrder.travel_start_time = null;
      state.activeOrder.work_start_time = null;
      state.activeOrder.repair_finish_time = null;

      syncStatusEverywhere("Kabul Edildi");
      updateTechJourneyUI(state.activeOrder);
      renderTechJobs();
      renderIncomingCalls();
      showToast("🔄 Saha süreç adımları başa sarıldı: 'Kabul Edildi' (1. Yola Çıkışa Hazır)!", "info");
    });
  }

  // 4 Aşamalı Stepper Düğümlerine Tıklayarak da Aşama Değiştirme Esnekliği
  const node1 = document.getElementById('step-node-accepted');
  if (node1) node1.addEventListener('click', () => {
    const btn = document.getElementById('btn-tech-reset-lifecycle');
    if (btn) btn.click();
  });
  const node2 = document.getElementById('step-node-ontheway');
  if (node2) node2.addEventListener('click', () => {
    const btn = document.getElementById('btn-tech-on-the-way');
    if (btn && btn.style.display !== 'none') btn.click();
  });
  const node3 = document.getElementById('step-node-repair');
  if (node3) node3.addEventListener('click', () => {
    const btn = document.getElementById('btn-tech-arrived');
    if (btn && btn.style.display !== 'none') btn.click();
  });
  const node4 = document.getElementById('step-node-completed');
  if (node4) node4.addEventListener('click', () => {
    const btn = document.getElementById('btn-tech-complete-banner');
    if (btn && btn.style.display !== 'none') btn.click();
  });

'''

if needle_listeners in js and 'btn-tech-complete-banner' not in js:
    js = js.replace(needle_listeners, extra_listeners + '  ' + needle_listeners, 1)
    print("Added banner button listeners into app.js!")

with open('Projeler/AI_Teknik_Servis_Yonetimi/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated app.js successfully!")

