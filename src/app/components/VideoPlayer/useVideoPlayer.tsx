import { use } from "react";
import { VideoItem, VideoPlayerStateProps, VideoPlayerDisplayState, ScreenType } from "./types";
import { VideoPlayerContext } from "./VideoPlayerProvider";
import { getNextActiveVideoOnRemove } from "./utils/getNextActiveVideoOnRemove";
import { getUpdatedCollectionWithInsertedVideo } from "./utils/getUpdatedCollectionWithInsertVideo";

interface UseVideoPlayerStateProps extends VideoPlayerStateProps {
  getPlayerState: () => VideoPlayerStateProps;
  addVideo: (item: VideoItem) => void;
  addVideoAndPlay: (item: VideoItem) => void;
  playVideo: (video: VideoItem) => void;  
  playNextVideo: () => void;
  removeVideo: (youtubeId: string) => void;
  updateDisplayState: (displayState: VideoPlayerDisplayState) => void;
  closePlayer: () => void;
  updatePlayState: ({ isPlaying }: { isPlaying: boolean }) => void;
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
    autoPlay,
    displayState,
    screenType,
  } = videoPlayerState;

  const getPlayerState = () => ({ ...videoPlayerState }); 

  const addVideo = (video: VideoItem) => {
    const isFirstVideo = videoCollection.length === 0;
    const newDisplayState = displayState !== VideoPlayerDisplayState.Closed 
      ? displayState : screenType === ScreenType.Full 
        ? VideoPlayerDisplayState.SplitScreen : VideoPlayerDisplayState.Mini;

    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: [...videoCollection, video], 
      activeVideo: isFirstVideo ? video : activeVideo,
      displayState: newDisplayState,
      autoPlay: videoCollection.length === 0 ? false : autoPlay
    });
  };

  const addVideoAndPlay = (video: VideoItem) => {    
    const newVideoCollection = getUpdatedCollectionWithInsertedVideo({
      video, videoCollection, activeVideo
    });

    const newDisplayState = displayState !== VideoPlayerDisplayState.Closed ? displayState 
      : screenType === ScreenType.Full ? VideoPlayerDisplayState.SplitScreen 
      : VideoPlayerDisplayState.FullScreen;

    setVideoPlayerState({
      ...videoPlayerState,
      videoCollection: newVideoCollection,
      activeVideo: video,
      displayState: newDisplayState,
      autoPlay: true,
      isPlaying: true,
    });
  };

  const playVideo = (video: VideoItem) => {
    setVideoPlayerState({
      ...videoPlayerState,
      activeVideo: video, 
      autoPlay: true,
      isPlaying: true,
    });
  };

  const updatePlayState = ({ isPlaying }: { isPlaying: boolean }) => {
    setVideoPlayerState({ ...videoPlayerState, isPlaying });
  }  

  const playNextVideo = () => {
    const activeVideoIndex = videoCollection
      .findIndex((item) => item.youtubeId === activeVideo?.youtubeId);
    const nextVideo = videoCollection[activeVideoIndex + 1];
    if (nextVideo) { playVideo(nextVideo); } 
    else { updatePlayState({ isPlaying: false }); }
  }
 
  const removeVideo = (youtubeId: string) => {
    const nextActiveVideo = getNextActiveVideoOnRemove({ youtubeId, activeVideo, videoCollection });    
    const filteredVideos = videoCollection.filter((item) => item.youtubeId !== youtubeId);

    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: filteredVideos,
      activeVideo: nextActiveVideo || activeVideo,
      displayState: !!filteredVideos.length ? displayState : VideoPlayerDisplayState.Closed,
      autoPlay: nextActiveVideo ? false : autoPlay
    });
  };

  const updateDisplayState = (displayState: VideoPlayerDisplayState) => {
    setVideoPlayerState({ ...videoPlayerState, displayState });
  }

  const closePlayer = () => {
    setVideoPlayerState({ ...videoPlayerState, displayState: VideoPlayerDisplayState.Closed });
  }

  return {
    ...videoPlayerState,
    getPlayerState,
    addVideo,
    addVideoAndPlay,
    playVideo,
    playNextVideo,
    removeVideo,
    updateDisplayState,
    closePlayer,
    updatePlayState,
  }
};
