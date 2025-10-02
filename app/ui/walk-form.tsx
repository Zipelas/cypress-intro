'use client';
import { useState } from 'react';
import { saveWalk } from '../api/walks/actions';
import DatePicker from './datepicker';
import InputField from './inputfield';
import SaveButton from './savebutton';
import User from './user';

export default function WalkForm() {
  const [date, setDate] = useState(''); // YYYY-MM-DD
  const [amount, setAmount] = useState(''); // string -> valideras i InputField
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState('');

  const canSave = date.length > 0 && /^\d+$/.test(amount) && Number(amount) > 0;
  console.log({ date, amount, canSave });

  const onSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      await saveWalk({ date, amount: Number(amount), text: user });
      // nollställ
      setDate('');
      setAmount('');
      setUser('');
      // Trigger refresh of stats form
      window.dispatchEvent(new CustomEvent('walks-updated')); //Function to update UI instantly
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
      <User
        value={user}
        onChange={setUser}
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
