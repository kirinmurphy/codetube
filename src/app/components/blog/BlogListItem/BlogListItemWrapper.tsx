"use client";

import clsx from "clsx";
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { ScreenType, VideoPlayerDisplayState } from "../../VideoPlayer/types";

interface Props {
  children: React.ReactNode;
  isFeaturedVideo?: boolean;
}

export function BlogListItemWrapper ({ children, isFeaturedVideo }: Props) {
  const { displayState, screenType } = useVideoPlayer();

  const isWideScreen = screenType === ScreenType.Wide;
  const isSplitScreen = displayState === VideoPlayerDisplayState.SplitScreen;
  const showWideView = isFeaturedVideo &&  !isSplitScreen && isWideScreen;

  return (
    <div className={clsx('grid gap-2 items-start', {
      'grid-cols-1': !showWideView,
      'grid-cols-2 gap-6': showWideView,
    })} style={{
      gridTemplateColumns: showWideView ? '2fr 1fr' : '1fr'
    }}>
      {children}
    </div>
  );
}
