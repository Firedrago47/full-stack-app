// components/DashboardSidebar.tsx
import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <h3 className="text-lg font-semibold mb-4">App</h3>
      <nav className="space-y-2">
        <Link href="/dashboard/customer" className="block py-2 px-3 rounded hover:bg-slate-100">Customer</Link>
        <Link href="/dashboard/driver" className="block py-2 px-3 rounded hover:bg-slate-100">Driver</Link>
        <Link href="/dashboard/shop" className="block py-2 px-3 rounded hover:bg-slate-100">Shop</Link>
      </nav>
    </aside>
  );
}
