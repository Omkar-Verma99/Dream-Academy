import type { ReactNode } from "react";

type SectionTone = "paper" | "surface" | "sunk" | "ink" | "forest-tint";

const toneClasses: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  sunk: "bg-surface-sunk text-ink",
  ink: "bg-ink text-white",
  "forest-tint": "bg-brand-soft text-ink",
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  tone?: SectionTone;
  pad?: "default" | "sm" | "none";
  bordered?: boolean;
  className?: string;
}

export function Section({
  children,
  id,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  tone = "paper",
  pad = "default",
  bordered = false,
  className = "",
}: SectionProps) {
  const padClass =
    pad === "default" ? "section-pad" : pad === "sm" ? "section-pad-sm" : "";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      className={`${toneClasses[tone]} ${padClass} ${bordered ? "section-band" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
