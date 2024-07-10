'use client';

function Filter() {
  return (
    <div className='flex mb-8 text-lg'>
      <button className=' py-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'>
        all trails
      </button>
      <button className='py-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'>
        running
      </button>
      <button className='py-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'>
        cycling
      </button>

      {/* <button className=' py-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'>
        all trails
      </button>
      <button className='py-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'>
        short
      </button>
      <button className='py-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'>
        trail
      </button>
      <button className='py-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'>
        ultra
      </button> */}
    </div>
  );
}

export default Filter;
