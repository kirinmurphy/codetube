import { FaArrowUp, FaPause } from 'react-icons/fa';
import { Button } from "../widgets/Button";
import { VideoPlayerDisplayState } from './types';
import { useVideoPlayer } from "./utils/useVideoPlayer";

export function VideoPlayerMiniPlayControls () {
  const { 
    activeVideo,
    isPlaying,
    videoPlayerRef,
    playVideo,
    pauseVideo,
  } = useVideoPlayer();
  
  if ( activeVideo === null ) return <></>;

  const handleListen = () => {
    if ( videoPlayerRef.current ) { videoPlayerRef.current.playVideo(); }
    playVideo({ video: activeVideo });
  };

  const handlePause = () => { pauseVideo(); };

  const handleWatch = () => {
    if ( videoPlayerRef.current ) { videoPlayerRef.current.playVideo(); }
    playVideo({ 
      video: activeVideo,
      displayState: VideoPlayerDisplayState.FullScreen,
    });
  };

  return (
    <>
      {!isPlaying && <Button onClick={handleListen}>Listen</Button>}

      {isPlaying && (
        <Button onClick={handlePause}>
          <FaPause className="text-2xl" />
        </Button>
      )}

      <Button onClick={handleWatch}>
        <span className="hidden 500mq:block">Watch</span>
        <span className="block text-2xl 500mq:hidden"><FaArrowUp /></span>
      </Button>  
    </>          
  )
}
