"use client";

import { BlogPost } from "@prisma/client";
import { useVideoPlayer } from "../../VideoPlayer/utils/useVideoPlayer";
import { FaPlay, FaPlus } from "react-icons/fa";

export function GroupVideoControls ({ posts }: { posts: BlogPost[] }) {

  console.log('posts', posts);

  const { 

  } = useVideoPlayer();

  return (
    <div className="flex items-center space-x-4 text-sm">
      <FaPlay /> Play All 
      <FaPlus /> Add All
    </div>
  )
};