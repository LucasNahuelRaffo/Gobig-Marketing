import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import MarqueeLogoScroller from './MarqueeLogoScroller';

import logoBarbara from './img/logos de Empresas/Barbara Chavez.png';
import logoOrlando from './img/logos de Empresas/Dr. Orlando Santillan.png';
import logoHuawei from './img/logos de Empresas/Huawei.png';
import logoLuar from './img/logos de Empresas/Luar.png';
import logoNovocentro from './img/logos de Empresas/Novocentro.png';
import logoRenuev from './img/logos de Empresas/Renuev.png';

gsap.registerPlugin(ScrollTrigger);

export default function Section6Content() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.s6-anim',
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

  const badList = [
    "Contenido sin estrategia de conversión",
    "Anuncios sin seguimiento post-clic",
    "Más alcance, menos clientes reales",
    "Leads que se enfrían sin respuesta",
    "Reportes de vanidad (likes, impresiones)",
    "Dependes de ellos para siempre"
  ];

  const goodList = [
    "Sistema completo: tráfico → lead → cliente",
    "Automatización de seguimiento y CRM",
    "Foco en adquisición, conversión y retorno",
    "Leads respondidos en minutos, no días",
    "Métricas reales: costo por cliente adquirido",
    "Tu equipo opera el sistema de forma autónoma"
  ];

  const partners = [
    { src: logoBarbara, alt: 'Barbara Chavez', gradient: { from: '#668CFF', via: '#0049FF', to: '#003199' } },
    { src: logoOrlando, alt: 'Dr. Orlando Santillan', gradient: { from: '#FFE766', via: '#FFCE00', to: '#B38F00' } },
    { src: logoHuawei, alt: 'Huawei', gradient: { from: '#6690F0', via: '#255BE3', to: '#193B99' } },
    { src: logoLuar, alt: 'Luar', gradient: { from: '#C4C2FF', via: '#9896FF', to: '#5B4DCC' } },
    { src: logoNovocentro, alt: 'Novocentro', gradient: { from: '#FF66A1', via: '#FF007A', to: '#B3005A' } },
    { src: logoRenuev, alt: 'Renuev', gradient: { from: '#D9FF5A', via: '#AFFF01', to: '#7A9900' } }
  ];

  return (
    <div ref={containerRef} style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100vh',
      flex: 1,
      boxSizing: 'border-box',
      position: 'relative'
    }}>

      {/* Main Content Area */}
      <div style={{
        flex: '1 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0 20px', // Reduced top padding so CTA button appears in view
        width: '100%'
      }}>

        {/* Inner Container for constrained elements */}
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px'
        }}>
          {/* Marquee Scroller - Restored inside container */}
          <MarqueeLogoScroller
            title="Clínicas médicas en todo el mundo confían en nosotros"
            description="Fundadores, equipos médicos y líderes en la salud de toda la región trabajan con nuestro sistema."
            logos={partners}
            speed="normal"
          />

          {/* Comparison Container */}
          <div style={{
            display: 'flex',
            gap: '24px', // Tighter gap between boxes
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
          {/* BAD Box */}
          <div className="s6-anim" style={{
            flex: 1,
            minWidth: '340px',
            background: 'rgba(15, 5, 10, 0.65)', // Deep dark red tint
            border: '1px solid rgba(255, 60, 60, 0.15)',
            borderRadius: '20px',
            padding: '24px', // Reduced padding
            boxShadow: '0 10px 40px rgba(200, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px' // Tighter list
          }}>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.2rem', // slightly scaled down
              fontWeight: '700',
              color: 'white',
              margin: '0 0 10px 0'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Lo que te ofrecen los demás
            </h3>
            {badList.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF4040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.4' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* GOOD Box */}
          <div className="s6-anim" style={{
            flex: 1,
            minWidth: '340px',
            background: 'rgba(10, 15, 5, 0.65)', // Subtle dark green/yellow tint
            border: '1px solid rgba(218, 240, 19, 0.15)',
            borderRadius: '20px',
            padding: '24px', // Reduced padding
            boxShadow: '0 10px 40px rgba(218, 240, 19, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px' // Tighter list
          }}>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.2rem', // slightly scaled down
              fontWeight: '700',
              color: 'white',
              margin: '0 0 10px 0'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Lo que GoBig construye
            </h3>
            {goodList.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: '1.4' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <b></b>
        {/* Huge CTA Button */}
        <button className="s6-anim" style={{
          background: '#DAF013',
          border: 'none',
          borderRadius: '16px',
          padding: '18px 36px', // Slightly less padding
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          boxShadow: '0 15px 40px rgba(218, 240, 19, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%', // take up to max width
          maxWidth: '800px', // constrain width
          margin: '0 auto'  // center it
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(218, 240, 19, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(218, 240, 19, 0.2)';
          }}
        >
          <span style={{ color: '#050a0a', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.3px' }}>
            No seas el dinosaurio de las clínicas
          </span>
          <span style={{ color: '#050a0a', fontSize: '0.85rem', fontWeight: '500', fontStyle: 'italic', opacity: 0.8 }}>
            Aplica ahora y agenda tu llamada estratégica
          </span>
        </button>


        </div>
      </div>
    </div>
  );
}
