'use client';

import { PropsWithChildren } from 'react';
import Button from './button';

type SaveButtonProps = PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
}>;

export default function SaveButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
}: SaveButtonProps) {
  return (
    <div className='text-sky-600 text-2xl p-2 m-2'>
      <Button
        data-cy='save-button'
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        aria-disabled={disabled || loading ? 'true' : 'false'}>
        {loading ? 'Saving…' : children ?? 'Save'}
      </Button>
    </div>
  );
}
