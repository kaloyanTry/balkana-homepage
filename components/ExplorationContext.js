'use client';

import { createContext, useContext, useState } from 'react';

const ExplorationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ExplorationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ExplorationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ExplorationContext.Provider>
  );
}

function useExploration() {
  const context = useContext(ExplorationContext);

  if (context === undefined)
    throw new Error('Context was used outside provider');

  return context;
}

export { ExplorationProvider, useExploration };
