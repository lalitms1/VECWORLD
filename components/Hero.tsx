'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function playHero(src: string, volume: number) {
  const audio = new Audio(src);
  audio.volume = volume;
  void audio.play().catch(() => {});
  return audio;
}

export default function Hero({onExplore}:{onExplore?:()=>void}) {
  const [sound, setSound] = useState(true);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Warm the ancient-door asset after the hero has rendered so the transition feels immediate
    // without making the first paint wait for the gate artwork.
    const warm = () => { const img = new window.Image(); img.src = '/assets/ancient-door-world.webp'; };
    const t = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(t);
  }, []);

  const soundCue = () => {
    if (!sound) return;
    playHero('/assets/audio/question-hover.wav', 0.22);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <Image src="/assets/universe/lumora.webp" alt="Lumora, the VEC universe" fill priority sizes="(max-width: 768px) 100vw, 100vw" />
      </div>
      <div className="hero-haze" aria-hidden="true" />
      <div className="hero-journal" aria-hidden="true">
        <Image src="/assets/ui/anvaya-journal.webp" alt="" fill sizes="260px" />
      </div>
      <div ref={sparkRef} className="hero-spark" aria-hidden="true">
        <span />
      </div>
      <div className="hero-copy">
        <div className="eyebrow">VEC STUDIOS · A CINEMATIC LEARNING STUDIO</div>
        <h1>Make curiosity<br /><em>worth following.</em></h1>
        <p>Immersive stories, meaningful experiences and worlds where discovery is part of the journey.</p>
        <div className="hero-actions">
          <a className="hero-cta" href="#explore" data-cursor="Explore" onMouseEnter={soundCue} onClick={(e)=>{ if(onExplore){ e.preventDefault(); onExplore(); } }}>Enter the VEC world <b>↓</b></a>
          <button className="hero-sound" type="button" onClick={() => setSound(v => !v)} aria-pressed={sound}>
            <span>{sound ? '♫' : '×'}</span>{sound ? 'Sound on' : 'Sound off'}
          </button>
        </div>
      </div>
      <div className="hero-mini"><strong>01</strong><span>Wonder · Discovery · Application</span></div>
    </section>
  );
}
