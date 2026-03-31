import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Animate letters in sequence
      const chars = textRef.current.querySelectorAll('.loader-char');
      gsap.fromTo(chars, 
        { opacity: 0, filter: 'blur(10px)' }, 
        { opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.25, ease: 'power2.out' }
      );

      // Animate progress text
      const obj = { p: 0 };
      gsap.to(obj, {
        p: 100,
        duration: 2.2,
        ease: 'power3.inOut',
        onUpdate: () => setProgress(Math.round(obj.p)),
      });

      // Animate the progress bar width
      gsap.to(barRef.current, {
        width: '100%',
        duration: 2.2,
        ease: 'power3.inOut',
      });

      // Exit animations sequence
      const tl = gsap.timeline({
        delay: 2.5,
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      // Subtle fade out of the text and bar
      tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' })
        .to(barRef.current.parentNode, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' }, '<0.1')
      // Slide the entire loader up
        .to(containerRef.current, { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, '+=0.1');

    }, containerRef);

    return () => {
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
        backgroundColor: '#050a0a',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform'
      }}
    >
      {/* Title */}
      <div style={{ overflow: 'hidden' }}>
        <h1 
          ref={textRef}
          className="hero-title"
          style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', // Slightly smaller than hero title
            letterSpacing: '0.5em', // Overrides CSS to reduce spacing between letters
            textIndent: '0.5em',    // Keeps center alignment intact
            margin: 0,
            marginBottom: '30px', 
            opacity: 1 
          }}
        >
          {"GOBIG".split('').map((char, index) => (
            <span key={index} className="loader-char" style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))}
        </h1>
      </div>
      
      {/* Loading Bar Container */}
      <div style={{ 
          width: '250px', 
          height: '2px', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          position: 'relative', 
          overflow: 'hidden',
          marginBottom: '15px'
        }}
      >
        <div 
          ref={barRef}
          style={{ 
            width: '0%', 
            height: '100%', 
            backgroundColor: 'rgba(255,255,255,0.85)', 
            position: 'absolute', 
            top: 0, 
            left: 0 
          }}
        />
      </div>

      {/* Percentage */}
      <div 
        style={{ 
          color: 'rgba(255,255,255,0.4)', 
          fontSize: '0.85rem', 
          letterSpacing: '3px', 
          fontFamily: 'Inter, sans-serif' 
        }}
      >
        {progress}%
      </div>
    </div>
  );
}
