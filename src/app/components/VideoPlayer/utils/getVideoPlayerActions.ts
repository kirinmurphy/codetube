"use client";

import { YouTubePlayer } from 'react-youtube';
import { 
  VideoPlayerDisplayState, 
  ScreenType, 
  VideoItem, 
  VideoPlayerContextDefault, 
  VideoPlayerActions, 
  PlayVideoProps, 
} from '../types';

import { getDisplayStateOnResize } from './getDisplayStateOnResize';
import { getNextActiveVideoOnRemove } from './getNextActiveVideoOnRemove';
import { getUpdatedCollectionWithInsertedVideo } from './getUpdatedCollectionWithInsertVideo';

export function getVideoPlayerActions (props: VideoPlayerContextDefault): VideoPlayerActions {

  const { videoPlayerState, setVideoPlayerState, videoPlayerRef } = props;

  const { 
    videoCollection, 
    activeVideo, 
    displayState, 
    autoPlay, 
    screenType 
  } = videoPlayerState;

  const getNewDisplayState = () => {
    return displayState !== VideoPlayerDisplayState.Closed ? displayState 
      : screenType === ScreenType.Full ? VideoPlayerDisplayState.SplitScreen 
      : VideoPlayerDisplayState.FullScreen;
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    videoPlayerRef.current = event.target;
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

    setVideoPlayerState({
      ...videoPlayerState,
      videoCollection: newVideoCollection,
      activeVideo: video,
      displayState: getNewDisplayState(),
      autoPlay: true,
      isPlaying: true,
    });
  };
 
  const playVideo = ({ video, displayState }: PlayVideoProps) => {
    setVideoPlayerState({
      ...videoPlayerState,
      displayState: displayState || getNewDisplayState(),
      activeVideo: video,
      autoPlay: true,
      isPlaying: true,
    });
  };

  const pauseVideo = () => {
    if ( videoPlayerRef.current ) { 
      const isPlaying = videoPlayerRef.current.getPlayerState() === 1;
      isPlaying && videoPlayerRef.current.pauseVideo();    
    }
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
    const isClosed = displayState === VideoPlayerDisplayState.Closed;
    if ( isClosed && videoPlayerRef.current ) { videoPlayerRef.current.pauseVideo(); }
    setVideoPlayerState({ ...videoPlayerState, displayState });
  }

  const closePlayer = () => {
    setVideoPlayerState({ 
      ...videoPlayerState, 
      displayState: VideoPlayerDisplayState.Closed 
    });
  }

  const handlePlayerResize = ({ window }: { window: Window }) => {
    const isSmallMobile = window.innerWidth <= 599;
    const isMobile = window.innerWidth <= 900;
    const newScreenType: ScreenType = isSmallMobile ? ScreenType.SmallMobile 
      : isMobile ? ScreenType.Mobile 
      : ScreenType.Full;

    setVideoPlayerState((prevState) => ({
      ...prevState,
      displayState: getDisplayStateOnResize({ prevState, newScreenType }),
      screenType: newScreenType,
    }));
  }
  
  return {
    onReady,
    addVideo,
    addVideoAndPlay,
    updateDisplayState,
    playVideo,
    pauseVideo,
    getPreviousVideo,
    playPreviousVideo,
    getNextVideo,
    playNextVideo,
    removeVideo,
    closePlayer,
    handlePlayerResize,
  }
}
