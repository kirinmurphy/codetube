import { FaMinusCircle, FaPause, FaPlay } from "react-icons/fa";
import { VideoItem } from "./types";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import clsx from "clsx";

interface PlaylistItemProps {
  video: VideoItem;
}

export function PlaylistItem({ video }: PlaylistItemProps) {
  const { title, youtubeId } = video;

  const { 
    activeVideo,
    isPlaying, 
    playNewVideo, 
    playActiveVideo,
    pauseVideo, 
    removeVideo 
  } = useVideoPlayer();

  const isActiveVideo = activeVideo?.youtubeId === video.youtubeId;
  const isActiveVideoAndPlaying = isActiveVideo && isPlaying;
  const isActiveVideoAndNotPlaying = isActiveVideo && !isPlaying;

  const handlePlaylistItemSelect = () => {
    if ( isActiveVideoAndPlaying ) { pauseVideo(); }
    else if ( isActiveVideoAndNotPlaying ) { playActiveVideo(); }
    else { playNewVideo({ video }); }
  }

  const handleRemoveVideo = () => {
    removeVideo(youtubeId);
  }

  const Icon = isActiveVideoAndPlaying ? FaPause : FaPlay;

  return (
    <div className={clsx('flex border border-gray-500', {
      'font-bold bg-gray-200 text-gray-800': isActiveVideo
    })}>
      <div 
        className={clsx('group flex-grow flex items-center gap-2 px-4 py-2 text-lg cursor-pointer', {
          ' hover:text-white': !isActiveVideo
        })}
        onClick={handlePlaylistItemSelect}
      >
        <span className={clsx("w-[25px]", {
          'text-gray-700 group-hover:text-white': !isActiveVideo,
          'text-gray-500 group-hover:text-black': isActiveVideo
        })}><Icon/></span> 

        {title}
      </div>
      
      <button 
        className={clsx('px-4', {
          'cursor-pointer hover:text-white': !isActiveVideo,
          'hover:text-black': isActiveVideo
        })}
        onClick={handleRemoveVideo}
      >
        <FaMinusCircle />
      </button>
    </div>
  );
}
