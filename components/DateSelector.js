'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function DateSelector({ track, settings, bookedDates }) {
  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 3}
        captionLayout='dropdown'
        numberOfMonths={3}
      />
    </div>
  );
}

export default DateSelector;
