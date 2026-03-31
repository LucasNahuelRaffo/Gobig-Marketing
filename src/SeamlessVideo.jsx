import { useEffect, useRef, useState } from 'react';

export default function SeamlessVideo({ src, poster, crossfadeDuration = 1.5 }) {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1);

  useEffect(() => {
    let reqId;
    const checkTime = () => {
      const v1 = video1Ref.current;
      const v2 = video2Ref.current;
      if (!v1 || !v2) return;

      const currentV = activeVideo === 1 ? v1 : v2;
      const nextV = activeVideo === 1 ? v2 : v1;

      // When the current video approaches its end minus the crossfade duration
      if (currentV.duration && currentV.currentTime >= currentV.duration - crossfadeDuration) {
        // Prepare and play the next video from the beginning
        if (nextV.paused) {
          nextV.currentTime = 0;
          nextV.play().catch(() => {});
        }
        
        // Calculate the crossfade progress (0 to 1)
        const overlap = currentV.currentTime - (currentV.duration - crossfadeDuration);
        const progress = Math.min(Math.max(overlap / crossfadeDuration, 0), 1);
        
        // Apply opacity crossfade
        nextV.style.opacity = progress;
        currentV.style.opacity = 1 - progress;

        // Once the transition is fully complete or the current video ends
        if (progress >= 1 || currentV.ended) {
          currentV.pause();
          currentV.currentTime = 0;
          currentV.style.opacity = 0;
          nextV.style.opacity = 1;
          // Swap the active video tracking
          setActiveVideo(activeVideo === 1 ? 2 : 1);
        }
      }

      reqId = requestAnimationFrame(checkTime);
    };

    reqId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(reqId);
  }, [activeVideo, crossfadeDuration]);

  return (
    <div className="section-bg-wrapper" style={poster ? { backgroundImage: `url(${poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      <video
        ref={video1Ref}
        src={src}
        poster={poster}
        preload="auto"
        autoPlay
        muted
        defaultMuted
        playsInline
        className="section-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 1,
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          willChange: 'opacity'
        }}
      />
      <video
        ref={video2Ref}
        src={src}
        preload="auto"
        muted
        defaultMuted
        playsInline
        className="section-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          willChange: 'opacity'
        }}
      />
    </div>
  );
}
