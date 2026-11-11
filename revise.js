/* Revize / Güncelleme Modülü
 * Teknisyen, servis çağrısı, stok kalemi ve cihaz kategorisi kayıtlarını sonradan düzeltmeyi sağlar.
 * Ortak bir "Düzenle" penceresi kullanır; düzenle düğmeleri kartlara otomatik eklenir.
 */
(function () {
  'use strict';

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const toast = (m) => { if (typeof showToast === 'function') showToast(m); };
  const call = (fn, ...a) => { try { if (typeof window[fn] === 'function') return window[fn](...a); } catch (e) { console.warn(fn, e); } };

  // ---------- Ortak düzenleme penceresi ----------
  function openEditModal(opts) {
    const old = document.getElementById('revise-overlay');
    if (old) old.remove();
    const ov = document.createElement('div');
    ov.id = 'revise-overlay';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100001;display:flex;align-items:flex-start;justify-content:center;padding:24px 14px;overflow-y:auto;';
    const fieldHtml = opts.fields.map((f) => {
      const id = 'rv-' + f.key;
      const full = (f.type === 'textarea' || f.type === 'geo' || f.wide) ? 'grid-column:1/-1;' : '';
      let ctl;
      const val = f.value == null ? '' : f.value;
      if (f.type === 'select') {
        const opt = (f.options || []).map((o) => {
          const ov2 = typeof o === 'object' ? o.value : o;
          const ol = typeof o === 'object' ? o.label : o;
          return `<option value="${esc(ov2)}" ${String(ov2) === String(val) ? 'selected' : ''}>${esc(ol)}</option>`;
        }).join('');
        ctl = `<select id="${id}" class="form-select form-select-sm" style="width:100%;">${opt}</select>`;
      } else if (f.type === 'textarea') {
        ctl = `<textarea id="${id}" rows="3" class="form-input" style="width:100%;" placeholder="${esc(f.placeholder || '')}">${esc(val)}</textarea>`;
      } else {
        const t = f.type === 'geo' ? 'text' : (f.type || 'text');
        ctl = `<input id="${id}" type="${t}" class="form-input form-input-sm" style="width:100%;" value="${esc(val)}" placeholder="${esc(f.placeholder || '')}" ${f.readonly ? 'readonly' : ''} ${f.min !== undefined ? `min="${f.min}"` : ''}>`;
      }
      return `<div style="${full}"><label style="font-size:.76rem;color:#94a3b8;display:block;margin-bottom:3px;">${esc(f.label)}${f.required ? ' *' : ''}</label>${ctl}</div>`;
    }).join('');
    ov.innerHTML = `
      <div style="background:#131E36;border:1px solid rgba(99,102,241,.5);border-radius:14px;padding:20px;max-width:640px;width:100%;color:#f8fafc;box-shadow:0 10px 40px rgba(0,0,0,.5);">
        <div style="font-weight:800;font-size:1.05rem;">✏️ ${esc(opts.title)}</div>
        ${opts.subtitle ? `<div style="font-size:.8rem;color:#94a3b8;margin:4px 0 12px;">${esc(opts.subtitle)}</div>` : '<div style="height:10px"></div>'}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${fieldHtml}</div>
        ${opts.extraHtml || ''}
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;flex-wrap:wrap;">
          <button type="button" id="rv-cancel" class="btn btn-outline btn-sm">Vazgeç</button>
          <button type="button" id="rv-save" class="btn btn-primary btn-sm">💾 Değişiklikleri Kaydet</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    opts.fields.forEach((f) => {
      if (f.type === 'geo' && window.TRGeo) window.TRGeo.bindCombined('rv-' + f.key, 'ilce-il');
    });
    const close = () => ov.remove();
    ov.querySelector('#rv-cancel').onclick = close;
    ov.addEventListener('mousedown', (e) => { if (e.target === ov) close(); });
    ov.querySelector('#rv-save').onclick = () => {
      const vals = {};
      for (const f of opts.fields) {
        const el = document.getElementById('rv-' + f.key);
        let v = el ? el.value : '';
        if (typeof v === 'string') v = v.trim();
        if (f.required && !v) { alert(`"${f.label}" alanı boş bırakılamaz.`); return; }
        vals[f.key] = f.type === 'number' ? (parseFloat(v) || 0) : v;
      }
      const res = opts.onSave(vals);
      if (res !== false) close();
    };
    return ov;
  }
  window.openEditModal = openEditModal;

  // ---------- Teknisyen / personel ----------
  function editStaff(id) {
    const s = (state.staff || []).find((x) => String(x.id) === String(id));
    if (!s) return;
    const roleOpts = Array.from(document.querySelectorAll('#setting-new-staff-role option')).map((o) => o.value);
    if (s.role && !roleOpts.includes(s.role)) roleOpts.unshift(s.role);
    openEditModal({
      title: 'Teknisyen / Personel Bilgilerini Düzenle',
      subtitle: s.name,
      fields: [
        { key: 'name', label: 'Ad Soyad', value: s.name, required: true },
        { key: 'role', label: 'Görev', type: 'select', options: roleOpts, value: s.role },
        { key: 'specialty', label: 'Uzmanlık', value: s.specialty },
        { key: 'phone', label: 'Telefon', type: 'tel', value: s.phone },
        { key: 'email', label: 'E-posta', type: 'email', value: s.email },
        { key: 'tc', label: 'T.C. Kimlik No', value: s.tc },
        { key: 'sgk', label: 'SGK Sicil No', value: s.sgk },
        { key: 'vehiclePlate', label: 'Zimmetli Araç Plakası', value: s.vehiclePlate },
        { key: 'pin', label: '4 Haneli Giriş PIN', value: s.pin },
        { key: 'location', label: 'İkametgâh / Saha Çıkış Bölgesi (İl ve İlçe)', type: 'geo', value: s.location || s.baseAddress }
      ],
      onSave(v) {
        const oldName = s.name;
        Object.assign(s, {
          name: v.name, role: v.role, specialty: v.specialty || s.specialty,
          phone: v.phone, email: v.email, tc: v.tc, sgk: v.sgk,
          vehiclePlate: (v.vehiclePlate || 'Zimmetsiz').toUpperCase() === 'ZİMMETSİZ' ? 'Zimmetsiz' : v.vehiclePlate.toUpperCase(),
          pin: v.pin || s.pin || '1234',
          location: v.location || s.location, baseAddress: v.location || s.baseAddress
        });
        s.avatar = v.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
        // Ad değiştiyse atanmış işlerdeki ad ve araç sürücü adını da güncelle
        if (oldName !== v.name) {
          const upd = (o) => { if (o && o.assigned_tech === oldName) o.assigned_tech = v.name; };
          (state.workOrders || []).forEach(upd);
          Object.values(state.staffJobs || {}).forEach((arr) => (arr || []).forEach(upd));
          (state.vehicles || []).forEach((veh) => { if (String(veh.driverId) === String(s.id)) veh.driverName = v.name; });
          call('saveWorkOrdersToLocalStorage');
        }
        call('saveStaffToLocalStorage');
        call('renderStaffList');
        call('renderSettingsStaff');
        call('populateActiveTechDropdown');
        call('renderIncomingCalls');
        toast(`✏️ ${v.name} bilgileri güncellendi.`);
      }
    });
  }

  // ---------- Servis çağrısı / iş emri ----------
  function findOrderObjects(code) {
    const list = [];
    (state.workOrders || []).forEach((o) => { if ((o.tracking_code || o.code) === code) list.push(o); });
    Object.values(state.staffJobs || {}).forEach((arr) => (arr || []).forEach((o) => { if ((o.tracking_code || o.code) === code) list.push(o); }));
    if (state.activeOrder && (state.activeOrder.code || state.activeOrder.tracking_code) === code) list.push(state.activeOrder);
    return list;
  }
  function editOrder(code) {
    const objs = findOrderObjects(code);
    const o = objs[0];
    if (!o) { toast('⚠️ Çağrı kaydı bulunamadı.'); return; }
    const g = (...k) => { for (const x of k) if (o[x] != null && o[x] !== '') return o[x]; return ''; };
    openEditModal({
      title: `Servis Çağrısını Düzenle #${code}`,
      subtitle: 'Girişte hatalı veya eksik kalan bilgileri düzeltebilirsiniz. Teknisyen ataması ve durum değişmez.',
      fields: [
        { key: 'customer_name', label: 'Müşteri / Firma Adı', value: g('customer_name', 'customer'), required: true },
        { key: 'customer_phone', label: 'Telefon', type: 'tel', value: g('customer_phone', 'phone') },
        { key: 'customer_address', label: 'Müşteri Adresi', value: g('customer_address', 'address'), wide: true },
        { key: 'device_brand', label: 'Cihaz Markası', value: g('device_brand', 'brand') },
        { key: 'device_model', label: 'Cihaz Modeli', value: g('device_model', 'model') },
        { key: 'serial_number', label: 'Seri No', value: g('serial_number', 'serial') },
        { key: 'priority', label: 'Öncelik', type: 'select', options: ['Normal', 'Yüksek', 'Acil'], value: g('priority') || 'Normal' },
        { key: 'channel', label: 'Çağrı Kanalı', type: 'select', options: ['Telefon', 'E-posta', 'WhatsApp', 'Elden Teslim'], value: g('channel') || 'Telefon' },
        { key: 'customer_complaint', label: 'Arıza / Şikâyet Açıklaması', type: 'textarea', value: g('customer_complaint', 'complaint') }
      ],
      onSave(v) {
        objs.forEach((x) => {
          x.customer_name = v.customer_name; if ('customer' in x) x.customer = v.customer_name;
          x.customer_phone = v.customer_phone; if ('phone' in x) x.phone = v.customer_phone;
          x.customer_address = v.customer_address; if ('address' in x) x.address = v.customer_address;
          x.device_brand = v.device_brand; if ('brand' in x) x.brand = v.device_brand;
          x.device_model = v.device_model; if ('model' in x) x.model = v.device_model;
          x.device = `${v.device_brand} ${v.device_model}`.trim();
          x.serial_number = v.serial_number; if ('serial' in x) x.serial = v.serial_number;
          x.priority = v.priority;
          x.channel = v.channel;
          x.customer_complaint = v.customer_complaint; if ('complaint' in x) x.complaint = v.customer_complaint;
        });
        call('saveWorkOrdersToLocalStorage');
        call('renderIncomingCalls');
        call('updateActiveOrdersKPI');
        if (state.activeOrder && (state.activeOrder.code || state.activeOrder.tracking_code) === code) {
          const t = document.getElementById('active-job-title');
          const c = document.getElementById('active-job-customer');
          if (t) t.textContent = `${v.device_brand} ${v.device_model} - ${v.customer_complaint.slice(0, 50)}`;
          if (c) c.textContent = `Müşteri: ${v.customer_name} • ${v.customer_address}`;
        }
        toast(`✏️ #${code} çağrı bilgileri güncellendi.`);
      }
    });
  }

  // ---------- Stok kalemi ----------
  function editStock(code) {
    const it = (state.stock || []).find((x) => x.code === code);
    if (!it) return;
    const cats = (state.categories || []).map((c) => c.name);
    if (it.category && !cats.includes(it.category)) cats.unshift(it.category);
    openEditModal({
      title: 'Stok Kalemini Düzenle',
      subtitle: `${it.code} • Alış fiyatı ve kâr oranı için kartın altındaki 💹 düğmesini kullanın.`,
      fields: [
        { key: 'code', label: 'Parça Kodu', value: it.code, required: true },
        { key: 'name', label: 'Parça Adı', value: it.name, required: true },
        { key: 'category', label: 'Kategori', type: 'select', options: cats.length ? cats : [it.category || 'Genel Parça & Sarf'], value: it.category },
        { key: 'warranty', label: 'Garanti (örn: 12 Ay)', value: it.warranty },
        { key: 'central', label: '🏢 Merkez Depo adedi', type: 'number', min: 0, value: it.central || 0 },
        { key: 'workshop', label: '🔬 Merkez Atölye adedi', type: 'number', min: 0, value: it.workshop || 0 },
        { key: 'vehicle1', label: '🚐 1. Araç adedi', type: 'number', min: 0, value: it.vehicle1 || 0 },
        { key: 'vehicle2', label: '🚐 2. Araç adedi', type: 'number', min: 0, value: it.vehicle2 || 0 }
      ],
      onSave(v) {
        if (v.code !== it.code && (state.stock || []).some((x) => x !== it && x.code.toLowerCase() === v.code.toLowerCase())) {
          alert('Bu parça kodu başka bir kalemde kullanılıyor.');
          return false;
        }
        Object.assign(it, {
          code: v.code, name: v.name, category: v.category, warranty: v.warranty || it.warranty,
          central: Math.max(0, v.central), workshop: Math.max(0, v.workshop),
          vehicle1: Math.max(0, v.vehicle1), vehicle2: Math.max(0, v.vehicle2)
        });
        call('saveStockToLocalStorage');
        call('renderStockTable');
        call('updateVehiclePartDropdown');
        call('renderStockCategoryPills');
        toast(`✏️ ${v.code} stok kaydı güncellendi.`);
      }
    });
  }

  // ---------- Cihaz kategorisi ----------
  function editDevice(id) {
    const d = (state.deviceScopes || []).find((x) => String(x.id) === String(id));
    if (!d) return;
    openEditModal({
      title: 'Cihaz Kategorisini Düzenle',
      subtitle: d.name,
      fields: [
        { key: 'name', label: 'Kategori Adı', value: d.name, required: true },
        { key: 'icon', label: 'Simge', value: d.icon },
        { key: 'brands', label: 'Markalar', value: d.brands, wide: true },
        { key: 'scope', label: 'Müdahale Kapsamı', value: d.scope, wide: true },
        { key: 'warranty', label: 'Garanti', value: d.warranty },
        { key: 'duration', label: 'Tahmini Süre', value: d.duration }
      ],
      onSave(v) {
        Object.assign(d, v);
        call('saveDeviceScopesToLocalStorage');
        call('renderSettingsDevices');
        toast(`✏️ ${v.name} kategorisi güncellendi.`);
      }
    });
  }

  window.Revise = { editStaff, editOrder, editStock, editDevice, inject: () => inject() };

  // ---------- Düzenle düğmelerini kartlara ekle ----------
  const BTN = 'btn btn-outline btn-sm';
  function inject() {
    // Servis çağrıları
    document.querySelectorAll('.btn-call-detail, .btn-call-label').forEach((b) => {
      const parent = b.parentElement;
      const code = b.getAttribute('data-code');
      if (!parent || !code || parent.querySelector('.btn-call-edit')) return;
      const n = document.createElement('button');
      n.type = 'button';
      n.className = BTN + ' btn-call-edit';
      n.setAttribute('data-code', code);
      n.style.cssText = 'padding:3px 8px;font-size:.75rem;';
      n.title = 'Çağrı bilgilerini düzenle';
      n.textContent = '✏️ Düzenle';
      parent.appendChild(n);
    });
    // Personel kartları
    document.querySelectorAll('.settings-staff-card').forEach((card) => {
      if (card.querySelector('.btn-staff-edit')) return;
      const del = card.querySelector('[onclick^="deleteSettingsStaff"]');
      const id = card.getAttribute('data-staff-id');
      if (!del || !id) return;
      const n = document.createElement('button');
      n.type = 'button';
      n.className = 'btn btn-outline btn-xs btn-staff-edit';
      n.style.cssText = 'padding:2px 6px;font-size:.72rem;margin-right:4px;';
      n.setAttribute('data-id', id);
      n.textContent = '✏️ Düzenle';
      del.parentNode.insertBefore(n, del);
    });
    // Cihaz kategorileri
    document.querySelectorAll('.settings-device-card').forEach((card) => {
      if (card.querySelector('.btn-device-edit')) return;
      const del = card.querySelector('[onclick^="deleteSettingsDeviceScope"]');
      const id = card.getAttribute('data-device-id');
      if (!del || !id) return;
      const n = document.createElement('button');
      n.type = 'button';
      n.className = 'btn btn-outline btn-xs btn-device-edit';
      n.style.cssText = 'padding:2px 6px;font-size:.72rem;margin-right:4px;';
      n.setAttribute('data-id', id);
      n.textContent = '✏️ Düzenle';
      del.parentNode.insertBefore(n, del);
    });
    // Stok satırları
    document.querySelectorAll('.btn-delete-stock').forEach((b) => {
      const code = b.getAttribute('data-code');
      const parent = b.parentElement;
      if (!code || !parent || parent.querySelector('.btn-stock-edit')) return;
      const n = document.createElement('button');
      n.type = 'button';
      n.className = 'btn btn-outline btn-xs btn-stock-edit';
      n.style.cssText = 'padding:2px 6px;font-size:.72rem;margin-right:4px;';
      n.setAttribute('data-code', code);
      n.title = 'Parça adı, kodu, kategori ve adetleri düzenle';
      n.textContent = '✏️ Düzenle';
      parent.insertBefore(n, b);
    });
  }

  let pending = false;
  const obs = new MutationObserver(() => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; inject(); });
  });

  document.addEventListener('click', (e) => {
    const t = e.target.closest ? e.target.closest('.btn-call-edit,.btn-staff-edit,.btn-device-edit,.btn-stock-edit') : null;
    if (!t) return;
    e.preventDefault();
    e.stopPropagation();
    if (t.classList.contains('btn-call-edit')) editOrder(t.getAttribute('data-code'));
    else if (t.classList.contains('btn-staff-edit')) editStaff(t.getAttribute('data-id'));
    else if (t.classList.contains('btn-device-edit')) editDevice(t.getAttribute('data-id'));
    else if (t.classList.contains('btn-stock-edit')) editStock(t.getAttribute('data-code'));
  }, true);

  function start() {
    obs.observe(document.body, { childList: true, subtree: true });
    inject();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
