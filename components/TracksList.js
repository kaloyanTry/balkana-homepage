import { getTracks } from '@/lib/actions';
import TrackItem from './TrackItem';

async function TracksList({ filterSuitable, filterDistance }) {
  const tracks = await getTracks();
  // console.log(tracks);
  if (!tracks.length) return null;

  let diplayedSuitableTrails;
  if (filterSuitable === 'all') diplayedSuitableTrails = tracks;
  if (filterSuitable === 'cycling')
    diplayedSuitableTrails = tracks.filter((track) =>
      track.suitable.includes('cycling')
    );
  if (filterSuitable === 'running')
    diplayedSuitableTrails = tracks.filter((track) =>
      track.suitable.includes('running')
    );

  let diplayedDistanceTrails;
  if (filterDistance === 'all') diplayedDistanceTrails = tracks;
  if (filterDistance === 'short')
    diplayedDistanceTrails = tracks.filter((track) => track.distance <= 20);
  if (filterDistance === 'trail')
    diplayedDistanceTrails = tracks.filter(
      (track) => track.distance >= 21 && distance <= 42
    );
  if (filterDistance === 'ultra')
    diplayedDistanceTrails = tracks.filter((track) => track.distance > 43);

  return (
    <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-12'>
      {/* <p>List of Tracks</p> */}
      {tracks.map((track) => (
        <TrackItem track={track} key={track.id} />
      ))}
    </div>
  );
}

export default TracksList;
