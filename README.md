# Milanoir

Next.js (Pages Router) app for Milanoir events, with server API routes for contact and waitlist.

## Tech Stack

- Next.js
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Requirements

- Node.js 20.9+ (recommended: Node 22)
- npm

## Local Development

```sh
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Build

```sh
npm run build
npm run start
```

## API Endpoints

- `POST /api/contact`
- `POST /api/waitlist`

## Environment Variables

Server-side variables used by API routes:

- `RESEND_API_KEY` (required)
- `CONTACT_RECIPIENT_EMAIL` (optional)
- `RESEND_FROM_EMAIL` (optional)
- `RESEND_AUDIENCE_ID` (optional, waitlist)
