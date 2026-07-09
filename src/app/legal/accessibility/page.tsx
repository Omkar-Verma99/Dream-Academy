import { PageHeader, ProseSection } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Accessibility Statement",
  description:
    "Accessibility statement for the DREAM Academy website. We aim to meet WCAG 2.2 AA.",
  path: "/legal/accessibility",
});

export default function AccessibilityPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Legal"
        title="Accessibility statement"
        lead="DREAM Academy is committed to ensuring digital accessibility for people with disabilities. We aim to conform to WCAG 2.2 Level AA."
      />
      <ProseSection>
        <p>
          We continually improve the user experience for everyone and apply
          relevant accessibility standards. If you encounter accessibility
          barriers on this site, please contact us at{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </ProseSection>
    </article>
  );
}

