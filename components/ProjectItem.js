import Image from 'next/image';
import Link from 'next/link';

function ProjectItem({ project }) {
  const { id, title, year, partners, image } = project;

  return (
    <main className='flex flex-col'>
      <div className='flex-grow'>
        <h2 className='text-primary-200 text-6xl mt-8 min-h-32 text-center font-semibold'>
          <span className='text-primary-300'>Project</span> {title}
        </h2>
        <h3 className='text-4xl mb-8 text-primary-300 font-semibold text-center'>
          Openning Year:{' '}
          <span className='text-5xl font-bold text-accent-200'>{year}</span>
        </h3>
      </div>

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
        <h3 className='text-4xl text-primary-300 font-semibold my-4 text-center'>
          Partners{' '}
          <span className='text-4xl text-accent-300 font-bold'>{partners}</span>
        </h3>
      </div>

      <div className='flex justify-end my-8 pb-12 border-b-4 border-accent-200'>
        <Link
          href={`/home/projects/${id}`}
          className='bg-accent-200 text-accent-100 p-4'
        >
          Explore more
        </Link>
      </div>
    </main>
  );
}

export default ProjectItem;
