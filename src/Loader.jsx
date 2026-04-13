import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import loaderVideo from './videos/Pantalla_de_carga.mp4';
import logoImg from './img/logo_Gobig.png';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const logoBoxRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Force play on mount to ensure it starts on mobile (if video is used)
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay was prevented:", err);
      });
    }

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    // Safety fallback: always unblock page after 8s max, even if GSAP fails
    const safetyTimeout = setTimeout(() => {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 8000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimeout);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      if (isMobile && logoBoxRef.current) {
        // MOBILE ANIMATION: 4-stage progression
        const states = [
          { bg: '#efecf4', scale: 0.9, opacity: 0.4 },
          { bg: '#dcd6e2', scale: 0.95, opacity: 0.7 },
          { bg: '#a696b5', scale: 1.0, opacity: 0.9 },
          { bg: '#4b2e58', scale: 1.05, opacity: 1.0 }
        ];

        // Animate through states
        states.forEach((state, i) => {
          tl.to(logoBoxRef.current, {
            backgroundColor: state.bg,
            scale: state.scale,
            opacity: state.opacity,
            duration: 0.6,
            ease: 'power2.inOut'
          }, i * 0.6);
        });

        // Add a small pause at the end
        tl.to({}, { duration: 0.5 });
      } else {
        // DESKTOP ANIMATION: Fixed wait for video
        tl.to({}, { duration: 3.5 });
      }

      // SHARED EXIT: Slide the entire loader up and fade out
      tl.to(containerRef.current, { 
        yPercent: -100, 
        opacity: 0,
        duration: 1.2, 
        ease: 'power4.inOut' 
      });

    }, containerRef);

    return () => {
      clearTimeout(safetyTimeout);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete, isMobile]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform, opacity'
      }}
    >
      {isMobile ? (
        <div 
          ref={logoBoxRef}
          style={{
            width: '140px',
            height: '140px',
            backgroundColor: '#efecf4',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            opacity: 0
          }}
        >
          <img 
            src={logoImg} 
            alt="Logo" 
            style={{ 
              width: '90px',
              height: 'auto',
              // Simple logic to invert logo color when background gets too dark
              // Or keep it as is if it's the official branding
            }} 
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            transform: 'scale(1)',
            transformOrigin: 'center center'
          }}
        >
          <source src={loaderVideo} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
