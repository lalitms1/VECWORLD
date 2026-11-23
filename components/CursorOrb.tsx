'use client';
import { useEffect, useRef } from 'react';

export default function CursorOrb(){
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let raf=0, tx=0, ty=0, x=0, y=0;
    const move=(e:MouseEvent)=>{tx=e.clientX;ty=e.clientY;};
    const down=()=>document.body.classList.add('cursor-clicking');
    const up=()=>document.body.classList.remove('cursor-clicking');
    const over=(e:MouseEvent)=>{
      const el=(e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null;
      const text=el?.dataset.cursor || '';
      document.body.classList.toggle('cursor-active',!!el);
      if(labelRef.current){ labelRef.current.textContent=text; labelRef.current.classList.toggle('show',!!text); }
    };
    const loop=()=>{x += (tx-x)*.18; y += (ty-y)*.18; if(ringRef.current) ringRef.current.style.transform=`translate3d(${x}px,${y}px,0)`; if(dotRef.current) dotRef.current.style.transform=`translate3d(${tx}px,${ty}px,0)`; if(labelRef.current) labelRef.current.style.transform=`translate3d(${x+18}px,${y+18}px,0)`; raf=requestAnimationFrame(loop)};
    window.addEventListener('mousemove',move); window.addEventListener('mouseover',over); window.addEventListener('mousedown',down); window.addEventListener('mouseup',up); raf=requestAnimationFrame(loop);
    return()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseover',over);window.removeEventListener('mousedown',down);window.removeEventListener('mouseup',up);cancelAnimationFrame(raf);};
  },[]);
  return <>
    <div ref={ringRef} className="cursor-orb-ring" aria-hidden="true" />
    <div ref={dotRef} className="cursor-orb-dot" aria-hidden="true" />
    <div ref={labelRef} className="cursor-orb-label" aria-hidden="true" />
  </>;
}
