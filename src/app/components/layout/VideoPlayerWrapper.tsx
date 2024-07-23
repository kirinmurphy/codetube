"use client";

import clsx from "clsx";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { useVideoPlayer } from "../VideoPlayer/utils/useVideoPlayer";
import { VideoPlayerDisplayState } from "../VideoPlayer/types";

export function VideoPlayerWrapper({ children }: { children: React.ReactNode }) {
  const { displayState } = useVideoPlayer();

  const isClosed = displayState === VideoPlayerDisplayState.Closed;
  const isSplitScreen = displayState === VideoPlayerDisplayState.SplitScreen;
  const isFullScreen = displayState === VideoPlayerDisplayState.FullScreen;
  const isMini = displayState === VideoPlayerDisplayState.Mini;

  return (
    <div className={clsx('w-full', {
      '900mq:flex 900mq:h-screen': isSplitScreen
    })}>
      <div className={clsx(
        'fixed left-0 bottom-0 z-10 transition-all duration-200 ease-in-out bg-gray-900', {
          'invisible w-0 h-0': isClosed,
          'h-full w-[calc(100%-400px)] 1250mq:w-[calc(100%-550px)]': isSplitScreen,
          'w-full h-full': isFullScreen,
          'w-full h-[120px] 600mq:h-[75px]': isMini,
        }
      )}>
        <VideoPlayer />
      </div>
      
      <div className={clsx(`
        fixed bottom-0 right-0 z-0 w-full h-full 
        overflow-y-scroll transition-all duration-200 ease-in-out`, {
          '900mq:w-[400px] 900mq:translate-x-0 1250mq:w-[550px] 1250mq:px-2': isSplitScreen,
          'pb-[120px] 600mq:pb-[75px]': isMini,
        }
      )}>
        {children}
      </div>
    </div>
  );
}
