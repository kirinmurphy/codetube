import { FaPause } from 'react-icons/fa';
import { Button } from "../widgets/Button";
import { VideoPlayerDisplayState } from './types';
import { useVideoPlayer } from "./utils/useVideoPlayer";

export function VideoPlayerMiniPlayControls () {
  const { 
    activeVideo,
    isPlaying,
    playActiveVideo,
    pauseVideo,
    updateDisplayState,
  } = useVideoPlayer();
  
  if ( activeVideo === null ) return <></>;

  const handleListen = () => {
    playActiveVideo();
  };

  const handlePause = () => { pauseVideo(); };

  const handleWatch = () => {
    playActiveVideo();
    updateDisplayState(VideoPlayerDisplayState.FullScreen);
  };

  return (
    <>
      {!isPlaying && <Button onClick={handleListen}>Listen</Button>}

      {isPlaying && (
        <Button onClick={handlePause}>
          <FaPause className="text-2xl" />
        </Button>
      )}

      <Button onClick={handleWatch}>Watch</Button>  
    </>          
  )
}
