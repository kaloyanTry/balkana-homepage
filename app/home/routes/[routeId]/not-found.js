import Link from 'next/link';

function NotFound() {
  return (
    <div className='space-y-8 mt-16 text-center'>
      <h1 className='text-4xl text-accent-300 font-semibold'>
        The trail could NOT be found
      </h1>
      <Link
        href='/home/tracks'
        className='inline-block bg-accent-200 text-primary-300 text-xl p-4'
      >
        Go back to the main trails
      </Link>
    </div>
  );
}

export default NotFound;
