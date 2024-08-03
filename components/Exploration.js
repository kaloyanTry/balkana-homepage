import { getBookedDatesByRouteId } from '@/lib/actions';
import DateSelector from '@/components/DateSelector';
import ExplorationForm from '@/components/ExplorationForm';
import { auth } from '@/lib/auth';
import LoginMessage from './LoginMessage';

async function Exploration({ route }) {
  const bookedDates = await getBookedDatesByRouteId(route.id);
  const session = await auth();

  return (
    <div>
      <DateSelector route={route} bookedDates={bookedDates} />
      {session?.user ? (
        <ExplorationForm route={route} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Exploration;
