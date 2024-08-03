import ExplorationReminder from '@/components/ExplorationReminder';
import FilterDistance from '@/components/FilterDistance';
// import FilterSuitable from '@/components/FilterSuitable';
import Spinner from '@/components/Spinner';
import RoutesList from '@/components/RoutesList';
import { getRoutes } from '@/lib/actions';
import { Suspense } from 'react';

// code for static generated pages:
// export const revalidate = 86400;

export const metadata = {
  title: 'Routes',
  description: 'The overview of the Balkanas trails',
};

// when using sesarchParams the page is dynamic rendered page
async function RoutesPage({ searchParams }) {
  const routes = await getRoutes();
  const filterDistance = searchParams?.distance ?? 'all';

  return (
    <main>
      <h1 className='text-8xl mb-8 text-accent-300 font-semibold text-center'>
        Balkanas&apos; Routes
      </h1>
      <p className='mt-16 text-primary-300 text-2xl font-normal '>
        Balkanas&apos; routes are pieces of beauty and wild. Our liability is to
        maintain, to preserve, and to live in harmony with the nature. The
        mountains are still not overcrowded and so not much destroyed by danger
        humans&apos; actions. The trails are suitable for active, sensible and
        responsible people. Please, explore Balkans&apos; routes with respect to
        the mountain, and without destructive attitude and behavior. Take care
        of the nature, locals, and yourself.
      </p>
      <p className='mb-8 text-primary-300 text-2xl font-normal'>
        Our public database of routes include{' '}
        <span className='font-bold text-accent-300'>
          {routes.length} trails
        </span>
        , which you can explore.{' '}
        <span className='font-bold text-accent-300'>Explore!</span>
      </p>
      <div className='flex justify-center'>
        <span className='text-2xl font-medium bg-accent-300 text-accent-100 p-2 mb-8'>
          Explore
        </span>
        <FilterDistance />
      </div>
      <Suspense fallback={<Spinner />} key={filterDistance}>
        <RoutesList filterDistance={filterDistance} />
        <ExplorationReminder />
      </Suspense>
    </main>
  );
}

export default RoutesPage;
