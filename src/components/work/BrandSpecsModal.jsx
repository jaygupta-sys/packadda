import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  Leaf,
  ArrowUpRight,
  MessageCircle,
  PackageCheck,
  Star,
  Check
} from 'lucide-react';

export default function BrandSpecsModal({
  brand,
  isOpen,
  onClose,
  onEnquire
}) {
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

  if (!brand) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi Pack Adda! I love the packaging solution you engineered for ${brand.name} (${brand.category}). I want to discuss a similar custom packaging suite for my brand.`
  );
  const whatsappUrl = `https://wa.me/919915510065?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="brand-specs-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="brand-specs-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          >
            {/* Modal Header */}
            <div className="brand-modal-header">
              <div className="brand-modal-brand-info">
                <div
                  className="brand-modal-logo-wrapper"
                  style={{ '--brand-accent': brand.accentColor }}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="brand-modal-logo-img"
                  />
                  <span className="brand-modal-verified-badge" title="Verified Pack Adda Client">
                    <ShieldCheck size={14} />
                  </span>
                </div>

                <div className="brand-modal-title-col">
                  <div className="brand-modal-category-row">
                    <span className="brand-modal-category-tag">{brand.category}</span>
                    <span className="brand-modal-handle">{brand.handle}</span>
                  </div>
                  <h3 className="brand-modal-brand-name">{brand.name}</h3>
                  <p className="brand-modal-tagline">{brand.tagline}</p>
                </div>
              </div>

              <button
                type="button"
                className="brand-modal-close-btn"
                onClick={onClose}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="brand-modal-body">
              {/* Highlight Metric Banner */}
              <div
                className="brand-modal-metric-banner"
                style={{
                  background: `linear-gradient(135deg, ${brand.accentColor}18, rgba(255,255,255,0.7))`
                }}
              >
                <div className="metric-banner-left">
                  <span className="metric-banner-number" style={{ color: brand.accentColor }}>
                    {brand.highlightMetric}
                  </span>
                  <span className="metric-banner-label">{brand.highlightMetricLabel}</span>
                </div>
                <div className="metric-banner-rating">
                  <div className="metric-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#D5683F" stroke="#D5683F" />
                    ))}
                  </div>
                  <span className="rating-tag">5.0 Verified Partnership</span>
                </div>
              </div>

              {/* Section 1: Packaging Suite Manufactured */}
              <div className="brand-modal-section">
                <div className="section-title-wrap">
                  <PackageCheck size={18} className="section-icon" />
                  <h4 className="section-title">Packaging Suite Manufactured</h4>
                </div>

                <div className="brand-suite-grid">
                  {brand.packagingSuite.map((item, idx) => (
                    <div key={idx} className="brand-suite-card">
                      <div className="suite-card-top">
                        <span className="suite-pill">{item.tag}</span>
                        <span className="suite-idx">0{idx + 1}</span>
                      </div>
                      <h5 className="suite-card-title">{item.title}</h5>
                      <p className="suite-card-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Technical Specifications & Caliper */}
              <div className="brand-modal-section">
                <div className="section-title-wrap">
                  <Layers size={18} className="section-icon" />
                  <h4 className="section-title">Engineering Specifications</h4>
                </div>

                <div className="brand-specs-table">
                  <div className="specs-row">
                    <span className="specs-label">
                      <Layers size={15} /> Material & Board Caliper
                    </span>
                    <span className="specs-value">{brand.specs.material}</span>
                  </div>
                  <div className="specs-row">
                    <span className="specs-label">
                      <Sparkles size={15} /> Printing & Finishes
                    </span>
                    <span className="specs-value">{brand.specs.finishing}</span>
                  </div>
                  <div className="specs-row">
                    <span className="specs-label">
                      <Clock size={15} /> Turnaround & Dispatch
                    </span>
                    <span className="specs-value">{brand.specs.turnaround}</span>
                  </div>
                  <div className="specs-row">
                    <span className="specs-label">
                      <Check size={15} /> Delivered Run Quantity
                    </span>
                    <span className="specs-value">{brand.specs.moqDelivered}</span>
                  </div>
                  <div className="specs-row">
                    <span className="specs-label">
                      <Leaf size={15} /> Sustainability & Eco Footprint
                    </span>
                    <span className="specs-value eco-text">{brand.specs.ecoRating}</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Client Testimonial & Narrative */}
              <div className="brand-modal-testimonial-card">
                <div className="quote-mark">“</div>
                <p className="testimonial-text">{brand.clientQuote}</p>
                <div className="testimonial-author">
                  <span className="author-name">{brand.quoteAuthor}</span>
                  <span className="author-role">{brand.quoteRole}</span>
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTAs */}
            <div className="brand-modal-footer">
              <button
                type="button"
                className="btn-modal-quote"
                onClick={() => {
                  onClose();
                  onEnquire(brand);
                }}
              >
                <span>Request Quote for This Style</span>
                <ArrowUpRight size={18} />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-whatsapp"
                aria-label="Discuss on WhatsApp"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Atelier</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
