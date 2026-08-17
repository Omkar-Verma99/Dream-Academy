import { Button } from "@/components/ui/Button";
import { brandTaglineParts } from "@/data/brand";
import { heroHeadline, heroLeadShort } from "@/data/fallback";

import { FounderVoiceCard } from "./FounderVoiceCard";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-80px)] flex-col justify-center overflow-hidden bg-hero-wash"
    >
      <div
        className="blob -left-28 top-4 h-48 w-48 bg-brand/15"
        aria-hidden="true"
      />
      <div
        className="blob right-0 top-0 h-40 w-40 bg-orange/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16">
        <div className="grid items-stretch gap-7 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="relative z-10 flex w-full flex-col justify-center">
            <span className="animate-fade-up inline-flex w-fit rounded-full border border-brand/20 bg-paper/95 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand shadow-sm backdrop-blur">
              Charitable Trust · Lucknow
            </span>

            <h1
              id="hero-heading"
              className="text-hero-h1 animate-fade-up stagger-1 mt-4 text-ink sm:mt-5"
            >
              <span className="text-brand-gradient">DREAM</span>{" "}
              {heroHeadline}
            </h1>

            <p className="text-hero-lead animate-fade-up stagger-2 mt-4 max-w-xl sm:mt-5">
              {heroLeadShort}
            </p>

            <p className="text-hero-tagline animate-fade-up stagger-3 mt-4 flex flex-wrap gap-x-3 gap-y-1.5 sm:mt-5">
              {brandTaglineParts.map((part, index) => (
                <span key={part.text} className="inline-flex items-center gap-3">
                  {index > 0 ? (
                    <span className="text-border-strong" aria-hidden="true">
                      |
                    </span>
                  ) : null}
                  <span className={part.tone}>{part.text}</span>
                </span>
              ))}
            </p>

            <div className="animate-fade-up stagger-4 mt-6 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
              <Button href="/what-we-do" size="lg">
                Explore our work
              </Button>
              <Button href="/#health-talks" variant="secondary" size="lg">
                Watch health talks
              </Button>
              <Button href="/get-involved#donate" variant="ghost" size="lg">
                Donate now
              </Button>
            </div>
          </div>

          <div className="relative z-10 flex h-full min-h-[420px] w-full sm:min-h-[460px] lg:min-h-[500px]">
            <FounderVoiceCard variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
