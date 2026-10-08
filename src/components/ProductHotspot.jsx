import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ProductHotspot({
  product,
  isActive,
  onHover,
  onLeave,
  onClick
}) {
  return (
    <motion.div
      className={`product-hotspot-wrapper ${isActive ? 'is-active' : ''}`}
      style={{
        left: product.badgePos.left,
        top: product.badgePos.top
      }}
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        zIndex: 50
      }}
      exit={{
        opacity: 0,
        scale: 0.88,
        y: 6,
        transition: { duration: 0.18 }
      }}
      transition={{
        duration: 0.24,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.title} category`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(product);
        }
      }}
    >
      <div className="hotspot-badge-pill">
        <span className="badge-title">{product.title}</span>
        <ArrowUpRight size={14} className="badge-arrow-icon" strokeWidth={2.4} />
      </div>
    </motion.div>
  );
}
