import Exploration from '@/components/Exploration';
import Spinner from '@/components/Spinner';
import Track from '@/components/Track';
import { getPlannedExplorations, getTrack } from '@/lib/actions';
import { Suspense } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';

export async function generateMetadata({ params }) {
  const { title } = await getTrack(params.trackId);
  const titleFirstWord = title.split(' - ').slice(0, 1);

  return { title: `Trail ${titleFirstWord}` };
}

async function TrackPage({ params }) {
  const trackId = params.trackId;
  const track = await getTrack(trackId);
  const plannedExplorations = await getPlannedExplorations(trackId);
  const exploredTimes = plannedExplorations.length;

  return (
    <div className='mx-auto my-4'>
      <Track track={track} />

      <div className='flex flex-col my-8 items-center justify-center'>
        <h3 className='text-4xl text-accent-300 text-center'>
          Plan your trail{' '}
          <span className='text-5xl text-primary-200 font-normal'>
            {track.title}
          </span>{' '}
          and share with others
        </h3>
        <UserGroupIcon className='h-12 w-12 text-accent-300' />
        <div>
          <Suspense fallback={<Spinner />}>
            <Exploration track={track} />
          </Suspense>
        </div>

        {plannedExplorations ? (
          <div className='flex flex-col mt-4 items-center justify-center'>
            <h2 className='text-5xl text-primary-200 font-normal my-8'>
              Shared Information
            </h2>
            <h3 className='text-4xl text-accent-300 my-2'>
              The trail has been explored {exploredTimes} times. Join!
            </h3>
            {plannedExplorations.map((exploration) => (
              <p key={exploration.startDate} className='text-2xl'>
                on{' '}
                {isPast(exploration.startDate) ? (
                  <span className='bg-accent-100'>
                    {' '}
                    {format(
                      new Date(exploration.startDate),
                      'EEE, dd MMM yyyy'
                    )}{' '}
                    (past event){' '}
                  </span>
                ) : (
                  <span className='bg-primary-100'>
                    {format(
                      new Date(exploration.startDate),
                      'EEE, dd MMM yyyy'
                    )}{' '}
                    (future event){' '}
                  </span>
                )}
                for {exploration.numDays} days from {exploration.numExplorers}{' '}
                explorers.
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TrackPage;
