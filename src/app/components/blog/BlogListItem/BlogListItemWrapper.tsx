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
    <div className={clsx('grid items-start', {
      'grid-cols-1 gap-2 justify-start items-start': !showWideView,
      'grid-cols-2 gap-x-6': showWideView,
    })} style={{
      gridTemplateColumns: showWideView ? '2fr 1fr' : '1fr',
      gridTemplateRows: 'auto 1fr'
    }}>
      {children}
    </div>
  );
}
