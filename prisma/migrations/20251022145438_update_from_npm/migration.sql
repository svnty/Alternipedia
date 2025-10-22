/*
  Warnings:

  - You are about to drop the column `language` on the `ArticleWatcher` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `ArticleWatcher` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `SavedArticle` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `SavedArticle` table. All the data in the column will be lost.
  - Made the column `articleId` on table `ArticleWatcher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bannedByUserId` on table `BiasBan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Block` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `language` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `assignedByAdminId` to the `ModeratorBias` table without a default value. This is not possible if the table is not empty.
  - Made the column `authorId` on table `Note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `articleId` on table `SavedArticle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."ArticleWatcher" DROP CONSTRAINT "ArticleWatcher_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BiasBan" DROP CONSTRAINT "BiasBan_bannedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Block" DROP CONSTRAINT "Block_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SavedArticle" DROP CONSTRAINT "SavedArticle_articleId_fkey";

-- DropIndex
DROP INDEX "public"."ArticleWatcher_slug_userId_key";

-- DropIndex
DROP INDEX "public"."SavedArticle_slug_userId_key";

-- AlterTable
ALTER TABLE "ArticleWatcher" DROP COLUMN "language",
DROP COLUMN "slug",
ALTER COLUMN "articleId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BiasBan" ALTER COLUMN "bannedByUserId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Block" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "language" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "language" "Language" NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ModeratorBias" ADD COLUMN     "assignedByAdminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SavedArticle" DROP COLUMN "language",
DROP COLUMN "slug",
ALTER COLUMN "articleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ModeratorBias" ADD CONSTRAINT "ModeratorBias_assignedByAdminId_fkey" FOREIGN KEY ("assignedByAdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiasBan" ADD CONSTRAINT "BiasBan_bannedByUserId_fkey" FOREIGN KEY ("bannedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleWatcher" ADD CONSTRAINT "ArticleWatcher_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
