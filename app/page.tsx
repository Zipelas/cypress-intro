"use client";

import { useState } from "react";

interface Totdo {
  id: string;
  text: string;
}

const mockedTodos: Todo[] = [
  { id: '1', text: 'Feed the cat' },
  { id: '2', text: 'Ignore the dogs' },
  { id: '3', text: 'Walk all the cats' },
];

export default function Home() {
  const [todos, setTodos] = useState(mockedTodos);
  return (
    <main>
      <ul>
        {todos.map((t) => 

        <li key={t.id}>
          <span>{t.text}</span>
          <div>

          <button onClick={(setTodos(todos.filter({ id } =>)))}
          </div>
          </li>

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
