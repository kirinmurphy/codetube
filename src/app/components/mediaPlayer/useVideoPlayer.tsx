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
    isPlayerOpen, 
    autoPlay,
  } = videoPlayerState

  console.log('--------------------------');
  console.log('activeVideo',activeVideo?.title);

  const addVideo = (video: VideoItem) => {
    const isFirstVideo = videoCollection.length === 0;
    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: [...videoCollection, video], 
      activeVideo: isFirstVideo ? video : activeVideo,
      isPlayerOpen: true,
      autoPlay: videoCollection.length === 0 ? false : autoPlay
    });
  };

  const addVideoAndPlay = (video: VideoItem) => {    
    const currentActiveIndex = activeVideo &&  
      videoCollection.findIndex(v => v.youtubeId === activeVideo.youtubeId);

    console.log('--------------------------------------');
    console.log('currentActiveIndex',currentActiveIndex);
      
    const insertIndex = !!currentActiveIndex ? (currentActiveIndex + 1) : 0;
    const updatedVideoCollection = !!insertIndex 
      ? [...videoCollection.slice(0, insertIndex), video, ...videoCollection.slice(insertIndex)]
      : [...videoCollection, video];
  
    setVideoPlayerState({
      ...videoPlayerState,
      videoCollection: updatedVideoCollection,
      activeVideo: video,
      isPlayerOpen: true,
      autoPlay: true,
    });
  };

  const playVideo = (video: VideoItem) => {
    setVideoPlayerState({
      ...videoPlayerState,
      activeVideo: video, 
      autoPlay: true,
    });
  };

  const removeVideo = (youtubeId: string) => {
    const isActiveVideo = activeVideo?.youtubeId === youtubeId;
    console.log('----- REMOVE VIDEO -------------------');
    console.log('isActiveVideo', isActiveVideo);

    const activeVideoIndex = videoCollection.findIndex(v => v.youtubeId === youtubeId);

    const nextActiveVideo = isActiveVideo 
      && videoCollection[activeVideoIndex + 1] 
      || videoCollection[activeVideoIndex - 1] || null;
      
    const filteredVideos = videoCollection.filter((item) => item.youtubeId !== youtubeId);

    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: filteredVideos,
      activeVideo: nextActiveVideo || activeVideo,
      isPlayerOpen: !!filteredVideos.length ? isPlayerOpen : false,
      autoPlay: nextActiveVideo ? false : autoPlay
    });
  };

  return {
    ...videoPlayerState,
    addVideo,
    addVideoAndPlay,
    playVideo,
    removeVideo
  }
};
