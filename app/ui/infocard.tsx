'use client';

type InfoCardProps = {
  choice: '' | 'avg' | 'monthly' | 'yearly';
  avgPerWalk: number;
  totalThisMonth: number;
  totalThisYear: number;
  count: number;
};

export default function InfoCard({
  choice,
  avgPerWalk,
  totalThisMonth,
  totalThisYear,
  count,
}: InfoCardProps) {
  const content =
    choice === 'avg'
      ? `Går i snitt ${avgPerWalk.toFixed(1)} per tillfälle (${count} loggar).`
      : choice === 'monthly'
      ? `Totalt denna månad: ${totalThisMonth}.`
      : choice === 'yearly'
      ? `Totalt i år: ${totalThisYear}.`
      : 'Välj ett alternativ i dropdownen.';

  return (
    <div
      data-cy='infocard'
      className='rounded-xl border p-4'>
      <h3 className='text-xl font-semibold'>Statistik</h3>
      <p className='mt-2'>{content}</p>
    </div>
  );
}
