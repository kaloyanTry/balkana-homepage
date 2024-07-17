'use client';

function ExplorationForm({ track }) {
  return (
    <div>
      <form className='bg-accent-100 text-accent-300 p-4 text-xl'>
        <div className='space-y-2 font-semibold'>
          <label htmlFor='numExplorers'>How many explorers?</label>
          <select
            name='numExplorers'
            id='numExplorers'
            className='px-2 py-2 bg-accent-100 text-primary-300 font-normal w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of explorers...
            </option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'explorer' : 'explorers'}
              </option>
            ))}
          </select>
        </div>
        <div className='space-y-2 my-4 font-semibold'>
          <label htmlFor='experience'>Share your experience with us?</label>
          <textarea
            name='experience'
            id='experience'
            className='px-2 py-2 bg-accent-100 text-primary-300 font-normal w-full shadow-sm rounded-sm'
            placeholder='Your experiance, expentations, thoughts about equipmets, specificates and more...'
          />
        </div>
        <div className='flex justify-end items-center gap-6'>
          <p className='text-accent-300 text-xl'>Start by selecting dates</p>

          <button className='text-primary-300 bg-accent-200 p-4 font-semibold text-xl rounded-md'>
            Explore Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExplorationForm;
