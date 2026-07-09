import { ContactPhones } from "@/components/layout/ContactPhones";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact DREAM Academy and Chandra Diabetes Clinic in Gomti Nagar, Lucknow",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Contact"
        title="Contact us"
        lead="For programme enquiries, clinic appointments, partnerships, or data protection matters, please use the form below or contact us directly."
      />

      <Section tone="paper" pad="sm">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-5">
              <div>
                <p className="text-eyebrow">DREAM Academy</p>
                <h2 className="text-h3 mt-4 font-medium">Trust office</h2>
                <address className="mt-6 space-y-3 not-italic">
                  <p className="font-sans text-sm leading-relaxed text-ink-muted">
                    {siteConfig.contact.address}
                  </p>
                  <p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-sans text-sm font-medium"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                  <ContactPhones />
                </address>
              </div>

              <div className="border-t border-border pt-10">
                <p className="text-eyebrow">Clinic</p>
                <h2 className="text-h3 mt-4 font-medium">
                  {siteConfig.clinic.name}
                </h2>
                <p className="mt-2 font-sans text-sm font-medium text-brand">
                  {siteConfig.clinic.doctor} — {siteConfig.clinic.specialty}
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-ink-muted">
                  {siteConfig.clinic.address}
                </p>
                <dl className="mt-6 space-y-4 font-sans text-sm text-ink-muted">
                  <div>
                    <dt className="font-semibold text-ink">Clinic hours</dt>
                    <dd className="mt-1">
                      {siteConfig.clinic.hours.weekdays}
                      <br />
                      {siteConfig.clinic.hours.days}
                      <br />
                      {siteConfig.clinic.hours.closed}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Appointments</dt>
                    <dd className="mt-1">
                      {siteConfig.clinic.appointmentPhones.map((phone) => (
                        <span key={phone} className="block">
                          <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-border pt-10">
                <h2 className="text-h4 font-medium">Data protection</h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">
                  For requests related to personal data under the Digital
                  Personal Data Protection Act, 2023, contact{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sunk" pad="sm">
        <Container>
          <p className="text-eyebrow">Location</p>
          <h2 className="text-h3 mt-4 font-medium">Find us</h2>
          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-ink-muted">
            Chandra Diabetes Clinic, D-4/658, Vijayant Khand, near Chinhat
            Tiraha, Gomti Nagar, Lucknow — 226010.
          </p>
          <div className="mt-8 overflow-hidden border border-border">
            <MapEmbed />
          </div>
          <p className="mt-4">
            <TextLink
              href={siteConfig.contact.mapUrl}
              showArrow={false}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </TextLink>
          </p>
        </Container>
      </Section>
    </article>
  );
}

