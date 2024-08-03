import { getProject } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { year } = await getProject(params.projectId);

  return { title: `Project ${year}` };
}

async function ProjectsPage({ params }) {
  const project = await getProject(params.projectId);

  const { id, title, year, description, partners, image } = project;

  return (
    <main className='flex flex-col'>
      <article className='flex justify-between relative w-auto max-w-[2000px] h-screen max-h-[60vh] min-h-96 my-4'>
        <Image
          src={image}
          fill
          sizes='100%'
          alt={`Track ${title}`}
          className='object-cover'
        />
      </article>

      <article className='flex my-12 justify-center'>
        <h2 className=' text-primary-200 text-9xl font-semibold'>{title}</h2>
      </article>

      <article className='flex flex-col items-center'>
        <div className='flex gap-2 my-6'>
          <h3 className='text-4xl text-accent-300 font-semibold '>
            Opening year{' '}
            <span className='font-bold text-6xl bg-accent-300 p-2 text-primary-100'>
              {year}
            </span>
          </h3>
        </div>

        <div className='flex gap-2 my-8'>
          <h3 className='text-4xl text-primary-300 font-semibold'>
            Partners{' '}
            <span className='font-bold text-accent-300'>{partners}</span>
          </h3>
        </div>

        <div className='flex my-4 justify-center'>
          <p className=' text-primary-300 text-2xl font-normal'>
            {description}
          </p>
        </div>
      </article>

      <article className='flex justify-end my-12'>
        <Link
          href='/home/projects'
          className=' bg-primary-200 text-xl font-normal text-primary-100 px-4 py-2 rounded-sm'
        >
          Back to all
        </Link>
      </article>
    </main>
  );
}

export default ProjectsPage;
