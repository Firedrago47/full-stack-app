import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { RideStatus } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/current-user";
import DashboardShell from "../../shared/layout/DashboardShell";
import RideInfoPanel from "../components/RideInfoPanel";
import RideActions from "../components/RideActions";
import DriverMap from "../components/DriverMap";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DriverRidePage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/driver/login");

  const { id: rideId } = await params;
  if (!rideId) notFound();

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!driver) notFound();

  const ride = await prisma.ride.findUnique({
    where: { id: rideId },
  });

  if (!ride) notFound();

  if (ride.driverId !== driver.id) {
    notFound();
  }

  if (
    ride.status === RideStatus.COMPLETED ||
    ride.status === RideStatus.CANCELLED
  ) {
    redirect("/driver/dashboard");
  }

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RideInfoPanel ride={ride} />
        <DriverMap />
      </div>

      <div className="mt-6">
        <RideActions ride={ride} />
      </div>
    </DashboardShell>
  );
}
