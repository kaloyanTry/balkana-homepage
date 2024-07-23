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
    tracks: { title, image },
  } = exploration;

  return (
    <div className='flex border border-primary-200'>
      <div className='relative h-32 aspect-square'>
        <Image
          src={image}
          alt={`Trail ${title}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
          quality={75}
          className='object-cover border-r border-primary-200'
        />
      </div>
      <div className='flex-grow px-8 py-2 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-semibold'>
            {numDays} day(s) at Trail: {title}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className='bg-accent-200 text-primary-300 h-8 mt-2 px-3 uppercase text-md font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-primary-200 text-accent-100 h-7 px-3 uppercase text-md font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>
        <p className='text-xl text-primary-300 py-2'>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex gap-4 mt-auto items-baseline'>
          <p className='text-lg text-primary-300'>
            {numExplorers} explorer{numExplorers > 1 && 's'}
          </p>
          <p className='ml-auto text-lg text-primary-400'>
            Booked at: {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className='flex flex-col border-l border-primary-300 w-[100px]'>
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/explorer/explorations/edit/${id}`}
              className='group flex items-center gap-2 uppercase text-md font-bold text-primary-300 border-b border-primary-300 flex-grow px-3 hover:bg-primary-100 transition-colors hover:text-primary-900'
            >
              <PencilSquareIcon className='h-5 w-5 text-primary-200 group-hover:text-primary-300 transition-colors' />
              <span className='mt-1'>Edit</span>
            </Link>
            <ExplorationDelete explorationId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ExplorationCard;
