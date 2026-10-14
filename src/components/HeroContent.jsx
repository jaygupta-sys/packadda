import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star, Plus } from 'lucide-react';
import { TRUST_METRICS } from '../data/products';

/* 4 Core Hero Packaging Categories with authentic imagery */
const HERO_CATEGORIES = [
  {
    id: 'custom-boxes',
    label: 'Custom Boxes',
    image: '/images/products/boxes.jpg',
    tagline: 'Rigid & corrugated custom mailers',
    accentColor: '#D5683F'
  },
  {
    id: 'paper-bags',
    label: 'Paper Bags',
    image: '/images/products/paper-bags.jpg',
    tagline: 'Kraft & luxury branded carry bags',
    accentColor: '#D5683F'
  },
  {
    id: 'business-cards',
    label: 'Business Cards',
    image: '/images/products/cards.jpg',
    tagline: 'Foil-stamped & textured visiting cards',
    accentColor: '#D5683F'
  },
  {
    id: 'stickers',
    label: 'Stickers',
    image: '/images/products/stickers.jpg',
    tagline: 'Die-cut vinyl & waterproof roll labels',
    accentColor: '#D5683F'
  }
];

/* Prefers-reduced-motion hook */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function HeroContent({
  onOpenQuote,
  onExploreWork,
  selectedProductId,
  onSelectProduct
}) {
  const [activeCat, setActiveCat] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const stageRef = useRef(null);
  const chipsScrollRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const currentCat = HERO_CATEGORIES[activeCat];

  // Subtle 3D tilt on mouse move
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 20, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], reducedMotion ? [0, 0] : [2.5, -2.5]);
  const rotateY = useTransform(smoothMouseX, [0, 1], reducedMotion ? [0, 0] : [-3, 3]);

  const handleMouseMove = (e) => {
    if (reducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  /* Touch / Swipe handling on the product card */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only swipe if horizontal move was greater than vertical move
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && activeCat < HERO_CATEGORIES.length - 1) {
        handleSelectCategory(activeCat + 1);
      } else if (diffX < 0 && activeCat > 0) {
        handleSelectCategory(activeCat - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleSelectCategory = (idx) => {
    setActiveCat(idx);
    // Smooth scroll chip into view in selector strip
    if (chipsScrollRef.current) {
      const chipButtons = chipsScrollRef.current.querySelectorAll('.hero-cat-chip');
      if (chipButtons[idx]) {
        chipButtons[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const goNext = () => {
    if (activeCat < HERO_CATEGORIES.length - 1) {
      handleSelectCategory(activeCat + 1);
    }
  };

  const goPrev = () => {
    if (activeCat > 0) {
      handleSelectCategory(activeCat - 1);
    }
  };

  const dur = reducedMotion ? 0 : 0.6;
  const ease = [0.16, 1, 0.3, 1];

  const containerV = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: reducedMotion ? 0 : 0.04
      }
    }
  };

  const fadeUpV = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: dur, ease } }
  };

  return (
    <motion.div
      className="hero-content-section"
      variants={containerV}
      initial="hidden"
      animate="visible"
    >
      {/* ======================================================
          1. PRODUCT VISUAL FIRST (Mobile-first order & desktop visual stage)
          ====================================================== */}
      <motion.div className="hero-product-showcase" variants={fadeUpV}>
        <motion.div
          ref={stageRef}
          className="hero-product-stage-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            perspective: 1000,
            rotateX,
            rotateY
          }}
        >
          {/* Subtle warm luxury ambient glow */}
          <div className="hero-product-glow" aria-hidden="true" />

          {/* Layered secondary visual composition element */}
          <div className="hero-product-layered-backdrop" aria-hidden="true" />

          {/* Primary Featured Product Visual with floating motion */}
          <div className="hero-product-img-wrapper">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentCat.id}
                src={currentCat.image}
                alt={`Pack Adda ${currentCat.label} custom printing`}
                className="hero-product-featured-img"
                draggable={false}
                loading="eager"
                fetchPriority="high"
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 14 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: reducedMotion ? 0 : 0.45, ease }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              />
            </AnimatePresence>
          </div>

          {/* Category label badge */}
          <div className="hero-product-cat-badge">
            <span className="cat-badge-dot" />
            <span className="cat-badge-label">{currentCat.label}</span>
          </div>

          {/* Left / Right touch & click navigation arrows */}
          <button
            type="button"
            className="hero-product-nav-btn hero-product-nav-prev"
            onClick={goPrev}
            disabled={activeCat === 0}
            aria-label="Previous packaging product"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="hero-product-nav-btn hero-product-nav-next"
            onClick={goNext}
            disabled={activeCat === HERO_CATEGORIES.length - 1}
            aria-label="Next packaging product"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* Category Dot Indicators */}
        <div className="hero-product-dots" role="tablist" aria-label="Product categories">
          {HERO_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={idx === activeCat}
              className={`hero-dot ${idx === activeCat ? 'active' : ''}`}
              onClick={() => handleSelectCategory(idx)}
              aria-label={`Show ${cat.label}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ======================================================
          2. HEADLINE & SUPPORTING TEXT
          ====================================================== */}
      <motion.div className="hero-text-block" variants={fadeUpV}>
        {/* Eyebrow */}
        <div className="hero-eyebrow-wrapper">
          <span className="hero-eyebrow-text">CUSTOM PACKAGING &amp; PRINTING</span>
          <span className="hero-eyebrow-line" aria-hidden="true" />
        </div>

        {/* Headline: Packaging that makes YOUR BRAND stand out. */}
        <h1 className="hero-headline">
          <span className="headline-line">PACKAGING THAT MAKES</span>
          <span className="headline-line">
            <span className="accent-text">YOUR BRAND</span> STAND OUT.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="hero-supporting-text">
          Custom boxes, paper bags, cards and stickers made for your brand.
        </p>
      </motion.div>

      {/* ======================================================
          3. CTA BUTTONS (Min 48px touch height, Orange primary)
          ====================================================== */}
      <motion.div className="hero-cta-wrapper" variants={fadeUpV}>
        <div className="hero-cta-group">
          <motion.button
            type="button"
            className="btn-quote-primary"
            onClick={onOpenQuote}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease }}
            aria-label="Get a custom packaging quote"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="cta-icon-primary" size={19} strokeWidth={2.4} />
          </motion.button>

          <motion.button
            type="button"
            className="btn-explore-secondary"
            onClick={onExploreWork}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease }}
            aria-label="Explore Pack Adda products"
          >
            <span className="btn-text">Explore Products</span>
            <ArrowUpRight size={17} strokeWidth={2.2} className="explore-arrow" />
          </motion.button>
        </div>
      </motion.div>

      {/* ======================================================
          4. SWIPEABLE CATEGORY SELECTOR STRIP (Touch / Swipe)
          ====================================================== */}
      <motion.div className="hero-cat-selector-wrapper" variants={fadeUpV}>
        <div className="hero-cat-selector-label">
          <span>SELECT PACKAGING TYPE:</span>
        </div>
        <div className="hero-cat-scroll" ref={chipsScrollRef} role="tablist">
          {HERO_CATEGORIES.map((cat, idx) => {
            const isActive = idx === activeCat;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`hero-cat-chip ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectCategory(idx)}
              >
                <img
                  src={cat.image}
                  alt=""
                  className="cat-chip-thumb"
                  loading="lazy"
                  draggable={false}
                />
                <span className="cat-chip-label">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ======================================================
          5. TRUST METRICS STRIP (At bottom below main hero content)
          ====================================================== */}
      <motion.div className="hero-trust-strip" variants={fadeUpV}>
        <div className="proof-metrics-grid">
          {TRUST_METRICS.map((metric, idx) => (
            <div key={metric.label} className="proof-metric-item">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
              {idx < TRUST_METRICS.length - 1 && (
                <span className="metric-divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className="proof-review-strip">
          <div className="avatar-stack" aria-hidden="true">
            <span className="avatar-circle av-1"><span className="avatar-initials">AK</span></span>
            <span className="avatar-circle av-2"><span className="avatar-initials">MR</span></span>
            <span className="avatar-circle av-3"><span className="avatar-initials">SK</span></span>
            <span className="avatar-circle av-plus"><Plus size={11} strokeWidth={3} /></span>
          </div>
          <div className="review-meta">
            <span className="review-title">Trusted by 1,000+ businesses</span>
            <div className="review-stars-row">
              <div className="stars-icons" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="star-gold" fill="#D5683F" color="#D5683F" />
                ))}
              </div>
              <span className="review-score">4.9/5 (Google Reviews)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
