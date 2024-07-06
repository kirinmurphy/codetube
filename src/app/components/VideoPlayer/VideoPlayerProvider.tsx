"use client";

import React, { createContext, ReactNode, useLayoutEffect, useState } from 'react';
import { debounce } from '@/lib/debounce';
import { VideoPlayerStateProps, VideoPlayerDisplayState, ScreenType } from './types';
import { getDisplayStateOnResize } from './utils/getDisplayStateOnResize';

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
    autoPlay: false,
    screenType: ScreenType.Mobile,
    isPlaying: false,
  });

  const { displayState } = videoPlayerState;

  useLayoutEffect(() => {
    const handleResize = debounce(() => {
      const newScreenType: ScreenType = window.innerWidth <= 900 
        ? ScreenType.Mobile : ScreenType.Full;
  
      setVideoPlayerState((prevState) => {
        return ({
          ...prevState,
          displayState: getDisplayStateOnResize({ prevState, newScreenType }),
          screenType: newScreenType,
        });
      });
    }, 250);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <VideoPlayerContext.Provider value={{ videoPlayerState, setVideoPlayerState }}>
      <div className={`player-provider-wrapper ${displayState}`}>
        {children}
      </div>
    </VideoPlayerContext.Provider>
  );
};
