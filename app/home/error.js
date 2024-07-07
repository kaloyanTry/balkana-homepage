'use client';

function Error({ error, reset }) {
  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-4xl text-accent-200'>Something went wrong</h1>
      <h2 className='text-2xl text-accent-300 uppercase '>Error!!!</h2>
      <p className='text-primary-300 text-lg'>{error.message}</p>
      <button
        className='inline-block bg-accent-200 text-primary-300 text-xl p-4'
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}

export default Error;
