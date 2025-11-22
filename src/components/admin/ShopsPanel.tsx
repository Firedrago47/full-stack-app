// File: components/admin/ShopsPanel.tsx
"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

type ShopOwner = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string | Date;
};

export default function ShopsPanel() {
  const { data, error, isLoading } = useSWR<ShopOwner[]>("/api/admin/shops", fetcher);

  if (isLoading) return <div className="p-6 bg-white rounded shadow-sm">Loading shops…</div>;
  if (error) return <div className="p-6 bg-white rounded shadow-sm">Failed to load shops</div>;

  const shops = data ?? [];

  return (
    <section className="bg-white border rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Shop Owners</h3>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {shops.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No shop owners found.
                </TableCell>
              </TableRow>
            )}

            {shops.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name ?? "—"}</TableCell>
                <TableCell>{s.email ?? "—"}</TableCell>
                <TableCell>{s.phone ?? "—"}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(s.createdAt), { addSuffix: true })}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm">Profile</Button>
                    <Button variant="outline" size="sm">Contact</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
