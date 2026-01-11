import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardTopbar from "../shared/layout/DashboardTopbar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/app/actions/logout";

export default async function CustomerProfilePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "CUSTOMER") redirect("/");

  const customer = await prisma.user.findUnique({
    where: { id: user.id },
    include: { customerAddresses: true },
  });

  return (
    <>
      <DashboardTopbar />

      <div className="max-w-4xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and saved addresses.
          </p>
        </div>

        {/* Account */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
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
                <Label className="font-semibold m-1">Name</Label>
                <Input defaultValue={customer?.name ?? ""} />
              </div>
              <div>
                <Label className="font-semibold m-1">Email</Label>
                <Input defaultValue={customer?.email ?? ""} />
              </div>
              <div>
                <Label className="font-semibold m-1">Phone</Label>
                <Input defaultValue={customer?.phone ?? ""} />
              </div>
            </div>

            <Button className="w-full" disabled>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Addresses */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Saved Addresses</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {customer?.customerAddresses.map((addr) => (
              <div key={addr.id} className="p-4 border rounded-lg bg-muted/30">
                <p className="font-medium">{addr.label ?? "Home"}</p>
                <p className="text-sm text-muted-foreground">{addr.address}</p>
              </div>
            ))}

            <Button variant="secondary" className="w-full">
              Add New Address
            </Button>
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
