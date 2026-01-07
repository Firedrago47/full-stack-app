import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect, notFound } from "next/navigation";
import RideStatusView from "@/app/customer/components/RideStatusView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RideDetailsPage({ params }: PageProps) {
  // ✅ unwrap params FIRST
  const { id: rideId } = await params;

  const user = await getCurrentUser();
  if (!user) redirect("/customer/auth/login");

  if (!rideId) notFound();

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

  // 🔐 authorization
  if (ride.customerId !== user.id) {
    redirect("/customer/dashboard");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">

    <RideStatusView
      rideId={ride.id}
      initialRide={{
        id: ride.id,
        status: ride.status,
        pickupAddress: ride.pickupAddress!,
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
