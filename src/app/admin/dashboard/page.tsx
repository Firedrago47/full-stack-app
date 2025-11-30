// File: app/dashboard/admin/page.tsx
import ProtectedLayout from "@/components/ProtectedLayout";
import AdminDashboardContainer from "@/components/admin/AdminDashboardContainer";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  return (
    <ProtectedLayout allowedRoles={["ADMIN"]}>
      <DashboardTopbar/>
      <AdminDashboardContainer />
    </ProtectedLayout>
  );
}
