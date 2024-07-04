import Image from 'next/image';
import Link from 'next/link';

function ProjectItem({ project }) {
  const { id, title, year, description, partners, image } = project;

  return (
    <main className='flex flex-col'>
      <div className='flex-grow'>
        <h2 className='text-primary-200 text-6xl min-h-32 my-8 text-center font-semibold'>
          <span className='text-primary-300'>Project</span> {title}
        </h2>
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
    </main>
  );
}

export default ProjectItem;
