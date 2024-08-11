import Link from 'next/link';

function NotFound() {
  return (
    <div className='space-y-8 mt-16 text-center'>
      <h1 className='text-4xl text-accent-300 font-semibold'>
        This project could <span className='uppercase'>not</span> be found
      </h1>
      <Link
        href='/home/projects'
        className='inline-block bg-accent-200 text-primary-300 text-xl p-4 rounded-sm hover:text-primary-100'
      >
        Go back to the main projects
      </Link>
    </div>
  );
}

export default NotFound;
