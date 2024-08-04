"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";

import { VideoPlayerDisplayState } from "./types";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import { VideoPlayerFull } from "./VideoPlayerFull";
import { VideoPlayerMini } from "./VideoPlayerMini";
import { VideoDisplayStateActions } from "./VideoDisplayStateActions";
import { YoutubePlayer } from "../widgets/YoutubePlayer";

export function VideoPlayer () {
  const { 
    activeVideo,
    videoCollection, 
    displayState,
    autoPlay,
    onReady,
    setPlayingState,
    playNextVideo,
  } = useVideoPlayer();

  const currentVideoIdRef = useRef(activeVideo?.youtubeId);

  useEffect(() => {
    currentVideoIdRef.current = activeVideo?.youtubeId;
  }, [activeVideo?.youtubeId]);

  if ( !activeVideo ) return <></>;

  const isMiniPlayer = displayState === VideoPlayerDisplayState.Mini;

  const handleVideoError = () => {
    const errorVideoId = currentVideoIdRef.current;
    setTimeout(() => {
      const isSameVideo = errorVideoId === currentVideoIdRef.current;
      if (isSameVideo) { playNextVideo(); } 
    }, 5000);
  };  

  return (
    <>
      {videoCollection.length > 0 && (
        <div className={clsx('', {
          'w-full p-4 max-w-[1100px] mx-auto': !isMiniPlayer,
          'w-full h-full max-w-[1020px] mx-auto flex items-center gap-4 600mq:p-2 600mq:max-w-[1020px] 600mq:h-auto': isMiniPlayer,
        })}>
          {!isMiniPlayer && (
            <div className="w-full mb-4 flex justify-end">
              <VideoDisplayStateActions />
            </div>  
          )}

          <div className={clsx('', {
            'visible relative w-full': !isMiniPlayer,
            'invisible absolute -left-full': isMiniPlayer,
          })}>
            <YoutubePlayer
              videoId={activeVideo?.youtubeId}
              onEnd={playNextVideo}
              onPlay={() => { setPlayingState(true); }}
              onPause={() => { setPlayingState(false); }}
              onReady={onReady}
              onError={handleVideoError}                  
              opts={{ playerVars: { autoplay: autoPlay ? 1 : 0 }}}
            />
          </div>    

          {!isMiniPlayer && <VideoPlayerFull />}

          {isMiniPlayer && <VideoPlayerMini />}
        </div>
      )}
    </>
  );
}
