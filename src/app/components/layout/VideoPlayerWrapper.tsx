"use client";

import { VideoPlayer } from "../mediaPlayer/VideoPlayer";
import { useVideoPlayer } from "../mediaPlayer/useVideoPlayer";
import { getDynamicLayoutClasses } from "./utils/getDynamicLayoutClasses";

export function VideoPlayerWrapper({ children }: { children: React.ReactNode }) {
  const { isPlayerOpen } = useVideoPlayer();

  const { 
    wrapperClasses,
    videoPlayerClasses, 
    contentContainerClasses, 
  } = getDynamicLayoutClasses({ isPlayerOpen });

  return (
    <div className={wrapperClasses}>
      <div className={videoPlayerClasses}>
        <VideoPlayer />
      </div>
      <div className={contentContainerClasses}>
        {children}
      </div>
    </div>
  );
}
