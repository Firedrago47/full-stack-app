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
  // 1️⃣ Auth (user)
  const user = await getCurrentUser();
  if (!user) redirect("/driver/login");

  // 2️⃣ Resolve params (Next.js 15+)
  const { id: rideId } = await params;
  if (!rideId) notFound();

  // 3️⃣ Load driver record
  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!driver) notFound();

  // 4️⃣ Load ride
  const ride = await prisma.ride.findUnique({
    where: { id: rideId },
  });

  if (!ride) notFound();

  // 5️⃣ Ownership check (CORRECT)
  if (ride.driverId !== driver.id) {
    notFound();
  }

  // 6️⃣ Invalid terminal states
  if (
    ride.status === RideStatus.COMPLETED ||
    ride.status === RideStatus.CANCELLED
  ) {
    redirect("/driver/dashboard");
  }

  // 7️⃣ Render
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
