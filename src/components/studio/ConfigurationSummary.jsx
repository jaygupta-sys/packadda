import React from 'react';

const MATERIAL_LABELS = {
  kraft: 'Kraft',
  '300-gsm': '300 GSM Paperboard',
  '350-gsm': '350 GSM Paperboard',
  corrugated: 'Corrugated',
  rigid: 'Rigid Board'
};

const PRINTING_LABELS = {
  'no-branding': 'No Branding',
  '1-colour': '1 Colour Print',
  'full-colour': 'Full Colour Print',
  'inside-outside': 'Inside + Outside Print'
};

const FINISH_LABELS = {
  matte: 'Matte Finish',
  gloss: 'Gloss Finish',
  'soft-touch': 'Soft Touch Finish',
  foil: 'Foil Finish',
  emboss: 'Emboss Finish'
};

export default function ConfigurationSummary({
  width,
  height,
  depth,
  material,
  printing,
  finish,
  quantity
}) {
  return (
    <div className="configuration-summary-card">
      <div className="summary-card-header">
        <span className="summary-eyebrow">YOUR BOX</span>
        <span className="summary-status-tag">Custom Specification</span>
      </div>

      <div className="summary-details-row">
        <span className="summary-item dim-highlight">{`${width} × ${height} × ${depth} in`}</span>
        <span className="summary-separator">•</span>
        <span className="summary-item">{MATERIAL_LABELS[material] || material}</span>
        <span className="summary-separator">•</span>
        <span className="summary-item">{PRINTING_LABELS[printing] || printing}</span>
        <span className="summary-separator">•</span>
        <span className="summary-item">{FINISH_LABELS[finish] || finish}</span>
        <span className="summary-separator">•</span>
        <span className="summary-item qty-highlight">{`${quantity.toLocaleString()} pcs`}</span>
      </div>
    </div>
  );
}
