# Route Map

This map lists user-facing App Router pages currently present in `src/app`.

## Public Root
- `/` - platform landing page

## Customer
- `/customer` - customer landing page
- `/customer/explore` - public explore page
- `/customer/login` - customer login
- `/customer/register` - customer registration
- `/customer/dashboard` - customer dashboard home
- `/customer/dashboard/food` - food browsing
- `/customer/dashboard/grocery` - grocery browsing
- `/customer/dashboard/ride` - ride dashboard view
- `/customer/orders` - customer order history
- `/customer/profile` - customer profile
- `/customer/ride/book` - book a ride
- `/customer/ride/[id]` - ride live status/details

## Driver
- `/driver` - driver landing page
- `/driver/login` - driver login
- `/driver/register` - driver registration
- `/driver/dashboard` - driver dashboard
- `/driver/profile` - driver profile
- `/driver/ride/[id]` - active ride detail/actions

## Shop Owner
- `/shop` - shop owner landing page
- `/shop/login` - shop login
- `/shop/register` - shop registration
- `/shop/dashboard` - shop dashboard
- `/shop/items` - shop item management
- `/shop/profile` - shop profile

## Admin
- `/admin/auth/login` - admin login page
- `/admin/auth/register` - admin-facing register UI (validation still uses non-admin role set)
- `/admin/dashboard` - admin dashboard

## Route Protection Notes
- Most protected pages enforce role authorization in server components via `ProtectedLayout` and `getCurrentUser()`.
- API routes enforce auth at handler level.
- `src/app/middleware.ts` currently targets `/dashboard/*`, `/login`, `/register` and does not cover the role-prefixed route tree.
