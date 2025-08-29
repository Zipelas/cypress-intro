'use client';

import { PropsWithChildren } from 'react';

export default function Dropdown(props: PropsWithChildren) {
  return (
    <select className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2'>
      <option value=''>Select an option</option>
      <option value='1'>Gått i snitt</option>
      <option value='2'>Gått varje månad</option>
      <option value='3'>Gått totalt per år</option>
      {props.children}
    </select>
  );
}
