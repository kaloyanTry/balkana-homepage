'use client';

import { useState } from 'react';

function TextExpander({ children }) {
  const [isExpended, setIsExpended] = useState(false);
  const displaytext = isExpended
    ? children
    : children.split(' ').slice(0, 28).join(' ') + '...';

  return (
    <span>
      {displaytext}{' '}
      <button
        className='text-accent-300 border-b border-accent-300 leading-3 pb-1'
        onClick={() => setIsExpended(!isExpended)}
      >
        {isExpended ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
}

export default TextExpander;
