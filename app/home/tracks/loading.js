import Spinner from '@/components/Spinner';

function Loading() {
  return (
    <div className='grid items-center justify-center'>
      {/* //center content verticaly and horizontaly */}
      <p className='text-2xl text-accent-300'>Loading data for BalkanaTry...</p>
      <Spinner className='text-primary-200' />
    </div>
  );
}

export default Loading;
