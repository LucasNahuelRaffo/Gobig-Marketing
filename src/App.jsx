import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';
import PantherCanvas from './PantherCanvas';
import SeamlessVideo from './SeamlessVideo';
import Loader from './Loader';
import Navbar from './Navbar';
import HeroContent from './HeroContent';
import Section2Content from './Section2Content';
import Section3Content from './Section3Content';
import Section4Content from './Section4Content';
import Section5Content from './Section5Content';
import Section6Content from './Section6Content';
import './App.css';

import skyImg from './img/sky.png';
import canopyImg from './img/canopy.png';
import heroVideo from './videos/fb880a87-9824-4f96-bd59-55b56af241f4.mp4';
import pantherImg from './img/panther.png';
import lowerJungleImg from './img/lower-jungle.png';
import rootsImg from './img/roots.png';
import fossilsImg from './img/fossils.png';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'sky', video: heroVideo, name: 'Sky - Starry Night' },
  { id: 'canopy', img: canopyImg, name: 'Upper Canopy' },
  { id: 'panther', img: pantherImg, name: 'Panther on Bridge' },
  { id: 'lower-jungle', img: lowerJungleImg, name: 'Lower Jungle' },
  { id: 'roots', img: rootsImg, name: 'Roots Underground' },
  { id: 'fossils', img: fossilsImg, name: 'Dinosaur Fossils' },
];

function App() {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on each section's background image
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        const bgs = section.querySelectorAll('.section-bg');
        if (bgs.length === 0) return;

        bgs.forEach((img) => {
          gsap.fromTo(img,
            { yPercent: -2 },
            {
              yPercent: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      });

      // Fade-in sections as they enter viewport
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(section,
          { opacity: 0.3 },
          {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
            },
          }
        );
      });

      // Hero entrance animations (orchestrated to run when loader slides up)
      const heroTl = gsap.timeline({ delay: 3.5 });
      
      const nav = document.querySelector('.navbar-container');
      if (nav) {
        heroTl.fromTo(nav, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      }

      const panels = document.querySelectorAll('.panel-animate');
      if (panels.length) {
        heroTl.fromTo(panels, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, 
          '<0.2'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="app-container" ref={containerRef}>
      <Loader onComplete={() => setIsLoaded(true)} />
      
      {/* SVG Clip Path for organic section dividers */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <clipPath id="branch-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.03 C0.1,0.01 0.18,0.05 0.28,0.02 C0.42,0.0 0.48,0.06 0.6,0.01 C0.72,-0.01 0.82,0.05 0.9,0.02 C0.96,0.01 0.99,0.04 1,0.02 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <Particles />

      {sections.map((section, i) => (
        <section
          key={section.id}
          className="scene-section"
          ref={(el) => (sectionRefs.current[i] = el)}
        >
          {section.id === 'panther' ? (
            <PantherCanvas />
          ) : section.video ? (
            <SeamlessVideo src={section.video} poster={skyImg} crossfadeDuration={1.5} isPlaying={isLoaded} />
          ) : (
            <div className="section-bg-wrapper">
              <div
                className="section-bg"
                style={{ backgroundImage: `url(${section.img})` }}
              />
            </div>
          )}

          {/* Place hero UI inside the first section to share stacking context with the video */}
          {i === 0 && (
            <div className="hero-overlay">
              <Navbar />
              <HeroContent />
            </div>
          )}

          {/* Section 2 UI over Canopy background */}
          {i === 1 && (
            <div className="hero-overlay">
              <Section2Content />
            </div>
          )}

          {/* Section 3 UI over Panther canvas */}
          {i === 2 && (
            <div className="hero-overlay">
              <Section3Content />
            </div>
          )}

          {/* Section 4 UI over Temple background */}
          {i === 3 && (
            <div className="hero-overlay">
              <Section4Content />
            </div>
          )}

          {/* Section 5 UI over Roots background */}
          {i === 4 && (
            <div className="hero-overlay">
              <Section5Content />
            </div>
          )}

          {/* Section 6 UI over Fossils background */}
          {i === 5 && (
            <div className="hero-overlay" style={{ paddingBottom: 0, bottom: 0, height: '100%' }}>
              <Section6Content />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default App;
