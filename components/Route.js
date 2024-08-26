// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/solid';
import TextExpander from '@/components/TextExpander';

function Route({ route }) {
  const {
    id,
    title,
    distance,
    difficulty,
    startPoint,
    description,
    elevation,
    image,
    suitable,
    destination,
  } = route;

  // console.log(startPoint);
  const displayStartPoint = String(startPoint);

  const checkSuits = suitable;
  function suitsResult(result) {
    if (checkSuits.length > 9) {
      result = '🏃‍➡️ + 🚴';
    } else {
      if (checkSuits.includes('running')) {
        result = '🏃‍➡️';
      }
      if (checkSuits.includes('cycling')) {
        result = '🚴';
      }
    }
    return result;
  }

  return (
    <main className='flex flex-col mx-auto py-4'>
      <article className='flex relative w-auto h-screen max-h-[60vh] min-h-96'>
        <Image
          src={image}
          fill
          sizes='100%'
          alt={`Route ${title}`}
          className='object-cover'
          priority
        />
      </article>

      <article className='flex flex-col items-center'>
        <div className='flex my-12 justify-center'>
          <h1 className=' text-accent-300 text-8xl font-semibold'>{title}</h1>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold'>
            Destination:{' '}
            <span className='font-bold text-primary-300'>{destination}</span>
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold'>
            Distance:{' '}
            <span className='font-bold text-primary-300'>{distance}</span>K
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold'>
            Elevation:{' '}
            <span className='font-bold text-primary-300'>{elevation}</span>
            D+
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold'>
            Difficulty:{' '}
            <span className='font-bold text-primary-300'>{difficulty}</span>
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold'>
            Suitable for:{' '}
            <span className='font-bold text-6xl'>{suitsResult()}</span>
          </h3>
        </div>
      </article>

      <article className='flex my-4 justify-center mx-12'>
        <p className=' text-primary-300 text-2xl font-normal'>
          <TextExpander>{description}</TextExpander>
        </p>
      </article>

      <article className='flex gap-2 items-center justify-center my-8'>
        <MapPinIcon className='h-8 w-8 text-accent-300' />
        <span className='text-2xl text-primary-200'>
          Explore starting point location{' '}
          <Link
            // href='https://maps.app.goo.gl/cRmVTQfreF1RobMi9'
            href={displayStartPoint}
            passHref
            legacyBehavior
            shallow
          >
            <a target='_blank' className='text-accent-300 font-semibold'>
              here
            </a>
          </Link>
        </span>
      </article>
    </main>
  );
}

export default Route;

// https://ell.stackexchange.com/questions/171407/whats-the-difference-between-track-and-trail
// http://www.outdoorsfather.com/2015/10/trail-vs-route-which-one-is-for-you/
