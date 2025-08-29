import Link from 'next/link';
import Button from '../ui/button';
import Dropdown from '../ui/dropdown';
import InfoCard from '../ui/infocard';
export default async function Statistics() {
  return (
    <div>
      <h1 className='text-6xl text-sky-600'>Statistics</h1>
      <Dropdown />
      <InfoCard />
      <Link href='/'>
        <Button>↩ Back</Button>
      </Link>
    </div>
  );
}
