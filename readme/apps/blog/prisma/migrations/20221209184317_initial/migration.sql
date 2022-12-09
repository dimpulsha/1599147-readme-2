-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_originPostId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "originPostId" DROP NOT NULL,
ALTER COLUMN "likeCount" SET DEFAULT 0,
ALTER COLUMN "commentCount" SET DEFAULT 0,
ALTER COLUMN "repostCount" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originPostId_fkey" FOREIGN KEY ("originPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
