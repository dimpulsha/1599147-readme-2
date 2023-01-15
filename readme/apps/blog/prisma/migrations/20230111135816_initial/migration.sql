/*
  Warnings:

  - You are about to drop the column `postName` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "postName",
ADD COLUMN     "postTitle" TEXT;
