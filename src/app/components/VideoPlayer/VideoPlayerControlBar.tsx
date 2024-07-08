import { ScreenType, VideoPlayerDisplayState } from "./types";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import { VideoPlayerNavigationButtons } from './VideoPlayerNavigationButtons';

export function VideoPlayerControlBar ({ children }: { children?: React.ReactNode }) {
  const { 
    videoCollection,
    activeVideo,
    displayState,
    screenType,
  } = useVideoPlayer();

  if ( activeVideo === null ) return <></>;

  const isMiniPlayer = displayState === VideoPlayerDisplayState.Mini;
  const isSmallMobile = screenType === ScreenType.SmallMobile;
  const isMiniPlayerInSmallMobile = isMiniPlayer && isSmallMobile; 

  const { title, youtubeId } = activeVideo;


  return (
    <div className="w-full h-full px-4 bg-black 500mq:h-[60px] flex items-center">

      {isMiniPlayerInSmallMobile && (
        <div className="w-full flex flex-col gap-1 p-3">
          <div className="flex flex-1 gap-2 mb-1 items-center">
            <div className="flex-1 truncate px-2 text-lg">{title}</div>
            <PlayCounter />
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
          <PlayCounter />
          <VideoPlayerNavigationButtons />
        </div>      
      )}
    </div>
  );
}

function PlayCounter () {
  const { videoCollection, activeVideo } = useVideoPlayer();
  const { youtubeId } = activeVideo || {};
  const activeVideoIndex = videoCollection.findIndex(v => v.youtubeId === youtubeId);
  const totalVideos = videoCollection.length;

  return (
    <div>
      {activeVideoIndex+1} / {totalVideos}
    </div>
  );  
}
