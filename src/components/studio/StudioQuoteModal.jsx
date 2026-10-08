import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function StudioQuoteModal({
  isOpen,
  onClose,
  config = {}
}) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.phone.trim()) errs.phone = 'Please enter a valid phone / WhatsApp number';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid business email';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Structured quote payload ready for future Firebase / API connection
    const quotePayload = {
      customer: {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email
      },
      configuration: {
        boxType: 'Custom Mailer Box',
        dimensions: `${config.width} × ${config.height} × ${config.depth} in`,
        material: config.material,
        printing: config.printing,
        finish: config.finish,
        quantity: config.quantity,
        artworkFileName: config.artworkFile?.name || null
      },
      additionalNotes: formData.notes,
      timestamp: new Date().toISOString()
    };

    console.log('Packaging Studio Quote Request Submitted:', quotePayload);
    setIsSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Pack Adda! I just configured a custom box on your studio:\n\n` +
      `📦 Box: ${config.width}×${config.height}×${config.depth} in\n` +
      `📄 Material: ${config.material}\n` +
      `🎨 Print: ${config.printing}\n` +
      `✨ Finish: ${config.finish}\n` +
      `🔢 Quantity: ${config.quantity} pcs\n\n` +
      `Please provide an official quotation.`
    );
    window.open(`https://wa.me/919830000000?text=${text}`, '_blank');
  };

  return (
    <div className="quote-modal-backdrop" onClick={onClose}>
      <motion.div
        className="quote-modal-dialog studio-quote-dialog"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="studio-quote-title"
      >
        <div className="quote-modal-header">
          <div>
            <span className="quote-header-eyebrow">PACK ADDA STUDIO / QUOTATION</span>
            <h2 id="studio-quote-title" className="quote-header-title">
              Request Your Custom Quote
            </h2>
          </div>
          <button
            type="button"
            className="quote-close-btn"
            onClick={onClose}
            aria-label="Close quote modal"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="quote-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} color="#D5683F" strokeWidth={2.2} />
            </div>
            <h3 className="success-title">Quote Request Received!</h3>
            <p className="success-message">
              Thank you, <strong>{formData.name}</strong>. Our packaging engineering team
              is reviewing your <strong>{config.width}×{config.height}×{config.depth} in</strong> custom box
              specification. An itemized estimate with dielines will be sent to <strong>{formData.email}</strong> within 4 business hours.
            </p>
            <div className="success-actions">
              <button type="button" className="btn-whatsapp-chat" onClick={handleWhatsApp}>
                <MessageCircle size={16} />
                <span>Follow Up on WhatsApp</span>
              </button>
              <button type="button" className="btn-modal-close-confirm" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <form className="studio-quote-form" onSubmit={handleSubmit} noValidate>
            {/* Box Configuration Summary Strip */}
            <div className="modal-config-summary-box">
              <span className="modal-config-label">Configured Box:</span>
              <div className="modal-config-tags">
                <span className="config-tag">{`${config.width} × ${config.height} × ${config.depth} in`}</span>
                <span className="config-tag">{config.material}</span>
                <span className="config-tag">{config.printing}</span>
                <span className="config-tag">{config.finish}</span>
                <span className="config-tag highlight">{`${config.quantity?.toLocaleString()} pcs`}</span>
                {config.artworkFile && (
                  <span className="config-tag file-tag">📎 {config.artworkFile.name}</span>
                )}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="form-fields-grid">
              <div className="form-group">
                <label htmlFor="quote-name" className="form-label">
                  Your Name *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  className={`form-input ${errors.name ? 'is-error' : ''}`}
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span className="field-error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="quote-company" className="form-label">
                  Company / Brand Name
                </label>
                <input
                  id="quote-company"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Artisan Living Pvt Ltd"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quote-phone" className="form-label">
                  Phone / WhatsApp *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'is-error' : ''}`}
                  placeholder="+91 98300 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="quote-email" className="form-label">
                  Work Email *
                </label>
                <input
                  id="quote-email"
                  type="email"
                  className={`form-input ${errors.email ? 'is-error' : ''}`}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="quote-notes" className="form-label">
                  Additional Requirements / Dieline Requests
                </label>
                <textarea
                  id="quote-notes"
                  className="form-textarea"
                  rows={2}
                  placeholder="Specify custom inserts, inside flood coat, or delivery deadlines..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-cta-row">
              <button type="submit" className="btn-request-quote-submit">
                <span>REQUEST MY QUOTE</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                type="button"
                className="btn-whatsapp-chat-secondary"
                onClick={handleWhatsApp}
              >
                <MessageCircle size={15} />
                <span>CHAT ON WHATSAPP</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
