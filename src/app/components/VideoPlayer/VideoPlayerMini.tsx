import Image from 'next/image';
import { Button } from "../widgets/Button";
import { VideoDisplayStateActions } from "./VideoDisplayStateActions";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import { getYoutubeThumbnaillUrl } from './utils/getYoutubeUrls';
import { VideoPlayerDisplayState } from './types';
import { VideoPlayerNavigationButtons } from './VideoPlayerNavigationButtons';
import { FaPause } from 'react-icons/fa';

export function VideoPlayerMini () {
  const { 
    activeVideo,
    isPlaying,
    videoPlayerRef,
    playVideo,
    pauseVideo,
  } = useVideoPlayer();

  if ( activeVideo === null ) return <></>;

  const { title, youtubeId } = activeVideo;

  const handleListen = () => {
    if ( videoPlayerRef.current ) { videoPlayerRef.current.playVideo(); }
    playVideo({ video: activeVideo });
  };

  const handlePause = () => {
    pauseVideo();
  };

  const handleWatch = () => {
    if ( videoPlayerRef.current ) { videoPlayerRef.current.playVideo(); }
    playVideo({ 
      video: activeVideo,
      displayState: VideoPlayerDisplayState.FullScreen,
    });
  };

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

      <div className="flex-1 flex items-center gap-2 max-w-[730px] mx-auto px-4 h-[60px] bg-black">

        {!isPlaying && <Button onClick={handleListen}>Listen</Button>}

        {isPlaying && (
          <Button onClick={handlePause}><FaPause className="text-2xl" /></Button>
        )}

        <Button onClick={handleWatch}>Watch</Button>

        <div className="flex-1 truncate px-2 text-lg">{title}</div>

        <VideoPlayerNavigationButtons />
      </div>

      <VideoDisplayStateActions />
    </>
  );
}
