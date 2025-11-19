import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth/jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();  
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}

export type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>;
