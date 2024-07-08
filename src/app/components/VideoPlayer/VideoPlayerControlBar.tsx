import { useVideoPlayer } from "./utils/useVideoPlayer";
import { VideoPlayerNavigationButtons } from './VideoPlayerNavigationButtons';

export function VideoPlayerControlBar ({ children }: { children?: React.ReactNode }) {
  const { 
    videoCollection,
    activeVideo,
  } = useVideoPlayer();

  if ( activeVideo === null ) return <></>;

  const { title, youtubeId } = activeVideo;

  const activeVideoIndex = videoCollection.findIndex(v => v.youtubeId === youtubeId);
  const totalVideos = videoCollection.length;

  return (
    <div className="w-full flex-1 flex items-center gap-2 px-4 h-[60px] bg-black">

      {children}
  
      <div className="flex-1 truncate px-2 text-lg">{title}</div>

      <div>
        {activeVideoIndex+1} / {totalVideos}
      </div>

      <VideoPlayerNavigationButtons />
    </div>
  );
}
