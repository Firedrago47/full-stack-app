export const dynamic = "force-dynamic";

import ProtectedLayout from "@/components/ProtectedLayout";
import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";
import ShopItemsPageClient from "./ShopItemsPageClient";
import DashboardTopbar from "../components/DashboardTopbar";

export default async function ShopItemsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const shop = await prisma.shop.findUnique({
    where: { ownerId: user.id },
    include: { items: true },
  });

  return (
    <ProtectedLayout allowedRoles={["SHOP_OWNER"]}>
      <DashboardTopbar />

      {!shop ? (
        <div className="p-6 text-red-500 font-medium">
          ❗ No shop is linked to this account.  
          Please contact support.
        </div>
      ) : (
        <ShopItemsPageClient shop={shop} />
      )}
    </ProtectedLayout>
  );
}
