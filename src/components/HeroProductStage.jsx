import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProductHotspot from './ProductHotspot';
import { PRODUCTS } from '../data/products';

export default function HeroProductStage({
  onSelectProduct,
  hoveredProductId: controlledHoveredId,
  onHoverProduct: controlledOnHover,
  onLeaveProduct: controlledOnLeave
}) {
  const [internalHoveredId, setInternalHoveredId] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const stageRef = useRef(null);

  const isControlled = controlledHoveredId !== undefined;
  const hoveredProductId = isControlled ? controlledHoveredId : internalHoveredId;

  // Subtle 3D tilt effect on desktop mouse move
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [1.2, -1.2]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-1.5, 1.5]);

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleStageMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    handleProductLeave();
  };

  const handleProductHover = (id) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (controlledOnHover) controlledOnHover(id);
    if (!isControlled) setInternalHoveredId(id);
  };

  const handleProductLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      if (controlledOnLeave) controlledOnLeave();
      if (!isControlled) setInternalHoveredId(null);
    }, 100);
  };

  const hoveredProduct = PRODUCTS.find((p) => p.id === hoveredProductId);

  return (
    <div className="hero-product-stage-col">
      <motion.div
        ref={stageRef}
        className="product-stage-viewport"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleStageMouseLeave}
        style={{
          perspective: 1200,
          rotateX,
          rotateY
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`product-stage-inner ${hoveredProduct ? 'has-hovered' : ''}`}>
          {/* Base Photorealistic Packaging Composition */}
          <img
            src="/images/product_stage.png"
            alt="Pack Adda premium packaging showcase on travertine stone"
            className="product-stage-base-img"
            loading="eager"
            fetchPriority="high"
          />

          {/* Arched Design Line */}
          <svg
            className="stage-accent-arc"
            viewBox="0 0 896 1200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M-30 880 C 180 500, 480 100, 860 380"
              stroke="#D5683F"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeOpacity="0.35"
            />
          </svg>

          {/* Interactive Invisible Hit Areas over physical products */}
          {PRODUCTS.map((prod) => (
            <div
              key={`hit-${prod.id}`}
              className="product-physical-hitarea"
              style={{
                left: prod.hitArea.left,
                top: prod.hitArea.top,
                width: prod.hitArea.width,
                height: prod.hitArea.height
              }}
              onMouseEnter={() => handleProductHover(prod.id)}
              onMouseLeave={handleProductLeave}
              onClick={() => onSelectProduct(prod)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${prod.title}`}
            />
          ))}

          {/* 3D Elevated Product Pop-Up Layer with Radiant Glow Halo */}
          <AnimatePresence>
            {hoveredProduct && (
              <motion.div
                key={`pop-${hoveredProduct.id}`}
                className="product-3d-pop-layer"
                style={{
                  transformOrigin: hoveredProduct.center,
                  pointerEvents: 'none'
                }}
                initial={{ scale: 1, y: 0, opacity: 0 }}
                animate={{
                  scale: 1.05,
                  y: -10,
                  opacity: 1
                }}
                exit={{
                  scale: 1,
                  y: 0,
                  opacity: 0,
                  transition: { duration: 0.18 }
                }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 26
                }}
              >
                <div
                  className="product-3d-pop-clipped"
                  style={{
                    clipPath: hoveredProduct.clipPath
                  }}
                >
                  <img
                    src="/images/product_stage.png"
                    alt=""
                    className="product-stage-pop-img"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Capsule Badges - ONLY visible on hover */}
          <AnimatePresence>
            {PRODUCTS.map((prod) => {
              if (hoveredProductId !== prod.id) return null;

              return (
                <ProductHotspot
                  key={prod.id}
                  product={prod}
                  isActive={true}
                  onHover={() => handleProductHover(prod.id)}
                  onLeave={handleProductLeave}
                  onClick={(p) => onSelectProduct(p)}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Interactive Product Switcher Bar */}
      <div className="mobile-product-bar" aria-label="Explore packaging categories">
        <div className="mobile-bar-label">
          <span>Tap to inspect packaging:</span>
        </div>
        <div className="mobile-chips-scroll">
          {PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              type="button"
              className={`mobile-product-chip ${
                hoveredProductId === prod.id ? 'active' : ''
              }`}
              onClick={() => {
                setHoveredProductId(prod.id);
                onSelectProduct(prod);
              }}
            >
              <span>{prod.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
