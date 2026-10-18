import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Star,
  Sparkles,
  Layers,
  Clock,
  Play,
  Pause,
  Maximize2,
  Package,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
  Sparkle,
  LayoutGrid,
  SlidersHorizontal
} from 'lucide-react';
import { CLIENT_BRANDS, WORK_CATEGORIES, AGENCY_TRUST_STATS } from '../../data/ourWork';
import BrandSpecsModal from './BrandSpecsModal';
import QuoteModal from '../QuoteModal';
import './OurWorkShowcase.css';

// Reference Fan Layout Transforms for 6 cards (matching reference image)
const FAN_TRANSFORMS_6 = [
  { rotate: -15, y: 22, scale: 0.95, zIndex: 1 },
  { rotate: -8,  y: 8,  scale: 0.98, zIndex: 2 },
  { rotate: -2,  y: 0,  scale: 1.0,  zIndex: 3 },
  { rotate: 2,   y: 0,  scale: 1.0,  zIndex: 4 },
  { rotate: 8,   y: 8,  scale: 0.98, zIndex: 2 },
  { rotate: 15,  y: 22, scale: 0.95, zIndex: 1 },
];

// Fallback transforms for 5 cards if filtered
const FAN_TRANSFORMS_5 = [
  { rotate: -14, y: 20, scale: 0.96, zIndex: 1 },
  { rotate: -7,  y: 7,  scale: 0.98, zIndex: 2 },
  { rotate: 0,   y: 0,  scale: 1.0,  zIndex: 3 },
  { rotate: 7,   y: 7,  scale: 0.98, zIndex: 2 },
  { rotate: 14,  y: 20, scale: 0.96, zIndex: 1 },
];

export default function OurWorkShowcase({ onOpenQuote }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to Grippie or Fathima
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [specsModalBrand, setSpecsModalBrand] = useState(null);
  const [internalQuoteOpen, setInternalQuoteOpen] = useState(false);
  const [internalQuoteProduct, setInternalQuoteProduct] = useState(null);

  // Animation Stage: 'carousel' (initial animation on reveal) -> 'aligned' (fanned deck layout)
  const [animStage, setAnimStage] = useState('carousel'); // 'carousel' | 'aligned'
  const [carouselCycle, setCarouselCycle] = useState(0);
  const [viewMode, setViewMode] = useState('fan'); // 'fan' | 'carousel-stream'
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const cycleTimerRef = useRef(null);
  const settleTimeoutRef = useRef(null);

  // Filtered brands
  const filteredBrands = useMemo(() => {
    if (activeCategory === 'all') return CLIENT_BRANDS;
    return CLIENT_BRANDS.filter((b) => b.filterCategory === activeCategory);
  }, [activeCategory]);

  const activeBrand = filteredBrands[selectedIndex] || filteredBrands[0];

  // Helper to trigger entrance animation
  const startCarouselToFanAnimation = useCallback(() => {
    if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);

    setAnimStage('carousel');
    setCarouselCycle(0);

    let count = 0;
    cycleTimerRef.current = setInterval(() => {
      count += 1;
      setCarouselCycle((prev) => (prev + 1) % filteredBrands.length);
      setSelectedIndex((prev) => (prev + 1) % filteredBrands.length);

      // Settle into aligned reference deck after 8 cycles (~2.1 seconds)
      if (count >= 8) {
        clearInterval(cycleTimerRef.current);
        settleTimeoutRef.current = setTimeout(() => {
          setAnimStage('aligned');
          setSelectedIndex(1); // prominent center card
        }, 220);
      }
    }, 250);
  }, [filteredBrands.length]);

  // Trigger animation when user enters / scrolls to Our Work section
  useEffect(() => {
    if (isInView && !hasPlayedIntro) {
      setHasPlayedIntro(true);
      startCarouselToFanAnimation();
    }
  }, [isInView, hasPlayedIntro, startCarouselToFanAnimation]);

  // Listen to custom window event (e.g. clicking "Our Work" in Hero navbar)
  useEffect(() => {
    const handleNavTrigger = () => {
      startCarouselToFanAnimation();
    };
    window.addEventListener('packadda-trigger-work-animation', handleNavTrigger);
    return () => window.removeEventListener('packadda-trigger-work-animation', handleNavTrigger);
  }, [startCarouselToFanAnimation]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    };
  }, []);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % filteredBrands.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + filteredBrands.length) % filteredBrands.length);
  };

  const handleEnquireBrand = (brand) => {
    const productPayload = {
      id: brand.inquiryProductId,
      title: `${brand.name} Custom Packaging Style`,
      customNote: `Enquiring about packaging similar to ${brand.name} (${brand.category})`
    };

    if (onOpenQuote) {
      onOpenQuote(productPayload);
    } else {
      setInternalQuoteProduct(productPayload);
      setInternalQuoteOpen(true);
    }
  };

  // Get dynamic card transform based on animation stage
  const getCardTransform = (index, total) => {
    // 1. CAROUSEL STAGE: cards revolve dynamically in an active 3D carousel orbit
    if (animStage === 'carousel') {
      const offset = (index - carouselCycle + total) % total;
      if (offset === 0) {
        return { x: 0, y: -12, rotate: 0, scale: 1.12, zIndex: 25, opacity: 1 };
      } else if (offset === 1) {
        return { x: 190, y: 14, rotate: 12, scale: 0.94, zIndex: 15, opacity: 0.92 };
      } else if (offset === 2) {
        return { x: 340, y: 32, rotate: 22, scale: 0.82, zIndex: 8, opacity: 0.75 };
      } else if (offset === total - 1) {
        return { x: -190, y: 14, rotate: -12, scale: 0.94, zIndex: 15, opacity: 0.92 };
      } else if (offset === total - 2) {
        return { x: -340, y: 32, rotate: -22, scale: 0.82, zIndex: 8, opacity: 0.75 };
      } else {
        return { x: 0, y: 44, rotate: 0, scale: 0.72, zIndex: 2, opacity: 0.45 };
      }
    }

    // 2. HOVERED IN ALIGNED STAGE: card straightens up and lifts with spotlight glow
    if (hoveredIndex === index) {
      return {
        x: 0,
        rotate: 0,
        y: -32,
        scale: 1.09,
        zIndex: 50,
        opacity: 1
      };
    }

    // 3. ALIGNED FANNED DECK STAGE: exact reference curved arch alignment
    const transforms = total === 6 ? FAN_TRANSFORMS_6 : FAN_TRANSFORMS_5;
    const base = transforms[index] || { rotate: 0, y: 0, scale: 1, zIndex: 1 };
    return {
      x: 0,
      rotate: base.rotate,
      y: base.y,
      scale: base.scale,
      zIndex: base.zIndex,
      opacity: 1
    };
  };

  return (
    <section
      className="our-work-section"
      id="work"
      ref={sectionRef}
      aria-label="Our Work and Client Showcase"
    >
      <div className="work-container">
        {/* =========================================================================
            1. SECTION HERO & MASTERPIECE HEADLINE (MATCHING USER REFERENCE DESIGN)
            ========================================================================= */}
        <div className="work-header">
          <motion.div
            className="work-badge-pill"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-pulse-dot" />
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>TRUSTED BY INDUSTRY LEADERS & ARTISANS</span>
          </motion.div>

          <motion.h2
            className="work-reference-headline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A place to display your <span className="headline-masterpiece">masterpiece.</span>
          </motion.h2>

          <motion.p
            className="work-subheadline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From premier haute couture boutiques to disruptive tech labels and organic pioneers,
            explore how India's most ambitious brands showcase their identity with Pack Adda.
          </motion.p>
        </div>

        {/* =========================================================================
            2. ANIMATION STATUS & REPLAY CONTROLS BAR
            ========================================================================= */}
        <div className="work-action-toolbar">
          <div className="carousel-status-indicator">
            {animStage === 'carousel' ? (
              <span className="status-spinning">
                <Sparkles size={13} className="spin-icon" />
                <span>Synchronizing Brand Carousel...</span>
              </span>
            ) : (
              <span className="status-settled">
                <CheckCircle2 size={13} className="check-icon" />
                <span>Aligned Showcase • Click any brand to inspect</span>
              </span>
            )}
          </div>

          <div className="work-toolbar-actions">
            <button
              type="button"
              className="btn-replay-anim"
              onClick={startCarouselToFanAnimation}
              title="Re-play the brand carousel shuffle animation"
            >
              <RotateCcw size={13} />
              <span>Replay Shuffle</span>
            </button>

            <button
              type="button"
              className={`btn-mode-toggle ${viewMode === 'fan' ? 'active' : ''}`}
              onClick={() => {
                setViewMode(viewMode === 'fan' ? 'carousel-stream' : 'fan');
                if (viewMode === 'fan') startCarouselToFanAnimation();
              }}
              title="Toggle between Fanned Deck and Carousel Stream"
            >
              <SlidersHorizontal size={13} />
              <span>{viewMode === 'fan' ? 'Fanned Deck' : 'Carousel Stream'}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. CAROUSEL-TO-FANNED DECK INTERACTIVE STAGE (100% FAITHFUL TO REFERENCE)
            ========================================================================= */}
        <div className="deck-stage-wrapper">
          {/* Ambient Glow */}
          <div
            className="deck-stage-ambient-glow"
            style={{
              background: `radial-gradient(circle at center, ${activeBrand.cardTheme?.glow || 'rgba(213, 104, 63, 0.2)'} 0%, rgba(213, 104, 63, 0.04) 60%, transparent 75%)`
            }}
          />

          {/* Cards Arc Container */}
          <div
            className={`cards-fanned-deck ${animStage === 'carousel' ? 'is-animating' : 'is-aligned'}`}
            role="region"
            aria-label="Brand Packaging Cards"
          >
            {filteredBrands.map((brand, index) => {
              const transformConfig = getCardTransform(index, filteredBrands.length);
              const isSelected = selectedIndex === index;
              const isCardHovered = hoveredIndex === index;

              // Prominent handle tags on specific cards (matching @coplin & @andrea from reference)
              const showSpeechBubble =
                isCardHovered ||
                isSelected ||
                brand.id === 'grippie' ||
                brand.id === 'fathima-javed' ||
                brand.id === 'sewden';

              return (
                <motion.div
                  key={brand.id}
                  className={`fanned-card-item ${isSelected ? 'is-selected' : ''} ${
                    isCardHovered ? 'is-hovered' : ''
                  }`}
                  style={{
                    zIndex: transformConfig.zIndex,
                    originY: '100%',
                    originX: '50%'
                  }}
                  animate={{
                    rotate: transformConfig.rotate,
                    y: transformConfig.y,
                    scale: transformConfig.scale,
                    x: transformConfig.x || 0
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 18,
                    mass: 0.8,
                    delay: animStage === 'aligned' ? index * 0.04 : 0
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Floating speech-bubble badge with pointy tail (EXACT @coplin / @andrea style) */}
                  <AnimatePresence>
                    {showSpeechBubble && (
                      <motion.div
                        className="card-speech-bubble"
                        style={{
                          backgroundColor: brand.cardTheme?.badgeBg || brand.accentColor,
                          color: brand.cardTheme?.badgeColor || '#FFFFFF'
                        }}
                        initial={{ opacity: 0, y: 6, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: isCardHovered ? 1.08 : 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      >
                        <span className="bubble-handle-text">{brand.handle}</span>
                        <div
                          className="bubble-down-arrow"
                          style={{
                            borderTopColor: brand.cardTheme?.badgeBg || brand.accentColor
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Main Card Shell */}
                  <div
                    className="card-artwork-frame"
                    style={{
                      background: brand.cardTheme?.gradient || '#2A2118',
                      borderColor: brand.cardTheme?.border || 'rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Top Pill & Verified Icon */}
                    <div className="card-top-header">
                      <span
                        className="card-category-pill"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.18)',
                          color: brand.cardTheme?.textColor || '#FFFFFF'
                        }}
                      >
                        {brand.cardTheme?.cardTag || brand.category}
                      </span>
                      <span className="card-verified-badge" title="Verified Client">
                        <ShieldCheck size={14} color="#FFFFFF" />
                      </span>
                    </div>

                    {/* Center Brand Identity Logo (from public/our work) */}
                    <div className="card-logo-showcase-box">
                      <div className="logo-pod-circle">
                        <img
                          src={brand.logo}
                          alt={`${brand.name} official logo`}
                          className="card-brand-img"
                        />
                      </div>
                    </div>

                    {/* Bottom Typography & Packaging Snippet */}
                    <div className="card-bottom-info">
                      <h4
                        className="card-brand-name"
                        style={{ color: brand.cardTheme?.textColor || '#FFFFFF' }}
                      >
                        {brand.name}
                      </h4>
                      <p className="card-product-tagline">
                        {brand.cardTheme?.productSnippet || brand.subtitle}
                      </p>

                      <div className="card-inspect-hint">
                        <span>View Packaging</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    {/* Subtle glass reflection overlay */}
                    <div className="card-glass-shine" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Realistic Elliptical Ground Drop Shadow (matching reference photo) */}
          <div className="deck-ground-shadow" />
        </div>

        {/* =========================================================================
            4. SUBTITLE & ACTION BUTTONS (MATCHING REFERENCE BOTTOM ZONE)
            ========================================================================= */}
        <div className="work-reference-footer-cta">
          <p className="reference-cta-text">
            Brands can showcase their packaging masterpieces, and business owners can engineer
            solutions that elevate customer unboxing experiences.
          </p>

          <div className="reference-cta-buttons">
            <button
              type="button"
              className="btn-ref-primary"
              onClick={() => handleEnquireBrand(activeBrand)}
            >
              <span>Enquire {activeBrand.name} Style</span>
              <ArrowUpRight size={17} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              className="btn-ref-secondary"
              onClick={() => setSpecsModalBrand(activeBrand)}
            >
              <Maximize2 size={15} />
              <span>Inspect Full Specifications</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            5. CATEGORY FILTER TABS
            ========================================================================= */}
        <div className="work-filters-bar">
          <div className="work-filters-scroll" role="tablist">
            {WORK_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`work-filter-chip ${isSelected ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedIndex(0);
                  }}
                  role="tab"
                  aria-selected={isSelected}
                >
                  <span>{cat.label}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="activeWorkFilterPill"
                      className="filter-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            6. DETAILED BRAND SPOTLIGHT BENTO (EXPANDED SPECS & TESTIMONIAL)
            ========================================================================= */}
        <div className="active-brand-spotlight-section">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBrand.id}
              className="carousel-card-bento"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              style={{
                '--brand-accent': activeBrand.accentColor
              }}
            >
              {/* TOP ROW: Brand Identity & Rating */}
              <div className="bento-top-row">
                <div className="bento-brand-id">
                  <div className="bento-logo-pod">
                    <img
                      src={activeBrand.logo}
                      alt={`${activeBrand.name} logo`}
                      className="bento-logo-img"
                    />
                    <span className="bento-verified-ring" title="Verified Pack Adda Client">
                      <ShieldCheck size={15} />
                    </span>
                  </div>

                  <div className="bento-titles">
                    <div className="bento-tag-row">
                      <span className="bento-cat-tag">{activeBrand.category}</span>
                      <span className="bento-handle">{activeBrand.handle}</span>
                    </div>
                    <h3 className="bento-brand-title">{activeBrand.name}</h3>
                    <p className="bento-brand-subtitle">{activeBrand.tagline}</p>
                  </div>
                </div>

                <div className="bento-top-actions">
                  <div className="bento-rating-capsule">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#D5683F" stroke="#D5683F" />
                      ))}
                    </div>
                    <span className="rating-num">5.0</span>
                  </div>

                  <button
                    type="button"
                    className="btn-inspect-specs"
                    onClick={() => setSpecsModalBrand(activeBrand)}
                    aria-label={`View full technical specifications for ${activeBrand.name}`}
                  >
                    <Maximize2 size={14} />
                    <span>View Full Specs</span>
                  </button>
                </div>
              </div>

              {/* MIDDLE ROW: Bento Split (Metric & Quote / Packaging Suite) */}
              <div className="bento-middle-grid">
                <div className="bento-metric-column">
                  <div className="bento-metric-card">
                    <span className="metric-super-label">PROVEN VOLUME</span>
                    <span className="metric-huge-number" style={{ color: activeBrand.accentColor }}>
                      {activeBrand.highlightMetric}
                    </span>
                    <span className="metric-unit-label">{activeBrand.highlightMetricLabel}</span>
                  </div>

                  <div className="bento-quote-box">
                    <div className="quote-ornament">“</div>
                    <p className="quote-body-text">{activeBrand.clientQuote}</p>
                    <div className="quote-signature">
                      <span className="sig-author">{activeBrand.quoteAuthor}</span>
                      <span className="sig-role">{activeBrand.quoteRole}</span>
                    </div>
                  </div>
                </div>

                <div className="bento-suite-column">
                  <div className="suite-column-header">
                    <span className="suite-col-title">PACKAGING SUITE DELIVERED</span>
                    <span className="suite-col-count">3 Custom Units</span>
                  </div>

                  <div className="suite-items-stack">
                    {activeBrand.packagingSuite.map((item, idx) => (
                      <div key={idx} className="suite-item-row">
                        <div className="item-icon-box">
                          <Package size={18} />
                        </div>
                        <div className="item-text-box">
                          <div className="item-title-line">
                            <span className="item-title">{item.title}</span>
                            <span className="item-badge">{item.tag}</span>
                          </div>
                          <p className="item-desc">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="suite-fast-specs">
                    <div className="fast-spec-item">
                      <Layers size={14} />
                      <span className="fast-spec-label">Board Grade:</span>
                      <span className="fast-spec-val">
                        {activeBrand.specs.material.split('+')[0]}
                      </span>
                    </div>
                    <div className="fast-spec-item">
                      <Clock size={14} />
                      <span className="fast-spec-label">Turnaround:</span>
                      <span className="fast-spec-val">
                        {activeBrand.specs.turnaround.split('Pan-India')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Tags & Actions */}
              <div className="bento-bottom-row">
                <div className="bento-tags-row">
                  {activeBrand.keyTags.map((tag) => (
                    <span key={tag} className="bento-pill-tag">
                      <CheckCircle2 size={12} className="tag-check" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="bento-cta-group">
                  <button
                    type="button"
                    className="btn-work-quote-primary"
                    onClick={() => handleEnquireBrand(activeBrand)}
                  >
                    <span>Enquire This Packaging</span>
                    <ArrowUpRight size={17} strokeWidth={2.4} />
                  </button>

                  <a
                    href={`https://wa.me/919915510065?text=${encodeURIComponent(
                      `Hi Pack Adda! I was exploring your work with ${activeBrand.name} (${activeBrand.category}) on your website. I want to discuss a similar packaging solution for my brand.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-work-whatsapp"
                    aria-label="Direct WhatsApp consultation"
                  >
                    <MessageCircle size={17} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================================================
            7. AGENCY TRUST STATS STRIP
            ========================================================================= */}
        <div className="work-trust-strip">
          <div className="trust-strip-grid">
            {AGENCY_TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="trust-stat-card">
                <span className="stat-large-number">{stat.number}</span>
                <span className="stat-main-label">{stat.label}</span>
                <p className="stat-sub-text">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep-Dive Technical Specs Modal */}
      <BrandSpecsModal
        brand={specsModalBrand}
        isOpen={Boolean(specsModalBrand)}
        onClose={() => setSpecsModalBrand(null)}
        onEnquire={handleEnquireBrand}
      />

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={internalQuoteOpen}
        onClose={() => setInternalQuoteOpen(false)}
        initialProduct={internalQuoteProduct}
      />
    </section>
  );
}
