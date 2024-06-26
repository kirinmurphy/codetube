'use client';

import { useVideoPlayer } from '../mediaPlayer/useVideoPlayer';

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
