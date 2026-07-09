"use client";

import { useState } from "react";

import { downloadDonationReceiptPdf } from "@/lib/donation/receipt-pdf";
import { siteConfig } from "@/lib/site";

const presetAmounts = [500, 1000, 5000, 25000] as const;

export function DonationForm() {
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(
    "one-time",
  );
  const [message, setMessage] = useState<string | null>(null);

  const effectiveAmount =
    customAmount.trim() !== "" ? Number(customAmount) : amount;

  const fieldClass =
    "mt-2 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 font-sans text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form
      className="mt-6 space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const donorName = String(formData.get("name") ?? "").trim();
        const pan = String(formData.get("pan") ?? "").trim().toUpperCase();
        const email = String(formData.get("email") ?? "").trim();
        const phone = String(formData.get("phone") ?? "").trim();
        const consent = formData.get("consent") === "on";

        if (!Number.isFinite(effectiveAmount) || effectiveAmount < 100) {
          setMessage("Please enter a donation amount of at least ₹100.");
          return;
        }

        if (!consent) {
          setMessage("Please confirm the 80G receipt download to continue.");
          return;
        }

        downloadDonationReceiptPdf({
          donorName,
          email,
          phone,
          pan,
          amount: effectiveAmount,
          frequency,
        });

        setMessage(
          "Your 80G acknowledgment PDF has been downloaded. Online payment via Razorpay will be enabled soon — email us to complete your donation today.",
        );
      }}
    >
      <fieldset>
        <legend className="font-sans text-sm font-semibold text-ink">
          Amount
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {presetAmounts.map((preset) => {
            const selected = amount === preset && customAmount === "";
            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
                className={`rounded-xl border px-3 py-2.5 font-sans text-sm font-semibold transition-colors ${
                  selected
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-border bg-paper text-ink hover:border-brand/40"
                }`}
              >
                ₹{preset.toLocaleString("en-IN")}
              </button>
            );
          })}
          <label className="col-span-2 font-sans text-sm sm:col-span-3">
            <span className="sr-only">Custom amount in rupees</span>
            <input
              type="number"
              min="100"
              step="100"
              placeholder="Custom amount (₹)"
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-sans text-sm font-semibold text-ink">
          Frequency
        </legend>
        <div className="mt-3 flex gap-4">
          {(["one-time", "monthly"] as const).map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 font-sans text-sm text-ink"
            >
              <input
                type="radio"
                name="frequency"
                value={option}
                checked={frequency === option}
                onChange={() => setFrequency(option)}
              />
              {option === "one-time" ? "One-time" : "Monthly"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="donor-name"
            className="block font-sans text-sm font-semibold text-ink"
          >
            Full name
          </label>
          <input id="donor-name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label
            htmlFor="donor-pan"
            className="block font-sans text-sm font-semibold text-ink"
          >
            PAN (required for 80G receipt)
          </label>
          <input
            id="donor-pan"
            name="pan"
            required
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            className={`${fieldClass} uppercase`}
          />
        </div>
        <div>
          <label
            htmlFor="donor-email"
            className="block font-sans text-sm font-semibold text-ink"
          >
            Email
          </label>
          <input
            id="donor-email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="donor-phone"
            className="block font-sans text-sm font-semibold text-ink"
          >
            Phone
          </label>
          <input
            id="donor-phone"
            name="phone"
            type="tel"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input id="donor-consent" name="consent" type="checkbox" required />
        <label
          htmlFor="donor-consent"
          className="font-sans text-sm leading-relaxed text-ink-muted"
        >
          I agree to download my 80G donation acknowledgment receipt as a PDF
          (no email required).
        </label>
      </div>

      <button
        type="submit"
        className="btn-primary w-full rounded-full px-4 py-3 font-sans text-sm font-bold"
      >
        Download 80G receipt PDF · ₹
        {Number.isFinite(effectiveAmount)
          ? effectiveAmount.toLocaleString("en-IN")
          : "0"}
      </button>

      {message ? (
        <p className="rounded-xl border border-green/20 bg-green-soft/40 px-4 py-3 font-sans text-sm text-ink-muted">
          {message}
        </p>
      ) : null}

      <p className="font-sans text-xs leading-relaxed text-ink-muted">
        Online payment via Razorpay will be enabled once credentials are
        configured. Until then, contact{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>{" "}
        to complete your donation after downloading the receipt.
      </p>
    </form>
  );
}
