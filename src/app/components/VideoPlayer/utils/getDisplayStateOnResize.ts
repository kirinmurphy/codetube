import { VideoPlayerStateProps, ScreenType, VideoPlayerDisplayState } from "../types";

interface Props {
  prevState: VideoPlayerStateProps;
  newScreenType: ScreenType;
}

export function getDisplayStateOnResize(props: Props): VideoPlayerDisplayState {
  const { prevState, newScreenType } = props;

  const screenTypeChanged = prevState.screenType !== newScreenType;

  const screenTypeExpanded = screenTypeChanged && newScreenType === ScreenType.Full;
  const screenTypeShrunk = screenTypeChanged 
    && prevState.screenType === ScreenType.Full && newScreenType === ScreenType.Mobile;

  const expandedInFullScreen = screenTypeExpanded 
    && prevState.displayState === VideoPlayerDisplayState.FullScreen;

  const shrunkInSplitScreen = screenTypeShrunk 
    && prevState.displayState === VideoPlayerDisplayState.SplitScreen;
  const shrunkInSplitScreenWhilePlaying = shrunkInSplitScreen && prevState.isPlaying;
  const shrunkInSplitScreenWhilePaused = shrunkInSplitScreen && !prevState.isPlaying;

  return expandedInFullScreen ? VideoPlayerDisplayState.SplitScreen
    : shrunkInSplitScreenWhilePlaying ? VideoPlayerDisplayState.FullScreen
    : shrunkInSplitScreenWhilePaused ? VideoPlayerDisplayState.Mini
    : prevState.displayState;
}
