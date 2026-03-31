import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Particles.css';

const Particles = () => {
  const containerRef = useRef(null);
  const LEAF_COUNT = 35;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leaves = [];

    for (let i = 0; i < LEAF_COUNT; i++) {
      const leaf = document.createElement('div');
      leaf.classList.add('leaf');

      // Randomly pick a size variant
      const sizeClass = ['leaf--sm', 'leaf--md', 'leaf--lg'][Math.floor(Math.random() * 3)];
      leaf.classList.add(sizeClass);

      container.appendChild(leaf);
      leaves.push(leaf);

      const startX = gsap.utils.random(0, window.innerWidth);
      const startY = gsap.utils.random(-300, -60);
      const drift = gsap.utils.random(-160, 160);
      const fallDuration = gsap.utils.random(7, 16);
      const swayAmount = gsap.utils.random(30, 90);
      const swaySpeed = gsap.utils.random(1.5, 3.5);
      const initRotation = gsap.utils.random(0, 360);
      const rotSpeed = gsap.utils.random(-360, 360);

      // Initial placement
      gsap.set(leaf, {
        x: startX,
        y: startY,
        rotation: initRotation,
        rotationY: gsap.utils.random(0, 180),
        scale: gsap.utils.random(0.5, 1.2),
        opacity: gsap.utils.random(0.35, 0.85),
      });

      // Main falling timeline (loops forever)
      const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 8) });

      tl.to(leaf, {
        y: window.innerHeight + 120,
        x: `+=${drift}`,
        rotation: `+=${rotSpeed}`,
        rotationY: '+=180',
        duration: fallDuration,
        ease: 'none',
      });

      // Reset back to top when done
      tl.set(leaf, {
        y: gsap.utils.random(-300, -60),
        x: gsap.utils.random(0, window.innerWidth),
        rotation: gsap.utils.random(0, 360),
      });

      // Independent sideways sway (sine-like oscillation)
      gsap.to(leaf, {
        x: `+=${swayAmount}`,
        duration: swaySpeed,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Subtle 3D flip
      gsap.to(leaf, {
        rotationX: gsap.utils.random(-40, 40),
        duration: gsap.utils.random(2, 4),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      leaves.forEach((leaf) => {
        gsap.killTweensOf(leaf);
        leaf.remove();
      });
    };
  }, []);

  return <div className="leaves-container" ref={containerRef} />;
};

export default Particles;
