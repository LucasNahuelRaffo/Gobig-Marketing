import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

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

  return (
    <div ref={containerRef} style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100vh',
      flex: 1,
      boxSizing: 'border-box',
      position: 'relative',
      overflowY: 'auto',
      overflowX: 'hidden'
    }} className="custom-scrollbar">

      {/* Main Content Area */}
      <div style={{
        flex: '1 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Now centered in available space
        gap: '28px', // Slightly larger gap to breathe
        padding: '140px 20px 40px', // Aggressively pad top to push down
        width: '100%',
        margin: '0 auto',
        maxWidth: '1200px' // Boxes width
      }}>

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
      <br />
      <br />
      {/* Comprehensive Footer */}
      <footer className="s6-anim" style={{
        width: '100%',
        background: '#07030a', // Deep dark solid background matching mockup
        padding: '24px 40px 12px', // Ultra compressed top/bottom padding
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.5)',
        flexShrink: 0,
        marginTop: 'auto'
      }}>

        {/* Top Section - 4 Columns */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px', // tighter horizontal
          marginBottom: '16px', // highly compressed
          maxWidth: '1200px', // constrain to center
          margin: '0 auto 16px', // compressed bottom space
          width: '100%'
        }}>

          {/* Col 1: Brand & Social */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ color: '#DAF013', fontSize: '1.4rem', fontWeight: '900', letterSpacing: '3px', margin: 0 }}>
              GOBIG
            </h2>
            <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.4)', maxWidth: '90%' }}>
              Ayudamos a clínicas médicas a conseguir +30 agendas calificadas con publicidad en Meta.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Instagram */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'white', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* Facebook */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'white', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'white', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              {/* YouTube */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'white', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navegación */}
          <div style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: '700', margin: 0 }}>Navegación</h4>
            {['Inicio', 'Servicios', 'Testimonios', 'Blog', 'Contacto'].map(link => (
              <a href="#" key={link} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#DAF013'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                {link}
              </a>
            ))}
          </div>

          {/* Col 3: Legal */}
          <div style={{ flex: '1 1 160px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: '700', margin: 0 }}>Legal</h4>
            {['Política de Privacidad', 'Términos de Servicio', 'Aviso Legal'].map(link => (
              <a href="#" key={link} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#DAF013'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                {link}
              </a>
            ))}
          </div>

          {/* Col 4: Contacto */}
          <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: '700', margin: 0 }}>Contacto</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span style={{ fontSize: '0.8rem' }}>+52 55 1234 5678</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span style={{ fontSize: '0.8rem' }}>contacto@gobig.com</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '12px', maxWidth: '1200px', alignSelf: 'center' }}></div>

        {/* Bottom Small Text */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', maxWidth: '1200px', alignSelf: 'center', width: '100%', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
          <div>© 2026 GoBig. Todos los derechos reservados.</div>
          <div style={{ margin: '0 10px' }}>|</div>
        </div>
      </footer>

    </div>
  );
}
