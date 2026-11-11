/* İl / İlçe seçici
 * Metin kutularının yerine Türkiye illerini ve seçilen ile ait ilçeleri açılır listede gösterir.
 * Orijinal kutular gizlenerek korunur; böylece mevcut kod aynı kutulardan değeri okumaya devam eder.
 */
(function () {
  'use strict';
  const GEO = window.TR_GEO || {};
  const PROVINCES = Object.keys(GEO);
  const tr = (s) => String(s || '').toLocaleLowerCase('tr-TR').trim();

  function findProvince(name) {
    const n = tr(name);
    return PROVINCES.find((p) => tr(p) === n) || '';
  }
  function findDistrict(prov, name) {
    const n = tr(name);
    return ((GEO[prov] || []).find((d) => tr(d) === n)) || '';
  }

  const valueDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

  // Programla atanan değerleri yakala (sihirbaz ve ayarlar formu value atar)
  function watchValue(el, onSet) {
    Object.defineProperty(el, 'value', {
      configurable: true,
      get() { return valueDesc.get.call(this); },
      set(v) { valueDesc.set.call(this, v); onSet(v); }
    });
  }

  function makeSelect(id, placeholder) {
    const sel = document.createElement('select');
    sel.id = id;
    sel.className = 'form-select form-select-sm';
    sel.style.width = '100%';
    sel.innerHTML = `<option value="">${placeholder}</option>`;
    return sel;
  }
  function fillProvinces(sel) {
    sel.innerHTML = '<option value="">İl seçin</option>' + PROVINCES.map((p) => `<option value="${p}">${p}</option>`).join('');
  }
  function fillDistricts(sel, prov) {
    const list = GEO[prov] || [];
    sel.innerHTML = '<option value="">' + (prov ? 'İlçe seçin' : 'Önce il seçin') + '</option>' +
      list.map((d) => `<option value="${d}">${d}</option>`).join('');
    sel.disabled = !prov;
  }
  function fire(el) {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function hide(el) {
    el.style.display = 'none';
    el.removeAttribute('required');
  }

  // İl ve ilçe ayrı iki kutudaysa (Ayarlar > Genel Merkez adresi)
  function bindPair(cityId, districtId) {
    const cityEl = document.getElementById(cityId);
    const distEl = document.getElementById(districtId);
    if (!cityEl || !distEl || cityEl.dataset.geo) return;
    cityEl.dataset.geo = distEl.dataset.geo = '1';
    const required = cityEl.hasAttribute('required');
    const citySel = makeSelect(cityId + '-sel', 'İl seçin');
    const distSel = makeSelect(districtId + '-sel', 'Önce il seçin');
    fillProvinces(citySel);
    fillDistricts(distSel, '');
    if (required) { citySel.required = true; distSel.required = true; }
    cityEl.parentNode.insertBefore(citySel, cityEl);
    distEl.parentNode.insertBefore(distSel, distEl);
    hide(cityEl);
    hide(distEl);

    function syncFromInputs() {
      const prov = findProvince(valueDesc.get.call(cityEl));
      citySel.value = prov;
      fillDistricts(distSel, prov);
      const d = prov ? findDistrict(prov, valueDesc.get.call(distEl)) : '';
      distSel.value = d;
    }
    citySel.addEventListener('change', () => {
      valueDesc.set.call(cityEl, citySel.value);
      fillDistricts(distSel, citySel.value);
      valueDesc.set.call(distEl, '');
      fire(cityEl); fire(distEl);
    });
    distSel.addEventListener('change', () => {
      valueDesc.set.call(distEl, distSel.value);
      fire(distEl);
    });
    watchValue(cityEl, syncFromInputs);
    watchValue(distEl, syncFromInputs);
    syncFromInputs();
  }

  // Tek kutuda "İl / İlçe" (veya "İlçe / İl") tutulan alanlar
  function bindCombined(inputId, order) {
    const el = document.getElementById(inputId);
    if (!el || el.dataset.geo) return;
    el.dataset.geo = '1';
    const required = el.hasAttribute('required');
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;';
    const citySel = makeSelect(inputId + '-il', 'İl seçin');
    const distSel = makeSelect(inputId + '-ilce', 'Önce il seçin');
    fillProvinces(citySel);
    fillDistricts(distSel, '');
    if (required) { citySel.required = true; distSel.required = true; }
    wrap.appendChild(citySel);
    wrap.appendChild(distSel);
    el.parentNode.insertBefore(wrap, el);
    hide(el);

    function compose() {
      const prov = citySel.value;
      const dist = distSel.value;
      let v = '';
      if (prov && dist) v = order === 'ilce-il' ? `${dist} / ${prov}` : `${prov} / ${dist}`;
      else if (prov) v = prov;
      valueDesc.set.call(el, v);
      fire(el);
    }
    function parse() {
      const raw = valueDesc.get.call(el) || '';
      const parts = raw.split(/[\/,\-]/).map((x) => x.trim()).filter(Boolean);
      let prov = '';
      let dist = '';
      parts.forEach((p) => {
        const pv = findProvince(p);
        if (pv && !prov) prov = pv;
      });
      if (prov) {
        parts.forEach((p) => {
          const d = findDistrict(prov, p);
          if (d && !dist && tr(p) !== tr(prov)) dist = d;
        });
        // İl adı ile aynı adlı ilçe (örn. Bursa/Bursa gibi) için ikinci parçaya bak
        if (!dist && parts.length > 1) dist = findDistrict(prov, parts[1]) || findDistrict(prov, parts[0]);
      }
      citySel.value = prov;
      fillDistricts(distSel, prov);
      distSel.value = dist;
    }
    citySel.addEventListener('change', () => {
      fillDistricts(distSel, citySel.value);
      compose();
    });
    distSel.addEventListener('change', compose);
    watchValue(el, parse);
    parse();
  }

  function init() {
    if (!PROVINCES.length) return;
    bindPair('setting-company-city', 'setting-company-district');
    bindCombined('wizard-company-city', 'il-ilce');
    bindCombined('setting-new-staff-address', 'ilce-il');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Web adresi: http:// yazılmasa da kabul edilir (www.ornek.com veya ornek.com)
  window.normalizeWebsite = function (v) {
    const t = String(v || '').trim();
    if (!t) return '';
    return /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : 'https://' + t;
  };

  window.TRGeo = { init, bindPair, bindCombined };
})();

