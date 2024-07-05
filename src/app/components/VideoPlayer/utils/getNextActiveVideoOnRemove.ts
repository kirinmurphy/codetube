import { VideoItem } from "../types";

interface GetNextActiveVideoProps {
  youtubeId: string;
  activeVideo: VideoItem | null;
  videoCollection: VideoItem[];
}

export function getNextActiveVideoOnRemove (props: GetNextActiveVideoProps): VideoItem | null {
  const { youtubeId, activeVideo, videoCollection } = props;

  if ( !activeVideo ) return null;

  if ( activeVideo.youtubeId !== youtubeId) {
    return activeVideo;
  }

  const activeVideoIndex = videoCollection.findIndex(v => v.youtubeId === youtubeId);
  const priorVideo = videoCollection[activeVideoIndex - 1];
  const nextVideo = videoCollection[activeVideoIndex + 1];
  return nextVideo || priorVideo || null;
};
