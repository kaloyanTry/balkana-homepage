import { getBookedDatesByTrackId } from '@/lib/actions';
import DateSelector from '@/components/DateSelector';
import ExplorationForm from '@/components/ExplorationForm';
import { auth } from '@/lib/auth';
import LoginMessage from './LoginMessage';

async function Exploration({ track }) {
  const bookedDates = await getBookedDatesByTrackId(track.id);
  const session = await auth();

  return (
    <div>
      <DateSelector track={track} bookedDates={bookedDates} />
      {session?.user ? (
        <ExplorationForm track={track} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Exploration;
