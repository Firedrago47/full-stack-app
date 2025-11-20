// lib/auth/get-current-user.ts
import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";
import prisma from "@/lib/prisma";

export type CurrentUser = {
  id: string;
  email: string | null;
  name: string | null;
  role: "CUSTOMER" | "DRIVER" | "SHOP_OWNER" | "ADMIN";
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;

    const payload = verifyJwt(token);
    if (!payload?.sub) return null;

    // Fetch minimal user info from DB
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as CurrentUser["role"],
    };
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}
