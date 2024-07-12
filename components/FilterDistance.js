'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ButtonTracks from './ButtonTracks';

function FilterDistance() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('distance') ?? '';

  function handleFilter(filterDistance) {
    const params = new URLSearchParams(searchParams);
    params.set('distance', filterDistance);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='flex mb-8 text-lg'>
      <ButtonTracks
        filterSuitable='short'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        short
      </ButtonTracks>
      <ButtonTracks
        filterSuitable='trail'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        trail
      </ButtonTracks>
      <ButtonTracks
        filterSuitable='ultra'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        ultra
      </ButtonTracks>

      {/* <button
        className='my-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'
        onClick={() => handleFilter('short')}
      >
        short
      </button>
      <button
        className='my-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'
        onClick={() => handleFilter('trail')}
      >
        trail
      </button>
      <button
        className='my-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'
        onClick={() => handleFilter('ultra')}
      >
        ultra
      </button> */}
    </div>
  );
}

export default FilterDistance;
