import Link from "next/link";

import { ContactPhones } from "@/components/layout/ContactPhones";
import { Container } from "@/components/layout/Container";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { Button } from "@/components/ui/Button";
import { footerNavigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b2266] text-white">
      <div className="h-1.5 bg-brand-gradient" />
      <Container as="div" className="section-pad-sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SiteLogo variant="footer" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              Advancing science · Empowering health · Transforming lives.
            </p>
            <div className="mt-7">
              <Button href="/get-involved#donate" size="sm">
                Make a donation
              </Button>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
                About
              </h2>
              <ul className="mt-4 space-y-2.5">
                {footerNavigation.about.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/80 no-underline hover:text-white hover:underline hover:underline-offset-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Programmes
              </h2>
              <ul className="mt-4 space-y-2.5">
                {[...footerNavigation.programmes, ...footerNavigation.resources]
                  .slice(0, 8)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/80 no-underline hover:text-white hover:underline hover:underline-offset-2"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Contact
              </h2>
              <address className="mt-4 space-y-2.5 not-italic text-sm text-white/80">
                <p className="leading-relaxed">{siteConfig.contact.address}</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="block break-all text-white no-underline hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
                <div className="[&_a]:text-white/90 [&_a]:no-underline [&_a:hover]:text-white [&_a:hover]:underline">
                  <ContactPhones />
                </div>
              </address>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm lg:col-span-3">
            <h2 className="font-bold text-white">Need help?</h2>
            <p className="mt-2 text-sm text-white/80">
              Clinic appointments and programme enquiries welcome.
            </p>
            <Button href="/contact" size="sm" className="mt-5">
              Contact us
            </Button>
          </div>
        </div>

        <hr className="my-10 border-white/20" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/70">
            © {currentYear} {siteConfig.name}. 12A:{" "}
            {siteConfig.registration.section12A} · 80G:{" "}
            {siteConfig.registration.section80G}
          </p>
          <ul className="flex flex-wrap gap-5">
            {footerNavigation.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-white/70 no-underline hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
