import { getTracks } from '@/lib/actions';
import TrackItem from './TrackItem';

async function TracksList({ filterSuitable, filterDistance }) {
  const tracks = await getTracks();

  if (!tracks.length) return null;

  let displayedTrails;
  if (filterSuitable === 'all') displayedTrails = tracks;

  if (filterSuitable === 'cycling')
    displayedTrails = tracks.filter((track) =>
      track.suitable.includes('cycling')
    );
  if (filterSuitable === 'running')
    displayedTrails = tracks.filter((track) =>
      track.suitable.includes('running')
    );

  if (filterDistance === 'short')
    displayedTrails = tracks.filter((track) => track.distance <= 20);
  if (filterDistance === 'trail')
    displayedTrails = tracks.filter(
      (track) => track.distance >= 21 && track.distance <= 42
    );
  if (filterDistance === 'ultra')
    displayedTrails = tracks.filter((track) => track.distance >= 43);

  return (
    <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-12'>
      {/* <p>List of Tracks</p> */}
      {displayedTrails.map((track) => (
        <TrackItem track={track} key={track.id} />
      ))}
    </div>
  );
}

export default TracksList;
