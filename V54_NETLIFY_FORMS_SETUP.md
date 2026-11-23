# VEC V54 — Netlify Forms setup

## What changed
- The enquiry form now submits URL-encoded form data to Netlify Forms using the form name `vec-enquiries`.
- A server-rendered detection form is included in the root layout so Netlify can detect the form during deployment.
- The visible form uses the same field names and a honeypot field.
- The old Resend API route remains in the source for reference but is no longer called by the visible enquiry form. No Resend API key is required for this Netlify Forms workflow.

## Required activation steps
1. Deploy this version to a Netlify site (a production deploy or deploy preview). Netlify must build and scan the deployed HTML before the form appears in the dashboard.
2. In Netlify, open **Forms** and confirm `vec-enquiries` is detected. If Forms are disabled for the site, enable form detection and trigger a fresh deploy.
3. Open the detected form's notification settings and add `vec.curiomaya@gmail.com` as the email notification recipient. Save the notification.
4. Submit a real test enquiry through the deployed website.
5. Confirm the submission appears in **Forms → vec-enquiries → Verified submissions** (or the submissions view) and confirm the email notification arrives. Check spam/junk if needed.
6. Test the honeypot and invalid-field behaviour. Do not announce that email delivery works until the actual notification arrives.

## Important limitations
- Netlify Forms collection and email notifications are separate: a successful submission response confirms Netlify accepted the form, not that an email reached the inbox. The dashboard submission record is the source of truth for collection; inbox arrival separately verifies notification delivery.
- Local `npm run dev` does not emulate Netlify Forms. A deployed Netlify preview is required for a real test.
- Netlify Forms notifications are configured in the Netlify dashboard, not by putting Gmail credentials in the website.
- Keep the existing direct email and WhatsApp fallback links.
- Review Netlify's current plan/credit terms and your site's usage before launch.

## Form identity
Form name: `vec-enquiries`
Notification recipient: `vec.curiomaya@gmail.com`
