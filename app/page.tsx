import StatsForm from './ui/stats-form';
import WalkForm from './ui/walk-form';

export default async function Home() {
  return (
    <main className='bg-black text-sky-600'>
      <h1 className='text-6xl text-sky p-4'>
        🚶‍♂️‍➡️Walk Tracker - Walk this way 🎶
      </h1>
      <div className='text-6xl text-sky-600 p-6 grid md:grid-cols-2 gap-6'>
        <WalkForm />
        <StatsForm />
      </div>
    </main>
  );
}
