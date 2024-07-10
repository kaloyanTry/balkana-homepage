import Spinner from '@/components/Spinner';
import TracksList from '@/components/TracksList';
import { getTracks } from '@/lib/actions';
import { Suspense } from 'react';

export const revalidate = 86400;

export const metadata = {
  title: 'Trails',
  description: 'The overview of the Balkanas trails',
};

async function TracksPage() {
  const tracks = await getTracks();

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
      <p className='mb-16 text-accent-300 text-2xl font-normal'>
        Our public database of routes include{' '}
        <span className='font-bold'>{tracks.length} trails</span>, which you can
        explore. <span className='font-bold'>Enjoy!</span>
      </p>
      <Suspense fallback={<Spinner />}>
        <TracksList />
      </Suspense>
    </main>
  );
}

export default TracksPage;
