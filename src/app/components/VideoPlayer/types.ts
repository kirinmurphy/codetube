export interface VideoItem {
  youtubeId: string;
  title: string;
  played: boolean;

}

export interface VideoPlayerStateProps {
  videoCollection: VideoItem[];
  activeVideo: VideoItem | null;
  isPlayerOpen: boolean;
  autoPlay: boolean;
}
