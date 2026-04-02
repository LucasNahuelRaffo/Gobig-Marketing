import React, { useEffect, useRef } from 'react';

/**
 * VturbPlayer - Embeds a Vturb smartplayer dynamically.
 * Only one player plays at a time — clicking one pauses the others.
 * @param {string} playerId - The Vturb player ID
 * @param {string} accountId - The Vturb account ID (default provided)
 * @param {object} style - Additional styles for the container
 */
export default function VturbPlayer({ 
  playerId, 
  accountId = 'a8040552-f454-4b04-98b0-4fcfc4315981',
  style = {} 
}) {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!playerId || scriptLoadedRef.current) return;

    // Load Vturb script
    const script = document.createElement('script');
    script.src = `https://scripts.converteai.net/${accountId}/players/${playerId}/v4/player.js`;
    script.async = true;
    document.head.appendChild(script);
    scriptLoadedRef.current = true;

    // Wait for the custom element to be ready, then listen for play
    const tryAttachPlayListener = () => {
      const el = document.getElementById(`vid-${playerId}`);
      if (!el) {
        setTimeout(tryAttachPlayListener, 500);
        return;
      }

      // When THIS player fires a play event, pause all others
      const onPlay = () => {
        window.dispatchEvent(new CustomEvent('vturb:play', {
          detail: { playerId }
        }));
      };

      // Vturb fires 'play' on the element itself
      el.addEventListener('play', onPlay);
      // Also intercept clicks on the play button overlay (Vturb uses mutation)
      el.addEventListener('click', onPlay);
    };

    script.addEventListener('load', () => {
      setTimeout(tryAttachPlayListener, 800);
    });

    // Listen for OTHER players starting — pause this one
    const onOtherPlay = (e) => {
      if (e.detail.playerId === playerId) return; // ignore self
      const el = document.getElementById(`vid-${playerId}`);
      if (el) {
        // Try standard pause methods Vturb exposes
        try {
          if (typeof el.pause === 'function') el.pause();
          // Vturb also exposes video element inside shadow DOM
          const video = el.querySelector('video') || el.shadowRoot?.querySelector('video');
          if (video) video.pause();
        } catch (err) { /* ignore */ }
      }
    };

    window.addEventListener('vturb:play', onOtherPlay);

    return () => {
      try { document.head.removeChild(script); } catch (e) { /* ignore */ }
      window.removeEventListener('vturb:play', onOtherPlay);
      scriptLoadedRef.current = false;
    };
  }, [playerId, accountId]);

  return (
    <div ref={containerRef} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', ...style }}>
      <vturb-smartplayer
        id={`vid-${playerId}`}
        autoplay="false"
        style={{ display: 'block', margin: '0 auto', width: '100%' }}
      />
    </div>
  );
}
