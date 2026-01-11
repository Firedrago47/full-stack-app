export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardTopbar from "../shared/layout/DashboardTopbar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/logout";

export default async function DriverProfilePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "DRIVER") redirect("/driver/login");

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
  });

  return (
    <>
      <DashboardTopbar />

      <div className="max-w-4xl mx-auto p-6 space-y-8">

        <div>
          <h1 className="text-3xl font-bold">Driver Profile</h1>
          <p className="text-muted-foreground">
            Your driving information and earnings.
          </p>
        </div>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Driver Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/images/profile-default.png" />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-medium">{driver?.vehicleModel ?? "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">License</p>
                <p className="font-medium">{driver?.licenseNumber ?? "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vehicle Number</p>
                <p className="font-medium">{driver?.vehicleNumber ?? "Pending"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <form action={logout}>
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </form>
      </div>
    </>
  );
}
