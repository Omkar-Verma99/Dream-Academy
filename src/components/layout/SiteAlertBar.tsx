"use client";

import Link from "next/link";
import { useState } from "react";

import type { NewsAlert } from "@/data/news";

interface SiteAlertBarProps {
  alert: NewsAlert;
}

export function SiteAlertBar({ alert }: SiteAlertBarProps) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return sessionStorage.getItem(`alert-dismissed-${alert.id}`) === "1";
  });

  if (dismissed) {
    return null;
  }

  return (
    <div
      className="border-b border-forest/20 bg-forest text-paper"
      role="region"
      aria-label="Latest announcement"
    >
      <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-4 px-5 py-2.5 sm:px-8 lg:px-12">
        <p className="font-sans text-sm leading-relaxed">
          <span className="font-semibold text-ochre-tint">New: </span>
          <Link
            href={alert.href}
            className="font-medium text-paper no-underline hover:text-ochre-tint hover:no-underline"
          >
            {alert.title}
          </Link>
          <span className="hidden text-paper/70 sm:inline">
            {" "}
            — {alert.excerpt}
          </span>
        </p>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(`alert-dismissed-${alert.id}`, "1");
            setDismissed(true);
          }}
          className="shrink-0 font-sans text-xs font-medium text-paper/60 transition-colors duration-200 hover:text-paper"
          aria-label="Dismiss announcement"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

