"use client"

interface UserProps {
  value: string;
  onChange: (value: string) => void;
}

export default function User({ value, onChange }: UserProps) {
  return (
    <div>
      <input
        placeholder='Name'
        type='text'
        id='username'
        name='username'
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
