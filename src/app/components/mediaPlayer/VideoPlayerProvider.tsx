"use client";

import React, { createContext, ReactNode, useState } from 'react';
import { VideoPlayerStateProps } from './types';

interface VideoPlayerContextType extends VideoPlayerStateProps {
  setVideoPlayerState: (state: VideoPlayerStateProps) => void;
}

export const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function VideoPlayerProvider ({ children }: Props) {

  const [videoPlayerState, setVideoPlayerState] = useState<VideoPlayerStateProps>({
    videoCollection: [], activeVideo: null, lastPlayedVideoId: null
  });


  return (
    <VideoPlayerContext.Provider value={{ ...videoPlayerState, setVideoPlayerState }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
