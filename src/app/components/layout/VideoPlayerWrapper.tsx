"use client";

import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { useVideoPlayer } from "../VideoPlayer/useVideoPlayer";
import { getDynamicLayoutClasses } from "./utils/getDynamicLayoutClasses";

export function VideoPlayerWrapper({ children }: { children: React.ReactNode }) {
  const { displayState } = useVideoPlayer();

  const { 
    pageWrapperClasses,
    videoPlayerClasses, 
    contentContainerClasses, 
  } = getDynamicLayoutClasses({ displayState });

  return (
    <div className={pageWrapperClasses}>
      <div className={videoPlayerClasses}>
        <VideoPlayer />
      </div>
      <div className={contentContainerClasses}>
        {children}
      </div>
    </div>
  );
}
