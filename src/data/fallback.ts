import type { FocusArea, HomepageData, Trustee } from "@/types/content";

import { fallbackCamps } from "@/data/camps";

export { fallbackCamps };
export const fallbackSiteSettings: HomepageData["settings"] = {
  siteName: "DREAM Academy",
  tagline:
    "Diabetes Research & Excellence in Advanced Metabolic Medicine Academy",
  contactAddress:
    "D-4/658, Vijayant Khand, near Chinhat Tiraha, Gomti Nagar, Lucknow, Uttar Pradesh 226010, India",
  contactEmail: "chandradiabetesclinic@gmail.com",
  contactPhones: ["05223593056", "+918604804125"],
  impactStats: [
    { label: "PATIENTS SCREENED", value: "12,400", order: 1 },
    { label: "CAMPS CONDUCTED", value: "48", order: 2 },
    { label: "DISTRICTS REACHED", value: "9", order: 3 },
    { label: "HEALTHCARE PROFESSIONALS TRAINED", value: "2,300+", order: 4 },
  ],
};

export const fallbackFocusAreas: FocusArea[] = [
  {
    romanNumeral: "I",
    title: "Diabetes Care",
    slug: "diabetes-care",
    shortDescription:
      "Screening, prevention, education, and ongoing support for people living with diabetes.",
    ctaLabel: "Learn more",
    points: ["Screening", "Prevention", "Education", "Patient Support"],
  },
  {
    romanNumeral: "II",
    title: "Obesity & Metabolic Medicine",
    slug: "metabolic-medicine",
    shortDescription:
      "Lifestyle-led care for obesity and metabolic disorders grounded in nutrition and behavioural medicine.",
    ctaLabel: "Learn more",
    points: ["Lifestyle Medicine", "Nutrition", "Weight Management"],
  },
  {
    romanNumeral: "III",
    title: "Medical Research",
    slug: "medical-research",
    shortDescription:
      "Clinical and real-world studies that improve metabolic care, with open collaboration and publication.",
    ctaLabel: "Learn more",
    points: [
      "Clinical Research",
      "Real-world Studies",
      "Publications",
      "Collaborations",
    ],
  },
  {
    romanNumeral: "IV",
    title: "Medical Education",
    slug: "medical-education",
    shortDescription:
      "Structured learning for clinicians — from CME and workshops to fellowships and professional training.",
    ctaLabel: "Learn more",
    points: [
      "CME Programs",
      "Workshops",
      "Fellowship Programs",
      "Healthcare Professional Training",
    ],
  },
  {
    romanNumeral: "V",
    title: "Community Health",
    slug: "community-health",
    shortDescription:
      "Field programmes that bring metabolic awareness and care into villages, schools, and underserved communities.",
    ctaLabel: "Learn more",
    points: [
      "Rural Health Camps",
      "School Health Programs",
      "Women’s Health",
      "Elderly Care",
      "Public Awareness",
    ],
  },
  {
    romanNumeral: "VI",
    title: "Scholarships & Training",
    slug: "scholarships",
    shortDescription:
      "Scholarships, grants, and skill pathways for students and early-career researchers in metabolic medicine.",
    ctaLabel: "Learn more",
    points: ["Student Scholarships", "Research Grants", "Skill Development"],
  },
];

export const fallbackResearch: HomepageData["featuredResearch"] = [
  {
    title: "Prevalence of undiagnosed diabetes in rural Barabanki",
    slug: "undiagnosed-diabetes-barabanki",
    description:
      "A cross-sectional screening study examining diabetes prevalence among adults in underserved blocks of Barabanki district.",
    date: "2024-09-01",
  },
  {
    title: "Community-based lifestyle intervention pilot",
    slug: "lifestyle-intervention-pilot",
    description:
      "Evaluating structured nutrition counselling and physical activity programmes for adults at elevated metabolic risk.",
    date: "2024-06-15",
  },
];

export const fallbackPublications: HomepageData["recentPublications"] = [
  {
    title: "Screening outcomes from rural diabetes camps in Uttar Pradesh",
    slug: "screening-outcomes-up",
    authors: ["Chandra KP", "Verma SK", "Mishra AK"],
    journal: "Indian Journal of Endocrinology and Metabolism",
    year: 2024,
  },
  {
    title: "Community health worker training for metabolic screening",
    slug: "chw-metabolic-screening",
    authors: ["Chandra KP", "et al."],
    journal: "Journal of Public Health",
    year: 2024,
  },
  {
    title: "Patient education materials for type 2 diabetes management",
    slug: "patient-education-t2dm",
    authors: ["DREAM Academy Research Group"],
    journal: "Clinical Practice Guidelines",
    year: 2023,
  },
  {
    title: "Metabolic syndrome prevalence in peri-urban Lucknow",
    slug: "metabolic-syndrome-lucknow",
    authors: ["Chandra KP", "Verma SK"],
    journal: "Diabetes & Metabolic Syndrome",
    year: 2023,
  },
  {
    title: "School-based nutrition awareness programme outcomes",
    slug: "school-nutrition-awareness",
    authors: ["DREAM Academy Outreach Team"],
    journal: "Public Health Nutrition",
    year: 2023,
  },
];

export const fallbackEvents: HomepageData["upcomingEvents"] = [];

export const fallbackTrustees: Trustee[] = [
  {
    name: "Dr. K. P. Chandra, MD",
    role: "Founder Trustee & President",
    credentials: "MD - Internal Medicine & Advanced Diabetes Care",
    category: "founder",
    imageSrc: "/images/team/dr-kumar-prafull-chandra.jpg",
    imageAlt: "Portrait of Dr. K. P. Chandra, Founder Trustee and President",
    imagePosition: "50% 8%",
    summary:
      "Specialist in Internal Medicine & Advanced Diabetes Care; founded DREAM Academy to take evidence-based metabolic care from clinic to community.",
    bio: [
      "Dr. K. P. Chandra is a specialist in Internal Medicine and Advanced Diabetes Care, and the founder of DREAM Academy - a registered charitable trust dedicated to diabetes research, metabolic medicine, and community health across India.",
      "He practices at Chandra Diabetes Clinic, Gomti Nagar, Lucknow, and has led screening programmes, medical education initiatives, and research collaborations aimed at bringing evidence-based care to underserved populations.",
      "His guiding principle - that knowledge becomes meaningful only when it reaches the people who need it most - shapes every programme of the Academy.",
    ],
  },
  {
    name: "Mrs. Naina Chandra",
    role: "Secretary General",
    category: "trustee",
    imageSrc: "/images/team/mrs-naina-chandra.jpg",
    imageAlt: "Portrait of Mrs. Naina Chandra, Secretary General",
    imagePosition: "50% 12%",
    summary:
      "Oversees trust administration, community partnerships, and programme coordination across Academy initiatives.",
    bio: [
      "Mrs. Naina Chandra oversees the trust's administrative operations, community partnerships, and programme coordination.",
    ],
  },
  {
    name: "Mr. Sandeep Kumar Verma",
    role: "Trust Administrative Executive",
    category: "staff",
    imageSrc: "/images/team/sandeep-kumar-verma.jpg",
    imageAlt: "Portrait of Mr. Sandeep Kumar Verma, Trust Administrative Executive",
    imagePosition: "50% 10%",
    summary:
      "Manages day-to-day trust administration, camp logistics, and stakeholder communications.",
    bio: [
      "Mr. Sandeep Kumar Verma manages day-to-day trust administration, camp logistics, and stakeholder communications.",
    ],
  },
  {
    name: "Mr. Abhay Kumar Mishra",
    role: "Trust Accounts & Compliance Assistant",
    category: "staff",
    imageSrc: "/images/team/abhay-kumar-mishra.jpg",
    imageAlt: "Portrait of Mr. Abhay Kumar Mishra, Trust Accounts & Compliance Assistant",
    imagePosition: "50% 10%",
    summary:
      "Handles accounts, regulatory compliance, and documentation for the trust's charitable activities.",
    bio: [
      "Mr. Abhay Kumar Mishra handles accounts, regulatory compliance, and documentation for the trust's charitable activities.",
    ],
  },
];

/** Short pull-quote used on hero / founder cards. */
export const founderQuote =
  "Knowledge becomes meaningful only when it reaches the people who need it most.";

/** Founder's motto — featured across About and home. */
export const founderMotto =
  "Research with purpose. Educate with passion. Serve with compassion. Transform lives.";

/** Full founder letter shown on /about#founder. */
export const founderMessage = {
  greeting: "Dear Friends,",
  welcomeTitle: "Welcome to DREAM Academy",
  paragraphs: [
    "It gives me immense pleasure to welcome you to DREAM Academy—a charitable initiative founded with a simple yet powerful vision: to improve lives through excellence in healthcare, research, education, and community service.",
    "Diabetes and metabolic disorders have become one of the greatest public health challenges of our time. Millions of people continue to suffer from preventable complications due to delayed diagnosis, inadequate awareness, limited access to quality healthcare, and a lack of evidence-based education. At DREAM Academy, we believe these challenges can be addressed through a combination of scientific research, compassionate patient care, continuous medical education, and meaningful community engagement.",
    "Our mission extends beyond treating disease. We aspire to build a healthier society by empowering individuals, educating healthcare professionals, supporting young researchers, and strengthening public health initiatives, particularly in underserved and rural communities. Every project we undertake is guided by the principles of integrity, innovation, inclusiveness, and service.",
    "DREAM Academy is committed to promoting high-quality clinical research, advancing metabolic medicine, conducting educational programs, organizing health awareness campaigns, supporting scholarships and training, and fostering collaborations with national and international organizations. We believe that knowledge becomes truly meaningful only when it reaches the people who need it most.",
    "As a physician, I have witnessed the profound impact that timely education, compassionate care, and scientific innovation can have on individuals and families. This experience has inspired me to establish DREAM Academy as a platform where healthcare professionals, researchers, educators, policymakers, students, volunteers, and community members can work together toward a common goal—transforming lives through science, education, and compassion.",
    "I warmly invite you to join us in this journey. Whether you are a healthcare professional, researcher, student, donor, volunteer, or someone passionate about improving community health, your support can help us create lasting change. Together, we can advance knowledge, improve access to quality healthcare, and build healthier communities for generations to come.",
    "Thank you for visiting our website and for believing in our mission.",
  ],
  closing: "With warm regards,",
  signatoryName: "Dr. Kumar Prafull Chandra, MD",
  signatoryRole: "Founder Trustee & President",
  signatoryOrg: "DREAM Academy",
  signatoryFullName:
    "Diabetes Research & Excellence in Advanced Metabolic Medicine Academy",
} as const;

export const heroHeadline =
  "Advancing diabetes, metabolic health & medical education for a healthier India.";

export const heroLead =
  "DREAM Academy is a registered charitable trust advancing research, education, and community care for diabetes and metabolic disorders across India. Through field programmes, clinical training, and evidence-based outreach, we work to make quality metabolic health accessible to every community we serve.";

export const heroLeadShort =
  "A registered charitable trust advancing research, education, and community care for diabetes and metabolic disorders across India.";

export const aboutParagraphs = [
  "Founded as a registered charitable trust, DREAM Academy brings together physicians, researchers, educators, and community health workers in a shared mission to address the growing burden of diabetes and metabolic disease in India.",
  "Our work spans rural screening camps, medical education for healthcare professionals, patient support programmes, and collaborative research - always grounded in scientific rigour and compassionate service.",
  "Headquartered in Lucknow, Uttar Pradesh, the Academy partners with institutions, donors, and volunteers to extend the reach of evidence-based metabolic care to communities that need it most.",
];
