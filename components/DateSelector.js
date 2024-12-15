'use client';

import { useExploration } from './ExplorationContext';
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// function isAlreadyNoted(range, dateArray) {
//   return (
//     range.from &&
//     range.to &&
//     dateArray.some((date) =>
//       isWithinInterval(date, { start: range.from, end: range.to })
//     )
//   );
// }

function DateSelector({ track, plannedDates }) {
  const { range, setRange, resetRange } = useExploration();
  // const displayRange = isAlreadyNoted(range, plannedDates) ? {} : range;
  const displayRange = range;

  // const numDays = differenceInDays(displayRange.to, displayRange.from);
  let numDays;
  if (displayRange.to === 'undefined' && displayRange.from === 'undefined') {
    numDays = 1;
  } else {
    numDays = differenceInDays(displayRange.to, displayRange.from) + 1;
  }

  return (
    <main className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        onSelect={setRange}
        selected={displayRange}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 2}
        captionLayout='dropdown'
        numberOfMonths={1}
        weekStartsOn={1}
        classNames={{
          today: 'bg-accent-200 text-accent-300', // Add a border to today's date
          selected: 'bg-accent-200 border-prime-300 text-primary-200', // Highlight the selected day
        }}
        // disabled={(currDate) =>
        //   isPast(currDate) ||
        //   bookedDates.some((date) => isSameDay(date, currDate))
        // }
        disabled={(currDate) => isPast(currDate)}
      />

      <article className='flex flex-col items-center justify-between px-2 bg-accent-200 text-primary-300 h-16 w-auto'>
        <div>
          {numDays ? (
            <>
              <p className='text-xl'>
                Days on the route:{' '}
                <span className='text-2xl font-semibold px-2'>{numDays}</span>
              </p>
            </>
          ) : (
            <p className='text-xl'>!!! Pleases, select dates, first.</p>
          )}
        </div>
        {range.from || range.to ? (
          <button
            className='border border-accent-300 px-4 py-2 text-lg rounded-sm font-bold text-primary-300 hover:bg-accent-300'
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </article>
    </main>
  );
}

export default DateSelector;
