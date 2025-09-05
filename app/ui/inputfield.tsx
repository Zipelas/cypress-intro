'use client';
import { useMemo, useState } from 'react';
import { z } from 'zod';

const schema = z
  .string()
  .trim()
  .min(1, 'Value is required')
  .regex(/^[0-9]+$/, 'Please enter a whole number')
  .refine((v) => Number(v) > 0, 'Must be greater than 0');

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InputField({ value, onChange }: Props) {
  const [touched, setTouched] = useState(false);

  const error = useMemo(() => {
    if (!touched) return null; // visa först efter blur
    if (value.trim() === '') return 'Value is required';
    const r = schema.safeParse(value);
    return r.success ? null : r.error.issues[0]?.message ?? 'Invalid value';
  }, [value, touched]);

  return (
    <div
      data-cy='input'
      className='flex flex-col gap-1'>
      <input
        data-cy='walk-amount-input'
        type='text'
        placeholder='Enter how much you have walked'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby='walk-amount-error'
        className={`text-sky-600 text-2xl border-4 rounded-4xl p-2 ${
          error ? 'border-red-500' : 'border-sky-600'
        }`}
      />
      {error && (
        <p
          id='walk-amount-error'
          data-cy='input-error'
          role='alert'
          className='text-red-600 text-sm'>
          {error}
        </p>
      )}
    </div>
  );
}
