import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import VturbPlayer from './VturbPlayer';
import gsap from 'gsap';
import './App.css';
import skyImg from './img/sky.webp';

export default function HeroContent({ t, vturbPlayerId }) {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Ref for the inline slot that holds the player when collapsed
  const inlineSlotRef = useRef(null);
  // Ref for the modal slot that holds the player when expanded
  const modalSlotRef = useRef(null);
  // Ref for the actual player wrapper div (the one we physically move)
  const playerWrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock/unlock body scroll
  useEffect(() => {
    document.body.style.overflow = isVideoExpanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isVideoExpanded]);

  // Move player DOM node between inline slot and modal slot
  useEffect(() => {
    const playerEl = playerWrapperRef.current;
    if (!playerEl) return;

    if (isVideoExpanded && modalSlotRef.current) {
      // Move player into modal
      modalSlotRef.current.appendChild(playerEl);
      playerEl.style.width = '100%';
      playerEl.style.height = '100%';
      playerEl.style.borderRadius = '0';
    } else if (!isVideoExpanded && inlineSlotRef.current) {
      // Move player back to inline slot
      inlineSlotRef.current.appendChild(playerEl);
      playerEl.style.width = '100%';
      playerEl.style.height = '';
      playerEl.style.borderRadius = '8px';
    }
  }, [isVideoExpanded]);

  const closeModal = useCallback(() => setIsVideoExpanded(false), []);

  const [isBadgeHovered, setIsBadgeHovered] = useState(false);
  
  return (
    <div className="hero-content" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'min(10px, 1.2vh)',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>

      {/* Title */}
      <div className="glass-panel panel-animate" style={{
        padding: isMobile ? '12px 20px' : 'min(15px, 2vh) 40px',
        minHeight: isMobile ? 'auto' : '143px',
        width: '100%',
        maxWidth: '920px',
        flexShrink: 0,
        boxSizing: 'border-box',
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(5, 10, 15, 0.5)',
      }}>
        <h1 className="hero-main-title" style={{
          fontSize: isMobile ? '1.3rem' : 'clamp(1.7rem, 4.2vh, 2.7rem)',
          fontWeight: '900',
          lineHeight: '1.25',
          margin: '0 0 8px 0',
          letterSpacing: '-0.5px',
          color: 'white'
        }}>
          {t.title1} <span className="text-neon">{t.title2}</span> {isMobile && <br />}
          {t.title3} {isMobile && <br />}
          {t.title4} <span className="text-neon">{t.title5}</span> {isMobile && <br />}
          {t.title6}
        </h1>
        <p className="hero-subtitle" style={{ fontSize: isMobile ? '0.85rem' : 'clamp(0.75rem, 1.6vh, 0.88rem)', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0, fontWeight: '400', maxWidth: '750px' }}>
          {t.description}
        </p>
      </div>

      {/* Video Panel outer shell (stays in layout always) */}
      <div
        className="glass-panel panel-animate"
        style={{
          padding: '0', // Removed padding to allow banner to touch edges
          width: '100%', // Reverted to 100% for proper mobile centering
          maxWidth: '820px', // Restored to 920px
          boxSizing: 'border-box',
          opacity: 0,
          background: 'rgba(5, 10, 15, 0.55)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          margin: '0 auto',
          flexShrink: 0,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* VSL Instructions Banner - Now integrated at the top of the video */}
        <div
          style={{
            width: '100%',
            minHeight: isMobile ? 'auto' : '40px',
            background: 'rgba(218, 240, 19, 0.9)', // Using brand neon for the header like the blue in reference
            padding: isMobile ? '8px 15px' : '10px 25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'black', // Black text on neon background for visibility
            boxSizing: 'border-box',
            lineHeight: '1.2',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: isMobile ? '0.75rem' : '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <svg width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontWeight: '900' }}>{t.bannerStep}</span>
            <span style={{ fontWeight: '600' }}>
              {t.bannerWatch1}
              <span style={{ fontWeight: '900' }}>{t.bannerWatch2}</span>
              {t.bannerWatch3}
            </span>
          </div>
        </div>

        {/* Inline slot — the player lives here when not expanded */}
        <div
          ref={inlineSlotRef}
          style={{
            width: '100%',
            position: 'relative',
            padding: '8px', // Reverted to original padding
            boxSizing: 'border-box'
          }}
        >
          {/* Player wrapper — this is the DOM node we physically move */}
          <div
            ref={playerWrapperRef}
            style={{
              width: '100%',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '16/9',
              background: '#000'
            }}
          >
            <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '8px', height: '100%' }} />
          </div>
        </div>

        {/* AMPLIAR button */}
        {!isVideoExpanded && (
          <div
            onClick={() => setIsVideoExpanded(true)}
            style={{
              position: 'absolute',
              top: isMobile ? '55px' : '40px', // Subido 5px más
              right: '14px',
              background: 'rgba(218, 240, 19, 0.95)',
              color: 'black',
              borderRadius: '8px',
              padding: '6px 14px',
              cursor: 'pointer',
              zIndex: 20,
              fontSize: '11px',
              fontWeight: '900',
              display: 'flex',
              alignItems: 'center',
              textTransform: 'uppercase',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(218, 240, 19, 0.4)',
              userSelect: 'none'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            {t.expand || 'AMPLIAR'}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="panel-animate" style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={() => window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank')}
          className="bg-neon"
          style={{
            padding: '12px 55px',
            borderRadius: '12px',
            fontSize: '1.25rem',
            fontWeight: '900',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            opacity: 1,
            zIndex: 20,
            boxShadow: '0 10px 30px rgba(218, 240, 19, 0.35)',
            color: '#000',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(218, 240, 19, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(218, 240, 19, 0.35)';
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {t.cta}
        </button>

        {/* Social Proof / Trust Section */}
        <div 
          onMouseEnter={() => setIsBadgeHovered(true)}
          onMouseLeave={() => setIsBadgeHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            background: isBadgeHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
            padding: '14px 28px',
            borderRadius: '100px',
            border: '1px solid',
            borderColor: isBadgeHovered ? 'rgba(218, 240, 19, 0.35)' : 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px)',
            boxShadow: isBadgeHovered 
              ? '0 12px 40px rgba(0,0,0,0.4), 0 0 15px rgba(218, 240, 19, 0.1)' 
              : '0 8px 30px rgba(0,0,0,0.3)',
            marginTop: '10px',
            cursor: 'pointer',
            transform: isBadgeHovered ? 'scale(1.04) translateY(-3px)' : 'scale(1) translateY(0)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {/* Avatar stack */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[
              { src: '/img/testimonials/image4.png', pos: '96% center' },
              { src: '/img/testimonials/image1.png', pos: 'center 20%' },
              { src: '/img/testimonials/image2.jpg', pos: '20% center' }
            ].map((img, i) => (
              <div key={i} style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '2px solid #050a0a',
                marginLeft: i === 0 ? '0' : '-16px',
                overflow: 'hidden',
                background: '#111',
                zIndex: 3 - i,
                boxShadow: '4px 0 10px rgba(0,0,0,0.3)'
              }}>
                <img 
                  src={img.src} 
                  alt="Client" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: img.pos,
                    imageRendering: '-webkit-optimize-contrast',
                    backfaceVisibility: 'hidden'
                  }} 
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {[1, 2, 3, 4, 5].map(s => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#DAF013">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span style={{ color: 'white', fontSize: '0.98rem', fontWeight: '900', marginLeft: '6px' }}>4.9/5</span>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', fontWeight: '500' }}>
              <span style={{ color: 'white', fontWeight: '800' }}>+200 profesionales</span> ya confían en nosotros
            </p>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL — portal to body, player node is moved here when open */}
      {isVideoExpanded && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={closeModal}
        >
          {/* Modal box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: isMobile ? '88vw' : '90vw',
              height: isMobile ? '75vh' : 'auto',
              maxWidth: '1200px',
              background: '#0a0f19',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Aspect ratio shell or Full Height Container for Reel feel */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: isMobile ? '100%' : 'auto',
              paddingBottom: isMobile ? '0' : '56.25%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Modal slot — the player gets moved here */}
              <div
                ref={modalSlotRef}
                style={{
                  position: isMobile ? 'relative' : 'absolute',
                  inset: 0,
                  width: '100%',
                  height: isMobile ? 'auto' : '100%',
                  aspectRatio: isMobile ? '16/9' : 'unset'
                }}
              />
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'rgba(30, 30, 30, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000000,
              transition: 'transform 0.3s ease, background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
              e.currentTarget.style.background = 'rgba(60, 60, 60, 0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.background = 'rgba(30, 30, 30, 0.9)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

