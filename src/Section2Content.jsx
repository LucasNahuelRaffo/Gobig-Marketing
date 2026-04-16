import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VturbPlayer from './VturbPlayer';
import './App.css';

// Utility function to get WebP image with fallback
const getWebpImage = (path) => {
  // In a real implementation, this would check for WebP support
  // For now, we'll return the WebP path
  const webpPath = path.replace(/\.(png|jpe?g)$/i, '.webp');
  return {
    src: webpPath,
    srcSet: `${webpPath} 1x`,
    type: 'image/webp'
  };
};

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
      height: 'auto', // Fix: Changed from 100% to auto to allow page scroll
      margin: '-20px auto 0',
      padding: '10px 20px 0',
      position: 'relative'
    }}>

      {/* Title Badge (Marker 1) */}
      <div className="glass-panel s2-anim" style={{
        padding: '14px 40px',
        borderRadius: '12px',
        background: 'rgba(5, 10, 15, 0.65)',
        border: '1px solid rgba(255,255,255,0.12)',
        width: '100%',
        maxWidth: '750px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          fontWeight: '900',
          color: 'white',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: '1.2'
        }}>
          {t.title}
          <span className="text-neon">{t.titleAccent}</span>
        </h3>
      </div>

      {/* Vturb Testimonials Video Container */}
      {vturbPlayerId && (
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
            <div 
              ref={playerWrapperRef} 
              style={{ 
                width: '100%', 
                borderRadius: '12px', 
                overflow: 'hidden',
                aspectRatio: '16/9',
                background: '#000'
              }}
            >
              <VturbPlayer key={vturbPlayerId} playerId={vturbPlayerId} style={{ borderRadius: '12px', height: '100%' }} />
            </div>
          </div>

          {/* Expand Trigger Button */}
          {!isVideoExpanded && (
            <div 
              onClick={() => setIsVideoExpanded(true)}
              style={{
                position: 'absolute',
                top: '10px',
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
                zIndex: 20,
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
      )}

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

      {/* Bottom Text Panel (Marker 2) */}
      <div className="glass-panel s2-anim" style={{
        padding: isMobile ? '20px 24px' : '28px 48px',
        borderRadius: '16px',
        textAlign: 'center',
        background: 'rgba(5, 10, 15, 0.4)',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid rgba(255,255,255,0.07)'
      }}>
        <h3 style={{
          fontSize: isMobile ? '1rem' : '1.25rem',
          fontWeight: '800',
          color: 'white',
          margin: '0 0 22px 0',
          lineHeight: '1.4'
        }}>
          {t.footerHeading}
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          {t.footerItems.map((item, idx) => {
            // For the last item, split at "TODO" (ES) or "EVERYTHING" (EN)
            const splitKeywords = ['TODO', 'EVERYTHING'];
            const keyword = splitKeywords.find(k => item.includes(k));

            if (keyword) {
              const splitIdx = item.indexOf(keyword) + keyword.length;
              const before = item.slice(0, splitIdx);
              const after = item.slice(splitIdx);
              return (
                <p key={idx} style={{
                  margin: 0,
                  fontSize: isMobile ? '0.88rem' : '0.95rem',
                  fontWeight: '400',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: '1.6',
                }}>
                  <span className="text-neon" style={{ fontWeight: '700' }}>{before}</span>
                  {after}
                </p>
              );
            }

            return (
              <p key={idx} style={{
                margin: 0,
                fontSize: isMobile ? '0.88rem' : '0.95rem',
                fontWeight: idx === 0 ? '600' : '400',
                color: idx === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.75)',
                lineHeight: '1.6',
              }}>
                {item}
              </p>
            );
          })}
        </div>
      </div>


    </div>
  );
}
