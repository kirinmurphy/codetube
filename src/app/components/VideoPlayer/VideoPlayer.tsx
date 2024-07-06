"use client";

import React from "react";
import { VideoPlayerDisplayState } from "./types";
import { useVideoPlayer } from "./useVideoPlayer";
import { VideoPlayerFull } from "./VideoPlayerFull";
import { VideoPlayerMini } from "./VideoPlayerMini";

export function VideoPlayer () {
  const { 
    videoCollection, 
    displayState,
  } = useVideoPlayer();

  return (
    <>
      {videoCollection.length > 0 && (
        <>
          {displayState === VideoPlayerDisplayState.Mini && (
            <VideoPlayerMini />
          )}

          {displayState !== VideoPlayerDisplayState.Mini && (
            <VideoPlayerFull />
          )}
        </>
      )}
    </>
  );
}
