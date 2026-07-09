import { requireStaffSession } from "@/lib/auth/staff";
import { formSubmissionsToCsv } from "@/lib/forms/export-csv";
import { getPortalFormSubmissions } from "@/lib/portal/data";

export async function GET() {
  await requireStaffSession();

  const submissions = await getPortalFormSubmissions();
  const csv = formSubmissionsToCsv(submissions);
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dream-academy-form-submissions-${stamp}.csv"`,
    },
  });
}
