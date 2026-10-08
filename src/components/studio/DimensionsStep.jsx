import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function DimensionsStep({
  width,
  height,
  depth,
  onChangeDimension
}) {
  const handleStep = (dim, delta) => {
    const minMap = { width: 4, height: 3, depth: 2 };
    const maxMap = { width: 36, height: 28, depth: 16 };
    const current = dim === 'width' ? width : dim === 'height' ? height : depth;
    const next = Math.max(minMap[dim], Math.min(maxMap[dim], Math.round((current + delta) * 10) / 10));
    onChangeDimension(dim, next);
  };

  const handleInputChange = (dim, value) => {
    const minMap = { width: 4, height: 3, depth: 2 };
    const maxMap = { width: 36, height: 28, depth: 16 };
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const clamped = Math.max(minMap[dim], Math.min(maxMap[dim], num));
      onChangeDimension(dim, clamped);
    }
  };

  const PRESETS = [
    { label: 'Small Mailer', w: 8, h: 6, d: 3 },
    { label: 'Medium Shipper', w: 12, h: 8, d: 4 },
    { label: 'Large Apparel', w: 16, h: 12, d: 5 }
  ];

  return (
    <div className="config-step-panel dimensions-panel">
      <div className="step-header">
        <h3 className="step-title">FIND YOUR PERFECT FIT.</h3>
        <p className="step-desc">
          Specify your outer packaging dimensions in inches. Our precision dieline
          engine automatically adapts the 3D structure.
        </p>
      </div>

      {/* Quick Standard Size Presets */}
      <div className="dimension-presets-row">
        <span className="preset-label">Standard Sizes:</span>
        <div className="preset-chips">
          {PRESETS.map((p) => {
            const isMatch = width === p.w && height === p.h && depth === p.d;
            return (
              <button
                key={p.label}
                type="button"
                className={`preset-chip ${isMatch ? 'is-selected' : ''}`}
                onClick={() => {
                  onChangeDimension('width', p.w);
                  onChangeDimension('height', p.h);
                  onChangeDimension('depth', p.d);
                }}
              >
                {p.label} ({p.w}×{p.h}×{p.d}")
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Numeric Fields Grid */}
      <div className="dimensions-grid">
        {/* Width */}
        <div className="dim-field-card">
          <div className="dim-field-header">
            <label htmlFor="dim-width" className="dim-field-label">
              Width (Front)
            </label>
            <span className="dim-range-hint">4–36 in</span>
          </div>
          <div className="dim-input-stepper">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStep('width', -0.5)}
              aria-label="Decrease width by 0.5 inches"
            >
              <Minus size={13} strokeWidth={2.4} />
            </button>
            <input
              id="dim-width"
              type="number"
              className="dim-num-input"
              value={width}
              min={4}
              max={36}
              step={0.5}
              onChange={(e) => handleInputChange('width', e.target.value)}
              aria-label="Width in inches"
            />
            <span className="dim-unit-tag">in</span>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStep('width', 0.5)}
              aria-label="Increase width by 0.5 inches"
            >
              <Plus size={13} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        {/* Height / Length */}
        <div className="dim-field-card">
          <div className="dim-field-header">
            <label htmlFor="dim-height" className="dim-field-label">
              Height (Depth)
            </label>
            <span className="dim-range-hint">3–28 in</span>
          </div>
          <div className="dim-input-stepper">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStep('height', -0.5)}
              aria-label="Decrease height by 0.5 inches"
            >
              <Minus size={13} strokeWidth={2.4} />
            </button>
            <input
              id="dim-height"
              type="number"
              className="dim-num-input"
              value={height}
              min={3}
              max={28}
              step={0.5}
              onChange={(e) => handleInputChange('height', e.target.value)}
              aria-label="Height in inches"
            />
            <span className="dim-unit-tag">in</span>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStep('height', 0.5)}
              aria-label="Increase height by 0.5 inches"
            >
              <Plus size={13} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        {/* Depth / Wall Height */}
        <div className="dim-field-card">
          <div className="dim-field-header">
            <label htmlFor="dim-depth" className="dim-field-label">
              Depth (Height)
            </label>
            <span className="dim-range-hint">2–16 in</span>
          </div>
          <div className="dim-input-stepper">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStep('depth', -0.5)}
              aria-label="Decrease depth by 0.5 inches"
            >
              <Minus size={13} strokeWidth={2.4} />
            </button>
            <input
              id="dim-depth"
              type="number"
              className="dim-num-input"
              value={depth}
              min={2}
              max={16}
              step={0.5}
              onChange={(e) => handleInputChange('depth', e.target.value)}
              aria-label="Depth in inches"
            />
            <span className="dim-unit-tag">in</span>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => handleStep('depth', 0.5)}
              aria-label="Increase depth by 0.5 inches"
            >
              <Plus size={13} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
