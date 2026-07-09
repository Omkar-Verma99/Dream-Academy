import type {
  PublicationSummary,
  ResearchHighlight,
} from "@/types/content";

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  body: string[];
}

export interface ResearchProject extends ResearchHighlight {
  status: "ongoing" | "completed" | "planned";
  principalInvestigator: string;
  body: string[];
}

export interface PublicationDetail extends PublicationSummary {
  abstract: string[];
  doi?: string;
}

export const fallbackResearchProjects: ResearchProject[] = [
  {
    title: "Prevalence of undiagnosed diabetes in rural Barabanki",
    slug: "undiagnosed-diabetes-barabanki",
    description:
      "A cross-sectional screening study examining diabetes prevalence among adults in underserved blocks of Barabanki district.",
    date: "2024-09-01",
    status: "ongoing",
    principalInvestigator: "Dr. Kumar Prafull Chandra",
    body: [
      "This study examines the prevalence of undiagnosed type 2 diabetes among adults aged 30 and above in rural blocks of Barabanki district, Uttar Pradesh.",
      "Data is collected through structured screening camps using standardised glucose testing protocols and follow-up counselling for at-risk individuals.",
      "Findings will inform targeted outreach and referral pathways for communities with limited access to metabolic care.",
    ],
  },
  {
    title: "Community-based lifestyle intervention pilot",
    slug: "lifestyle-intervention-pilot",
    description:
      "Evaluating structured nutrition counselling and physical activity programmes for adults at elevated metabolic risk.",
    date: "2024-06-15",
    status: "ongoing",
    principalInvestigator: "Dr. Kumar Prafull Chandra",
    body: [
      "A 12-week pilot programme providing nutrition education, physical activity guidance, and monthly follow-up for adults identified at metabolic risk during screening camps.",
      "The intervention is delivered by trained community health workers with physician oversight from DREAM Academy faculty.",
    ],
  },
  {
    title: "Metabolic syndrome screening in peri-urban Lucknow",
    slug: "metabolic-syndrome-lucknow",
    description:
      "Epidemiological assessment of metabolic syndrome prevalence in peri-urban residential communities.",
    date: "2023-03-01",
    status: "completed",
    principalInvestigator: "Dr. Kumar Prafull Chandra",
    body: [
      "Completed screening study across peri-urban communities in Lucknow examining waist circumference, blood pressure, fasting glucose, and lipid profiles.",
      "Results contributed to community awareness programmes and physician training materials.",
    ],
  },
];

export const fallbackPublicationDetails: PublicationDetail[] = [
  {
    title: "Screening outcomes from rural diabetes camps in Uttar Pradesh",
    slug: "screening-outcomes-up",
    authors: ["Chandra KP", "Verma SK", "Mishra AK"],
    journal: "Indian Journal of Endocrinology and Metabolism",
    year: 2024,
    doi: "10.4103/ijem.ijem_123_24",
    abstract: [
      "Background: Rural populations in Uttar Pradesh face significant barriers to diabetes screening and early diagnosis.",
      "Methods: We analysed screening data from 48 community camps conducted between 2022 and 2024.",
      "Results: Undiagnosed diabetes was identified in 18.4% of screened adults; referral completion rates improved with on-site counselling.",
      "Conclusion: Community-based screening programmes can identify substantial undiagnosed disease burden in rural settings.",
    ],
  },
  {
    title: "Community health worker training for metabolic screening",
    slug: "chw-metabolic-screening",
    authors: ["Chandra KP", "et al."],
    journal: "Journal of Public Health",
    year: 2024,
    abstract: [
      "This paper describes a training curriculum for community health workers conducting metabolic risk screening in field settings.",
    ],
  },
  {
    title: "Patient education materials for type 2 diabetes management",
    slug: "patient-education-t2dm",
    authors: ["DREAM Academy Research Group"],
    journal: "Clinical Practice Guidelines",
    year: 2023,
    abstract: [
      "Evidence-based patient education materials developed for use in Hindi and English, validated through community feedback sessions.",
    ],
  },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    title: "What we learned from 48 diabetes screening camps",
    slug: "lessons-from-48-camps",
    excerpt:
      "Reflections from three years of field programmes across nine districts of Uttar Pradesh.",
    publishedAt: "2024-11-20",
    author: "Dr. Kumar Prafull Chandra",
    body: [
      "Over the past three years, DREAM Academy has conducted 48 community screening camps, reaching more than 12,000 patients across urban and rural Uttar Pradesh.",
      "The most consistent finding is the high prevalence of undiagnosed diabetes — often in individuals who had no prior symptoms and no access to routine screening.",
      "Equally important is what happens after screening: counselling, referral, and follow-up are as critical as the initial test.",
    ],
  },
  {
    title: "Training community health workers for metabolic screening",
    slug: "training-community-health-workers",
    excerpt:
      "How structured training extends the reach of evidence-based metabolic care.",
    publishedAt: "2024-09-05",
    author: "DREAM Academy Education Team",
    body: [
      "Community health workers are often the first point of contact in rural health systems. DREAM Academy's training programme equips them with standardised protocols for glucose screening, risk assessment, and patient counselling.",
      "The programme emphasises practical skills, ethical communication, and clear referral pathways to physicians.",
    ],
  },
  {
    title: "Why 80G matters for charitable health programmes",
    slug: "why-80g-matters",
    excerpt:
      "Tax transparency and donor trust in India's charitable health sector.",
    publishedAt: "2024-06-12",
    author: "Mr. Abhay Kumar Mishra",
    body: [
      "Section 80G registration allows donors to claim tax deductions for contributions to registered charitable trusts. For DREAM Academy, maintaining valid 80G certification is part of our commitment to transparent, accountable governance.",
      "Every donation is acknowledged with a formal receipt suitable for tax filing purposes.",
    ],
  },
];
