import { camp } from "./camp";
import { blogPost } from "./blogPost";
import { event } from "./event";
import { focusArea } from "./focusArea";
import { publication } from "./publication";
import { researchProject } from "./researchProject";
import { siteSettings } from "./siteSettings";
import { trustee } from "./trustee";

export const schemaTypes = [
  siteSettings,
  trustee,
  focusArea,
  camp,
  event,
  blogPost,
  researchProject,
  publication,
];
