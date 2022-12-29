/*
  Warnings:

  - You are about to drop the column `iserId` on the `Tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tags_iserId_name_key";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "iserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tags_userId_name_key" ON "Tags"("userId", "name");
