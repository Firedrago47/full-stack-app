// File: components/admin/AdminSidebarWrapper.tsx

import React from "react";

export default function AdminSidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="w-64 border-r bg-white min-h-screen sticky top-0">
      <div className="p-4">{children}</div>
    </aside>
  );
}
