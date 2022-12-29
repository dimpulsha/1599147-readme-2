/*
  Warnings:

  - You are about to drop the column `citeAuthor` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `linkDescription` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `linkURL` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `photoLink` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postReview` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postText` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ContentType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `PostState` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "citeAuthor",
DROP COLUMN "linkDescription",
DROP COLUMN "linkURL",
DROP COLUMN "photoLink",
DROP COLUMN "postName",
DROP COLUMN "postReview",
DROP COLUMN "postText",
ALTER COLUMN "isRepost" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "postName" TEXT,
    "postReview" TEXT,
    "postText" TEXT,
    "linkURL" TEXT,
    "photoLink" TEXT,
    "linkDescription" TEXT,
    "citeAuthor" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_postId_key" ON "Content"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentType_name_key" ON "ContentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PostState_name_key" ON "PostState"("name");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
