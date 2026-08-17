import { createHubPage } from "@/components/templates/ContentHubPage";

const { metadata, Page } = createHubPage({
  eyebrow: "Media",
  title: "Media centre",
  lead: "Press releases, news coverage, photographs, and video from DREAM Academy programmes.",
  metadata: {
    title: "Media Centre",
    description: "Media resources and press information from DREAM Academy.",
    path: "/media",
  },
  links: [
    { title: "Press releases", href: "/media/press-releases", description: "Official announcements and programme launches." },
    { title: "News coverage", href: "/media/news-coverage", description: "Media coverage of DREAM Academy programmes." },
    { title: "Photos", href: "/media/photos", description: "Photograph galleries by event." },
    { title: "Health talks", href: "/media/videos", description: "Watch डॉक्टर की पंचायत on this site, or open the YouTube channel." },
    { title: "Podcasts", href: "/media/podcasts", description: "Podcast episodes on metabolic health." },
  ],
});

export { metadata };
export default Page;

