import { ScreenType, VideoPlayerDisplayState } from "../types";

export function getNewDisplayStateWhenAddingVideo ({ displayState }: { 
  displayState: VideoPlayerDisplayState 
}) {
  return displayState !== VideoPlayerDisplayState.Closed 
    ? displayState : VideoPlayerDisplayState.Mini;
};

export function getNewDisplayStateWhenPlayingVideo ({ displayState, screenType }: {
  displayState?: VideoPlayerDisplayState;
  screenType: ScreenType;
}) {
  return displayState !== VideoPlayerDisplayState.Closed ? displayState 
    : screenType === ScreenType.Wide ? VideoPlayerDisplayState.SplitScreen 
    : VideoPlayerDisplayState.FullScreen;
};
