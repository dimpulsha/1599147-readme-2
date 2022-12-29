/*
  Warnings:

  - You are about to drop the column `postId` on the `Likes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "postId";

-- CreateTable
CREATE TABLE "_LikesToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikesToPost_AB_unique" ON "_LikesToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LikesToPost_B_index" ON "_LikesToPost"("B");

-- AddForeignKey
ALTER TABLE "_LikesToPost" ADD CONSTRAINT "_LikesToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Likes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikesToPost" ADD CONSTRAINT "_LikesToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
