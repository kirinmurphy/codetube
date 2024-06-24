import { VideoItem } from "./types";
import { useVideoPlayer } from "./useVideoPlayer";

interface PlaylistItemProps {
  video: VideoItem;
}

export function PlaylistItem({ video }: PlaylistItemProps) {
  const { title, played } = video;
  const { activeVideo, playVideo } = useVideoPlayer();
  const isActiveVideo = activeVideo?.youtubeId === video.youtubeId;

  const baseClassList = "text-lg mb-2";
  const dynamicVideoLinkClasses = isActiveVideo 
    ? 'font-bold text-white' : 'cursor-pointer hover:text-white'; 
  const classList = `${baseClassList} ${dynamicVideoLinkClasses}`;

  const handlePlaylistItemSelect = () => {
    if (isActiveVideo) return;
    playVideo(video);
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
  const dynamicVideoLinkClasses = isActiveVideo 
    ? 'font-bold text-white' : 'cursor-pointer hover:text-white'; 
  return `text-lg mb-2 ${dynamicVideoLinkClasses}`;
}