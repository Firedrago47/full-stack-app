
import ProtectedLayout from "@/components/ProtectedLayout";
import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DashboardTopbar from "../shared/layout/DashboardTopbar";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) return null;

  // fetch full user details (addresses included)
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      customerAddresses: true,
    },
  });

  return (
    <ProtectedLayout allowedRoles={["CUSTOMER"]}>
      <DashboardTopbar />
        <div className="p-6 space-y-6">
          {/* HEADER */}
          <header>
            <h1 className="text-3xl font-extrabold">Your Profile</h1>
            <p className="text-sm text-muted-foreground">
              Manage your personal details, addresses & preferences.
            </p>
          </header>

          {/* PROFILE CARD */}
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/images/profile-default.png" />
                  <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() ?? "U"}</AvatarFallback>
                </Avatar>

                <Button variant="outline">Change Photo</Button>
              </div>

              <Separator />

              {/* Name */}
              <div>
                <Label>Name</Label>
                <Input defaultValue={fullUser?.name ?? ""} className="mt-1" />
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  defaultValue={fullUser?.email ?? ""}
                  type="email"
                  className="mt-1"
                />
              </div>

              {/* Phone */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  defaultValue={fullUser?.phone ?? ""}
                  type="text"
                  className="mt-1"
                />
              </div>

              <Button className="mt-2 w-full" disabled>
                Save Changes
              </Button>

            </CardContent>
          </Card>

          {/* ADDRESSES */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {fullUser?.customerAddresses.length ? (
                fullUser.customerAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                  >
                    <p className="font-medium">{addr.label ?? "Home"}</p>
                    <p className="text-sm text-muted-foreground">{addr.address}</p>

                    <div className="flex gap-3 mt-3">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No saved addresses yet.</p>
              )}

              <Button className="w-full" variant="secondary">
                Add New Address
              </Button>
            </CardContent>
          </Card>

          {/* LOGOUT */}
          <div className="flex justify-center">
            <form action="/api/auth/logout" method="post">
              <Button variant="destructive">Logout</Button>
            </form>
          </div>

        </div>
    </ProtectedLayout>
  );
}
