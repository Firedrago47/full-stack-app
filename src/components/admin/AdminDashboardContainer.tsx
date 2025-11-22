// File: components/admin/AdminDashboardContainer.tsx
"use client";

import { useState } from "react";

import AdminSidebarWrapper from "./AdminSidebarWrapper";
import AdminSidebar from "./AdminSidebar";

import AnalyticsPanel from "./AnalyticsPanel";
import CustomersPanel from "./CustomersPanel";
import DriversPanel from "./DriversPanel";
import ShopsPanel from "./ShopsPanel";

export default function AdminDashboardContainer() {
  const [tab, setTab] = useState<
    "analytics" | "customers" | "drivers" | "shops"
  >("analytics");

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* LEFT SIDEBAR */}
      <AdminSidebarWrapper>
        <AdminSidebar tab={tab} setTab={setTab} />
      </AdminSidebarWrapper>
      
      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6">
        {tab === "analytics" && <AnalyticsPanel />}
        {tab === "customers" && <CustomersPanel />}
        {tab === "drivers" && <DriversPanel />}
        {tab === "shops" && <ShopsPanel />}
      </div>
    </div>
  );
}
