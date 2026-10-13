import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import HeroCTA from './HeroCTA';
import HeroVideoSlot from './HeroVideoSlot';
import { TRUST_METRICS, PRODUCTS } from '../data/products';

export default function HeroContent({
  onOpenQuote,
  onExploreWork,
  selectedProductId,
  onSelectProduct,
  onHoverProduct
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className="hero-content-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow */}
      <motion.div className="hero-eyebrow-wrapper" variants={itemVariants}>
        <span className="hero-eyebrow-text">CUSTOM PACKAGING &amp; PRINTING</span>
        <span className="hero-eyebrow-line" aria-hidden="true" />
      </motion.div>

      {/* Main Editorial Headline - Compact, 2 Powerful Lines */}
      <motion.h1 className="hero-headline" variants={itemVariants}>
        <span className="headline-line">PACKAGING THAT MAKES</span>
        <span className="headline-line">
          <span className="accent-text">YOUR BRAND</span> STAND OUT.
        </span>
      </motion.h1>

      {/* Cinematic Showcase Video Reel - TALL, PROMINENT, IMMERSIVE */}
      <motion.div className="hero-video-slot-container" variants={itemVariants}>
        <HeroVideoSlot videoSrc="/hero video.mp4" onExplore={onExploreWork} />
      </motion.div>

      {/* Trust Badging: Directly after Video */}
      <motion.div className="proof-side-block hero-trust-strip" variants={itemVariants}>
        {/* 3 Metrics: 1K+ | Custom | Pan India */}
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

        {/* Social Proof Review Strip */}
        <div className="proof-review-strip">
          <div className="avatar-stack" aria-hidden="true">
            <span className="avatar-circle av-1">
              <span className="avatar-initials">AK</span>
            </span>
            <span className="avatar-circle av-2">
              <span className="avatar-initials">MR</span>
            </span>
            <span className="avatar-circle av-3">
              <span className="avatar-initials">SK</span>
            </span>
            <span className="avatar-circle av-plus">
              <Plus size={11} strokeWidth={3} />
            </span>
          </div>

          <div className="review-meta">
            <span className="review-title">Trusted by 1,000+ businesses</span>
            <div className="review-stars-row">
              <div className="stars-icons" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="star-gold"
                    fill="#D5683F"
                    color="#D5683F"
                  />
                ))}
              </div>
              <span className="review-score">4.9/5 (Google Reviews)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Primary & Secondary Call-To-Action */}
      <motion.div className="hero-cta-wrapper" variants={itemVariants}>
        <HeroCTA onOpenQuote={onOpenQuote} onExploreWork={onExploreWork} />
      </motion.div>

      {/* Chips Bar: TAP TO INSPECT PACKAGING */}
      <motion.div className="hero-inspect-chips-container" variants={itemVariants}>
        <div className="inspect-chips-label">
          <span>TAP TO INSPECT PACKAGING:</span>
        </div>
        <div className="inspect-chips-scroll" role="tablist" aria-label="Inspect packaging types">
          {PRODUCTS.map((prod) => {
            const isActive = selectedProductId === prod.id;
            return (
              <button
                key={prod.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`inspect-chip-button ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (onHoverProduct) onHoverProduct(prod.id);
                  if (onSelectProduct) onSelectProduct(prod);
                }}
                onMouseEnter={() => {
                  if (onHoverProduct) onHoverProduct(prod.id);
                }}
              >
                <span>{prod.title}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
