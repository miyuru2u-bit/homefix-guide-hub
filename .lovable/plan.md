## Problem

`src/routes/contact.tsx` shows a success message on submit but never sends anything — the form handler just calls `setSent(true)`. Every contact, correction, and partnership inquiry is silently dropped.

## Proposed fix

Wire the form to a real backend using Lovable's built-in email (recommended, no third-party accounts):

1. **Enable Lovable Cloud** (prerequisite for email).
2. **Set up an email domain** (e.g. `notify.whatrepaircosts.com`) via the email setup dialog.
3. **Scaffold app-email infrastructure** (queue, templates, send route).
4. **Add a contact-email template** (`src/lib/email-templates/contact-message.tsx`) rendering name / email / topic / message.
5. **Create a public server route** `src/routes/api/public/contact.ts` that:
   - Validates input with Zod (name ≤100, email format, topic enum, message ≤2000, trimmed, non-empty).
   - Rate-limits by IP (simple in-memory or DB-backed).
   - Sends the email internally to a configurable inbox (`CONTACT_INBOX_EMAIL` secret).
   - Also sends a confirmation email to the visitor.
6. **Update `contact.tsx`** to POST to that route, show real loading/error states, and only display the success panel on a 2xx response.

## Alternative (if you don't want email infra)

Skip email entirely: store submissions in a `contact_messages` Cloud table (with RLS: insert-only for anon, select for admin role) and view them in the Cloud dashboard. Simpler, no domain/DNS, but you won't get inbox notifications.

## What I need from you

- **Approve approach A (email) or B (Cloud table only).**
- If A: the destination inbox address for contact submissions.
- If A: confirm you want to set up the email subdomain now (DNS delegation via the setup dialog).