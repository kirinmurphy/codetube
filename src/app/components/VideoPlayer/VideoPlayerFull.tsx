"use client";

import React from "react";
import { useVideoPlayer } from "./utils/useVideoPlayer";
import { PlaylistItem } from "./PlaylistItem";
import { VideoPlayerControlBar } from "./VideoPlayerControlBar";

export function VideoPlayerFull () {
  const { 
    videoCollection, 
  } = useVideoPlayer();

  return (
    <>
      <div className="mb-4">
        <VideoPlayerControlBar />
      </div>

      <ul>
        {videoCollection.map(video => (
          <li key={video.youtubeId}>
            <PlaylistItem video={video} />
          </li>
        ))}
      </ul>
    </>
  );
}
