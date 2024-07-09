import { ScreenType, VideoPlayerDisplayState } from "./types";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import { VideoPlayCounter } from "./VideoPlayCounter";
import { VideoPlayerNavigationButtons } from './VideoPlayerNavigationButtons';

interface Props {
  children?: React.ReactNode;
}

export function VideoPlayerControlBar ({ children }: Props) {
  const { 
    activeVideo,
    displayState,
    screenType,
  } = useVideoPlayer();

  if ( activeVideo === null ) return <></>;

  const isMiniPlayer = displayState === VideoPlayerDisplayState.Mini;
  const isSmallMobile = screenType === ScreenType.SmallMobile;
  const isMiniPlayerInSmallMobile = isMiniPlayer && isSmallMobile; 

  const { title } = activeVideo;

  return (
    <div className="w-full h-full bg-black px-6 600mq:h-[60px] flex items-center">

      {isMiniPlayerInSmallMobile && (
        <div className="w-full flex flex-col gap-1 py-5 font-bold">
          <div className="flex flex-1 gap-2 mb-2 items-center">
            <div className="flex-1 truncate px-2 text-lg">{title}</div>
            <VideoPlayCounter />
          </div>

          <div className="flex flex-1 gap-2 justify-between">
            <div className="flex flex-row gap-2">{children}</div>
            <div className="flex flex-row gap-2"><VideoPlayerNavigationButtons /></div>
          </div>        
        </div>
      )}

      {!isMiniPlayerInSmallMobile && (
        <div className="flex flex-1 items-center gap-2 w-full">
          {children}
          <div className="flex-1 truncate px-2 text-lg">{title}</div>
          <VideoPlayCounter />
          <VideoPlayerNavigationButtons />
        </div>      
      )}
    </div>
  );
}
