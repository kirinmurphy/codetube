"use client";

import React, { createContext, ReactNode, useState } from 'react';
import { VideoPlayerStateProps, VideoPlayerDisplayState } from './types';

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
    displayState: VideoPlayerDisplayState.Closed,
    autoPlay: false
  });

  const { displayState } = videoPlayerState;

  return (
    <VideoPlayerContext.Provider value={{ videoPlayerState, setVideoPlayerState }}>
      <div className={`player-provider-wrapper ${displayState}`}>
        {children}
      </div>
    </VideoPlayerContext.Provider>
  );
};
