import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Sparkles, Clock, PackageCheck, Layers, Palette, Ruler } from 'lucide-react';

export default function ProductDrawer({ product, isOpen, onClose, onOpenQuote }) {
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

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="product-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="product-drawer-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Drawer Header */}
            <div className="drawer-header">
              <div>
                <span className="drawer-badge">{product.category}</span>
                <h2 className="drawer-title">{product.title}</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close product details drawer"
              >
                <X size={20} color="#49291D" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="drawer-content-scroll">
              <p className="drawer-description">{product.description}</p>

              {/* Specs Grid */}
              <div className="drawer-specs-card">
                <h3 className="specs-card-title">Production Specifications</h3>

                <div className="spec-row">
                  <div className="spec-label-col">
                    <Layers size={16} color="#D5683F" />
                    <span>Material &amp; Weight</span>
                  </div>
                  <div className="spec-value">{product.specs.material}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-label-col">
                    <Sparkles size={16} color="#D5683F" />
                    <span>Finishing Options</span>
                  </div>
                  <div className="spec-tags-wrap">
                    {product.specs.finishes.map((f) => (
                      <span key={f} className="finish-tag">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {product.specs.shapes && (
                  <div className="spec-row">
                    <div className="spec-label-col">
                      <Sparkles size={16} color="#D5683F" />
                      <span>Available Shapes</span>
                    </div>
                    <div className="spec-value">{product.specs.shapes}</div>
                  </div>
                )}

                <div className="spec-row">
                  <div className="spec-label-col">
                    <PackageCheck size={16} color="#D5683F" />
                    <span>Minimum Order</span>
                  </div>
                  <div className="spec-value highlight-moq">{product.specs.moq}</div>
                </div>

                {product.specs.designCharge && (
                  <div className="spec-row">
                    <div className="spec-label-col">
                      <Palette size={16} color="#D5683F" />
                      <span>Design Charges</span>
                    </div>
                    <div className="spec-value">{product.specs.designCharge}</div>
                  </div>
                )}

                {product.specs.dieCharge && (
                  <div className="spec-row">
                    <div className="spec-label-col">
                      <Ruler size={16} color="#D5683F" />
                      <span>Die Making (New Size)</span>
                    </div>
                    <div className="spec-value">{product.specs.dieCharge}</div>
                  </div>
                )}

                <div className="spec-row">
                  <div className="spec-label-col">
                    <Clock size={16} color="#D5683F" />
                    <span>Turnaround Time</span>
                  </div>
                  <div className="spec-value">{product.specs.leadTime}</div>
                </div>
              </div>

              {/* Ideal Applications */}
              <div className="drawer-ideal-block">
                <span className="ideal-label">Recommended For:</span>
                <p className="ideal-text">{product.specs.idealFor}</p>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="drawer-footer">
              <button
                type="button"
                className="btn-quote-primary w-full"
                onClick={() => {
                  onClose();
                  onOpenQuote(product);
                }}
              >
                <span>Request Quote for {product.title}</span>
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
