'use client';

import { PropsWithChildren } from 'react';

type DropdownProps = PropsWithChildren<{
  value: string;
  onChange: (v: string) => void;
}>;

export default function Dropdown({ value, onChange, children }: DropdownProps) {
  return (
    <select
      data-cy='dropdown'
      className='text-sky-600 text-2xl border-4 border-sky-600 rounded-3xl p-2'
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  );
}
