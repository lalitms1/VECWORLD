import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '../../config/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using the VEC Studios website and its public information.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <main className="policy-page"><Link href="/" className="policy-back">← Back to VEC</Link><p className="kicker">VEC STUDIOS · WEBSITE INFORMATION</p><h1>Terms of <em>Use</em></h1><p className="policy-updated">Last updated: 22 November 2026</p>
    <p>By accessing this website, you agree to use it lawfully and respectfully. These terms apply to the public VEC website and its content. Separate terms may apply to products, services, events or institutional agreements.</p>
    <h2>Website content and intellectual property</h2><p>Unless stated otherwise, the VEC name, logo, original characters, artwork, animation, videos, text, designs and other materials are owned by or used under licence by VEC. You may view and share links to public pages for personal, non-commercial reference. You must not copy, reproduce, adapt, distribute, sell or commercially exploit VEC material without prior written permission, except where applicable law permits.</p>
    <h2>Educational information</h2><p>VEC content is created for educational exploration and general information. It is not a substitute for professional, medical, legal, financial, safety or other specialist advice. Learning outcomes may vary by learner, context and use.</p>
    <h2>Enquiries and availability</h2><p>Submitting an enquiry does not create a contract, guarantee a response within a particular time, confirm product availability or establish a partnership. Product descriptions, previews and future plans may change before release. Any purchase or service commitment will be governed by the terms provided at the relevant time.</p>
    <h2>Acceptable use</h2><p>You must not attempt to disrupt the website, bypass security, introduce malicious code, misuse contact forms, impersonate another person or use the website in a way that violates applicable law or another person's rights.</p>
    <h2>External services and links</h2><p>This website may link to third-party services. VEC does not control those services and is not responsible for their content, availability or privacy practices. Their own terms and policies apply.</p>
    <h2>Changes and contact</h2><p>We may update the website or these terms as VEC develops. The latest version will be published on this page. Questions can be sent to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
    <p className="policy-note">These draft website terms should be reviewed by a qualified legal professional before public launch, particularly for consumer products, e-commerce, licensing and international users.</p><Link href="/privacy" className="policy-back">Read Privacy Policy →</Link>
  </main>;
}
