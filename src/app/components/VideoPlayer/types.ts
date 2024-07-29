import { MutableRefObject } from "react";
import { YouTubeEvent, YouTubePlayer } from "react-youtube";

export interface VideoItem {
  youtubeId: string;
  title: string;
  played: boolean;
}

export enum VideoPlayerDisplayState {
  Closed = 'closed',
  SplitScreen = 'split-screen',
  FullScreen = 'full-screen',
  Mini = 'mini',
};

export enum ScreenType {
  Wide = 'wide',
  Mobile = 'mobile',
  SmallMobile = 'small-mobile',
}

export interface VideoPlayerStateProps {
  videoCollection: VideoItem[];
  activeVideo: VideoItem | null;
  displayState: VideoPlayerDisplayState;
  autoPlay: boolean;
  screenType: ScreenType;
  isPlaying: boolean;
  youtubeIdRegistry: Set<string>; 
}

type SetVideoPlayerState = (state: VideoPlayerStateProps 
  | ((prevState: VideoPlayerStateProps) => VideoPlayerStateProps)) => void;

export interface VideoPlayerContextDefault {
  videoPlayerRef: MutableRefObject<YouTubePlayer>;
  videoPlayerState: VideoPlayerStateProps;
  setVideoPlayerState: SetVideoPlayerState;
}

export interface PlayVideoProps {
  video: VideoItem;
  displayState?: VideoPlayerDisplayState;
}

export interface VideoPlayerActions {
  onReady: (event: YouTubeEvent<Event>) => void;
  setPlayingState: (isPlaying: boolean) => void;
  addVideos: (videos: VideoItem[]) => void;
  addAndPlayVideos: (videos: VideoItem[]) => void;
  playNewVideo: ({ video, displayState }: PlayVideoProps) => void;  
  playActiveVideo: () => void;
  pauseVideo: () => void;
  getPreviousVideo: () => VideoItem | null;
  playPreviousVideo: () => void;
  getNextVideo: () => VideoItem | null;
  playNextVideo: () => void;
  removeVideo: (youtubeId: string) => void;
  updateDisplayState: (displayState: VideoPlayerDisplayState) => void;
  handlePlayerResize: ({ window }: { window: Window }) => void;
}
