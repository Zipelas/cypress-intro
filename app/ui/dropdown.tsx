'use client';

import { PropsWithChildren } from 'react';

type DropdownProps = PropsWithChildren<{
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}>;

export default function Dropdown({
  value,
  onChange,
  disabled = false,
  children,
}: DropdownProps) {
  return (
    <select
      data-cy='dropdown'
      className={`text-sky-600 text-2xl border-4 border-sky-600 rounded-3xl p-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  );
}
