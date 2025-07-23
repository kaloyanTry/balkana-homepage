// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { MapIcon } from '@heroicons/react/24/outline';
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
    gpx_file,
  } = route;

  const displayStartPoint = String(startPoint);
  const displayGpxFile = String(gpx_file);

  const checkSuits = suitable;
  function suitsResult(result) {
    if (checkSuits.length > 17) {
      result = '🏃‍➡️ + 🚴 + 🚶';
      console.log(checkSuits.length);
    }

    if (
      checkSuits.length > 8 &&
      checkSuits.length <= 15 &&
      checkSuits.includes('hiking')
    ) {
      result = '🏃‍➡️ + 🚶';
      console.log(checkSuits.length);
    }

    if (
      checkSuits.length > 8 &&
      checkSuits.length <= 16 &&
      checkSuits.includes('cycling')
    ) {
      result = '🏃‍➡️ + 🚴';
      console.log(checkSuits.length);
    }

    if (checkSuits === 'running') {
      result = '🏃‍➡️';
    }

    if (checkSuits === 'cycling') {
      result = '🚴';
    }

    if (checkSuits === 'hiking') {
      result = '🚶';
    }

    return result;
  }

  return (
    <main className='flex flex-col mx-auto'>
      <article className='relative min-w-[96vw] min-h-[80vh] rounded-sm mx-auto'>
        {/* <article className='flex relative w-auto max-w-[2000px] h-screen max-h-[60vh] min-h-96 rounded-sm my-4'> */}
        <Image
          src={image}
          fill
          sizes='100%'
          alt={`Route ${title}`}
          className='object-cover'
          priority
        />
      </article>

      <article className='flex flex-col px-2 items-center'>
        <div className='flex my-12 justify-center'>
          <h1 className=' text-accent-300 text-8xl font-semibold max-sm:text-4xl'>
            {title}
          </h1>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold max-sm:text-2xl'>
            Destination:{' '}
            <span className='font-bold text-primary-300'>{destination}</span>
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold max-sm:text-2xl'>
            Distance:{' '}
            <span className='font-bold text-primary-300'>{distance}</span>K
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold max-sm:text-2xl'>
            Elevation:{' '}
            <span className='font-bold text-primary-300'>{elevation}</span>
            D+
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold max-sm:text-2xl'>
            Difficulty:{' '}
            <span className='font-bold text-primary-300'>{difficulty}</span>
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold max-sm:text-2xl'>
            Suitable for:{' '}
            <span className='font-bold text-6xl max-sm:text-4xl'>
              {suitsResult()}
            </span>
          </h3>
        </div>
      </article>

      <article className='flex my-4 justify-center mx-2'>
        <p className=' text-primary-300 text-2xl text-justify font-normal'>
          <TextExpander>{description}</TextExpander>
        </p>
      </article>

      <article className='flex gap-2 items-center justify-center my-8'>
        <MapPinIcon className='h-12 w-12 text-accent-300' />
        <span className='text-2xl text-primary-200'>
          Explore starting point location{' '}
          <Link href={displayStartPoint} passHref legacyBehavior shallow>
            <a target='_blank' className='text-accent-300 font-semibold'>
              here
            </a>
          </Link>
        </span>
      </article>

      <article className='flex gap-2 items-center justify-center my-8'>
        <MapIcon className='h-16 w-16 text-accent-300' />
        <span className='text-2xl text-primary-200'>
          Download the gpx file of the track{' '}
          <Link href={displayGpxFile} passHref legacyBehavior shallow>
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
