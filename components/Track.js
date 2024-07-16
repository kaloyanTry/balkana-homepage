import TextExpander from '@/components/TextExpander';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

function Track({ track }) {
  const {
    id,
    title,
    distance,
    description,
    elevation,
    difficulty,
    image,
    suitable,
  } = track;

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
    <div className='flex flex-col'>
      <div className='flex justify-between relative w-auto h-96'>
        <Image
          src={image}
          fill
          sizes='100%'
          alt={`Track ${title}`}
          className='object-cover'
        />
      </div>

      <div className='flex my-12 justify-center'>
        <h2 className=' text-primary-200 text-6xl font-semibold'>{title}</h2>
      </div>

      <div className='flex flex-col items-center'>
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
      </div>

      <div className='flex my-4 justify-center'>
        <p className=' text-primary-300 text-2xl font-normal'>
          <TextExpander>{description}</TextExpander>
        </p>
      </div>

      <div className='flex gap-2 items-center justify-center my-8'>
        <MapPinIcon className='h-8 w-8 text-accent-300' />
        <span className='text-2xl text-primary-200'>
          Explore starting point location{' '}
          <Link
            href='https://maps.app.goo.gl/cRmVTQfreF1RobMi9'
            passHref
            legacyBehavior
          >
            <a target='_blank' className='text-accent-300 font-semibold'>
              here
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Track;
