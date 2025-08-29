import { db } from '@/prisma/db';
import Datepicker from './ui/datepicker';
import TodoList from './ui/todo-list';
import Button from './ui/button';

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main className='bg-black text-slate-50'>
      <h1 className='text-6xl text-sky'>My Todo List</h1>
      <Datepicker />

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
