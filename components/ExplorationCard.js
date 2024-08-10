import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import ExplorationDelete from './ExplorationDelete';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ExplorationCard({ exploration, onDelete }) {
  const {
    id,
    explorerId,
    startDate,
    endDate,
    numDays,
    numExplorers,
    created_at,
    routes: { title, image },
  } = exploration;

  return (
    <main className='flex border border-primary-200'>
      <article className='relative h-36 aspect-square'>
        <Image
          src={image}
          alt={`Trail ${title}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
          quality={75}
          className='object-cover border-r border-primary-200'
        />
      </article>
      <article className='flex-grow px-8 py-2 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-semibold text-primary-300'>
            {numDays} day{numDays > 1 && 's'} at the Route:{' '}
            <span className='text-accent-300'>{title}</span>
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className='bg-accent-200 text-primary-300 mt-2 h-8 px-4 py-2 uppercase text-md font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-primary-200 text-accent-100 mt-2 h-8 px-4 py-2 uppercase text-md font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>
        <p className='text-xl text-primary-200 py-2'>
          {format(new Date(startDate), 'EEE, dd MMM yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, dd MMM yyyy')}
        </p>

        <div className='flex gap-4 mt-auto items-baseline'>
          <p className='text-lg text-primary-300'>
            <span className='text-accent-300 font-semibold'>
              {numExplorers}{' '}
            </span>
            explorer{numExplorers > 1 && 's'}
          </p>
          <p className='ml-auto text-lg text-primary-400'>
            <span className='text-accent-300 font-semibold'>Noted at:</span>{' '}
            {format(new Date(created_at), 'EEE, dd MMM yyyy, p')}
          </p>
        </div>
      </article>

      <div className='flex flex-col border-l border-primary-300 w-32'>
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/home/explorer/explorations/edit/${id}`}
              className='group flex items-center gap-2 uppercase text-md font-bold text-primary-300 border-b border-primary-300 flex-grow px-3 hover:bg-primary-100 transition-colors hover:text-primary-900'
            >
              <PencilSquareIcon className='h-5 w-5 text-primary-200 group-hover:text-primary-300 transition-colors' />
              <span className='mt-1'>Edit</span>
            </Link>
            <ExplorationDelete explorationId={id} onDelete={onDelete} />
          </>
        ) : (
          <>
            <h3 className='text-lg text-accent-200 font-semibold p-2'>
              Explored Route
            </h3>
            <p className='p-2'>
              Plan to explore new routes{' '}
              <Link
                href='/home/routes'
                className='text-accent-200 font-semibold'
              >
                &rarr;
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default ExplorationCard;
