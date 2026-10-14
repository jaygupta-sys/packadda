import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import HeroNavbar from './HeroNavbar';
import HeroVideoSlot from './HeroVideoSlot';
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
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Top Navbar with prominently visible logo */}
      <HeroNavbar onOpenQuote={() => handleOpenQuote()} />

      {/* Hero Body Container */}
      <div className="hero-main-container">
        {/* Main Hero Showcase: Headline, Video, Trust Strip & CTAs */}
        <HeroContent
          onOpenQuote={() => handleOpenQuote()}
          onExploreWork={handleExploreWork}
          selectedProductId={selectedProduct?.id || hoveredProductId}
          onSelectProduct={handleSelectProduct}
          onHoverProduct={(id) => setHoveredProductId(id)}
        />

        {/* 3. Uske Niche: Interactive Packaging Stage */}
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
              <span className="scroll-text">Tap or hover any packaging piece to inspect details</span>
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
