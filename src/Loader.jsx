import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import loaderVideo from './videos/Pantalla_de_carga.mp4';
import logoImg from './img/Logo_Nuevo.png';

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
        // MOBILE PULSING ANIMATION: 4 stages of increasing clarity
        const stages = [
          { blur: 15, scale: 0.8, opacity: 0.2 },
          { blur: 8, scale: 0.95, opacity: 0.5 },
          { blur: 3, scale: 1.1, opacity: 0.8 },
          { blur: 0, scale: 1.0, opacity: 1.0 }
        ];

        // Animate through pulses
        stages.forEach((s, i) => {
          // Surge pulse
          tl.to(logoBoxRef.current, {
            filter: `blur(${s.blur}px)`,
            scale: s.scale,
            opacity: s.opacity,
            duration: 0.6,
            ease: 'power2.out'
          }, i * 0.8);
          
          // Slight settle/pulsation feel
          if (i < stages.length - 1) {
            tl.to(logoBoxRef.current, {
              scale: s.scale * 0.98,
              duration: 0.2,
              ease: 'sine.inOut'
            }, (i * 0.8) + 0.6);
          }
        });

        // Add a small pause at the end to appreciate the sharp logo
        tl.to({}, { duration: 0.7 });
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
            width: '180px',
            height: '180px',
            backgroundColor: '#000000', // Black box as requested
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(255,255,255,0.05)',
            opacity: 0,
            transform: 'scale(0.8)',
            filter: 'blur(20px)'
          }}
        >
          <img 
            src={logoImg} 
            alt="Logo" 
            style={{ 
              width: '120px',
              height: 'auto',
              display: 'block'
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
