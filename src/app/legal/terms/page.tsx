import { PageHeader, ProseSection } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Terms of use for the DREAM Academy website.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <article>
      <PageHeader eyebrow="Legal" title="Terms of use" />
      <ProseSection>
        <p>
          By accessing this website, you agree to use it for lawful purposes
          only. Content on this site is provided for informational purposes and
          does not constitute medical advice.
        </p>
        <p>
          DREAM Academy reserves the right to update these terms. Continued use
          of the site constitutes acceptance of any revisions.
        </p>
      </ProseSection>
    </article>
  );
}

