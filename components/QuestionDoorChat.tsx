'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type Question = {
  id: string;
  title: string;
  creature: string;
  answer: string;
  position: string;
};

const questions: Question[] = [
  { id:'vec', title:'What exactly is VEC?', creature:'The Keeper', position:'q-owl', answer:'VEC is a cinematic learning studio built around stories, meaningful experiences and discovery — so concepts become part of a journey rather than a lecture.' },
  { id:'different', title:'How is VEC different?', creature:'The Explorer', position:'q-fox', answer:'VEC begins with experience and curiosity. A learner notices, wonders, explores, experiments and discovers before the answer is named.' },
  { id:'parents', title:'I’m a parent. Where do we begin?', creature:'The Guide', position:'q-rabbit', answer:'Begin with the stories. The goal is to build trust through warmth, wonder and experiences children want to revisit.' },
  { id:'schools', title:'Can a school work with VEC?', creature:'The Scholar', position:'q-turtle', answer:'VEC is being built toward collaboration with schools, boards and colleges through story-led content, curriculum alignment, technology and interactive learning.' },
  { id:'partner', title:'Can we build something with VEC?', creature:'The Maker', position:'q-deer', answer:'Partnership paths can grow across education, technology, media, platforms and creative collaboration as the VEC ecosystem evolves.' },
  { id:'lumora', title:'What is Lumora?', creature:'The Dreamer', position:'q-dragon', answer:'Lumora is a living VEC world of stories, nature, questions, characters and mysteries where discovery unfolds naturally.' },
];

function getReply(message: string) {
  const q = message.toLowerCase();
  if (q.includes('school') || q.includes('board') || q.includes('college')) return questions[3];
  if (q.includes('parent') || q.includes('child') || q.includes('kid')) return questions[2];
  if (q.includes('partner') || q.includes('collabor') || q.includes('build')) return questions[4];
  if (q.includes('lumora') || q.includes('universe') || q.includes('world')) return questions[5];
  if (q.includes('different') || q.includes('teach') || q.includes('learn')) return questions[1];
  return questions[0];
}

type TrackedAudio = HTMLAudioElement;

export default function QuestionDoorChat() {
  const [phase, setPhase] = useState<'closed'|'opening'|'open'|'closing'>('closed');
  const [soundOn, setSoundOn] = useState(true);
  const [selected, setSelected] = useState<Question | null>(null);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [rippleBlocked, setRippleBlocked] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const ambientRef = useRef<TrackedAudio | null>(null);
  const audiosRef = useRef<Set<TrackedAudio>>(new Set());
  const timersRef = useRef<number[]>([]);
  const closeTimerRef = useRef<number | null>(null);
  const doorCycleRef = useRef(0);
  const soundRef = useRef(true);

  const chamberVisible = phase === 'open' || phase === 'closing';
  const doorBusy = phase === 'opening' || phase === 'closing';

  useEffect(() => { soundRef.current = soundOn; }, [soundOn]);
  useEffect(() => () => {
    timersRef.current.forEach(window.clearTimeout);
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    audiosRef.current.forEach((a) => { a.pause(); a.currentTime = 0; });
    timersRef.current = [];
    closeTimerRef.current = null;
    audiosRef.current.clear();
  }, []);

  function clearPendingTimers() {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
  }

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function stopAllAudio() {
    audiosRef.current.forEach((audio) => { audio.pause(); audio.currentTime = 0; });
    audiosRef.current.clear();
    ambientRef.current = null;
  }

  function play(src: string, volume = 0.7) {
    if (!soundRef.current) return null;
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = volume;
    audiosRef.current.add(audio);
    audio.addEventListener('ended', () => audiosRef.current.delete(audio), { once: true });
    void audio.play().catch(() => audiosRef.current.delete(audio));
    return audio;
  }

  function schedule(fn: () => void, delay: number) {
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((id) => id !== timer);
      fn();
    }, delay);
    timersRef.current.push(timer);
  }

  function startAmbient() {
    if (!soundRef.current) return;
    ambientRef.current?.pause();
    const ambient = new Audio('/assets/audio/chamber-ambient.wav');
    ambient.loop = true;
    ambient.volume = 0.10;
    ambient.preload = 'auto';
    ambientRef.current = ambient;
    audiosRef.current.add(ambient);
    void ambient.play().catch(() => {});
  }

  function triggerRipple() {
    if (phase !== 'open') return;
    setRippleActive(true);
    setRippleBlocked(true);
    play('/assets/audio/ripple-whisper.wav', 0.42);
    schedule(() => play('/assets/audio/villain-manifest.wav', 0.60), 180);
    schedule(() => { setRippleActive(false); setRippleBlocked(false); }, 3200);
  }

  useEffect(() => {
    if (phase !== 'open') return;
    clearPendingTimers();
    schedule(triggerRipple, 6200);
    const repeat = () => {
      if (phase !== 'open') return;
      triggerRipple();
      schedule(repeat, 15000 + Math.random() * 7000);
    };
    schedule(repeat, 16500 + Math.random() * 5000);
    return clearPendingTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function openDoor() {
    if (phase !== 'closed') return;
    clearPendingTimers();
    clearCloseTimer();
    doorCycleRef.current += 1;
    setSelected(null); setReply(''); setMessage('');
    setRippleActive(false); setRippleBlocked(false);
    setPhase('opening');
    play('/assets/audio/door-open-ancient-real.wav', 0.94);
    // Each opening is a fresh cycle: keep the gate mounted and remount the physical door art.
    schedule(() => { setPhase('open'); startAmbient(); }, 2250);
  }

  function closeDoor() {
    if (phase !== 'open') return;
    clearPendingTimers();
    clearCloseTimer();
    setRippleActive(false); setRippleBlocked(false);
    ambientRef.current?.pause(); ambientRef.current = null;
    setPhase('closing');
    play('/assets/audio/door-close-ancient-real.wav', 0.96);
    // Do not depend on the shared ripple timer queue: this close completion is authoritative.
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      stopAllAudio();
      setSelected(null); setReply(''); setMessage('');
      setRippleActive(false); setRippleBlocked(false);
      setPhase('closed');
    }, 2250);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && phase === 'open') closeDoor(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function choose(question: Question) {
    if (phase !== 'open') return;
    play('/assets/audio/parchment-unfurl.wav', 0.32);
    schedule(() => play('/assets/audio/question-select.wav', 0.42), 130);
    setSelected(question); setReply(question.answer);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = message.trim();
    if (!clean || phase !== 'open') return;
    play('/assets/audio/send.wav', 0.50);
    const chosen = getReply(clean);
    setSelected(chosen); setReply(chosen.answer); setMessage('');
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next); soundRef.current = next;
    clearPendingTimers();
    if (!next) { stopAllAudio(); return; }
    if (phase === 'open') {
      startAmbient();
      play('/assets/audio/question-select.wav', 0.20);
      schedule(triggerRipple, 12000 + Math.random() * 6000);
    }
  }

  return (
    <section className={`question-door-section ${chamberVisible ? 'is-open' : ''} phase-${phase}`} id="questions" aria-label="VEC hidden question chamber">
      <div className="door-aura" aria-hidden="true" />
      <div className={`door-scene-wrap phase-${phase}`}>
        <div className="door-scene-frame" aria-hidden="true" />
        <div className="door-artboard">
          <div key={`door-physical-${doorCycleRef.current}`} className="door-physical" aria-hidden="true">
            <div className="door-leaf door-leaf-left" />
            <div className="door-leaf door-leaf-right" />
            <div className="door-seam-light" />
          </div>
          <button key={`door-portal-${doorCycleRef.current}`} className="door-portal" onClick={openDoor} type="button" aria-label="Open the VEC ancient rock gate" disabled={phase !== 'closed'}>
            <span className="door-click-word">Open</span>
          </button>
          <div className="door-spark-cue" aria-hidden="true"><span /></div>
        </div>
        <div className="door-sidecopy"><div className="eyebrow">A place for questions</div><p>Something here asks to be discovered.</p><span>✦</span></div>
        <div className="door-orbit-caption" aria-hidden="true">Curiosity leaves traces.</div>
      </div>
      {chamberVisible && (
        <div className={`question-chamber ${phase === 'closing' ? 'is-closing' : 'is-entering'}`} role="dialog" aria-modal="true" aria-label="VEC Question Chamber">
          <div className="chamber-world" aria-hidden="true" />
          <div className="chamber-vignette" aria-hidden="true" />
          <div className={`chamber-ripple-trace ${rippleActive ? 'is-rippling' : ''}`} aria-hidden="true" />
          <div className={`chamber-villain-echo ${rippleActive ? 'is-visible' : ''}`} aria-hidden="true" />
          <div className={`chamber-spark ${rippleBlocked ? 'ripple-blocked' : ''}`} aria-hidden="true"><span /></div>
          <div className="chamber-controls">
            <button className="sound-toggle" onClick={toggleSound} type="button" aria-pressed={soundOn} title={soundOn ? 'Turn chamber sound off' : 'Turn chamber sound on'}><span>{soundOn ? '♫' : '🔇'}</span><small>{soundOn ? 'sound' : 'off'}</small></button>
            <button className="chamber-close" onClick={closeDoor} type="button" aria-label="Close chamber" title="Close the chamber">×</button>
          </div>
          <div className="chamber-question-legend"><small>THE CHAMBER REMEMBERS</small><strong>Choose a question.<br />See what awakens.</strong></div>
          <div className="world-questions" aria-label="Questions carried by the chamber creatures">
            {questions.map((question) => <button key={question.id} type="button" className={`world-question ${question.position} ${selected?.id === question.id ? 'is-chosen' : ''}`} onClick={() => choose(question)} onMouseEnter={() => soundRef.current && play('/assets/audio/question-hover.wav', 0.11)} aria-label={question.title}><span className="question-engraving"><b>{question.title}</b><small>{question.creature}</small></span></button>)}
          </div>
          <div className={`chamber-answer-scroll ${reply ? 'has-answer' : ''}`} aria-live="polite"><div className="scroll-seal">✦</div><div><small>{selected?.creature || 'The chamber'}</small><p>{reply || 'The chamber is listening.'}</p></div></div>
          <form className="ancient-question-input" onSubmit={submit}><span className="quill-mark" aria-hidden="true">✎</span><input value={message} onChange={(e) => setMessage(e.target.value)} aria-label="Ask your own question" placeholder="Ask your own question…" /><button type="submit" aria-label="Ask question">➜</button></form>
        </div>
      )}
    </section>
  );
}
