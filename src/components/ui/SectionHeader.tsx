import type { ReactNode } from "react";

import { TextLink } from "@/components/ui/TextLink";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  onDark?: boolean;
  align?: "left" | "split";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  onDark = false,
  align = "split",
  className = "",
}: SectionHeaderProps) {
  const eyebrowClass = onDark
    ? "text-eyebrow text-eyebrow--on-dark"
    : "text-eyebrow";

  if (align === "left") {
    return (
      <header className={`max-w-3xl ${className}`}>
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        <h2
          className={`text-h2 mt-5 font-medium ${onDark ? "text-paper" : "text-ink"}`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`text-lead mt-5 max-w-[52ch] ${onDark ? "text-paper/75" : ""}`}
          >
            {description}
          </p>
        ) : null}
        {action ? (
          <div className="mt-6">
            <TextLink href={action.href}>{action.label}</TextLink>
          </div>
        ) : null}
      </header>
    );
  }

  return (
    <header
      className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}
    >
      <div className="max-w-2xl">
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        <h2
          className={`text-h2 mt-5 font-medium ${onDark ? "text-paper" : "text-ink"}`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-4 max-w-[52ch] font-sans text-[0.9375rem] leading-relaxed ${onDark ? "text-paper/70" : "text-ink-muted"}`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <TextLink href={action.href} className="shrink-0">
          {action.label}
        </TextLink>
      ) : null}
    </header>
  );
}

interface SectionIntroProps {
  children: ReactNode;
  className?: string;
}

export function SectionIntro({ children, className = "" }: SectionIntroProps) {
  return <div className={`mt-12 lg:mt-16 ${className}`}>{children}</div>;
}

