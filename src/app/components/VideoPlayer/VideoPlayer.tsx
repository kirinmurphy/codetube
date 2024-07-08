"use client";

import React from "react";
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

  const isMiniPlayer = displayState === VideoPlayerDisplayState.Mini;

  const videoPlayerClasses = isMiniPlayer 
    ? 'w-full p-2 max-w-[1020px] mx-auto flex items-center gap-4' 
    : 'w-full p-4 max-w-[1100px] mx-auto'; 
  
  const videoWrapperClasses = isMiniPlayer 
    ? 'invisible absolute -left-full' : 'visible relative w-full mb-4';

  return (
    <>
      {videoCollection.length > 0 && (
        <div className={videoPlayerClasses}>

          {!isMiniPlayer && (
            <div className="w-full mb-4 flex justify-end">
              <VideoDisplayStateActions />
            </div>  
          )}

          {!!activeVideo && (
            <div className={videoWrapperClasses}>
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <YouTube
                  className="absolute top-0 left-0 w-full h-full"
                  iframeClassName="absolute top-0 left-0 w-full h-full"
                  videoId={activeVideo?.youtubeId}
                  onEnd={playNextVideo}
                  onPlay={() => { playVideo({ video: activeVideo }); }}
                  onPause={pauseVideo}
                  onReady={onReady}
                  onError={(err: any) => {
                    console.log('onError', err);
                  }}                  
                  opts={{
                    playerVars: {
                      autoplay: autoPlay ? 1 : 0,
                      // controls: 0,
                      // showinfo: 0,
                      // rel: 0,
                      // loop: 1,
                    },
                  }}
                />
              </div>
            </div>    
          )}

          {!isMiniPlayer && <VideoPlayerFull />}

          {isMiniPlayer && <VideoPlayerMini />}
        </div>
      )}
    </>
  );
}
