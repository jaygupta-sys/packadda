import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star, Plus } from 'lucide-react';
import { TRUST_METRICS } from '../data/products';

/* 4 Core Hero Packaging Categories with authentic imagery */
const HERO_CATEGORIES = [
  {
    id: 'custom-boxes',
    label: 'Custom Boxes',
    image: '/images/products/boxes.jpg?v=2',
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
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const stageRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const currentCat = HERO_CATEGORIES[activeCat];

  // Subtle 3D tilt on mouse move
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 20, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], reducedMotion ? [0, 0] : [2, -2]);
  const rotateY = useTransform(smoothMouseX, [0, 1], reducedMotion ? [0, 0] : [-2.5, 2.5]);

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
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
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
    if (idx === activeCat) return;
    setDirection(idx > activeCat ? 1 : -1);
    setActiveCat(idx);
  };

  const goNext = (e) => {
    if (e) e.stopPropagation();
    if (activeCat < HERO_CATEGORIES.length - 1) {
      setDirection(1);
      setActiveCat((p) => p + 1);
    }
  };

  const goPrev = (e) => {
    if (e) e.stopPropagation();
    if (activeCat > 0) {
      setDirection(-1);
      setActiveCat((p) => p - 1);
    }
  };

  const dur = reducedMotion ? 0 : 0.55;
  const ease = [0.16, 1, 0.3, 1];

  /* 3D Slide & Float Variants for Product Transition */
  const slideVariants = {
    enter: (dir) => ({
      x: reducedMotion ? 0 : dir > 0 ? 90 : -90,
      opacity: 0,
      scale: reducedMotion ? 1 : 0.94,
      rotateY: reducedMotion ? 0 : dir > 0 ? 6 : -6
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.42,
        ease
      }
    },
    exit: (dir) => ({
      x: reducedMotion ? 0 : dir > 0 ? -90 : 90,
      opacity: 0,
      scale: reducedMotion ? 1 : 0.94,
      rotateY: reducedMotion ? 0 : dir > 0 ? -6 : 6,
      transition: {
        duration: reducedMotion ? 0 : 0.24,
        ease: 'easeIn'
      }
    })
  };

  const containerV = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.06,
        delayChildren: reducedMotion ? 0 : 0.02
      }
    }
  };

  const fadeUpV = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 12 },
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
          FIRST FOLD CONTENT WRAPPER:
          Fits 100% inside mobile viewport without scrolling!
          ====================================================== */}
      <div className="hero-first-fold-group">
        {/* 1. LARGE LUXURY PRODUCT VISUAL CARD WITH INTEGRATED TABS */}
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
            {/* Ambient luxury warm radial glow */}
            <div className="hero-product-glow" aria-hidden="true" />

            {/* Layered subtle framing accent for depth */}
            <div className="hero-product-layered-backdrop" aria-hidden="true" />

            {/* Primary Featured Product Visual with 3D Slide & Floating Motion */}
            <div className="hero-product-img-wrapper">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentCat.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={currentCat.image}
                  alt={`Pack Adda ${currentCat.label} custom printing`}
                  className="hero-product-featured-img"
                  draggable={false}
                  loading="eager"
                  fetchPriority="high"
                />
              </AnimatePresence>
            </div>

            {/* Top-Left Category Badge */}
            <div className="hero-product-cat-badge">
              <span className="cat-badge-dot" />
              <span className="cat-badge-label">{currentCat.label}</span>
            </div>

            {/* Navigation Arrows (< and >) */}
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

            {/* Integrated Minimalist Floating Category Tabs directly INSIDE the card */}
            <div className="hero-stage-floating-tabs" role="tablist" aria-label="Select packaging category">
              {HERO_CATEGORIES.map((cat, idx) => {
                const isActive = idx === activeCat;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`stage-floating-tab ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCategory(idx);
                    }}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* 2. HEADLINE & SUPPORTING TEXT */}
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

        {/* 3. CTA BUTTONS (Min 48px touch height, Orange primary) */}
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
              <ArrowUpRight className="cta-icon-primary" size={18} strokeWidth={2.4} />
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
              <ArrowUpRight size={16} strokeWidth={2.2} className="explore-arrow" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ======================================================
          BELOW THE FOLD:
          Natural scroll reveals trust proof & reviews
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
