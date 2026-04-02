import React from 'react';

const MarqueeLogoScroller = React.forwardRef(({ title, description, logos, speed = 'normal', className = '', ...props }, ref) => {
  // Map speed prop to animation duration
  const durationMap = {
    normal: '40s',
    slow: '80s',
    fast: '20s',
  };
  const animationDuration = durationMap[speed];

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      
      <section
        ref={ref}
        aria-label={title}
        className={`s6-anim ${className}`}
        style={{
          width: '100%',
          color: 'white',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          background: 'rgba(15, 5, 20, 0.4)',
          backdropFilter: 'blur(10px)',
          marginBottom: '20px' // Space before the comparison boxes
        }}
        {...props}
      >
        {/* Header Section */}
        <div style={{
          padding: '15px 40px', // Pulled up: reduced from 30px
          display: 'flex',
          flexDirection: 'column',
          gap: '8px', // Tighter
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            letterSpacing: '-1px',
            margin: 0,
            maxWidth: '100%',
            lineHeight: '1.2'
          }}>
            {title}
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            margin: 0,
            maxWidth: '600px',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            {description}
          </p>
        </div>

        {/* Marquee Section */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div 
            className="marquee-track"
            style={{
              display: 'flex',
              width: 'max-content',
              alignItems: 'center',
              gap: '24px',
              padding: '16px 24px 16px 0', // Pulled up: reduced from 24px
              animation: `marquee ${animationDuration} linear infinite`,
            }}
          >
            {/* Render logos twice to create a seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="marquee-logo-card"
                style={{
                  position: 'relative',
                  height: '120px', // Enlarged as requested
                  width: '210px',  // Slightly wider to maintain ratio
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  overflow: 'hidden'
                }}
              >
                {/* Logo Image */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    position: 'relative',
                    height: '85%', // Slightly less than 100% so we have room for the hover scale without clipping
                    width: '85%',
                    objectFit: 'contain',
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  className="marquee-logo-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});

MarqueeLogoScroller.displayName = 'MarqueeLogoScroller';

export default MarqueeLogoScroller;
