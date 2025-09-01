'use client';
import React, { useState } from 'react';
import InputField from './inputfield';
import DatePicker from './datepicker';

export default function WalkForm() {
  const [date, setDate] = useState(''); // YYYY-MM-DD

  return (
    <div className='p-4 space-y-4'>
      <DatePicker
        selectedDate={date}
        onDateChange={setDate}
      />
      <div>
        <InputField />
    </div>
    </div>
  );
}
