import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  backHref,
  backLabel = "Back",
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-hero-wash">
      <div className="h-1 bg-brand-gradient" />
      <div
        className="blob -right-16 -top-10 h-56 w-56 bg-brand/20"
        aria-hidden="true"
      />
      <div
        className="blob bottom-0 left-10 h-40 w-40 bg-orange/15"
        aria-hidden="true"
      />
      <Container className="section-pad-sm relative">
        {backHref ? (
          <TextLink href={backHref} className="mb-6">
            {backLabel}
          </TextLink>
        ) : null}
        {eyebrow ? <p className="text-eyebrow">{eyebrow}</p> : null}
        <h1 className="text-h1 mt-5 max-w-4xl font-bold">{title}</h1>
        {lead ? <p className="text-lead mt-5 max-w-2xl">{lead}</p> : null}
      </Container>
    </header>
  );
}

interface ProseSectionProps {
  children: ReactNode;
  sunk?: boolean;
}

export function ProseSection({ children, sunk = false }: ProseSectionProps) {
  return (
    <section
      className={`section-pad-sm ${sunk ? "bg-surface-sunk" : "bg-paper"}`}
    >
      <Container narrow>
        <div className="prose-editorial">{children}</div>
      </Container>
    </section>
  );
}
