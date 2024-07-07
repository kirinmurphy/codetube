"use client";

import React, { createContext, MutableRefObject, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { debounce } from '@/lib/debounce';
import { VideoPlayerStateProps, VideoPlayerDisplayState, ScreenType } from './types';
import { getDisplayStateOnResize } from './utils/getDisplayStateOnResize';

interface VideoPlayerContextType {
  videoPlayerRef: MutableRefObject<any>;
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

  const videoPlayerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      videoPlayerRef.current = null;
    };
  }, []);

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

  const contextProps = {
    videoPlayerRef,
    videoPlayerState,
    setVideoPlayerState,
  }


  return (
    <VideoPlayerContext.Provider value={contextProps}>
      <div className={`player-provider-wrapper ${displayState}`}>
        {children}
      </div>
    </VideoPlayerContext.Provider>
  );
};
