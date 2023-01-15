import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.contentType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'video',
    }
  });
  await prisma.contentType.upsert({
    where: { id: 2 },
    update: {},
    create: {
    name: 'text',
    }
  });
  await prisma.contentType.upsert({
  where: { id: 3 },
  update: {},
  create: {
  name: 'cite',
  }
  });
  await prisma.contentType.upsert({
  where: { id: 4 },
  update: {},
  create: {
  name: 'photo',
  }
  });
  await prisma.contentType.upsert({
  where: { id: 5 },
  update: {},
  create: {
  name: 'link',
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
