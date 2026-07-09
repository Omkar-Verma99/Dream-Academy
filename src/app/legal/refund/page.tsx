import { PageHeader, ProseSection } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Donation Refund Policy",
  description: "Refund policy for donations made to DREAM Academy.",
  path: "/legal/refund",
});

export default function RefundPage() {
  return (
    <article>
      <PageHeader eyebrow="Legal" title="Donation refund policy" />
      <ProseSection>
        <p>
          Donations to DREAM Academy are voluntary contributions to a registered
          charitable trust. Refund requests may be considered within 7 days of
          the transaction if made in error.
        </p>
        <p>
          To request a refund, contact{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>{" "}
          with your transaction reference and donation details.
        </p>
      </ProseSection>
    </article>
  );
}

