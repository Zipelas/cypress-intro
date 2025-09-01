'use client';
import { useState } from 'react';
import { z } from 'zod';

const walkAmountSchema = z
  .string()
  .trim()
  .min(1, 'Value is required')
  .refine((v) => /^[0-9]+$/.test(v), 'Please enter a whole number')
  .refine((v) => Number(v) > 0, 'Must be greater than 0');

export default function InputField() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = (val: string) => {
    const res = walkAmountSchema.safeParse(val);
    setError(
      res.success ? null : res.error.issues[0]?.message ?? 'Invalid value'
    );
  };

  return (
    <div
      data-cy='input'
      className='flex flex-col gap-1'>
      <input
        data-cy='walk-amount-input'
        type='text'
        placeholder='Enter how much you have walked'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);

          if (error) validate(e.target.value);
        }}
        onBlur={() => validate(value)}
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
