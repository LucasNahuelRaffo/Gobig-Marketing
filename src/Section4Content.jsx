import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VturbPlayer from './VturbPlayer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section4Content({ t, vturbPlayerId }) {
  const containerRef = useRef(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>,
    <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
  ];

  return (
    <div ref={containerRef} className="custom-scrollbar responsive-section-margin" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: '750px',
      height: '100%',
      margin: '-90px auto 0', // PULLED UP: adjusted to exactly match the red line
      padding: '10px 20px 10px', // Tightened space
      boxSizing: 'border-box',
      gap: '8px', // Tighter
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>

      {/* Section Title */}
      <div className="s4-anim glass-panel" style={{ 
        textAlign: 'center', 
        marginBottom: '6px', // compressed
        padding: '12px 24px', // compressed
        borderRadius: '12px',
        background: 'rgba(5, 10, 15, 0.5)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <h2 style={{
          fontSize: '1.6rem', // compressed slightly
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

      {/* Vturb FAQs Video - Inline for Desktop, Button for Mobile */}
      {!isMobile ? (
        <div className="glass-panel s4-anim" style={{
          width: '100%',
          maxWidth: '640px',
          borderRadius: '16px',
          padding: '12px',
          background: 'rgba(5, 10, 15, 0.5)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
        }}>
          <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '12px' }} />
        </div>
      ) : (
        <button 
          onClick={() => setIsVideoModalOpen(true)}
          className="s4-anim glass-panel" 
          style={{
            padding: '14px 32px',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '800',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            justifyContent: 'center',
            background: 'rgba(5, 10, 15, 0.5)'
          }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          {t.vsl || 'Watch FAQs'}
        </button>
      )}

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
        maxWidth: '640px',
        padding: '16px 20px', // compressed padding
        borderRadius: '16px',
        background: 'rgba(10, 15, 25, 0.4)',
        border: '1px solid rgba(255,255,255,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px' // compressed list gap
      }}>
        {t.features.map((featureText, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}>
            {/* Icon Container with subtle glow */}
            <div style={{
              minWidth: '26px', // compressed icon box
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
            <div className="vturb-reel-mode" style={{ width: '100vw', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
