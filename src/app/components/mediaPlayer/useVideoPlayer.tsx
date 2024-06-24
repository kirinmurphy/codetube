import { use } from "react";
import { VideoPlayerContext } from "./VideoPlayerProvider";
import { VideoItem, VideoPlayerStateProps } from "./types";

interface UseVideoPlayerStateProps extends VideoPlayerStateProps {
  addVideo: (item: VideoItem) => void;
  addVideoAndPlay: (item: VideoItem) => void;
  playVideo: (video: VideoItem) => void;  
  removeVideo: (youtubeId: string) => void;
}

export function useVideoPlayer (): UseVideoPlayerStateProps {

  const context = use(VideoPlayerContext);

  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }

  const { 
    videoPlayerState,
    setVideoPlayerState 
  } = context;

  const { 
    videoCollection, 
    activeVideo, 
    lastPlayedVideoId,
    isPlayerOpen, 
  } = videoPlayerState

  const addVideo = (video: VideoItem) => {
    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: [...videoCollection, video], 
      isPlayerOpen: true
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
      ...videoPlayerState,
      videoCollection: updatedVideoCollection,
      activeVideo: video,
      lastPlayedVideoId: activeVideo?.youtubeId || null,
      isPlayerOpen: true
    });
  };

  const playVideo = (video: VideoItem) => {
    setVideoPlayerState({
      ...videoPlayerState,
      activeVideo: video, 
      lastPlayedVideoId: activeVideo?.youtubeId || null,
    });
  };

  const removeVideo = (youtubeId: string) => {
    const isActiveVideo = activeVideo?.youtubeId === youtubeId;
    const filteredVideos = videoCollection.filter((item) => item.youtubeId !== youtubeId);
    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: videoCollection.filter((item) => item.youtubeId !== youtubeId),
      activeVideo: isActiveVideo ? null : activeVideo,
      isPlayerOpen: !!filteredVideos.length ? isPlayerOpen : false
    });
  };

  return {
    videoCollection,
    activeVideo,
    lastPlayedVideoId,
    isPlayerOpen,
    addVideo,
    addVideoAndPlay,
    playVideo,
    removeVideo
  }
};
