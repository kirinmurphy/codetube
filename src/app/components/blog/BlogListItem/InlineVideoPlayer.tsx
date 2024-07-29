"use client";

import { YouTubePlayer } from "react-youtube";
import { YoutubePlayer } from "../../widgets/YoutubePlayer";
import { useVideoPlayerRef } from "../../VideoPlayer/utils/useClearRef";
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { useEffect } from "react";

export function InlineVideoPlayer ({ youtubeId }: { youtubeId: string }) {
  const { isPlaying } = useVideoPlayer();
  const inlineVideoPlayerRef = useVideoPlayerRef();

  const onReady = (event: { target: YouTubePlayer }) => {
    inlineVideoPlayerRef.current = event.target;
  }

  useEffect(() => {
    const shouldPauseVideo = isPlaying && inlineVideoPlayerRef.current;
    if ( shouldPauseVideo ) { inlineVideoPlayerRef.current.pauseVideo(); }
  }, [isPlaying, inlineVideoPlayerRef]);

  const handleVideoError = () => {
    console.error('error');
  }
 
  return (
    <div className="w-full">
      <YoutubePlayer
        videoId={youtubeId}
        onReady={onReady}
        onError={handleVideoError}                  
        opts={{ playerVars: { autoplay: false }}}
      />
    </div>
  );
}
