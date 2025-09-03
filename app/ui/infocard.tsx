'use client';

import { PropsWithChildren } from 'react';

export default function InfoCard(props: PropsWithChildren) {
  return (
    <div
      data-cy='infocard'
      className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2 m-2'>
      InfoCard Statistics
      {props.children}
    </div>
  );
}
