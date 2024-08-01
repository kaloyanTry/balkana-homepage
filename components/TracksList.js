import { getTracks } from '@/lib/actions';
import TrackItem from './TrackItem';
import Link from 'next/link';
import { MapIcon } from '@heroicons/react/24/outline';

async function TracksList({ filterDistance }) {
  const tracks = await getTracks();

  if (!tracks.length) return null;

  let displayedTrails;

  if (filterDistance === 'all') {
    displayedTrails = tracks;
  }
  if (filterDistance === 'short') {
    displayedTrails = tracks.filter((track) => track.distance <= 20);
  }

  if (filterDistance === 'trail') {
    displayedTrails = tracks.filter(
      (track) => track.distance >= 21 && track.distance <= 42
    );
  }

  if (filterDistance === 'ultra') {
    displayedTrails = tracks.filter((track) => track.distance >= 43);
  }

  const numberTrails = displayedTrails.length;

  return (
    <main className='flex flex-col'>
      <section className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-12'>
        {displayedTrails.map((track) => (
          <TrackItem track={track} key={track.id} />
        ))}
      </section>
      <section>
        <p className='mt-8 mx-auto text-accent-100 text-2xl bg-accent-300 py-4 px-8'>
          the number of {filterDistance}s is{' '}
          <span className='text-4xl font-bold'>{numberTrails}</span> here
        </p>
        <div className='text-2xl py-8 px-4 bg-accent-100'>
          <p className='text-primary-300'>
            <span className='mr-4 text-accent-200 text-4xl font-semibold'>
              &#9432;
            </span>
            Important! Crossing the routes requires personal responsibility and
            activity. Being in the wild requires care and respect. It is
            recommended to have mountain insurance, for more information{' '}
            <Link
              href='https://www.pss-bg.bg/planinska-zastrahovka/'
              rel='noopener noreferrer'
              target='_blank'
              className='text-accent-300 font-semibold'
            >
              here
            </Link>
            .
          </p>
          <div className='py-4 flex gap-4'>
            <MapIcon className='h-12 w-12 text-accent-200' />
            <p className='pt-2'>
              Very useful source for Bulgarian mountains online maps, gps routes
              and tracks{' '}
              <Link
                href='https://bgmountains.org/en/#'
                rel='noopener noreferrer'
                target='_blank'
                className='text-accent-300 font-semibold'
              >
                here.
              </Link>{' '}
              Respect!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TracksList;
