/*
  Warnings:

  - The values [LIST,INFOBOX] on the enum `BlockType` will be removed. If these variants are still used in the database, this will fail.
  - The values [ENGLISH,CHINESE,HINDI,SPANISH,FRENCH,ARABIC,BENGALI,PORTUGUESE,RUSSIAN,URDU,INDONESIAN,MARATHI,GERMAN,JAPANESE,TELUGU,TURKISH,SRI_LANKAN_TAMIL,CANTONESE,VIETNAMESE,FILIPINO,KOREAN,HAUSA,EGYPTIAN_ARABIC,JAVANESE,ITALIAN,DUTCH,GREEK,SWEDISH,NORWEGIAN,POLISH,THAI,UKRANIAN,ROMANIAN,CZECH,HUNGARIAN,FINNISH,DANISH,BULGARIAN,SLOVAK,CROATIAN,LITHUANIAN,SLOVENIAN,LATVIAN,ESTONIAN,ICELANDIC,ALBANIAN,SERBIAN,MACEDONIAN,BOSNIAN,MONTENEGRIN,MALTESE] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlockType_new" AS ENUM ('PARAGRAPH', 'HEADING', 'QUOTE', 'BULLET_LIST_ITEM', 'NUMBERED_LIST_ITEM', 'CODE_BLOCK', 'TABLE', 'IMAGE', 'VIDEO', 'AUDIO');
ALTER TABLE "Block" ALTER COLUMN "type" TYPE "BlockType_new" USING ("type"::text::"BlockType_new");
ALTER TYPE "BlockType" RENAME TO "BlockType_old";
ALTER TYPE "BlockType_new" RENAME TO "BlockType";
DROP TYPE "public"."BlockType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('EN', 'ZH', 'HI', 'ES', 'FR', 'AR', 'BN', 'PT', 'RU', 'UR', 'ID', 'DE', 'JA', 'MR', 'TE', 'TR', 'TA', 'YUE', 'VI', 'FIL', 'KO', 'HA', 'ARZ', 'JV', 'IT', 'NL', 'EL', 'SV', 'NO', 'PL', 'TH', 'UK', 'RO', 'CS', 'HU', 'FI', 'DA', 'BG', 'SK', 'HR', 'LT', 'SL', 'LV', 'ET', 'IS', 'SQ', 'SR', 'MK', 'BS', 'CNR', 'MT');
ALTER TABLE "Article" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "public"."Language_old";
COMMIT;
