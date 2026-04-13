// Utility function to get WebP image with fallback to original
export const getWebpImage = (path) => {
  // Check if browser supports WebP
  const webpSupport = (() => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  })();
  
  // If WebP is supported, return WebP version
  if (webpSupport) {
    const webpPath = path.replace(/\.(png|jpe?g)$/i, '.webp');
    return {
      src: webpPath,
      type: 'image/webp'
    };
  }
  
  // Fallback to original image
  return {
    src: path,
    type: path.includes('.png') ? 'image/png' : 'image/jpeg'
  };
};

// Utility function to get responsive image sources
export const getResponsiveImageSources = (path) => {
  const webpSupport = (() => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  })();
  
  const sources = [];
  
  // Add WebP sources if supported
  if (webpSupport) {
    const webpPath = path.replace(/\.(png|jpe?g)$/i, '.webp');
    sources.push({
      src: webpPath,
      type: 'image/webp'
    });
  }
  
  // Always add original as fallback
  sources.push({
    src: path,
    type: path.includes('.png') ? 'image/png' : 'image/jpeg'
  });
  
  return sources;
};