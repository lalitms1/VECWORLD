'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { social } from '../config/media';
import { site } from '../config/site';
import QuestionDoorChat from './QuestionDoorChat';
import CursorOrb from './CursorOrb';
import EnquiryForm from './EnquiryForm';

type View = 'home' | 'about' | 'approach' | 'explore' | 'play' | 'journal' | 'audiences' | 'studio' | 'enquiry' | 'contact';

const viewPaths: Record<View, string> = {
  home: '/', about: '/about', approach: '/how-we-learn', explore: '/explore', play: '/play', journal: '/journal',
  audiences: '/for-you', studio: '/studio', enquiry: '/enquiry', contact: '/contact',
};
const pathViews: Record<string, View> = {
  '/': 'home', '/about': 'about', '/how-we-learn': 'approach', '/explore': 'explore', '/play': 'play', '/journal': 'journal',
  '/for-you': 'audiences', '/studio': 'studio', '/enquiry': 'enquiry', '/contact': 'contact',
};

type PhysicalKitPublic = { id: string; slug?: string; title: string; category: string; summary: string; description?: string; stage: string; price?: number; enquiryLabel?: string; imageUrl?: string; galleryImages?: string[] };

type CMSContent = {
  configured?: boolean;
  settings?: {
    homeEyebrow?: string; homeLine1?: string; homeEmphasis?: string; homeDescription?: string;
    aboutHeadline?: string; aboutEmphasis?: string; aboutDescription?: string;
    approachHeadline?: string; approachEmphasis?: string; approachDescription?: string;
    studioHeadline?: string; studioEmphasis?: string; studioDescription?: string;
    contactEmail?: string; contactPhone?: string;
  } | null;
  learningAreas?: Array<{symbol:string;title:string;teaser:string}>;
  pathways?: Array<{key:string;symbol:string;title:string;microcopy:string;description?:string}>;
  glimpses?: Array<{imageUrl:string;label:string;caption:string;altText?:string}>;
  experiences?: Array<{title:string;category:string;summary:string;thumbnailUrl?:string;videoUrl?:string;videoFileUrl?:string;externalUrl?:string}>;
  physicalKits?: PhysicalKitPublic[];
  journalArticles?: Array<{id:string;title:string;slug:string;category:string;excerpt:string;authorName?:string;publishedOn?:string;readingMinutes?:number;coverUrl?:string}>;
  updates?: Array<{title:string;summary:string;publishedOn?:string;coverUrl?:string}>;
};

const navItems: Array<[View, string]> = [
  ['about', 'About'],
  ['approach', 'How'],
  ['explore', 'Explore'],
  ['play', 'Play'],
  ['journal', 'Journal'],
  ['audiences', 'For You'],
  ['studio', 'Studio'],
  ['enquiry', 'Enquiry'],
  ['contact', 'Contact'],
];

const subjectWorlds = [
  ['✦', 'Mathematics', 'patterns · numbers · logic'],
  ['◒', 'Science', 'nature · matter · energy'],
  ['◌', 'Physics', 'motion · light · space'],
  ['◈', 'Chemistry', 'materials · change · reaction'],
  ['◉', 'Biology', 'life · ecosystems · bodies'],
  ['⌁', 'History', 'people · places · discoveries'],
  ['⌖', 'Geography', 'earth · places · cultures'],
  ['❦', 'Language', 'words · stories · expression'],
  ['◇', 'Art & Music', 'making · rhythm · imagination'],
  ['∞', 'Life & World', 'observation · choices · connection'],
];

const gateways = [
  ['wonder', '✦', 'Wonder', 'A space to discover'],
  ['home', '◉', 'At home', 'Curiosity beyond the screen'],
  ['learn', '⌂', 'Learning spaces', 'Experiences that deepen understanding'],
  ['institution', '◈', 'Institutions', 'Content built to travel further'],
  ['build', '∞', 'Build with VEC', 'Creative and educational collaboration'],
];

const glimpses: Array<[string, string, string, string]> = [
  ['/assets/characters/maya.webp', 'Maya', 'At the centre of curiosity.', 'Maya, a young explorer discovering the world through questions'],
  ['/assets/universe/lumora.webp', 'A living world', 'A glimpse is enough.', 'A cinematic glimpse of the VEC learning world'],
  ['/assets/ui/discovery-spark.webp', 'Discovery Spark', 'Curiosity leaves traces.', 'A glowing symbol of curiosity and discovery'],
  ['/assets/world/lumi-keeper.webp', 'Lumi', 'Some knowledge is alive.', 'Lumi, a luminous ladybug character from the VEC world'],
];

function Icon({kind}:{kind:string}) {
  const common = { viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'wonder') return <svg {...common}><path d="M24 5v8M24 35v8M5 24h8M35 24h8M10.5 10.5l5.5 5.5M32 32l5.5 5.5M37.5 10.5 32 16M16 32l-5.5 5.5"/><circle cx="24" cy="24" r="7"/></svg>;
  if (kind === 'home') return <svg {...common}><path d="m7 22 17-13 17 13"/><path d="M12 20v18h24V20M20 38V26h8v12"/></svg>;
  if (kind === 'learn') return <svg {...common}><path d="M7 14 24 7l17 7-17 7L7 14Z"/><path d="M12 22v11c7 5 17 5 24 0V22M24 21v17"/></svg>;
  if (kind === 'institution') return <svg {...common}><path d="M7 17h34M10 17v20M19 17v20M29 17v20M38 17v20"/><path d="M5 40h38"/><path d="m7 11 17-6 17 6v6H7Z"/></svg>;
  return <svg {...common}><path d="M9 24c5-8 11-12 19-12 5 0 8 2 11 5"/><path d="M39 24c-5 8-11 12-19 12-5 0-8-2-11-5"/><path d="m34 11 5 6-8 1M14 37l-5-6 8-1"/></svg>;
}

function SocialBrandIcon({ kind }: { kind: string }) {
  if (kind === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="vec-instagram-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#FFDC80"/><stop offset=".45" stopColor="#F77737"/><stop offset=".72" stopColor="#E1306C"/><stop offset="1" stopColor="#833AB4"/></linearGradient></defs><rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.6" fill="url(#vec-instagram-gradient)" stroke="none"/><rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.8" fill="none" stroke="#fff" strokeWidth="1.8"/><circle cx="17.1" cy="6.9" r="1.1" fill="#fff" stroke="none"/></svg>;
  if (kind === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#0866FF" stroke="none"/><path d="M13.6 21v-8h2.7l.4-3.1h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2H7.6V13h2.3v8Z" fill="#fff" stroke="none"/></svg>;
  if (kind === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="#0A66C2" stroke="none"/><path d="M6.2 9.1h2.7v8.7H6.2Zm1.35-4.3a1.57 1.57 0 1 1 0 3.14 1.57 1.57 0 0 1 0-3.14ZM10.5 9.1h2.6v1.2h.04a2.85 2.85 0 0 1 2.56-1.4c2.74 0 3.25 1.8 3.25 4.13v4.77h-2.72v-4.23c0-1.01-.02-2.31-1.41-2.31-1.42 0-1.64 1.1-1.64 2.24v4.3H10.5Z" fill="#fff" stroke="none"/></svg>;
  if (kind === 'youtube') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="4.3" width="21" height="15.4" rx="4.2" fill="#FF0033" stroke="none"/><path d="m10 8.3 6.1 3.7-6.1 3.7Z" fill="#fff" stroke="none"/></svg>;
  if (kind === 'whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.1L4 20l1.2-3.8a8.2 8.2 0 1 1 15-4.5Z" fill="#25D366" stroke="none"/><path d="M9 8.2c.2-.5.5-.5.8-.5h.4c.2 0 .4 0 .5.4l.7 1.7c.1.3.1.4-.1.6l-.5.6c-.2.2-.2.3 0 .6.4.7 1 1.3 1.7 1.7.3.2.4.2.6 0l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1.1-.8 1.5-.5.4-1.1.5-1.8.3-2.7-.7-5.1-3-5.8-5.5-.2-.8.1-1.4.4-1.8Z" fill="#fff" stroke="none"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
}

function SocialLinks({ className = '' }: { className?: string }) {
  const items = [
    { key: 'whatsapp', label: 'WhatsApp', href: `${social.whatsapp}?text=${encodeURIComponent('Hello VEC, I found you through the VEC website.')}` },
    { key: 'instagram', label: 'Instagram', href: social.instagram },
    { key: 'facebook', label: 'Facebook', href: social.facebook },
    { key: 'linkedin', label: 'LinkedIn', href: social.linkedin },
    { key: 'youtube', label: 'YouTube', href: social.youtube },
    { key: 'email', label: 'Email VEC', href: social.email },
  ];
  return <div className={className} aria-label="VEC social and contact links">
    {items.map((item) => item.href ? <a key={item.key} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={item.label} title={item.label}>
      <SocialBrandIcon kind={item.key} />
    </a> : <span key={item.key} className="social-link-pending" role="img" aria-label={`${item.label}: link will be added`} title={`${item.label} — link will be added when the official account is ready`}>
      <SocialBrandIcon kind={item.key} />
    </span>)}
  </div>;
}

function FixedSocials() {
  return <SocialLinks className="fixed-socials" />;
}

function ImageWindow({src, alt, label, text, className=''}:{src:string;alt:string;label:string;text:string;className?:string}) {
  return <article className={`image-window ${className}`} data-cursor={label}>
    <Image src={src} alt={alt} fill sizes="(max-width:800px) 100vw, 50vw" />
    <div className="image-window-glow" />
    <div className="image-window-caption"><small>{label}</small><strong>{text}</strong></div>
  </article>;
}

export default function SiteExperience({ initialView = 'home' }: { initialView?: View }) {
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<View>(initialView);
  const [cmsContent, setCmsContent] = useState<CMSContent | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [gateway, setGateway] = useState<string | null>(null);

  useEffect(() => {
    if (!mobileNav) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !mobileNavRef.current?.contains(event.target)) setMobileNav(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNav(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileNav]);

  useEffect(() => {
    setView(pathViews[pathname] ?? initialView);
  }, [pathname, initialView]);

  useEffect(() => {
    let active = true;
    fetch('/api/public-content', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data: CMSContent | null) => { if (active && data?.configured) setCmsContent(data); })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  const activeSubjectWorlds = cmsContent?.learningAreas?.length
    ? cmsContent.learningAreas.map((item) => [item.symbol || '✦', item.title, item.teaser || 'A world to discover'])
    : subjectWorlds;
  const activeGateways = cmsContent?.pathways?.length
    ? cmsContent.pathways.map((item) => [item.key, item.symbol || '✦', item.title, item.microcopy || item.description || 'Explore with VEC'])
    : gateways;
  const activeGlimpses = cmsContent?.glimpses?.length
    ? cmsContent.glimpses.map((item) => [item.imageUrl, item.label, item.caption, item.altText || item.label] as [string, string, string, string])
    : glimpses;
  const productShowcase: PhysicalKitPublic[] = [
    { id: 'independence-mission-box', slug: 'independence-mission-box', title: 'The Independence Mission Box', category: 'ACTIVITY KIT · EVERYDAY LIFE SKILLS', summary: 'A hands-on practice space for dressing, fastening, folding, matching, packing and building everyday independence through repeatable routines.', description: 'Designed around practical actions children can practise with their hands: zips, buttons, buckles, laces, clothing, socks, school-bag preparation and simple daily sequencing.', stage: 'development', imageUrl: '/assets/products/independence-mission-box-hero.webp', galleryImages: ['/assets/products/independence-mission-box-inside.webp','/assets/products/independence-mission-box-activities.webp','/assets/products/independence-mission-box-routine.webp'], enquiryLabel: 'Ask about this activity kit' },
    { id: 'body-language', slug: 'my-bodys-secret-language', title: 'My Body’s Secret Language', category: 'INTERACTIVE KIT · BODY AWARENESS', summary: 'An interactive way for children to notice everyday body signals and think about helpful responses such as rest, water, movement or asking an adult.', description: 'Explores body awareness through visual choices and simple activities about thirst, hunger, temperature, energy, rest, movement and toilet needs. It is an educational activity, not a diagnostic or medical tool.', stage: 'development', imageUrl: '/assets/products/bodys-secret-language-board.webp', galleryImages: ['/assets/products/bodys-secret-language-activities.webp'], enquiryLabel: 'Ask about this interactive kit' },
    { id: 'little-life-simulator', slug: 'little-life-simulator', title: 'The Little Life Simulator', category: 'LEARNING GAME · REAL-WORLD DECISIONS', summary: 'A miniature world of homes, school, market, clinic, garden and community spaces where children explore choices and consequences through play.', description: 'A tabletop play world with character pieces, vehicles, tokens and scenario cards that invite planning, practical reasoning, early numeracy and social understanding.', stage: 'development', imageUrl: '/assets/products/little-life-simulator.webp', enquiryLabel: 'Ask about the learning game' },
    { id: 'anvaya-discovery-book', slug: 'anvaya-activity-discovery-book', title: 'Anvaya — My Activity & Discovery Book', category: 'ACTIVITY BOOK · OBSERVE & EXPLORE', summary: 'A richly structured activity book inviting children to notice patterns, explore their surroundings, ask questions and record discoveries.', description: 'An A4-format activity and discovery book concept designed around observation, nature, everyday surroundings, visual prompts and hands-on exploration.', stage: 'development', imageUrl: '/assets/products/anvaya-discovery-book.webp', enquiryLabel: 'Ask about Anvaya' },
    { id: 'two-sided-world', slug: 'the-two-sided-world', title: 'The Two-Sided World', category: 'INTERACTIVE GAME · PERSPECTIVE & EMPATHY', summary: 'A hands-on perspective-taking experience that helps learners explore how the same situation can look different from another person’s position.', description: 'A two-view scene board, object pieces and situation cards invite children to compare viewpoints, explain what each person can see and practise listening before judging.', stage: 'development', imageUrl: '/assets/products/two-sided-world-kit.webp', enquiryLabel: 'Ask about this interactive game' },
  ];
  const activePhysicalKits: PhysicalKitPublic[] = productShowcase.map((base) => {
    const cms = cmsContent?.physicalKits?.find((item) => item.id === base.id || item.slug === base.slug);
    return cms ? { ...base, ...cms, imageUrl: base.imageUrl, galleryImages: base.galleryImages } : base;
  }).concat((cmsContent?.physicalKits || []).filter((item) => !productShowcase.some((base) => base.id === item.id || base.slug === item.slug)));
  const settings = cmsContent?.settings ?? {};

  function go(next: View) {
    setView(next);
    setMobileNav(false);
    if (pathname !== viewPaths[next]) router.push(viewPaths[next], { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const selectedGateway = useMemo(() => activeGateways.find((g) => g[0] === gateway), [activeGateways, gateway]);

  return <main className="site-shell">
    <CursorOrb />
    <FixedSocials />

    <header className="topbar" ref={mobileNavRef}>
      <Link className="brand-mark" href="/" data-cursor="VEC" aria-label="VEC home">
        <Image src="/assets/vec-logo-canonical-transparent.png" alt="VEC — Visualise Every Concept" width={80} height={74} priority className="brand-logo" />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([key, label]) => <Link key={key} href={viewPaths[key]} className={view === key ? 'active' : ''} data-cursor={label}>{label}</Link>)}
      </nav>
      <button className="mobile-menu-button" onClick={() => setMobileNav(v => !v)} aria-expanded={mobileNav} aria-controls="vec-mobile-navigation" aria-label={mobileNav ? "Close menu" : "Open menu"}>{mobileNav ? "×" : "☰"}</button>
      {mobileNav && <div className="mobile-popover" id="vec-mobile-navigation"><div className="mobile-popover-links">{navItems.map(([key, label]) => <Link key={key} href={viewPaths[key]} onClick={() => setMobileNav(false)}>{label}</Link>)}</div><SocialLinks className="mobile-popover-socials" /></div>}
    </header>

    {view === 'home' && <section className="home-scene page-view">
      <div className="home-image"><Image src="/assets/universe/lumora.webp" alt="A glimpse into the VEC world" fill priority sizes="100vw" /><div className="home-veil" /></div>
      <div className="home-grain" aria-hidden="true" />
      <div className="home-spark" aria-hidden="true"><span /></div>
      <div className="home-copy">
        <small className="kicker">{settings.homeEyebrow || 'VEC STUDIOS · VISUALISE EVERY CONCEPT'}</small>
        <h1>{settings.homeLine1 || 'Let curiosity'}<br /><em>{settings.homeEmphasis || 'lead.'}</em></h1>
        <p>{settings.homeDescription || 'A cinematic learning studio creating stories, experiences and worlds where understanding is something you discover.'}</p>
        <div className="home-actions">
          <button onClick={() => go('explore')} data-cursor="Explore">Explore VEC <span>↗</span></button>
          <button onClick={() => go('approach')} className="ghost" data-cursor="How VEC works">How it works</button>
        </div>
      </div>
      <div className="home-footer-note"><span>Experience · Curiosity · Discovery</span><b>Scroll</b></div>
      <button className="home-door-hint" onClick={() => go('explore')} data-cursor="Discover">✦</button>
    </section>}

    {view === 'about' && <section className="page-view about-page">
      <div className="page-hero-copy"><small className="kicker">THE SOUL OF VEC</small><h1>{settings.aboutHeadline || 'Every child is born'} <em>{settings.aboutEmphasis || 'curious.'}</em></h1><p>{settings.aboutDescription || 'Our responsibility is not to fill minds with facts, but to create experiences that awaken the knowledge already waiting to be discovered.'}</p><p className="about-service-note">VEC develops cinematic educational videos, original animated storytelling and interactive learning experiences across subjects—from mathematics and science to history, geography, language and creativity.</p></div>
      <div className="about-soul-grid">
        <ImageWindow src="/assets/characters/maya.webp" alt="Maya, a young explorer discovering the world through questions" label="Maya" text="The question comes first." className="wide" />
        <div className="soul-panel"><small>WHAT WE BELIEVE</small><h3>Children don't hate learning.<br /><em>They hate being bored.</em></h3><p>Meaningful experience gives curiosity somewhere to go.</p><div className="micro-line"><span>Story</span><i>•</i><span>Discovery</span><i>•</i><span>Emotion</span><i>•</i><span>Beauty</span></div></div>
      </div>
    </section>}

    {view === 'approach' && <section className="page-view approach-page">
      <div className="approach-orbit"><Image src="/assets/ui/discovery-spark.webp" alt="Discovery Spark" fill sizes="420px" /></div>
      <div className="approach-copy"><small className="kicker">THE VEC WAY</small><h1>{settings.approachHeadline || 'Knowledge is not the destination.'}<br /><em>{settings.approachEmphasis || 'It is the reward for curiosity.'}</em></h1><p>{settings.approachDescription || 'Our stories create a need to know before they reveal what is known.'}</p></div>
      <div className="cycle-ring"><span>Experience</span><span>Curiosity</span><span>Discovery</span><span>Understanding</span><span>Application</span><span>Memory for Life</span></div>
      <div className="approach-principles"><article><b>01</b><h3>Story first.</h3><p>A great question needs a reason to matter.</p></article><article><b>02</b><h3>Discovery belongs to the learner.</h3><p>We create the situation; the child completes the journey.</p></article><article><b>03</b><h3>The real world is the classroom.</h3><p>What is discovered on screen should become visible beyond it.</p></article></div>
    </section>}

    {view === 'explore' && <section className="page-view explore-page">
      <div className="explore-intro"><div><small className="kicker">WHERE CURIOSITY CAN LEAD</small><h1>More than subjects.<br /><em>Worlds of discovery.</em></h1></div><p>We will explore the learning spectrum through stories and experiences—without giving away the whole map.</p></div>
      <div className="subject-orbit" aria-label="Learning areas">
        {activeSubjectWorlds.map(([icon, title, subtitle], i) => <button key={title} className={`subject-node node-${i+1}`} data-cursor={title} onClick={() => setGateway(title)}><span className="node-icon">{icon}</span><strong>{title}</strong><small>{subtitle}</small></button>)}
        <div className="subject-core"><span>VEC</span><small>questions → discoveries</small></div>
      </div>
      <QuestionDoorChat />
      <div className="glimpse-strip"><div className="glimpse-title"><small>JUST A GLIMPSE</small><strong>The world keeps moving.</strong></div>{activeGlimpses.map(([src,label,text,alt]) => <ImageWindow key={label} src={src} alt={alt} label={label} text={text} />)}</div>
      {selectedGateway && <div className="subject-drawer" role="dialog" aria-modal="true"><button onClick={() => setGateway(null)} aria-label="Close">×</button><small>DISCOVERY PATH</small><h3>{selectedGateway[1]}</h3><p>One doorway is enough for a beginning. VEC will reveal the rest as each story earns the next question.</p><span>More will be discovered.</span></div>}
    </section>}

    {view === 'play' && <section className="page-view play-kits-page">
      <div className="play-hero">
        <div className="play-hero-copy">
          <small className="kicker">BEYOND THE SCREEN</small>
          <h1>Some discoveries<br /><em>are meant to be held.</em></h1>
          <p>VEC is developing physical activity kits, playful games and interactive learning tools that invite learners to make, move, test, notice and explore.</p>
          <div className="play-stage-note"><span className="stage-pulse" /><div><strong>Taking shape now</strong><small>Selected concepts are in development and manufacturing. Product details, pricing and release availability will be shared when each collection is ready.</small></div></div>
        </div>
        <div className="play-hero-art" aria-hidden="true">
          <div className="play-art-orbit orbit-one" /><div className="play-art-orbit orbit-two" />
          <div className="play-kit-object object-activity"><span>✳</span><small>MAKE</small></div>
          <div className="play-kit-object object-game"><span>◈</span><small>PLAY</small></div>
          <div className="play-kit-object object-interactive"><span>⌘</span><small>EXPLORE</small></div>
          <div className="play-art-spark">✦</div>
        </div>
      </div>
      <div className="play-section-heading"><small className="kicker">A NEW WAY TO EXPLORE</small><h2>From screen to <em>hands-on discovery.</em></h2><p>Different ways to turn a question into something learners can touch, build, try and experience.</p></div>
      <div className="play-kit-grid">
        {activePhysicalKits.map((kit, index) => <article className={`play-kit-card kit-card-${index + 1}`} key={kit.id}>
          <div className="play-kit-media">
            {kit.imageUrl ? <><div className="play-kit-main-image"><Image src={kit.imageUrl} alt={`${kit.title} — product overview`} fill sizes="(max-width:800px) 100vw, 33vw" /></div>{!!kit.galleryImages?.length && <div className="play-kit-thumbnails">{kit.galleryImages.map((src, imageIndex) => <div key={src}><Image src={src} alt={`${kit.title} — detail ${imageIndex + 1}`} fill sizes="120px" /></div>)}</div>}</> : <div className={`play-kit-illustration illustration-${index + 1}`} aria-hidden="true"><span>{index === 0 ? '✳' : index === 1 ? '◈' : '⌘'}</span><i /><b /></div>}
            <span className="play-kit-status">{kit.stage === 'available' ? 'Available' : kit.stage === 'comingSoon' ? 'Coming soon' : kit.stage === 'development' ? 'In development' : 'Manufacturing'}</span>
          </div>
          <div className="play-kit-copy"><small>{kit.category}</small><h3>{kit.title}</h3><p>{kit.summary}</p>{kit.stage === 'available' && typeof kit.price === 'number' && <strong className="play-kit-price">₹{kit.price.toLocaleString('en-IN')}</strong>}<button type="button" onClick={() => go('enquiry')}>{kit.enquiryLabel || (kit.stage === 'available' ? 'Enquire about this kit' : 'Ask about upcoming releases')} <span>↗</span></button></div>
        </article>)}
      </div>
      <div className="play-release-note"><span>✦</span><p>We’ll share product details and availability as each release is ready. For now, you can register your interest or ask us about the upcoming range.</p><button type="button" onClick={() => go('enquiry')}>Ask VEC about the upcoming range ↗</button></div>
    </section>}

    {view === 'journal' && <section className="page-view journal-page">
      <div className="journal-hero"><small className="kicker">IDEAS FROM THE VEC TEAM</small><h1>Thoughts that make<br /><em>learning clearer.</em></h1><p>Practical, original perspectives on how people notice, experience, question and understand the world. No spoilers from our unreleased stories—just useful ideas for parents, educators and curious minds.</p><div className="journal-promise"><span>✦</span><div><strong>Made to be useful.</strong><small>Every article aims to leave you with a clearer idea, a practical example or something to try.</small></div></div></div>
      <div className="journal-listing-head"><div><small className="kicker">THE VEC JOURNAL</small><h2>Explore the <em>ideas.</em></h2></div><p>Learning is more than receiving information. Explore the role of experience, story, observation and active thinking.</p></div>
      <div className="journal-card-grid">
        {[
          ['why-experiences-stay','Why Children Remember Experiences More Than Explanations','MEMORY & EXPERIENCE','A practical look at attention, meaning, retrieval and why doing something can make an idea easier to revisit.','06 min read'],
          ['storytelling-abstract-concepts','How Storytelling Makes Abstract Concepts Easier to Understand','STORY & UNDERSTANDING','How characters, goals, cause and effect can give invisible ideas a meaningful place in a learner’s mind.','07 min read'],
          ['mathematics-through-discovery','Making Mathematics Interesting Through Discovery','MATHEMATICS','Move beyond answer-getting: use patterns, real quantities, puzzles and learner-generated strategies.','07 min read'],
          ['observation-early-learning','Why Observation Matters in Early Learning','OBSERVATION','How careful noticing builds the foundations for questions, comparison, language and reasoning.','06 min read'],
          ['visual-storytelling-science','How Visual Storytelling Can Support Science Learning','SCIENCE & VISUAL THINKING','Use models, sequences and visible change to help learners reason about things they cannot directly see.','07 min read'],
          ['watching-vs-experiencing-learning','Watching Educational Videos vs Experiencing Learning','ACTIVE LEARNING','A clear distinction between exposure and active thinking—and ways to turn viewing into participation.','06 min read'],
        ].map(([slug,title,category,summary,reading]) => <article className="journal-card" key={slug}><div className="journal-card-art"><span>VEC</span><i>✦</i></div><div className="journal-card-copy"><small>{category} · {reading}</small><h3>{title}</h3><p>{summary}</p><Link href={`/journal/${slug}`}>Read the article <span>↗</span></Link></div></article>)}
        {(cmsContent?.journalArticles || []).filter((article) => !['why-experiences-stay','storytelling-abstract-concepts','mathematics-through-discovery','observation-early-learning','visual-storytelling-science','watching-vs-experiencing-learning'].includes(article.slug)).map((article) => <article className="journal-card" key={article.id}><div className="journal-card-art">{article.coverUrl ? <Image src={article.coverUrl} alt="" fill sizes="150px" /> : <><span>VEC</span><i>✦</i></>}</div><div className="journal-card-copy"><small>{article.category} · {article.readingMinutes || 6} min read</small><h3>{article.title}</h3><p>{article.excerpt}</p><Link href={`/journal/${article.slug}`}>Read the article <span>↗</span></Link></div></article>)}
      </div>
      <div className="journal-editorial-note"><strong>About these articles</strong><p>Published under the VEC Learning Team byline. We aim to explain ideas clearly, distinguish practical suggestions from established evidence and update articles when meaningful corrections are needed. Articles do not reveal unreleased characters, scripts or production plans.</p></div>
    </section>}

    {view === 'audiences' && <section className="page-view pathways-page">
      <div className="pathways-intro"><small className="kicker">FIND YOUR WAY INTO VEC</small><h1>One universe.<br /><em>Many reasons to enter.</em></h1><p>Choose a doorway and discover the kind of experience VEC can create around it.</p></div>
      <div className="gateway-grid">
        {activeGateways.map(([id, icon, title, text]) => <button key={id} className="gateway" onClick={() => id === 'wonder' ? go('explore') : setGateway(id)} data-cursor={title}><div className="gateway-icon"><Icon kind={id} /></div><div className="gateway-meta"><small>{text}</small><strong>{icon}</strong></div></button>)}
      </div>
      <div className="hearts-row"><article><span>✦</span><small>Wonder</small><strong>The child</strong><p>Why? What if? Can I try?</p></article><article><span>◉</span><small>Trust</small><strong>The parent</strong><p>Will this help my child?</p></article><article><span>◇</span><small>Clarity</small><strong>The teacher</strong><p>Can I deepen understanding?</p></article></div>
      {selectedGateway && <div className="subject-drawer" role="dialog" aria-modal="true"><button onClick={() => setGateway(null)} aria-label="Close">×</button><small>VEC DOORWAY</small><h3>{selectedGateway[2]}</h3><p>{selectedGateway[3]}. Explore the experience first; the details follow naturally.</p></div>}
    </section>}

    {view === 'studio' && <section className="page-view studio-page">
      <div className="studio-head"><small className="kicker">VEC STUDIOS</small><h1>{settings.studioHeadline || 'Building something'}<br /><em>{settings.studioEmphasis || 'worth discovering.'}</em></h1><p>{settings.studioDescription || 'The website shows only a window into a much larger body of work. We reveal the value; the deeper universe stays deeper.'}</p></div>
      <div className="studio-gallery"><ImageWindow src="/assets/universe/lumora.webp" alt="A cinematic glimpse of a richly imagined learning world" label="WORLD" text="A living world" className="large" /><ImageWindow src="/assets/ui/discovery-spark.webp" alt="A glowing spark representing curiosity and discovery" label="SIGNAL" text="Curiosity leaves traces." /><ImageWindow src="/assets/world/lumi-keeper.webp" alt="Lumi, the luminous ladybug character" label="LIVING KNOWLEDGE" text="Some knowledge is alive." /></div>
      <div className="studio-statements"><article><small>01</small><h3>Stories before lectures.</h3></article><article><small>02</small><h3>Experience before explanation.</h3></article><article><small>03</small><h3>Questions before answers.</h3></article></div>
      {!!cmsContent?.experiences?.length && <section className="cms-public-section"><div className="cms-section-heading"><small className="kicker">SELECTED EXPERIENCES</small><h3>Made to be <em>discovered.</em></h3></div><div className="cms-card-grid">{cmsContent.experiences.map((item) => <article className="cms-content-card" key={item.title}><div className="cms-card-media">{item.thumbnailUrl ? <Image src={item.thumbnailUrl} alt={item.title} fill sizes="(max-width:800px) 100vw, 33vw" /> : <span>✦</span>}</div><small>{item.category}</small><h4>{item.title}</h4><p>{item.summary}</p>{(item.videoUrl || item.videoFileUrl) && <a href={item.videoUrl || item.videoFileUrl} target="_blank" rel="noreferrer">Watch experience ↗</a>}{!item.videoUrl && !item.videoFileUrl && item.externalUrl && <a href={item.externalUrl} target="_blank" rel="noreferrer">Explore ↗</a>}</article>)}</div></section>}
      {!!cmsContent?.updates?.length && <section className="cms-public-section"><div className="cms-section-heading"><small className="kicker">FROM THE STUDIO</small><h3>Notes from <em>VEC.</em></h3></div><div className="cms-update-list">{cmsContent.updates.map((item) => <article className="cms-update" key={item.title}>{item.coverUrl && <div className="cms-update-image"><Image src={item.coverUrl} alt="" fill sizes="(max-width:800px) 100vw, 20vw" /></div>}<div>{item.publishedOn && <small>{new Date(item.publishedOn).toLocaleDateString('en-IN',{year:'numeric',month:'short',day:'numeric'})}</small>}<h4>{item.title}</h4><p>{item.summary}</p></div></article>)}</div></section>}
    </section>}

    {view === 'enquiry' && <section className="page-view enquiry-page"><div className="enquiry-intro"><small className="kicker">BEGIN A CONVERSATION</small><h1>Bring VEC a <em>question.</em></h1><p>Tell us what you are exploring. A real conversation can begin with a single question.</p></div><EnquiryForm /></section>}

    {view === 'contact' && <section className="page-view contact-page"><div className="contact-world"><Image src="/assets/world/living-village.webp" alt="VEC living world" fill sizes="100vw" /><div /></div><div className="contact-copy"><small className="kicker">VEC STUDIOS</small><h1>Curiosity needs<br /><em>a place to go.</em></h1><p>VEC Studios is building cinematic learning experiences that can travel from screen to home, classroom and beyond.</p><div className="contact-details"><div><small>EMAIL</small><strong>{site.contact.email}</strong></div><div><small>PHONE</small><strong>{site.contact.phoneDisplay}</strong></div></div></div></section>}

    <footer className="site-footer"><button onClick={() => go('home')} data-cursor="VEC">VEC <span>Visualise Every Concept</span></button><SocialLinks className="footer-social-links" /><small>© 2026 VEC Studios</small></footer>
    <nav className="mobile-rail" aria-label="VEC sections">{navItems.map(([key, label]) => <Link key={key} className={view === key ? 'active' : ''} href={viewPaths[key]}>{label}</Link>)}</nav>
  </main>;
}
