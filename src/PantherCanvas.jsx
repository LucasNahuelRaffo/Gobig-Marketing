import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all frames
const frameModules = import.meta.glob('./img/panther_frames/*.png', { eager: true, query: '?url', import: 'default' });

// Extract URLs and sort them to ensure correct frame order
const frameUrls = Object.keys(frameModules)
  .sort()
  .map(key => frameModules[key]);

export default function PantherCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set initial dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images = [];
    const frameObj = { frame: 0 };
    let loadedCount = 0;

    // Load images
    for (let i = 0; i < frameUrls.length; i++) {
      const img = new Image();
      img.src = frameUrls[i];
      img.onload = () => {
        loadedCount++;
        // Render the first frame once it's loaded to avoid blank canvas
        if (loadedCount === 1) {
          renderFrame(0);
        }
      };
      images.push(img);
    }

    const renderFrame = (index) => {
      const img = images[index];
      if (!img || !img.complete) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // We want the image to cover the canvas (like background-size: cover)
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

    // Handle Resize
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(frameObj.frame));
    };
    window.addEventListener('resize', onResize);

    // Setup GSAP Canvas Animation
    const ctxGsap = gsap.context(() => {
      const triggerSection = containerRef.current.closest('section') || containerRef.current;
      
      ScrollTrigger.create({
        trigger: triggerSection,
        start: 'top top',
        end: '+=300%', // User scrolls for 3x the viewport height to see the full animation
        pin: true,
        scrub: 0.5, // Smooth scrubbing
        animation: gsap.to(frameObj, {
          frame: frameUrls.length - 1,
          snap: 'frame',
          ease: 'none',
          onUpdate: () => renderFrame(Math.round(frameObj.frame))
        })
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', onResize);
      ctxGsap.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="panther-canvas-container" style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
    </div>
  );
}
