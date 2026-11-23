'use client';

import { FormEvent, useState } from 'react';

 type FormState = 'idle' | 'sending' | 'success' | 'not-configured' | 'error';

export default function EnquiryForm() {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('form-name', 'vec-enquiries');
    setState('sending');
    setMessage('Submitting your enquiry securely…');

    try {
      const body = new URLSearchParams();
      formData.forEach((value, key) => body.append(key, String(value)));
  const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error('Netlify could not accept your enquiry. Please try again or contact VEC directly.');
      setState('success');
      setMessage('Thank you. Your enquiry has been received by VEC. We will respond using the email address you provided.');
      form.reset();
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'A connection problem prevented submission. Please try again or contact VEC directly.');
    }
  }

  return (
    <form className="enquiry-form" name="vec-enquiries" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
      <input type="hidden" name="form-name" value="vec-enquiries" />
      <div className="form-row">
        <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" maxLength={120} required /></div>
        <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required /></div>
      </div>
      <div className="form-row">
        <div className="field"><label htmlFor="phone">WhatsApp / phone <span>(optional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={60} /></div>
        <div className="field"><label htmlFor="audience">I am</label>
          <select id="audience" name="audience" required defaultValue="">
            <option value="" disabled>Choose one</option><option>Parent</option><option>School</option><option>College</option><option>Education Board</option><option>Partner</option><option>Student</option><option>Other</option>
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="subject">What is this about?</label><input id="subject" name="subject" maxLength={180} required /></div>
      <div className="field"><label htmlFor="message">Tell us</label><textarea id="message" name="message" maxLength={4000} required /></div>
      <div className="vec-form-trap" aria-hidden="true"><label htmlFor="bot-field">Leave this field empty</label><input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-actions">
        <div className="form-note">We use the details you provide only to respond to your enquiry. Please do not include sensitive personal information.</div>
        <button className="submit" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry →'}</button>
      </div>
      <div className={`status show status-${state}`} role="status" aria-live="polite">
        <strong>{state === 'success' ? 'Enquiry submitted' : state === 'not-configured' ? 'Online submission unavailable' : state === 'error' ? 'Enquiry not submitted' : state === 'sending' ? 'Please wait' : 'Enquiry service'}</strong>
        <span>{message || 'Complete the fields above to contact VEC.'}</span>
        {(state === 'not-configured' || state === 'error') && <span className="status-contact">Contact VEC directly: <a href="mailto:vec.curiomaya@gmail.com">vec.curiomaya@gmail.com</a> · <a href="https://wa.me/917846867395" target="_blank" rel="noopener noreferrer">WhatsApp VEC</a></span>}
      </div>
    </form>
  );
}
