import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar-container glass-panel" style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // mathematically center the links in the middle of the screen
      padding: '0',
      height: '90px', // Expandimos el Navbar para dar aire
      width: '100%',
      boxSizing: 'border-box',
      opacity: 0, // For GSAP initial state
      borderRadius: '0', // Overrides glass-panel rounded corners for full-width navbar
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
    }}>
      {/* Decorative Trapezoid Line logically centered */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: '15px', height: '60px', display: 'flex', pointerEvents: 'none' }}>
        {/* Left Line */}
        <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.15)' }} />

        {/* Center Trapezoid Tab */}
        <div style={{ position: 'relative', width: '800px', height: '100%' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(255,255,255,0.15)',
            borderBottom: 'none',
            borderRadius: '12px 12px 0 0',
            transform: 'perspective(60px) rotateX(10deg)',
            transformOrigin: 'bottom',
            background: 'rgba(255,255,255,0.02)'
          }} />
        </div>

        {/* Right Line */}
        <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.15)' }} />
      </div>

      {/* 1. Left: Logo (Anchored absolutely to the left) */}
      <div className="nav-logo text-neon" style={{ position: 'absolute', left: '5%', fontWeight: '900', letterSpacing: '0.25em', fontSize: '1.4rem', transform: 'translateY(6px)', marginBottom: '10px' }}>
        GOBIG
      </div>

      {/* 2. Center: Links (Mathematically centered above the geometric tab) */}
      <div className="nav-links" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        color: 'rgba(255,255,255,0.85)',
        fontSize: '0.95rem',
        fontWeight: '500',
        transform: 'translateY(8px)', // Empujamos los textos ABAJO para alejarlos drásticamente de la línea superior
        position: 'relative',
        width: '800px' // Limita la caja para asegurar alineación perfecta con la geometría
      }}>
        <a href="#home" className="nav-item">Home</a>
        <a href="#service" className="nav-item">Service</a>
        <a href="#testimonial" className="nav-item">Testimonials</a>
        <a href="#contact" className="nav-item">Contact</a>
      </div>

      {/* 3. Right: CTA Button (Anchored absolutely to the right) */}
      <div style={{ position: 'absolute', right: '5%', transform: 'translateY(6px)' }}>
        <button className="bg-neon" style={{
          padding: '12px 26px',
          borderRadius: '8px',
          marginBottom: '10px',
          fontSize: '0.95rem',
          fontWeight: '700',
          color: '#050a0a',
          border: 'none',
          cursor: 'pointer',
        }}>
          Agendar Llamada
        </button>
      </div>
    </nav>
  );
}
