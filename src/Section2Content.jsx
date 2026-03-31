import React from 'react';
import './App.css';

export default function Section2Content() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      width: '100%',
      maxWidth: '1000px',
      height: '100%',
      margin: '0 auto',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>

      {/* Badge */}
      <div className="glass-panel" style={{
        padding: '12px 30px',
        borderRadius: '8px',
        background: 'rgba(5, 10, 15, 0.4)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: '700',
          letterSpacing: '3px',
          color: 'white',
          textTransform: 'uppercase'
        }}>
          Badge de Confianza
        </h3>
      </div>

      {/* Video Cards Grid */}
      <div style={{
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
      }}>
        {[1, 2, 3].map((item) => (
          <div key={item} className="glass-panel" style={{
            width: '280px',
            height: '420px',
            borderRadius: '16px',
            background: 'rgba(5, 10, 15, 0.4)', // Darker glass background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(218, 240, 19, 0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
          >
            {/* Play Button */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '2px solid #DAF013',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
               <div style={{
                  width: 0, height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: '16px solid #DAF013',
                  marginLeft: '4px' // Optical centering for the triangle
               }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Text Panel */}
      <div className="glass-panel" style={{
        padding: '30px 40px',
        borderRadius: '12px',
        textAlign: 'center',
        background: 'rgba(5, 10, 15, 0.4)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <p style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: 'white',
          margin: '0 0 10px 0',
          lineHeight: '1.6'
        }}>
          Todo está diseñado para que tomes decisiones informadas en minutos, no en semanas.
        </p>
        <p style={{
          fontSize: '0.9rem',
          fontWeight: '400',
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          lineHeight: '1.6'
        }}>
          Combinado con la mentoría 1 a 1, esta herramienta te permite avanzar con velocidad y evitar los errores que cuestan miles de dólares.
        </p>
      </div>

    </div>
  );
}
