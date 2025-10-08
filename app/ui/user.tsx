'use client';

interface UserProps {
  value: string;
  onChange: (value: string) => void;
}

export default function User({ value, onChange }: UserProps) {
  return (
    <div>
      <input
        data-cy='user-input'
        className='w-full px-3 py-2 border rounded'
        placeholder='Name'
        type='text'
        id='username'
        name='username'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
