# -*- coding: utf-8 -*-
css_code = """
/* ==========================================================================
   21. KURULUM SIHIRBAZI (ONBOARDING WIZARD) VE SIRKET FATURA KARTI STILLERI
   ========================================================================== */

/* Sihirbaz Ilerleme Cubugu (Progress Track) */
.wizard-progress-track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 0 0 20px;
  padding: 8px 12px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow-x: auto;
  gap: 6px;
}

.wizard-step-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.wizard-step-node:hover {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-main);
}

.wizard-step-node.active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%);
  border-color: rgba(168, 85, 247, 0.5);
  color: #fff;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
}

.wizard-step-node.completed {
  color: #34d399;
}

.wizard-step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
}

.wizard-step-node.active .wizard-step-num {
  background: #8b5cf6;
  color: #fff;
}

.wizard-step-node.completed .wizard-step-num {
  background: #10b981;
  color: #fff;
}

.wizard-step-title {
  font-size: 0.8rem;
  font-weight: 600;
}

/* Sektor Secim Kartlari */
.wizard-sector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 12px;
  margin-top: 10px;
}

.wizard-sector-card {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}

.wizard-sector-card:hover {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.12);
  transform: translateY(-2px);
}

.wizard-sector-card.selected {
  border-color: #a78bfa;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(30, 41, 59, 0.9) 100%);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.25);
}

.wizard-sector-icon {
  font-size: 1.8rem;
  margin-bottom: 2px;
}

.wizard-sector-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #f8fafc;
}

.wizard-sector-desc {
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.35;
}

/* Sirket Fatura Karti (Teknisyen Dis Harcama Ibrazi) */
.company-billing-card {
  background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%);
  border: 2px solid #818cf8;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(99, 102, 241, 0.25);
  position: relative;
  overflow: hidden;
}

.company-billing-card::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.billing-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 14px;
  margin-bottom: 16px;
}

.billing-card-badge {
  background: rgba(99, 102, 241, 0.25);
  border: 1px solid #818cf8;
  color: #c7d2fe;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.billing-card-legal-name {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.35;
  margin: 8px 0 0;
  letter-spacing: -0.01em;
}

.billing-card-tax-row {
  display: flex;
  gap: 20px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px dashed rgba(167, 139, 250, 0.4);
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.billing-card-tax-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.billing-card-tax-label {
  font-size: 0.72rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.billing-card-tax-value {
  font-size: 1.15rem;
  font-weight: 800;
  color: #38bdf8;
  font-family: monospace;
  letter-spacing: 0.05em;
}

.billing-card-address-box {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 16px;
}

.billing-card-address-text {
  font-size: 0.95rem;
  color: #f1f5f9;
  line-height: 1.45;
  margin: 4px 0 0;
}

.billing-card-copy-box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Fatura Karti Yazdirma */
@media print {
  body.printing-billing-card {
    background: #fff !important;
    color: #000 !important;
  }
  body.printing-billing-card * {
    visibility: hidden;
  }
  body.printing-billing-card #company-billing-info-modal,
  body.printing-billing-card #company-billing-info-modal .modal-card,
  body.printing-billing-card #company-billing-info-modal .company-billing-card,
  body.printing-billing-card #company-billing-info-modal .company-billing-card * {
    visibility: visible !important;
  }
  body.printing-billing-card #company-billing-info-modal {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    background: #fff !important;
  }
  body.printing-billing-card .company-billing-card {
    border: 2px solid #000 !important;
    color: #000 !important;
    background: #fff !important;
    box-shadow: none !important;
  }
  body.printing-billing-card .billing-card-legal-name,
  body.printing-billing-card .billing-card-tax-value,
  body.printing-billing-card .billing-card-address-text {
    color: #000 !important;
  }
  body.printing-billing-card .modal-close,
  body.printing-billing-card .billing-card-copy-box {
    display: none !important;
  }
}
"""

with open('Projeler/AI_Teknik_Servis_Yonetimi/styles.css', 'r', encoding='utf-8') as f:
    orig = f.read()

if '21. KURULUM SIHIRBAZI' not in orig:
    with open('Projeler/AI_Teknik_Servis_Yonetimi/styles.css', 'w', encoding='utf-8') as f:
        f.write(orig + '\n' + css_code)
    print('Styles appended successfully!')
else:
    print('Styles already present!')

