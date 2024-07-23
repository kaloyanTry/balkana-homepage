'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
// import { useTransition } from 'react';
// import SpinnerMini from './SpinnerMini';

function ExplorationDelete({ exlorationId, onDelete }) {
  function handleDelete() {
    if (confirm('Are you sure you want to delete this exploration?'))
      () => onDelete(exlorationId);
  }
  return (
    <button
      onClick={handleDelete}
      className='group flex items-center gap-2 uppercase text-md font-bold text-accent-300  flex-grow px-3 hover:bg-accent-100 transition-colors'
    >
      <>
        <TrashIcon className='h-5 w-5 text-accent-300 group-hover:text-accent-200 transition-colors' />
        <span className='mt-1'>Delete</span>
      </>
    </button>
  );
}

export default ExplorationDelete;
