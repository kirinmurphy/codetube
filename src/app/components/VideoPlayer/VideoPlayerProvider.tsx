"use client";

import React, { 
  createContext, 
  ReactNode, 
  useState,
  useLayoutEffect, 
} from 'react';

import { debounce } from '@/src/lib/debounce';

import { 
  VideoPlayerStateProps, 
  VideoPlayerDisplayState, 
  ScreenType, 
  VideoPlayerContextDefault, 
  VideoPlayerActions 
} from './types';

import { getVideoPlayerActions } from './utils/getVideoPlayerActions';
import { useVideoPlayerRef } from './utils/useClearRef';

interface VideoPlayerContextProps extends VideoPlayerContextDefault {
  playerActions: VideoPlayerActions;
}

export const VideoPlayerContext = createContext<VideoPlayerContextProps | undefined>(undefined);

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

  const videoPlayerRef = useVideoPlayerRef();

  const playerActions = getVideoPlayerActions({ 
    videoPlayerRef, videoPlayerState, setVideoPlayerState 
  });

  useLayoutEffect(() => {
    const onResize = () => { playerActions.handlePlayerResize({ window }) };
    const handleResize = debounce(onResize, 250);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextProps = {
    videoPlayerRef,
    videoPlayerState,
    playerActions,
    setVideoPlayerState,
  };

  return (
    <VideoPlayerContext.Provider value={contextProps}>
      <div className={videoPlayerState.displayState}>
        {children}
      </div>
    </VideoPlayerContext.Provider>
  );
};
