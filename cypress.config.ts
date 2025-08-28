import { defineConfig } from 'cypress';
import { db } from './prisma/db';
import { seedTodos } from './prisma/seed/todo';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        // 1. Skapa en in-memory databas (replica set för att Prisma gnäller annars)
        // 2. Start Next.JS servern (på en annan port som ansluter till 1.)
        // 3. Vänta på att Next.JS servern är igång innan Cypress kör vidare.
        // 4. Städa upp processerna dvs Mongo databasen och Next.JS server
        // 5. Reseeda om databasen så att testerna blir oberoende av varandra
        async reseed() {
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
