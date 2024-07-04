import Spinner from '@/components/Spinner';

function Loading() {
  <div className='grid items-center justify-center'>
    <Spinner />
    <p className='text-4xl text-accent-300'>Loading data...</p>
  </div>;
}

export default Loading;
