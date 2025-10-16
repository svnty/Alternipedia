-- Drop all data from ArticleCategory, add biasId column, set not null, add fk and new pk
BEGIN;

-- 1) Delete all rows (user requested)
TRUNCATE TABLE "ArticleCategory";

-- 2) Add the new column as NOT NULL with a safe default (use 1 as a placeholder)
ALTER TABLE "ArticleCategory" ADD COLUMN "biasId" INTEGER;

-- 3) If you want a default value set for future inserts, you can set DEFAULT here (optional)
-- ALTER TABLE "ArticleCategory" ALTER COLUMN "biasId" SET DEFAULT 1;

-- 4) Set NOT NULL (since table is empty, this is safe)
ALTER TABLE "ArticleCategory" ALTER COLUMN "biasId" SET NOT NULL;

-- 5) Add foreign key constraint
ALTER TABLE "ArticleCategory" ADD CONSTRAINT "ArticleCategory_biasId_fkey"
  FOREIGN KEY ("biasId") REFERENCES "Bias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 6) Drop old primary key and create new composite primary key including biasId
ALTER TABLE "ArticleCategory" DROP CONSTRAINT IF EXISTS "ArticleCategory_pkey";
ALTER TABLE "ArticleCategory" ADD CONSTRAINT "ArticleCategory_pkey"
  PRIMARY KEY ("articleId", "categoryId", "biasId");

COMMIT;
