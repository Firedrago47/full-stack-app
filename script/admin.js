// scripts/create-admin.js
// Usage: node scripts/create-admin.js admin@example.com YourP@ssw0rd

const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const rawPassword = process.argv[3];

  if (!email || !rawPassword) {
    console.error("Usage: node scripts/create-admin.js <email> <password>");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("User already exists:", existing.email, existing.role);
    await prisma.$disconnect();
    return;
  }

  const hashed = await bcrypt.hash(rawPassword, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: "Admin",
      role: "ADMIN",
      phone: "1234567890",
    },
  });

  console.log("Created admin:", user.id, user.email);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
