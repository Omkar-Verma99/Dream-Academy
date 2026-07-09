const topics: Record<string, { title: string; description: string; paragraphs: string[] }> = {
  diabetes: {
    title: "Diabetes",
    description: "Patient guide to understanding and managing type 2 diabetes.",
    paragraphs: [
      "Type 2 diabetes is a condition where the body does not use insulin effectively. Early diagnosis through screening can prevent complications.",
      "Management includes diet, physical activity, regular monitoring, and medications when prescribed by your physician.",
    ],
  },
  obesity: {
    title: "Obesity",
    description: "Patient guide to weight management and metabolic health.",
    paragraphs: [
      "Obesity increases the risk of type 2 diabetes, hypertension, and cardiovascular disease. Sustainable lifestyle changes are the foundation of management.",
    ],
  },
  hypertension: {
    title: "Hypertension",
    description: "Patient guide to blood pressure management.",
    paragraphs: [
      "High blood pressure often occurs alongside diabetes and obesity. Regular monitoring and physician-guided treatment reduce long-term risk.",
    ],
  },
  masld: {
    title: "MASLD",
    description: "Patient guide to metabolic liver disease.",
    paragraphs: [
      "Metabolic dysfunction-associated steatotic liver disease is increasingly recognised alongside diabetes and obesity. Lifestyle modification is the primary intervention.",
    ],
  },
};

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps) {
  const { topic } = await params;
  const page = topics[topic];
  if (!page) return {};
  const { createPageMetadata } = await import("@/lib/metadata");
  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/resources/for-patients/${topic}`,
  });
}

export default async function PatientTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = topics[topic];
  if (!page) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  const { createStaticPage } = await import("@/components/templates/StaticPage");
  const { Page: StaticPage } = createStaticPage({
    eyebrow: "For Patients",
    title: page.title,
    backHref: "/resources/for-patients",
    backLabel: "Patient resources",
    metadata: {
      title: page.title,
      description: page.description,
      path: `/resources/for-patients/${topic}`,
    },
    paragraphs: page.paragraphs,
  });
  return <StaticPage />;
}
