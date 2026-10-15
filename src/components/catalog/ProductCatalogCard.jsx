import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCatalogCard({ product, onEnquire }) {
  return (
    <article className="catalog-product-card">
      {/* Product Image Frame */}
      <div className="card-image-wrap" onClick={() => onEnquire(product)} role="button" tabIndex={0}>
        <img
          src={product.image}
          alt={`Pack Adda ${product.title}`}
          className="card-product-img"
          loading="lazy"
        />
        {/* Subtle Hover Action Badge (matches reference screenshot circle) */}
        <div className="card-hover-bubble" aria-hidden="true">
          <ArrowUpRight size={18} strokeWidth={2.4} />
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body-content">
        {/* Number Row */}
        <div className="card-meta-top">
          <span className="card-index-num">{product.number}</span>
        </div>

        {/* Title */}
        <h3 className="card-product-title">
          <button
            type="button"
            className="title-link-btn"
            onClick={() => onEnquire(product)}
          >
            {product.title}
          </button>
        </h3>

        {/* Description */}
        <p className="card-product-desc">{product.description}</p>

        {/* Quick Specs & Charges */}
        <div className="card-specs-brief">
          <span className="card-badge-pill">MOQ: {product.specs.moq}</span>
          <span className="card-badge-pill subtle">Design: ₹1,000 (One-time)</span>
        </div>

        {/* Card Footer Action */}
        <div className="card-action-footer">
          <button
            type="button"
            className="card-enquire-btn"
            onClick={() => onEnquire(product)}
            aria-label={`Enquire about ${product.title}`}
          >
            <span>Enquire about this</span>
            <ArrowUpRight size={15} className="enquire-arrow-icon" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </article>
  );
}
