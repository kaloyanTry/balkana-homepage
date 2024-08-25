'use client';

import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

function ScrollToTopBtn() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {showButton && (
        <button
          onClick={backToTop}
          id='myBtn'
          className={`${
            showButton ? `inline-block` : `hidden`
          } fixed bottom-2 right-4 z-50 cursor-pointer`}
          title='Go to top'
        >
          <ArrowUpIcon className='w-10 h-10 p-2 rounded-sm text-accent-100 bg-accent-300  hover:p-1' />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopBtn;
