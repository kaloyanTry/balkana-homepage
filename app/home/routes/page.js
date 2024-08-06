import ExplorationReminder from '@/components/ExplorationReminder';
import FilterDistance from '@/components/FilterDistance';
// import FilterSuitable from '@/components/FilterSuitable';
import Spinner from '@/components/Spinner';
import RoutesList from '@/components/RoutesList';
import Pagination from '@/components/Pagination';
import { getRoutes, getRoutesPages } from '@/lib/actions';

import { Suspense } from 'react';
import Search from '@/components/Search';

// code for static generated pages:
// export const revalidate = 86400;

export const metadata = {
  title: 'Routes',
  description: "The overview of the Balkanas' routes",
};

// when using sesarchParams the page is dynamic rendered page
async function RoutesPage({ searchParams }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams.page) || 1;

  const totalPages = await getRoutesPages(query);

  ////// simple filter for distance //////
  const filterDistance = searchParams?.distance ?? 'all';

  return (
    <main>
      <section>
        <h1 className='text-8xl mb-8 text-accent-300 font-semibold text-center'>
          Balkanas&apos; Routes
        </h1>
        <p className='mt-16 text-primary-300 text-2xl font-normal '>
          Balkanas&apos; routes are pieces of beauty and wild. Our liability is
          to maintain, to preserve, and to live in harmony with the nature. The
          mountains are still not overcrowded and so not much destroyed by
          danger humans&apos; actions. The trails are suitable for active,
          sensible and responsible people. Please, explore Balkans&apos; routes
          with respect to the mountain, and without destructive attitude and
          behavior. Take care of the nature, locals, and yourself.
        </p>
        <p className='mb-8 text-primary-300 text-2xl font-normal'>
          Our public database includes{' '}
          <span className='font-bold text-accent-300'>
            {totalPages.length} routes in total
          </span>
          , which you can explore.{' '}
          <span className='font-bold text-accent-300'>Explore!</span>
        </p>
      </section>

      <article className='flex justify-center'>
        <span className='text-2xl font-medium bg-accent-300 text-accent-100 p-2 mb-4'>
          Explore
        </span>
        <FilterDistance />
      </article>

      {/* ///////// Search and Pagination section: ////////// */}
      <article>
        <p className='text-xl text-accent-300 text-center font-normal mb-2'>
          <span className='uppercase font-semibold'>or</span> search by typing
        </p>
        <div className='mb-8 flex items-center justify-between gap-2'>
          <Search placeholder='Search routes...' />
        </div>
      </article>

      <div className='my-4 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>

      {/* /////////////////////////////////////////////////// */}

      <Suspense key={query + currentPage} fallback={<Spinner />}>
        <RoutesList
          filterDistance={filterDistance}
          query={query}
          currentPage={currentPage}
        />
        <ExplorationReminder />
      </Suspense>
    </main>
  );
}

export default RoutesPage;
