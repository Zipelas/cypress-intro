import { db } from '../db';
import { seedWalks } from './walk';

async function main() {
  await seedWalks();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
