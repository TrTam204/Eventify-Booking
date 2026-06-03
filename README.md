# Salon / Service Booking Platform

A full-featured, open-source booking and marketing platform for salons, studios, and appointment-based service businesses. Built with React, Vite, Supabase, and Tailwind CSS.

## Features

- **Public-facing site** — hero, services showcase, gallery, lookbook, blog/journal, testimonials, booking policies
- **Multi-step booking flow** — service selection, date/slot picker, customer details, payment slip upload
- **Admin portal** — dashboard, booking management, payment validation, customer CRM, waitlist, gallery manager, blog editor, gift voucher management, analytics, blocked dates / settings
- **Gift vouchers** — purchase, validate, and redeem gift cards
- **Offline / demo mode** — works without a live Supabase project using localStorage mock data
- **Multilingual** — ships with English, Sinhala (si), and Tamil (ta) via i18next; add more locales easily
- **Serverless functions** — Netlify functions for transactional email (Resend) and WhatsApp notifications (Twilio)
- **Waitlist** — notifies waitlisted customers when a slot opens

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| Routing | React Router v7 |
| Database / Auth | Supabase (Postgres + Row-Level Security) |
| Animations | Framer Motion, GSAP |
| Rich text | Tiptap |
| Charts | Recharts |
| Date handling | date-fns, react-day-picker |
| Email | Resend (via Netlify function) |
| WhatsApp | Twilio (via Netlify function) |
| Deployment | Netlify (static + serverless functions) |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-github-org/booking-platform.git
cd booking-platform
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values. The minimum required for local development is a Supabase project URL and anon key. All other services are optional — the app runs in offline/demo mode when Supabase variables are absent.

### 3. Apply the database schema

Run the SQL migration in your Supabase project:

```
supabase/migrations/001_initial_schema.sql
```

You can paste this directly in the Supabase SQL editor or use the Supabase CLI:

```bash
supabase db push
```

### 4. Start the development server

```bash
npm run dev
```

The app is available at `http://localhost:5173`.

### 5. Build for production

```bash
npm run build
```

## Environment Variables

See `.env.example` for the full list with descriptions. Key variables:

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key (safe for browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (server-side only) |
| `VITE_CONTACT_EMAIL` | Contact email shown in footer |
| `VITE_CONTACT_PHONE` | Contact phone shown in footer |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for the floating chat button |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `RESEND_FROM_EMAIL` | Verified sender address |
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_WHATSAPP_FROM` | Twilio WhatsApp-enabled number |
| `BUSINESS_NAME` | Business name used in email templates |

## Customisation

### Branding and content

- Replace logo and images in `public/assets/`
- Update service names, descriptions, and pricing in `src/constants/services.js`
- Update booking policies in `src/constants/policies.js`
- Edit i18n copy in `src/i18n/en.json` (and `si.json`, `ta.json`)
- Set contact details and social handles via `.env` variables

### Adding a language

Add a new JSON file under `src/i18n/` following the same key structure as `en.json`, then register it in `src/i18n/index.js`.

### Deploying to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`, publish directory: `dist`
3. Add all environment variables in Netlify site settings
4. The `netlify/functions/` directory is picked up automatically

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin UI components
│   ├── booking/        # Multi-step booking flow components
│   ├── landing/        # Public-facing landing page sections
│   ├── layout/         # Navbar, Footer, CustomCursor
│   └── ui/             # Shared UI primitives
├── constants/          # Services, policies, slot config
├── hooks/              # Data-fetching and auth hooks
├── i18n/               # Translation files
├── lib/                # Supabase client, utilities, mock DB
└── pages/              # Route-level pages (Admin, public)
netlify/
└── functions/          # Serverless functions (email, WhatsApp, cron)
supabase/
└── migrations/         # SQL schema
```

## Admin Access

Navigate to `/admin/login`. In offline/demo mode the admin email is whatever you set in `VITE_ADMIN_EMAIL`. In live mode, create a user in your Supabase Auth dashboard and sign in with those credentials.

## License

MIT
