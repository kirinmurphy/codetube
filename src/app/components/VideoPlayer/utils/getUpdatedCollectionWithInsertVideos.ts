import { VideoItem } from "../types";

interface Props {
  newVideos: VideoItem[];
  videoCollection: VideoItem[];
  activeVideo: VideoItem | null;
}

export function getUpdatedCollectionWithInsertedVideos (props: Props): VideoItem[] {
  const { newVideos, videoCollection, activeVideo } = props;
  
  const currentActiveIndex = activeVideo &&  
    videoCollection.findIndex(v => v.youtubeId === activeVideo.youtubeId);

  const insertIndex = currentActiveIndex != null ? (currentActiveIndex + 1) : -1;
  const itemsBefore = videoCollection.slice(0, insertIndex);
  const itemsAfter = videoCollection.slice(insertIndex);
  return [...itemsBefore, ...newVideos, ...itemsAfter];
}
