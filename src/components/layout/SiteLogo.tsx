import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

/** Official client logo — emblem + DREAM ACADEMY wordmark (842×552). */
const OFFICIAL_LOGO = "/images/brand/dream-academy-official.png";

type SiteLogoProps = {
  variant?: "header" | "footer";
  priority?: boolean;
};

const logoAssets = {
  header: {
    className:
      "h-12 w-auto max-w-[min(52vw,240px)] object-contain object-left transition-transform duration-300 group-hover:scale-[1.02] sm:max-w-[260px] lg:h-[52px] lg:max-w-[280px]",
  },
  footer: {
    className:
      "h-14 w-auto max-w-[280px] rounded-lg bg-white object-contain object-left p-2 sm:max-w-[300px]",
  },
} as const;

export function SiteLogo({ variant = "header", priority = false }: SiteLogoProps) {
  const asset = logoAssets[variant];

  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center no-underline hover:no-underline"
      aria-label={`${siteConfig.name} — Home`}
    >
      <Image
        src={OFFICIAL_LOGO}
        alt="DREAM Academy"
        width={842}
        height={552}
        className={asset.className}
        priority={priority}
      />
    </Link>
  );
}
