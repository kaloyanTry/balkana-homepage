'use client';

import Image from 'next/image';
import { updateExplorerProfile } from '@/lib/actions';
import SubmitBtn from './SubmitBtn';

function UpdatePrifileForm({ explorer, children }) {
  // const [count, setCount] = useState();

  const { fullName, email, phone, nationality, countryFlag } = explorer;

  return (
    <form
      action={updateExplorerProfile}
      className='flex flex-col gap-4 bg-accent-100 text-xl px-4 py-8'
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName || 'explorer'}
          name='fullName'
          className='px-5 py-3 bg-accent-200 text-primary-300 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          disabled
          defaultValue={email || 'email@email.net'}
          name='email'
          className='px-5 py-3 bg-accent-200 text-primary-300 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='space-y-2'>
        <label>Phone number</label>
        <input
          defaultValue={phone || '+359000000'}
          name='phone'
          className='px-5 py-3 bg-white text-primary-300 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>Where are you from?</label>
          <Image
            src={countryFlag}
            width='32'
            height='32'
            alt='Country flag of the explorer'
            name='countryFlag'
            className='h-8 w-12 rounded-sm'
            priority
          />
        </div>
        {children}
      </div>
      <div className='flex justify-end items-center gap-6'>
        <SubmitBtn pendingLabel='Updating...'>Update Profile</SubmitBtn>
      </div>
    </form>
  );
}

export default UpdatePrifileForm;
