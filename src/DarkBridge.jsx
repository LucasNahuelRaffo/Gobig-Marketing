import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VturbPlayer from './VturbPlayer';
import Particles from './Particles';
import fondoFaq from './img/Fondo_2.jpg';
import './App.css';

// Success Cases Images
import caseImg1 from './img/testimonios_4componentes/1.png';
import caseImg2 from './img/testimonios_4componentes/2.png';
import caseImg3 from './img/testimonios_4componentes/3.png';
import caseImg4 from './img/testimonios_4componentes/4.png';


gsap.registerPlugin(ScrollTrigger);


export default function DarkBridge({ id, t, lang, style, mode = 'standard' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMoving, setIsMoving] = useState(false); // Throttle for clicks
  const [visibleCards, setVisibleCards] = useState(window.innerWidth < 1024 ? (window.innerWidth < 768 ? 1 : 2) : 3);

  const [isPaused, setIsPaused] = useState(false);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const isMobile = visibleCards === 1;

  const testimonials = t?.testimonials || [];
  const totalItems = testimonials.length;

  // Triple the items to create a seamless loop
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const caseImages = [caseImg1, caseImg2, caseImg3, caseImg4];


  // Initialize index to the middle set
  useEffect(() => {
    if (totalItems > 0) {
      setCurrentIndex(totalItems);
    }
  }, [totalItems]);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 1024 ? (window.innerWidth < 768 ? 1 : 2) : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Invisible jump reset logic
  useEffect(() => {
    if (currentIndex >= totalItems * 2 || currentIndex <= 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        if (currentIndex >= totalItems * 2) {
          setCurrentIndex(totalItems);
        } else if (currentIndex <= 0) {
          setCurrentIndex(totalItems);
        }
        setTimeout(() => setIsTransitioning(true), 10);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalItems]);

  // Auto-play logic
  useEffect(() => {
    const isShowcase = mode === 'showcase' || t?.type === 'showcase';
    if (isShowcase && totalItems > 0 && isTransitioning && !isPaused) {
      const timer = setInterval(() => {
        handleNext();
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [mode, t, isTransitioning, totalItems, isPaused]);

  const scrollPosition = useRef(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showCaseDetails) {
      scrollPosition.current = window.pageYOffset;
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition.current);
      ScrollTrigger.refresh();
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [showCaseDetails]);

  // Helper to format text with bold and lists
  const formatText = (text) => {
    if (typeof text !== 'string') return text;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let processedLine = line.trim();
      const isCheckItem = processedLine.startsWith('✓');
      if (isCheckItem) processedLine = processedLine.substring(1).trim();
      const parts = processedLine.split(/(\*\*.*?\*\*)/g);
      const content = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-neon" style={{ fontWeight: '900' }}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      if (isCheckItem) {
        return (
          <div key={idx} style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'flex-start', 
            margin: '8px 0', 
            color: 'rgba(255,255,255,0.95)',
            textAlign: 'left'
          }}>
            <span className="text-neon" style={{ fontWeight: '900', marginTop: '3px' }}>✓</span>
            <span style={{ lineHeight: '1.5' }}>{content}</span>
          </div>
        );
      }
      return <span key={idx}>{content}{idx < lines.length - 1 ? <br /> : ''}</span>;
    });
  };

  // Helper to parse results string into stats array
  const parseResults = (resultsStr) => {
    if (!resultsStr) return [];
    const lines = resultsStr.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const match = line.match(/^(.+?)\s+([\d$,+.%]+)\s*$/);
      if (match) {
        return { label: match[1].trim(), value: match[2].trim() };
      }
      return { label: '', value: line.trim() };
    }).filter(stat => stat.value);
  };

  const handleNext = () => {
    if (totalItems === 0 || isMoving) return;
    setIsMoving(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => setIsMoving(false), 600); // Unlock after transition
  };

  const handlePrev = () => {
    if (totalItems === 0 || isMoving) return;
    setIsMoving(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => setIsMoving(false), 600); // Unlock after transition
  };

  // --- SWIPE LOGIC ---
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = (callbackNext, callbackPrev) => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (Math.abs(distance) < minSwipeDistance) return;
    if (distance > 0) callbackNext();
    else callbackPrev();
  };


  if (!t) return null;

  const isShowcase = mode === 'showcase' || t.type === 'showcase';

  return (
    <section
      id={id}
      className={`dark-bridge ${isShowcase ? 'showcase-bridge' : ''}`}
      style={{ ...style, position: 'relative' }}
    >
      <div className="bridge-content">
        <div className="container">
          <div style={{
            width: (isMobile && t.faqs) ? '100vw' : '100%',
            marginLeft: (isMobile && t.faqs) ? 'calc(-50vw + 50%)' : '0',
            marginRight: (isMobile && t.faqs) ? 'calc(-50vw + 50%)' : '0',
            backgroundImage: (isMobile && t.faqs) ? `url(${fondoFaq})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingTop: (isMobile && t.faqs) ? '40px' : '0',
            paddingBottom: (isMobile && t.faqs) ? '40px' : '0',
            boxSizing: 'border-box'
          }}>
            {/* Main Title */}
          <h2 className="bridge-title text-neon" style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            paddingTop: isMobile ? '20px' : '60px',
            marginBottom: isShowcase ? '60px' : '40px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '-1px',
            textAlign: 'center'
          }}>
            {t.title}
          </h2>

          {!isShowcase ? (
            /* --- CASE 1: Standard / Pitch / FAQ Content --- */
            <div className="standard-content" style={{
              textAlign: 'center',
              maxWidth: '960px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px'
            }}>
              {/* Legacy description if still used somewhere */}
              {t.description && !t.paragraphs && !t.faqs && (
                <p style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  lineHeight: '1.6',
                  maxWidth: '800px',
                  margin: '0 auto 40px',
                  fontWeight: '500'
                }}>
                  {t.description}
                </p>
              )}

              {/* FAQ Accordion Grid */}
              {t.faqs && (
                <div style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '20px',
                  textAlign: 'left',
                  alignItems: 'start',
                  boxSizing: 'border-box',
                  position: 'relative'
                }}>
                  {t.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="glass-card faq-card-grid"
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      style={{
                        padding: '24px',
                        cursor: 'pointer',
                        background: activeFaq === i ? 'rgba(218, 240, 19, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        border: activeFaq === i ? '1px solid #DAF013' : '1px solid rgba(215, 230, 255, 0.1)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        borderRadius: '16px',
                        boxShadow: activeFaq === i ? '0 10px 30px rgba(218, 240, 19, 0.15)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        height: 'auto',
                        minHeight: window.innerWidth < 768 ? 'auto' : (activeFaq === i ? 'auto' : '110px')
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                        <h4 className={activeFaq === i ? "text-neon" : ""} style={{
                          color: activeFaq === i ? undefined : 'rgba(255,255,255,0.9)',
                          margin: 0,
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          lineHeight: '1.4'
                        }}>
                          {faq.question}
                        </h4>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: activeFaq === i ? '#DAF013' : 'rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          flexShrink: 0
                        }}>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            style={{
                              transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                              transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                              display: 'block'
                            }}
                          >
                            <path
                              d="M7 2V12M2 7H12"
                              stroke={activeFaq === i ? '#050a0a' : '#DAF013'}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                      {activeFaq === i && (
                        <div style={{
                          height: 'auto',
                          opacity: 0,
                          animation: 'fadeIn 0.4s forwards'
                        }}>
                          <p style={{
                            marginTop: '20px',
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: '1.6',
                            fontSize: '0.95rem',
                            borderTop: '1px solid rgba(218, 240, 19, 0.2)',
                            paddingTop: '15px'
                          }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* New Paragraphs Pitch */}
              {t.paragraphs && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  textAlign: 'left',
                  width: '100%',
                }}>
                  {t.paragraphs.map((text, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'flex-start'
                    }}>
                      {/* Number indicator for numbered paragraphs */}
                      {text.trim().match(/^[123]\./) && (
                        <div style={{
                          minWidth: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: '#DAF013',
                          color: '#050a0a',
                          fontWeight: '900',
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          {text.trim().charAt(0)}
                        </div>
                      )}
                      <div style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                        lineHeight: '1.8',
                        margin: 0,
                        fontWeight: '400',
                        letterSpacing: '0.2px',
                        flex: 1,
                        whiteSpace: 'pre-line'
                      }}>
                        {formatText(text)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats if available */}
              {t.stats && (
                <div className="bridge-grid" style={{ marginTop: '20px' }}>
                  {t.stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                      <h3 className="stat-value">{stat.value}</h3>
                      <p className="stat-label">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Pitch CTA Button */}
              {t.cta && (
                <button
                  className="btn-glow"
                  onClick={() => window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank')}
                  style={{
                    marginTop: '20px',
                    padding: '20px 40px',
                    background: '#DAF013',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '900',
                    color: '#050a0a',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t.cta}
                </button>
              )}
            </div>
          ) : (
            /* --- CASE 2: Complex Showcase Bridge --- */
            <div className="showcase-content">
              {/* Testimonials Carousel Wrapper */}
              <div
                className="testimonials-carousel-wrapper"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={() => onTouchEnd(handleNext, handlePrev)}
              >
                <button className="carousel-control prev" onClick={handlePrev} aria-label="Previous">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6" /></svg>
                </button>

                <div className="testimonials-carousel-viewport">
                  <div
                    className={`testimonials-track ${!isTransitioning ? 'no-transition' : ''}`}
                    style={{
                      transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
                    }}
                  >
                    {extendedTestimonials.map((test, i) => (
                      <div key={i} className="testimonial-card-wrapper">
                        <div className="glass-card testimonial-card">
                          <div className="stars">
                            {[...Array(test.stars || 5)].map((_, si) => (
                              <span key={si} className="star">★</span>
                            ))}
                          </div>
                          <p className="testimonial-text">"{test.text}"</p>
                          <div className="user-profile">
                            <div className="avatar">
                              <img src={test.image} alt={test.name} />
                            </div>
                            <div className="user-info">
                              <h4 className="user-name">{test.name}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="carousel-control next" onClick={handleNext} aria-label="Next">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>

              {/* Secondary Title Divider */}
              <h3 className="section-subtitle" style={{
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '900',
                margin: '100px 0 50px 0',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}>
                {t.secondaryTitle}
              </h3>
              {/* Success Cases Carousel - Matching Testimonials Style */}
              {t.successCases && (
                <div 
                  className="testimonials-carousel-wrapper"
                  style={{ padding: isMobile ? '0 15px 80px' : '0 40px' }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => onTouchEnd(
                    () => setCaseIndex(prev => Math.min(t.successCases.length - (isMobile ? 1 : 3), prev + 1)),
                    () => setCaseIndex(prev => Math.max(0, prev - 1))
                  )}
                >
                  <button 
                    className="carousel-control prev" 
                    onClick={() => setCaseIndex(prev => Math.max(0, prev - 1))}
                    aria-label={lang === 'es' ? 'Anterior' : 'Previous'}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <div className="testimonials-carousel-viewport">
                    <div
                      className="testimonials-track"
                      style={{
                        transform: `translateX(-${caseIndex * (isMobile ? 100 : 33.333)}%)`
                      }}
                    >
                      {t.successCases.map((successCase, idx) => (
                        <div key={idx} className="testimonial-card-wrapper" style={{ flex: isMobile ? '0 0 100%' : '0 0 33.333%' }}>
                          <div 
                            className="glass-card" 
                            style={{ 
                              width: '100%', 
                              padding: '25px', 
                              borderRadius: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '20px',
                              textAlign: 'left'
                            }}
                          >
                            {/* Visual Side */}
                            <div style={{
                              borderRadius: '16px',
                              overflow: 'hidden',
                              height: isMobile ? '220px' : '260px',
                              position: 'relative',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img 
                                src={caseImages[idx % caseImages.length]} 
                                alt={successCase.name} 
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </div>


                            {/* Content Side */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                              <div>
                                <h4 className="text-neon" style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                                  SUCCESS STORY
                                </h4>
                                <h2 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '900', margin: '0 0 4px 0' }}>
                                  {successCase.name}
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
                                  {successCase.location}
                                </p>
                              </div>

                              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                                {successCase.description}
                              </p>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <h5 className="text-neon" style={{ fontSize: '0.75rem', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>
                                  {successCase.implementation ? (lang === 'es' ? 'Implementación' : 'Implementation') : (lang === 'es' ? 'Resultados' : 'Results')}
                                </h5>
                                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', whiteSpace: 'pre-line' }}>
                                  {successCase.implementation}
                                </div>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <h5 className="text-neon" style={{ fontSize: '0.75rem', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>
                                  Results
                                </h5>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '4px' }}>
                                  {parseResults(successCase.results).map((stat, statIdx) => (
                                    <div key={statIdx} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', textTransform: 'uppercase' }}>{stat.label}</div>
                                      <div className="text-neon" style={{ fontSize: '0.9rem', fontWeight: '900' }}>{stat.value}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open('https://link.apisystem.tech/widget/survey/pO8Nq6VBYNKCtYjNcOQC', '_blank');
                                }}
                                style={{
                                  marginTop: '8px',
                                  padding: '12px 24px',
                                  background: '#DAF013',
                                  border: 'none',
                                  borderRadius: '10px',
                                  fontWeight: '900',
                                  color: '#050a0a',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  textTransform: 'uppercase',
                                  transition: 'all 0.3s ease',
                                  alignSelf: 'center'
                                }}
                              >
                                {lang === 'es' ? 'Ver Caso Completo' : 'View Full Case'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="carousel-control next" 
                    onClick={() => setCaseIndex(prev => Math.min(t.successCases.length - (isMobile ? 1 : 3), prev + 1))}
                    aria-label={lang === 'es' ? 'Siguiente' : 'Next'}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Success Story Modal */}
              {showCaseDetails && (
                <div
                  className="case-modal-overlay"
                  onClick={() => setShowCaseDetails(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99999,
                    background: 'rgba(0,0,0,0.92)',
                    backdropFilter: 'blur(15px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}
                >
                  <div
                    className="case-modal-content glass-panel"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      maxHeight: '90vh',
                      maxWidth: '1000px',
                      width: '100%',
                      overflowY: 'auto',
                      padding: '50px',
                      position: 'relative',
                      border: '1px solid rgba(218, 240, 19, 0.2)',
                      overflow: 'hidden'
                    }}
                  >
                    <Particles count={isMobile ? 12 : 20} />
                    <button
                      className="modal-close-btn"
                      onClick={() => setShowCaseDetails(false)}
                      aria-label="Close modal"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    <div style={{ textAlign: 'left' }}>
                      <h4 className="text-neon" style={{ letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>
                        {t.featuredCase.badge}
                      </h4>
                      <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', margin: '0 0 30px' }}>
                        {t.featuredCase.title}
                      </h1>

                      {/* Main Gallery - Showing only requested bottom row images */}
                      <div className="modal-gallery" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '15px',
                        marginBottom: '40px'
                      }}>
                        {t.featuredCase.gallery.slice(2, 4).map((img, i) => (
                          <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', height: '300px' }}>
                            <img
                              src={img}
                              alt={`Gallery ${i}`}
                              className="image-crop-browser"
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="story-content" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', lineHeight: '1.8' }}>
                        {t.featuredCase.story.map((para, idx) => (
                          <p key={idx} style={{ marginBottom: '25px' }}>{para}</p>
                        ))}
                      </div>

                      {/* Highlights Recap */}
                      <div style={{
                        marginTop: '50px',
                        padding: '30px',
                        background: 'rgba(218, 240, 19, 0.05)',
                        borderRadius: '16px',
                        border: '1px solid rgba(218, 240, 19, 0.1)'
                      }}>
                        <h3 style={{ color: 'white', marginBottom: '20px' }}>Logros del Proyecto</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                          {t.featuredCase.items.map((item, idx) => (
                            <div key={idx} className="text-neon" style={{ 
                              fontWeight: '700',
                              display: 'flex',
                              gap: '8px',
                              alignItems: 'flex-start'
                            }}>
                              <span style={{ marginTop: '2px' }}>✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
      <Particles count={isMobile ? 15 : 25} />
    </section>
  );
}
