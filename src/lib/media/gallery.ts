export type GalleryMediaItem =
  | {
      id: string;
      kind: "image";
      src: string;
      alt: string;
    }
  | {
      id: string;
      kind: "video-file";
      src: string;
      alt: string;
    }
  | {
      id: string;
      kind: "video-embed";
      embedUrl: string;
      alt: string;
      thumbnail?: string;
    };

export function getYoutubeEmbedUrl(url: string): string | null {
  const match =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#/]+)/) ??
    null;
  if (!match?.[1]) return null;
  return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`;
}

export function getYoutubeThumbnail(url: string): string | undefined {
  const match =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#/]+)/) ??
    null;
  if (!match?.[1]) return undefined;
  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

export function buildCampGalleryItems(input: {
  title: string;
  photos: Array<{ src: string; alt: string }>;
  videoUrl?: string;
  videoFiles?: Array<{ src: string; alt: string }>;
}): GalleryMediaItem[] {
  const items: GalleryMediaItem[] = [];

  for (const [index, photo] of input.photos.entries()) {
    items.push({
      id: `photo-${index}-${photo.src}`,
      kind: "image",
      src: photo.src,
      alt: photo.alt,
    });
  }

  for (const [index, video] of (input.videoFiles ?? []).entries()) {
    items.push({
      id: `video-file-${index}-${video.src}`,
      kind: "video-file",
      src: video.src,
      alt: video.alt,
    });
  }

  if (input.videoUrl) {
    const embedUrl = getYoutubeEmbedUrl(input.videoUrl);
    if (embedUrl) {
      items.push({
        id: `video-embed-${input.videoUrl}`,
        kind: "video-embed",
        embedUrl,
        alt: `${input.title} — video`,
        thumbnail: getYoutubeThumbnail(input.videoUrl),
      });
    }
  }

  return items;
}
