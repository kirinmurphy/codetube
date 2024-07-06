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
