// File: components/admin/DriversPanel.tsx
"use client";

import React, { useState } from "react";
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
import { toast } from "sonner";

type DriverRow = {
  id: string;
  userId?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  licenseNumber?: string | null;
  vehicleNumber?: string | null;
  vehicleModel?: string | null;
  isActive?: boolean;
  createdAt: string | Date;
};

export default function DriversPanel() {
  const { data, error, isLoading, mutate } = useSWR<DriverRow[]>("/api/admin/drivers", fetcher);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (isLoading) return <div className="p-6 bg-white rounded shadow-sm">Loading drivers…</div>;
  if (error) return <div className="p-6 bg-white rounded shadow-sm">Failed to load drivers</div>;

  const drivers = data ?? [];

  async function loadDetails(id: string) {
    // if basic list already includes details we can toggle; otherwise fetch single driver
    // We'll attempt to fetch details from the per-driver GET endpoint
    if (expandedId === id) return setExpandedId(null);

    try {
      setLoadingId(id);
      const res = await fetch(`/api/admin/drivers/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to load details");

      // merge into list locally
      mutate((prev) => {
        if (!prev) return prev;
        return prev.map((r) => (r.id === id ? { ...r, ...json.driver } : r));
      }, { revalidate: false });

      setExpandedId(id);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load driver details");
    } finally {
      setLoadingId(null);
    }
  }

  async function verifyDriver(id: string) {
    try {
      setVerifying(id);
      const res = await fetch(`/api/admin/drivers/${id}/verify`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Verify failed");

      // update list (refresh)
      await mutate(); // revalidate list
      toast.success("Driver verified");
    } catch (err: any) {
      toast.error(err?.message ?? "Verify failed");
    } finally {
      setVerifying(null);
    }
  }

  return (
    <section className="bg-white border rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Drivers</h3>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {drivers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No drivers found.
                </TableCell>
              </TableRow>
            )}

            {drivers.map((d) => {
              const isOpen = expandedId === d.id;
              return (
                <React.Fragment key={d.id}>
                  <TableRow>
                    <TableCell className="font-medium">{d.name ?? "—"}</TableCell>
                    <TableCell>{d.phone ?? "—"}</TableCell>
                    <TableCell>{formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}</TableCell>
                    <TableCell>{d.isActive ? <span className="text-green-600">Yes</span> : <span className="text-yellow-600">No</span>}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => loadDetails(d.id)}>
                          {loadingId === d.id ? "Loading..." : isOpen ? "Hide" : "Details"}
                        </Button>
                        <Button size="sm" onClick={() => verifyDriver(d.id)} disabled={verifying === d.id}>
                          {verifying === d.id ? "Verifying..." : "Verify"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {isOpen && (
                    <TableRow className="bg-slate-50 animate-in fade-in duration-200">
                      <TableCell colSpan={5}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
                          <div>
                            <p className="text-sm text-muted-foreground">License Number</p>
                            <p className="font-medium">{d.licenseNumber ?? "—"}</p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">Vehicle Number</p>
                            <p className="font-medium">{d.vehicleNumber ?? "—"}</p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">Vehicle Model</p>
                            <p className="font-medium">{d.vehicleModel ?? "—"}</p>
                          </div>

                          <div className="md:col-span-3">
                            {d.licenseNumber ? (
                              <p className="text-sm text-muted-foreground">License document may be available in details view.</p>
                            ) : (
                              <p className="text-sm text-muted-foreground">No license information.</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
