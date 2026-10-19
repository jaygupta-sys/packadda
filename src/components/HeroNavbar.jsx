import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../data/products';

export default function HeroNavbar({ onOpenQuote }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = [
      { id: 'hero', href: '#' },
      { id: 'products', href: '#products' },
      { id: 'work', href: '#work' },
      { id: 'contact', href: '#contact' },
      { id: 'footer', href: '#about' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) setActiveHref(match.href);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-container">
        {/* Left: Pack Adda Logo strictly unmodified */}
        <a href="#" className="navbar-logo-link" aria-label="PACK ADDA Home">
          <img
            src="/images/logo.png"
            alt="PACK ADDA - Custom Packaging, Printing & Designing"
            className="navbar-logo-img"
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="navbar-nav desktop-only" aria-label="Primary Navigation">
          <ul className="navbar-nav-list">
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.name} className="navbar-nav-item">
                  <a
                    href={link.href}
                    className={`navbar-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      setActiveHref(link.href);
                      if (link.href === '#work') {
                        setTimeout(() => {
                          window.dispatchEvent(new CustomEvent('packadda-trigger-work-animation'));
                        }, 100);
                      }
                      if (link.href.startsWith('#') && link.href.length > 1) {
                        const targetEl = document.querySelector(link.href);
                        if (targetEl) {
                          e.preventDefault();
                          targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        className="nav-active-pill"
                        layoutId="activeNavIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="navbar-actions">
          <button
            onClick={() => onOpenQuote()}
            className="btn-quote-nav desktop-only"
            aria-label="Get a custom packaging quote"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="btn-icon" size={16} strokeWidth={2.4} />
          </button>

          {/* Minimal Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-hamburger-btn mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={24} color="#49291D" strokeWidth={2.2} />
            ) : (
              <Menu size={24} color="#49291D" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down / Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-inner">
              <nav aria-label="Mobile Navigation">
                <ul className="mobile-nav-list">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeHref === link.href;
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                          onClick={(e) => {
                            setMobileMenuOpen(false);
                            setActiveHref(link.href);
                            if (link.href === '#work') {
                              setTimeout(() => {
                                window.dispatchEvent(new CustomEvent('packadda-trigger-work-animation'));
                              }, 150);
                            }
                            if (link.href.startsWith('#') && link.href.length > 1) {
                              const targetEl = document.querySelector(link.href);
                              if (targetEl) {
                                e.preventDefault();
                                targetEl.scrollIntoView({ behavior: 'smooth' });
                              }
                            }
                          }}
                        >
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mobile-menu-footer">
                <button
                  className="btn-quote-primary w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                >
                  <span>Get a Quote</span>
                  <ArrowUpRight size={18} strokeWidth={2.4} />
                </button>
                <div className="mobile-contact-note">
                  <span>Pan India Delivery • Custom Finishes</span>
                  <p>saitruepackers@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
