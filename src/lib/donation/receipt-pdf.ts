import { jsPDF } from "jspdf";

import { siteConfig } from "@/lib/site";

export type DonationReceiptInput = {
  donorName: string;
  email: string;
  phone: string;
  pan: string;
  amount: number;
  frequency: "one-time" | "monthly";
};

function receiptNumber() {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.floor(Math.random() * 9000 + 1000);
  return `DA-${stamp}-${suffix}`;
}

/** jsPDF default fonts are Latin-1 only — avoid rupee symbol and Unicode punctuation. */
function formatAmountInr(amount: number) {
  return `Rs. ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

function pdfSafe(text: string) {
  return text
    .replace(/\u20B9/g, "Rs. ")
    .replace(/[—–]/g, "-")
    .replace(/·/g, "|");
}

function writeLines(
  doc: jsPDF,
  lines: string | string[],
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const wrapped = Array.isArray(lines)
    ? lines
    : doc.splitTextToSize(pdfSafe(lines), maxWidth);
  doc.text(wrapped, x, y);
  return y + wrapped.length * lineHeight;
}

export function downloadDonationReceiptPdf(input: DonationReceiptInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  const receiptId = receiptNumber();
  const issuedOn = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const frequencyLabel =
    input.frequency === "monthly" ? "monthly pledge" : "one-time";
  const amountLabel = formatAmountInr(input.amount);

  doc.setFillColor(30, 79, 214);
  doc.rect(0, 0, pageWidth, 110, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(pdfSafe(siteConfig.name), margin, 48);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Donation acknowledgment - Section 80G", margin, 68);
  doc.text(`Receipt no. ${receiptId}`, margin, 86);

  doc.setTextColor(20, 28, 45);
  doc.setFontSize(11);
  doc.text(`Issued on ${issuedOn}`, pageWidth - margin, 86, { align: "right" });

  let y = 140;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Donation receipt", margin, y);

  y += 24;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  y = writeLines(
    doc,
    "Thank you for supporting community diabetes care, medical education, and research.",
    margin,
    y,
    contentWidth,
    14,
  );

  y += 20;
  const boxTop = y;
  const boxHeight = 168;
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, boxTop, contentWidth, boxHeight, 10, 10, "FD");

  const rows: Array<[string, string]> = [
    ["Donor name", input.donorName],
    ["Email", input.email],
    ["Phone", input.phone],
    ["PAN", input.pan.toUpperCase()],
    ["Donation", `${amountLabel} (${frequencyLabel})`],
    ["Purpose", "General charitable fund - health camps and education"],
  ];

  let rowY = boxTop + 24;
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(label.toUpperCase(), margin + 18, rowY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    const valueLines = doc.splitTextToSize(pdfSafe(value), contentWidth - 170);
    doc.text(valueLines, margin + 140, rowY);
    rowY += Math.max(22, valueLines.length * 14);
  });

  y = boxTop + boxHeight + 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(30, 79, 214);
  doc.text(`Total: ${amountLabel}`, margin, y);

  y += 28;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const taxNote = [
    `${pdfSafe(siteConfig.fullName)} is a registered charitable trust.`,
    `PAN: ${pdfSafe(siteConfig.registration.pan)} | 12A: ${pdfSafe(siteConfig.registration.section12A)} | 80G: ${pdfSafe(siteConfig.registration.section80G)}`,
    "This PDF is an acknowledgment of your declared intent to donate. Final tax exemption applies as per applicable laws and trust registration status at the time of payment.",
    "Once online payment is enabled, an official receipt will be issued against the transaction reference.",
  ];
  taxNote.forEach((line) => {
    y = writeLines(doc, line, margin, y, contentWidth, 14);
    y += 4;
  });

  y += 12;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 28;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = writeLines(
    doc,
    siteConfig.contact.address,
    margin,
    y,
    contentWidth - 160,
    14,
  );
  doc.text(pdfSafe(siteConfig.contact.email), margin, y + 4);
  doc.text(
    pdfSafe(siteConfig.contact.phones.join(" | ")),
    margin,
    y + 20,
  );

  doc.setFont("helvetica", "bold");
  doc.text("Authorized signatory", pageWidth - margin - 150, y + 44);
  doc.setFont("helvetica", "normal");
  doc.text("DREAM Academy Trust", pageWidth - margin - 150, y + 60);

  doc.save(`DREAM-Academy-80G-Receipt-${receiptId}.pdf`);
}
