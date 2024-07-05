import { VideoItem } from "../types";

interface Props {
  video: VideoItem;
  videoCollection: VideoItem[];
  activeVideo: VideoItem | null;
}

export function getUpdatedCollectionWithInsertedVideo (props: Props): VideoItem[] {
  const { video, videoCollection, activeVideo } = props;
  
  const currentActiveIndex = activeVideo &&  
    videoCollection.findIndex(v => v.youtubeId === activeVideo.youtubeId);

  const insertIndex = currentActiveIndex != null ? (currentActiveIndex + 1) : -1;
  const itemsBefore = videoCollection.slice(0, insertIndex);
  const itemsAfter = videoCollection.slice(insertIndex);
  return [...itemsBefore, video, ...itemsAfter];
}
