import React, { createContext, ReactNode, use, useState } from 'react';

interface VideoItem {
  youtubeId: string;
  played: boolean;
  active: boolean;
}

interface GlobalStateContextType {
  collection: VideoItem[];
  addItem: (item: VideoItem) => void;
  updateItemState: (youtubeId: string, newState: Partial<VideoItem>) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [collection, setCollection] = useState<VideoItem[]>([]);

  const addItem = (item: VideoItem) => {
    setCollection((prev) => [...prev, item]);
  };

  const updateItemState = (youtubeId: string, newState: Partial<VideoItem>) => {
    setCollection((prev) =>
      prev.map((item) => (item.youtubeId === youtubeId ? { ...item, ...newState } : item))
    );
  };

  return (
    <GlobalStateContext.Provider value={{ collection, addItem, updateItemState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextType => {
  const context = use(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
