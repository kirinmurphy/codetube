import { useEffect, useRef } from 'react';
import { YouTubePlayer } from 'react-youtube';

export function useVideoPlayerRef () {
  const playerRef = useRef<YouTubePlayer>(null);

  useEffect(() => {
    const refValue = playerRef.current;
    return () => {
      if (refValue && 'destroy' in refValue) {
        refValue.destroy();
      }
    };
  }, [playerRef]);

  return playerRef;
}
