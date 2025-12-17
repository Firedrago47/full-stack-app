import ProtectedLayout from "@/components/ProtectedLayout";

// app/dashboard/layout.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout allowedRoles={["SHOP_OWNER"]}>{children}</ProtectedLayout>;
}
