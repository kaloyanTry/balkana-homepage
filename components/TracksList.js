import { getTracks } from '@/lib/actions';
import TrackCard from './TrackCard';

async function TracksList() {
  const tracks = await getTracks();
  // console.log(tracks);

  return (
    <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-12'>
      {/* <p>List of Tracks</p> */}
      {tracks.map((track) => (
        <TrackCard track={track} key={track.id} />
      ))}
    </div>
  );
}

export default TracksList;
