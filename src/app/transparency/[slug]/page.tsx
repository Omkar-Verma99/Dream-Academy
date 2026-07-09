import type { ReactNode } from "react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { TransparencyDocumentGrid } from "@/components/transparency/TransparencyDocumentGrid";
import {
  getTransparencyDocument,
  getTransparencyDocuments,
  transparencyCategoryLabels,
  type TransparencyDocumentCategory,
} from "@/data/transparency-documents";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const categoryIntros: Record<TransparencyDocumentCategory, string[]> = {
  registration: [
    `DREAM Academy is registered as a charitable trust under the Indian Trusts Act, 1882. Certified copies of registration documents are published here as they become available.`,
    `PAN: ${siteConfig.registration.pan}. Section 12A: ${siteConfig.registration.section12A}. Section 80G: ${siteConfig.registration.section80G}.`,
    `For verification requests, contact ${siteConfig.contact.email}.`,
  ],
  reports: [
    "Annual and audit reports summarise programme reach, research output, beneficiary statistics, and fund utilisation. Reports are published following board approval.",
  ],
  financial: [
    "Summary financial disclosures including income sources, programme expenditure, and administrative costs are published in line with charitable trust reporting requirements.",
  ],
};

const slugDocumentMap = {
  certificates: { category: "registration" as const },
  "annual-reports": { ids: ["annual-reports"] as const },
  "audit-reports": { ids: ["audit-reports"] as const },
  financials: { ids: ["financial-statements"] as const },
};

type Slug = keyof typeof slugDocumentMap;

function getDocumentsForSlug(slug: Slug) {
  const config = slugDocumentMap[slug];
  if ("category" in config) {
    return getTransparencyDocuments(config.category);
  }
  return config.ids
    .map((id) => getTransparencyDocument(id))
    .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(slugDocumentMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!(slug in slugDocumentMap)) return {};

  const title =
    slug === "certificates"
      ? transparencyCategoryLabels.registration
      : getDocumentsForSlug(slug as Slug)[0]?.label ?? "Transparency";

  return createPageMetadata({
    title,
    description: `Transparency documents — ${title} — ${siteConfig.name}.`,
    path: `/transparency/${slug}`,
  });
}

export default async function TransparencySubPage({ params }: PageProps) {
  const { slug } = await params;
  if (!(slug in slugDocumentMap)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const slugKey = slug as Slug;
  const documents = getDocumentsForSlug(slugKey);
  const title =
    slugKey === "certificates"
      ? transparencyCategoryLabels.registration
      : documents[0]?.label ?? "Transparency";
  const category: TransparencyDocumentCategory =
    slugKey === "certificates"
      ? "registration"
      : slugKey === "financials"
        ? "financial"
        : "reports";
  const paragraphs = categoryIntros[category];

  return (
    <TransparencyCategoryPage title={title} paragraphs={paragraphs}>
      <TransparencyDocumentGrid documents={documents} />
    </TransparencyCategoryPage>
  );
}

function TransparencyCategoryPage({
  title,
  paragraphs,
  children,
}: {
  title: string;
  paragraphs: string[];
  children: ReactNode;
}) {
  return (
    <article>
      <PageHeader
        eyebrow="Governance"
        title={title}
        lead={paragraphs[0]}
        backHref="/transparency"
        backLabel="Transparency"
      />
      <Section pad="sm">
        <Container>
          {paragraphs.length > 1 ? (
            <div className="prose-dream mb-10 max-w-3xl space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              {paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {children}
        </Container>
      </Section>
    </article>
  );
}
