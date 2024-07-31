"use client";

import { MutableRefObject, useEffect } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

interface Props extends YouTubeProps {
  playerRef: MutableRefObject<YouTubePlayer>;
  isPlaying: boolean;
}

export function YoutubePlayer (props: Props) {
  const { playerRef, isPlaying, ...playerProps } = props;

  usePictureInPicture({ playerRef, isPlaying });

  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden">
      <YouTube
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="absolute top-0 left-0 w-full h-full"
        {...playerProps}
      />
    </div>
  );
}

interface UsePictureInPictureProps {
  playerRef: MutableRefObject<YouTubePlayer>;
  isPlaying: boolean;
}

function usePictureInPicture ({ playerRef, isPlaying }: UsePictureInPictureProps) {
  useEffect(() => {
    const enablePiP = () => {
      console.log('enabilin!');

      if (document.pictureInPictureEnabled && playerRef.current && isPlaying) {
        const iframe = playerRef.current.getIframe();
        iframe.requestPictureInPicture().catch((error: Error) => {
          console.error('Failed to enter Picture-in-Picture mode:', error);
        });
      }
    };

    const handleVisibilityChange = () => {
      if ( document.hidden && isPlaying ) { enablePiP(); }
    };
 
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, playerRef]);
}
