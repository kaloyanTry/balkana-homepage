'use client';

import { useTransition } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import Spinner from './Spinner';

function ExplorationDelete({ explorationId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm('Are you sure you want to delete this exploration?'))
      startTransition(() => onDelete(explorationId));
  }
  return (
    <button
      onClick={handleDelete}
      className='group flex items-center gap-2 uppercase text-md font-bold text-accent-300  flex-grow px-3 hover:bg-accent-100 transition-colors'
    >
      {!isPending ? (
        <>
          <TrashIcon className='h-5 w-5 text-accent-300 group-hover:text-accent-200 transition-colors' />
          <span className='mt-1'>Delete</span>
        </>
      ) : (
        <span className='mx-auto'>
          <Spinner />
        </span>
      )}
    </button>
  );
}

export default ExplorationDelete;
