import React, { useState, useMemo } from 'react';
import ProductCatalogCard from './ProductCatalogCard';
import QuoteModal from '../QuoteModal';
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES } from '../../data/catalogProducts';

export default function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((prod) => {
      return activeCategory === 'all' || prod.category.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [activeCategory]);

  const handleEnquire = (product) => {
    setQuoteProduct(product);
    setQuoteModalOpen(true);
  };

  return (
    <section className="products-catalog-section" id="products">
      <div className="catalog-container">
        {/* Section Header: Clean headline without paragraph */}
        <div className="catalog-header-clean">
          <h2 className="catalog-main-headline">
            <span className="headline-primary">Good things.</span>
            <span className="headline-italic">Better packaged.</span>
          </h2>
        </div>

        {/* Category Filter Chips in a sleek, stylish single line */}
        <div className="catalog-controls-clean">
          <div
            className="catalog-filters-scroll"
            role="tablist"
            aria-label="Filter products by category"
          >
            {CATALOG_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-chip-btn ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={isSelected}
                >
                  <span className="chip-label">{cat.label}</span>
                  {cat.id === 'all' && (
                    <span className="chip-count-bubble">{CATALOG_PRODUCTS.length}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="catalog-products-grid">
          {filteredProducts.map((product) => (
            <ProductCatalogCard
              key={product.id}
              product={product}
              onEnquire={handleEnquire}
            />
          ))}
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />
    </section>
  );
}
