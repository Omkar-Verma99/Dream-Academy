"use client";

import { useEffect, useRef, useState } from "react";

import type { ImpactStat } from "@/types/content";

interface ImpactStatsBarProps {
  stats: ImpactStat[];
}

const accents = [
  "bg-brand",
  "bg-crimson",
  "bg-green",
  "bg-orange",
];

function parseStatValue(raw: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} {
  const match = raw.trim().match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: raw, decimals: 0 };
  }

  const [, prefix, numeric, suffix] = match;
  const clean = numeric.replace(/,/g, "");
  const decimals = clean.includes(".") ? (clean.split(".")[1]?.length ?? 0) : 0;

  return {
    prefix: prefix ?? "",
    number: Number(clean) || 0,
    suffix: suffix ?? "",
    decimals,
  };
}

function formatCounted(value: number, decimals: number): string {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }
  return Math.round(value).toLocaleString("en-IN");
}

function CountUpValue({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const parsed = parseStatValue(value);
  const [display, setDisplay] = useState(() =>
    formatCounted(0, parsed.decimals),
  );

  useEffect(() => {
    if (!active) return;

    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.number * eased;
      setDisplay(formatCounted(current, parsed.decimals));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(formatCounted(parsed.number, parsed.decimals));
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, parsed.number, parsed.decimals]);

  const shown = active ? display : formatCounted(0, parsed.decimals);

  return (
    <span>
      {parsed.prefix}
      {shown}
      {parsed.suffix}
    </span>
  );
}

export function ImpactStatsBar({ stats }: ImpactStatsBarProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Impact at a glance"
      className="relative overflow-hidden border-y border-border-strong bg-surface"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-gradient opacity-80"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-eyebrow justify-center">Our impact</p>
          <h2 className="text-h2 mt-3 font-bold text-ink">
            Numbers that reflect real care
          </h2>
          <p className="mt-3 text-sm text-ink-muted sm:text-base">
            Screening, camps, districts, and training — growing with every community we serve.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative px-4 text-center sm:px-6 lg:px-8 ${
                index > 0
                  ? "lg:border-l lg:border-border"
                  : ""
              }`}
            >
              <div
                className={`mx-auto mb-4 h-1 w-10 rounded-full ${accents[index % accents.length]}`}
                aria-hidden="true"
              />
              <dd className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                <CountUpValue value={stat.value} active={active} />
              </dd>
              <dt className="mt-3 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-ink-muted sm:text-xs">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand-gradient opacity-80"
        aria-hidden="true"
      />
    </section>
  );
}
