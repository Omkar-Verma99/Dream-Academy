import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { founderQuote } from "@/data/fallback";

const FOUNDER_PHOTO = "/images/team/dr-kumar-prafull-chandra.jpg";

type FounderVoiceCardVariant = "hero" | "standalone";

interface FounderVoiceCardProps {
  variant?: FounderVoiceCardVariant;
}

export function FounderVoiceCard({
  variant = "standalone",
}: FounderVoiceCardProps) {
  if (variant === "hero") {
    return (
      <article className="animate-scale-in relative isolate flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-paper shadow-[0_20px_50px_-18px_rgba(15,23,42,0.18)] ring-1 ring-ink/5 sm:min-h-[460px] lg:flex-row">
        <figure className="relative aspect-[4/5] w-full shrink-0 self-stretch bg-[#dfe6f2] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[460px] lg:w-[42%]">
          <Image
            src={FOUNDER_PHOTO}
            alt="Dr. K. P. Chandra, Founder Trustee and President"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 28vw"
            className="object-cover object-top"
          />
        </figure>

        <div className="relative flex flex-1 flex-col justify-between px-5 py-5 sm:px-6 sm:py-6 lg:min-h-[460px] lg:px-8 lg:py-8">
          <div>
            <p className="text-eyebrow">Founder</p>
            <blockquote className="mt-3 sm:mt-4">
              <p
                id="founder-voice-heading"
                className="font-display text-base font-medium leading-snug text-ink sm:text-lg lg:text-xl"
              >
                “{founderQuote}”
              </p>
            </blockquote>
          </div>

          <div className="mt-4 border-t border-border/60 pt-4 sm:mt-5 sm:pt-5">
            <p className="text-base font-semibold text-ink">Dr. K. P. Chandra</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              Founder Trustee & President
              <span className="mx-1.5 text-border-strong">·</span>
              Internal Medicine & Diabetes Care
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5">
              <Button href="/about#founder">Founder message</Button>
              <Button href="/contact" variant="secondary">
                Clinic hours
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-paper shadow-sm lg:grid lg:min-h-[360px] lg:grid-cols-12">
      <figure className="relative min-h-[320px] overflow-hidden bg-[#dfe6f2] lg:col-span-5 lg:min-h-full">
        <Image
          src={FOUNDER_PHOTO}
          alt="Dr. K. P. Chandra, Founder Trustee and President"
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-top"
        />
      </figure>
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-7 lg:p-14">
        <p className="text-eyebrow">Founder</p>
        <blockquote className="mt-6">
          <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
            “{founderQuote}”
          </p>
        </blockquote>
        <p className="mt-6 text-sm font-semibold text-ink">Dr. K. P. Chandra</p>
        <p className="text-sm text-ink-muted">
          Founder Trustee & President · Internal Medicine & Diabetes Care
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/about#founder" size="sm">
            Founder message
          </Button>
          <Button href="/contact" variant="secondary" size="sm">
            Clinic hours
          </Button>
        </div>
      </div>
    </article>
  );
}
