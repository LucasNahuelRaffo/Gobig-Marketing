import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VturbPlayer from './VturbPlayer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section2Content({ t, vturbPlayerId }) {
  const containerRef = useRef(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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
      gsap.fromTo('.s2-anim',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);


  return (
    <div ref={containerRef} className="responsive-section-margin" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '15px',
      width: '100%',
      maxWidth: '1000px',
      height: '100%',
      margin: '-20px auto 0',
      padding: '10px 20px 0',
      boxSizing: 'border-box'
    }}>

      {/* Badge */}
      <div className="glass-panel s2-anim" style={{
        padding: '12px 30px',
        borderRadius: '8px',
        background: 'rgba(5, 10, 15, 0.4)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: '700',
          letterSpacing: '3px',
          color: 'white',
          textTransform: 'uppercase'
        }}>
          {t.badge}
        </h3>
      </div>

      {/* Vturb Testimonials Video Container */}
      <div
        className="s2-anim glass-panel"
        style={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: '16px',
          padding: isMobile ? '8px' : '12px',
          background: 'rgba(5, 10, 15, 0.4)',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div ref={inlineSlotRef} style={{ width: '100%', position: 'relative' }}>
          <div ref={playerWrapperRef} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '12px' }} />
          </div>
        </div>

        {/* Expand Trigger Button (Mobile only) */}
        {!isVideoExpanded && isMobile && (
          <div 
            onClick={() => setIsVideoExpanded(true)}
            style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              background: 'rgba(218, 240, 19, 0.95)',
              color: '#000',
              padding: '8px 16px',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 4px 15px rgba(218, 240, 19, 0.4)',
              letterSpacing: '0.5px'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            AMPLIAR
          </div>
        )}
      </div>

      {/* MODAL PORTAL */}
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
          {/* Modal box (Reel-style vertical) */}
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
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: isMobile ? '100%' : 'auto',
              paddingBottom: isMobile ? '0' : '56.25%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
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
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>,
        document.body
      )}

      {/* Bottom Text Panel */}
      <div className="glass-panel s2-anim" style={{
        padding: '20px 40px',
        borderRadius: '12px',
        textAlign: 'center',
        background: 'rgba(5, 10, 15, 0.4)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <p style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: 'white',
          margin: '0 0 10px 0',
          lineHeight: '1.6'
        }}>
          {t.text1}
        </p>
        <p style={{
          fontSize: '0.9rem',
          fontWeight: '400',
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          lineHeight: '1.6'
        }}>
          {t.text2}
        </p>
      </div>


    </div>
  );
}
