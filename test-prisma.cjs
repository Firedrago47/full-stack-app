// test-prisma.cjs
try {
  const { PrismaClient } = require('@prisma/client');
  console.log('PrismaClient found:', typeof PrismaClient === 'function');
} catch (err) {
  console.error('require(@prisma/client) failed:', err && err.message);
  process.exit(1);
}
