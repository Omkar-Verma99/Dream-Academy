import type { ReactNode } from "react";

import { PageHeader, ProseSection } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

interface StaticPageConfig {
  eyebrow?: string;
  title: string;
  lead?: string;
  backHref?: string;
  backLabel?: string;
  paragraphs: string[];
  metadata: {
    title: string;
    description: string;
    path: string;
  };
}

export function createStaticPage({
  eyebrow,
  title,
  lead,
  backHref,
  backLabel,
  paragraphs,
  metadata,
}: StaticPageConfig) {
  return {
    metadata: createPageMetadata(metadata),
    Page: function StaticPage(): ReactNode {
      return (
        <article>
          <PageHeader
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            backHref={backHref}
            backLabel={backLabel}
          />
          <ProseSection>
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </ProseSection>
        </article>
      );
    },
  };
}

