"use client";

import { YouTubePlayer } from "react-youtube";
import { YoutubePlayer } from "../../widgets/YoutubePlayer";
import { useVideoPlayerRef } from "../../VideoPlayer/utils/useClearRef";
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { useEffect, useState } from "react";

interface Props {
  youtubeId: string;
}

interface InlineVideoPlayerState {
  isPlaying: boolean;
}

export function InlineVideoPlayer ({ youtubeId }: Props) {
  const { 
    isPlaying: isGlobalVideoPlayerPlaying,
    pauseVideo: pauseGlobalVideoPlayer, 
  } = useVideoPlayer();

  const inlineVideoPlayerRef = useVideoPlayerRef();

  const [inlinePlayerState, setInlinePlayerState] = useState <InlineVideoPlayerState>({
    isPlaying: false,
  });

  useEffect(() => {
    const shouldPauseVideo = isGlobalVideoPlayerPlaying && inlineVideoPlayerRef.current;
    if ( shouldPauseVideo ) { inlineVideoPlayerRef.current.pauseVideo(); }
  }, [isGlobalVideoPlayerPlaying, inlineVideoPlayerRef]);


  const onReady = (event: { target: YouTubePlayer }) => {
    inlineVideoPlayerRef.current = event.target;
  };

  const handlePlay = () => {
    pauseGlobalVideoPlayer();
    setInlinePlayerState({ isPlaying: true });
  };

  const handlePause = () => {
    setInlinePlayerState({ isPlaying: false }); 
  };

  const handleVideoError = () => {
    console.error('error');
  };

  return (
    <div className="w-full">
      <YoutubePlayer
        videoId={youtubeId}
        onReady={onReady}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleVideoError}                  
        opts={{ playerVars: { autoplay: false }}}
        isPlaying={inlinePlayerState.isPlaying}
        playerRef={inlineVideoPlayerRef} 
      />
    </div>
  );
}
