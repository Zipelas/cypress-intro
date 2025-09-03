'use client';

type InfoCardProps = {
  choice: string; // t.ex. "avg" | "monthly" | "yearly"
  label: string; // human readable text
};

export default function InfoCard({ choice, label }: InfoCardProps) {
  return (
    <div
      data-cy='infocard'
      className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-xl p-4 m-2'>
      <h3 className='text-xl font-semibold'>Valt filter</h3>
      {choice ? (
        <p className='mt-2'>{label}</p>
      ) : (
        <p className='mt-2 italic text-gray-500'>Välj något i dropdownen</p>
      )}
    </div>
  );
}
