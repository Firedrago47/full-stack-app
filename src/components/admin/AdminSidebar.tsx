// File: components/admin/AdminSidebar.tsx

"use client";
import { Button } from "@/components/ui/button";

import {
  BarChart3,
  Users,
  UserCheck,
  Store,
} from "lucide-react";

export default function AdminSidebar({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (t: any) => void;
}) {
  const base =
    "w-full justify-start font-medium text-left";
  const active =
    "bg-primary/10 text-primary border border-primary/20";

  return (
    <nav className="space-y-2">
      {/* Analytics */}
      <Button
        variant="ghost"
        className={`${base} ${tab === "analytics" ? active : ""}`}
        onClick={() => setTab("analytics")}
      >
        <BarChart3 className="mr-2 h-4 w-4" />
        Analytics
      </Button>

      {/* Customers */}
      <Button
        variant="ghost"
        className={`${base} ${tab === "customers" ? active : ""}`}
        onClick={() => setTab("customers")}
      >
        <Users className="mr-2 h-4 w-4" />
        Customers
      </Button>

      {/* Drivers */}
      <Button
        variant="ghost"
        className={`${base} ${tab === "drivers" ? active : ""}`}
        onClick={() => setTab("drivers")}
      >
        <UserCheck className="mr-2 h-4 w-4" />
        Drivers
      </Button>

      {/* Shops */}
      <Button
        variant="ghost"
        className={`${base} ${tab === "shops" ? active : ""}`}
        onClick={() => setTab("shops")}
      >
        <Store className="mr-2 h-4 w-4" />
        Shops
      </Button>
    </nav>
  );
}
