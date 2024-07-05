"use client";

import React, { createContext, ReactNode, useState } from 'react';
import { VideoPlayerStateProps } from './types';

interface VideoPlayerContextType {
  videoPlayerState: VideoPlayerStateProps;
  setVideoPlayerState: (state: VideoPlayerStateProps) => void;
}

export const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function VideoPlayerProvider ({ children }: Props) {

  const [videoPlayerState, setVideoPlayerState] = useState<VideoPlayerStateProps>({
    videoCollection: [], 
    activeVideo: null, 
    isPlayerOpen: false,
    autoPlay: false
  });

  const { isPlayerOpen } = videoPlayerState;


  return (
    <VideoPlayerContext.Provider value={{ videoPlayerState, setVideoPlayerState }}>
      <div className={isPlayerOpen ? 'player-open' : 'player-closed'}>
        {children}
      </div>
    </VideoPlayerContext.Provider>
  );
};
