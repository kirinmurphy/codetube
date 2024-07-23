import { FaMinusCircle } from "react-icons/fa";
import { VideoItem } from "./types";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import clsx from "clsx";

interface PlaylistItemProps {
  video: VideoItem;
}

export function PlaylistItem({ video }: PlaylistItemProps) {
  const { title, youtubeId } = video;
  const { activeVideo, playVideo, removeVideo } = useVideoPlayer();
  const isActiveVideo = activeVideo?.youtubeId === video.youtubeId;

  const handlePlaylistItemSelect = () => {
    if (isActiveVideo) return;
    playVideo({ video });
  }

  const handleRemoveVideo = () => {
    removeVideo(youtubeId);
  }

  return (
    <div className={clsx('flex border border-gray-500', {
      'font-bold bg-gray-200 text-gray-800': isActiveVideo
    })}>
      <div 
        className={clsx('flex-grow px-4 py-2 text-lg', {
          'cursor-pointer hover:text-white': !isActiveVideo
        })}
        onClick={handlePlaylistItemSelect}
      >
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
