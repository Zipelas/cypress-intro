'use client';

import { PropsWithChildren } from 'react';
import Button from './button';

export default function SaveButton(props: PropsWithChildren) {
  return (
    <div className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2 m-2'>
        <Button>Save</Button>
    </div>
  );
}
