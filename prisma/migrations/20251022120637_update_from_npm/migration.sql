-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'GLOBAL_ADMIN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adminOfLang" "Language";
