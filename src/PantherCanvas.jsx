import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all frames
const frameModules = import.meta.glob('./img/panther_frames/*.webp', { eager: true, query: '?url', import: 'default' });

// Extract URLs and sort them to ensure correct frame order
const frameUrls = Object.keys(frameModules)
  .sort()
  .map(key => frameModules[key]);

export default function PantherCanvas({ isLoaded }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const frameObj = useRef({ frame: 0 });

  // Phase 1: Robust Image Loading
  useEffect(() => {
    const loadedImages = [];
    let count = 0;

    const checkComplete = () => {
      count++;
      if (count === frameUrls.length) {
        setImages(loadedImages);
        setIsReady(true);
      }
    };

    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = checkComplete;
      img.onerror = checkComplete; // Count errors too to avoid hanging
      loadedImages[i] = img;
    });
  }, []);

  // Phase 2: Drawing and Animation
  useEffect(() => {
    if (!isLoaded || !isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const renderFrame = (index) => {
      const img = images[Math.round(index)];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Set initial size and render first frame
    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;
    renderFrame(0);

    const onResize = () => {
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      renderFrame(frameObj.current.frame);
    };
    window.addEventListener('resize', onResize);

    // Setup GSAP
    const ctxGsap = gsap.context(() => {
      const parentSection = containerRef.current.closest('.scene-section');
      
      ScrollTrigger.create({
        trigger: parentSection || containerRef.current,
        start: 'top 80%',    // Start as it enters clearly
        end: 'center center', // End exactly when centered
        scrub: 0.5,           // Smooth scrubbing
        invalidateOnRefresh: true,
        animation: gsap.fromTo(frameObj.current, 
          { frame: 0 },
          {
            frame: images.length - 1,
            snap: 'frame',
            ease: 'none',
            onUpdate: () => renderFrame(frameObj.current.frame)
          }
        )
      });
      
      // Safety refresh
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, containerRef);

    return () => {
      window.removeEventListener('resize', onResize);
      ctxGsap.revert();
    };
  }, [isLoaded, isReady, images]);

  return (
    <div ref={containerRef} className="panther-canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
      
      {/* Watermark Cover */}
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        right: '-10px',
        width: '250px',
        height: '150px',
        background: 'radial-gradient(circle at bottom right, rgba(2, 5, 8, 1) 0%, transparent 75%)',
        filter: 'blur(12px)',
        zIndex: 10,
        pointerEvents: 'none'
      }}></div>
    </div>
  );
}
