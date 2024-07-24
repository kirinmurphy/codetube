import { MutableRefObject, use } from "react";
import { VideoPlayerActions, VideoPlayerStateProps } from "../types";
import { VideoPlayerContext } from "../VideoPlayerProvider";
import { YouTubePlayer } from "react-youtube";

interface ReturnProps extends VideoPlayerStateProps, VideoPlayerActions {
  videoPlayerRef: MutableRefObject<YouTubePlayer>;
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
    ...JSON.parse(JSON.stringify(videoPlayerState)), 
    videoPlayerRef,
    ...playerActions
  }
};
