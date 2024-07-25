'use client';

import { deleteExploration } from '@/lib/actions';
import { TrashIcon } from '@heroicons/react/24/solid';
// import { ExplorationProvider } from './ExplorationContext';
import { useTransition } from 'react';
// import Spinner from './Spinner';
import SpinnerMini from './SpinnerMini';

function ExplorationDelete({ explorationId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm('Are you sure you want to delete this exploration?'))
      startTransition(() => deleteExploration(explorationId));
  }
  return (
    <button
      onClick={handleDelete}
      // onClick={() => deleteExploration(explorationId)}
      className='group flex items-center gap-2 uppercase text-md font-bold text-accent-300  flex-grow px-3 hover:bg-accent-100 transition-colors'
    >
      {!isPending ? (
        <>
          <TrashIcon className='h-5 w-5 text-accent-300 group-hover:text-accent-200 transition-colors' />
          <span className='mt-1'>Delete</span>
        </>
      ) : (
        <span className='mx-auto'>
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default ExplorationDelete;
