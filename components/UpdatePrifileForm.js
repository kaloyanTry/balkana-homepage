'use client';

import Image from 'next/image';
import { useState } from 'react';
import SelectCountry from './SelectCountry';

function UpdatePrifileForm({ children }) {
  const [count, setCount] = useState();
  // const { fullName, email, phone, nationality, countryFlag } = explorer;
  const countryFlag =
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg';
  return (
    <form
      action=''
      className='flex flex-col gap-4 bg-accent-100 text-xl px-8 py-16'
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          disabled
          defaultValue=''
          name='fullName'
          className='px-5 py-3 bg-white text-primary-300 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          disabled
          defaultValue=''
          name='email'
          className='px-5 py-3 bg-white text-primary-300 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='space-y-2'>
        <label>Phone number</label>
        <input
          disabled
          defaultValue=''
          name='phone'
          className='px-5 py-3 bg-white text-primary-300 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>Where are you from?</label>
          <Image
            src={countryFlag}
            width={48}
            height={48}
            alt='Country flag'
            priority
          />
        </div>
        {children}
      </div>
      <div className='flex justify-end items-center gap-6'>
        <button>Update profile</button>
      </div>
    </form>
  );
}

export default UpdatePrifileForm;
