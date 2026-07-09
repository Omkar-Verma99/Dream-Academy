import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";

import { FounderVoiceCard } from "./FounderVoiceCard";

export function FoundersVoiceSection() {
  return (
    <Section tone="surface" aria-labelledby="founder-voice-heading">
      <Container>
        <FounderVoiceCard />
      </Container>
    </Section>
  );
}
