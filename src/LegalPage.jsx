import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { legalContent } from './legalContent';
import logoImg from './img/logo_Gobig.png';

const LegalPage = ({ lang }) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(type || 'terms');

  useEffect(() => {
    if (type) setActiveTab(type);
  }, [type]);

  const content = legalContent[lang][activeTab] || legalContent[lang].terms;

  const tabs = [
    { id: 'terms', label: lang === 'es' ? 'Términos' : 'Terms' },
    { id: 'privacy', label: lang === 'es' ? 'Privacidad' : 'Privacy' },
    { id: 'refund', label: lang === 'es' ? 'Reembolso' : 'Refund' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050a0a',
      color: 'rgba(255, 255, 255, 0.9)',
      fontFamily: "'Inter', sans-serif",
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Header with Logo */}
      <div style={{ maxWidth: '800px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <Link to="/" style={{ display: 'block' }}>
          <img src={logoImg} alt="GOBIG" style={{ height: '50px', width: 'auto' }} />
        </Link>
        <Link to="/" style={{ 
          color: '#DAF013', 
          textDecoration: 'none', 
          fontSize: '0.9rem', 
          fontWeight: '700',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(218, 240, 19, 0.3)',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(218, 240, 19, 0.1)';
          e.target.style.borderColor = '#DAF013';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'rgba(218, 240, 19, 0.3)';
        }}>
          {lang === 'es' ? '← Volver al Inicio' : '← Back to Home'}
        </Link>
      </div>

      <div style={{
        maxWidth: '800px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '20px 40px 40px',
        boxSizing: 'border-box',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '10px'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                navigate(`/legal/${tab.id}`);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab.id ? '#DAF013' : 'rgba(255, 255, 255, 0.5)',
                padding: '10px 15px',
                fontSize: '0.9rem',
                fontWeight: activeTab === tab.id ? '700' : '400',
                cursor: 'pointer',
                transition: 'all 0.3s',
                borderBottom: activeTab === tab.id ? '2px solid #DAF013' : '2px solid transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <h1 style={{ 
          color: 'white', 
          fontSize: '1.8rem', 
          fontWeight: '900', 
          marginBottom: '24px',
          letterSpacing: '-0.5px'
        }}>
          {content.title}
        </h1>

        <div style={{
          fontSize: '0.95rem',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.7)',
          whiteSpace: 'pre-wrap'
        }}>
          {content.content}
        </div>
      </div>

      <footer style={{ marginTop: '40px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.3)', textAlign: 'center' }}>
        &copy; 2026 GOBIG Marketing. All rights reserved.
      </footer>
    </div>
  );
};

export default LegalPage;
