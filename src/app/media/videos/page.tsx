import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { YoutubeChannelLink } from "@/components/media/YoutubeChannelLink";
import { YoutubeHealthTalks } from "@/components/media/YoutubeHealthTalks";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import {
  getYoutubeChannelVideos,
  getYoutubePlaylistEmbedUrl,
} from "@/lib/youtube";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: `Health talks | ${siteConfig.youtube.channelName}`,
  description: `Watch DREAM Academy health talks from the YouTube channel ${siteConfig.youtube.channelName}. Videos play here and open on YouTube.`,
  path: "/media/videos",
});

export default async function HealthTalksPage() {
  const videos = await getYoutubeChannelVideos(12);

  return (
    <article>
      <PageHeader
        eyebrow="Media"
        title="Health talks"
        lead={`Watch educational videos from ${siteConfig.youtube.channelName} on this website. Use the red button if you want to open the YouTube channel.`}
        backHref="/media"
        backLabel="Media centre"
      />
      <section className="section-pad-sm bg-paper">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
              Tap any video below — it plays here. Open YouTube only if you
              want the full channel, comments, or subscribe.
            </p>
            <YoutubeChannelLink />
          </div>
          <YoutubeHealthTalks
            videos={videos}
            playlistEmbedUrl={getYoutubePlaylistEmbedUrl()}
          />
        </Container>
      </section>
    </article>
  );
}
