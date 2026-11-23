'use client';

import { useEffect, useState } from 'react';

export default function RipplePulse() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer: number;
    const schedule = () => {
      const delay = 11000 + Math.random() * 12000;
      timer = window.setTimeout(() => {
        setActive(true);
        window.setTimeout(() => {
          setActive(false);
          schedule();
        }, 1900);
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`ripple-event ${active ? 'is-active' : ''}`} aria-hidden="true">
      <div className="ripple-ring ripple-ring-one" />
      <div className="ripple-ring ripple-ring-two" />
      <div className="ripple-fog" />
      <div className="ripple-villain" />
    </div>
  );
}
