import SubmitBtn from '@/components/SubmitBtn';
import { getExploration, updateExploration } from '@/lib/actions';

async function EditExplorationPage({ params }) {
  const { explorationId } = params;
  const { numDays, numExplorers, experience } = await getExploration(
    explorationId
  );
  return (
    <div>
      <h2 className='text-4xl text-primary-200 font-semibold mb-4'>
        Edit Exploration #{explorationId}
      </h2>

      <form
        action={updateExploration}
        className='bg-primary-100 py-8 px-12 text-xl flex flex-col'
      >
        <input type='hidden' value={explorationId} name='explorationId' />
        <div className='space-y-2'>
          <label htmlFor='numDays'>How many days?</label>
          <select
            name='numDays'
            id='numDays'
            defaultValue={numDays}
            className='px-5 py-3 bg-white text-primary-300 w-full shadow-md rounded-sm'
          >
            <option value='' key=''>
              Select number of days...
            </option>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'day' : 'days'}
              </option>
            ))}
          </select>
        </div>
        <div className='space-y-2 mt-8'>
          <label htmlFor='numExplorers'>How many explorers?</label>
          <select
            name='numExplorers'
            id='numExplorers'
            defaultValue={numExplorers}
            className='px-5 py-3 bg-white text-primary-300 w-full shadow-md rounded-sm'
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
        <div className='space-y-2 my-8'>
          <label htmlFor='experience'>
            Anything to share about your experience?
          </label>
          <textarea
            name='experience'
            id='experience'
            defaultValue={experience}
            className='px-5 py-3 bg-white text-primary-300 w-full shadow-md rounded-sm'
          />
        </div>
        <div className='flex justify-end items-center gap-6'>
          <SubmitBtn pendingLabel='Updating...'>Update Exploration</SubmitBtn>
        </div>
      </form>
    </div>
  );
}

export default EditExplorationPage;
