import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  if (global.__prisma) return global.__prisma;

  const client = new PrismaClient({
    log: ["query"],
  });

  if (process.env.NODE_ENV !== "production") {
    global.__prisma = client;
  }

  return client;
}

const prisma = getPrisma();
export default prisma;
