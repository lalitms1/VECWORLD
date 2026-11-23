'use client';

import { social } from '../config/media';

const items = [
  { key: 'whatsapp', label: 'WhatsApp', href: `${social.whatsapp}?text=${encodeURIComponent('Hello VEC, I found you through the VEC website.')}` },
  { key: 'instagram', label: 'Instagram', href: social.instagram },
  { key: 'facebook', label: 'Facebook', href: social.facebook },
  { key: 'linkedin', label: 'LinkedIn', href: social.linkedin },
  { key: 'youtube', label: 'YouTube', href: social.youtube },
  { key: 'email', label: 'Email VEC', href: social.email },
];

export default function SocialDock() {
  return <div className="social-dock" aria-label="VEC social and contact links">
    {items.map((item) => item.href ? (
      <a key={item.key} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={item.label} title={item.label}>
        <span>{item.label}</span>
      </a>
    ) : (
      <span key={item.key} className="social-link-pending" role="img" aria-label={`${item.label}: link will be added`} title={`${item.label} — link will be added when the official account is ready`}>
        <span>{item.label}</span>
      </span>
    ))}
  </div>;
}
