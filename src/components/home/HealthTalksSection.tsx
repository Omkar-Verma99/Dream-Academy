import { Container } from "@/components/layout/Container";
import { YoutubeHealthTalks } from "@/components/media/YoutubeHealthTalks";
import { Section } from "@/components/ui/Section";
import { SectionHeader, SectionIntro } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/lib/site";
import type { YoutubeVideo } from "@/lib/youtube";
import { getYoutubePlaylistEmbedUrl } from "@/lib/youtube";

type HealthTalksSectionProps = {
  videos: YoutubeVideo[];
};

export function HealthTalksSection({ videos }: HealthTalksSectionProps) {
  return (
    <Section id="health-talks" tone="surface" bordered aria-label="Health talks">
      <Container>
        <SectionHeader
          eyebrow="Health talks"
          title={siteConfig.youtube.channelName}
          description="Watch talks on this website. The red button opens the full YouTube channel."
          action={{ href: "/media/videos", label: "All talks" }}
        />

        <SectionIntro>
          <YoutubeHealthTalks
            videos={videos}
            playlistEmbedUrl={getYoutubePlaylistEmbedUrl()}
          />
        </SectionIntro>
      </Container>
    </Section>
  );
}
