import StatsForm from '../ui/stats-form';
import WalkForm from '../ui/walk-form';

export default function Statistics() {
  return (
    <main>
      <h2 className='text-6xl text-sky'>
        🚶‍♂️‍➡️Walk Tracker - Walk this way 🎶
      </h2>
      <div className='text-6xl text-sky-600 p-6 grid md:grid-cols-2 gap-6'>
        <WalkForm />
        <StatsForm />
      </div>
    </main>
  );
}
