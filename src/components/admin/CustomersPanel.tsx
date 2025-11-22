// File: components/admin/CustomersPanel.tsx
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

type Customer = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: string | Date;
};

export default function CustomersPanel() {
  const { data, error, isLoading } = useSWR<Customer[]>("/api/admin/customers", fetcher);

  if (isLoading) return <div className="p-6 bg-white rounded shadow-sm">Loading customers…</div>;
  if (error) return <div className="p-6 bg-white rounded shadow-sm">Failed to load customers</div>;

  const customers = data ?? [];

  return (
    <section className="bg-white border rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Customers</h3>

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
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No customers found.
                </TableCell>
              </TableRow>
            )}

            {customers.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name ?? "—"}</TableCell>
                <TableCell>{u.email ?? "—"}</TableCell>
                <TableCell>{u.phone ?? "—"}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="destructive" size="sm">Suspend</Button>
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
