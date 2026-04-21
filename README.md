# EasyCity (Full-Stack)

A full-stack multi-role platform for commerce and mobility, built with Next.js App Router.

Devsync Delivery supports four user roles in one codebase:
- Customer: browse food/grocery items, manage cart, checkout, track orders, and book rides
- Driver: receive assignments, accept/reject rides, and complete trip lifecycle actions
- Shop Owner: manage shop profile and catalog items
- Admin: view analytics, manage users/drivers/shops, verify drivers, and export CSV reports

## Why This Project

This project demonstrates how to build a role-based product with:
- A single Next.js app that serves frontend + backend
- Clear separation of route groups and API handlers
- Shared domain model across customer, driver, shop, and admin flows

## Features

- Role-based authentication (JWT in secure httpOnly cookie)
- Food + grocery catalog browsing
- Cart and checkout workflow
- Customer order history and cancellation (status-based)
- Ride booking and live ride status polling
- Driver assignment and ride lifecycle management
- Shop item CRUD APIs
- Admin analytics, moderation flows, and CSV export

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma ORM + PostgreSQL
- Tailwind CSS v4 + Radix UI
- SWR for client data fetching
- Zod for request validation
- MapLibre + OpenStreetMap/Nominatim for map/location features

## Project Structure

```text
src/app/                 App Router pages, layouts, API routes, server actions
src/components/          Reusable UI and feature components
src/lib/                 Auth, Prisma client, validation, domain helpers
src/hooks/               SWR hooks and feature hooks
prisma/schema.prisma     Database schema
docs/                    Architecture, API, and route docs
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 14+

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

```bash
cp .env.example .env
```

Set values in `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
```

### 3) Run database migrations

```bash
npx prisma migrate dev
```

### 4) Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev`: start development server
- `npm run build`: production build
- `npm run start`: run production server
- `npm run lint`: run ESLint checks

## Authentication and Roles

- Session cookie: `session` (httpOnly, 7-day expiry)
- Public registration roles: `CUSTOMER`, `DRIVER`, `SHOP_OWNER`
- `ADMIN` is supported in the system but not enabled in public registration validation

## API and Architecture Docs

- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Route Map](docs/ROUTES.md)
- [Interview Preparation Notes](docs/INTERVIEW_PREPARATION.md)

## Current Status and Known Constraints

- No automated test suite is currently committed
- Middleware matcher currently targets `/dashboard/*` and not all role-prefixed route trees
- Cart constraints (for example multi-shop restrictions) depend on higher-layer handling
- Nominatim search is currently country-scoped for India (`in`) in the existing implementation

## Contributing

Contributions are welcome.

If you want to contribute:
1. Fork the repository
2. Create a feature branch
3. Make focused changes with clear commit messages
4. Open a pull request with context, screenshots (if UI), and testing notes

## License

No license file is currently present in this repository.
Add a `LICENSE` before distributing or accepting external contributions at scale.
