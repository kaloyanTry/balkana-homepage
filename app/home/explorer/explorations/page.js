import { getExplorations } from '@/lib/actions';
import { auth } from '@/lib/auth';
import ExplorationList from '@/components/ExplorationList';
import Link from 'next/link';

export const metadata = {
  title: 'Explorations',
};

async function VisitationsPage() {
  const session = await auth();
  const explorerName = session.user.name;
  const explorations = await getExplorations(session.user.explorerId);

  return (
    <div>
      <h2 className='font-semibold text-4xl text-accent-300 m-4'>
        {explorerName}&apos; Explorations
      </h2>
      {explorations.length === 0 ? (
        <p className='font-normal text-xl text-primary-300 m-4'>
          You have NO explorations yet. Explore Balkanas&apos;{' '}
          <Link href='/home/routes'>routes $rarr;</Link>
        </p>
      ) : (
        <ExplorationList explorations={explorations} />
      )}
    </div>
  );
}

export default VisitationsPage;
