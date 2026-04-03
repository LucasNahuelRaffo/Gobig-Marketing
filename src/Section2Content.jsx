import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VturbPlayer from './VturbPlayer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section2Content({ t, vturbPlayerId }) {
  const containerRef = useRef(null);

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

      {/* Vturb Testimonials Video */}
      <div
        className="s2-anim glass-panel"
        style={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: '16px',
          padding: '12px',
          background: 'rgba(5, 10, 15, 0.4)',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <VturbPlayer playerId={vturbPlayerId} style={{ borderRadius: '12px' }} />
      </div>

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
