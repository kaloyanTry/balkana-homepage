import { getPlannedExplorations } from '@/lib/actions';
import DateSelector from '@/components/DateSelector';
import ExplorationForm from '@/components/ExplorationForm';
import { auth } from '@/lib/auth';
import LoginMessage from './LoginMessage';

async function Exploration({ route }) {
  const plannedDates = await getPlannedExplorations(route.id);
  const session = await auth();

  return (
    <div>
      <DateSelector route={route} plannedDates={plannedDates} />
      {session?.user ? (
        <ExplorationForm route={route} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Exploration;
