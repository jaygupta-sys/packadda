import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  Package,
  ShoppingBag,
  CreditCard,
  Tag,
  ShieldCheck,
  Clock,
  Truck,
  Leaf,
  Send,
  Check,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import QuoteModal from './QuoteModal';

/* Ticker Marquee Items */
const MARQUEE_ITEMS = [
  'BESPOKE PACKAGING STUDIO',
  '100% RECYCLABLE FSC PAPERS',
  'LOW MOQS FROM 100 UNITS',
  'PAN-INDIA EXPRESS LOGISTICS',
  'COMPLIMENTARY 3D PROOFS',
  '7–10 DAYS PRODUCTION',
  'METALLIC FOIL & SOFT-TOUCH LAMINATION',
  'WATERPROOF VINYL DIE-CUT LABELS',
  'DIRECT WHATSAPP ARTWORK SUPPORT'
];

/* Core Collections */
const COLLECTIONS = [
  { name: 'Tuck-In Corrugated Boxes', desc: 'Plain brown, pink, teal, black & printed' },
  { name: 'Rigid Luxury Gift Boxes', desc: '350gsm+ with magnetic snap & ribbons' },
  { name: 'Custom Kraft Paper Bags', desc: 'Durable twisted & flat rope handles' },
  { name: 'Foil-Stamped Business Cards', desc: '350gsm with velvet matte & gold foil' },
  { name: 'Die-Cut Vinyl Stickers', desc: 'Waterproof, metallic & transparent sheets' },
  { name: 'Custom Garment Tags', desc: 'Precision die-cut holes & premium texture' }
];

/* Industries */
const INDUSTRIES = [
  'D2C E-Commerce & Retail',
  'Apparel, Boutiques & Streetwear',
  'Skincare, Cosmetics & Wellness',
  'Artisan Cafes & Gourmet Food',
  'Corporate Gifting & Influencer PR Kits',
  'Luxury Jewelry & Fragrance'
];

/* 4 Trust Badges */
const TRUST_PILLARS = [
  {
    icon: Package,
    title: 'Low Minimums',
    desc: 'Runs from 100 to 200 units. No massive enterprise commitments.'
  },
  {
    icon: Clock,
    title: '7–10 Days Dispatch',
    desc: 'Rapid production and door-step dispatch directly from our studio.'
  },
  {
    icon: ShieldCheck,
    title: 'Complimentary 3D Proof',
    desc: 'Free artwork die-line check and digital mockup before printing.'
  },
  {
    icon: Leaf,
    title: '100% Recyclable',
    desc: 'FSC-certified board, kraft papers, and non-toxic water-based inks.'
  }
];

export default function Footer() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [swatchEmail, setSwatchEmail] = useState('');
  const [swatchSubmitted, setSwatchSubmitted] = useState(false);

  const handleOpenQuote = (productName = null) => {
    if (productName) {
      setQuoteProduct({ title: productName });
    } else {
      setQuoteProduct(null);
    }
    setQuoteModalOpen(true);
  };

  const handleSwatchSubmit = (e) => {
    e.preventDefault();
    if (!swatchEmail.trim()) return;
    setSwatchSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCatalog = (e) => {
    e.preventDefault();
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-luxury-root" id="footer">
      {/* 1. INFINITE ANIMATED MARQUEE TICKER TAPE */}
      <div className="footer-marquee-strip" aria-hidden="true">
        <div className="footer-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span key={idx} className="footer-marquee-item">
              <span className="marquee-star">✦</span>
              <span className="marquee-text">{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. GRAND PRE-FOOTER CALL TO ACTION (LUXURY STATEMENT) */}
      <div className="footer-cta-container">
        <motion.div
          className="footer-grand-cta-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient Lighting Orbs */}
          <div className="cta-ambient-glow" aria-hidden="true" />
          <div className="cta-ambient-glow-secondary" aria-hidden="true" />

          {/* Studio Live Pill */}
          <div className="footer-live-pill">
            <span className="live-dot-pulse" />
            <span className="live-pill-text">BESPOKE PACKAGING STUDIO • ACCEPTING CUSTOM RUNS</span>
          </div>

          {/* Grand Headline */}
          <h2 className="footer-cta-headline">
            PACKAGING THAT TURNS CUSTOMERS INTO{' '}
            <span className="cta-headline-accent">OBSESSED BRAND ADVOCATES.</span>
          </h2>

          <p className="footer-cta-subtext">
            From tuck-in corrugated mailers to gold-foil textured cards and carry bags,
            we turn every unboxing into an unforgettable tactile moment for your brand.
          </p>

          {/* Action Row */}
          <div className="footer-cta-actions">
            <motion.button
              type="button"
              className="btn-footer-primary"
              onClick={() => handleOpenQuote()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              aria-label="Get instant packaging quote"
            >
              <Sparkles size={18} className="btn-sparkle-icon" />
              <span>Get Free 3D Die-Line &amp; Quote</span>
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </motion.button>

            <motion.a
              href="https://wa.me/919830000000?text=Hi%20Pack%20Adda!%20I%20am%20interested%20in%20custom%20packaging%20for%20my%20brand."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-footer-whatsapp"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              aria-label="Chat with Pack Adda on WhatsApp"
            >
              <MessageCircle size={18} strokeWidth={2.2} />
              <span>Chat on WhatsApp</span>
            </motion.a>
          </div>

          {/* 3 Quick Micro-Checks */}
          <div className="footer-cta-trust-row">
            <span className="trust-check-item">
              <Check size={14} className="check-icon" /> Free 3D Mockup Check
            </span>
            <span className="trust-dot-sep">•</span>
            <span className="trust-check-item">
              <Check size={14} className="check-icon" /> MOQs from 100 Units
            </span>
            <span className="trust-dot-sep">•</span>
            <span className="trust-check-item">
              <Check size={14} className="check-icon" /> Pan-India Doorstep Dispatch
            </span>
          </div>
        </motion.div>
      </div>

      {/* 3. TRUST PILLARS GRID */}
      <div className="footer-pillars-wrapper">
        <div className="footer-pillars-grid">
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="footer-pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="pillar-icon-box">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN EDITORIAL NAVIGATION MATRIX */}
      <div className="footer-matrix-container">
        <div className="footer-matrix-grid">
          {/* Column 1: Brand & Contact */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <img
                src="/images/logo.png"
                alt="Pack Adda Logo"
                className="footer-logo-img"
              />
              <span className="footer-logo-subline">Custom Packaging &amp; Bespoke Printing</span>
            </div>

            <p className="footer-brand-bio">
              India's premier packaging studio. We engineer tactile, unboxing-first
              corrugated boxes, rigid gift boxes, paper bags, and foil cards for modern
              D2C founders and luxury boutiques.
            </p>

            {/* Direct Studio Contacts */}
            <div className="footer-contact-list">
              <a href="tel:+919830000000" className="footer-contact-link">
                <Phone size={15} className="contact-icon" />
                <span>+91 98300 00000</span>
              </a>
              <a href="mailto:hello@packadda.com" className="footer-contact-link">
                <Mail size={15} className="contact-icon" />
                <span>hello@packadda.com</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={15} className="contact-icon" />
                <span>Studio: New Delhi / NCR • Shipping Pan-India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="footer-social-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Pack Adda Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Pack Adda LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://wa.me/919830000000"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Pack Adda WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* Column 2: Core Packaging Collections */}
          <div className="footer-col footer-col-collections">
            <h4 className="footer-col-title">Packaging Collections</h4>
            <ul className="footer-links-list">
              {COLLECTIONS.map((c) => (
                <li key={c.name} className="footer-link-item">
                  <button
                    type="button"
                    className="footer-nav-link-btn"
                    onClick={() => handleOpenQuote(c.name)}
                  >
                    <span className="link-text">{c.name}</span>
                    <span className="link-arrow">↗</span>
                  </button>
                  <span className="footer-link-subtext">{c.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries We Power */}
          <div className="footer-col footer-col-industries">
            <h4 className="footer-col-title">Industries Powered</h4>
            <ul className="footer-simple-links">
              {INDUSTRIES.map((ind) => (
                <li key={ind} className="footer-simple-item">
                  <a href="#products" onClick={scrollToCatalog} className="footer-simple-link">
                    <span className="simple-link-dot" />
                    <span>{ind}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick Specs Callout */}
            <div className="footer-specs-badge">
              <span className="specs-tag">PRINTING CAPABILITIES</span>
              <p className="specs-detail">
                Offset, Screen, Foil Stamping, Spot UV, Velvet Soft-Touch, Debossing &amp; Eco Water Inks.
              </p>
            </div>
          </div>

          {/* Column 4: Material Swatch Box & Newsletter */}
          <div className="footer-col footer-col-swatches">
            <h4 className="footer-col-title">Request Swatch Kit</h4>
            <div className="footer-swatch-box">
              <div className="swatch-box-header">
                <Sparkles size={16} className="swatch-icon" />
                <span className="swatch-box-badge">TACTILE SAMPLE BOX</span>
              </div>
              <p className="swatch-box-desc">
                Experience our 350gsm paper stocks, velvet lamination, gold foil, and kraft fluting in your own hands before ordering.
              </p>

              {swatchSubmitted ? (
                <motion.div
                  className="swatch-success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Check size={18} className="success-check-icon" />
                  <div>
                    <strong>Swatch request received!</strong>
                    <p>Our packaging consultant will dispatch your kit.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSwatchSubmit} className="swatch-form">
                  <div className="swatch-input-wrapper">
                    <input
                      type="text"
                      className="swatch-input"
                      placeholder="WhatsApp No. or Email..."
                      value={swatchEmail}
                      onChange={(e) => setSwatchEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="swatch-submit-btn"
                      aria-label="Submit swatch kit request"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                  <span className="swatch-micro-note">
                    Dispatched pan-India via express courier.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. GIGANTIC BACKGROUND EDITORIAL WATERMARK */}
      <div className="footer-watermark-wrapper" aria-hidden="true">
        <span className="footer-watermark-text">PACK ADDA</span>
      </div>

      {/* 6. BOTTOM LEGAL & COPYRIGHT BAR */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <div className="bottom-left">
            <p className="copyright-text">
              &copy; {currentYear} Pack Adda Technologies Pvt. Ltd. All rights reserved.
            </p>
            <p className="handcrafted-note">
              Crafted with obsession for unboxing perfection in India 🇮🇳
            </p>
          </div>

          <div className="bottom-center">
            <span className="legal-link">Privacy Policy</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Production Terms</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Artwork Guidelines</span>
          </div>

          <div className="bottom-right">
            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} strokeWidth={2.4} className="top-arrow" />
            </button>
          </div>
        </div>
      </div>

      {/* Integrated Modal for Instant Quotes from Footer */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />
    </footer>
  );
}
