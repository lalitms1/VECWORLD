# VEC V54 — Netlify Enquiry Integration

- Replaced the visible enquiry form's Resend API request with a Netlify Forms submission.
- Added a server-rendered hidden detection form to the root layout.
- Added Netlify honeypot protection.
- Preserved the existing form layout, fields, status messages, and direct email/WhatsApp fallback.
- Added `V54_NETLIFY_FORMS_SETUP.md` with deployment, notification, and real-world verification steps.

IMPORTANT: This source update does not itself activate Netlify Forms or configure email notifications. Deploy to Netlify, confirm form detection, configure the notification recipient, and test a real submission before treating the system as operational.
