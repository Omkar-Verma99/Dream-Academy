import { siteConfig } from "@/lib/site";

export type YoutubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  watchUrl: string;
  embedUrl: string;
};

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${siteConfig.youtube.channelId}`;

export function getYoutubeUploadsPlaylistId() {
  return `UU${siteConfig.youtube.channelId.slice(2)}`;
}

function youtubeEmbedParams(autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  return params.toString();
}

export function getYoutubeEmbedUrl(videoId: string, autoplay = false) {
  return `https://www.youtube.com/embed/${videoId}?${youtubeEmbedParams(autoplay)}`;
}

export function getYoutubePlaylistEmbedUrl(autoplay = false) {
  return `https://www.youtube.com/embed/videoseries?list=${getYoutubeUploadsPlaylistId()}&${youtubeEmbedParams(autoplay)}`;
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function tagValue(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match?.[1] ? decodeXml(match[1]) : "";
}

export async function getYoutubeChannelVideos(
  limit = 12,
): Promise<YoutubeVideo[]> {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/atom+xml,application/xml,text/xml" },
    });
    if (!response.ok) return [];

    const xml = await response.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    return entries.slice(0, limit).flatMap((entry) => {
      const block = entry[1] ?? "";
      const id = tagValue(block, "yt:videoId");
      const title = tagValue(block, "title");
      if (!id || !title) return [];

      return [
        {
          id,
          title,
          publishedAt: tagValue(block, "published"),
          thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          watchUrl: `https://www.youtube.com/watch?v=${id}`,
          embedUrl: getYoutubeEmbedUrl(id),
        },
      ];
    });
  } catch {
    return [];
  }
}
