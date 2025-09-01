'use client';

// import

// interface

export default function InputField() {
  return (
    <div data-cy='input'>
      <input
        type='text'
        placeholder='Enter how much you have walked'
        className='text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2'
      />
    </div>
  );
}
