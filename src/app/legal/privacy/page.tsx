import { PageHeader, ProseSection } from "@/components/layout/PageHeader";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for DREAM Academy, compliant with the Digital Personal Data Protection Act, 2023.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lead="This policy describes how DREAM Academy collects, uses, and protects personal data in accordance with the Digital Personal Data Protection Act, 2023."
      />
      <ProseSection>
        <h2 className="text-h3 font-medium text-ink">Data we collect</h2>
        <p>
          We collect personal data when you donate, volunteer, subscribe to our
          newsletter, register for events, or contact us. This may include your
          name, email address, phone number, PAN (for 80G receipts), and
          message content.
        </p>

        <h2 className="text-h3 font-medium text-ink">Purpose of processing</h2>
        <p>
          Personal data is processed solely for the purpose stated at the point
          of collection — for example, issuing tax receipts, responding to
          enquiries, or sending programme updates you have consented to receive.
        </p>

        <h2 className="text-h3 font-medium text-ink">Data retention</h2>
        <ul className="list-disc space-y-2 pl-6 font-sans text-base">
          <li>Donor records: 8 years (tax compliance)</li>
          <li>Volunteer records: until withdrawal of consent</li>
          <li>Newsletter subscribers: until unsubscribe</li>
        </ul>

        <h2 className="text-h3 font-medium text-ink">Your rights</h2>
        <p>
          You may request access, correction, or erasure of your personal data
          by contacting{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>{" "}
          or via our <a href="/contact">contact page</a>.
        </p>
      </ProseSection>
    </article>
  );
}

