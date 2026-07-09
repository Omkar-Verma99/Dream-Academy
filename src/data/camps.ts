import type { CampSummary } from "@/types/content";

export interface CampDetail extends CampSummary {
  photos: Array<{ src: string; alt: string }>;
  videos?: Array<{ src: string; alt: string }>;
  report?: string[];
  statistics?: Array<{ label: string; value: string }>;
  video?: string;
}

function campPhotos(
  folder: string,
  count: number,
  altPrefix: string,
): Array<{ src: string; alt: string }> {
  return Array.from({ length: count }, (_, index) => {
    const num = String(index + 1).padStart(2, "0");
    return {
      src: `/images/camps/${folder}/${num}.jpeg`,
      alt: `${altPrefix} — photograph ${index + 1}`,
    };
  });
}

export const campDetails: CampDetail[] = [
  {
    title: "Camp at Ram Nagar, Barabanki",
    slug: "ram-nagar-barabanki",
    location: { name: "Ram Nagar", district: "Barabanki", state: "Uttar Pradesh" },
    dateStart: "2024-11-15",
    dateEnd: "2024-11-15",
    imageSrc: "/images/camps/ram-nagar/01.jpeg",
    imageAlt:
      "DREAM Academy volunteers conducting diabetes screening at a community health camp in Ram Nagar, Barabanki",
    caption:
      "Free screening and counselling for residents of Ram Nagar, Barabanki district.",
    photos: campPhotos(
      "ram-nagar",
      14,
      "Diabetes health camp at Ram Nagar, Barabanki",
    ),
    report: [
      "DREAM Academy conducted a community diabetes screening camp at Ram Nagar, Barabanki, providing free glucose testing, blood pressure measurement, and physician-led counselling for local residents.",
      "The camp was supported by trust volunteers, community health workers, and the clinical team from Chandra Diabetes Clinic, Lucknow.",
    ],
  },
  {
    title: "Camp at Celebrity Green Apartment, Sushant Golf City",
    slug: "sushant-golf-city-lucknow",
    location: {
      name: "Celebrity Green Apartment, Sushant Golf City",
      district: "Lucknow",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-10-08",
    imageSrc: "/images/camps/sushant-golf/01.jpeg",
    imageAlt:
      "DREAM Academy health camp at Celebrity Green Apartment, Sushant Golf City, Lucknow",
    caption:
      "Residential community screening programme in Lucknow with on-site counselling for families.",
    photos: campPhotos(
      "sushant-golf",
      7,
      "Diabetes health camp at Celebrity Green Apartment, Sushant Golf City, Lucknow",
    ),
    report: [
      "This residential community camp at Celebrity Green Apartment, Sushant Golf City brought screening services directly to families in Lucknow.",
      "Residents received metabolic risk assessment, lifestyle counselling, and referral guidance from the DREAM Academy clinical team.",
    ],
  },
  {
    title:
      "Camp at Mahamana Malviya Vidya Mandir, Vivek Khand, Gomti Nagar",
    slug: "mahamana-malviya-vidya-mandir-lucknow",
    location: {
      name: "Mahamana Malviya Vidya Mandir, Vivek Khand 1",
      district: "Lucknow",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-09-12",
    imageSrc: "/images/camps/mahamana/01.jpeg",
    imageAlt:
      "School-based diabetes awareness and screening camp at Mahamana Malviya Vidya Mandir, Gomti Nagar, Lucknow",
    caption:
      "School health programme combining screening with nutrition and lifestyle awareness for students and staff.",
    photos: campPhotos(
      "mahamana",
      5,
      "Health camp at Mahamana Malviya Vidya Mandir, Vivek Khand, Gomti Nagar, Lucknow",
    ),
    report: [
      "DREAM Academy organised a school-based health camp at Mahamana Malviya Vidya Mandir in Vivek Khand, Gomti Nagar, combining diabetes screening with awareness sessions for students, teachers, and parents.",
      "The programme emphasised early detection, healthy nutrition, and the importance of regular screening for metabolic risk.",
    ],
  },
];

export const fallbackCamps: CampSummary[] = campDetails;

export function getCampBySlug(slug: string): CampDetail | undefined {
  return campDetails.find((camp) => camp.slug === slug);
}
