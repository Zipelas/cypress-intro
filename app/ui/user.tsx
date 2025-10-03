"use client"

import { walks } from '../data';

interface UserProps {
  value: string;
  onChange: (value: string) => void;
}

export default function User({ value, onChange }: UserProps) {
  return (
    <div>
      <select
        id='username'
        name='username'
        value={value}
        onChange={e => onChange(e.target.value)}
        className='text-sky-600 text-2xl border-4 border-sky-600 rounded-3xl p-2 w-full'>
        <option value=''>Välj kategori</option>
        {walks.map((walk) => (
          <option key={walk} value={walk}>
            {walk}
          </option>
        ))}
      </select>
    </div>
  );
}
