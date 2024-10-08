import Spinner from '@/components/Spinner';

function Loading() {
  return (
    <div className='grid items-center justify-center'>
      <p className='text-2xl text-accent-300'>Loading data for BalkanaTry...</p>
      <Spinner />
    </div>
  );
}

export default Loading;
