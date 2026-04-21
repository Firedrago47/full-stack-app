# Devsync Delivery (full-stack-app)

A multi-role commerce and mobility platform built with Next.js App Router.

This project supports:
- Customer flows: food and grocery browsing, cart and checkout, order tracking, and taxi ride booking.
- Driver flows: onboarding, live dashboard, ride assignment/accept/reject/start/complete lifecycle.
- Shop owner flows: onboarding, dashboard, and item management.
- Admin flows: analytics, user/driver/shop listing, driver verification, and CSV exports.

## Tech Stack
- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma ORM + PostgreSQL
- Tailwind CSS v4 + Radix UI components
- SWR for client data fetching
- JSON Web Token auth via `session` cookie
- MapLibre + OpenStreetMap/Nominatim for map/location features

## Repository Layout

```text
src/app/                 Next.js routes (pages, layouts, API routes, server actions)
src/components/          Shared UI and domain components
src/lib/                 Prisma client, auth, validation, domain helpers
src/hooks/               Client hooks (SWR + workflow helpers)
prisma/schema.prisma     Data model
prisma/migrations/       SQL migrations history
public/images/           Static assets
docs/                    Project documentation
```

## Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Set environment variables (see section below).
4. Apply database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the app:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000`.

## Environment Variables
Create `.env` with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
```

Notes:
- `DATABASE_URL` is required by Prisma datasource.
- `JWT_SECRET` is required at runtime for login and session verification.
- `NODE_ENV` is optional and controlled by Next.js (`development`/`production`).

## Scripts
- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Authentication and Roles
Auth is cookie-based JWT (`session`, httpOnly, 7-day expiry).

Supported roles in registration:
- `CUSTOMER`
- `DRIVER`
- `SHOP_OWNER`

`ADMIN` users are supported by the system but not exposed in public registration validation. Create admin users directly in the database when needed.

## Main Documentation
- Architecture and domain model: `docs/ARCHITECTURE.md`
- API reference: `docs/API_REFERENCE.md`
- App route map: `docs/ROUTES.md`

## Development Notes
- Path alias `@/*` resolves to `src/*`.
- Prisma client logs queries in development via `src/lib/prisma.ts`.
- Item and auth payloads are validated with Zod schemas in `src/lib/validation/*`.

## Current Gaps / Known Constraints
- No automated test suite is currently committed.
- Cart logic allows mixing items across shops unless constrained at higher layers.
- `src/app/middleware.ts` protects `/dashboard/*`, while the app uses role-prefixed routes (`/customer/*`, `/driver/*`, `/shop/*`, `/admin/*`), so route protection is primarily handled in server components and API guards.
