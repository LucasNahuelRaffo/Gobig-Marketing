import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import VturbPlayer from './VturbPlayer';
import gsap from 'gsap';
import './App.css';
import skyImg from './img/sky.png';

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

  return (
    <div className="hero-content" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'min(15px, 2vh)',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>

      {/* Title */}
      <div className="glass-panel panel-animate" style={{
        padding: 'min(15px, 2vh) 40px',
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
        <h1 className="hero-main-title" style={{ fontSize: isMobile ? '1.8rem' : 'clamp(1.7rem, 4.2vh, 2.7rem)', fontWeight: '900', lineHeight: '1.15', margin: '0 0 8px 0', letterSpacing: '-1.5px', color: 'white' }}>
          {t.title1} <span className="text-neon">{t.title2}</span> {t.title3} <br />
          {t.title4} <span className="text-neon">{t.title5}</span> {t.title6}
        </h1>
        <p className="hero-subtitle" style={{ fontSize: isMobile ? '0.85rem' : 'clamp(0.75rem, 1.6vh, 0.88rem)', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0, fontWeight: '400', maxWidth: '750px' }}>
          {t.description}
        </p>
      </div>

      {/* Video Panel outer shell (stays in layout always) */}
      <div
        className="glass-panel panel-animate"
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: 'min(920px, calc(50vh * 1.77))',
          boxSizing: 'border-box',
          opacity: 0,
          background: 'rgba(5, 10, 15, 0.55)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          margin: '0 auto',
          flexShrink: 0
        }}
      >
        {/* Inline slot — the player lives here when not expanded */}
        <div
          ref={inlineSlotRef}
          style={{ width: '100%', position: 'relative' }}
        >
          {/* Player wrapper — this is the DOM node we physically move */}
          <div ref={playerWrapperRef} style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '8px' }} />
          </div>
        </div>

        {/* AMPLIAR button */}
        {!isMobile && (
          <div
            onClick={() => setIsVideoExpanded(true)}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(218, 240, 19, 0.95)',
              color: 'black',
              borderRadius: '8px',
              padding: '6px 14px',
              cursor: 'pointer',
              zIndex: 10,
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
      <button
        onClick={() => window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank')}
        className="bg-neon panel-animate"
        style={{
          padding: '18px 55px',
          borderRadius: '12px',
          fontSize: '1.25rem',
          fontWeight: '900',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          opacity: 0,
          boxShadow: '0 10px 30px rgba(218, 240, 19, 0.35)',
          color: '#000',
          marginTop: '5px',
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
              width: '90vw',
              maxWidth: '1200px',
              background: '#000',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(0,0,0,0.95)',
            }}
          >
            {/* 16:9 aspect ratio shell */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
              {/* Modal slot — the player gets moved here */}
              <div
                ref={modalSlotRef}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
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

