"use client";

import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

import { VideoPlayerDisplayState } from "./types";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import { VideoPlayerFull } from "./VideoPlayerFull";
import { VideoPlayerMini } from "./VideoPlayerMini";
import { VideoDisplayStateActions } from "./VideoDisplayStateActions";

export function VideoPlayer () {
  const { 
    activeVideo,
    videoCollection, 
    displayState,
    autoPlay,
    onReady,
    playNextVideo,
    playVideo,
    pauseVideo,
  } = useVideoPlayer();

  const currentVideoIdRef = useRef(activeVideo?.youtubeId);

  useEffect(() => {
    currentVideoIdRef.current = activeVideo?.youtubeId;
  }, [activeVideo?.youtubeId]);

  if ( !activeVideo ) return <></>;

  const isMiniPlayer = displayState === VideoPlayerDisplayState.Mini;

  const videoPlayerClasses = isMiniPlayer 
    ? 'w-full h-full max-w-[1020px] mx-auto flex items-center gap-4 600mq:p-2 600mq:max-w-[1020px] 600mq:h-auto'
    : 'w-full p-4 max-w-[1100px] mx-auto'; 
  
  const videoIframeWrapperClasses = isMiniPlayer 
    ? 'invisible absolute -left-full' : 'visible relative w-full';

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
        <div className={videoPlayerClasses}>
          {!isMiniPlayer && (
            <div className="w-full mb-4 flex justify-end">
              <VideoDisplayStateActions />
            </div>  
          )}

          <div className={videoIframeWrapperClasses}>
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <YouTube
                className="absolute top-0 left-0 w-full h-full"
                iframeClassName="absolute top-0 left-0 w-full h-full"
                videoId={activeVideo?.youtubeId}
                onEnd={playNextVideo}
                onPlay={() => { playVideo({ video: activeVideo }); }}
                onPause={pauseVideo}
                onReady={onReady}
                onError={handleVideoError}                  
                opts={{
                  playerVars: {
                    autoplay: autoPlay ? 1 : 0,
                  },
                }}
              />
            </div>
          </div>    

          {!isMiniPlayer && <VideoPlayerFull />}

          {isMiniPlayer && <VideoPlayerMini />}
        </div>
      )}
    </>
  );
}
