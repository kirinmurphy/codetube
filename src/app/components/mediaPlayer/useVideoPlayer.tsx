import { use } from "react";
import { VideoPlayerContext } from "./VideoPlayerProvider";
import { VideoItem, VideoPlayerStateProps } from "./types";

interface UseVideoPlayerStateProps extends VideoPlayerStateProps {
  addVideo: (item: VideoItem) => void;
  addVideoAndPlay: (item: VideoItem) => void;
  removeVideo: (youtubeId: string) => void;
}

export function useVideoPlayer (): UseVideoPlayerStateProps {

  const context = use(VideoPlayerContext);

  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }

  const { 
    videoCollection, 
    activeVideo, 
    lastPlayedVideoId,
    setVideoPlayerState 
  } = context;

  const addVideo = (video: VideoItem) => {
    setVideoPlayerState({ 
      videoCollection: [...videoCollection, video], 
      activeVideo, 
      lastPlayedVideoId
    });
  };

  const addVideoAndPlay = (video: VideoItem) => {    
    const insertIndex = !!activeVideo 
      ? videoCollection.findIndex(v => v.youtubeId === activeVideo.youtubeId)
      : lastPlayedVideoId 
        ? videoCollection.findIndex(v => v.youtubeId === lastPlayedVideoId)
        : -1; 
    
    const nextIndex = insertIndex + 1;
    const updatedVideoCollection = !!insertIndex 
      ? [...videoCollection.slice(0, nextIndex), video, ...videoCollection.slice(nextIndex)]
      : [...videoCollection, video];
  
    setVideoPlayerState({
      videoCollection: updatedVideoCollection,
      activeVideo: video,
      lastPlayedVideoId: activeVideo?.youtubeId || null,
    });
  };

  const removeVideo = (youtubeId: string) => {
    const isActiveVideo = activeVideo?.youtubeId === youtubeId;
    setVideoPlayerState({ 
      videoCollection: videoCollection.filter((item) => item.youtubeId !== youtubeId),
      activeVideo: isActiveVideo ? null : activeVideo,
      lastPlayedVideoId
    });
  };

  return {
    videoCollection,
    activeVideo,
    lastPlayedVideoId,
    addVideo,
    addVideoAndPlay,
    removeVideo
  }
};
