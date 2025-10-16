/*
  Warnings:

  - You are about to drop the column `order` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Revision` table. All the data in the column will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Block" DROP CONSTRAINT "Block_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Revision" DROP CONSTRAINT "Revision_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Section" DROP CONSTRAINT "Section_revisionId_fkey";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "order",
DROP COLUMN "sectionId",
ADD COLUMN     "authorId" TEXT;

-- AlterTable
ALTER TABLE "Revision" DROP COLUMN "authorId";

-- DropTable
DROP TABLE "public"."Section";

-- CreateTable
CREATE TABLE "RevisionBlock" (
    "id" SERIAL NOT NULL,
    "revisionId" INTEGER NOT NULL,
    "blockId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "RevisionBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RevisionBlock_revisionId_blockId_key" ON "RevisionBlock"("revisionId", "blockId");

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionBlock" ADD CONSTRAINT "RevisionBlock_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "Revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionBlock" ADD CONSTRAINT "RevisionBlock_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
