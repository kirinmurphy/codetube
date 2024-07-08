import { MutableRefObject, use } from "react";
import { VideoPlayerActions, VideoPlayerStateProps } from "../types";
import { VideoPlayerContext } from "../VideoPlayerProvider";

interface ReturnProps extends VideoPlayerStateProps, VideoPlayerActions {
  videoPlayerRef: MutableRefObject<any>;
}

export function useVideoPlayer (): ReturnProps {

  const context = use(VideoPlayerContext);

  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }

  const { 
    videoPlayerState,
    videoPlayerRef,
    playerActions,
  } = context;

  // TODO: should we keep these containers for the return? 
  return {
    ...videoPlayerState,
    videoPlayerRef,
    ...playerActions
  }
};
