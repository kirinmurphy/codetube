"use client";

import React from "react";
import { useVideoPlayer } from "./useVideoPlayer";
import { PlaylistItem } from "./PlaylistItem";

export function VideoPlayerFull () {
  const { 
    videoCollection, 
  } = useVideoPlayer();

  return (
    <>
      <div className="w-full">
        <ul>
          {videoCollection.map(video => (
            <li key={video.youtubeId}>
              <PlaylistItem video={video} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
