import Exploration from '@/components/Exploration';
import Spinner from '@/components/Spinner';
import Track from '@/components/Track';
import { getTrack } from '@/lib/actions';
import { Suspense } from 'react';
import { UsersIcon } from '@heroicons/react/24/solid';

export async function generateMetadata({ params }) {
  const { title } = await getTrack(params.trackId);
  const titleFirstWord = title.split(' - ').slice(0, 1);

  return { title: `Trail ${titleFirstWord}` };
}

async function TrackPage({ params }) {
  const track = await getTrack(params.trackId);

  return (
    <div className='mx-auto mt-2'>
      <Track track={track} />

      <div className='flex flex-col my-8 items-center justify-center'>
        <h3 className='text-4xl text-accent-300 text-center'>
          Plan your trail{' '}
          <span className='text-5xl text-primary-200'>{track.title}</span> and
          share with others
        </h3>
        <UsersIcon className='h-12 w-12 text-accent-300' />
        <div>
          <Suspense fallback={<Spinner />}>
            <Exploration track={track} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default TrackPage;
