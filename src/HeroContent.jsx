import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import VturbPlayer from './VturbPlayer';
import './App.css';
import skyImg from './img/sky.png';

export default function HeroContent({ t, vturbPlayerId }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="hero-content" style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap: '20px', // Space between columns
      width: '100%',
      maxWidth: '1200px', // WIDER: to allow longer panels as requested
      margin: '0 auto', // Reverted negative margin to let content sit lower
      padding: '0 20px',
      boxSizing: 'border-box'
    }}>

      {/* LEFT COLUMN: Title, Copy, Badges, CTA */}
      <div style={{ flex: '1 1 550px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* Box 1: Title and Description */}
        <div className="glass-panel panel-animate" style={{ 
          padding: '25px 40px', // SLIGHTLY TIGHTER: reduced from 30px
          width: '100%', 
          boxSizing: 'border-box', 
          opacity: 0, 
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1 
        }}>
          <h1 className="hero-main-title" style={{ fontSize: '2.15rem', fontWeight: '900', lineHeight: '1.2', margin: '0 0 20px 0', letterSpacing: '-1.5px', color: 'white' }}>
            {t.title1} <span className="text-neon">{t.title2}</span> {t.title3} <br />
            {t.title4} <span className="text-neon">{t.title5}</span> {t.title6}
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6', margin: 0, fontWeight: '400', maxWidth: '480px' }}>
            {t.description}
          </p>
        </div>

        {/* Box 2: Badges and CTA */}
        <div className="glass-panel panel-animate" style={{ 
          padding: '15px 40px', // TIGHTER VERTICALLY: to look "longer" (horizontal focus)
          width: '100%', 
          boxSizing: 'border-box', 
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {t.badges.map((text, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.03)',
                padding: '6px 14px', borderRadius: '100px',
                fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {text}
              </div>
            ))}
          </div>
          <button 
            onClick={() => window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank')}
            className="bg-neon" 
            style={{
              padding: '14px 32px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(218, 240, 19, 0.2)'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {t.cta}
          </button>

          <button 
            onClick={() => setIsVideoModalOpen(true)}
            className="mobile-only glass-panel" 
            style={{
              padding: '14px 32px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '800',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              cursor: 'pointer',
              display: 'none', /* handled by css, will be flex on mobile */
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              justifyContent: 'center'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            {t.vsl || 'Watch Video'}
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: VSL Embedding and Guarantees */}
      <div style={{ flex: '1 1 550px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* VSL Video Panel (Hidden on Mobile to let the Modal handle the video component) */}
        {!isMobile && (
          <div className="glass-panel panel-animate desktop-only" style={{ 
            padding: '12px', width: '100%', boxSizing: 'border-box', opacity: 0, background: 'rgba(5, 10, 15, 0.6)'
          }}>
            <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '12px' }} />
          </div>
        )}

        {/* Objectives and Guarantee */}
        <div className="glass-panel panel-animate" style={{ 
          padding: '12px 30px', // TIGHTENED: reduced from 24px
          width: '100%', 
          boxSizing: 'border-box', 
          textAlign: 'left', 
          opacity: 0, 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> {/* TIGHTENED: reduced from 16px */}

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(218, 240, 19, 0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <div>
                <strong className="text-neon" style={{ fontSize: '1rem', marginRight: '6px' }}>{t.objective}</strong>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.4' }}>{t.objectiveText}</span>
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', width: '100%' }} />

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(218, 240, 19, 0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <strong className="text-neon" style={{ fontSize: '1rem', marginRight: '6px' }}>{t.guarantee}</strong>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.4' }}>{t.guaranteeText}</span>
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', width: '100%' }} />

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(218, 240, 19, 0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <strong className="text-neon" style={{ fontSize: '1rem', marginRight: '6px' }}>{t.limited}</strong>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.4' }}>{t.limitedText}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* MOBILE VIDEO MODAL (Portaled to body to avoid GSAP transforms) */}
      {isVideoModalOpen && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          backgroundColor: '#000',
          zIndex: 99999, // Super high to clear particles
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
          boxSizing: 'border-box'
        }}>
          <div style={{ width: '100vw', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Injecting CSS to try to force object-fit over Vturb internals if possible, otherwise it takes up full screen gracefully */}
            <style>{`
              .vturb-reel-mode {
                width: 100vw !important;
                height: 100dvh !important;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .vturb-reel-mode > vturb-smartplayer {
                height: 100dvh !important;
                width: 100vw !important;
              }
            `}</style>
            <div className="vturb-reel-mode">
              <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '0' }} />
            </div>
          </div>

          <button 
            onClick={() => setIsVideoModalOpen(false)}
            style={{
              position: 'absolute',
              top: '25px',
              right: '20px',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              padding: '10px',
              zIndex: 2147483647,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>,
        document.body
      )}

    </div>
  );
}
