import { db } from '@/prisma/db';
import Link from 'next/link';
import Button from './ui/button';
import TodoList from './ui/todo-list';
import WalkForm from './ui/walk-form';

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main className='bg-black text-sky-600 p-4'>
      <h1 className='text-6xl text-sky'>🚶‍♂️‍➡️Walk Tracker - Walk this way 🎶</h1>
      <WalkForm />
      <Link href='/statistics'>
        <Button>Statistics</Button>
      </Link>
      <TodoList defaultTodos={todos} />
    </main>
  );
}

// "use client";
// import { todos as initialTodos } from "./data";
// import { useState } from "react";

// export default function Page() {
//   const [todos, setTodos] = useState(initialTodos);

//   function handleDelete(index: number) {
//     setTodos((prev) => prev.filter((_, i) => i !== index));
//   }

// export default function Home() {
//   return (
//     <main>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo}>
//             {todo}
//             <button onClick={() => onDelete(todo)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
