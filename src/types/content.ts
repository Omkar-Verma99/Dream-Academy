export interface ImpactStat {
  label: string;
  value: string;
  order: number;
}

export interface FocusArea {
  title: string;
  slug: string;
  romanNumeral: string;
  shortDescription: string;
  ctaLabel: string;
  /** Concrete programme activities shown as bullets on What We Do. */
  points?: string[];
}

export interface CampSummary {
  title: string;
  slug: string;
  location: { name: string; district: string; state: string };
  dateStart: string;
  dateEnd?: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
}

export interface ResearchHighlight {
  title: string;
  slug: string;
  description: string;
  date: string;
}

export interface PublicationSummary {
  title: string;
  slug: string;
  authors: string[];
  journal: string;
  year: number;
}

export interface EventSummary {
  title: string;
  slug: string;
  type: string;
  startDateTime: string;
  description: string;
  registrationUrl?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactAddress: string;
  contactEmail: string;
  contactPhones: string[];
  impactStats: ImpactStat[];
}

export interface HomepageData {
  settings: SiteSettings;
  focusAreas: FocusArea[];
  recentCamps: CampSummary[];
  featuredResearch: ResearchHighlight[];
  recentPublications: PublicationSummary[];
  upcomingEvents: EventSummary[];
}

export interface Trustee {
  name: string;
  role: string;
  credentials?: string;
  category: "founder" | "trustee" | "advisor" | "staff";
  /** Full biography for dedicated founder / profile sections. */
  bio: string[];
  /** One-line summary for equal-height board cards. */
  summary: string;
  imageSrc?: string;
  imageAlt?: string;
  /** CSS object-position for portrait crop (e.g. "50% 18%"). */
  imagePosition?: string;
}
