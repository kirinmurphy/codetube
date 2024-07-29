import YouTube, { YouTubeProps } from "react-youtube";

export function YoutubePlayer (playerProps: YouTubeProps) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden">
      <YouTube
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="absolute top-0 left-0 w-full h-full"
        {...playerProps}
      />
    </div>
  );
}
