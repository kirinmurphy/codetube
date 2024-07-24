"use client";

import clsx from "clsx";
import { VideoPlayerDisplayState } from "../VideoPlayer/types";
import { useVideoPlayer } from "../VideoPlayer/utils/useVideoPlayer";

interface Props {
  children: React.ReactNode;
  tagNavigation: React.ReactNode;
}

export function PostViewWrapper ({ children, tagNavigation }: Props) {
  const { displayState } = useVideoPlayer();

  const isSplitScreen = displayState === VideoPlayerDisplayState.SplitScreen;

  return (
    <div className={clsx('', {
      'flex flex-col 900mq:flex-row gap-4': !isSplitScreen
    })}>
      <div className={clsx('', {
        '900mq:w-[200px]': !isSplitScreen
      })}>
        {tagNavigation}
      </div>
      
      <div className={clsx('', {
        '900mq:w-[calc(100%-200px)]': !isSplitScreen
      })}>
        {children}
      </div>
    </div>
  );
}
