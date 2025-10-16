/*
  Warnings:

  - A unique constraint covering the columns `[slug,language]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,language]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,language]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Article_slug_key";

-- DropIndex
DROP INDEX "public"."Article_title_key";

-- DropIndex
DROP INDEX "public"."Category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_language_key" ON "Article"("slug", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_language_key" ON "Article"("title", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_language_key" ON "Category"("name", "language");
