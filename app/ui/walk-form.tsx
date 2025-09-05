'use client';
import { useState } from 'react';
import { saveWalk } from '../statistics/walkStore';
import DatePicker from './datepicker';
import InputField from './inputfield';
import SaveButton from './savebutton';

export default function WalkForm() {
  const [date, setDate] = useState(''); // YYYY-MM-DD
  const [amount, setAmount] = useState(''); // string -> valideras i InputField
  const [saving, setSaving] = useState(false);

  const canSave = date.length > 0 && /^\d+$/.test(amount) && Number(amount) > 0;
  console.log({ date, amount, canSave });

  const onSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      saveWalk({ date, amount: Number(amount) });
      // nollställ
      setDate('');
      setAmount('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='p-4 space-y-4 rounded-xl border'>
      <h2 className='text-xl font-semibold'>Logga promenad</h2>
      <DatePicker
        selectedDate={date}
        onDateChange={setDate}
      />
      <InputField
        value={amount}
        onChange={setAmount}
      />
      <SaveButton
        onClick={onSave}
        loading={saving}
        disabled={!canSave}>
        Save
      </SaveButton>
    </div>
  );
}
