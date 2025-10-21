/*
  Warnings:

  - You are about to drop the `UploadedImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UploadedImages" DROP CONSTRAINT "UploadedImages_biasId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UploadedImages" DROP CONSTRAINT "UploadedImages_uploadedByUserId_fkey";

-- DropTable
DROP TABLE "public"."UploadedImages";

-- CreateTable
CREATE TABLE "UploadedBlobs" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "biasId" INTEGER NOT NULL,
    "tier" "SubscriptionTier" NOT NULL DEFAULT 'FREE',
    "uploadedByUserId" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedBlobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadedBlobs_url_key" ON "UploadedBlobs"("url");

-- AddForeignKey
ALTER TABLE "UploadedBlobs" ADD CONSTRAINT "UploadedBlobs_biasId_fkey" FOREIGN KEY ("biasId") REFERENCES "Bias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedBlobs" ADD CONSTRAINT "UploadedBlobs_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
