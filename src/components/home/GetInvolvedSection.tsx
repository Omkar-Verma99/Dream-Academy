import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const actions = [
  {
    title: "Donate",
    description:
      "Fuel screening camps, community care, and medical education. Eligible for 80G tax benefits.",
    href: "/get-involved#donate",
    cta: "Give today",
    className: "bg-brand-gradient text-white shadow-lg",
    desc: "text-white/85",
    button: "secondary" as const,
  },
  {
    title: "Volunteer",
    description:
      "Join camps, awareness drives, and outreach across Uttar Pradesh.",
    href: "/get-involved#volunteer",
    cta: "Join us",
    className: "border border-border bg-paper shadow-sm",
    desc: "text-ink-muted",
    button: "primary" as const,
  },
  {
    title: "Partner",
    description:
      "CSR programmes, research alliances, and institutional collaboration.",
    href: "/get-involved#csr",
    cta: "Partner with us",
    className: "border border-border bg-paper shadow-sm",
    desc: "text-ink-muted",
    button: "primary" as const,
  },
] as const;

export function GetInvolvedSection() {
  return (
    <Section tone="surface" aria-labelledby="get-involved-heading">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow mx-auto justify-center">Get involved</p>
          <h2
            id="get-involved-heading"
            className="text-h2 mt-5 font-bold"
          >
            Help us bring better metabolic care to more communities
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {actions.map((action) => (
            <article
              key={action.title}
              className={`hover-lift flex flex-col rounded-3xl p-8 ${action.className}`}
            >
              <h3
                className={`text-h3 font-bold ${
                  action.title === "Donate" ? "text-white" : "text-ink"
                }`}
              >
                {action.title}
              </h3>
              <p className={`mt-4 flex-1 text-sm leading-relaxed ${action.desc}`}>
                {action.description}
              </p>
              <div className="mt-8">
                <Button
                  href={action.href}
                  variant={action.button}
                  size="sm"
                  className={
                    action.title === "Donate"
                      ? "border-0 bg-paper text-brand hover:bg-white"
                      : ""
                  }
                >
                  {action.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
