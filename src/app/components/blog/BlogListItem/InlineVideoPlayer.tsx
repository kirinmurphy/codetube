"use client";

import { YouTubePlayer } from "react-youtube";
import { YoutubePlayer } from "../../widgets/YoutubePlayer";
import { useVideoPlayerRef } from "../../VideoPlayer/utils/useClearRef";
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { useEffect } from "react";

interface Props {
  youtubeId: string;
}

export function InlineVideoPlayer ({ youtubeId }: Props) {
  const { 
    isPlaying: isGlobalPlayerPlaying,
    pauseVideo: pauseGlobalPlayer, 
  } = useVideoPlayer();

  const inlineVideoPlayerRef = useVideoPlayerRef();

  useEffect(() => {
    const shouldPauseVideo = isGlobalPlayerPlaying && inlineVideoPlayerRef.current;
    if ( shouldPauseVideo ) { inlineVideoPlayerRef.current.pauseVideo(); }
  }, [isGlobalPlayerPlaying, inlineVideoPlayerRef]);

  const onReady = (event: { target: YouTubePlayer }) => {
    inlineVideoPlayerRef.current = event.target;
  }

  const handleOnPlay = () => {
    pauseGlobalPlayer();
  }

  const handleVideoError = () => {
    console.error('error');
  }
 
  return (
    <div className="w-full">
      <YoutubePlayer
        videoId={youtubeId}
        onReady={onReady}
        onPlay={handleOnPlay}
        onError={handleVideoError}                  
        opts={{ playerVars: { autoplay: false }}}
      />
    </div>
  );
}
