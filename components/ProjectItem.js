import Image from 'next/image';
import Link from 'next/link';

function ProjectItem({ project }) {
  const { id, title, year, partners, image } = project;

  return (
    <main className='flex flex-col mx-auto'>
      <article className='flex-grow'>
        <h2 className='text-primary-200 text-6xl mt-16 text-center font-semibold'>
          <span className='text-accent-300 '>Project</span> {title}
        </h2>
        <h3 className='text-4xl my-8 text-primary-300 font-semibold text-center'>
          Opening Year:{' '}
          <span className='text-5xl font-bold bg-accent-300 text-accent-100 p-2'>
            {year}
          </span>
        </h3>
      </article>

      <article className='flex relative w-auto max-w-[2000px] h-screen max-h-[60vh] my-8 '>
        <Image
          src={image}
          fill
          sizes='100%'
          alt={`Track ${title}`}
          className='object-cover'
        />
      </article>

      <article className='flex-grow'>
        <h3 className='text-4xl text-primary-300 font-normal my-4 text-center'>
          Partners{' '}
          <span className='text-4xl text-accent-300 font-semibold'>
            {partners}
          </span>
        </h3>
      </article>

      <article className='flex justify-end my-8 pb-12 border-b-4 border-accent-200'>
        <Link
          href={`/home/projects/${id}`}
          className='bg-accent-300 text-primary-100 text-xl p-4 rounded-sm'
        >
          Explore more
        </Link>
      </article>
    </main>
  );
}

export default ProjectItem;
