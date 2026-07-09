import { ContactPhones } from "@/components/layout/ContactPhones";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function NewsletterContactSection() {
  return (
    <Section tone="paper" pad="sm" aria-labelledby="contact-band-heading">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep p-8 text-white shadow-lg sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-white/85">
                Chandra Diabetes Clinic
              </p>
              <h2
                id="contact-band-heading"
                className="mt-3 font-display text-3xl font-semibold text-white"
              >
                Visit us in Gomti Nagar
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90">
                {siteConfig.clinic.address}
              </p>
              <p className="mt-4 text-sm text-white/85">
                {siteConfig.clinic.hours.weekdays}
                <br />
                {siteConfig.clinic.hours.days} · {siteConfig.clinic.hours.closed}
              </p>
              <div className="mt-4 text-sm text-white/90 [&_a]:text-white [&_a]:underline">
                <ContactPhones />
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="text-xl font-semibold text-white">
                Questions or appointments?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                Reach the trust office or clinic team — we respond promptly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href="/contact"
                  className="border-white bg-white text-brand-deep hover:bg-teal-50"
                >
                  Contact us
                </Button>
                <Button
                  href={`mailto:${siteConfig.contact.email}`}
                  variant="ghost"
                  className="border border-white/40 text-white hover:bg-white/10"
                >
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
