import { getTracks } from '@/lib/actions';
import TrackItem from './TrackItem';

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
    <div className='flex flex-col'>
      <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-12'>
        {displayedTrails.map((track) => (
          <TrackItem track={track} key={track.id} />
        ))}
      </div>
      <p className='mt-8 mx-auto text-accent-100 text-2xl bg-accent-300 py-4 px-8'>
        the number of {filterDistance}s is{' '}
        <span className='text-4xl font-bold'>{numberTrails}</span> here
      </p>
    </div>
  );
}

export default TracksList;
