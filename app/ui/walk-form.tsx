'use client';
import { useState } from 'react';
import DatePicker from './datepicker';
import InputField from './inputfield';
import SaveButton from './savebutton';

export default function WalkForm() {
  const [date, setDate] = useState(''); // YYYY-MM-DD

  return (
    <div className='p-4 space-y-4'>
      <div>
        <DatePicker
          selectedDate={date}
          onDateChange={setDate}
        />
      </div>
      <div>
        <InputField />
      </div>
      <div>
        <SaveButton />
      </div>
    </div>
  );
}
