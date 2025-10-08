'use client';

export interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
  id?: string;
}

export default function DatePicker({
  selectedDate,
  onDateChange,
  id = 'date-input',
}: DatePickerProps) {
  const hasDate = Boolean(selectedDate);

  return (
    <div
      className='flex justify-center my-4'
      data-selected={hasDate ? 'true' : 'false'}
      data-selected-date={selectedDate || ''}>
      <label
        htmlFor={id}
        className='sr-only'>
        Datum
      </label>

      <input
        id={id}
        data-cy='date-input'
        type='date'
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className='border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#663399]'
        style={{
          backgroundColor: hasDate ? '#663399' : 'white',
          color: hasDate ? 'white' : 'black',
        }}
      />

      <input
        type='hidden'
        data-cy='date-iso'
        value={selectedDate}
        readOnly
      />
    </div>
  );
}

// export default function DatePicker() {
//   return (
//     <div data-cy='datepicker'>
//       <input
//         type='date'
//         className=''></input>
//     </div>
//   );
// }
