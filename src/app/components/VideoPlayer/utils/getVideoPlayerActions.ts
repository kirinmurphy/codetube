"use client";

import { 
  VideoPlayerDisplayState, 
  ScreenType, 
  VideoItem, 
  VideoPlayerContextDefault, 
  VideoPlayerActions, 
  PlayVideoProps 
} from '../types';

import { getNextActiveVideoOnRemove } from './getNextActiveVideoOnRemove';
import { getUpdatedCollectionWithInsertedVideo } from './getUpdatedCollectionWithInsertVideo';

export function getVideoPlayerActions (props: VideoPlayerContextDefault): VideoPlayerActions {
  const { videoPlayerState, setVideoPlayerState, videoPlayerRef } = props;
  const { videoCollection, activeVideo, displayState, autoPlay, screenType } = videoPlayerState;

  const onReady = (event: any) => {
    videoPlayerRef.current = event.target;
    console.log('!!!! videoPlayerRef', videoPlayerRef);
  };

  const addVideo = (video: VideoItem) => {
    const isFirstVideo = videoCollection.length === 0;
    const newDisplayState = displayState !== VideoPlayerDisplayState.Closed 
      ? displayState : VideoPlayerDisplayState.Mini;
 
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
 
  const playVideo = ({ video, displayState }: PlayVideoProps) => {
    setVideoPlayerState({
      ...videoPlayerState,
      ...(displayState ? { displayState } : {}),
      activeVideo: video || activeVideo,
      autoPlay: true,
      isPlaying: true,
    });
  };

  const pauseVideo = () => {
    if (videoPlayerRef.current) { videoPlayerRef.current.pauseVideo(); }
    setVideoPlayerState({ ...videoPlayerState, isPlaying: false });
  };  

  const getPreviousVideo = () => {
    const activeVideoIndex = videoCollection
      .findIndex((item) => item.youtubeId === activeVideo?.youtubeId);
    return activeVideoIndex > 0 ? videoCollection[activeVideoIndex - 1] : null;
  }

  const playPreviousVideo = () => {
    const nextVideo = getPreviousVideo();
    if (nextVideo) { playVideo({ video: nextVideo }); } 
    else { pauseVideo() }
  }

  const getNextVideo = () => {
    const activeVideoIndex = videoCollection
      .findIndex((item) => item.youtubeId === activeVideo?.youtubeId);
    return videoCollection[activeVideoIndex + 1] || null;
  }

  const playNextVideo = () => {
    const nextVideo = getNextVideo();
    if (nextVideo) { playVideo({ video: nextVideo }); } 
    else { pauseVideo() }
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
    onReady,
    addVideo,
    addVideoAndPlay,
    removeVideo,
    closePlayer,
    updateDisplayState,
    playVideo,
    pauseVideo,
    getPreviousVideo,
    playPreviousVideo,
    getNextVideo,
    playNextVideo,
  }
}