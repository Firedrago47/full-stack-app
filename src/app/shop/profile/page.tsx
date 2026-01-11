export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardTopbar from "../shared/layout/DashboardTopbar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/app/actions/logout";

export default async function ShopProfilePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "SHOP_OWNER") redirect("/shop/login");

  const shop = await prisma.shop.findUnique({
    where: { ownerId: user.id },
  });


  return (
    <>
      <DashboardTopbar />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Shop Profile</h1>
          <p className="text-muted-foreground">
            Manage your business and store information.
          </p>
        </div>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Shop Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-5">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/images/profile-default.png" />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Shop Name</p>
                <p className="font-medium">{shop?.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{shop?.address}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">
                  {shop?.isOpen ? "Open" : "Closed"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form action={logout}>
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </form>
      </div>
    </>
  );
}
