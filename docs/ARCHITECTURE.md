# VEC Production Architecture

Browser
  -> VEC Next.js application
  -> CDN / object storage for large media
  -> API routes for enquiries
  -> Database for enquiries/conversations
  -> Email + WhatsApp notification services
  -> Admin inbox for VEC staff
  -> Visitor conversation thread / reply delivery

Rule: large videos do not belong in GitHub source files or embedded data URLs.
