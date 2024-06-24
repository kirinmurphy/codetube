export interface VideoItem {
  youtubeId: string;
  title: string;
  played: boolean;

}

export interface VideoPlayerStateProps {
  videoCollection: VideoItem[];
  activeVideo: VideoItem | null;
  lastPlayedVideoId: string | null;
  isPlayerOpen: boolean;
}
