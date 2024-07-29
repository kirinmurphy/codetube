export function getYoutubeThumbnaillUrl (youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

export function getYoutubeVideoUrl (youtubeId: string) {
  return `https://youtube.com/watch?v=${youtubeId}`;
}