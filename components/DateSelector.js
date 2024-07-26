'use client';

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useExploration } from './ExplorationContext';

function isAlreadyBooked(range, dateArray) {
  return (
    range.from &&
    range.to &&
    dateArray.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ track, bookedDates }) {
  const { range, setRange, resetRange } = useExploration();
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const numDays = differenceInDays(displayRange.to, displayRange.from);

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        onSelect={setRange}
        selected={displayRange}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 3}
        captionLayout='dropdown'
        numberOfMonths={3}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDates.some((date) => isSameDay(date, currDate))
        }
      />

      <div className='flex items-center justify-between px-2 bg-accent-200 text-primary-300 h-16'>
        <div>
          {numDays ? (
            <>
              <p className='text-xl'>
                Days on the trail:{' '}
                <span className='text-2xl font-semibold px-2'>
                  {numDays + 1}
                </span>
              </p>
            </>
          ) : null}
        </div>
        {range.from || range.to ? (
          <button
            className='border border-accent-300 px-4 py-2 text-lg rounded-sm font-bold text-primary-300 hover:bg-accent-300'
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
