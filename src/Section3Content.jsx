import React, { useRef, useState } from 'react';
import MarqueeLogoScroller from './MarqueeLogoScroller';

import logoBarbara from './img/Logos de Empresas/Barbara Chavez.png';
import logoOrlando from './img/Logos de Empresas/Dr. Orlando Santillan.png';
import logoHuawei from './img/Logos de Empresas/Huawei.png';
import logoLuar from './img/Logos de Empresas/Luar.png';
import logoNovocentro from './img/Logos de Empresas/Novocentro.png';
import logoRenuev from './img/Logos de Empresas/Renuev.png';

const partners = [
  { src: logoBarbara, alt: 'Barbara Chavez' },
  { src: logoOrlando, alt: 'Dr. Orlando Santillan' },
  { src: logoHuawei, alt: 'Huawei' },
  { src: logoLuar, alt: 'Luar' },
  { src: logoNovocentro, alt: 'Novocentro' },
  { src: logoRenuev, alt: 'Renuev' },
];

export default function Section3Content({ t }) {
  const containerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div ref={containerRef} style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '-10px',
      overflowY: 'auto',
      overflowX: 'hidden'
    }} className="custom-scrollbar">
      {/* Logos Scroller */}
      <MarqueeLogoScroller
        title={t.marquee}
        description={t.marqueeSub}
        logos={partners}
        speed="normal"
      />

      {/* Info Section replacing FAQs */}
      <div className="panther-grid-container" style={{
        width: '100%',
        maxWidth: '1440px',
        marginTop: '20px',
        marginBottom: '80px',
        padding: '0 40px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '40px',
        zIndex: 10
      }}>
        {/* Left Panel: Title */}
        <div className="glass-panel panther-card-left" style={{
          flex: '1 1 500px',
          maxWidth: '555px',
          padding: '40px',
          background: 'rgba(5, 10, 15, 0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          textAlign: 'left'
        }}>
          <h2 className="panther-title" style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '800',
            lineHeight: '1.3',
            margin: 0,
            letterSpacing: '-0.5px'
          }}>
            Trabajamos con <span style={{ color: '#DAF013' }}>Personas Ocupadas y con</span><br />
            <span style={{ color: '#DAF013' }}>Alto Poder Adquisitivo</span> Todos los Días
          </h2>
        </div>

        {/* Right Panel: Paragraph */}
        <div className="glass-panel panther-card-right" style={{
          flex: '1 1 400px',
          maxWidth: '480px',
          padding: '40px',
          marginTop: '12vw', /* Empuja el panel hacia abajo para el efecto diagonal */
          background: 'rgba(5, 10, 15, 0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          textAlign: 'left'
        }}>
          <p className="panther-description" style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1rem',
            lineHeight: '1.7',
            margin: 0,
            fontWeight: '400'
          }}>
            Lo entendemos, y nuestro negocio está diseñado para personas como tú. Todo lo que te pidamos será eficiente y fácil de llevar a cabo. Y en las pocas cosas en las que sí necesitaremos tu apoyo, como videos de anuncios de respuesta directa, contenido y videos para el embudo, nos aseguraremos de que sea algo que puedas ejecutar con facilidad.
          </p>
        </div>
      </div>
    </div>
  );
}
