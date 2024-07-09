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
      <div className="hidden 900mq:block w-[100px] mr-2 border border-gray-600">
        <Image
          className="w-full object-cover min-w-[100px]" 
          src={getYoutubeThumbnaillUrl(youtubeId)}
          alt={title} 
          width={100} 
          height={50} 
        />
      </div>

      <div className="w-full h-full max-w-[730px] mx-auto 600mq:h-auto">
        <VideoPlayerControlBar>
          <VideoPlayerMiniPlayControls />
        </VideoPlayerControlBar>
      </div>

      <div className="hidden 900mq:block">
        <VideoDisplayStateActions />
      </div>
    </>
  );
}
