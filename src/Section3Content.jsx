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
      marginTop: '-60px',
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

      {/* FAQ Section */}
      {t.faqs && t.faqs.length > 0 && (
        <div style={{
          width: '100%',
          maxWidth: '750px',
          padding: '20px',
          marginTop: '20px',
          marginBottom: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          {/* Accordion List */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {t.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-panel"
                  style={{
                    background: isOpen ? 'rgba(20, 25, 35, 0.6)' : 'rgba(10, 15, 25, 0.4)',
                    border: isOpen ? '1px solid rgba(218, 240, 19, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleFaq(index)}
                >
                  <div style={{
                    padding: '18px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                  }}>
                    <h3 style={{
                      margin: 0,
                      color: isOpen ? '#DAF013' : 'white',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'color 0.3s ease'
                    }}>
                      {faq.question}
                    </h3>
                    <div style={{
                      minWidth: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(218, 240, 19, 0.1)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#DAF013' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* Answer Container */}
                  <div style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    padding: isOpen ? '0 20px 20px 20px' : '0 20px',
                    transition: 'all 0.3s ease-in-out',
                    overflow: 'hidden'
                  }}>
                    <p style={{
                      margin: 0,
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.9rem',
                      lineHeight: '1.5'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
