import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { Button } from "../widgets/Button";
import { useVideoPlayer } from "./utils/useVideoPlayer";


export function VideoPlayerNavigationButtons () {
  const { 
    getPreviousVideo,
    playPreviousVideo,
    getNextVideo,
    playNextVideo,
  } = useVideoPlayer();
 
  const previousVideo = getPreviousVideo();
  const handleGoToPrevious = () => { playPreviousVideo(); };

  const nextVideo = getNextVideo();
  const handleGoToNext = () => { playNextVideo(); };

  return (
    <>
      <Button 
        isDisabled={previousVideo === null}
        onClick={handleGoToPrevious}>
          <FaCaretLeft className="text-2xl" />
      </Button>

      <Button
        isDisabled={nextVideo === null} 
        onClick={handleGoToNext}>
          <FaCaretRight className="text-2xl" />
      </Button>
    </>    
  );
}
