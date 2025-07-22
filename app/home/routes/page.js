import { Suspense } from 'react';

import { getRoutesPages } from '@/lib/data';
import Spinner from '@/components/Spinner';
import ExplorationReminder from '@/components/ExplorationReminder';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';
// import FilterDistance from '@/components/FilterDistance';
// import FilterSuitable from '@/components/FilterSuitable';
import RoutesList from '@/components/RoutesList';
import { MapIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// code for static generated pages:
// export const revalidate = 86400;

export const metadata = {
  title: 'Routes',
  description: "The overview of the Balkanas' routes",
};

// When using sesarchParams the page is a dynamic rendered page //
async function RoutesPage({ searchParams }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Pagination => fetch routes total pages //
  // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination //
  const totalPages = await getRoutesPages(query);

  return (
    <main className='flex flex-col mx-4'>
      <section>
        <h1 className='text-8xl mb-8 text-accent-300 font-semibold text-center'>
          Balkana&apos;s Routes
        </h1>
        <p className='mt-16 text-primary-300 text-3xl font-normal max-sm:text-2xl'>
          Balkana&apos;s routes are pieces of natural beauty and wilderness. Our
          responsibility is to maintain, preserve, and live in harmony with
          nature. The mountains are still not overcrowded and have not been
          significantly damaged by harmful human actions. The trails are
          suitable for active, sensible, and responsible people. Please explore
          Balkana&apos;s routes with respect for the mountain and without
          destructive attitudes or behavior. Take care of nature, locals, and
          yourself.
        </p>
        <p className='mb-8 text-primary-300 text-2xl font-normal'>
          Our public database includes{' '}
          <span className='font-bold text-accent-300'>
            {totalPages} pages in total with routes in your destination
          </span>
          , which you can explore.{' '}
          <span className='font-bold text-accent-300'>Explore more!</span>
        </p>
      </section>

      <article className='flex justify-center'>
        <Link href='/home/routes' className='mb-4'>
          <span className='text-2xl font-medium bg-accent-300 text-accent-100 py-2 px-4 rounded-sm'>
            Explore All
          </span>
        </Link>
        {/* <FilterDistance /> */}
      </article>

      {/* ///////// Search and Pagination section: ////////// */}
      <article className='block'>
        <p className='text-xl text-accent-300 text-center font-normal mb-2'>
          Search by typing a destination{' '}
          <span className='mx-2'>&#x1F50E;&#xFE0E;</span>{' '}
        </p>
        <article className='mb-8 flex items-center justify-between gap-2'>
          <Search placeholder='Search routes...' />
        </article>
      </article>

      <article className='mb-8 flex w-full justify-center'>
        {totalPages ? <Pagination totalPages={totalPages} /> : ''}
      </article>

      {/* /////////////////////////////////////////////////// */}

      <Suspense key={query + currentPage} fallback={<Spinner />}>
        <RoutesList query={query} currentPage={currentPage} />
        <ExplorationReminder />
      </Suspense>

      <section>
        <article className='mb-8 flex w-full justify-center'>
          {totalPages ? <Pagination totalPages={totalPages} /> : ''}
        </article>
        <article className='text-2xl py-8 px-4 bg-accent-100'>
          <p className='text-primary-300'>
            <span className='mr-4 text-accent-200 text-4xl font-semibold'>
              &#9432;
            </span>
            Important! Crossing the routes requires personal responsibility and
            proper preparation. Being in the wilderness requires care and
            respect. When visiting mountains, it is recommended to have mountain
            insurance. Information about Mountain Rescue Service{' '}
            <Link
              href='https://en.redcross.bg/activities/activities2'
              rel='noopener noreferrer'
              target='_blank'
              className='text-accent-300 font-semibold'
            >
              link
            </Link>{' '}
            and mountain insurance{' '}
            <Link
              href='https://www.pss-bg.bg/planinska-zastrahovka/'
              rel='noopener noreferrer'
              target='_blank'
              className='text-accent-300 font-semibold'
            >
              link
            </Link>
            .
          </p>
          <div className='py-4 flex gap-4'>
            <MapIcon className='h-12 w-12 text-accent-200' />
            <p className='pt-2'>
              Very useful source for Bulgarian mountains online maps, gps routes
              and tracks on bgmountains.org,{' '}
              <Link
                href='https://bgmountains.org/en/#'
                rel='noopener noreferrer'
                target='_blank'
                className='text-accent-300 font-semibold'
              >
                link.
              </Link>{' '}
              Respect!
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default RoutesPage;
