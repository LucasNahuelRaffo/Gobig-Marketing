import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function Section4Content() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.s4-anim', 
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

  const PlayButton = ({ size }) => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      border: '2px solid #DAF013',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
       <div style={{
          width: 0, height: 0,
          borderTop: `${size * 0.18}px solid transparent`,
          borderBottom: `${size * 0.18}px solid transparent`,
          borderLeft: `${size * 0.3}px solid #DAF013`,
          marginLeft: `${size * 0.08}px`
       }} />
    </div>
  );

  const features = [
    { text: 'Análisis profundo de tu ecosistema actual y detección de cuellos de botella', icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/> },
    { text: 'Estrategia de escalado con proyección de ingresos predecible', icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></> },
    { text: 'Implementación completa del sistema de Filtros API', icon: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></> },
    { text: 'Monitoreo dinámico del costo por prospecto calificado', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
    { text: 'Visibilidad total y panel de control en tiempo real', icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></> }
  ];

  return (
    <div ref={containerRef} className="custom-scrollbar" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: '750px',
      height: '100%',
      margin: '0 auto',
      padding: '40px 20px 40px', // More breathing room, avoids overlapping fades
      boxSizing: 'border-box',
      gap: '12px',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>

      {/* Section Title */}
      <div className="s4-anim glass-panel" style={{ 
        textAlign: 'center', 
        marginBottom: '6px', // compressed
        padding: '12px 24px', // compressed
        borderRadius: '12px',
        background: 'rgba(5, 10, 15, 0.5)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <h2 style={{
          fontSize: '1.6rem', // compressed slightly
          fontWeight: '800',
          color: 'white',
          margin: '0 0 4px 0',
          letterSpacing: '-0.5px',
          textTransform: 'uppercase'
        }}>
          El Sistema en Acción
        </h2>
        <p style={{
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          fontWeight: '400'
        }}>
          Descubrí cómo estructuramos y escalamos la facturación de tu clínica
        </p>
      </div>

      {/* Main Large Video */}
      <div className="glass-panel s4-anim" style={{
        width: '100%',
        maxWidth: '560px',
        height: '200px', // compressed from 240px
        borderRadius: '16px',
        background: 'rgba(5, 10, 15, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
      }}>
        <PlayButton size={48} />
      </div>

      {/* Two Small Videos Row */}
      <div className="s4-anim" style={{ 
        display: 'flex', 
        gap: '12px', 
        width: '100%', 
        maxWidth: '560px',
        justifyContent: 'center' 
      }}>
        <div className="glass-panel" style={{
          flex: 1,
          height: '110px', // compressed from 130px
          borderRadius: '16px',
          background: 'rgba(5, 10, 15, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <PlayButton size={32} />
        </div>
        
        <div className="glass-panel" style={{
          flex: 1,
          height: '110px', // compressed from 130px
          borderRadius: '16px',
          background: 'rgba(5, 10, 15, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <PlayButton size={32} />
        </div>
      </div>

      {/* Decorative center line */}
      <div className="s4-anim" style={{ 
        width: '100%',
        maxWidth: '560px',
        height: '1px', 
        background: 'linear-gradient(90deg, transparent, rgba(218, 240, 19, 0.5), transparent)', 
        margin: '4px 0' 
      }}></div>

      {/* Modern Features List */}
      <div className="s4-anim glass-panel" style={{ 
        width: '100%', 
        maxWidth: '640px',
        padding: '16px 20px', // compressed padding
        borderRadius: '16px',
        background: 'rgba(10, 15, 25, 0.4)',
        border: '1px solid rgba(255,255,255,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px' // compressed list gap
      }}>
        {features.map((feature, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}>
            {/* Icon Container with subtle glow */}
            <div style={{
              minWidth: '26px', // compressed icon box
              height: '26px',
              borderRadius: '8px',
              background: 'rgba(218, 240, 19, 0.05)',
              border: '1px solid rgba(218, 240, 19, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(218, 240, 19, 0.1)'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {feature.icon}
              </svg>
            </div>
            
            <span style={{ 
               color: 'rgba(255,255,255,0.85)', 
               fontSize: '0.85rem', 
               fontWeight: '500',
               lineHeight: '1.2'
            }}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
