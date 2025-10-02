import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ log: ['query'] });
} else {
  // Lazy-load Prisma for dev (Turbopack)
  if (!global.prisma) {
    global.prisma = new PrismaClient({ log: ['query'] });
  }
  prisma = global.prisma;
}

export { prisma };