# Architecture

## Overview
The application is a single Next.js codebase with App Router routes for four actor types:
- Customer
- Driver
- Shop Owner
- Admin

Domain capabilities are split between UI routes, API routes, and server actions.

## Runtime Model
- Frontend and backend are colocated in the same Next.js app.
- API routes are under `src/app/api/**/route.ts`.
- Server actions live under `src/app/actions/*` and role feature folders.
- Persistence is PostgreSQL accessed through Prisma.
- Session auth uses JWT in an httpOnly cookie named `session`.

## Source Layout
- `src/app`: route tree, API handlers, server actions.
- `src/components`: reusable UI + domain components.
- `src/lib`: Prisma, auth utilities, validation, driver assignment helpers.
- `src/hooks`: SWR hooks and feature interaction hooks.
- `prisma/schema.prisma`: canonical domain model.

## Core Domain Model
From `prisma/schema.prisma`:
- `User`: base identity with `role` (`CUSTOMER`, `DRIVER`, `SHOP_OWNER`, `ADMIN`).
- `Driver`: profile for drivers, availability and vehicle metadata.
- `Shop`: shop profile for `SHOP_OWNER` users.
- `Item`: catalog entries tied to a shop (or warehouse source enum support).
- `Order` + `OrderItem`: cart and order lifecycle.
- `Ride`: taxi/ride booking lifecycle.
- `Address`, `Rating`, `OTP`, `OrderEvent`: support entities.

## Important Enums
- `OrderStatus`: `CART -> CREATED -> CONFIRMED -> PREPARING -> OUT_FOR_DELIVERY -> DELIVERED` (+ `CANCELLED`)
- `RideStatus`: `REQUESTED -> ASSIGNED -> ACCEPTED -> CONFIRMED -> STARTED -> COMPLETED` (+ `CANCELLED`)
- `ServiceCategory`: `FOOD | GROCERY | TAXI`

## Auth and Authorization
- Login endpoint signs JWT with `sub` (user id) and `role`.
- Cookie: `session` (httpOnly, `sameSite=lax`, 7 days).
- `getCurrentUser()` decodes cookie and loads user from DB.
- Authorization is enforced in:
  - API route handlers (`getCurrentUser`, `requireAdmin`)
  - Protected server components (`ProtectedLayout`)
- Admin APIs are guarded centrally by `requireAdmin()`.

## Feature Workflows

### Customer Commerce
1. Browse items (`GET /api/items?category=food|groceries`)
2. Add/update/remove cart items via server actions in `src/app/actions/cart.ts`
3. Read cart (`GET /api/cart`)
4. Checkout (`POST /api/cart/checkout`) transitions cart order to `CREATED`
5. View orders (`GET /api/orders`)
6. Cancel eligible order (`POST /api/orders/:id/cancel` when status is `CREATED`)

### Customer Ride
1. Book ride via server action `createRide`
2. Poll ride status (`GET /api/rides/:id` + `useRideStatus`)
3. Confirm or cancel ride via server actions (`confirmRide`, `cancelRide`)

### Driver Ride Flow
1. Driver polls assignment (`GET /api/driver/assignment`)
2. Atomic assignment logic in `assignRideToDriver()` claims oldest REQUESTED ride
3. Driver accepts/rejects assigned ride (`acceptRide`/`rejectRide` server actions)
4. Start and complete ride (`startRide`, `completeRide`)

### Shop Owner Flow
1. Shop owner manages catalog through:
   - `POST /api/shop/items`
   - `PATCH /api/shop/items/:id`
   - `DELETE /api/shop/items/:id`
2. Shop dashboard and item list are rendered from role-scoped routes.

### Admin Operations
- `GET /api/admin/analytics` for totals.
- `GET /api/admin/customers`, `/api/admin/drivers`, `/api/admin/shops` for listings.
- `GET /api/admin/drivers/:id` detail lookup.
- `POST /api/admin/drivers/:id/verify` sets `isActive=true`.
- `GET /api/admin/export?type=users|drivers|shops` CSV export.

## Data Validation
- Auth request payloads: `src/lib/validation/auth.ts`
- Item create/update payloads: `src/lib/validation/item.ts`
- Phone normalization: `src/lib/phone.ts` (default country `IN`)

## Mapping/Geo Dependencies
- UI map rendering: MapLibre (`src/components/ui/map.tsx`)
- Location suggestions: Nominatim (`src/hooks/use-nominatim.ts`)
- Nominatim query is currently restricted to country code `in`.

## Caching and Revalidation
- SWR hooks used for cart/orders/items/ride polling.
- Server actions call `revalidatePath` in some ride/cart flows.
- Certain APIs set `Cache-Control: no-store` for live data.

## Key Risks / Constraints
- No test suite currently committed.
- Middleware matcher does not cover role-prefixed routes used by current app paths.
- Admin role bootstrap requires manual DB creation (not available in public register schema).
