import type { ReactNode } from "react";
import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";

interface HubLink {
  title: string;
  href: string;
  description: string;
}

interface ContentHubPageProps {
  eyebrow: string;
  title: string;
  lead: string;
  links: HubLink[];
  metadata: {
    title: string;
    description: string;
    path: string;
  };
}

export function createHubPage({
  eyebrow,
  title,
  lead,
  links,
  metadata,
}: ContentHubPageProps) {
  return {
    metadata: createPageMetadata(metadata),
    Page: function HubPage(): ReactNode {
      return (
        <article>
          <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
          <Section pad="sm">
            <Container>
              <ul className="grid gap-6 md:grid-cols-2">
                {links.map((link) => (
                  <li key={link.href} className="h-full">
                    <Link
                      href={link.href}
                      className="group flex h-full flex-col rounded-3xl border border-border bg-paper p-7 no-underline shadow-sm transition hover:border-brand/30 hover:shadow-md hover:no-underline sm:p-8"
                    >
                      <h2 className="text-h3 font-bold text-ink transition-colors group-hover:text-brand">
                        {link.title}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                        {link.description}
                      </p>
                      <span className="mt-5 inline-block text-sm font-bold text-brand">
                        Explore &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        </article>
      );
    },
  };
}

