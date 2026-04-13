import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setError(true);

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!window.IntersectionObserver) {
      // Fallback for browsers that don't support IntersectionObserver
      const img = imgRef.current;
      if (img && img.complete) {
        setIsLoaded(true);
      }
      return;
    }

    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Load the image when it enters the viewport
          img.src = src;
          observer.disconnect();
        }
      });
    });

    observer.observe(img);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src]);

  // Set initial src to a placeholder or empty string for true lazy loading
  const displaySrc = !isLoaded && !error && loading === 'lazy' ? '' : src;

  return (
    <img
      ref={imgRef}
      src={displaySrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      {...props}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: isLoaded ? 'opacity 0.3s ease-in-out' : 'none',
        ...(props.style || {})
      }}
    />
  );
};

export default LazyImage;