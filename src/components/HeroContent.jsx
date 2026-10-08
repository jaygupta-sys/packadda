import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import HeroCTA from './HeroCTA';
import { TRUST_METRICS } from '../data/products';

export default function HeroContent({ onOpenQuote, onExploreWork }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className="hero-content-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow */}
      <motion.div className="hero-eyebrow-wrapper" variants={itemVariants}>
        <span className="hero-eyebrow-text">CUSTOM PACKAGING &amp; PRINTING</span>
        <span className="hero-eyebrow-line" aria-hidden="true" />
      </motion.div>

      {/* Main Editorial Headline */}
      <motion.h1 className="hero-headline" variants={itemVariants}>
        <span className="headline-line">PACKAGING</span>
        <span className="headline-line">THAT MAKES</span>
        <span className="headline-line accent-text">YOUR BRAND</span>
        <span className="headline-line">STAND OUT.</span>
      </motion.h1>

      {/* Supporting Text */}
      <motion.p className="hero-supporting-text" variants={itemVariants}>
        Custom boxes, paper bags, cards, stickers and packaging made around your brand.
      </motion.p>

      {/* Primary & Secondary Call-To-Action */}
      <motion.div className="hero-cta-wrapper" variants={itemVariants}>
        <HeroCTA onOpenQuote={onOpenQuote} onExploreWork={onExploreWork} />
      </motion.div>

      {/* Trust & Performance Metrics Strip */}
      <motion.div className="hero-proof-section" variants={itemVariants}>
        {/* Metric Dividers */}
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

        {/* Social Proof & Rating Strip */}
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
    </motion.div>
  );
}
