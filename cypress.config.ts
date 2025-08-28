import { spawn } from 'child_process';
import { defineConfig } from 'cypress';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { seedTodos } from './prisma/seed/todo';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // 1. Skapa en in-memory databas (replica set för att Prisma gnäller annars)
      const db = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
      const dbUri = db.getUri('cypress-test');

      // 2. Start Next.JS servern (på en annan port som ansluter till 1.)
      const server = spawn(
        'npx',
        ['next', 'dev', '--turbopack', '-p', '3100'],
        {
          env: {
            NODE_ENV: 'test',
            DATABASE_URL: dbUri,
          },
          stdio: 'inherit',
        }
      );
      // 3. Vänta på att Next.JS servern är igång innan Cypress kör vidare.
      // 4. Städa upp processerna dvs Mongo databasen och Next.JS server
      // 5. Reseeda om databasen så att testerna blir oberoende av varandra

      on('task', {
        async reseed() {
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
