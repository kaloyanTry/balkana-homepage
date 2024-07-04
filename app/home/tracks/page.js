import Spinner from '@/components/Spinner';
import TracksList from '@/components/TracksList';
import { Suspense } from 'react';

export const metadata = {
  title: 'Tracks',
  description: 'The overview of the Balkanas tracks',
};

function TracksPage() {
  return (
    <div>
      <h1 className='text-8xl mb-8 text-accent-300 font-semibold'>
        Balkanas&apos; Tracks
      </h1>
      <p className='mb-4 text-primary-300 text-2xl font-normal'>
        Balkanas&apos; tracks are pieces of beauty and wild. Our liability is to
        maintain, to preserve and to live in harmony with the nature. The
        mountains are still not overcrowded and so not much destroyed by danger
        humans&apos; actions. Please, explore Balkanas&apos; tracks with respect
        to the mountain and without destruction attitude and behavior.
      </p>
      <Suspense fallback={<Spinner />}>
        <TracksList />
      </Suspense>
    </div>
  );
}

export default TracksPage;
