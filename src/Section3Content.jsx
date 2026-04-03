import React, { useRef } from 'react';
import MarqueeLogoScroller from './MarqueeLogoScroller';

import logoBarbara from './img/Logos de Empresas/Barbara Chavez.png';
import logoOrlando from './img/Logos de Empresas/Dr. Orlando Santillan.png';
import logoHuawei from './img/Logos de Empresas/Huawei.png';
import logoLuar from './img/Logos de Empresas/Luar.png';
import logoNovocentro from './img/Logos de Empresas/Novocentro.png';
import logoRenuev from './img/Logos de Empresas/Renuev.png';

const partners = [
  { src: logoBarbara, alt: 'Barbara Chavez' },
  { src: logoOrlando, alt: 'Dr. Orlando Santillan' },
  { src: logoHuawei, alt: 'Huawei' },
  { src: logoLuar, alt: 'Luar' },
  { src: logoNovocentro, alt: 'Novocentro' },
  { src: logoRenuev, alt: 'Renuev' },
];

export default function Section3Content({ t }) {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <MarqueeLogoScroller
        title={t.marquee}
        description={t.marqueeSub}
        logos={partners}
        speed="normal"
      />
    </div>
  );
}
