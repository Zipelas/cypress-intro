import Link from 'next/link';
import Button from '../ui/button';

export default async function Statistics() {
  return (
    <div>
      <h1 className='text-6xl text-sky-600'>Statistics</h1>
      <Link href='/'>
        <Button>↩ Back</Button>
      </Link>
    </div>
  );
}
