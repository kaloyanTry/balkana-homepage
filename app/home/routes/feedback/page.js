import { FingerPrintIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

function FeedbackPage() {
  return (
    <div className='flex flex-col space-y-8 my-8 items-center'>
      <h1 className='text-4xl text-accent-200 mb-8'>
        Thank you for sharing your exploration of the trail!
      </h1>
      <FingerPrintIcon className='text-accent-200 h-16 w-16 ' />
      <Link
        href='/home/explorer/explorations'
        className='text-primary-200 text-xl'
      >
        Manage your planned explorations{' '}
        <span className='text-accent-200'>here</span>
      </Link>
    </div>
  );
}

export default FeedbackPage;
