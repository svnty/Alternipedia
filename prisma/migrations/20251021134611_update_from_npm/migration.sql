-- CreateTable
CREATE TABLE "UploadedImages" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "biasId" INTEGER NOT NULL,
    "uploadedByUserId" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadedImages_url_key" ON "UploadedImages"("url");

-- AddForeignKey
ALTER TABLE "UploadedImages" ADD CONSTRAINT "UploadedImages_biasId_fkey" FOREIGN KEY ("biasId") REFERENCES "Bias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedImages" ADD CONSTRAINT "UploadedImages_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
