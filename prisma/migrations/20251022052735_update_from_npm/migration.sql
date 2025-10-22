/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ModeratorBias` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."ModeratorBias_userId_biasId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ModeratorBias_userId_key" ON "ModeratorBias"("userId");
