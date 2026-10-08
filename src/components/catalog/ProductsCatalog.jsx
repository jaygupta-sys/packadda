import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ProductCatalogCard from './ProductCatalogCard';
import QuoteModal from '../QuoteModal';
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES } from '../../data/catalogProducts';

export default function ProductsCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Filter products based on active category and search query
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((prod) => {
      const matchesCategory =
        activeCategory === 'all' || prod.category.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        prod.title.toLowerCase().includes(query) ||
        prod.category.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleEnquire = (product) => {
    setQuoteProduct(product);
    setQuoteModalOpen(true);
  };

  return (
    <section className="products-catalog-section" id="products">
      <div className="catalog-container">
        {/* Section Header (Matches Reference Layout) */}
        <div className="catalog-header-split">
          <div className="catalog-header-left">
            <h2 className="catalog-main-headline">
              <span className="headline-primary">Good things.</span>
              <span className="headline-italic">Better packaged.</span>
            </h2>
          </div>

          <div className="catalog-header-right">
            <p className="catalog-lead-text">
              From the everyday retail unboxing to a beautifully wrapped corporate gift.
              Find the perfect bespoke packaging solution for your brand.
            </p>
          </div>
        </div>

        {/* Search Bar & Category Filter Strip */}
        <div className="catalog-controls-bar">
          {/* Search Input Box */}
          <div className="catalog-search-wrapper">
            <Search size={17} className="search-icon" aria-hidden="true" />
            <input
              type="text"
              className="catalog-search-input"
              placeholder="Search packaging — e.g. boxes, cards, tags, stickers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search packaging products"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="catalog-filters-scroll" role="tablist" aria-label="Filter products by category">
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

        {/* 6 Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="catalog-products-grid">
            {filteredProducts.map((product) => (
              <ProductCatalogCard
                key={product.id}
                product={product}
                onEnquire={handleEnquire}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <p className="empty-message">No packaging products matched “{searchQuery}”.</p>
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />
    </section>
  );
}
