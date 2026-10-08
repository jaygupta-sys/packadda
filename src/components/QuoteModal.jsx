import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, Info, MapPin } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const GSM_OPTIONS = [
  { id: 'kraft-140', name: 'Kraft Paper', gsm: '140 GSM', desc: 'Natural recycled Kraft' },
  { id: 'white-120', name: 'White Paper', gsm: '120 GSM', desc: 'Clean premium white paper' },
  { id: 'superior-250-300', name: 'Superior Board', gsm: '250–300 GSM', desc: 'Heavyweight rigid luxury finish' }
];

const CARD_SHAPES = [
  { id: 'Square', name: 'Square', desc: 'Modern 2.5 × 2.5 in' },
  { id: 'Circle', name: 'Circle', desc: 'Die-cut Round 2.5 in' },
  { id: 'Rectangle', name: 'Rectangle', desc: 'Standard 3.5 × 2 in' }
];

const CARD_FINISHES = [
  { id: 'Lamination', name: 'Lamination', desc: 'Protective bonded film' },
  { id: 'Matte', name: 'Matte', desc: 'Sleek non-glare touch' },
  { id: 'Gloss', name: 'Gloss', desc: 'High-shine vibrant sheen' }
];

const normalizeProductId = (id) => {
  if (id === 'boxes') return 'custom-boxes';
  if (id === 'cards') return 'business-cards';
  return id || 'custom-boxes';
};

export default function QuoteModal({ isOpen, onClose, initialProduct = null }) {
  const [selectedProduct, setSelectedProduct] = useState(
    normalizeProductId(initialProduct?.id)
  );
  const [customizationType, setCustomizationType] = useState('with-logo'); // 'plain' or 'with-logo'
  const [selectedGsm, setSelectedGsm] = useState('kraft-140');
  const [cardShape, setCardShape] = useState('Rectangle');
  const [cardFinish, setCardFinish] = useState('Matte');
  const [quantity, setQuantity] = useState('100');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialProduct?.id) {
      setSelectedProduct(normalizeProductId(initialProduct.id));
    }
  }, [initialProduct]);

  // Adjust quantity based on product type and customization rules
  useEffect(() => {
    if (selectedProduct === 'custom-boxes') {
      // Custom boxes: 250 GSM only. Plain min 50, with-logo min 100
      if (customizationType === 'with-logo') {
        if (quantity === '50') {
          setQuantity('100');
        }
      }
    } else if (selectedProduct === 'paper-bags') {
      // Paper bags: Plain min 250, with-logo min 500
      if (customizationType === 'with-logo') {
        if (['50', '100', '250'].includes(quantity)) {
          setQuantity('500');
        }
      } else {
        if (['50', '100'].includes(quantity)) {
          setQuantity('250');
        }
      }
    } else if (selectedProduct === 'business-cards') {
      // Premium cards 350 GSM: min 100
      if (quantity === '50') {
        setQuantity('100');
      }
    }
  }, [selectedProduct, customizationType, quantity]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Dynamic quantity options per product & customization
  const getQuantityOptions = () => {
    if (selectedProduct === 'custom-boxes') {
      return customizationType === 'with-logo'
        ? ['100', '250', '500', '1,000', '2,500+']
        : ['50', '100', '250', '500', '1,000+'];
    }
    if (selectedProduct === 'paper-bags') {
      return customizationType === 'with-logo'
        ? ['500', '1,000', '2,500', '5,000+']
        : ['250', '500', '1,000', '2,500', '5,000+'];
    }
    if (selectedProduct === 'business-cards') {
      return ['100', '250', '500', '1,000', '2,000+'];
    }
    return ['100', '250', '500', '1,000', '2,500+'];
  };

  const quantityOptions = getQuantityOptions();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const activeProductData = PRODUCTS.find((p) => p.id === selectedProduct);
  const activeGsmData = GSM_OPTIONS.find((g) => g.id === selectedGsm);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="quote-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="quote-modal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Modal Header */}
            <div className="quote-modal-header">
              <div className="header-titles">
                <span className="modal-eyebrow">INSTANT PACKAGING ESTIMATE</span>
                <h2 className="modal-title">Get a Bespoke Quote</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close quote modal"
              >
                <X size={20} color="#49291D" />
              </button>
            </div>

            {submitted ? (
              <div className="quote-success-state">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <CheckCircle2 size={56} color="#D5683F" strokeWidth={1.8} />
                </motion.div>
                <h3>Quote Request Received!</h3>
                <p>
                  Thank you for connecting with <strong>PACK ADDA</strong>. Our packaging specialists will review your specs and send your quotation &amp; design confirmation within 2 hours.
                </p>
                <div className="quote-submitted-summary">
                  <div className="summary-pill">
                    <span>Product:</span> <strong>{activeProductData?.title || 'Packaging'}</strong>
                  </div>

                  {selectedProduct === 'custom-boxes' && (
                    <>
                      <div className="summary-pill">
                        <span>Box Type:</span> <strong>Tuck-in Box (250 GSM)</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Branding:</span>{' '}
                        <strong>{customizationType === 'with-logo' ? 'With Logo (Min 100)' : 'Plain (Min 50)'}</strong>
                      </div>
                    </>
                  )}

                  {selectedProduct === 'business-cards' && (
                    <>
                      <div className="summary-pill">
                        <span>Card:</span> <strong>Premium Card (350 GSM)</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Shape:</span> <strong>{cardShape}</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Finish:</span> <strong>{cardFinish}</strong>
                      </div>
                    </>
                  )}

                  {selectedProduct === 'paper-bags' && (
                    <>
                      <div className="summary-pill">
                        <span>GSM:</span> <strong>{activeGsmData ? `${activeGsmData.name} (${activeGsmData.gsm})` : '140 GSM'}</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Branding:</span>{' '}
                        <strong>{customizationType === 'with-logo' ? 'With Logo (Min 500)' : 'Plain (Min 250)'}</strong>
                      </div>
                    </>
                  )}

                  <div className="summary-pill">
                    <span>Quantity:</span> <strong>{quantity} units</strong>
                  </div>
                  <div className="summary-pill">
                    <span>Delivery PIN:</span> <strong>{formData.pincode}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-quote-primary"
                  onClick={handleReset}
                >
                  <span>Back to Homepage</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-modal-form">
                {/* Product Select */}
                <div className="form-group">
                  <label className="form-label">Select Packaging Product</label>
                  <div className="product-pills-selector">
                    {PRODUCTS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`pill-option-btn ${
                          selectedProduct === p.id ? 'active' : ''
                        }`}
                        onClick={() => setSelectedProduct(p.id)}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1. CUSTOM BOXES SPECIFICATION (Tuck-in type, 250 GSM only, 50 plain / 100 with logo) */}
                {selectedProduct === 'custom-boxes' && (
                  <div className="product-spec-callout">
                    <div className="callout-badge-row">
                      <span className="spec-highlight-pill">TUCK-IN TYPE BOX</span>
                      <span className="spec-highlight-pill accent">250 GSM ONLY</span>
                    </div>
                    <p className="callout-desc">
                      Manufactured strictly in <strong>250 GSM paperboard</strong> with tuck-in closure flaps. Minimum <strong>50 units for plain</strong>, or <strong>100 units with custom logo</strong>.
                    </p>
                  </div>
                )}

                {/* 2. BUSINESS CARDS SPECIFICATION (Premium Card, 350 GSM, Square/Circle/Rectangle, Lamination/Matte/Gloss) */}
                {selectedProduct === 'business-cards' && (
                  <div className="cards-configurator-section">
                    <div className="product-spec-callout cards-callout">
                      <div className="callout-badge-row">
                        <span className="spec-highlight-pill">PREMIUM CARD</span>
                        <span className="spec-highlight-pill accent">350 GSM BOARD</span>
                        <span className="spec-highlight-pill">MIN. 100 CARDS</span>
                      </div>
                    </div>

                    {/* Shapes Selector */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Card Shape (Die-cut)</label>
                        <span className="form-sub-hint">Square, Circle, or Rectangle</span>
                      </div>
                      <div className="shapes-toggle-grid">
                        {CARD_SHAPES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={`shape-card-btn ${cardShape === s.id ? 'active' : ''}`}
                            onClick={() => setCardShape(s.id)}
                          >
                            <span className={`shape-visual-icon shape-${s.id.toLowerCase()}`} />
                            <span className="shape-name">{s.name}</span>
                            <span className="shape-desc">{s.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Finishes / Types Selector */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Finish / Coating Type</label>
                        <span className="form-sub-hint">Lamination, Matte, or Gloss</span>
                      </div>
                      <div className="finishes-toggle-grid">
                        {CARD_FINISHES.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            className={`finish-card-btn ${cardFinish === f.id ? 'active' : ''}`}
                            onClick={() => setCardFinish(f.id)}
                          >
                            <span className="finish-name">{f.name}</span>
                            <span className="finish-desc">{f.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. PAPER BAGS GSM SELECTION */}
                {selectedProduct === 'paper-bags' && (
                  <div className="form-group gsm-selection-group">
                    <div className="form-label-row">
                      <label className="form-label">Select Paper GSM (Thickness / Weight)</label>
                      <span className="form-sub-hint">Craft 140 GSM, White 120 GSM, Superior 250–300 GSM</span>
                    </div>
                    <div className="gsm-cards-grid">
                      {GSM_OPTIONS.map((g) => {
                        const isSelected = selectedGsm === g.id;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            className={`gsm-card-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => setSelectedGsm(g.id)}
                          >
                            <span className="gsm-weight-pill">{g.gsm}</span>
                            <span className="gsm-name">{g.name}</span>
                            <span className="gsm-desc">{g.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Customization Choice (For Custom Boxes, Paper Bags, etc.) */}
                {selectedProduct !== 'business-cards' && (
                  <div className="form-group">
                    <div className="form-label-row">
                      <label className="form-label">Branding &amp; Customization</label>
                      <span className="form-sub-hint">
                        {selectedProduct === 'custom-boxes'
                          ? customizationType === 'with-logo'
                            ? '★ Min. 100 units for logo box'
                            : 'Min. 50 units for plain box'
                          : selectedProduct === 'paper-bags'
                          ? customizationType === 'with-logo'
                            ? '★ Min. 500 units for logo bag'
                            : 'Min. 250 units for plain bag'
                          : customizationType === 'with-logo'
                          ? 'Min. 500 units with logo'
                          : 'Plain unprinted'}
                      </span>
                    </div>
                    <div className="customization-toggle-grid">
                      <button
                        type="button"
                        className={`customization-card-btn ${
                          customizationType === 'plain' ? 'active' : ''
                        }`}
                        onClick={() => setCustomizationType('plain')}
                      >
                        <div className="card-btn-header">
                          <span className="card-btn-title">Plain / Unprinted</span>
                          <span className="card-btn-moq-tag">
                            {selectedProduct === 'custom-boxes'
                              ? 'Min. 50 Units'
                              : selectedProduct === 'paper-bags'
                              ? 'Min. 250 Units'
                              : 'Min. 100 Units'}
                          </span>
                        </div>
                        <p className="card-btn-desc">
                          Clean blank unprinted packaging ready for immediate dispatch or stamp tools.
                        </p>
                      </button>

                      <button
                        type="button"
                        className={`customization-card-btn ${
                          customizationType === 'with-logo' ? 'active' : ''
                        }`}
                        onClick={() => setCustomizationType('with-logo')}
                      >
                        <div className="card-btn-header">
                          <span className="card-btn-title">With Logo &amp; Full Customization</span>
                          <span className="card-btn-moq-tag highlight">
                            {selectedProduct === 'custom-boxes'
                              ? 'Min. 100 Units'
                              : selectedProduct === 'paper-bags'
                              ? 'Min. 500 Units'
                              : 'Min. 250 Units'}
                          </span>
                        </div>
                        <p className="card-btn-desc">
                          Custom vector brand logo, printed graphics, foils, and bespoke surface finish.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Quantity Select */}
                <div className="form-group">
                  <div className="form-label-row">
                    <label className="form-label">Estimated Quantity</label>
                    {selectedProduct === 'custom-boxes' && (
                      <span className="moq-alert-pill">
                        {customizationType === 'with-logo' ? 'Boxes With Logo: Starts from 100 units' : 'Plain Boxes: Starts from 50 units'}
                      </span>
                    )}
                    {selectedProduct === 'paper-bags' && (
                      <span className="moq-alert-pill">
                        {customizationType === 'with-logo' ? 'Bags With Logo: Starts from 500 units' : 'Plain Bags: Starts from 250 units'}
                      </span>
                    )}
                    {selectedProduct === 'business-cards' && (
                      <span className="moq-alert-pill">
                        Premium Cards: Starts from 100 units
                      </span>
                    )}
                  </div>
                  <div className="qty-pills-selector">
                    {quantityOptions.map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        className={`pill-option-btn ${quantity === qty ? 'active' : ''}`}
                        onClick={() => setQuantity(qty)}
                      >
                        {qty} {selectedProduct === 'business-cards' ? 'cards' : 'units'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Important Notes Banner (Design Charges ₹1,000 one-time + Custom Size Die Charge) */}
                <div className="quote-notice-card" role="note" aria-label="Pricing and custom tooling policies">
                  <div className="notice-card-header">
                    <Info size={16} className="notice-icon" />
                    <span className="notice-heading">Important Order Notes</span>
                  </div>
                  <ul className="notice-points-list">
                    <li>
                      <strong>Design Charges:</strong> ₹1,000 (One-time charge for all customized artwork, vector setup &amp; proofing).
                    </li>
                    <li>
                      <strong>Custom / New Size:</strong> If a new custom size is required, a first-time die (die-making) charge is applicable.
                    </li>
                  </ul>
                </div>

                {/* Contact Fields */}
                <div className="form-grid-two">
                  <div className="form-field">
                    <label className="field-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Brand / Business *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maison Atelier"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-two">
                  <div className="form-field">
                    <label className="field-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Delivery Address & PIN Code */}
                <div className="form-field">
                  <label className="field-label">
                    <MapPin size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: '-1px' }} />
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Complete Shop / Office / Street Address, City, State"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-grid-two">
                  <div className="form-field">
                    <label className="field-label">PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      pattern="[0-9]{6}"
                      placeholder="6-digit PIN code (e.g. 110001)"
                      value={formData.pincode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setFormData({ ...formData, pincode: val });
                      }}
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Dimensions / Size</label>
                    <input
                      type="text"
                      placeholder="Standard or Custom (e.g. 8x5x3 in)"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          notes: formData.notes
                            ? `${formData.notes} | Size: ${e.target.value}`
                            : `Size: ${e.target.value}`
                        })
                      }
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="field-label">Additional Custom Specifications (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Special finish requirements, logo placement, delivery preferences..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {/* Form Footer */}
                <div className="modal-actions-footer">
                  <div className="modal-trust-note">
                    <span>✓ Home Delivery</span>
                    <span>✓ Pan-India Delivery</span>
                  </div>
                  <button type="submit" className="btn-quote-primary">
                    <span>Request Quotation</span>
                    <ArrowUpRight size={18} strokeWidth={2.4} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
