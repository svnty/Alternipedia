-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentEditableBiasChangedAt" TIMESTAMP(3),
ADD COLUMN     "currentEditableBiasId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentEditableBiasId_fkey" FOREIGN KEY ("currentEditableBiasId") REFERENCES "Bias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
