import React from 'react';
import Hero from './components/Hero';
import ProductsCatalog from './components/catalog/ProductsCatalog';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="app-root">
      <Hero />
      <ProductsCatalog />
      <Footer />
    </main>
  );
}

