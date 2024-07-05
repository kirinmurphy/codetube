'use client';

import { useVideoPlayer } from '../VideoPlayer/useVideoPlayer';

interface Props {
  children: React.ReactNode;
}

export function BlogListItemWrapper({ children }: Props) {
  const { isPlayerOpen } = useVideoPlayer();

  return (
    <div className={isPlayerOpen ? 'player-open' : 'player-closed'}>
      {children}
    </div>
  );
}
