'use client';

import Link from 'next/link';

// interface

export default function Button() {
  return (
    <Link href='/statistics'>
      <button className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-'>
        See statistics
      </button>
    </Link>
  );
}
