/* Gelir & Gider (Kârlılık) Modülü
 * Tüm tutarlar KDV HARİÇ girilir. Veriler tarayıcıda (localStorage) saklanır.
 * Servis işleri (state.workOrders), stok (state.stock), teknisyen masrafları
 * (state.technicianExpenses), personel (state.staff) ve araçlar (state.vehicles) kullanılır.
 */
(function () {
  'use strict';

  const KEY = 'servisai_finance_v1';

  const CATEGORIES = [
    { v: '⛽ Yakıt', t: 'arac' },
    { v: '🚌 Toplu Taşıma', t: 'is' },
    { v: '🚕 Taksi / Özel Ulaşım', t: 'is' },
    { v: '🍔 Yemek & Su', t: 'is' },
    { v: '🅿️ Otopark / Köprü / Otoyol', t: 'is' },
    { v: '📦 Kargo & Nakliye', t: 'is' },
    { v: '🔩 Sahada Alınan Parça (alış)', t: 'is' },
    { v: '🧰 Sarf Malzeme', t: 'is' },
    { v: '🚐 Araç Bakım & Lastik', t: 'arac' },
    { v: '🛡️ Araç Sigorta & Muayene', t: 'arac' },
    { v: '🚗 Araç Kira / Amortisman', t: 'arac' },
    { v: '🏢 Kira & Aidat', t: 'genel' },
    { v: '💡 Elektrik / Su / Telefon', t: 'genel' },
    { v: '💻 Yazılım & Abonelik', t: 'genel' },
    { v: '👥 Maaş / SGK (idari personel)', t: 'genel' },
    { v: '💳 Kart Komisyonu & Banka', t: 'genel' },
    { v: '📣 Reklam & Pazarlama', t: 'genel' },
    { v: '⚖️ Muhasebe / Hukuk', t: 'genel' },
    { v: '➕ Diğer Gider', t: 'genel' }
  ];
  const PAY_METHODS = ['Akaryakıt Aboneliği (sonra öde)', 'Faturalı Alım', 'Fiş / Nakit', 'Kredi Kartı', 'Havale / EFT'];
  const INCOME_CATS = ['Bakım Sözleşmesi', 'Cihaz / Ürün Satışı', 'Ek Hizmet', 'Diğer Gelir'];

  let data = null;
  let ui = { month: '', method: 'gerceklesen' };

  function defaults() {
    return {
      settings: { standardHours: 195, vatRate: 20, techCosts: {}, partCosts: {}, method: 'gerceklesen' },
      expenses: [],
      incomes: [],
      orderMeta: {}
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      data = raw ? Object.assign(defaults(), JSON.parse(raw)) : defaults();
    } catch (e) { data = defaults(); }
    data.settings = Object.assign(defaults().settings, data.settings || {});
    ui.method = data.settings.method || 'gerceklesen';
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { console.warn('Finans kaydedilemedi', e); }
  }

  // ---------- Yardımcılar ----------
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (v) => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; };
  const money = (n) => (Math.round(n * 100) / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
  const todayIso = () => new Date().toISOString().slice(0, 10);

  function monthKey(any) {
    if (!any) return '';
    if (any instanceof Date && !isNaN(any)) {
      return any.toISOString().slice(0, 7);
    }
    const s = String(any).trim();
    let m = s.match(/(\d{4})-(\d{2})/);
    if (m) return m[1] + '-' + m[2];
    m = s.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
    if (m) return m[3] + '-' + String(m[2]).padStart(2, '0');
    const d = new Date(s);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 7);
    return '';
  }
  const S = () => (typeof state !== 'undefined' ? state : { workOrders: [], stock: [], staff: [], vehicles: [], technicianExpenses: [] });

  function isCompletedOrder(o) {
    if (!o) return false;
    if (o.accountingSettled) return true;
    const s = String(o.status || '').toLowerCase().trim();
    return s.includes('tamamlan') || s.includes('teslim') || s.includes('kapat');
  }

  function getOrderDate(o) {
    if (!o) return todayIso();
    return o.settled_at || o.completed_at || o.completedAt || o.created_at || o.createdAt || o.date || todayIso();
  }

  function findStaff(order) {
    const st = S().staff || [];
    if (order.assigned_user_id != null) {
      const x = st.find((s) => String(s.id) === String(order.assigned_user_id));
      if (x) return x;
    }
    if (order.assigned_tech) {
      const x = st.find((s) => s.name === order.assigned_tech);
      if (x) return x;
      return { id: 'n:' + order.assigned_tech, name: order.assigned_tech };
    }
    return null;
  }
  function orderHours(o) {
    const meta = data.orderMeta[o.code || o.tracking_code] || {};
    if (meta.hours !== undefined && meta.hours !== '') return num(meta.hours);
    const mins = num(o.travel_duration_minutes || o.travelDurationMinutes) + num(o.repair_duration_minutes || o.repairDurationMinutes);
    if (mins > 0) return mins / 60;
    if (o.arrived_at && (o.completed_at || o.completedAt)) {
      const d = (new Date(o.completed_at || o.completedAt) - new Date(o.arrived_at)) / 36e5;
      if (isFinite(d) && d > 0) return d;
    }
    return 1;
  }
  function partCostFromStock(code) {
    const it = (S().stock || []).find((x) => x.code === code);
    return it ? num(it.cost) : 0;
  }
  function orderCode(o) { return o.code || o.tracking_code || String(o.id); }

  // ---------- Hesaplama ----------
  function compute(month) {
    const st = S();
    const orders = (st.workOrders || []).filter((o) => isCompletedOrder(o) &&
      monthKey(getOrderDate(o)) === month);

    const monthExp = (data.expenses || []).filter((e) => monthKey(e.date) === month);
    const techExp = (st.technicianExpenses || []).filter((e) => monthKey(e.date || todayIso()) === month)
      .map((e) => ({
        id: e.id,
        date: e.date || todayIso(),
        category: e.category || 'Saha Masrafı',
        desc: e.description || e.desc || 'Saha Harcaması',
        net: num(e.amount),
        vat: 0,
        orderCode: e.workOrderCode || e.orderCode,
        techId: e.techId,
        ext: true
      }));
    const incomes = (data.incomes || []).filter((i) => monthKey(i.date) === month);

    // Teknisyen saat toplamları (garanti dahil tüm işler)
    const techHours = {};
    const rows = orders.map((o) => {
      const code = orderCode(o);
      const meta = data.orderMeta[code] || {};
      const tech = findStaff(o);
      const hours = orderHours(o);
      const key = tech ? String(tech.id) : '';
      if (key) techHours[key] = (techHours[key] || 0) + hours;
      const warranty = !!meta.warranty;

      let parts = Array.isArray(o.usedParts) ? o.usedParts : (Array.isArray(o.used_parts) ? o.used_parts : []);
      // usedParts.price satır toplamıdır (adet x birim); birim fiyat varsa ondan hesapla
      const lineRev = (p) => (p.unitPrice !== undefined && p.unitPrice !== null) ? num(p.qty || 1) * num(p.unitPrice) : num(p.price);
      let partsRev = parts.length ? parts.reduce((a, p) => a + lineRev(p), 0) : num(o.parts_cost !== undefined ? o.parts_cost : (o.partsCost !== undefined ? o.partsCost : 0));
      let partsCost = 0, missingCost = 0;
      parts.forEach((p) => {
        if (p.isLocalPurchase) return; // dış alım zaten masraf kaydı olarak giderde
        const c = num(data.settings.partCosts[p.code]) || num(p.cost) || partCostFromStock(p.code);
        if (!c) missingCost += 1;
        partsCost += num(p.qty || 1) * c;
      });
      let laborRev = num(o.labor_cost !== undefined ? o.labor_cost : (o.laborCost !== undefined ? o.laborCost : 0));
      const orderTotal = num(o.total_cost || o.totalCost || o.grand_total || o.grandTotal || 0);
      if (laborRev === 0 && partsRev === 0 && orderTotal > 0) {
        laborRev = orderTotal;
      }
      if (laborRev === 0 && partsRev === 0 && !warranty) {
        laborRev = 600;
      }
      return {
        o, code, tech, key, hours, warranty,
        revenue: warranty ? 0 : (laborRev + partsRev),
        laborRev, partsRev, partsCost, missingCost,
        direct: 0, labor: 0, vehicle: 0
      };
    });

    // İşe bağlı giderler
    const linked = monthExp.filter((e) => e.orderCode).concat(techExp.filter((e) => e.orderCode));
    rows.forEach((r) => {
      r.direct = linked.filter((e) => e.orderCode === r.code).reduce((a, e) => a + num(e.net), 0);
    });

    // Teknisyen saatlik maliyeti
    const techInfo = {};
    const staffList = st.staff || [];
    const hourlyBase = (ui.method === 'kapasite') ? null : 'gerceklesen';
    let laborPool = 0;
    Object.keys(data.settings.techCosts).forEach((k) => {
      const cost = num(data.settings.techCosts[k]);
      if (!cost) return;
      const hrs = techHours[k] || 0;
      const rate = hourlyBase
        ? (hrs > 0 ? cost / hrs : 0)
        : cost / Math.max(num(data.settings.standardHours), 1);
      const s = staffList.find((x) => String(x.id) === String(k));
      techInfo[k] = { name: s ? s.name : k, cost, hours: hrs, rate, allocated: 0 };
      laborPool += cost;
    });
    rows.forEach((r) => {
      const ti = r.key ? techInfo[r.key] : null;
      r.labor = ti ? r.hours * ti.rate : 0;
      if (ti) ti.allocated += r.labor;
    });
    const idleLabor = Object.values(techInfo).reduce((a, t) => a + Math.max(t.cost - t.allocated, 0), 0);

    // Araç giderleri (yakıt vb.) -> aracı kullanan teknisyenin işlerine saat payıyla
    const vehicleExp = monthExp.filter((e) => !e.orderCode && catType(e.category) === 'arac');
    const vehicles = st.vehicles || [];
    const vehicleTotals = {};
    vehicleExp.forEach((e) => { const k = e.vehicle || ''; vehicleTotals[k] = (vehicleTotals[k] || 0) + num(e.net); });
    let unallocatedVehicle = 0;
    Object.keys(vehicleTotals).forEach((plate) => {
      const veh = vehicles.find((v) => v.plate === plate);
      const drvId = veh && veh.driverId != null ? String(veh.driverId) : null;
      const jobs = drvId ? rows.filter((r) => r.key === drvId) : [];
      const hrs = jobs.reduce((a, r) => a + r.hours, 0);
      if (!hrs) { unallocatedVehicle += vehicleTotals[plate]; return; }
      jobs.forEach((r) => { r.vehicle += vehicleTotals[plate] * (r.hours / hrs); });
    });

    const generalExp = monthExp.filter((e) => !e.orderCode && catType(e.category) === 'genel');

    rows.forEach((r) => {
      r.cost = r.partsCost + r.direct + r.labor + r.vehicle;
      r.profit = r.revenue - r.cost;
    });

    const manualIncome = incomes.reduce((a, i) => a + num(i.net), 0);
    const revenue = rows.reduce((a, r) => a + r.revenue, 0) + manualIncome;
    const jobCosts = rows.reduce((a, r) => a + r.cost, 0);
    const generalTotal = generalExp.reduce((a, e) => a + num(e.net), 0);
    const warrantyCost = rows.filter((r) => r.warranty).reduce((a, r) => a + r.cost, 0);
    const gross = revenue - jobCosts;
    const net = gross - unallocatedVehicle - generalTotal - idleLabor;

    // KDV (tahmini)
    const vr = num(data.settings.vatRate) / 100;
    const outVat = revenue * vr;
    const inVat = monthExp.reduce((a, e) => a + num(e.net) * num(e.vat) / 100, 0);

    // Gider dağılımı
    const dist = {};
    const add = (k, v) => { if (v) dist[k] = (dist[k] || 0) + v; };
    add('🔩 Yedek parça alış maliyeti', rows.reduce((a, r) => a + r.partsCost, 0));
    add('👨‍🔧 Teknisyen işçilik maliyeti', rows.reduce((a, r) => a + r.labor, 0) + idleLabor);
    monthExp.concat(techExp).forEach((e) => add(e.category, num(e.net)));

    return { rows, revenue, manualIncome, jobCosts, generalTotal, warrantyCost, gross, net, idleLabor, unallocatedVehicle, outVat, inVat, techInfo, dist, monthExp, techExp, incomes, techHours };
  }
  function catType(name) {
    const c = CATEGORIES.find((x) => x.v === name);
    return c ? c.t : 'genel';
  }

  // ---------- Arayüz ----------
  function monthOptions() {
    const set = new Set([todayIso().slice(0, 7)]);
    (S().workOrders || []).forEach((o) => { const m = monthKey(getOrderDate(o)); if (m) set.add(m); });
    (data.expenses || []).forEach((e) => { const m = monthKey(e.date); if (m) set.add(m); });
    return Array.from(set).sort().reverse();
  }

  const card = 'background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:14px;';
  const inp = 'width:100%;';

  function kpi(label, value, color, sub) {
    return `<div style="${card}"><div style="font-size:.72rem;color:#94a3b8;font-weight:700;">${label}</div>
      <div style="font-size:1.25rem;font-weight:800;color:${color};margin-top:4px;">${value}</div>
      ${sub ? `<div style="font-size:.7rem;color:#64748b;margin-top:2px;">${sub}</div>` : ''}</div>`;
  }

  function render() {
    const root = document.getElementById('finance-root');
    if (!root) return;
    if (!ui.month) ui.month = todayIso().slice(0, 7);
    const months = monthOptions();
    if (!months.includes(ui.month)) months.unshift(ui.month);
    const r = compute(ui.month);
    const st = S();
    const staff = st.staff || [];
    const vehicles = st.vehicles || [];
    const stock = st.stock || [];
    const col = (n) => (n >= 0 ? '#34d399' : '#fb7185');

    const missingCosts = r.rows.reduce((a, x) => a + x.missingCost, 0);
    const warnings = [];
    if (missingCosts) warnings.push(`${missingCosts} parça kaleminin <strong>alış fiyatı</strong> girilmemiş (Ayarlar bölümünden girin), bu işlerin kârı olduğundan yüksek görünür.`);
    if (!Object.keys(data.settings.techCosts).some((k) => num(data.settings.techCosts[k]))) warnings.push('Teknisyen <strong>aylık maliyeti</strong> girilmemiş, işçilik gideri hesaplanamıyor.');
    Object.values(r.techInfo).forEach((t) => {
      const use = t.hours / Math.max(num(data.settings.standardHours), 1);
      if (t.cost && use < 0.6) warnings.push(`${esc(t.name)} bu ay yalnız ${t.hours.toFixed(1)} saat servis yaptı (kullanım %${Math.round(use * 100)}). Saatlik maliyet yüksek çıkabilir, kapasite yöntemini de deneyin.`);
    });
    if (!r.rows.length) warnings.push('Bu ay için <strong>tamamlanmış servis işi</strong> yok. İşler "Tamamlandı" olunca otomatik buraya gelir.');

    const distTotal = Object.values(r.dist).reduce((a, b) => a + b, 0) || 1;
    const distRows = Object.entries(r.dist).sort((a, b) => b[1] - a[1]).map(([k, v]) => `
      <div style="margin-bottom:6px;"><div style="display:flex;justify-content:space-between;font-size:.78rem;"><span>${esc(k)}</span><span>${money(v)}</span></div>
      <div style="height:6px;background:rgba(255,255,255,.08);border-radius:4px;"><div style="height:6px;width:${Math.round(v / distTotal * 100)}%;background:#6366f1;border-radius:4px;"></div></div></div>`).join('') || '<div style="color:#64748b;font-size:.8rem;">Bu ay gider kaydı yok.</div>';

    const jobRows = r.rows.map((x) => `
      <tr>
        <td>
          <strong>${esc(x.code)}</strong>
          <div style="font-size:.7rem;color:#94a3b8;">${esc(x.o.customer_name || x.o.customer || '')}</div>
          <span style="font-size:.65rem;padding:1px 6px;border-radius:4px;background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);display:inline-block;margin-top:2px;">
            ${esc(x.o.paymentMethod || (x.o.accountingSettled ? 'Tahsil Edildi' : 'Tamamlandı'))}
          </span>
        </td>
        <td>${esc(x.tech ? x.tech.name : '-')}</td>
        <td><input type="number" step="0.25" min="0" value="${(Math.round(x.hours * 100) / 100)}" style="width:70px;" onchange="Fin.setMeta('${esc(x.code)}','hours',this.value)"></td>
        <td style="text-align:center;"><input type="checkbox" ${x.warranty ? 'checked' : ''} onchange="Fin.setMeta('${esc(x.code)}','warranty',this.checked)"></td>
        <td style="font-weight:700;color:#38bdf8;">${money(x.revenue)}</td>
        <td>${money(x.partsCost)}</td>
        <td>${money(x.labor)}</td>
        <td>${money(x.direct + x.vehicle)}</td>
        <td style="font-weight:800;color:${col(x.profit)};">${money(x.profit)}</td>
      </tr>`).join('') || '<tr><td colspan="9" style="color:#64748b;text-align:center;padding:14px;">Bu ay için henüz tamamlanmış ve tahsilatı işlenmiş servis kaydı bulunmuyor.</td></tr>';

    const techRows = Object.values(r.techInfo).map((t) => `
      <tr><td>${esc(t.name)}</td><td>${money(t.cost)}</td><td>${t.hours.toFixed(1)} sa</td><td>${money(t.rate)}/sa</td>
      <td>%${Math.round(t.hours / Math.max(num(data.settings.standardHours), 1) * 100)}</td><td>${money(Math.max(t.cost - t.allocated, 0))}</td></tr>`).join('')
      || '<tr><td colspan="6" style="color:#64748b;">Aylık maliyet girilmemiş</td></tr>';

    const expList = r.monthExp.slice().reverse().map((e) => `
      <tr><td>${esc(e.date)}</td><td>${esc(e.category)}</td><td>${esc(e.desc || '')}${e.liters ? ` (${esc(e.liters)} lt)` : ''}${e.vehicle ? `<div style="font-size:.7rem;color:#94a3b8;">${esc(e.vehicle)}</div>` : ''}${e.orderCode ? `<div style="font-size:.7rem;color:#94a3b8;">İş: ${esc(e.orderCode)}</div>` : ''}</td>
      <td>${esc(e.pay || '')}</td><td>${money(num(e.net))}<div style="font-size:.7rem;color:#94a3b8;">KDV %${esc(e.vat)}</div></td>
      <td><button class="btn btn-outline btn-xs" onclick="Fin.delExpense('${e.id}')">✕</button></td></tr>`).join('')
      || '<tr><td colspan="6" style="color:#64748b;">Kayıt yok</td></tr>';

    const incList = r.incomes.slice().reverse().map((i) => `
      <tr><td>${esc(i.date)}</td><td>${esc(i.category)}</td><td>${esc(i.desc || '')}</td><td>${money(num(i.net))}</td>
      <td><button class="btn btn-outline btn-xs" onclick="Fin.delIncome('${i.id}')">✕</button></td></tr>`).join('')
      || '<tr><td colspan="5" style="color:#64748b;">Kayıt yok</td></tr>';

    const orderOpts = '<option value="">İşe bağlı değil (genel)</option>' + (st.workOrders || []).map((o) => `<option value="${esc(orderCode(o))}">${esc(orderCode(o))} - ${esc(o.customer_name || '')}</option>`).join('');
    const vehOpts = '<option value="">Araç yok</option>' + vehicles.map((v) => `<option value="${esc(v.plate)}">${esc(v.plate)} - ${esc(v.model || '')}</option>`).join('');
    const catOpts = CATEGORIES.map((c) => `<option>${esc(c.v)}</option>`).join('');

    const techCostInputs = staff.map((s) => `
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;"><span style="flex:1;font-size:.8rem;">${esc(s.name)}</span>
      <input type="number" min="0" placeholder="Örn: 45000" value="${esc(data.settings.techCosts[s.id] || '')}" style="width:130px;" onchange="Fin.setTechCost('${esc(s.id)}',this.value)"></div>`).join('') || '<div style="color:#64748b;">Personel yok</div>';
    const partCostInputs = stock.map((p) => `
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;"><span style="flex:1;font-size:.78rem;">${esc(p.code)} <span style="color:#94a3b8;">(satış ${money(num(p.price))})</span></span>
      <input type="number" min="0" placeholder="${p.cost ? 'Stok: ' + p.cost : 'Örn: 300'}" value="${esc(data.settings.partCosts[p.code] || '')}" style="width:110px;" onchange="Fin.setPartCost('${esc(p.code)}',this.value)"></div>`).join('') || '<div style="color:#64748b;">Stok yok</div>';

    root.innerHTML = `
    <div class="content-card">
      <div class="card-header" style="flex-wrap:wrap;gap:10px;">
        <div><h2 class="card-title">💰 Gelir & Gider (Kârlılık)</h2>
        <p class="card-subtitle">Tüm tutarlar KDV hariçtir. Kâr, tamamlanan servis işlerinden otomatik hesaplanır.</p></div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <label style="font-size:.78rem;color:#94a3b8;">Dönem:</label>
          <select class="form-select" onchange="Fin.setMonth(this.value)">${months.map((m) => `<option value="${m}" ${m === ui.month ? 'selected' : ''}>${m}</option>`).join('')}</select>
          <label style="font-size:.78rem;color:#94a3b8;">İşçilik yöntemi:</label>
          <select class="form-select" onchange="Fin.setMethod(this.value)">
            <option value="gerceklesen" ${ui.method === 'gerceklesen' ? 'selected' : ''}>Gerçekleşen saate göre</option>
            <option value="kapasite" ${ui.method === 'kapasite' ? 'selected' : ''}>Standart aylık saate göre</option>
          </select>
          <button class="btn btn-outline btn-sm" onclick="Fin.exportCsv()">📥 Excel / CSV</button>
        </div>
      </div>

      ${warnings.length ? `<div style="background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.35);border-radius:10px;padding:10px 14px;margin:10px 0;font-size:.8rem;color:#fde68a;">${warnings.map((w) => '⚠️ ' + w).join('<br>')}</div>` : ''}

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin:12px 0;">
        ${kpi('GELİR', money(r.revenue), '#34d399', 'Garanti işler 0 gelir')}
        ${kpi('İŞE BAĞLI GİDER', money(r.jobCosts), '#fbbf24', 'Parça, işçilik, saha, araç')}
        ${kpi('BRÜT KÂR', money(r.gross), col(r.gross))}
        ${kpi('SABİT / GENEL GİDER', money(r.generalTotal + r.unallocatedVehicle + r.idleLabor), '#fbbf24', 'Kira, abonelik, boşta işgücü')}
        ${kpi('NET KÂR', money(r.net), col(r.net))}
        ${kpi('GARANTİ GİDERİ', money(r.warrantyCost), '#fb7185', 'Gelir getirmeyen işler')}
        ${kpi('TAHMİNİ ÖDENECEK KDV', money(r.outVat - r.inVat), '#a5b4fc', 'Hesaplanan ' + money(r.outVat) + ' - İndirilecek ' + money(r.inVat))}
      </div>

      <h3 style="font-size:.95rem;margin:16px 0 8px;">📋 İş Bazında Kârlılık</h3>
      <div style="overflow-x:auto;"><table class="mini-table" style="width:100%;"><thead><tr>
        <th>Servis</th><th>Teknisyen</th><th>Süre (sa)</th><th>Garanti</th><th>Gelir</th><th>Parça alış</th><th>İşçilik</th><th>Saha + araç</th><th>Kâr</th></tr></thead>
        <tbody>${jobRows}</tbody></table></div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px;margin-top:16px;">
        <div style="${card}"><h3 style="font-size:.9rem;margin-bottom:8px;">👨‍🔧 Teknisyen Saatlik Maliyeti</h3>
          <div style="overflow-x:auto;"><table class="mini-table" style="width:100%;"><thead><tr><th>Teknisyen</th><th>Aylık maliyet</th><th>Servis saati</th><th>Saatlik</th><th>Kullanım</th><th>Boşta kalan</th></tr></thead><tbody>${techRows}</tbody></table></div>
          <div style="font-size:.72rem;color:#94a3b8;margin-top:6px;">Gerçekleşen yöntemde: aylık maliyet ÷ o ay yaptığı toplam servis saati (garantili işler dahil).</div></div>
        <div style="${card}"><h3 style="font-size:.9rem;margin-bottom:8px;">📊 Gider Dağılımı</h3>${distRows}</div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:14px;margin-top:16px;">
        <div style="${card}"><h3 style="font-size:.9rem;margin-bottom:8px;">➕ Gider Ekle (yakıt, yol, yemek, araç, sabit gider...)</h3>
          <div class="form-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><label class="form-label">Tarih</label><input type="date" id="fin-e-date" class="form-input" value="${todayIso()}" style="${inp}"></div>
            <div><label class="form-label">Kategori</label><select id="fin-e-cat" class="form-select" style="${inp}">${catOpts}</select></div>
            <div><label class="form-label">Tutar (KDV hariç)</label><input type="number" id="fin-e-net" class="form-input" placeholder="Örn: 1250" style="${inp}"></div>
            <div><label class="form-label">KDV %</label><input type="number" id="fin-e-vat" class="form-input" value="20" style="${inp}"></div>
            <div><label class="form-label">Ödeme / Alım şekli</label><select id="fin-e-pay" class="form-select" style="${inp}">${PAY_METHODS.map((p) => `<option>${p}</option>`).join('')}</select></div>
            <div><label class="form-label">Litre (yakıtsa)</label><input type="number" id="fin-e-lt" class="form-input" placeholder="Örn: 45" style="${inp}"></div>
            <div><label class="form-label">Araç</label><select id="fin-e-veh" class="form-select" style="${inp}">${vehOpts}</select></div>
            <div><label class="form-label">Servis işine bağla</label><select id="fin-e-order" class="form-select" style="${inp}">${orderOpts}</select></div>
            <div style="grid-column:1/-1;"><label class="form-label">Açıklama</label><input type="text" id="fin-e-desc" class="form-input" placeholder="Örn: Opet abonelik Kasım dönemi" style="${inp}"></div>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:10px;" onclick="Fin.addExpense()">Gideri Kaydet</button>
          <div style="font-size:.72rem;color:#94a3b8;margin-top:6px;">Akaryakıt aboneliği: ay sonu kesilen fatura tutarını tek kayıt girip aracı seçin; araç giderleri o aracı kullanan teknisyenin işlerine süre payına göre dağıtılır.</div></div>

        <div style="${card}"><h3 style="font-size:.9rem;margin-bottom:8px;">➕ Ek Gelir Ekle</h3>
          <div class="form-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><label class="form-label">Tarih</label><input type="date" id="fin-i-date" class="form-input" value="${todayIso()}" style="${inp}"></div>
            <div><label class="form-label">Tür</label><select id="fin-i-cat" class="form-select" style="${inp}">${INCOME_CATS.map((c) => `<option>${c}</option>`).join('')}</select></div>
            <div><label class="form-label">Tutar (KDV hariç)</label><input type="number" id="fin-i-net" class="form-input" placeholder="Örn: 8000" style="${inp}"></div>
            <div><label class="form-label">Açıklama</label><input type="text" id="fin-i-desc" class="form-input" placeholder="Örn: Yıllık bakım sözleşmesi" style="${inp}"></div>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:10px;" onclick="Fin.addIncome()">Geliri Kaydet</button>
          <h3 style="font-size:.9rem;margin:16px 0 8px;">Bu ayın ek gelirleri</h3>
          <table class="mini-table" style="width:100%;"><tbody>${incList}</tbody></table></div>
      </div>

      <h3 style="font-size:.95rem;margin:16px 0 8px;">🧾 Bu Ayın Gider Kayıtları</h3>
      <div style="overflow-x:auto;"><table class="mini-table" style="width:100%;"><thead><tr><th>Tarih</th><th>Kategori</th><th>Açıklama</th><th>Ödeme</th><th>Tutar</th><th></th></tr></thead><tbody>${expList}</tbody></table></div>

      <details style="margin-top:16px;${card}"><summary style="cursor:pointer;font-weight:700;">⚙️ Ayarlar: Teknisyen aylık maliyeti, parça alış fiyatları, KDV</summary>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:12px;">
          <div><h4 style="font-size:.85rem;margin-bottom:6px;">Teknisyen aylık toplam maliyeti (maaş + SGK + yan haklar)</h4>${techCostInputs}
            <div style="margin-top:8px;"><label class="form-label">Standart aylık çalışma saati</label>
            <input type="number" class="form-input" value="${esc(data.settings.standardHours)}" style="width:120px;" onchange="Fin.setSetting('standardHours',this.value)"></div>
            <div style="margin-top:8px;"><label class="form-label">Satışlarda KDV %</label>
            <input type="number" class="form-input" value="${esc(data.settings.vatRate)}" style="width:120px;" onchange="Fin.setSetting('vatRate',this.value)"></div></div>
          <div><h4 style="font-size:.85rem;margin-bottom:6px;">Yedek parça alış fiyatları (KDV hariç). Boş bırakırsanız Stok ekranındaki alış fiyatı kullanılır.</h4>${partCostInputs}</div>
        </div></details>
    </div>`;
  }

  // ---------- Eylemler ----------
  const Fin = {
    setMonth(v) { ui.month = v; render(); },
    setMethod(v) { ui.method = v; data.settings.method = v; save(); render(); },
    setSetting(k, v) { data.settings[k] = num(v); save(); render(); },
    setTechCost(id, v) { data.settings.techCosts[id] = num(v); save(); render(); },
    setPartCost(code, v) { data.settings.partCosts[code] = num(v); save(); render(); },
    setMeta(code, k, v) {
      data.orderMeta[code] = data.orderMeta[code] || {};
      data.orderMeta[code][k] = v;
      save(); render();
    },
    addExpense() {
      const g = (id) => (document.getElementById(id) || {}).value || '';
      const net = num(g('fin-e-net'));
      if (!net) { alert('Lütfen tutarı girin (KDV hariç).'); return; }
      data.expenses.push({
        id: 'E' + Date.now(), date: g('fin-e-date') || todayIso(), category: g('fin-e-cat'), net,
        vat: num(g('fin-e-vat')), pay: g('fin-e-pay'), liters: g('fin-e-lt'), vehicle: g('fin-e-veh'),
        orderCode: g('fin-e-order'), desc: g('fin-e-desc')
      });
      ui.month = monthKey(g('fin-e-date')) || ui.month;
      save(); render();
      if (typeof showToast === 'function') showToast('Gider kaydedildi');
    },
    delExpense(id) { data.expenses = data.expenses.filter((e) => e.id !== id); save(); render(); },
    addIncome() {
      const g = (id) => (document.getElementById(id) || {}).value || '';
      const net = num(g('fin-i-net'));
      if (!net) { alert('Lütfen tutarı girin (KDV hariç).'); return; }
      data.incomes.push({ id: 'I' + Date.now(), date: g('fin-i-date') || todayIso(), category: g('fin-i-cat'), net, desc: g('fin-i-desc') });
      ui.month = monthKey(g('fin-i-date')) || ui.month;
      save(); render();
      if (typeof showToast === 'function') showToast('Gelir kaydedildi');
    },
    delIncome(id) { data.incomes = data.incomes.filter((i) => i.id !== id); save(); render(); },
    exportCsv() {
      const r = compute(ui.month);
      const lines = [['Servis', 'Musteri', 'Teknisyen', 'Saat', 'Garanti', 'Gelir', 'Parca alis', 'Iscilik', 'Saha+Arac', 'Kar']];
      r.rows.forEach((x) => lines.push([x.code, x.o.customer_name || '', x.tech ? x.tech.name : '', x.hours.toFixed(2), x.warranty ? 'Evet' : 'Hayir',
        x.revenue.toFixed(2), x.partsCost.toFixed(2), x.labor.toFixed(2), (x.direct + x.vehicle).toFixed(2), x.profit.toFixed(2)]));
      lines.push([]);
      lines.push(['Gelir', r.revenue.toFixed(2)], ['Is gideri', r.jobCosts.toFixed(2)], ['Brut kar', r.gross.toFixed(2)],
        ['Genel/sabit', (r.generalTotal + r.unallocatedVehicle + r.idleLabor).toFixed(2)], ['Net kar', r.net.toFixed(2)]);
      const csv = '\uFEFF' + lines.map((l) => l.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(';')).join('\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      a.download = 'gelir_gider_' + ui.month + '.csv';
      a.click();
    },
    render
  };
  window.Fin = Fin;

  // ---------- Sayfaya yerleştirme ----------
  function mount() {
    load();
    const reports = document.getElementById('reports-view');
    if (!reports || document.getElementById('finance-view')) return;

    // Her üst menü çubuğuna "Gelir & Gider" düğmesi ekle
    document.querySelectorAll('.admin-subnav-left').forEach((left) => {
      if (left.querySelector('#btn-tab-finance')) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'admin-subnav-btn';
      b.setAttribute('data-tab', 'finance-view');
      b.id = 'btn-tab-finance';
      b.title = 'Gelir, gider ve kârlılık hesabı';
      b.setAttribute('onclick', "switchToAdminSection('finance-view')");
      b.innerHTML = '<span class="subnav-icon">💰</span><span>Gelir & Gider</span>';
      left.appendChild(b);
    });

    const panel = document.createElement('section');
    panel.id = 'finance-view';
    panel.className = 'view-panel';
    const bar = reports.querySelector('.admin-subnav-bar');
    if (bar) {
      const clone = bar.cloneNode(true);
      clone.querySelectorAll('.admin-subnav-btn').forEach((x) => x.classList.toggle('active', x.getAttribute('data-tab') === 'finance-view'));
      panel.appendChild(clone);
    }
    const root = document.createElement('div');
    root.id = 'finance-root';
    panel.appendChild(root);
    reports.parentNode.insertBefore(panel, reports.nextSibling);

    const orig = window.switchToAdminSection;
    window.switchToAdminSection = function (targetId) {
      const res = orig.apply(this, arguments);
      if (targetId === 'finance-view') { render(); }
      return res;
    };
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();

