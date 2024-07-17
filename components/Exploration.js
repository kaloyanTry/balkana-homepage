import { getBookedDatesByTrackId } from '@/lib/actions';
import DateSelector from '@/components/DateSelector';
import ExplorationForm from '@/components/ExplorationForm';

async function Exploration({ track }) {
  const bookedDates = await getBookedDatesByTrackId(track.id);

  return (
    <div>
      <DateSelector track={track} bookedDates={bookedDates} />
      <ExplorationForm track={track} />
    </div>
  );
}

export default Exploration;
