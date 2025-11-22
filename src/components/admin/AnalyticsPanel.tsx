// File: components/admin/AnalyticsPanel.tsx
"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Card, CardContent } from "@/components/ui/card";

export default function AnalyticsPanel() {
  const { data, error, isLoading } = useSWR("/api/admin/analytics", fetcher);

  if (isLoading) return <div className="p-6 bg-white rounded shadow-sm">Loading analytics…</div>;
  if (error) return <div className="p-6 bg-white rounded shadow-sm">Failed to load analytics</div>;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-sm text-muted-foreground">Overview of platform activity.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border">
          <CardContent>
            <div className="text-sm text-muted-foreground">Total Users</div>
            <div className="text-3xl font-semibold">{data.totalUsers ?? "—"}</div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent>
            <div className="text-sm text-muted-foreground">Drivers</div>
            <div className="text-3xl font-semibold">{data.totalDrivers ?? "—"}</div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent>
            <div className="text-sm text-muted-foreground">Shop Owners</div>
            <div className="text-3xl font-semibold">{data.totalShops ?? "—"}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border h-48 flex items-center justify-center">
        <CardContent>
          <div className="text-sm text-muted-foreground">Charts will be placed here (future).</div>
        </CardContent>
      </Card>
    </div>
  );
}
