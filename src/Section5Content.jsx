import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import logoMartin from './img/martin.png';
import logoRichi from './img/richi.png';

gsap.registerPlugin(ScrollTrigger);

export default function Section5Content({ t }) {
  const containerRef = useRef(null);
  
  const teamImages = [logoMartin, logoRichi];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.s5-anim', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="responsive-section-margin" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: '900px',
      height: 'auto', // Fix: Changed from 100% to auto to allow page scroll
      margin: '-60px auto 0',
      padding: '40px 20px 0',
      position: 'relative'
    }}>

      {/* Pill */}
      <div className="glass-panel s5-anim" style={{
        marginTop: '20px', // Strongly reduced margin
        padding: '6px 20px',
        borderRadius: '100px',
        border: '1px solid #DAF013',
        background: 'rgba(218, 240, 19, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px' // Reduced gap
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span style={{ color: '#DAF013', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {t.badge}
        </span>
      </div>

      {/* Title */}
      <div className="s5-anim glass-panel" style={{
        padding: '12px 40px',
        borderRadius: '12px',
        background: 'rgba(5, 10, 15, 0.5)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: 'white',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          {t.title}
        </h2>
      </div>

      {/* Team Cards Container */}
      <div style={{
        display: 'flex',
        gap: '30px', // Reverted gap slightly back
        width: '100%',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {t.members.map((member, idx) => (
          <div key={idx} className="s5-anim" style={{
            width: '350px', // Restored width for a more premium look
            borderRadius: '20px',
            background: '#0a0514', // Solid dark deep purple like mockup 
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* Image block */}
            <div style={{
              width: '100%',
              height: '340px', // Extended height to fill the blank space marked by user
              background: 'linear-gradient(180deg, rgba(30, 20, 50, 0.8) 0%, rgba(10, 5, 20, 0.8) 100%)',
              overflow: 'hidden',
              borderBottom: '1px solid rgba(255,255,255,0.02)'
            }}>
              <img 
                src={teamImages[idx]} 
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>


            {/* Content area */}
            <div style={{
              padding: '20px 20px 24px', // Tighter base padding
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '1.4rem', // Brought font size back down to fit smaller card
                fontWeight: '800',
                margin: '0 0 8px 0',
                letterSpacing: '-0.3px'
              }}>
                {member.name}
              </h3>
              <span style={{
                color: '#DAF013',
                fontSize: '0.85rem', // Legible subtitle
                fontWeight: '700',
                marginBottom: '12px' // Air underneath role
              }}>
                {member.role}
              </span>
              <p style={{
                color: 'rgba(255,255,255,0.65)', // Brightened up grey
                fontSize: '0.85rem', // Stronger reading size but compact
                lineHeight: '1.5',
                margin: 0,
                fontWeight: '400'
              }}>
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
