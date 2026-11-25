import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import type { ShareIntent } from 'expo-share-intent';

type ReceivedShareContextValue = {
  receivedShare: ShareIntent | null;
  setReceivedShare: (shareIntent: ShareIntent) => void;
  clearReceivedShare: () => void;
};

const ReceivedShareContext = createContext<ReceivedShareContextValue | null>(null);

export function ReceivedShareProvider({ children }: PropsWithChildren) {
  const [receivedShare, setReceivedShareState] = useState<ShareIntent | null>(null);

  const value = useMemo(
    () => ({
      receivedShare,
      setReceivedShare: (shareIntent: ShareIntent) => setReceivedShareState(shareIntent),
      clearReceivedShare: () => setReceivedShareState(null),
    }),
    [receivedShare],
  );

  return (
    <ReceivedShareContext.Provider value={value}>{children}</ReceivedShareContext.Provider>
  );
}

export function useReceivedShare() {
  const context = useContext(ReceivedShareContext);

  if (!context) {
    throw new Error('useReceivedShare must be used inside ReceivedShareProvider');
  }

  return context;
}
