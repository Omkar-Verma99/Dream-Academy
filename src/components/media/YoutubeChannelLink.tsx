import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site";

type YoutubeChannelLinkProps = {
  className?: string;
  children?: ReactNode;
};

export function YoutubeChannelLink({
  className = "",
  children = `Open ${siteConfig.youtube.channelName} on YouTube`,
}: YoutubeChannelLinkProps) {
  return (
    <a
      href={siteConfig.youtube.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#c4302b] px-7 py-3 text-sm font-bold text-white no-underline shadow-sm transition hover:bg-[#a82520] hover:text-white ${className}`}
    >
      <YoutubeMark />
      <span>{children}</span>
    </a>
  );
}

export function YoutubeMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M23.5 6.2a3.05 3.05 0 0 0-2.15-2.16C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.35.44A3.05 3.05 0 0 0 .5 6.2 32.1 32.1 0 0 0 0 12a32.1 32.1 0 0 0 .5 5.8 3.05 3.05 0 0 0 2.15 2.16C4.5 20.4 12 20.4 12 20.4s7.5 0 9.35-.44a3.05 3.05 0 0 0 2.15-2.16A32.1 32.1 0 0 0 24 12a32.1 32.1 0 0 0-.5-5.8ZM9.75 15.57V8.43L15.84 12l-6.09 3.57Z" />
    </svg>
  );
}
