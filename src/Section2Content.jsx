import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VturbPlayer from './VturbPlayer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section2Content({ t, vturbPlayerId }) {
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
            start: 'top 95%', // Starts almost as soon as it enters viewport
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
      justifyContent: 'flex-start', // Pulled up
      gap: '15px', // COMPRESSED: reduced from 40px
      width: '100%',
      maxWidth: '1000px',
      height: '100%',
      margin: '-50px auto 0', // PULLED UP: added -50px top margin
      padding: '0 20px', // COMPRESSED: removed top padding
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

      {/* Vturb Testimonials Video - Inline for Desktop, Button for Mobile */}
      {!isMobile ? (
        <div className="s2-anim glass-panel" style={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: '16px',
          padding: '12px',
          background: 'rgba(5, 10, 15, 0.4)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '12px' }} />
        </div>
      ) : (
        <button 
          onClick={() => setIsVideoModalOpen(true)}
          className="s2-anim glass-panel" 
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
            background: 'rgba(5, 10, 15, 0.4)'
          }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          {t.vsl || 'Watch Testimonials'}
        </button>
      )}

      {/* Bottom Text Panel */}
      <div className="glass-panel s2-anim" style={{
        padding: '20px 40px', // COMPRESSED: reduced from 30px
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
