'use client';

import { useRef, useState } from 'react';
import { media } from '../config/media';

export default function VideoExperience() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const available = media.discoveryReel !== '/assets/video-placeholder.mp4';

  const toggle = async () => {
    if (!ref.current || !available) return;
    if (ref.current.paused) {
      await ref.current.play();
      setPlaying(true);
    } else {
      ref.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="video-section" id="experience-video">
      <div className="video-copy">
        <div className="eyebrow">See VEC in motion</div>
        <h2>Don&apos;t read about it.<br /><span style={{color:'#e9cd84'}}>Watch it.</span></h2>
        <p>A glimpse of the VEC experience — characters, wonder, discovery, worlds and the mysteries waiting beyond the screen.</p>
        <div className="video-meta"><span><strong>VEC Discovery Reel</strong></span><span>Play · Pause · Explore</span></div>
      </div>
      <div>
        <div className={`video-frame ${playing ? 'playing' : ''}`} onClick={toggle}>
          <video ref={ref} preload="metadata" playsInline muted controls={playing}>
            {available && <source src={media.discoveryReel} type="video/mp4" />}
          </video>
          <div className="video-play" />
          {!available && <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color:'rgba(255,255,255,.35)',fontSize:12}}>Connect VEC media storage to play the reel.</div>}
        </div>
        <div className="video-meta"><span>VEC · VISUALISE EVERY CONCEPT</span><span>REAL MEDIA · CDN READY</span></div>
      </div>
    </section>
  );
}
