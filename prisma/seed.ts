import { PrismaClient } from '@prisma/client'
import { withRetry } from '@/lib/retry';

const prisma = new PrismaClient();

export async function main() {
  const categories = [
    "Science",
    "Technology",
    "History",
    "Society",
    "Arts",
    "Politics",
    "Geography",
    "Culture",
    "Philosophy",
    "People",
    "Animals"
  ];

  for (const name of categories) {
    await withRetry(() => prisma.category.upsert({
      where: { name_language: { name, language: "EN" } },
      update: {}, // do nothing if exists
      create: { language: "EN", name },
    }));
  }

  const biases = [
    "wikipedia",
    "socialist", 
    "liberal",
    "conservative",
    "nationalist"
  ]

  for (const name of biases) {
    await withRetry(() => prisma.bias.upsert({
      where: { name },
      update: {}, // do nothing if exists
      create: { name },
    }));
  }
}

// Only run main if this file is executed directly
if (require.main === module) {
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    });
}