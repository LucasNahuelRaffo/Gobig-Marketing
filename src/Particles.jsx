import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Particles.css';

const Particles = ({ count = 25 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leaves = [];
    const containerRect = container.getBoundingClientRect();
    const containerHeight = containerRect.height || window.innerHeight;
    const containerWidth = containerRect.width || window.innerWidth;

    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('div');
      leaf.classList.add('leaf');

      const sizeClass = ['leaf--sm', 'leaf--md', 'leaf--lg'][Math.floor(Math.random() * 3)];
      leaf.classList.add(sizeClass);

      container.appendChild(leaf);
      leaves.push(leaf);

      const startX = gsap.utils.random(0, containerWidth);
      const startY = gsap.utils.random(-200, -20);
      const drift = gsap.utils.random(-100, 100);
      const fallDuration = gsap.utils.random(8, 20);
      const swayAmount = gsap.utils.random(20, 60);
      const swaySpeed = gsap.utils.random(2, 4);
      const initRotation = gsap.utils.random(0, 360);
      const rotSpeed = gsap.utils.random(-180, 180);

      gsap.set(leaf, {
        x: startX,
        y: startY,
        rotation: initRotation,
        rotationY: gsap.utils.random(0, 180),
        scale: gsap.utils.random(0.6, 1.1),
        opacity: gsap.utils.random(0.2, 0.6),
      });

      const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 10) });

      tl.to(leaf, {
        y: containerHeight + 100,
        x: `+=${drift}`,
        rotation: `+=${rotSpeed}`,
        rotationY: '+=180',
        duration: fallDuration,
        ease: 'none',
      });

      tl.set(leaf, {
        y: gsap.utils.random(-200, -20),
        x: gsap.utils.random(0, containerWidth),
        rotation: gsap.utils.random(0, 360),
      });

      gsap.to(leaf, {
        x: `+=${swayAmount}`,
        duration: swaySpeed,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(leaf, {
        rotationX: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(3, 5),
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
  }, [count]);

  return <div className="leaves-container" ref={containerRef} />;
};

export default Particles;
