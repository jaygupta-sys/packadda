import React, { useState } from 'react';

const QUANTITY_OPTIONS = [25, 50, 100, 250, 500, 1000, 2500, 5000];

export default function QuantityStep({ quantity, onChangeQuantity }) {
  const [isCustom, setIsCustom] = useState(!QUANTITY_OPTIONS.includes(quantity));

  const handleSelectPreset = (qty) => {
    setIsCustom(false);
    onChangeQuantity(qty);
  };

  const handleCustomChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      onChangeQuantity(val);
    }
  };

  return (
    <div className="config-step-panel quantity-panel">
      <div className="step-header">
        <h3 className="step-title">HOW MANY DO YOU NEED?</h3>
        <p className="step-desc">
          We manufacture both artisanal small runs and industrial high-volume production with Pan-India delivery.
        </p>
      </div>

      {/* Preset Quantity Grid */}
      <div className="quantity-chips-grid" role="radiogroup" aria-label="Select quantity">
        {QUANTITY_OPTIONS.map((qty) => {
          const isSelected = !isCustom && quantity === qty;
          const displayLabel = qty === 5000 ? '5,000+' : qty.toLocaleString();

          return (
            <button
              key={qty}
              type="button"
              className={`quantity-chip-btn ${isSelected ? 'is-selected' : ''}`}
              onClick={() => handleSelectPreset(qty)}
              role="radio"
              aria-checked={isSelected}
            >
              <span className="qty-number">{displayLabel}</span>
              <span className="qty-unit">units</span>
            </button>
          );
        })}
      </div>

      {/* Custom Quantity Input */}
      <div className="custom-quantity-row">
        <label htmlFor="custom-qty-input" className="custom-qty-label">
          Need a specific count?
        </label>
        <div className="custom-qty-input-wrap">
          <input
            id="custom-qty-input"
            type="number"
            className="custom-qty-field"
            placeholder="e.g. 750"
            min={10}
            max={500000}
            value={isCustom ? quantity : ''}
            onFocus={() => setIsCustom(true)}
            onChange={handleCustomChange}
            aria-label="Custom quantity count"
          />
          <span className="custom-qty-suffix">custom units</span>
        </div>
      </div>

      {/* Price Transparency Notice (STRICTLY NO INVENTED PRICES) */}
      <div className="quote-pricing-notice-box">
        <div className="pricing-title-row">
          <span className="price-tag-label">PRICE:</span>
          <span className="price-tag-value">Custom Quote</span>
        </div>
        <p className="pricing-rationale-text">
          “Pricing depends on dimensions, material, printing, finishing and quantity.”
        </p>
      </div>
    </div>
  );
}
