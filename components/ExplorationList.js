'use client';

import { useOptimistic } from 'react';
import ExplorationCard from './ExplorationCard';
import { deleteExploration } from '@/lib/actions';

function ExplorationList({ explorations }) {
  const [optimisticExplorations, optimisticDelete] = useOptimistic(
    explorations,
    (currExplorations, explorationId) => {
      return currExplorations.filter(
        (exploration) => exploration.id !== explorationId
      );
    }
  );

  async function handleDelete(explorationId) {
    optimisticDelete(explorationId);
    await deleteExploration(explorationId);
  }

  return (
    <ul className='space-y-4'>
      {optimisticExplorations.map((exploration) => (
        <ExplorationCard
          exploration={exploration}
          onDelete={handleDelete}
          key={exploration.id}
        />
      ))}
    </ul>
  );
}

export default ExplorationList;
