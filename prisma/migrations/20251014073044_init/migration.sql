/*
  Warnings:

  - Added the required column `language` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biasId` to the `Revision` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'CHINESE', 'HINDI', 'SPANISH', 'FRENCH', 'ARABIC', 'BENGALI', 'PORTUGUESE', 'RUSSIAN', 'URDU', 'INDONESIAN', 'MARATHI', 'GERMAN', 'JAPANESE', 'TELUGU', 'TURKISH', 'SRI_LANKAN_TAMIL', 'CANTONESE', 'VIETNAMESE', 'FILIPINO', 'KOREAN', 'HAUSA', 'EGYPTIAN_ARABIC', 'JAVANESE', 'ITALIAN', 'DUTCH', 'GREEK', 'SWEDISH', 'NORWEGIAN', 'POLISH', 'THAI', 'UKRANIAN', 'ROMANIAN', 'CZECH', 'HUNGARIAN', 'FINNISH', 'DANISH', 'BULGARIAN', 'SLOVAK', 'CROATIAN', 'LITHUANIAN', 'SLOVENIAN', 'LATVIAN', 'ESTONIAN', 'ICELANDIC', 'ALBANIAN', 'SERBIAN', 'MACEDONIAN', 'BOSNIAN', 'MONTENEGRIN', 'MALTESE');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "Revision" ADD COLUMN     "biasId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "subscriptionExpiresAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionStartedAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ModeratorBias" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "biasId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModeratorBias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiasBan" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "biasId" INTEGER NOT NULL,
    "bannedByUserId" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "BiasBan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevisionVote" (
    "id" SERIAL NOT NULL,
    "revisionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RevisionVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleWatcher" (
    "articleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleWatcher_pkey" PRIMARY KEY ("articleId","userId")
);

-- CreateTable
CREATE TABLE "SavedArticle" (
    "articleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedArticle_pkey" PRIMARY KEY ("articleId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModeratorBias_userId_biasId_key" ON "ModeratorBias"("userId", "biasId");

-- CreateIndex
CREATE UNIQUE INDEX "Bias_name_key" ON "Bias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BiasBan_userId_biasId_key" ON "BiasBan"("userId", "biasId");

-- CreateIndex
CREATE UNIQUE INDEX "RevisionVote_revisionId_userId_key" ON "RevisionVote"("revisionId", "userId");

-- AddForeignKey
ALTER TABLE "ModeratorBias" ADD CONSTRAINT "ModeratorBias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeratorBias" ADD CONSTRAINT "ModeratorBias_biasId_fkey" FOREIGN KEY ("biasId") REFERENCES "Bias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiasBan" ADD CONSTRAINT "BiasBan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiasBan" ADD CONSTRAINT "BiasBan_biasId_fkey" FOREIGN KEY ("biasId") REFERENCES "Bias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiasBan" ADD CONSTRAINT "BiasBan_bannedByUserId_fkey" FOREIGN KEY ("bannedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_biasId_fkey" FOREIGN KEY ("biasId") REFERENCES "Bias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionVote" ADD CONSTRAINT "RevisionVote_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "Revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionVote" ADD CONSTRAINT "RevisionVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleWatcher" ADD CONSTRAINT "ArticleWatcher_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleWatcher" ADD CONSTRAINT "ArticleWatcher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
