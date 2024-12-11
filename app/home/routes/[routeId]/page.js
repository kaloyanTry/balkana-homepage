import Exploration from '@/components/Exploration';
import Spinner from '@/components/Spinner';
import Route from '@/components/Route';
import { getRoute } from '@/lib/data';
import { getPlannedExplorations } from '@/lib/actions';
import { Suspense } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { title } = await getRoute(params.routeId);
  const titleFirstWord = title.split(' - ').slice(0, 1);

  return { title: `Route ${titleFirstWord}` };
}

async function RoutePage({ params }) {
  const routeId = params.routeId;
  const route = await getRoute(routeId);
  const plannedExplorations = await getPlannedExplorations(routeId);
  const exploredTimes = plannedExplorations.length;

  return (
    <main className='flex flex-col mx-auto my-4'>
      <Suspense fallback={<Spinner />}>
        <Route route={route} />
      </Suspense>

      <section className='flex flex-col my-8 items-center justify-center'>
        <h3 className='text-4xl text-accent-300 text-center'>
          Plan your route{' '}
          <span className='text-5xl text-primary-200 font-normal'>
            {route.title}
          </span>{' '}
          and share with others
        </h3>
        <UserGroupIcon className='h-12 w-12 text-accent-300' />
        <article>
          <Suspense fallback={<Spinner />}>
            <Exploration route={route} />
          </Suspense>
        </article>

        {/* Shared Information Section: */}
        {plannedExplorations ? (
          <article className='flex flex-col mt-4 items-center justify-center'>
            <h2 className='text-6xl text-primary-200 font-semibold my-8'>
              <span className='mx-4 text-accent-300 text-8xl font-semibold'>
                &#9432;
              </span>
              Shared Information
            </h2>
            <h3 className='text-4xl text-accent-300 my-4'>
              The route has been explored {exploredTimes} times.{' '}
              <span className='font-semibold'>Join!</span>
            </h3>
            {plannedExplorations.map((exploration) => (
              <p key={exploration.startDate} className='text-2xl py-2'>
                on{' '}
                {isPast(exploration.startDate) ? (
                  <span className='bg-accent-100'>
                    {' '}
                    {format(
                      new Date(exploration.startDate),
                      'EEE, dd MMM yyyy'
                    )}{' '}
                    (past event){' '}
                  </span>
                ) : (
                  <span className='bg-primary-100'>
                    {format(
                      new Date(exploration.startDate),
                      'EEE, dd MMM yyyy'
                    )}{' '}
                    (future event){' '}
                  </span>
                )}
                for {exploration.numDays} days from {exploration.numExplorers}{' '}
                explorers.
              </p>
            ))}
          </article>
        ) : null}
      </section>
      <aside className='flex justify-end my-8 px-4 max-sm:my-4 max-sm:px-2'>
        <Link
          href='/home/routes'
          className=' bg-accent-300 text-xl font-normal text-primary-100 px-4 py-2 rounded-sm hover:bg-accent-200'
        >
          Back to all
        </Link>
      </aside>
    </main>
  );
}

export default RoutePage;
