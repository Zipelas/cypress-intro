'use client';

import { useState } from 'react';

interface Todos {
  id: string;
  text: string;
}

const mockedTodos: Todos[] = [
  { id: '1', text: 'Feed the cat' },
  { id: '2', text: 'Ignore the dogs' },
  { id: '3', text: 'Walk all the cats' },
];

export default function Home() {
  const [todos, setTodos] = useState(mockedTodos);
  return (
    <main>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span>{t.text}</span>

            <button
              onClick={() => setTodos(todos.filter(({ id }) => id !== t.id))}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
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
