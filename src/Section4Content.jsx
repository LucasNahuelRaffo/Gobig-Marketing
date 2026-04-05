import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VturbPlayer from './VturbPlayer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section4Content({ t, vturbPlayerId }) {
  const containerRef = useRef(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const playerContainerRef = useRef(null);
  const inlineSlotRef = useRef(null);
  const modalSlotRef = useRef(null);
  const playerWrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Move player DOM node between inline slot and modal slot
  useEffect(() => {
    const playerEl = playerWrapperRef.current;
    if (!playerEl) return;

    if (isVideoExpanded && modalSlotRef.current) {
      modalSlotRef.current.appendChild(playerEl);
      playerEl.style.width = '100%';
      playerEl.style.height = '100%';
      playerEl.style.borderRadius = '0';
    } else if (!isVideoExpanded && inlineSlotRef.current) {
      inlineSlotRef.current.appendChild(playerEl);
      playerEl.style.width = '100%';
      playerEl.style.height = '';
      playerEl.style.borderRadius = '12px';
    }
  }, [isVideoExpanded]);

  useEffect(() => {
    document.body.style.overflow = isVideoExpanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isVideoExpanded]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.s4-anim',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const PlayButton = ({ size }) => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      border: '2px solid #DAF013',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <div style={{
        width: 0, height: 0,
        borderTop: `${size * 0.18}px solid transparent`,
        borderBottom: `${size * 0.18}px solid transparent`,
        borderLeft: `${size * 0.3}px solid #DAF013`,
        marginLeft: `${size * 0.08}px`
      }} />
    </div>
  );

  const icons = [
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
  ];

  return (
    <div ref={containerRef} className="custom-scrollbar responsive-section-margin" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: '750px',
      height: 'auto', // Fix: Changed from 100% to auto to allow page scroll
      margin: isMobile ? '-30px auto 0' : '-90px auto 0',
      padding: isMobile ? '20px 16px 80px' : '40px 20px 90px',
      gap: '12px',
      zIndex: 1,
      position: 'relative'
    }}>

      {/* Section Title */}
      <div className="s4-anim glass-panel" style={{
        textAlign: 'center',
        marginBottom: '6px',
        padding: '12px 24px',
        borderRadius: '12px',
        background: 'rgba(5, 10, 15, 0.5)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <h2 style={{
          fontSize: isMobile ? '1.3rem' : '1.6rem',
          fontWeight: '800',
          color: 'white',
          margin: '0 0 4px 0',
          letterSpacing: '-0.5px',
          textTransform: 'uppercase'
        }}>
          {t.title}
        </h2>
        <p style={{
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          fontWeight: '400'
        }}>
          {t.subtitle}
        </p>
      </div>

      {/* Vturb FAQs Video - Inline with Expand Trigger */}
      <div
        ref={playerContainerRef}
        className="glass-panel s4-anim"
        style={{
          width: '100%',
          maxWidth: '640px',
          borderRadius: '16px',
          padding: isMobile ? '8px' : '12px',
          background: 'rgba(5, 10, 15, 0.5)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div ref={inlineSlotRef} style={{ width: '100%', position: 'relative' }}>
          <div ref={playerWrapperRef} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '12px' }} />
          </div>
        </div>

        {/* Expand Trigger Button */}
        {!isVideoExpanded && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoExpanded(true);
            }}
            style={{
              position: 'absolute',
              top: isMobile ? '15px' : '25px',
              right: isMobile ? '15px' : '25px',
              background: 'rgba(218, 240, 19, 0.95)',
              color: 'black',
              borderRadius: '8px',
              padding: isMobile ? '6px 12px' : '10px 16px',
              fontSize: isMobile ? '0.7rem' : '0.8rem',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
              e.currentTarget.style.background = '#DAF013';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.background = 'rgba(218, 240, 19, 0.95)';
            }}
          >
            <svg width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            {isMobile ? 'AMPLIAR' : 'AMPLIAR RESULTADOS'}
          </div>
        )}
      </div>

      {/* Decorative center line */}
      <div className="s4-anim" style={{
        width: '100%',
        maxWidth: '560px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(218, 240, 19, 0.5), transparent)',
        margin: '4px 0'
      }}></div>

      {/* Modern Features List */}
      <div className="s4-anim glass-panel" style={{
        width: '100%',
        maxWidth: '600px',
        height: 'auto',
        padding: isMobile ? '16px 15px' : '20px 25px',
        borderRadius: '16px',
        background: 'rgba(10, 15, 25, 0.4)',
        border: '1px solid rgba(255,255,255,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: isMobile ? '60px' : '105px'
      }}>
        {t.features.map((featureText, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Icon Container with subtle glow */}
            <div style={{
              minWidth: '26px',
              height: '26px',
              borderRadius: '8px',
              background: 'rgba(218, 240, 19, 0.05)',
              border: '1px solid rgba(218, 240, 19, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(218, 240, 19, 0.1)'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icons[idx]}
              </svg>
            </div>

            <span style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.85rem',
              fontWeight: '500',
              lineHeight: '1.2'
            }}>
              {featureText}
            </span>
          </div>
        ))}
      </div>

      {/* BACKDROP + CLOSE BUTTON when expanded */}
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
          onClick={() => setIsVideoExpanded(false)}
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

          <button
            onClick={() => setIsVideoExpanded(false)}
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
