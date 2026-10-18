import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Info,
  MapPin,
  UploadCloud,
  FileText,
  Trash2,
  Sparkles,
  Layers,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

/* 1. Box Color Swatches */
const BOX_COLORS = [
  { id: 'kraft-brown', name: 'Plain Brown', color: '#B38B59' },
  { id: 'crisp-white', name: 'White', color: '#FFFFFF', border: '#D0C8BE' },
  { id: 'pastel-pink', name: 'Pink', color: '#F2B8BF' },
  { id: 'teal-green', name: 'Teal Green', color: '#1E6E66' },
  { id: 'matte-black', name: 'Black', color: '#1F1F1F' }
];

/* 2. Paper Bags GSM Options */
const GSM_OPTIONS = [
  { id: 'kraft-140', name: 'Kraft Paper', gsm: '140 GSM', desc: 'Natural recycled Kraft' },
  { id: 'white-120', name: 'White Paper', gsm: '120 GSM', desc: 'Clean premium white paper' },
  { id: 'superior-250-300', name: 'Superior Board', gsm: '250–300 GSM', desc: 'Heavyweight rigid luxury finish' }
];

/* 3. Premium Cards Shapes & Finishes (MOQ 200, 300, 1000, 2000) */
const CARD_SHAPES = [
  { id: 'Rectangle', name: 'Rectangle', desc: 'Standard 3.5 × 2 in' },
  { id: 'Square', name: 'Square', desc: 'Modern 2.5 × 2.5 in' },
  { id: 'Circle', name: 'Circle', desc: 'Die-cut Round 2.5 in' },
  { id: 'Oval', name: 'Oval', desc: 'Curved Die-Cut 3 × 2 in' }
];

const CARD_FINISHES = [
  { id: 'Thermal Lamination', name: 'Lamination', desc: 'Protective bonded film' },
  { id: 'Matte Touch', name: 'Matte Finish', desc: 'Sleek non-glare touch' },
  { id: 'Gloss Finish', name: 'Gloss Finish', desc: 'High-shine vibrant sheen' },
  { id: 'Velvet Touch', name: 'Velvet Touch', desc: 'Ultra-soft luxury feel' }
];

/* 4. Custom Tags Shapes (Supplied without rope, clean punched hole) */
const TAG_SHAPES = [
  { id: 'Rectangle', name: 'Rectangle', desc: 'Classic punched tag' },
  { id: 'Square', name: 'Square', desc: 'Modern square' },
  { id: 'Circle', name: 'Circle', desc: 'Round punch tag' },
  { id: 'Oval', name: 'Oval', desc: 'Curved apparel tag' },
  { id: 'Custom', name: 'Custom Contour', desc: 'Brand outline shape' }
];

/* 5. Custom Sticker Shapes & Finishes (Rectangle Sheet Format, NOT Rolls) */
const STICKER_SHAPES = [
  { id: 'Circle', name: 'Circle', desc: 'Round die-cut seal' },
  { id: 'Square', name: 'Square', desc: 'Square label' },
  { id: 'Rectangle', name: 'Rectangle', desc: 'Standard rectangle' },
  { id: 'Oval', name: 'Oval', desc: 'Curved oval label' },
  { id: 'Custom', name: 'Custom Logo Contour', desc: 'Bespoke outline kiss-cut' }
];

const STICKER_BASES = [
  { id: 'white-waterproof', name: 'White Base Waterproof', desc: 'Heavy-duty oil, water & UV resistant vinyl' },
  { id: 'silver-base', name: 'Silver Base (Metallic)', desc: 'Brushed chrome metallic sheen' },
  { id: 'transparent-base', name: 'Transparent Base', desc: 'Crystal-clear see-through vinyl' },
  { id: 'standard-paper', name: 'Standard Quality', desc: 'Premium coated paper sticker' }
];

/* 6. Artisanal Wooden Stamps Sizes & Ink Pads (Flat wood mount, NO handle) */
const STAMP_SIZES = [
  { id: '2x2', name: '2" × 2"', desc: 'Square logo / monogram' },
  { id: '3x3', name: '3" × 3"', desc: 'Standard packaging seal' },
  { id: '4x4', name: '4" × 4"', desc: 'Medium mailer stamp' },
  { id: '3x6', name: '3" × 6"', desc: 'Wide banner / address' },
  { id: '6x7', name: '6" × 7"', desc: 'Large box brand stamp' }
];

const INK_PADS = [
  { id: 'black', name: 'Rich Black', color: '#1A1A1A' },
  { id: 'red', name: 'Crimson Red', color: '#D32F2F' },
  { id: 'green', name: 'Emerald Green', color: '#2E7D32' },
  { id: 'none', name: 'Stamp Only (No Ink)', color: '#A89F91' }
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

  // Product specific configuration states
  const [customizationType, setCustomizationType] = useState('with-logo'); // 'plain' or 'with-logo'
  const [boxColor, setBoxColor] = useState('kraft-brown');
  const [selectedGsm, setSelectedGsm] = useState('kraft-140');
  const [cardShape, setCardShape] = useState('Rectangle');
  const [cardFinish, setCardFinish] = useState('Matte Touch');
  const [tagShape, setTagShape] = useState('Rectangle');
  const [stickerShape, setStickerShape] = useState('Circle');
  const [stickerBase, setStickerBase] = useState('white-waterproof');
  const [stampSize, setStampSize] = useState('3x3');
  const [inkPadColor, setInkPadColor] = useState('black');
  const [quantity, setQuantity] = useState('100');
  const [uploadedArtwork, setUploadedArtwork] = useState(null);

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

  // Adjust defaults per product selection
  useEffect(() => {
    if (selectedProduct === 'custom-boxes') {
      if (customizationType === 'with-logo' && quantity === '50') {
        setQuantity('100');
      }
    } else if (selectedProduct === 'paper-bags') {
      if (customizationType === 'with-logo') {
        if (['50', '100', '250'].includes(quantity)) setQuantity('500');
      } else {
        if (['50', '100'].includes(quantity)) setQuantity('250');
      }
    } else if (selectedProduct === 'business-cards') {
      if (!['200', '300', '1,000', '2,000', '5,000+'].includes(quantity)) {
        setQuantity('200');
      }
    } else if (selectedProduct === 'tags') {
      if (!['250', '500', '1,000', '2,500', '5,000+'].includes(quantity)) {
        setQuantity('250');
      }
    } else if (selectedProduct === 'stickers') {
      if (!['5 Sheets', '10 Sheets', '25 Sheets', '50 Sheets', '100+ Sheets'].includes(quantity)) {
        setQuantity('5 Sheets');
      }
    } else if (selectedProduct === 'stamps') {
      if (!['1', '2', '3', '5', '10+'].includes(quantity)) {
        setQuantity('1');
      }
    }
  }, [selectedProduct, customizationType]);

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
      return ['200', '300', '1,000', '2,000', '5,000+'];
    }
    if (selectedProduct === 'tags') {
      return ['250', '500', '1,000', '2,500', '5,000+'];
    }
    if (selectedProduct === 'stickers') {
      return ['5 Sheets', '10 Sheets', '25 Sheets', '50 Sheets', '100+ Sheets'];
    }
    if (selectedProduct === 'stamps') {
      return ['1', '2', '3', '5', '10+'];
    }
    return ['100', '250', '500', '1,000', '2,500+'];
  };

  const quantityOptions = getQuantityOptions();

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedArtwork({
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`
      });
    }
  };

  const activeProductData = PRODUCTS.find((p) => p.id === selectedProduct);
  const activeGsmData = GSM_OPTIONS.find((g) => g.id === selectedGsm);
  const activeBoxColor = BOX_COLORS.find((c) => c.id === boxColor);
  const activeStickerBase = STICKER_BASES.find((b) => b.id === stickerBase);
  const activeStampSize = STAMP_SIZES.find((s) => s.id === stampSize);
  const activeInkPad = INK_PADS.find((i) => i.id === inkPadColor);

  const getWhatsAppMessage = () => {
    const specsList = [];

    if (selectedProduct === 'custom-boxes') {
      specsList.push(`• *Box Type:* Tuck-in Corrugated (250 GSM)`);
      specsList.push(`• *Color:* ${activeBoxColor?.name || 'Plain Brown'}`);
      specsList.push(
        `• *Branding:* ${customizationType === 'with-logo' ? 'With Logo Printing' : 'Plain (Without Logo)'}`
      );
    } else if (selectedProduct === 'business-cards') {
      specsList.push(`• *Card:* Premium 350 GSM Board`);
      specsList.push(`• *Shape:* ${cardShape}`);
      specsList.push(`• *Finish:* ${cardFinish}`);
    } else if (selectedProduct === 'tags') {
      specsList.push(`• *Tag Shape:* ${tagShape}`);
      specsList.push(`• *Style:* Pre-Punched Hole (Without Rope)`);
    } else if (selectedProduct === 'stickers') {
      specsList.push(`• *Format:* Rectangle Sheet Format`);
      specsList.push(`• *Shape:* ${stickerShape}`);
      specsList.push(`• *Base Material:* ${activeStickerBase?.name || 'White Base Waterproof'}`);
    } else if (selectedProduct === 'stamps') {
      specsList.push(`• *Stamp Size:* ${activeStampSize?.name || '3" × 3"'}`);
      specsList.push(`• *Mount:* Minimalist Flat Hardwood (No Handle)`);
      specsList.push(`• *Ink Pad:* ${activeInkPad?.name || 'Stamp Only (No Ink)'}`);
    } else if (selectedProduct === 'paper-bags') {
      specsList.push(
        `• *Paper Quality:* ${activeGsmData ? `${activeGsmData.name} (${activeGsmData.gsm})` : '140 GSM Kraft'}`
      );
      specsList.push(
        `• *Branding:* ${customizationType === 'with-logo' ? 'With Logo Printing' : 'Plain (Without Logo)'}`
      );
    }

    const unitLabel =
      selectedProduct === 'stickers'
        ? 'Sheets'
        : selectedProduct === 'business-cards'
        ? 'cards'
        : 'units';

    const artworkDetail = uploadedArtwork
      ? `• *Artwork File:* ${uploadedArtwork.name} (${uploadedArtwork.size})\n  _(Note: Please share this artwork image in this WhatsApp chat)_`
      : `• *Artwork:* Not attached yet (will share via WhatsApp)`;

    return (
      `📦 *NEW BESPOKE PACKAGING QUOTE REQUEST* — *PACK ADDA*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *CUSTOMER DETAILS:*\n` +
      `• *Name:* ${formData.name || 'Not provided'}\n` +
      `• *Phone / WhatsApp:* ${formData.phone || 'Not provided'}\n` +
      `• *Work Email:* ${formData.email || 'Not provided'}\n` +
      (formData.company ? `• *Company / Brand:* ${formData.company}\n` : '') +
      `• *Delivery PIN:* ${formData.pincode || 'Not provided'}\n` +
      `• *Delivery Address:* ${formData.address || 'Not provided'}\n\n` +
      `📋 *PACKAGING SPECIFICATIONS:*\n` +
      `• *Product:* ${activeProductData?.title || 'Custom Packaging'}\n` +
      specsList.join('\n') + '\n' +
      `• *Quantity Required:* ${quantity} ${unitLabel}\n` +
      `${artworkDetail}\n` +
      (formData.notes ? `\n📝 *Notes / Custom Dimensions:*\n${formData.notes}\n` : '') +
      `\n━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `⚡ *Inquiry submitted via Pack Adda Website*`
    );
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(getWhatsAppMessage());
    return `https://wa.me/919915510065?text=${text}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Auto-open WhatsApp with the compiled quotation details
    const waUrl = getWhatsAppUrl();
    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.log('WhatsApp auto-redirect handled:', err);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

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
                  <CheckCircle2 size={56} color="#25D366" strokeWidth={1.8} />
                </motion.div>
                <h3>Quote Request Ready!</h3>
                <p>
                  Thank you for connecting with <strong>PACK ADDA</strong>! We have prepared your complete packaging specifications. Tap below to send them directly to our owner/specialist on WhatsApp for instant pricing &amp; dieline confirmation within 2 hours.
                </p>
                <div className="quote-submitted-summary">
                  <div className="summary-pill">
                    <span>Product:</span> <strong>{activeProductData?.title || 'Packaging'}</strong>
                  </div>

                  {selectedProduct === 'custom-boxes' && (
                    <>
                      <div className="summary-pill">
                        <span>Box Type:</span> <strong>Tuck-in Corrugated (250 GSM)</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Color:</span> <strong>{activeBoxColor?.name}</strong>
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

                  {selectedProduct === 'tags' && (
                    <>
                      <div className="summary-pill">
                        <span>Tag Shape:</span> <strong>{tagShape}</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Style:</span> <strong>Pre-Punched Hole (Without Rope)</strong>
                      </div>
                    </>
                  )}

                  {selectedProduct === 'stickers' && (
                    <>
                      <div className="summary-pill">
                        <span>Format:</span> <strong>Rectangle Sheet Format</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Sticker Shape:</span> <strong>{stickerShape}</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Base Quality:</span> <strong>{activeStickerBase?.name}</strong>
                      </div>
                    </>
                  )}

                  {selectedProduct === 'stamps' && (
                    <>
                      <div className="summary-pill">
                        <span>Stamp Size:</span> <strong>{activeStampSize?.name}</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Mount:</span> <strong>Flat Hardwood Block (No Handle)</strong>
                      </div>
                      <div className="summary-pill">
                        <span>Ink Pad:</span> <strong>{activeInkPad?.name}</strong>
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

                  {uploadedArtwork && (
                    <div className="summary-pill">
                      <span>Artwork Attached:</span> <strong>{uploadedArtwork.name} ({uploadedArtwork.size})</strong>
                    </div>
                  )}

                  <div className="summary-pill">
                    <span>Quantity:</span> <strong>{quantity} {selectedProduct === 'stickers' ? '' : selectedProduct === 'business-cards' ? 'cards' : 'units'}</strong>
                  </div>
                  <div className="summary-pill">
                    <span>Delivery PIN:</span> <strong>{formData.pincode}</strong>
                  </div>
                </div>
                <div className="quote-whatsapp-notice-banner">
                  <div className="wa-banner-left">
                    <MessageCircle size={22} color="#25D366" />
                    <div className="wa-banner-text">
                      <strong>Direct WhatsApp Forwarding to Owner</strong>
                      <span>Official WhatsApp: +91 99155 10065 (Pack Adda Specialists)</span>
                    </div>
                  </div>
                </div>

                <div className="quote-success-actions-row">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-quote-submit"
                  >
                    <MessageCircle size={19} />
                    <span>Send All Details to Owner on WhatsApp</span>
                    <ArrowUpRight size={17} strokeWidth={2.4} />
                  </a>

                  <button
                    type="button"
                    className="btn-quote-secondary"
                    onClick={handleReset}
                  >
                    <span>Back to Homepage</span>
                  </button>
                </div>
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

                {/* ======================================================
                    1. CUSTOM BOXES CONFIGURATOR
                    ====================================================== */}
                {selectedProduct === 'custom-boxes' && (
                  <div className="product-configurator-block">
                    <div className="product-spec-callout">
                      <div className="callout-badge-row">
                        <span className="spec-highlight-pill">TUCK-IN CORRUGATED BOX</span>
                        <span className="spec-highlight-pill accent">250 GSM BOARD</span>
                        <span className="spec-highlight-pill">FULL CUSTOMIZATION</span>
                      </div>
                      <p className="callout-desc">
                        Manufactured in premium <strong>250 GSM corrugated paperboard</strong> with secure tuck-in flaps. Available plain in 5 stylish colors or fully printed with your brand logo.
                      </p>
                    </div>

                    {/* Box Colors Swatches */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Select Box Color</label>
                        <span className="form-sub-hint">Plain Brown, White, Pink, Teal Green, Black</span>
                      </div>
                      <div className="colors-toggle-grid">
                        {BOX_COLORS.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            className={`color-swatch-btn ${boxColor === c.id ? 'active' : ''}`}
                            onClick={() => setBoxColor(c.id)}
                          >
                            <span
                              className="swatch-circle"
                              style={{
                                backgroundColor: c.color,
                                border: c.border ? `1px solid ${c.border}` : 'none'
                              }}
                            />
                            <span className="swatch-label">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ======================================================
                    2. PREMIUM CARDS CONFIGURATOR
                    ====================================================== */}
                {selectedProduct === 'business-cards' && (
                  <div className="product-configurator-block">
                    <div className="product-spec-callout cards-callout">
                      <div className="callout-badge-row">
                        <span className="spec-highlight-pill">PREMIUM CARD</span>
                        <span className="spec-highlight-pill accent">350 GSM BOARD</span>
                        <span className="spec-highlight-pill">MOQ 200–2,000</span>
                      </div>
                    </div>

                    {/* Shapes Selector */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Card Shape (Die-cut)</label>
                        <span className="form-sub-hint">Rectangle, Square, Circle, Oval</span>
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

                    {/* Finishes / Lamination */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Lamination &amp; Finish Type</label>
                        <span className="form-sub-hint">Custom lamination per requirement</span>
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

                {/* ======================================================
                    3. CUSTOM TAGS CONFIGURATOR (Clean punched hole, no rope)
                    ====================================================== */}
                {selectedProduct === 'tags' && (
                  <div className="product-configurator-block">
                    <div className="product-spec-callout">
                      <div className="callout-badge-row">
                        <span className="spec-highlight-pill">CUSTOM DIE-CUT TAGS</span>
                        <span className="spec-highlight-pill accent">CLEAN PUNCHED HOLE</span>
                        <span className="spec-highlight-pill">SUPPLIED WITHOUT ROPE</span>
                      </div>
                      <p className="callout-desc">
                        Custom-shaped merchandise tags pre-punched with a precision hole for immediate use (supplied ready without rope).
                      </p>
                    </div>

                    {/* Tag Shapes */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Tag Shape (Die-cut)</label>
                        <span className="form-sub-hint">Rectangle, Square, Circle, Oval, Custom</span>
                      </div>
                      <div className="shapes-toggle-grid">
                        {TAG_SHAPES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={`shape-card-btn ${tagShape === s.id ? 'active' : ''}`}
                            onClick={() => setTagShape(s.id)}
                          >
                            <span className={`shape-visual-icon shape-${s.id.toLowerCase()}`} />
                            <span className="shape-name">{s.name}</span>
                            <span className="shape-desc">{s.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ======================================================
                    4. CUSTOM STICKERS & LABELS (Rectangle Sheet Format)
                    ====================================================== */}
                {selectedProduct === 'stickers' && (
                  <div className="product-configurator-block">
                    <div className="product-spec-callout">
                      <div className="callout-badge-row">
                        <span className="spec-highlight-pill">FLAT SHEET FORMAT</span>
                        <span className="spec-highlight-pill accent">NOT ROLLS</span>
                        <span className="spec-highlight-pill">WATERPROOF &amp; METALLIC</span>
                      </div>
                      <p className="callout-desc">
                        Supplied on flat rectangular kiss-cut sheets. Precision cut around your brand logo or geometric shape.
                      </p>
                    </div>

                    {/* Sticker Shapes */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Sticker Shape (Die-cut)</label>
                        <span className="form-sub-hint">Circle, Square, Rectangle, Oval, Custom Logo Contour</span>
                      </div>
                      <div className="shapes-toggle-grid">
                        {STICKER_SHAPES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={`shape-card-btn ${stickerShape === s.id ? 'active' : ''}`}
                            onClick={() => setStickerShape(s.id)}
                          >
                            <span className={`shape-visual-icon shape-${s.id.toLowerCase()}`} />
                            <span className="shape-name">{s.name}</span>
                            <span className="shape-desc">{s.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sticker Quality & Base Material */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Sticker Quality &amp; Base Material</label>
                        <span className="form-sub-hint">White Waterproof, Silver, Transparent, Standard</span>
                      </div>
                      <div className="finishes-toggle-grid">
                        {STICKER_BASES.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            className={`finish-card-btn ${stickerBase === b.id ? 'active' : ''}`}
                            onClick={() => setStickerBase(b.id)}
                          >
                            <span className="finish-name">{b.name}</span>
                            <span className="finish-desc">{b.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Crucial Sticker Sheet Yield Notice */}
                    <div className="sticker-yield-note">
                      <Info size={16} />
                      <span>
                        <strong>Important:</strong> 1 sheet me kitne stickers aayenge yeh aapke brand logo ke size aur shape par depend karta hai.
                      </span>
                    </div>
                  </div>
                )}

                {/* ======================================================
                    5. ARTISANAL WOODEN STAMPS (Flat Hardwood Mount, No Handle)
                    ====================================================== */}
                {selectedProduct === 'stamps' && (
                  <div className="product-configurator-block">
                    <div className="product-spec-callout">
                      <div className="callout-badge-row">
                        <span className="spec-highlight-pill">FLAT HARDWOOD BLOCK</span>
                        <span className="spec-highlight-pill accent">NO HANDLE / KNOB</span>
                        <span className="spec-highlight-pill">5 SIZES AVAILABLE</span>
                      </div>
                      <p className="callout-desc">
                        Mounted on a sleek flat hardwood block (streamlined modern design without tall handles). Laser micro-engraved for crisp impressions.
                      </p>
                    </div>

                    {/* Stamp Sizes */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Stamp Block Size</label>
                        <span className="form-sub-hint">2×2, 3×3, 4×4, 3×6, 6×7</span>
                      </div>
                      <div className="sizes-toggle-grid">
                        {STAMP_SIZES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={`size-card-btn ${stampSize === s.id ? 'active' : ''}`}
                            onClick={() => setStampSize(s.id)}
                          >
                            <span className="size-title">{s.name}</span>
                            <span className="size-desc">{s.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ink Pad Colors */}
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label">Ink Pad Selection</label>
                        <span className="form-sub-hint">Black, Red, Green, or Stamp Only</span>
                      </div>
                      <div className="inkpad-toggle-grid">
                        {INK_PADS.map((i) => (
                          <button
                            key={i.id}
                            type="button"
                            className={`color-swatch-btn ${inkPadColor === i.id ? 'active' : ''}`}
                            onClick={() => setInkPadColor(i.id)}
                          >
                            <span
                              className="swatch-circle"
                              style={{ backgroundColor: i.color }}
                            />
                            <span className="swatch-label">{i.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ======================================================
                    6. PAPER BAGS GSM SELECTION
                    ====================================================== */}
                {selectedProduct === 'paper-bags' && (
                  <div className="form-group gsm-selection-group">
                    <div className="form-label-row">
                      <label className="form-label">Select Paper GSM (Thickness / Weight)</label>
                      <span className="form-sub-hint">Kraft 140 GSM, White 120 GSM, Superior 250–300 GSM</span>
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

                {/* Customization Choice (For Custom Boxes, Paper Bags) */}
                {(selectedProduct === 'custom-boxes' || selectedProduct === 'paper-bags') && (
                  <div className="form-group">
                    <div className="form-label-row">
                      <label className="form-label">Branding &amp; Customization</label>
                      <span className="form-sub-hint">
                        {selectedProduct === 'custom-boxes'
                          ? customizationType === 'with-logo'
                            ? '★ Min. 100 units for logo box'
                            : 'Min. 50 units for plain box'
                          : customizationType === 'with-logo'
                          ? '★ Min. 500 units for logo bag'
                          : 'Min. 250 units for plain bag'}
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
                            {selectedProduct === 'custom-boxes' ? 'Min. 50 Units' : 'Min. 250 Units'}
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
                            {selectedProduct === 'custom-boxes' ? 'Min. 100 Units' : 'Min. 500 Units'}
                          </span>
                        </div>
                        <p className="card-btn-desc">
                          Custom vector brand logo, printed graphics, foils, and bespoke surface finish.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Artwork / Logo Upload Option (JPG, PNG, PDF, SVG, AI) */}
                <div className="form-group">
                  <div className="form-label-row">
                    <label className="form-label">Upload Brand Logo / Artwork (Optional)</label>
                    <span className="form-sub-hint">JPG, PNG, PDF, SVG, AI accepted</span>
                  </div>
                  {uploadedArtwork ? (
                    <div className="upload-file-chip">
                      <FileText size={16} color="#D5683F" />
                      <span>{uploadedArtwork.name} ({uploadedArtwork.size})</span>
                      <button
                        type="button"
                        className="remove-file-btn"
                        onClick={() => setUploadedArtwork(null)}
                        aria-label="Remove uploaded file"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="artwork-upload-dropzone">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.svg,.ai"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      <div className="upload-icon-circle">
                        <UploadCloud size={20} strokeWidth={2.2} />
                      </div>
                      <span className="upload-text-main">Click or drag logo file here</span>
                      <span className="upload-text-sub">JPG, PNG, PDF, SVG, or AI (Max 25MB)</span>
                    </label>
                  )}
                </div>

                {/* Quantity Select */}
                <div className="form-group">
                  <div className="form-label-row">
                    <label className="form-label">Order Quantity</label>
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
                        Premium Cards: MOQ 200, 300, 1,000, 2,000
                      </span>
                    )}
                    {selectedProduct === 'stickers' && (
                      <span className="moq-alert-pill">
                        Sticker Sheets: 5, 10, 25, 50, 100+ Sheets
                      </span>
                    )}
                    {selectedProduct === 'tags' && (
                      <span className="moq-alert-pill">
                        Custom Tags: Starts from 250 units
                      </span>
                    )}
                    {selectedProduct === 'stamps' && (
                      <span className="moq-alert-pill">
                        Artisanal Stamps: Starts from 1 piece
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
                        {qty} {selectedProduct === 'business-cards' ? 'cards' : selectedProduct === 'stickers' ? '' : selectedProduct === 'stamps' ? 'stamps' : 'units'}
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
                      <strong>Design Charges:</strong> ₹1,000 (One-time charge for customized artwork, vector setup &amp; proofing).
                    </li>
                    <li>
                      <strong>Custom / New Size:</strong> If a new custom size or shape die is required, a first-time die charge is applicable.
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
                    <label className="field-label">Dimensions / Size Notes</label>
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
                    rows={3}
                    placeholder="Any specific requests, Pantone codes, unboxing requirements, or deadline..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {/* Modal Footer Actions */}
                <div className="modal-actions-footer">
                  <div className="modal-trust-note">
                    <span>⚡ Quick response in 2 hrs</span>
                    <span>📦 Free digital 3D mockup</span>
                  </div>
                  <button type="submit" className="btn-quote-primary">
                    <MessageCircle size={18} style={{ marginRight: 6 }} />
                    <span>Submit & Send on WhatsApp</span>
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
