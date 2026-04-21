# Interview Preparation Guide

Project: `full-stack-app` (Devsync Delivery)  
Stack: Next.js App Router, TypeScript, Prisma/PostgreSQL, JWT auth, SWR, Tailwind/Radix

## 1) 60-Second Project Pitch

"This is a multi-role delivery and mobility platform in a single Next.js codebase. It supports customer commerce and ride booking, driver assignment and ride lifecycle handling, shop-owner catalog management, and admin operations like analytics and CSV export. Backend and frontend are colocated using App Router pages, API route handlers, and server actions, with PostgreSQL via Prisma. Auth is JWT in an httpOnly cookie with role-based authorization in APIs and protected layouts."

## 2) Core Architecture Talking Points

- Monorepo-style single Next.js app with colocated UI + API.
- Route handlers under `src/app/api/**/route.ts` for HTTP APIs.
- Server actions for mutation-heavy flows (cart + ride lifecycle).
- Prisma as domain boundary for persistence and transactional logic.
- SWR for client-side polling/caching (cart, orders, ride status).
- Four actor domains:
  - Customer
  - Driver
  - Shop Owner
  - Admin

## 3) Domain Model You Should Be Ready to Explain

Key entities:
- `User` with roles: `CUSTOMER`, `DRIVER`, `SHOP_OWNER`, `ADMIN`
- `Driver`, `Shop` as role-specific profile tables
- `Item`, `Order`, `OrderItem` for commerce flows
- `Ride` for taxi lifecycle

Important lifecycles:
- `OrderStatus`: `CART -> CREATED -> ... -> DELIVERED` (or `CANCELLED`)
- `RideStatus`: `REQUESTED -> ASSIGNED -> ACCEPTED -> ... -> COMPLETED` (or `CANCELLED`)

## 4) High-Probability Interview Questions (Humanized Answers)

1. Why use server actions and API routes together?
   - "I used both because they solve slightly different problems. For public-style endpoints like listing items or admin export, API routes are clearer. For app-internal actions like cart updates or ride transitions, server actions felt faster to build and easier to wire with revalidation. So in this project, API routes handle resource access, and server actions handle user workflows."

2. How is authorization enforced?
   - "Login sets a JWT in an httpOnly `session` cookie. On protected requests, I decode that cookie, load the user, and check role permissions. I enforce it in route handlers and protected layouts. For admin APIs, I centralized checks with `requireAdmin()` so I don't repeat auth logic in every file."

3. How do you avoid race conditions in driver assignment?
   - "I was careful about double-assignment when multiple drivers poll at the same time. I moved assignment into a dedicated helper that atomically claims the oldest eligible `REQUESTED` ride. That way two drivers don't get the same ride in normal concurrent traffic."

4. Why App Router for this project?
   - "App Router matched this project well because we have multiple roles and shared layout patterns. It let me colocate pages, layouts, API handlers, and server actions in one structure, which kept feature development simpler."

5. How does the customer checkout flow work?
   - "The cart is stored as an order with status `CART`. Add/update/remove happens through server actions. At checkout, I validate the cart isn't empty, then move status to `CREATED`. On the orders page, I exclude active `CART` so users only see real orders."

6. What are the current technical risks?
   - "The biggest gaps today are: no committed automated tests yet, middleware matching doesn’t fully cover all role-prefixed routes, and admin users still need direct DB bootstrap. I'd call those out early and prioritize fixing them."

7. How would you scale this system?
   - "If traffic grows, I'd first add queue/event infrastructure for assignment and order transitions, then push longer workflows to background workers. In parallel I'd tighten DB indexing and add stronger observability and rate limiting before splitting into more services."

8. How is data validation handled?
   - "I validate inputs with Zod schemas before business logic runs. In this codebase, auth and item payloads are validated in `src/lib/validation/*`, which helps keep handlers predictable and safer."

## 5) Short, Natural Intro You Can Use

"I built a multi-role delivery app in Next.js where customers can order food/groceries or book rides, drivers can manage ride lifecycle, shop owners manage inventory, and admins monitor analytics and verify drivers.  
From an engineering side, I worked on role-based auth, Prisma-backed APIs, server actions for workflow mutations, and lifecycle transitions for orders and rides."

## 6) "Tell Me About a Challenge" (Ready-to-Say Answer)

"One challenge was avoiding ride assignment conflicts when several drivers request work at the same time.  
My first version was too optimistic, so I refactored assignment into a dedicated atomic flow that claims the oldest eligible ride safely.  
That improved consistency and made the logic easier to reason about and test."

## 7) Be Ready to Defend These Design Tradeoffs

- Single codebase velocity vs. service isolation.
- Cookie JWT simplicity vs. token rotation/session-store complexity.
- Polling (SWR) simplicity vs. WebSocket real-time complexity.
- Fast delivery with server actions vs. stricter API-only architecture.

## 8) Practical Deep-Dive Topics (Likely Follow-ups)

- Walk through `GET /api/driver/assignment` end-to-end.
- Explain role-scoped route trees (`/customer/*`, `/driver/*`, `/shop/*`, `/admin/*`).
- Show item CRUD authorization for shop owners.
- Explain why admin role is not in public registration schema.
- Discuss map and geocoding integration boundaries (MapLibre + Nominatim).

## 9) System Design Prompts You Can Practice

1. "Design real-time ride tracking instead of polling."
   - Introduce event stream/WebSockets, push ride state changes, keep polling as fallback.

2. "Prevent stale updates on ride/order transitions."
   - Add optimistic concurrency controls (status preconditions/versioning) and idempotent transition handlers.

3. "How would you split this into services?"
   - Candidate boundaries: Auth, Commerce, Ride Dispatch, Admin Reporting. Keep a shared contract layer and event-driven integration.

4. "How to support multi-country phone/address?"
   - Externalize country assumptions, normalize by locale, and validate regionally.

## 10) Code Review / Debugging Preparation

Have concrete examples ready:
- Missing middleware coverage for current role-prefixed routes.
- Potential mixed-shop cart policy issue (business-rule decision needed).
- Inconsistent auth strictness (e.g., public ride detail endpoint) and when to tighten it.

## 11) Testing Strategy to Propose in Interview

- Unit tests:
  - Validation schemas
  - Auth helpers (`jwt`, `current-user`)
  - Driver assignment helper logic
- Integration tests:
  - API auth/authorization matrix by role
  - Cart checkout and order cancel transitions
  - Ride lifecycle transitions
- E2E tests:
  - Customer order path
  - Driver assignment/accept/start/complete path
  - Shop item CRUD path
  - Admin verify/export flows

## 12) 2-Minute "Improvements Roadmap" Answer

Phase 1:
- Add baseline automated tests for critical flows.
- Fix middleware matcher coverage for role route prefixes.
- Add rate limiting + structured request logging on sensitive endpoints.

Phase 2:
- Add stronger ride/order transition guards (idempotency + concurrency controls).
- Improve observability (metrics, tracing, error correlation).
- Clarify cart constraints (single-shop vs multi-shop) as explicit business logic.

Phase 3:
- Introduce real-time transport for ride updates.
- Consider service extraction if team size/traffic justifies it.

## 13) Quick Revision Checklist (Night Before Interview)

- Rehearse architecture in under 60 seconds.
- Memorize one flow each for customer, driver, shop, and admin.
- Be able to name 3 current risks and 3 concrete improvements.
- Be ready to explain one difficult tradeoff and why you chose it.
- Prepare one "if I had 2 more weeks" implementation plan.
