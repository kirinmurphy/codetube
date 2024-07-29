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
import { getUpdatedCollectionWithInsertedVideos } from './getUpdatedCollectionWithInsertVideos';
import { getNewDisplayStateWhenAddingVideo, getNewDisplayStateWhenPlayingVideo } from './getNewDisplayState';

export function getVideoPlayerActions (props: VideoPlayerContextDefault): VideoPlayerActions {

  const { videoPlayerState, setVideoPlayerState, videoPlayerRef } = props;

  const { 
    videoCollection, 
    activeVideo, 
    displayState, 
    autoPlay, 
    screenType,
    youtubeIdRegistry, 
  } = videoPlayerState;

  // == INIT ================ // 
  const onReady = (event: { target: YouTubePlayer }) => {
    videoPlayerRef.current = event.target;
  };


  // == CRUD PLAYLIST ================ //
  const addVideos = (videos: VideoItem[]) => {
    const playlistIsEmpty = videoCollection.length === 0;
    const newVideos = videos.filter(video => !youtubeIdRegistry.has(video.youtubeId));
    const newFullVideoCollection = [...videoCollection, ...newVideos];
      
    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: newFullVideoCollection, 
      activeVideo: playlistIsEmpty ? newVideos[0] : activeVideo,
      displayState: getNewDisplayStateWhenAddingVideo({ displayState }),
      autoPlay: playlistIsEmpty ? false : autoPlay,
      youtubeIdRegistry: getAppendedYoutubeIdRegistry({ youtubeIdRegistry, newVideos }),
    });
  }

  const addAndPlayVideos = (videos: VideoItem[]) => {    
    const newVideos = videos.filter(video => !youtubeIdRegistry.has(video.youtubeId));
    const newFullVideoCollection = getUpdatedCollectionWithInsertedVideos({
      newVideos, videoCollection, activeVideo
    });

    setVideoPlayerState({
      ...videoPlayerState,
      videoCollection: newFullVideoCollection,
      activeVideo: videos[0],
      displayState: getNewDisplayStateWhenPlayingVideo({ displayState, screenType }) || displayState,
      autoPlay: true,
      isPlaying: true,
      youtubeIdRegistry: getAppendedYoutubeIdRegistry({ youtubeIdRegistry, newVideos }),
    });
  }

  const removeVideo = (youtubeId: string) => {
    const nextActiveVideo = getNextActiveVideoOnRemove({ youtubeId, activeVideo, videoCollection });    
    const filteredVideos = videoCollection.filter((item) => item.youtubeId !== youtubeId);
    const filteredYoutubeIdRegistry = new Set([...youtubeIdRegistry].filter(id => id !== youtubeId));
    const newDisplayState = !!filteredVideos.length ? displayState : VideoPlayerDisplayState.Closed;

    setVideoPlayerState({ 
      ...videoPlayerState,
      videoCollection: filteredVideos,
      activeVideo: nextActiveVideo || activeVideo,
      displayState: newDisplayState,
      autoPlay: nextActiveVideo ? false : autoPlay,
      isPlaying: false,
      youtubeIdRegistry: filteredYoutubeIdRegistry
    });
  };
 
  // == PLAYER STATE CHANGES ================ // 
  const setPlayingState = (isPlaying: boolean) => {
    setVideoPlayerState({ ...videoPlayerState, isPlaying });
  };

  const updateDisplayState = (displayState: VideoPlayerDisplayState) => {
    const isClosed = displayState === VideoPlayerDisplayState.Closed;
    if ( isClosed && videoPlayerRef.current ) { videoPlayerRef.current.pauseVideo(); }
    setVideoPlayerState({ ...videoPlayerState, displayState });
  }

  const playNewVideo = ({ video, displayState }: PlayVideoProps) => {
    const newDisplayState = displayState 
      || getNewDisplayStateWhenPlayingVideo({ displayState, screenType }) 
      || videoPlayerState.displayState;

    setVideoPlayerState({
      ...videoPlayerState,
      displayState: newDisplayState,
      activeVideo: video,
      autoPlay: true,
      isPlaying: true,
    });
  };

  const playActiveVideo = () => {
    if ( videoPlayerRef.current ) { 
      const isNotPlaying = videoPlayerRef.current.getPlayerState() !== 1;
      isNotPlaying && videoPlayerRef.current.playVideo();
    }

    const isClosed = displayState === VideoPlayerDisplayState.Closed;
    if ( isClosed ) { 
      const newDisplayState = getNewDisplayStateWhenPlayingVideo({ displayState, screenType });
      if ( newDisplayState ) { updateDisplayState(newDisplayState); }    
    }
  }

  const pauseVideo = () => {
    if ( videoPlayerRef.current ) { 
      const isPlaying = videoPlayerRef.current.getPlayerState() === 1;
      isPlaying && videoPlayerRef.current.pauseVideo();    
    }
  };  

  const getPreviousVideo = () => {
    const activeVideoIndex = videoCollection
      .findIndex((item) => item.youtubeId === activeVideo?.youtubeId);
    return activeVideoIndex > 0 ? videoCollection[activeVideoIndex - 1] : null;
  };

  const playPreviousVideo = () => {
    const previousVideo = getPreviousVideo();
    if (previousVideo) { playNewVideo({ video: previousVideo }); } 
    else { pauseVideo() }
  };

  const getNextVideo = () => {
    const activeVideoIndex = videoCollection
      .findIndex((item) => item.youtubeId === activeVideo?.youtubeId);
    return videoCollection[activeVideoIndex + 1] || null;
  };

  const playNextVideo = () => {
    const nextVideo = getNextVideo();
    if (nextVideo) { playNewVideo({ video: nextVideo }); } 
    else { pauseVideo() }
  };

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
    addVideos,
    addAndPlayVideos,
    removeVideo,
    setPlayingState,
    updateDisplayState,
    playNewVideo,
    playActiveVideo,
    pauseVideo,
    getPreviousVideo,
    playPreviousVideo,
    getNextVideo,
    playNextVideo,
    handlePlayerResize,
  }
}


function getAppendedYoutubeIdRegistry ({ youtubeIdRegistry, newVideos }: {
  youtubeIdRegistry: Set<string>;
  newVideos: VideoItem[];
}): Set<string> {
  return new Set([
    ...youtubeIdRegistry, 
    ...newVideos.map(video => video.youtubeId)
  ]);
}

