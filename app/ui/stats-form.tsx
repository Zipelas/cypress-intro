'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadWalks } from '../statistics/walkStore';
import Dropdown from './dropdown';
import InfoCard from './infocard';

export default function StatsForm() {
  const [choice, setChoice] = useState<'' | 'avg' | 'monthly' | 'yearly'>('');
  const [walks, setWalks] = useState(() => loadWalks());

  useEffect(() => {
    const refresh = () => setWalks(loadWalks());
    refresh();
    // lyssna på våra egna saves
    window.addEventListener('walks-updated', refresh);
    // lyssna på förändringar från andra tabs
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('walks-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const { avgPerWalk, totalThisMonth, totalThisYear, count } = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();

    let total = 0;
    let monthTotal = 0;
    let yearTotal = 0;

    for (const w of walks) {
      const d = new Date(w.date + 'T00:00:00');
      total += w.amount;
      if (d.getFullYear() === y && d.getMonth() === m) monthTotal += w.amount;
      if (d.getFullYear() === y) yearTotal += w.amount;
    }

    const avg = walks.length ? total / walks.length : 0;
    return {
      avgPerWalk: avg,
      totalThisMonth: monthTotal,
      totalThisYear: yearTotal,
      count: walks.length,
    };
  }, [walks]);

  return (
    <div className='p-4 space-y-4 rounded-xl border'>
      <h2 className='text-xl font-semibold'>Välj statistik</h2>

      <Dropdown
        value={choice}
        onChange={(v) => setChoice(v as '' | 'avg' | 'monthly' | 'yearly')}>
        <option value=''>Välj ett alternativ</option>
        <option value='avg'>Gått i snitt</option>
        <option value='monthly'>Gått varje månad</option>
        <option value='yearly'>Gått totalt per år</option>
      </Dropdown>

      <InfoCard
        choice={choice}
        avgPerWalk={avgPerWalk}
        totalThisMonth={totalThisMonth}
        totalThisYear={totalThisYear}
        count={count}
      />
    </div>
    // <Button>↩ Back</Button>
    // <div className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2 m-2'>
    //   TEST
    //   {/* {props.children} */}
    // </div>
  );
}
