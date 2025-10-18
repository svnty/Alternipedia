/*
  Warnings:

  - You are about to drop the column `userId` on the `BiasBan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,biasId]` on the table `BiasBan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `BiasBan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BiasBan" DROP CONSTRAINT "BiasBan_userId_fkey";

-- DropIndex
DROP INDEX "public"."BiasBan_userId_biasId_key";

-- AlterTable
ALTER TABLE "BiasBan" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT,
    "content" JSONB NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiasBan_userEmail_biasId_key" ON "BiasBan"("userEmail", "biasId");

-- AddForeignKey
ALTER TABLE "BiasBan" ADD CONSTRAINT "BiasBan_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
