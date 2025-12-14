import ProtectedLayout from "@/components/ProtectedLayout";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>    <ProtectedLayout allowedRoles={["CUSTOMER"]}>
  {children}</ProtectedLayout></>;
}
