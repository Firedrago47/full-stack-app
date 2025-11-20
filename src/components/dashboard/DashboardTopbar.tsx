// components/DashboardTopbar.tsx
import Link from "next/link";

export default function DashboardTopbar() {
  return (
    <header className="h-14 bg-white border-b flex items-center px-6 justify-between">
      <div className="text-sm font-medium">Dashboard</div>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm text-red-600">Logout</Link>
        <Link href="/profile" className="text-sm p-1 text-blue-600 border border-blue-500 rounded">Profile</Link>
      </div>
    </header>
  );
}
