'use client';

import Link from 'next/link';
import Dropdown from '../ui/dropdown';
import InfoCard from '../ui/infocard';
import Button from './button';

export default function StatsForm() {
  return (
    <div>
      <Dropdown />
      <InfoCard />
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
