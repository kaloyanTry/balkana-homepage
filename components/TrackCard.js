import Image from 'next/image';
import Link from 'next/link';

function TrackCard({ track }) {
  const {
    id,
    title,
    distance,
    elevation,
    difficulty,
    description,
    suitable,
    image,
  } = track;

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

      <div className='flex-grow'>
        <div className='py-2 px-2 bg-primary-100'>
          <h2 className='text-accent-200 text-4xl font-semibold m-2 min-h-32'>
            Track: {title}
          </h2>

          <div className='flex gap-2 items-center m-2'>
            <h3 className='text-2xl text-accent-200 font-semibold'>
              Distance:{' '}
              <span className='font-bold text-primary-300'>{distance}</span>K
            </h3>
          </div>

          <div className='flex gap-2 items-center m-2'>
            <h3 className='text-2xl text-accent-200 font-semibold'>
              Elevation:{' '}
              <span className='font-bold text-primary-300'>{elevation}</span>
              D+
            </h3>
          </div>

          <div className='flex gap-2 items-center m-2'>
            <h3 className='text-2xl text-accent-200 font-semibold'>
              Difficulty:{' '}
              <span className='font-bold text-primary-300'>{difficulty}</span>
            </h3>
          </div>
        </div>

        <div className=' text-accent-100 text-right text-xl mb-8'>
          <Link
            href='#'
            className=' bg-primary-200 py-2 px-4 inline-block hover:bg-accent-200 transition-all hover:text-primary-300'
          >
            Details and explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrackCard;
