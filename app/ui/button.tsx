'use client';

import { PropsWithChildren } from 'react';

// interface

export default function Button(props: PropsWithChildren) {
  return (
    <button className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2'>
      {props.children}
    </button>
  );
}
