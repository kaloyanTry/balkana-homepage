import { getBookedDatesByTrackId } from '@/lib/actions-data-services';
import DateSelector from '@/components/DateSelector';
import ExplorationForm from '@/components/ExplorationForm';

async function Exploration({ track }) {
  const bookedDates = await getBookedDatesByTrackId(track.id);

  return (
    <div>
      <DateSelector bookedDates={bookedDates} track={track} />
      <ExplorationForm track={track} />
    </div>
  );
}

export default Exploration;
