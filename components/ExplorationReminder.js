'use client';
import { format } from 'date-fns';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useExploration } from './ExplorationContext';

function ExplorationReminder() {
  const { range, resetRange } = useExploration();
  if (!range.from || !range.to) return null;

  return (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 py-4 px-4 rounded-sm bg-accent-100 text-accent-300 font-semibold flex gap-4 items-center text-lg'>
      <p>
        Don&apos;t forget to book <br />
        your explorations&apos; dates
        <br />
        from {format(new Date(range.from), 'dd MMMM yyyy')} <br /> to{' '}
        {format(new Date(range.to), 'dd MMMM yyyy')}
      </p>
      <button
        className='rounded-full p-1 hover:bg-accent-300  hover:text-accent-100 transition-all'
        onClick={resetRange}
      >
        <XMarkIcon className='h-6 w-6' />
      </button>
    </div>
  );
}

export default ExplorationReminder;
