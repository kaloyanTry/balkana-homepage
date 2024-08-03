'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ButtonRoutes from './ButtonRoutes';

function FilterSuitable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('suitable') ?? 'all';

  function handleFilter(filterSuitable) {
    const params = new URLSearchParams(searchParams);
    params.set('suitable', filterSuitable);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='flex mb-8 text-lg'>
      {/* <button
        className='my-2 px-4 font-bold hover:bg-primary-100 hover:border-r-2 border-primary-300'
        onClick={() => handleFilter('all')}
      >
        all
      </button>
      <button
        className='my-2 px-4  hover:bg-primary-100 hover:border-r-2 border-primary-300'
        onClick={() => handleFilter('running')}
      >
        running
      </button>
      <button
        className='my-2 px-4 hover:bg-primary-100 hover:border-r-2 border-primary-300'
        onClick={() => handleFilter('cycling')}
      >
        cycling
      </button> */}

      {/* <ButtonTracks
        filterSuitable='all'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        all
      </ButtonTracks> */}

      <ButtonRoutes
        filterSuitable='running'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        running
      </ButtonRoutes>
      <ButtonRoutes
        filterSuitable='cycling'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        cycling
      </ButtonRoutes>
    </div>
  );
}

// function Button({ filterSuitable, handleFilter, activeFilter, children }) {
//   return (
//     <button
//       className={`my-2 px-4 text-primary-300 hover:bg-primary-100 hover:border-r-2 border-primary-300 ${
//         filterSuitable === activeFilter ? 'font-bold' : ''
//       }`}
//       onClick={() => handleFilter(filterSuitable)}
//     >
//       {children}
//     </button>
//   );
// }

export default FilterSuitable;
