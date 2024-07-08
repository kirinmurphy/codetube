import { MutableRefObject } from "react";

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
  Full = 'full',
  Mobile = 'mobile',
}

export interface VideoPlayerStateProps {
  videoCollection: VideoItem[];
  activeVideo: VideoItem | null;
  displayState: VideoPlayerDisplayState;
  autoPlay: boolean;
  screenType: ScreenType;
  isPlaying: boolean;
}

type SetVideoPlayerState = (state: VideoPlayerStateProps 
  | ((prevState: VideoPlayerStateProps) => VideoPlayerStateProps)) => void;

export interface VideoPlayerContextDefault {
  videoPlayerRef: MutableRefObject<any>;
  videoPlayerState: VideoPlayerStateProps;
  setVideoPlayerState: SetVideoPlayerState;
}

export interface PlayVideoProps {
  video: VideoItem;
  displayState?: VideoPlayerDisplayState;
}

export interface VideoPlayerActions {
  onReady: (event: any) => void;
  addVideo: (item: VideoItem) => void;
  addVideoAndPlay: (item: VideoItem) => void;
  playVideo: ({ video, displayState }: PlayVideoProps) => void;  
  pauseVideo: () => void;
  getPreviousVideo: () => VideoItem | null;
  playPreviousVideo: () => void;
  getNextVideo: () => VideoItem | null;
  playNextVideo: () => void;
  removeVideo: (youtubeId: string) => void;
  closePlayer: () => void;
  updateDisplayState: (displayState: VideoPlayerDisplayState) => void;
  handlePlayerResize: ({ window }: { window: Window }) => void;
}
