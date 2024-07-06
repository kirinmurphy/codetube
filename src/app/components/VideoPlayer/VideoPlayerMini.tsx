import Image from 'next/image';
import { Button } from "../widgets/Button";
import { VideoDisplayStateActions } from "./VideoDisplayStateActions";
import { useVideoPlayer } from "./useVideoPlayer";
import { getYoutubeThumbnaillUrl } from './utils/getYoutubeUrls';
import { VideoPlayerDisplayState } from './types';

export function VideoPlayerMini () {

  const { 
    activeVideo,
    playVideo,
    getPreviousVideo,
    playPreviousVideo,
    getNextVideo,
    playNextVideo,
  } = useVideoPlayer();

  if ( activeVideo === null ) return <></>;

  const previousVideo = getPreviousVideo();
  const nextVideo = getNextVideo();

  const { title, youtubeId } = activeVideo;

  const handleListen = () => {
    console.log('listen');
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
      <div className="w-full p-2 max-w-[1020px] mx-auto flex items-center gap-4">
        {/* <div className="w-[80px] relative pb-[36.25%] h-0 overflow-hidden border border-gray-600"> */}

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

          <Button onClick={handleListen}>Listen</Button>

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

      </div>
    </>
  );
}