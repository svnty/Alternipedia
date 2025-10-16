import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  migrations: {
    seed: `tsx prisma/seed.ts`,
  },
  schema: "./prisma/schema.prisma",
});