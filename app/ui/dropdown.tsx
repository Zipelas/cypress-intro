'use client';

import { PropsWithChildren } from 'react';

type DropdownProps = PropsWithChildren<{
  value: string;
  onChange: (v: string) => void;
  name?: string;
}>;

export default function Dropdown({
  value,
  onChange,
  children,
  name,
}: DropdownProps) {
  return (
    <div>
      <select
        data-cy='dropdown'
        name={name}
        className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2'
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </div>
  );
}
