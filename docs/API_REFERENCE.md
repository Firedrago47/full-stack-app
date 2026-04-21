# API Reference

Base: same-origin Next.js route handlers under `/api/*`.

## Auth

### `POST /api/auth/register`
- Auth: public
- Purpose: create user (`CUSTOMER`/`DRIVER`/`SHOP_OWNER`)
- Validation: `RegisterSchema`
- Side effects:
  - `DRIVER` creates linked `Driver`
  - `SHOP_OWNER` creates linked `Shop`
- Success: `201 { user: { id, role, email } }`

### `POST /api/auth/login`
- Auth: public
- Purpose: authenticate by email or phone + password
- Validation: `LoginSchema`
- Success: `200 { success, user }` + sets `session` cookie
- Errors: `400`, `401`

### `POST /api/auth/logout`
- Auth: optional
- Purpose: clear `session` cookie
- Success: `200 { success: true }`

## Customer Commerce

### `GET /api/items?category=food|groceries|...`
- Auth: public
- Purpose: fetch active catalog items by category
- Behavior:
  - `food`: FOOD items + shop include
  - `groceries`: GROCERY items
  - fallback (e.g. taxi): empty list

### `GET /api/cart`
- Auth: required (current user)
- Purpose: fetch active CART order with nested items
- Success: `{ cart }`

### `POST /api/cart/checkout`
- Auth: required
- Purpose: convert cart status from `CART` to `CREATED`
- Error: `400` if empty cart

### `GET /api/orders`
- Auth: required
- Purpose: fetch customer orders excluding `CART`

### `POST /api/orders/:id/cancel`
- Auth: required (owner customer)
- Purpose: cancel order only when status is `CREATED`
- Error: `400` if status disallows cancel

## Rides

### `GET /api/rides/available`
- Auth: public
- Purpose: list active/available drivers without active rides
- Caching: `no-store`

### `GET /api/rides/:id`
- Auth: public (as implemented)
- Purpose: ride detail + driver user (id, name)
- Errors: `400`, `404`, `500`

## Driver

### `GET /api/driver`
- Auth: required
- Purpose: consolidated driver dashboard payload
- Source: `getDriverDashboardData()`

### `GET /api/driver/assignment`
- Auth: required driver
- Purpose: assign oldest eligible ride atomically
- Source: `assignRideToDriver()`

## Shop Items

### `POST /api/shop/items`
- Auth: required `SHOP_OWNER`
- Validation: `CreateItemSchema`
- Purpose: create item for a shop

### `PATCH /api/shop/items/:id`
- Auth: required (owner of shop)
- Validation: `UpdateItemSchema`
- Purpose: partial item update

### `DELETE /api/shop/items/:id`
- Auth: required (owner of shop)
- Purpose: delete item

## Admin
All admin endpoints require authenticated `ADMIN` user.

### `GET /api/admin/analytics`
- Returns total users, drivers, shops.

### `GET /api/admin/customers`
- Returns latest 100 customer users.

### `GET /api/admin/drivers`
- Returns latest 100 drivers with normalized user profile fields.

### `GET /api/admin/drivers/:id`
- Lookup by `driver.id` or `driver.userId`.

### `POST /api/admin/drivers/:id/verify`
- Sets `driver.isActive = true` by `driver.id` or `driver.userId`.

### `GET /api/admin/shops`
- Returns latest 100 users with role `SHOP_OWNER`.

### `GET /api/admin/export?type=users|drivers|shops`
- Returns CSV download for selected entity.
- Errors on unknown export type.

## Server Actions (Non-HTTP public API)
Implemented in server-side action modules and invoked by React components/hooks.

- `src/app/actions/cart.ts`
  - `addToCart(itemId, quantity)`
  - `updateCartItem(orderItemId, quantity)`
  - `removeCartItem(orderItemId)`
- `src/app/actions/create-ride.ts`
- `src/app/actions/confirm-ride.ts`
- `src/app/actions/cancel-ride.ts`
- `src/app/driver/dashboard/action.ts` (`acceptRide`, `rejectRide`)
- `src/app/driver/ride/actions.ts` (`startRide`, `completeRide`)
