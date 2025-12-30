export const dynamic = "force-dynamic";
export const runtime = "nodejs";


import ProtectedLayout from "@/components/ProtectedLayout";


export default async function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedLayout allowedRoles={["DRIVER"]}>{children}</ProtectedLayout>
    </>
  );
}
