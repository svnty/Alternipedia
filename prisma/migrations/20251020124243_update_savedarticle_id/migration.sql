/*
  Warnings:

  - The primary key for the `SavedArticle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[articleId,userId]` on the table `SavedArticle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,userId]` on the table `SavedArticle` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `SavedArticle` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."SavedArticle" DROP CONSTRAINT "SavedArticle_articleId_fkey";

-- AlterTable: add new nullable id, language and slug columns, and make articleId optional
ALTER TABLE "SavedArticle" DROP CONSTRAINT "SavedArticle_pkey";

-- add columns as nullable so existing rows can be updated
ALTER TABLE "SavedArticle" ADD COLUMN "id" TEXT;
ALTER TABLE "SavedArticle" ADD COLUMN "language" "Language";
ALTER TABLE "SavedArticle" ADD COLUMN "slug" TEXT;
ALTER TABLE "SavedArticle" ALTER COLUMN "articleId" DROP NOT NULL;

-- backfill id for existing rows using a pseudo-random hash; ensures uniqueness
UPDATE "SavedArticle"
SET "id" = md5(random()::text || clock_timestamp()::text)
WHERE "id" IS NULL;

-- make id non-null and add primary key constraint
ALTER TABLE "SavedArticle" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeSubId" TEXT NOT NULL,
    "plan" "SubscriptionTier" NOT NULL,
    "status" TEXT NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubId_key" ON "Subscription"("stripeSubId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedArticle_articleId_userId_key" ON "SavedArticle"("articleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedArticle_slug_userId_key" ON "SavedArticle"("slug", "userId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
