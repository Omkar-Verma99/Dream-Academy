import { Download } from "lucide-react";

import type { TransparencyDocument } from "@/data/transparency-documents";

const buttonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border-0 bg-[linear-gradient(135deg,#1e4fd6_0%,#163fad_50%,#0f2b7a_100%)] px-5 py-2.5 text-sm font-bold text-white no-underline shadow-[0_8px_20px_-8px_rgba(30,79,214,0.55)] transition-all hover:shadow-[0_12px_28px_-10px_rgba(30,79,214,0.6)] sm:w-auto";

type TransparencyDocumentGridProps = {
  documents: TransparencyDocument[];
  compact?: boolean;
};

export function TransparencyDocumentGrid({
  documents,
  compact = false,
}: TransparencyDocumentGridProps) {
  return (
    <ul
      className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"}`}
    >
      {documents.map((doc) => (
        <li
          key={doc.id}
          className="flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5"
        >
          <div className="flex-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">
              {doc.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{doc.description}</p>
          </div>

          <div className="mt-4 border-t border-border/70 pt-4">
            {doc.downloadPath ? (
              <a
                href={doc.downloadPath}
                download={doc.downloadFileName}
                className={buttonClass}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
            ) : (
              <p className="text-sm font-medium text-ink-subtle">
                {doc.statusText ?? "Not yet available"}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
