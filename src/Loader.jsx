import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import loaderVideo from './videos/Pantalla_de_carga.mp4';
import logoImg from './img/Logo_Nuevo.png';
import loaderStrip from './img/img_pantalla_de_carga/image.png';

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
        // MOBILE ANIMATION: Cycle through the 4-stage sprite sheet
        // backgroundPositionX: 0% (1st logo), 33.3% (2nd), 66.6% (3rd), 100% (4th)
        const positions = ['0%', '33.33%', '66.66%', '100%'];
        
        // Initial reveal
        tl.to(logoBoxRef.current, { opacity: 1, duration: 0.5 });

        // Step through the sprites
        positions.forEach((pos, i) => {
          tl.to(logoBoxRef.current, {
            backgroundPositionX: pos,
            duration: 0.1, // Sudden change to next sprite
            ease: 'none'
          }, (i + 1) * 0.7); // Wait 0.7s between steps
        });

        // Final scale up
        tl.to(logoBoxRef.current, { scale: 1.1, duration: 0.5, ease: 'back.out(2)' });

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
            width: '180px', // Adjusted to match the square aspect ratio of the icons
            height: '180px',
            backgroundImage: `url(${loaderStrip})`,
            backgroundSize: '400% 100%',
            backgroundPosition: '0% 0%',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
            borderRadius: '40px',
            boxShadow: '0 0 60px rgba(255,255,255,0.05)',
            opacity: 0,
            transform: 'scale(1)'
          }}
        />
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
