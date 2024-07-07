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

  const isMiniPlayer = displayState === VideoPlayerDisplayState.Mini;

  return (
    <>
      {videoCollection.length > 0 && (
        <>
          {isMiniPlayer && (
            <VideoPlayerMini />
          )}

          {!isMiniPlayer && (
            <VideoPlayerFull />
          )}
        </>
      )}
    </>
  );
}
