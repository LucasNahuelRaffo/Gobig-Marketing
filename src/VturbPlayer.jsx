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
  const instanceId = useRef(Math.random().toString(36).substring(7));

  useEffect(() => {
    if (!playerId) return;

    // Use a global tracker to avoid double-appending the same script
    const scriptId = `vturb-script-${playerId}`;
    let vturbScript = document.getElementById(scriptId);

    if (!vturbScript) {
      vturbScript = document.createElement('script');
      vturbScript.id = scriptId;
      vturbScript.src = `https://scripts.converteai.net/${accountId}/players/${playerId}/v4/player.js`;
      vturbScript.async = true;
      document.head.appendChild(vturbScript);
    }

    let pollingTimeoutId = null;

    const tryAttachPlayListener = (retries = 0) => {
      if (retries >= 30) return;
      const el = containerRef.current?.querySelector('vturb-smartplayer');
      if (!el) {
        pollingTimeoutId = setTimeout(() => tryAttachPlayListener(retries + 1), 500);
        return;
      }

      const onPlay = () => {
        window.dispatchEvent(new CustomEvent('vturb:play', {
          detail: { playerId, instanceId: instanceId.current }
        }));
      };

      el.addEventListener('play', onPlay);
      el.addEventListener('click', onPlay);
    };

    vturbScript.addEventListener('load', () => {
      pollingTimeoutId = setTimeout(() => tryAttachPlayListener(0), 800);
    });

    // If script already loaded, start polling immediately
    if (vturbScript && vturbScript.dataset.loaded === 'true') {
      tryAttachPlayListener(0);
    } else {
        vturbScript.addEventListener('load', () => {
            vturbScript.dataset.loaded = 'true';
            pollingTimeoutId = setTimeout(() => tryAttachPlayListener(0), 800);
        });
    }

    const onOtherPlay = (e) => {
      // Pause if it's the same player ID but DIFFERENT instance, or just any other player
      if (e.detail.instanceId === instanceId.current) return;
      const el = containerRef.current?.querySelector('vturb-smartplayer');
      if (el) {
        try {
          if (typeof el.pause === 'function') el.pause();
          const video = el.querySelector('video') || el.shadowRoot?.querySelector('video');
          if (video) video.pause();
        } catch (err) { /* ignore */ }
      }
    };

    window.addEventListener('vturb:play', onOtherPlay);

    return () => {
      clearTimeout(pollingTimeoutId);
      window.removeEventListener('vturb:play', onOtherPlay);
    };
  }, [playerId, accountId]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative', ...style }}
    >
      <vturb-smartplayer
        id={`vid-${playerId}`}
        autoplay="false"
        style={{ display: 'block', margin: '0 auto', width: '100%' }}
      />
    </div>
  );
}
