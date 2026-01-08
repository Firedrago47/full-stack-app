import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect, notFound } from "next/navigation";
import RideStatusView from "@/app/customer/ride/components/RideStatusView";
import { RideStatus } from "@prisma/client";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RideDetailsPage({ params }: PageProps) {
  const { id: rideId } = await params;

  if (!rideId) notFound();

  const user = await getCurrentUser();
  if (!user) redirect("/customer/auth/login");

  const ride = await prisma.ride.findUnique({
    where: { id: rideId },
    include: {
      driver: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!ride) notFound();

  if (ride.customerId !== user.id) {
    redirect("/customer/dashboard");
  }

  if (ride.status === RideStatus.CANCELLED) {
    redirect("/customer/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <RideStatusView
        rideId={ride.id}
        initialRide={{
          id: ride.id,
          status: ride.status,
          pickupAddress: ride.pickupAddress ?? "Pickup location",
          dropAddress: ride.dropAddress,
          driver: ride.driver
            ? {
                id: ride.driver.id,
                name: ride.driver.user.name ?? "Driver",
              }
            : null,
        }}
      />
    </div>
  );
}
