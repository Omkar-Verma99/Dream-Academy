import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";

import { ContactPhones } from "@/components/layout/ContactPhones";
import { Container } from "@/components/layout/Container";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export function HomeLocationSection() {
  return (
    <Section tone="surface" pad="sm" aria-labelledby="home-location-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-eyebrow text-brand">Find us</p>
            <h2
              id="home-location-heading"
              className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl"
            >
              Visit DREAM Academy & Chandra Diabetes Clinic
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {siteConfig.contact.address}
            </p>

            <div className="mt-6 space-y-4 text-sm text-ink-muted">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink">{siteConfig.clinic.name}</p>
                  <p className="mt-1">{siteConfig.clinic.address}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-ink">Clinic hours</p>
                <p className="mt-1">{siteConfig.clinic.hours.weekdays}</p>
                <p>
                  {siteConfig.clinic.hours.days} · {siteConfig.clinic.hours.closed}
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink">Phone</p>
                <div className="mt-1">
                  <ContactPhones />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={siteConfig.contact.mapUrl} size="sm">
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get directions
              </Button>
              <Button href="/contact" variant="secondary" size="sm">
                Contact page
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-border shadow-sm">
            <MapEmbed className="aspect-[4/3] lg:aspect-auto lg:min-h-[420px]" />
            <p className="border-t border-border bg-paper px-4 py-3 text-xs text-ink-muted">
              Gomti Nagar, Lucknow —{" "}
              <Link
                href={siteConfig.contact.mapUrl}
                className="font-semibold text-brand no-underline hover:underline"
              >
                Open in Google Maps
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
