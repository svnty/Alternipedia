/*
  Warnings:

  - The primary key for the `ArticleWatcher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[articleId,userId]` on the table `ArticleWatcher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,userId]` on the table `ArticleWatcher` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `ArticleWatcher` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."ArticleWatcher" DROP CONSTRAINT "ArticleWatcher_articleId_fkey";

-- AlterTable
ALTER TABLE "ArticleWatcher" DROP CONSTRAINT "ArticleWatcher_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "language" "Language",
ADD COLUMN     "slug" TEXT,
ALTER COLUMN "articleId" DROP NOT NULL,
ADD CONSTRAINT "ArticleWatcher_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleWatcher_articleId_userId_key" ON "ArticleWatcher"("articleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleWatcher_slug_userId_key" ON "ArticleWatcher"("slug", "userId");

-- AddForeignKey
ALTER TABLE "ArticleWatcher" ADD CONSTRAINT "ArticleWatcher_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
