import { createPageMetadata } from "@/lib/metadata";
import { getPortalFormSubmissions } from "@/lib/portal/data";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata = createPageMetadata({
  title: "Form submissions",
  description: "View and export public form submissions.",
  path: "/portal/submissions",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function PortalSubmissionsPage() {
  const submissions = await getPortalFormSubmissions();

  return (
    <Section pad="sm">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-h2 font-bold text-ink">Form submissions</h1>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">
              Contact, volunteer, newsletter, and donation forms filled in on the
              public website. Download as CSV (opens in Excel).
            </p>
          </div>
          <Button href="/api/portal/submissions/export" size="sm">
            Download Excel (CSV)
          </Button>
        </div>

        <div className="mt-8 overflow-x-auto rounded-[28px] border border-border bg-paper shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Form</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-ink-muted"
                  >
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                submissions.map((row) => (
                  <tr key={row._id} className="border-b border-border/70">
                    <td className="px-4 py-3 whitespace-nowrap text-ink-muted">
                      {formatDate(row.submittedAt)}
                    </td>
                    <td className="px-4 py-3 capitalize text-ink">
                      {row.formType}
                    </td>
                    <td className="px-4 py-3 text-ink">{row.name ?? "—"}</td>
                    <td className="px-4 py-3 text-ink">{row.email ?? "—"}</td>
                    <td className="px-4 py-3 text-ink">{row.phone ?? "—"}</td>
                    <td className="max-w-xs px-4 py-3 text-ink-muted">
                      {row.formType === "contact" && row.subject
                        ? `${row.subject}: ${row.message ?? ""}`
                        : null}
                      {row.formType === "volunteer" && row.background
                        ? `${row.background} — ${row.message ?? ""}`
                        : null}
                      {row.formType === "donation" && row.amount != null
                        ? `Rs. ${row.amount.toLocaleString("en-IN")} (${row.frequency ?? "one-time"}) · PAN ${row.pan ?? ""}`
                        : null}
                      {row.formType === "newsletter" ? row.email : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
