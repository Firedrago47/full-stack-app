// app/api/driver/route.ts
import { NextResponse } from "next/server";
import { getDriverDashboardData } from "@/lib/driver/get-dashboard-data";

export async function GET() {
  const data = await getDriverDashboardData();
  return NextResponse.json(data);
}
