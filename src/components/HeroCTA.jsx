import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

export default function HeroCTA({ onOpenQuote, onExploreWork }) {
  return (
    <div className="hero-cta-group">
      {/* Primary CTA: High-contrast filled button */}
      <motion.button
        type="button"
        className="btn-quote-primary"
        onClick={onOpenQuote}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Get a custom packaging quote"
      >
        <span>Get a Quote</span>
        <ArrowUpRight className="cta-icon-primary" size={19} strokeWidth={2.4} />
      </motion.button>

      {/* Secondary CTA: Editorial outline / play button */}
      <motion.button
        type="button"
        className="btn-explore-secondary"
        onClick={onExploreWork}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Explore Pack Adda portfolio work"
      >
        <span className="play-icon-bubble">
          <Play size={12} fill="#49291D" strokeWidth={0} />
        </span>
        <span className="btn-text">Explore our work</span>
      </motion.button>
    </div>
  );
}
