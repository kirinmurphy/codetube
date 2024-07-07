import Image from 'next/image';
import { Button } from "../widgets/Button";
import { VideoDisplayStateActions } from "./VideoDisplayStateActions";
import { useVideoPlayer } from "./useVideoPlayer";
import { getYoutubeThumbnaillUrl } from './utils/getYoutubeUrls';
import { VideoPlayerDisplayState } from './types';

export function VideoPlayerMini () {

  const { 
    activeVideo,
    isPlaying,
    playVideo,
    getPreviousVideo,
    playPreviousVideo,
    getNextVideo,
    playNextVideo,
    pauseVideo,
  } = useVideoPlayer();

  if ( activeVideo === null ) return <></>;

  const previousVideo = getPreviousVideo();
  const nextVideo = getNextVideo();

  const { title, youtubeId } = activeVideo;

  const handleListen = () => {
    playVideo({ video: activeVideo });
  };

  const handlePause = () => {
    pauseVideo();
  };

  const handleWatch = () => {
    playVideo({ 
      video: activeVideo,
      displayState: VideoPlayerDisplayState.FullScreen,
    });
  };

  const handleGoToPrevious = () => {
    playPreviousVideo();
  };

  const handleGoToNext = () => {
    playNextVideo();
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

        {isPlaying && <Button onClick={handlePause}>Pause</Button>}

        <Button onClick={handleWatch}>Watch</Button>

        <div className="flex-1 truncate px-2 text-lg">{title}</div>

        <Button 
          isDisabled={previousVideo === null}
          onClick={handleGoToPrevious}>Previous</Button>

        <Button
          isDisabled={nextVideo === null} 
          onClick={handleGoToNext}>Next</Button>
      </div>

      <div>
        <VideoDisplayStateActions />
      </div>  
    </>
  );
}
