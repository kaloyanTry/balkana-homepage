import Image from 'next/image';
import Link from 'next/link';

function RouteItem({ route }) {
  const { id, title, distance, elevation, difficulty, image, destination } =
    route;

  return (
    <main className='flex flex-col bg-primary-100'>
      <article className='flex justify-between relative h-screen max-h-[60vh] min-h-96'>
        <Image
          src={image}
          fill
          sizes='100%'
          alt={`Route image ${title}`}
          className='object-cover'
          priority
        />
      </article>

      <article className='flex-grow'>
        <div>
          <h1 className='text-accent-300 text-6xl font-bold min-h-32 m-4'>
            {title}
          </h1>

          <div className='flex gap-2 mx-4'>
            <h3 className='text-2xl text-accent-300 font-semibold'>
              Distance:{' '}
              <span className='font-bold text-primary-300'>{distance}</span>K
            </h3>
          </div>

          <div className='flex gap-2 mx-4'>
            <h3 className='text-2xl text-accent-300 font-semibold'>
              Elevation Gain:{' '}
              <span className='font-bold text-primary-300'>{elevation}</span>
              D+
            </h3>
          </div>

          <div className='flex gap-2 mx-4'>
            <h3 className='text-2xl text-accent-300 font-semibold'>
              Difficulty:{' '}
              <span className='font-bold text-primary-300'>{difficulty}</span>
            </h3>
          </div>

          <div className=' text-accent-100 text-right text-xl'>
            <Link
              href={`/home/routes/${id}`}
              className=' bg-accent-300 py-4 px-4 inline-block hover:bg-primary-200 transition-all  rounded-sm'
            >
              Explore Details
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

export default RouteItem;
