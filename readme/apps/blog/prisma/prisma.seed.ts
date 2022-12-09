import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: '42',
      contentType: {
        create: {
          name: 'text'
        }
      },
      postName: 'the first post',
      postReview: 'the post about life',
      postText: 'I am start study next.js',
      linkURL: '',
      photoLink:'',
      linkDescription: '',
      citeAuthor:'',
      isRepost: false,
      originUserId: '',
      // originPost: null,
      likeCount: 0,
      // likeList: null,
      commentCount: 0,
      repostCount: 0,
      postState: {
        create: {
          name: 'draft'
        }
      },
      tags: {
        create: [
          {
            iserId: '1',
            name: '#dayLog',
          },
          {
            iserId: '1',
            name: '#JavaScript',
          }
        ]
      }
    }
  });
}


fillDb()
   .then(async () => {
     await prisma.$disconnect()
   })
   .catch(async (err) => {
     console.error(err);
     await prisma.$disconnect()

     process.exit(1);
   })
