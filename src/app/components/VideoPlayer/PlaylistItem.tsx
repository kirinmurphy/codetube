import { VideoItem } from "./types";
import { useVideoPlayer } from "./useVideoPlayer";

interface PlaylistItemProps {
  video: VideoItem;
}

export function PlaylistItem({ video }: PlaylistItemProps) {
  const { title, played } = video;
  const { activeVideo, playVideo } = useVideoPlayer();
  const isActiveVideo = activeVideo?.youtubeId === video.youtubeId;

  const handlePlaylistItemSelect = () => {
    if (isActiveVideo) return;
    playVideo({ video });
  }

  return (
    <div
      className={getListItemClassList({ isActiveVideo })}  
      onClick={handlePlaylistItemSelect}>
        {title}
    </div>
  );
}

interface GetListItemClassListProps {
  isActiveVideo: boolean;
}

function getListItemClassList({ isActiveVideo }: GetListItemClassListProps) {
  const baseClasses = 'text-lg px-4 py-2 border border-gray-500';
  const dynamicVideoLinkClasses = isActiveVideo 
    ? 'font-bold bg-gray-200 text-black' : 'cursor-pointer hover:text-white'; 
  return `${baseClasses} ${dynamicVideoLinkClasses}`;
}
