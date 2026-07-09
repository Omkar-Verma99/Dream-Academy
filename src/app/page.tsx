import { AboutSection } from "@/components/home/AboutSection";
import { BrandPillarsSection } from "@/components/home/BrandPillarsSection";
import { FocusAreasSection } from "@/components/home/FocusAreasSection";
import { GetInvolvedSection } from "@/components/home/GetInvolvedSection";
import { HomeLocationSection } from "@/components/home/HomeLocationSection";
import { FieldGallerySection } from "@/components/home/FieldGallerySection";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactStatsBar } from "@/components/home/ImpactStatsBar";
import { NewsAlertsSection } from "@/components/home/NewsAlertsSection";
import { NewsletterContactSection } from "@/components/home/NewsletterContactSection";
import { RecentFieldworkSection } from "@/components/home/RecentFieldworkSection";
import { ResearchHighlightsSection } from "@/components/home/ResearchHighlightsSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { createPageMetadata } from "@/lib/metadata";
import { getHomepageData } from "@/lib/content/homepage";
import { getFieldGallerySlides } from "@/lib/content/field-gallery";
import { campsToNewsAlerts } from "@/lib/content/news-alerts";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — Advancing diabetes & metabolic health in India`,
  description: siteConfig.description,
  path: "/",
});

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalOrganization", "NGO"],
    name: siteConfig.name,
    alternateName: siteConfig.fullName,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phones.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function HomePage() {
  const [data, gallerySlides] = await Promise.all([
    getHomepageData(),
    getFieldGallerySlides(),
  ]);
  const newsAlerts = campsToNewsAlerts(data.recentCamps, 3);

  return (
    <>
      <OrganizationJsonLd />
      <HeroSection />
      <FieldGallerySection slides={gallerySlides} />
      <ImpactStatsBar stats={data.settings.impactStats} />
      <BrandPillarsSection />
      <NewsAlertsSection alerts={newsAlerts} />
      <AboutSection />
      <FocusAreasSection focusAreas={data.focusAreas} />
      <RecentFieldworkSection camps={data.recentCamps} />
      <ResearchHighlightsSection
        featuredResearch={data.featuredResearch}
        recentPublications={data.recentPublications}
      />
      <UpcomingEventsSection events={data.upcomingEvents} />
      <GetInvolvedSection />
      <HomeLocationSection />
      <NewsletterContactSection />
    </>
  );
}
