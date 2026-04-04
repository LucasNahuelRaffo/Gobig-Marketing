import React, { useState, useEffect } from 'react';
import logoImg from './img/logo_Gobig.png';

export default function Navbar({ lang, setLang, t }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if scrolling up or at the very top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Hide navbar if scrolling down and past the top
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset by navbar height (65px) to prevent overlap
      const offsetPos = element.getBoundingClientRect().top + window.scrollY - 65;
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth'
      });
    }
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const LanguageSwitcher = () => (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="glass-panel"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        color: 'white',
        fontSize: '0.8rem',
        fontWeight: '600'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
    >
      <img 
        src={lang === 'es' ? "https://flagcdn.com/w40/es.png" : "https://flagcdn.com/w40/us.png"} 
        alt={lang === 'es' ? 'Spanish' : 'English'}
        style={{ width: '20px', borderRadius: '2px' }}
      />
      {lang.toUpperCase()}
    </button>
  );

  return (
    <>
      <nav className="navbar-container glass-panel" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '0 20px', // slight horizontal padding, no vertical
        height: '65px', // SLIMMED DOWN: reduced from 90px
        width: '100%',
        boxSizing: 'border-box',
        opacity: 0, // For initial GSAP
        borderRadius: '0',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        zIndex: 1000,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}>

        {/* 1. Left: Logo (Anchored absolutely to the left) */}
        <div className="nav-logo" style={{ position: 'absolute', left: '5%', zIndex: 1002 }}>
          <img src={logoImg} alt="GOBIG" style={{ height: '50px', width: 'auto', display: 'block' }} />
        </div>

        {/* 2. Center: Links (Mathematically centered above the geometric tab) - DESKTOP ONLY */}
        <div className="nav-links desktop-only" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '0.9rem',
          fontWeight: '500',
          position: 'relative',
          width: 'auto' // Allow organic width
        }}>
          <a href="#sky" onClick={(e) => scrollToSection(e, 'sky')} className="nav-item">{t.home}</a>
          <a href="#roots" onClick={(e) => scrollToSection(e, 'roots')} className="nav-item">{t.service}</a>
          <a href="#canopy" onClick={(e) => scrollToSection(e, 'canopy')} className="nav-item">{t.testimonial}</a>
          <a href="#fossils" onClick={(e) => scrollToSection(e, 'fossils')} className="nav-item">{t.contact}</a>
        </div>

        {/* 3. Right: CTA Button + Language Toggle - DESKTOP ONLY */}
        <div className="desktop-only" style={{ 
          position: 'absolute', 
          right: '5%', 
          display: 'flex',
          alignItems: 'center',
          gap: '12px' 
        }}>
          <button 
            onClick={() => window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank')}
            className="bg-neon" 
            style={{
              padding: '10px 22px', // slimmed standard CTA
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '700',
              color: '#050a0a',
              border: 'none',
              cursor: 'pointer',
            }}>
            {t.cta}
          </button>
          <LanguageSwitcher />
        </div>

        {/* 4. Right: Language + Hamburger - MOBILE ONLY */}
        <div className="mobile-only" style={{
          position: 'absolute', 
          right: '5%', 
          display: 'none', /* handled by css */
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{ zIndex: 1002 }}>
            <LanguageSwitcher />
          </div>
          <button className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#sky" className="nav-item" style={{ fontSize: '1.5rem', color: 'white' }} onClick={(e) => scrollToSection(e, 'sky')}>{t.home}</a>
        <a href="#roots" className="nav-item" style={{ fontSize: '1.5rem', color: 'white' }} onClick={(e) => scrollToSection(e, 'roots')}>{t.service}</a>
        <a href="#canopy" className="nav-item" style={{ fontSize: '1.5rem', color: 'white' }} onClick={(e) => scrollToSection(e, 'canopy')}>{t.testimonial}</a>
        <a href="#fossils" className="nav-item" style={{ fontSize: '1.5rem', color: 'white' }} onClick={(e) => scrollToSection(e, 'fossils')}>{t.contact}</a>
        
        <button 
          onClick={() => {
            window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank');
            toggleMobileMenu();
          }}
          className="bg-neon" 
          style={{
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '1.2rem',
            fontWeight: '800',
            marginTop: '20px',
            color: '#050a0a',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(218, 240, 19, 0.2)'
          }}>
          {t.cta}
        </button>
      </div>
    </>
  );
}
