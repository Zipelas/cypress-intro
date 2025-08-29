import { spawn } from 'child_process';
import { defineConfig } from 'cypress';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import waitOn from 'wait-on';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3100',
    async setupNodeEvents(on) {
      // 1. Skapa en in-memory databas (replica set för att Prisma gnäller annars)
      const mongo = await MongoMemoryReplSet.create({
        replSet: { count: 1 },
      });
      const dbUri = mongo.getUri('cypress-test');

      // 2. Start Next.JS servern (på en annan port som ansluter till 1.)
      const server = spawn(
        'npx',
        ['next', 'dev', '--turbopack', '-p', '3100'],
        {
          env: {
            ...process.env,
            NODE_ENV: 'test',
            DATABASE_URL: dbUri,
            PORT: '3100',
          },
          stdio: 'inherit',
          shell: true,
        }
      );

      // 3. Vänta på att Next.JS servern är igång innan Cypress kör vidare.
      await waitOn({ resources: [`http://localhost:3100`], timeout: 60_000 });

      // 4. Städa upp processerna dvs Mongo databasen och Next.JS server
      const cleanUp = async () => {
        server.kill();
        await mongo.stop();
      };
      on('after:run', cleanUp);
      process.on('SIGTERM', cleanUp);

      // 5. Reseeda om databasen så att testerna blir oberoende av varandra
      process.env.DATABASE_URL = dbUri;
      on('task', {
        async reseed() {
          const { db } = await import('./prisma/db');
          const { seedTodos } = await import('./prisma/seed/todo');
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
