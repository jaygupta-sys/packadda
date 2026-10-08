import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import HeroNavbar from './HeroNavbar';
import HeroContent from './HeroContent';
import HeroProductStage from './HeroProductStage';
import QuoteModal from './QuoteModal';
import ProductDrawer from './ProductDrawer';
import { PRODUCTS } from '../data/products';

export default function Hero() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const hoveredProduct = PRODUCTS.find((p) => p.id === hoveredProductId);

  const handleOpenQuote = (product = null) => {
    setQuoteProduct(product);
    setQuoteModalOpen(true);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleExploreWork = () => {
    const flagship = PRODUCTS[0];
    handleSelectProduct(flagship);
  };

  return (
    <section className="hero-section" id="hero">
      {/* Top Navbar */}
      <HeroNavbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Hero Viewport Split */}
      <div className="hero-main-container">
        {/* Left Side: 45% Typography & CTAs */}
        <HeroContent
          onOpenQuote={() => handleOpenQuote()}
          onExploreWork={handleExploreWork}
        />

        {/* Right Side: 55% Art-Directed Packaging Product Stage */}
        <HeroProductStage
          onSelectProduct={handleSelectProduct}
          hoveredProductId={hoveredProductId}
          onHoverProduct={(id) => setHoveredProductId(id)}
          onLeaveProduct={() => setHoveredProductId(null)}
        />
      </div>

      {/* Natural Bottom Interactive Category / Hover Indicator */}
      <div className="hero-scroll-indicator">
        <AnimatePresence mode="wait">
          {hoveredProduct ? (
            <motion.button
              key={`active-${hoveredProduct.id}`}
              type="button"
              className="stage-active-hint-btn"
              onClick={() => handleSelectProduct(hoveredProduct)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              aria-label={`Open ${hoveredProduct.title} category`}
            >
              <span className="active-hint-name">{hoveredProduct.title}</span>
              <ArrowUpRight size={14} className="active-hint-arrow" />
            </motion.button>
          ) : (
            <motion.div
              key="resting-hint"
              className="stage-resting-hint"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
            >
              <span className="scroll-pill-line" />
              <span className="scroll-text">Hover any piece — select it to open its category</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />

      {/* Interactive Product Specifications Drawer */}
      <ProductDrawer
        product={selectedProduct}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenQuote={(prod) => handleOpenQuote(prod)}
      />
    </section>
  );
}
