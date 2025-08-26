import { db } from './db';

async function main() {
  const mockedTodos: Todos[] = [
    { id: '68adb3170c2c50f13d0a64ed', text: 'Feed the cat' },
    { id: '68adb3170c2c50f13d0a64ee', text: 'Ignore the dogs' },
    { id: '68adb3170c2c50f13d0a64ef', text: 'Walk all the cats' },
  ];

  for (const { id, ...todo } of mockedTodos) {
    await db.todo.upsert({
      where: { id },
      update: todo,
      create: { id, ...todo },
    });
  }
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
