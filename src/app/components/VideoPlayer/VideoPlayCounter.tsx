import { useVideoPlayer } from "./utils/useVideoPlayer";

export function VideoPlayCounter () {
  const { videoCollection, activeVideo } = useVideoPlayer();
  const { youtubeId } = activeVideo || {};

  const activeVideoIndex = videoCollection.findIndex(v => v.youtubeId === youtubeId);

  const totalVideos = videoCollection.length;

  return (
    <div>
      {activeVideoIndex+1} / {totalVideos}
    </div>
  );  
}
