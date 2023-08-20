'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

const LayoutContext = createContext({
  program: {} as { id: string; name: string },
  setProgram: (e: { id: string; name: string }) => {},
  plan: {} as { id: string; name: string },
  setPlan: (e: { id: string; name: string }) => {},
});

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const [program, setProgram] = useState<{ id: string; name: string }>({} as { id: string; name: string });
  const [plan, setPlan] = useState<{ id: string; name: string }>({} as { id: string; name: string });

  return <LayoutContext.Provider value={{ program, setProgram, plan, setPlan }}>{children}</LayoutContext.Provider>;
}

export const useLayoutContext = () => useContext(LayoutContext);
