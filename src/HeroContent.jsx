import React, { useState } from 'react';
import './App.css';
import skyImg from './img/sky.png';

export default function HeroContent() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="hero-content" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      width: '100%',
      maxWidth: '850px',
      margin: '0 auto',
      padding: '10px 20px',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>

      {/* Box 1: Title and Description */}
      <div className="glass-panel panel-animate" style={{ padding: '24px 40px', width: '100%', boxSizing: 'border-box', opacity: 0 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1.2', margin: '0 0 12px 0', letterSpacing: '-1px', color: 'white' }}>
          Obtén <span className="text-neon">+30 Agendas</span> Calificadas en tu Clínica <br />
          Con menos de <span className="text-neon">$1000USD</span> en publicidad de Meta
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0, fontWeight: '300' }}>
          Te guiamos personalmente 1 a 1 durante todo el proceso, para comprar tu tiempo de vuelta, desde la selección de mercado, negociación, financiamiento, y administrar cada dólar en anuncios, todo hasta que adquieras 30 agendas. Sin importar si eres doctor o clínica, sin redes, sin quirófano y sin necesidad de viajar.
        </p>
      </div>

      {/* Box 2: Badges and CTA */}
      <div className="glass-panel panel-animate" style={{ padding: '20px 30px', width: '100%', boxSizing: 'border-box', opacity: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {['Sin quirófano', 'Guía personalizada 1 a 1', 'Sin redes sociales', 'Sin necesidad de viajar'].map((text, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.03)',
              padding: '6px 14px', borderRadius: '100px',
              fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="bg-neon" style={{
            padding: '10px 24px',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Agendar Llamada Gratis
          </button>
          
          <button onClick={() => setIsVideoOpen(true)} className="glass-panel" style={{
            padding: '10px 24px',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: '700',
            border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white',
            background: 'rgba(255,255,255,0.05)',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease, background 0.3s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Mirar VSL
          </button>
        </div>
      </div>

      {/* Full-screen Video Modal */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVideoOpen ? 1 : 0,
        pointerEvents: isVideoOpen ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{
          position: 'relative',
          width: '90%',
          maxWidth: '1000px',
          aspectRatio: '16/9',
          background: '#050a0a',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(218, 240, 19, 0.1)',
          border: '1px solid rgba(255,255,255,0.1)',
          transform: isVideoOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <button 
            onClick={() => setIsVideoOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Video Placeholder */}
          {isVideoOpen && (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', letterSpacing: '2px' }}>[ AQUÍ VA EL EMBED DEL VSL ]</span>
             </div>
          )}
        </div>
      </div>

      {/* Box 4: Objectives and Guarantee */}
      <div className="glass-panel panel-animate" style={{ padding: '20px 30px', width: '100%', boxSizing: 'border-box', textAlign: 'left', opacity: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(218, 240, 19, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>
            <div>
              <strong className="text-neon" style={{ fontSize: '1.05rem', marginRight: '6px' }}>Objetivo:</strong>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.4' }}>Conseguir +30 agendas calificadas para tu clínica con publicidad en Meta optimizada al máximo.</span>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', width: '100%' }} />

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(218, 240, 19, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div>
              <strong className="text-neon" style={{ fontSize: '1.05rem', marginRight: '6px' }}>Garantía:</strong>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.4' }}>Acompañamiento 1 a 1 hasta lograr el objetivo. Si no lo alcanzas, seguimos trabajando contigo sin costo adicional.</span>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', width: '100%' }} />

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(218, 240, 19, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div>
              <strong className="text-neon" style={{ fontSize: '1.05rem', marginRight: '6px' }}>Cupos Limitados:</strong>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.4' }}>Debido a que solo trabajamos con 4 empresas al mes.</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
