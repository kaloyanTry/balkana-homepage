import ExplorationReminder from '@/components/ExplorationReminder';
import FilterDistance from '@/components/FilterDistance';
import Spinner from '@/components/Spinner';
import TracksList from '@/components/TracksList';
import { getTracks } from '@/lib/actions';
import { Suspense } from 'react';

// code for static generated pages:
// export const revalidate = 86400;

export const metadata = {
  title: 'Trails',
  description: 'The overview of the Balkanas trails',
};

// when using sesarchParams the page is dynamic rendered page
async function TracksPage({ searchParams }) {
  const tracks = await getTracks();
  const filterDistance = searchParams?.distance ?? 'all';

  return (
    <main>
      <h1 className='text-8xl mb-8 text-accent-300 font-semibold text-center'>
        Balkanas&apos; Trails
      </h1>
      <p className='mt-16 text-primary-300 text-2xl font-normal '>
        Balkanas&apos; trails are pieces of beauty and wild. Our liability is to
        maintain, to preserve and to live in harmony with the nature. The
        mountains are still not overcrowded and so not much destroyed by danger
        humans&apos; actions. Please, explore Balkanas&apos; trails with respect
        to the mountain and without destruction attitude and behavior.
      </p>
      <p className='mb-8 text-primary-300 text-2xl font-normal'>
        Our public database of routes include{' '}
        <span className='font-bold text-accent-300'>
          {tracks.length} trails
        </span>
        , which you can explore.{' '}
        <span className='font-bold text-accent-300'>Explore!</span>
      </p>
      <div className='flex justify-center'>
        <span className='text-xl font-medium bg-accent-300 text-accent-100 p-2 mb-8'>
          Explore
        </span>
        <FilterDistance />
      </div>
      <Suspense fallback={<Spinner />} key={filterDistance}>
        <TracksList filterDistance={filterDistance} />
        <ExplorationReminder />
      </Suspense>
    </main>
  );
}

export default TracksPage;
