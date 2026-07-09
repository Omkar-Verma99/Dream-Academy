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

function formatAmountInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
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

  doc.setFillColor(30, 79, 214);
  doc.rect(0, 0, pageWidth, 110, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(siteConfig.name, margin, 48);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Donation acknowledgment — Section 80G", margin, 68);
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
  doc.text(
    "Thank you for supporting community diabetes care, medical education, and research.",
    margin,
    y,
    { maxWidth: contentWidth },
  );

  y += 36;
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 150, 10, 10, "FD");

  const rows: Array<[string, string]> = [
    ["Donor name", input.donorName],
    ["Email", input.email],
    ["Phone", input.phone],
    ["PAN", input.pan.toUpperCase()],
    [
      "Donation",
      `${formatAmountInr(input.amount)} (${input.frequency === "monthly" ? "monthly pledge" : "one-time"})`,
    ],
    ["Purpose", "General charitable fund — health camps & education"],
  ];

  let rowY = y + 24;
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(label.toUpperCase(), margin + 18, rowY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(value, margin + 140, rowY, { maxWidth: contentWidth - 160 });
    rowY += 22;
  });

  y += 170;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(30, 79, 214);
  doc.text(formatAmountInr(input.amount), margin, y);

  y += 28;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const taxNote = [
    `${siteConfig.fullName} is a registered charitable trust.`,
    `PAN: ${siteConfig.registration.pan} · 12A: ${siteConfig.registration.section12A} · 80G: ${siteConfig.registration.section80G}`,
    "This PDF is an acknowledgment of your declared intent to donate. Final tax exemption applies as per applicable laws and trust registration status at the time of payment.",
    "Once online payment is enabled, an official receipt will be issued against the transaction reference.",
  ];
  taxNote.forEach((line) => {
    doc.text(line, margin, y, { maxWidth: contentWidth });
    y += 16;
  });

  y += 12;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 28;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(siteConfig.contact.address, margin, y, { maxWidth: contentWidth - 160 });
  doc.text(siteConfig.contact.email, margin, y + 28);
  doc.text(siteConfig.contact.phones.join(" · "), margin, y + 44);

  doc.setFont("helvetica", "bold");
  doc.text("Authorized signatory", pageWidth - margin - 150, y + 60);
  doc.setFont("helvetica", "normal");
  doc.text("DREAM Academy Trust", pageWidth - margin - 150, y + 76);

  doc.save(`DREAM-Academy-80G-Receipt-${receiptId}.pdf`);
}
