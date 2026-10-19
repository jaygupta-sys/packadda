import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  ChevronDown,
  HelpCircle,
  Send,
  Calendar,
  FileCheck2,
  Box
} from 'lucide-react';
import './ContactUs.css';

// Packaging Categories
const PACKAGING_TYPES = [
  { id: 'boxes', label: 'Tuck-in Boxes', sub: 'Corrugated / Paperboard' },
  { id: 'rigid', label: 'Rigid Luxury Boxes', sub: 'Magnetic / Slipcase' },
  { id: 'bags', label: 'Kraft & Retail Bags', sub: '140–300 GSM Paper' },
  { id: 'cards-tags', label: 'Foil Cards & Tags', sub: '350 GSM Die-cut' },
  { id: 'stickers', label: 'Stickers & Labels', sub: 'Waterproof / Metallic' },
  { id: 'stamps', label: 'Wooden Stamps', sub: 'Handcrafted Mount' },
  { id: 'full-suite', label: 'Full Brand Suite', sub: 'Complete Packaging' }
];

// Quantity Ranges
const QUANTITY_RANGES = [
  { id: 'sample', label: '50 – 200 units', note: 'Trial / Small Batch' },
  { id: 'growth', label: '250 – 1,000 units', note: 'Most Popular' },
  { id: 'scale', label: '1,000 – 5,000 units', note: 'Commercial Run' },
  { id: 'enterprise', label: '5,000+ units', note: 'Volume Wholesale' }
];

// Artwork Status
const ARTWORK_OPTIONS = [
  { id: 'ready', label: 'Print-ready Vector File (.AI / .PDF / .CDR)' },
  { id: 'logo-only', label: 'I have a logo, need dieline layout assistance' },
  { id: 'scratch', label: 'Need bespoke packaging design from scratch' }
];

// Frequently Asked Questions
const ATELIER_FAQS = [
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'We pride ourselves on founder-friendly low minimums: plain tuck-in boxes start from 50 units, custom-printed boxes from 100 units, retail bags from 250 units, and wooden stamps from 1 single piece. No massive enterprise commitments required.'
  },
  {
    q: 'Can we inspect physical material samples before bulk production?',
    a: 'Absolutely. We offer a curated Tactile Swatch Kit containing 140–300 GSM Kraft paperboards, rigid greyboard swatches, hot-foil stamping chips (Gold, Rose Gold, Silver), and corrugated fluting thicknesses so your team can evaluate texture and rigidity before freezing dielines.'
  },
  {
    q: 'What is the standard production turnaround and delivery timeline?',
    a: 'Standard production runs dispatch within 5 to 8 business days following digital proof and dieline approval. Express rush timelines are available for priority launches. All shipments are insured and dispatched door-to-door Pan-India via express surface and air logistics.'
  },
  {
    q: 'Do you provide dielines for our graphic design team?',
    a: 'Yes. Once you share your product dimensions (Length × Width × Height in inches or centimeters), our CAD engineer generates an accurate 1:1 scale vector dieline template (PDF/Illustrator) complete with fold lines, bleed margins, and glue flap areas free of charge.'
  }
];

export default function ContactUs() {
  // Live Studio Time Tracker (IST)
  const [currentTime, setCurrentTime] = useState('');
  const [isStudioOpen, setIsStudioOpen] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    phone: '',
    email: '',
    city: '',
    category: 'boxes',
    quantity: 'growth',
    artwork: 'ready',
    message: '',
    needSwatchKit: false
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success
  const [referenceId, setReferenceId] = useState('');
  const [copiedType, setCopiedType] = useState(null); // 'phone' | 'email' | null
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Update IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const istString = new Intl.DateTimeFormat('en-IN', options).format(now);
      setCurrentTime(istString);

      // Check working hours: 10:00 to 19:30 IST, Mon-Sat
      const istDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const day = istDate.getDay(); // 0 is Sunday
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const timeInMins = hours * 60 + minutes;

      const isWeekday = day !== 0; // Monday to Saturday
      const isWorkingHours = timeInMins >= 10 * 60 && timeInMins <= 19 * 60 + 30;
      setIsStudioOpen(isWeekday && isWorkingHours);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Copy helper
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2400);
  };

  // Build WhatsApp inquiry url
  const buildWhatsAppUrl = (customData = formData) => {
    const catLabel = PACKAGING_TYPES.find((c) => c.id === customData.category)?.label || customData.category;
    const qtyLabel = QUANTITY_RANGES.find((q) => q.id === customData.quantity)?.label || customData.quantity;
    const artLabel = ARTWORK_OPTIONS.find((a) => a.id === customData.artwork)?.label || customData.artwork;

    const message = [
      `*PACK ADDA — BESPOKE INQUIRY*`,
      `--------------------------------`,
      `• *Client Name:* ${customData.name || 'Not specified'}`,
      `• *Brand:* ${customData.brand || 'Not specified'}`,
      `• *Contact:* ${customData.phone || 'Not specified'}`,
      `• *Email:* ${customData.email || 'Not specified'}`,
      `• *City / Pin:* ${customData.city || 'Pan-India'}`,
      `--------------------------------`,
      `• *Packaging Item:* ${catLabel}`,
      `• *Estimated Run:* ${qtyLabel}`,
      `• *Artwork Status:* ${artLabel}`,
      customData.needSwatchKit ? `• *Sample Swatch Kit:* Requested (Yes)` : null,
      customData.message ? `• *Specifications / Notes:* ${customData.message}` : null,
      `--------------------------------`,
      `_Sent via Pack Adda Digital Atelier Desk_`
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/919915510065?text=${encodeURIComponent(message)}`;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and WhatsApp contact number.');
      return;
    }

    setFormStatus('submitting');

    // Generate reference code
    const generatedRef = `PA-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(generatedRef);

    // Realistic brief submission simulation
    setTimeout(() => {
      setFormStatus('success');
    }, 900);
  };

  const handleReset = () => {
    setFormStatus('idle');
    setFormData({
      name: '',
      brand: '',
      phone: '',
      email: '',
      city: '',
      category: 'boxes',
      quantity: 'growth',
      artwork: 'ready',
      message: '',
      needSwatchKit: false
    });
  };

  return (
    <section className="contact-luxury-section" id="contact" aria-labelledby="contact-heading">
      {/* Background Architectural Grid Lines */}
      <div className="contact-bg-grid" aria-hidden="true" />

      <div className="contact-container">
        {/* =================================================================
            1. EDITORIAL HEADER & METADATA
            ================================================================= */}
        <div className="contact-header">
          <motion.div
            className="contact-eyebrow-pill"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow-symbol">✦</span>
            <span className="eyebrow-text">DIRECT ATELIER CONSULTATION • PRODUCTION DESK</span>
            <span className="eyebrow-symbol">✦</span>
          </motion.div>

          <motion.h2
            id="contact-heading"
            className="contact-main-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Start a project.{' '}
            <span className="headline-serif-emphasis">Engineered with tactile distinction.</span>
          </motion.h2>

          <motion.p
            className="contact-subhead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            Whether you are testing 100 bespoke mailers for a new launch or engineering 10,000 retail
            carry bags with custom foil debossing — speak directly with our packaging engineers. No
            gatekeeping, no automated bots.
          </motion.p>
        </div>

        {/* =================================================================
            2. LIVE STUDIO STATUS STRIP (CONFIDENCE & TRANSPARENCY)
            ================================================================= */}
        <motion.div
          className="contact-status-strip"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          <div className="status-live-indicator">
            <span className={`status-jewel-dot ${isStudioOpen ? 'is-live' : 'is-standby'}`} />
            <div className="status-text-stack">
              <span className="status-label">
                {isStudioOpen ? 'PRODUCTION DESK ACTIVE' : 'STUDIO DESK ON STANDBY'}
              </span>
              <span className="status-sub">
                New Delhi / NCR • {currentTime || '10:00 AM – 7:30 PM IST'}
              </span>
            </div>
          </div>

          <div className="status-metric-divider" />

          <div className="status-metric-item">
            <Clock size={16} className="metric-icon" />
            <span>Avg. Response: Under 120 mins during studio hours</span>
          </div>

          <div className="status-metric-divider" />

          <div className="status-metric-item">
            <Box size={16} className="metric-icon" />
            <span>Low MOQs from 50–100 units • Pan-India Express Logistics</span>
          </div>
        </motion.div>

        {/* =================================================================
            3. MAIN ATELIER SPLIT: DIRECT LINES (LEFT) + BESPOKE BRIEF (RIGHT)
            ================================================================= */}
        <div className="contact-main-grid">
          {/* -------------------------------------------------------------
              LEFT COLUMN: STUDIO DETAILS & DIRECT CONCIERGE
              ------------------------------------------------------------- */}
          <motion.div
            className="contact-studio-column"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="studio-column-inner">
              {/* Card 1: Direct WhatsApp Line */}
              <div className="atelier-contact-card is-highlight">
                <div className="card-top-row">
                  <div className="card-icon-badge whatsapp-badge">
                    <MessageCircle size={20} strokeWidth={2.2} />
                  </div>
                  <div className="card-badge-tag">Fastest Response</div>
                </div>

                <div className="card-content-block">
                  <span className="card-eyebrow">Direct WhatsApp Production Line</span>
                  <div className="card-primary-value">+91 99155 10065</div>
                  <p className="card-desc">
                    Share reference photos, dieline files, or request physical unboxing videos
                    directly with our lead packaging specialist.
                  </p>
                </div>

                <div className="card-action-row">
                  <a
                    href="https://wa.me/919915510065?text=Hi%20Pack%20Adda!%20I%20would%20like%20to%20discuss%20custom%20packaging%20for%20my%20brand."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="atelier-btn-primary"
                    aria-label="Chat on WhatsApp"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight size={15} strokeWidth={2.4} />
                  </a>

                  <button
                    type="button"
                    className="atelier-btn-copy"
                    onClick={() => handleCopy('+919915510065', 'phone')}
                    aria-label="Copy phone number"
                  >
                    {copiedType === 'phone' ? (
                      <>
                        <Check size={14} className="copy-check" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card 2: Direct Email Inquiry */}
              <div className="atelier-contact-card">
                <div className="card-top-row">
                  <div className="card-icon-badge email-badge">
                    <Mail size={19} strokeWidth={2.2} />
                  </div>
                  <div className="card-badge-tag muted">Formal RFQ &amp; Files</div>
                </div>

                <div className="card-content-block">
                  <span className="card-eyebrow">Studio &amp; Procurement Desk</span>
                  <div className="card-primary-value text-break">saitruepackers@gmail.com</div>
                  <p className="card-desc">
                    Ideal for sending heavy Vector print artwork (.AI, .PDF, .CDR), brand guideline
                    books, and bulk institutional quotations.
                  </p>
                </div>

                <div className="card-action-row">
                  <a
                    href="mailto:saitruepackers@gmail.com?subject=Packaging%20Inquiry%20-%20Pack%20Adda"
                    className="atelier-btn-secondary"
                  >
                    <span>Email Studio</span>
                    <ArrowUpRight size={15} strokeWidth={2.2} />
                  </a>

                  <button
                    type="button"
                    className="atelier-btn-copy"
                    onClick={() => handleCopy('saitruepackers@gmail.com', 'email')}
                    aria-label="Copy email address"
                  >
                    {copiedType === 'email' ? (
                      <>
                        <Check size={14} className="copy-check" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card 3: Physical Swatch Kit Order */}
              <div className="atelier-swatch-card">
                <div className="swatch-card-header">
                  <div className="swatch-pill">
                    <Sparkles size={14} />
                    <span>Physical Experience</span>
                  </div>
                  <span className="swatch-price">Sample Kit</span>
                </div>

                <h3 className="swatch-title">Touch the board before you print.</h3>
                <p className="swatch-desc">
                  Curated sample box containing 140–300 GSM kraft papers, metallic foil swatches,
                  corrugated flutes, and velvet touch finishes delivered to your studio doorstep.
                </p>

                <div className="swatch-action-row">
                  <a
                    href="https://wa.me/919915510065?text=Hi%20Pack%20Adda!%20I%20would%20like%20to%20order%20the%20Packaging%20Material%20Swatch%20Kit%20for%20my%20brand."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="swatch-request-btn"
                  >
                    <span>Request Swatch Kit</span>
                    <ArrowUpRight size={15} />
                  </a>
                  <span className="swatch-note">Fully deductible against your first production run</span>
                </div>
              </div>

              {/* Card 4: Location & Operating Hours */}
              <div className="atelier-info-compact">
                <div className="info-compact-row">
                  <MapPin size={16} className="info-compact-icon" />
                  <div>
                    <strong>Manufacturing &amp; Dispatch Facility:</strong> New Delhi / NCR, India
                    <span className="info-compact-sub">
                      Pan-India express logistics across all pincodes
                    </span>
                  </div>
                </div>

                <div className="info-compact-row">
                  <Calendar size={16} className="info-compact-icon" />
                  <div>
                    <strong>Operating Hours:</strong> Monday through Saturday
                    <span className="info-compact-sub">10:00 AM – 7:30 PM Indian Standard Time</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: BESPOKE PACKAGING CONSULTATION BUILDER
              ------------------------------------------------------------- */}
          <motion.div
            className="contact-form-column"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="consultation-form-card">
              {formStatus === 'success' ? (
                /* Success Confirmation State */
                <motion.div
                  className="form-success-container"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="success-icon-wrap">
                    <Check size={28} strokeWidth={2.4} />
                  </div>

                  <span className="success-ref-tag">REFERENCE CODE • {referenceId}</span>

                  <h3 className="success-headline">Inquiry Dispatched to Studio Desk.</h3>

                  <p className="success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your packaging specifications for{' '}
                    <strong>{formData.brand || 'your brand'}</strong> have been queued. Our senior
                    production engineer will review your dimensions and provide a transparent
                    quotation within 2 business hours.
                  </p>

                  <div className="success-summary-box">
                    <div className="summary-row">
                      <span>Packaging:</span>
                      <strong>
                        {PACKAGING_TYPES.find((c) => c.id === formData.category)?.label}
                      </strong>
                    </div>
                    <div className="summary-row">
                      <span>Estimated Quantity:</span>
                      <strong>
                        {QUANTITY_RANGES.find((q) => q.id === formData.quantity)?.label}
                      </strong>
                    </div>
                    <div className="summary-row">
                      <span>Contact Channel:</span>
                      <strong>{formData.phone}</strong>
                    </div>
                  </div>

                  <div className="success-actions">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-success-whatsapp"
                    >
                      <MessageCircle size={18} />
                      <span>Sync &amp; Chat on WhatsApp Now</span>
                      <ArrowUpRight size={16} />
                    </a>

                    <button type="button" className="btn-success-reset" onClick={handleReset}>
                      Submit Another Project Brief
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleSubmit} className="atelier-form" noValidate>
                  <div className="form-legend-header">
                    <div>
                      <h3 className="form-legend-title">Bespoke Production Inquiry</h3>
                      <p className="form-legend-desc">
                        Fill in your project specifics below. Direct, transparent pricing.
                      </p>
                    </div>
                    <span className="form-step-badge">CONFIDENTIAL</span>
                  </div>

                  {/* 1. Category Selector */}
                  <div className="form-section-group">
                    <label className="form-section-label">
                      <span className="step-num">01</span>
                      <span>Select Packaging Type</span>
                    </label>

                    <div className="packaging-chips-grid">
                      {PACKAGING_TYPES.map((cat) => {
                        const isSelected = formData.category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            className={`packaging-chip ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => handleInputChange('category', cat.id)}
                          >
                            <span className="chip-primary-text">{cat.label}</span>
                            <span className="chip-sub-text">{cat.sub}</span>
                            {isSelected && <span className="chip-dot-active" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Run Volume Selector */}
                  <div className="form-section-group">
                    <label className="form-section-label">
                      <span className="step-num">02</span>
                      <span>Estimated Run / Volume</span>
                    </label>

                    <div className="quantity-pills-row">
                      {QUANTITY_RANGES.map((qty) => {
                        const isSelected = formData.quantity === qty.id;
                        return (
                          <button
                            key={qty.id}
                            type="button"
                            className={`quantity-pill ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => handleInputChange('quantity', qty.id)}
                          >
                            <span className="qty-pill-label">{qty.label}</span>
                            <span className="qty-pill-note">{qty.note}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Client & Brand Fields */}
                  <div className="form-section-group">
                    <label className="form-section-label">
                      <span className="step-num">03</span>
                      <span>Client &amp; Brand Details</span>
                    </label>

                    <div className="form-inputs-grid">
                      <div className="input-field-wrap">
                        <label className="field-label" htmlFor="client-name">
                          Full Name <span className="req">*</span>
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          className="luxury-input"
                          placeholder="e.g. Rohini Malhotra"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>

                      <div className="input-field-wrap">
                        <label className="field-label" htmlFor="client-brand">
                          Brand / Studio Name
                        </label>
                        <input
                          id="client-brand"
                          type="text"
                          className="luxury-input"
                          placeholder="e.g. Kanso Home"
                          value={formData.brand}
                          onChange={(e) => handleInputChange('brand', e.target.value)}
                        />
                      </div>

                      <div className="input-field-wrap">
                        <label className="field-label" htmlFor="client-phone">
                          WhatsApp / Mobile <span className="req">*</span>
                        </label>
                        <div className="phone-prefix-wrap">
                          <span className="phone-prefix">+91</span>
                          <input
                            id="client-phone"
                            type="tel"
                            required
                            className="luxury-input with-prefix"
                            placeholder="98765 43210"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="input-field-wrap">
                        <label className="field-label" htmlFor="client-email">
                          Work Email
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          className="luxury-input"
                          placeholder="rohini@kansohome.in"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. Artwork Readiness */}
                  <div className="form-section-group">
                    <label className="form-section-label">
                      <span className="step-num">04</span>
                      <span>Artwork &amp; Dieline Status</span>
                    </label>

                    <div className="artwork-radios-list">
                      {ARTWORK_OPTIONS.map((opt) => {
                        const isSelected = formData.artwork === opt.id;
                        return (
                          <label
                            key={opt.id}
                            className={`artwork-radio-card ${isSelected ? 'is-selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="artwork-option"
                              checked={isSelected}
                              onChange={() => handleInputChange('artwork', opt.id)}
                              className="sr-only"
                            />
                            <div className="radio-indicator">
                              {isSelected && <span className="radio-inner-dot" />}
                            </div>
                            <span className="artwork-label-text">{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. Custom Notes & Dimensions */}
                  <div className="form-section-group">
                    <label className="form-section-label" htmlFor="client-message">
                      <span className="step-num">05</span>
                      <span>Project Dimensions &amp; Specifics (Optional)</span>
                    </label>

                    <textarea
                      id="client-message"
                      rows={3}
                      className="luxury-textarea"
                      placeholder="Specify product dimensions (L × W × H), target delivery deadline, preferred finishes (e.g., Gold Foil, Velvet Matte, Kraft Brown), or any custom requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>

                  {/* 6. Include Sample Swatch Box Checkbox */}
                  <div className="swatch-toggle-wrap">
                    <label className="swatch-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.needSwatchKit}
                        onChange={(e) => handleInputChange('needSwatchKit', e.target.checked)}
                        className="custom-checkbox"
                      />
                      <span className="checkbox-text">
                        <strong>Include physical material swatches with this inquiry</strong>
                        <span className="checkbox-sub">
                          Curated kraft paper, rigid board, and foil finish samples sent to your address.
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Actions */}
                  <div className="form-submit-row">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="btn-submit-consultation"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <span className="spinner-dot" />
                          <span>Transmitting to Studio Desk...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry to Production Desk</span>
                          <ArrowUpRight size={18} strokeWidth={2.4} />
                        </>
                      )}
                    </button>

                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-form-direct-whatsapp"
                      title="Prefill WhatsApp with this inquiry"
                    >
                      <MessageCircle size={18} strokeWidth={2.2} />
                      <span>Quick WhatsApp Handoff</span>
                    </a>
                  </div>

                  <p className="form-disclaimer-note">
                    🔒 No spam. Your brand files and contact details are handled directly by our
                    manufacturing engineers under strict confidentiality.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* =================================================================
            4. ATELIER ESSENTIAL QUESTIONS (MINIMAL ACCORDION)
            ================================================================= */}
        <div className="contact-faq-section">
          <div className="faq-header-compact">
            <span className="faq-tag">TRANSPARENCY</span>
            <h3 className="faq-headline">Frequently Addressed Atelier Details</h3>
          </div>

          <div className="faq-accordion-grid">
            {ATELIER_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.q}
                  className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-wrap"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="faq-answer-text">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
