"use client";

import { useRef, useState } from "react";

import { YoutubeChannelLink, YoutubeMark } from "@/components/media/YoutubeChannelLink";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import type { YoutubeVideo } from "@/lib/youtube";
import { siteConfig } from "@/lib/site";

type YoutubeHealthTalksProps = {
  videos: YoutubeVideo[];
  playlistEmbedUrl: string;
};

function formatPublished(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function YoutubeHealthTalks({
  videos,
  playlistEmbedUrl,
}: YoutubeHealthTalksProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const [autoplay, setAutoplay] = useState(false);
  const active = videos.find((video) => video.id === activeId) ?? videos[0];
  const embedUrl = active
    ? getYoutubeEmbedUrl(active.id, autoplay)
    : playlistEmbedUrl;

  function playOnSite(videoId: string) {
    setActiveId(videoId);
    setAutoplay(true);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div>
      <div
        ref={playerRef}
        className="overflow-hidden rounded-3xl border border-border bg-ink shadow-sm"
      >
        <div className="relative aspect-video w-full bg-black">
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={
              active?.title ??
              `${siteConfig.youtube.channelName} on YouTube`
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        <div className="flex flex-col gap-4 bg-paper p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
              Playing on this website
            </p>
            <p className="mt-1 font-semibold text-ink">
              {active?.title ?? siteConfig.youtube.channelName}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {active ? (
              <a
                href={active.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-5 py-2.5 text-sm font-bold text-ink no-underline hover:border-brand/40 hover:text-brand"
              >
                Open on YouTube
              </a>
            ) : null}
            <YoutubeChannelLink>Visit the channel</YoutubeChannelLink>
          </div>
        </div>
      </div>

      {videos.length ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const selected = video.id === active?.id;
            return (
              <li key={video.id}>
                <button
                  type="button"
                  onClick={() => playOnSite(video.id)}
                  className={`group w-full overflow-hidden rounded-3xl border text-left shadow-sm transition ${
                    selected
                      ? "border-brand ring-2 ring-brand/20"
                      : "border-border hover:border-brand/40 hover:shadow-md"
                  }`}
                >
                  <span className="relative block aspect-video bg-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c4302b] text-white shadow-lg">
                        <YoutubeMark className="h-5 w-5" />
                      </span>
                    </span>
                  </span>
                  <span className="block p-4">
                    <span className="line-clamp-2 font-semibold text-ink">
                      {video.title}
                    </span>
                    <span className="mt-2 block text-xs text-ink-muted">
                      {formatPublished(video.publishedAt)} · Play here
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-8 text-sm text-ink-muted">
          Videos play on this page from YouTube. Use the channel button to open
          the full library.
        </p>
      )}
    </div>
  );
}
