import React from 'react';
import { Check } from 'lucide-react';

const MATERIALS = [
  {
    id: 'kraft',
    name: 'KRAFT',
    descriptor: 'Natural textured finish',
    swatchColor: '#C8A67B',
    swatchTexture: 'radial-gradient(#b89468 15%, #c8a67b 85%)'
  },
  {
    id: '300-gsm',
    name: '300 GSM PAPERBOARD',
    descriptor: 'Smooth premium surface',
    swatchColor: '#F7F4EF',
    swatchTexture: 'linear-gradient(135deg, #FAF7F2 0%, #EFE8DF 100%)'
  },
  {
    id: '350-gsm',
    name: '350 GSM PAPERBOARD',
    descriptor: 'Dense heavyweight board',
    swatchColor: '#EFE8DE',
    swatchTexture: 'linear-gradient(135deg, #F0ECE4 0%, #E5DDD2 100%)'
  },
  {
    id: 'corrugated',
    name: 'CORRUGATED',
    descriptor: 'Strong shipping grade',
    swatchColor: '#BA9465',
    swatchTexture: 'repeating-linear-gradient(90deg, #BA9465, #BA9465 4px, #AF8758 4px, #AF8758 8px)'
  },
  {
    id: 'rigid',
    name: 'RIGID BOARD',
    descriptor: 'Luxury structural finish',
    swatchColor: '#382015',
    swatchTexture: 'linear-gradient(135deg, #49291D 0%, #30180F 100%)'
  }
];

export default function MaterialStep({ selectedMaterial, onSelectMaterial }) {
  return (
    <div className="config-step-panel material-panel">
      <div className="step-header">
        <h3 className="step-title">CHOOSE YOUR MATERIAL.</h3>
        <p className="step-desc">
          Select from our certified sustainably sourced paperboards and high-density fluted substrates.
        </p>
      </div>

      <div className="materials-list-grid" role="radiogroup" aria-label="Select packaging material">
        {MATERIALS.map((mat) => {
          const isSelected = selectedMaterial === mat.id;

          return (
            <button
              key={mat.id}
              type="button"
              className={`material-option-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectMaterial(mat.id)}
              role="radio"
              aria-checked={isSelected}
            >
              {/* Subtle Visual Swatch */}
              <div
                className="material-swatch-circle"
                style={{
                  background: mat.swatchTexture,
                  border: mat.id === '300-gsm' ? '1px solid rgba(73, 41, 29, 0.15)' : 'none'
                }}
                aria-hidden="true"
              />

              <div className="material-info-col">
                <span className="material-name">{mat.name}</span>
                <span className="material-desc">{mat.descriptor}</span>
              </div>

              <div className="material-check-bubble" aria-hidden="true">
                {isSelected ? (
                  <Check size={13} color="#FFFFFF" strokeWidth={3} />
                ) : (
                  <span className="empty-check-dot" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
