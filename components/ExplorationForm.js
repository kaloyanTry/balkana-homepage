'use client';

import Image from 'next/image';
import { useExploration } from './ExplorationContext';
import { differenceInDays } from 'date-fns';
import { createExploration } from '@/lib/actions';
import SubmitBtn from './SubmitBtn';

function ExplorationForm({ track, user }) {
  const { range, resetRange } = useExploration();
  const { id } = track;

  const startDate = range.from;
  const endDate = range.to;
  const numDays = differenceInDays(endDate, startDate);

  const explorationData = {
    startDate,
    endDate,
    numDays,
    trackId: id,
  };

  const createExplorationWithData = createExploration.bind(
    null,
    explorationData
  );

  return (
    <div>
      <form
        action={async (formData) => {
          await createExplorationWithData(formData);
          resetRange();
        }}
        className='bg-accent-100 text-accent-300 text-xl'
      >
        <div className='text-xl bg-accent-300 text-primary-100 py-4 flex justify-center gap-4 items-center'>
          <p>Logged in as</p>
          <div className='flex gap-4 items-center'>
            <Image
              className='rounded-full'
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              referrerPolicy='no-referrer'
            />
            <p>{user.name}</p>
          </div>
        </div>
        <div className='p-4 space-y-2 font-semibold'>
          <label htmlFor='numExplorers'>How many explorers?</label>
          <select
            name='numExplorers'
            id='numExplorers'
            className='px-2 py-2 bg-accent-100 text-primary-300 font-normal w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of explorers...
            </option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'explorer' : 'explorers'}
              </option>
            ))}
          </select>
        </div>
        <div className='p-4 space-y-2 my-4 font-semibold'>
          <label htmlFor='experience'>Keep some notes...</label>
          <textarea
            name='experience'
            id='experience'
            className='px-2 py-2 bg-accent-100 text-primary-300 font-normal w-full shadow-sm rounded-sm'
            placeholder='Your experiance, expentations, thoughts about equipmets, specificates...'
          />
        </div>
        <div className='flex justify-center items-center pb-4'>
          {!(startDate && endDate) ? (
            <p className='text-accent-300 text-2xl font-semibold'>
              Start by selecting a starting date and a hour, and an ending date
            </p>
          ) : (
            <SubmitBtn pendingLabel='Planning...'>Plan Exploration</SubmitBtn>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExplorationForm;
