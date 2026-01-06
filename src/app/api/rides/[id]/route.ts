import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ IMPORTANT

    if (!id) {
      return NextResponse.json(
        { error: "Ride ID missing" },
        { status: 400 }
      );
    }

    const ride = await prisma.ride.findUnique({
      where: { id },
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

    if (!ride) {
      return NextResponse.json(
        { error: "Ride not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ride });
  } catch (error) {
    console.error("GET /api/rides/[id] error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}