import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import loaderVideo from './videos/Pantalla_de_carga.mp4';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Safety fallback: always unblock page after 8s max, even if GSAP fails
    const safetyTimeout = setTimeout(() => {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 8000);

    const ctx = gsap.context(() => {
      // The video is handled by React, we only need to time the exit

      // Exit animations sequence
      const tl = gsap.timeline({
        delay: 2.5,
        onComplete: () => {
          clearTimeout(safetyTimeout);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      // Slide the entire loader up
      tl.to(containerRef.current, { 
        yPercent: -100, 
        duration: 1.2, 
        ease: 'power4.inOut' 
      });

    }, containerRef);

    return () => {
      clearTimeout(safetyTimeout);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

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
        willChange: 'transform'
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src={loaderVideo} type="video/mp4" />
      </video>
    </div>
  );
}
