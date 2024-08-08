import { getFilteredRoutes } from '@/lib/actions';
import RouteItem from './RouteItem';
import Link from 'next/link';
import { MapIcon } from '@heroicons/react/24/outline';

async function RoutesList({ query, currentPage }) {
  const routes = await getFilteredRoutes(query, currentPage);

  if (!routes.length) return null;

  // let displayedRoutes;

  // ////////////////// Simple filter of routes: /////////
  // if (filterDistance === 'all') {
  //   displayedRoutes = routes;
  // }
  // if (filterDistance === 'short') {
  //   displayedRoutes = routes.filter((route) => route.distance <= 20);
  // }

  // if (filterDistance === 'trail') {
  //   displayedRoutes = routes.filter(
  //     (route) => route.distance >= 21 && route.distance <= 42
  //   );
  // }

  // if (filterDistance === 'ultra') {
  //   displayedRoutes = routes.filter((route) => route.distance >= 43);
  // }
  // /////////////////////////////////////////////////

  // /////////////////////Search implementation////////////////////////////
  // if (query) {
  //   displayedRoutes = routes.filter((route) => route.title.includes(query));
  // }
  ///////////////////////////////////////////////////////////////////////
  // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
  //////////////////Pagination///////////////////////////////////////////

  //////////////////////////////////////////////

  const numberRoutes = routes.length;
  return (
    <main className='flex flex-col'>
      <article className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-12'>
        {routes.map((route, i) => (
          <RouteItem route={route} key={i} />
        ))}
      </article>
      <section>
        <p className='mt-8 mx-auto text-accent-100 text-2xl bg-accent-300 py-4 px-8'>
          The number of routes on this page is{' '}
          <span className='text-4xl font-bold'>{numberRoutes}</span> here
        </p>
        <article className='text-2xl py-8 px-4 bg-accent-100'>
          <p className='text-primary-300'>
            <span className='mr-4 text-accent-200 text-4xl font-semibold'>
              &#9432;
            </span>
            Important! Crossing the routes requires personal responsibility and
            activity. Being in the wild requires care and respect. When visiting
            mountains, it is recommended to have mountain insurance. Information
            about Mountain Resque Service{' '}
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

export default RoutesList;
