"use client";

import React from "react";
import { useVideoPlayer } from "./useVideoPlayer";

import { FaTimes, FaArrowDown, FaArrowUp, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Button } from "../widgets/Button";
import { ScreenType, VideoPlayerDisplayState } from "./types";

export function VideoDisplayStateActions () {
  const { 
    displayState: currentDisplayState,
    screenType, 
    updateDisplayState 
  } = useVideoPlayer();

  const handleDisplayStateChange = (newDisplayState: VideoPlayerDisplayState) => {
    updateDisplayState(newDisplayState);
  };

  const FullScreenIcon = currentDisplayState === VideoPlayerDisplayState.SplitScreen 
    ? FaArrowRight : FaArrowUp;

  const viewStateTriggers = [
    { displayState: VideoPlayerDisplayState.SplitScreen, Icon: FaArrowLeft },
    { displayState: VideoPlayerDisplayState.FullScreen, Icon: FullScreenIcon },
    { displayState: VideoPlayerDisplayState.Mini, Icon: FaArrowDown },
    { displayState: VideoPlayerDisplayState.Closed, Icon: FaTimes },
  ];

  return (
    <div className="flex items-center gap-2">
      {viewStateTriggers.map(({ displayState, Icon }) => {
        const isNotCurrentDisplayState = displayState !== currentDisplayState;
        const hideNonMobileTrigger = screenType === ScreenType.Mobile && displayState === VideoPlayerDisplayState.SplitScreen;
        const showButton = isNotCurrentDisplayState && !hideNonMobileTrigger; 

        return (
          <React.Fragment key={displayState}>
            {showButton && (
              <Button onClick={() => handleDisplayStateChange(displayState)}>
                <Icon />
              </Button>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
