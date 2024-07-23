"use client"

import clsx from "clsx";
import { VideoPlayerDisplayState } from "../VideoPlayer/types";
import { useVideoPlayer } from "../VideoPlayer/utils/useVideoPlayer";

interface Props {
  children: React.ReactNode;
}

export function PostCollectionWrapper ({ children }: Props) {
  const { displayState } = useVideoPlayer();

  const isSplitScreen = displayState === VideoPlayerDisplayState.SplitScreen;

  return (
    <div className={clsx('grid grid-cols-1 gap-4', {
      '450mq:grid-cols-2 800mq:grid-cols-4': !isSplitScreen,
      '800mq:grid-cols-2': isSplitScreen,
    })}>
      {children}
    </div>
  );
}
