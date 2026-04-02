import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Cómo funciona la mentoría 1 a 1?',
    answer: 'Desde el primer día tendrás un mentor asignado que te acompañará paso a paso. Analizamos tu mercado, diseñamos tu estrategia de captación, configuramos tus campañas en Meta y optimizamos cada dólar invertido. No estás solo en ningún momento del proceso.'
  },
  {
    question: '¿Necesito tener redes sociales activas?',
    answer: 'No es estrictamente necesario. Creamos embudos de venta directos (Filtros API) que capturan la atención del paciente y lo llevan a agendar, sin depender de tu número de seguidores o likes.'
  },
  {
    question: '¿Qué pasa si no consigo las 30 agendas?',
    answer: 'Nuestra garantía por contrato establece que si no logramos las 30 agendas calificadas en el tiempo estipulado, seguimos trabajando contigo sin costo adicional hasta que lo logremos.'
  },
  {
    question: '¿Cuánto tiempo tarda en ver resultados?',
    answer: 'Generalmente nuestros clientes comienzan a ver agendas calificadas en su calendario durante los primeros 7 a 14 días luego de lanzar las campañas optimizadas.'
  },
  {
    question: '¿Funciona para cualquier especialidad médica?',
    answer: 'Sí, las estrategias de adquisición y filtros API se adaptan a cirujanos plásticos, odontólogos, dermatólogos y clínicas estéticas que ofrecen servicios de alto valor o "High Ticket".'
  }
];

export default function Section3Content({ t }) {
  const [openIndex, setOpenIndex] = useState(0); // Primera abierta por defecto
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate elements sequentially when scrolling into view
      gsap.fromTo('.faq-anim',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%', // Starts animation when 35% of the container is visible from bottom
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
      justifyContent: 'flex-start', // Pulled up
      width: '100%',
      maxWidth: '900px',
      height: '100%',
      margin: '-45px auto 0', // LOWERED: reduced from -90px
      padding: '30px 20px', // Added top padding to lower title
      boxSizing: 'border-box'
    }}>

      {/* Badge Preguntas */}
      <div className="glass-panel faq-anim" style={{
        padding: '6px 20px',
        borderRadius: '100px',
        border: '1px solid #DAF013',
        background: 'rgba(218, 240, 19, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px' // reduced margin
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span style={{ color: '#DAF013', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px' }}>{t.badge}</span>
      </div>

      {/* FAQ Title */}
      <div className="faq-anim glass-panel" style={{
        padding: '12px 20px', // COMPRESSED: reduced from 20px 30px
        borderRadius: '12px',
        background: 'rgba(5, 10, 15, 0.5)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '10px', // COMPRESSED: reduced from 20px
        maxWidth: '800px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '800',
          color: 'white',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {t.title}
        </h2>
      </div>

      {/* Decorative center line */}
      <div className="faq-anim" style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '10px' }}></div>

      <p className="faq-anim" style={{
        color: 'rgba(255,255,255,1)',
        fontSize: '1.0rem', // reduced
        textAlign: 'center',
        marginBottom: '16px', // compressed
        fontWeight: '400'
      }}>
        {t.subtitle}
      </p>


      {/* FAQ Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginBottom: '20px' }}>
        {t.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="glass-panel faq-anim"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              style={{
                cursor: 'pointer',
                padding: '12px 20px', // COMPRESSED: reduced from 16px 24px
                borderRadius: '12px',
                background: isOpen ? 'rgba(30, 40, 60, 0.4)' : 'rgba(5, 10, 15, 0.6)',
                border: isOpen ? '1px solid #DAF013' : '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>{faq.question}</span>
                <div style={{ color: isOpen ? '#DAF013' : 'rgba(255,255,255,0.4)', transition: 'transform 0.4s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              {/* Seamless Height Transition */}
              <div style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                <div style={{
                  overflow: 'hidden',
                  opacity: isOpen ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.85rem',
                  lineHeight: '1.5'
                }}>
                  <div style={{ paddingTop: '10px' }}>
                    {faq.answer}
                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* Bottom Features */}
      <div className="faq-anim" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { text: t.features[0], icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
          { text: t.features[1], icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
          { text: t.features[2], icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /> }
        ].map((feature, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: '500' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAF013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {feature.icon}
            </svg>
            {feature.text}
          </div>
        ))}
      </div>

      {/* Hero CTA Button for Section 3 */}
      <div className="faq-anim" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={() => window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank')}
          style={{
            background: '#DAF013',
            color: '#050a0a',
            padding: '12px 30px', // COMPRESSED: reduced from 16px 36px
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px', // COMPRESSED
            boxShadow: '0 0 15px rgba(218, 240, 19, 0.15)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(218, 240, 19, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(218, 240, 19, 0.15)';
          }}
        >
          <span style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '-0.3px' }}>
            {t.ctaTitle}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: '500', opacity: 0.85, fontStyle: 'italic' }}>
            {t.ctaSub}
          </span>
        </button>
      </div>

    </div>
  )
}
