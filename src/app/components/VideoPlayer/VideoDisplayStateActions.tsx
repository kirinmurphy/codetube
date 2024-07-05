"use client";

import React from "react";
import { useVideoPlayer } from "./useVideoPlayer";
import { FaTimes, FaExpand } from "react-icons/fa";
import { Button } from "../widgets/Button";
import { VideoPlayerDisplayState } from "./types";

export function VideoDisplayStateActions () {
  const { displayState, updateDisplayState } = useVideoPlayer();

  const handleDisplayStateChange = (newDisplayState: VideoPlayerDisplayState) => {
    updateDisplayState(newDisplayState);
  };

  return (
    <div className="flex items-center gap-2">
      
      <Button 
        isDisabled={displayState === VideoPlayerDisplayState.SplitScreen}
        onClick={() => handleDisplayStateChange(VideoPlayerDisplayState.SplitScreen)}>
        <FaExpand /> Split
      </Button>

      <Button 
        isDisabled={displayState === VideoPlayerDisplayState.FullScreen}
        onClick={() => handleDisplayStateChange(VideoPlayerDisplayState.FullScreen)}>
        <FaExpand /> Full
      </Button>

      <Button 
        isDisabled={displayState === VideoPlayerDisplayState.Mini}
        onClick={() => handleDisplayStateChange(VideoPlayerDisplayState.Mini)}>
        <FaExpand /> Mini
      </Button>

      <Button 
        onClick={() => handleDisplayStateChange(VideoPlayerDisplayState.Closed)}>
        <FaTimes /> Close
      </Button>
    </div>
  );
}
