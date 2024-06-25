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
    const insertAfterIndex = !!activeVideo 
      ? videoCollection.findIndex(v => v.youtubeId === activeVideo.youtubeId)
      : !!lastPlayedVideoId 
        ? videoCollection.findIndex(v => v.youtubeId === lastPlayedVideoId)
        : -1; 

    // console.log('--------------------------');   
    // console.log('find matcher', videoCollection.findIndex(v => v.youtubeId === activeVideo?.youtubeId));    
    // console.log('insertAfterIndex',insertAfterIndex);
    // console.log('activeVideo',activeVideo?.title);
    // console.log('activeVideoIndex',videoCollection.findIndex(v => v.youtubeId === activeVideo?.youtubeId));
    
    const nextIndex = insertAfterIndex + 1;
    const updatedVideoCollection = !!insertAfterIndex 
      ? [...videoCollection.slice(0, nextIndex), video, ...videoCollection.slice(nextIndex)]
      : [...videoCollection, video];
  
    setVideoPlayerState({
      ...videoPlayerState,
      videoCollection: updatedVideoCollection,
      activeVideo: video,
      lastPlayedVideoId: activeVideo?.youtubeId || null,
      isPlayerOpen: true,
      autoPlay: true,
    });
  };

  const playVideo = (video: VideoItem) => {
    setVideoPlayerState({
      ...videoPlayerState,
      activeVideo: video, 
      lastPlayedVideoId: activeVideo?.youtubeId || null,
      autoPlay: true,
    });
  };

  const removeVideo = (youtubeId: string) => {
    const isActiveVideo = activeVideo?.youtubeId === youtubeId;
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
