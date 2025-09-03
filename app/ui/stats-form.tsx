'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Dropdown from '../ui/dropdown';
import InfoCard from '../ui/infocard';
import Button from './button';

const OPTIONS = [
  { value: '', label: 'Välj ett alternativ' },
  { value: 'avg', label: 'Gått i snitt' },
  { value: 'monthly', label: 'Gått varje månad' },
  { value: 'yearly', label: 'Gått totalt per år' },
];

export default function StatsForm() {

  const [choice, setChoice] = useState<string>('');

  const choiceLabel = useMemo(
    () => OPTIONS.find((o) => o.value === choice)?.label ?? 'Inget valt ännu',
    [choice]
  );

  return (
    <div className='space-y-6'>
      <Dropdown
        value={choice}
        onChange={setChoice}
        name='stat-select'>
        {OPTIONS.map((o) => (
          <option
            key={o.value}
            value={o.value}>
            {o.label}
          </option>
        ))}
      </Dropdown>
      <InfoCard
        choice={choice}
        label={choiceLabel}
      />
      <Link href='/'>
        <Button>↩ Back</Button>
      </Link>
    </div>
    // <div className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2 m-2'>
    //   TEST
    //   {/* {props.children} */}
    // </div>
  );
}
