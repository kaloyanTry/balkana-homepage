'use client';

import ExplorationCard from './ExplorationCard';

function ExplorationList({ explorations }) {
  return (
    <ul className='space-y-4'>
      {explorations.map((exploration) => (
        <ExplorationCard exploration={exploration} key={exploration.id} />
      ))}
    </ul>
  );
}

export default ExplorationList;
