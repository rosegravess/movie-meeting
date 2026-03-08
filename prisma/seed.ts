import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FILM_IDS = [
  'princess-mononoke',
  'punch-drunk-love',
  'angels-egg',
  'fantastic-mr-fox',
  'the-mask',
  'eyes-wide-shut',
  'clue',
  'my-life-as-a-zucchini',
  'the-fall',
  'bugonia',
  'shawshank-redemption',
  'baby-driver',
];

async function main() {
  for (const id of FILM_IDS) {
    await prisma.filmState.upsert({
      where: { id },
      update: {},
      create: { id, status: 'unwatched' },
    });
  }
  console.log('Seeded film states.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
