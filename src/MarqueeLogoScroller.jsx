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
          overflow: 'hidden',
          marginBottom: '20px' // Space before the comparison boxes
        }}
        {...props}
      >
        {/* Header Section */}
        <div style={{
          padding: '30px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            letterSpacing: '-1px',
            margin: 0,
            maxWidth: '500px',
            lineHeight: '1.2'
          }}>
            {title}
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            margin: 0,
            maxWidth: '400px',
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
              padding: '24px 24px 24px 0',
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
                  height: '100px',
                  width: '180px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                {/* Gradient background revealed on hover */}
                <div
                  className="marquee-gradient"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    transform: 'scale(1.5)',
                    transition: 'all 0.6s ease-out',
                    background: `linear-gradient(to bottom right, ${logo.gradient.from}, ${logo.gradient.via}, ${logo.gradient.to})`
                  }}
                />
                {/* Logo Image */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    position: 'relative',
                    height: '50%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'grayscale(1) opacity(0.6)', // Elegant dimmed gray initially
                    transition: 'filter 0.5s ease-out'
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
