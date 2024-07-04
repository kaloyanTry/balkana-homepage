import { getProject } from '@/lib/actions';
import Image from 'next/image';

async function ProjectsPage({ params }) {
  const project = await getProject(params.projectId);

  const { id, title, year, description, partners, image } = project;

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
            Opening year{' '}
            <span className='font-bold text-primary-300'>{year}</span>
          </h3>
        </div>

        <div className='flex gap-2 my-2'>
          <h3 className='text-4xl text-accent-300 font-semibold'>
            Partners{' '}
            <span className='font-bold text-primary-300'>{partners}</span>
          </h3>
        </div>

        <div className='flex my-4 justify-center'>
          <p className=' text-primary-300 text-2xl font-normal'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
