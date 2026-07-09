import {
  fallbackPublicationDetails,
  fallbackResearchProjects,
  type PublicationDetail,
  type ResearchProject,
} from "@/data/content";
import { sanityFetch } from "@/lib/sanity/client";
import {
  allPublicationDetailsQuery,
  allResearchProjectsQuery,
} from "@/lib/sanity/queries";
import {
  blocksToParagraphs,
  type SanityPublicationRecord,
  type SanityResearchRecord,
} from "@/lib/sanity/mappers";

function mapResearch(project: SanityResearchRecord): ResearchProject {
  const body = blocksToParagraphs(project.body);
  return {
    title: project.title,
    slug: project.slug,
    description: project.description ?? "",
    date: project.startDate ?? new Date().toISOString().slice(0, 10),
    status: project.status,
    principalInvestigator: project.principalInvestigator ?? "DREAM Academy",
    body: body.length ? body : [project.description ?? ""],
  };
}

function mapPublication(pub: SanityPublicationRecord): PublicationDetail {
  const abstract = blocksToParagraphs(pub.abstract);
  return {
    title: pub.title,
    slug: pub.slug,
    authors: pub.authors ?? [],
    journal: pub.journal ?? "",
    year: pub.year ?? new Date().getFullYear(),
    doi: pub.doi,
    abstract: abstract.length ? abstract : [""],
  };
}

export async function getResearchProjects(): Promise<ResearchProject[]> {
  const projects = await sanityFetch<SanityResearchRecord[]>(
    allResearchProjectsQuery,
  );
  if (projects?.length) {
    return projects.map(mapResearch);
  }
  return fallbackResearchProjects;
}

export async function getPublicationDetails(): Promise<PublicationDetail[]> {
  const publications = await sanityFetch<SanityPublicationRecord[]>(
    allPublicationDetailsQuery,
  );
  if (publications?.length) {
    return publications.map(mapPublication);
  }
  return fallbackPublicationDetails;
}
