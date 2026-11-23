import { NextResponse } from 'next/server';

function clean(value: unknown, max = 4000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, (char) => entities[char] ?? char);
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = clean(body.name, 120);
    const email = clean(body.email, 254);
    const phone = clean(body.phone, 60);
    const audience = clean(body.audience, 80);
    const subject = clean(body.subject, 180);
    const message = clean(body.message, 4000);
    const website = clean(body.website, 200);

    // Honeypot: quietly discard automated submissions without exposing the check.
    if (website) return NextResponse.json({ ok: true, message: 'Thank you. Your enquiry has been submitted.' });

    if (!name || !email || !audience || !subject || !message) {
      return NextResponse.json({ ok: false, message: 'Please complete the required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiveEmail = process.env.VEC_RECEIVE_EMAIL;
    const fromEmail = process.env.VEC_FROM_EMAIL;

    // Do not tell a visitor that an enquiry was received unless delivery is configured.
    if (!apiKey || !receiveEmail || !fromEmail) {
      return NextResponse.json({
        ok: false,
        code: 'EMAIL_NOT_CONFIGURED',
        message: 'Online enquiry submission is not active yet because VEC’s email service has not been configured. Your message has not been sent. Please contact VEC directly using the email or WhatsApp links below.',
      }, { status: 503 });
    }

    const html = `
      <h2>New VEC website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Visitor type:</strong> ${escapeHtml(audience)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `;

    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [receiveEmail],
        reply_to: email,
        subject: `VEC website enquiry: ${subject}`,
        html,
      }),
    });

    if (!delivery.ok) {
      const detail = await delivery.text().catch(() => '');
      console.error('[VEC ENQUIRY DELIVERY FAILED]', delivery.status, detail.slice(0, 500));
      return NextResponse.json({ ok: false, message: 'We could not deliver your enquiry just now. Please contact VEC directly by email or WhatsApp.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, message: 'Thank you. Your enquiry has been accepted by VEC’s email service. We will respond using the email address you provided.' });
  } catch {
    return NextResponse.json({ ok: false, message: 'We could not process the enquiry right now.' }, { status: 500 });
  }
}
