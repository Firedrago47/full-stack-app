// components/DashboardTopbar.tsx
import Link from "next/link";
import { Button } from "../ui/button";

export default function DashboardTopbar() {
  return (
    <header className="h-14 bg-white border-b flex items-center px-6 justify-between">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm text-red-600">Logout</Link>
        <Button>

        <Link href="/profile" className="font-bold">Profile</Link>
        </Button>
      </div>
    </header>
  );
}
