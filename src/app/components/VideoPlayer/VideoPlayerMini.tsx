import Image from 'next/image';
import { VideoDisplayStateActions } from "./VideoDisplayStateActions";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import { getYoutubeThumbnaillUrl } from './utils/getYoutubeUrls';
import { VideoPlayerControlBar } from './VideoPlayerControlBar';
import { VideoPlayerMiniPlayControls } from './VideoPlayerMiniPlayControls';

export function VideoPlayerMini () {
  const { activeVideo } = useVideoPlayer();

  if ( activeVideo === null ) return <></>;

  const { title, youtubeId } = activeVideo;

  return (
    <>
      <div className="w-[120px] mr-2 border border-gray-600">
        <Image
          className="w-full object-cover" 
          src={getYoutubeThumbnaillUrl(youtubeId)}
          alt={title} 
          width={120} 
          height={60} 
        />
      </div>

      <div className="w-full max-w-[730px] mx-auto">
        <VideoPlayerControlBar>
          <VideoPlayerMiniPlayControls />
        </VideoPlayerControlBar>
      </div>

      <VideoDisplayStateActions />
    </>
  );
}
