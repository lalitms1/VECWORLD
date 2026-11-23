import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '../../config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How VEC Studios handles website enquiries, essential website data and optional analytics.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <main className="policy-page"><Link href="/" className="policy-back">← Back to VEC</Link><p className="kicker">VEC STUDIOS · WEBSITE INFORMATION</p><h1>Privacy <em>Policy</em></h1><p className="policy-updated">Last updated: 22 November 2026</p>
    <p>VEC — Visualise Every Concept (“VEC”, “we”, “us”) aims to handle information responsibly. This notice explains the information that may be processed when you visit this website or contact us. It is a website privacy notice, not a substitute for advice about every law that may apply to a particular service or interaction.</p>
    <h2>Information you provide</h2><p>If you submit an enquiry, we may process your name, email address, optional phone number, audience type, subject and message so we can respond. Please do not submit sensitive personal information or information about a child unless it is necessary and you are authorised to provide it.</p>
    <h2>How we use enquiries</h2><p>We use enquiry details to respond, discuss potential collaboration and maintain relevant business correspondence. Enquiry delivery may be handled by our configured email service provider. Do not assume a form submission succeeded unless the website confirms delivery; if the form is unavailable, contact us directly.</p>
    <h2>Optional analytics</h2><p>If Google Analytics 4 is configured, it remains disabled until a visitor chooses “Allow analytics”. If enabled, it helps us understand aggregate website usage, such as pages visited, broad device or geographic information and referral sources. You can reject optional analytics or revisit your choice using the Privacy choices control when available. Google Search Console is used by the site owner to understand search visibility and indexing; it is not a tool for identifying individual visitors.</p>
    <h2>Advertising and children</h2><p>This website does not display third-party banner advertising and does not use Google AdSense. VEC does not use website analytics to build behavioural advertising profiles of children. We aim to minimise data collection and avoid asking children to submit personal information. A parent, guardian or authorised adult should make enquiries on a child's behalf.</p>
    <h2>Service providers and retention</h2><p>Website hosting, email delivery, analytics (if enabled with consent) and content-management services may process information to provide their services. Access should be limited to what is needed. We retain enquiry correspondence for as long as reasonably necessary for responding, business records and applicable legal requirements, then delete or anonymise it where appropriate.</p>
    <h2>Your choices and requests</h2><p>You may contact us to request access, correction or deletion of personal information we hold, subject to applicable law and legitimate record-keeping requirements. You can also contact us to ask about this notice or our data practices.</p>
    <h2>Contact</h2><p>Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><br/>WhatsApp: <a href={`https://wa.me/${site.contact.whatsappNumber}`}>+91 7846867395</a></p>
    <p className="policy-note">This policy should be reviewed by a qualified professional before launch and updated to match the final hosting, analytics, email and CMS configuration actually enabled on the live website.</p><Link href="/terms" className="policy-back">Read Terms of Use →</Link>
  </main>;
}
