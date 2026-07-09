"use client";

import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/lib/site";

function buildWhatsAppUrl() {
  const { number, defaultMessage } = siteConfig.contact.whatsapp;
  const text = encodeURIComponent(defaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}

export function WhatsAppFloat() {
  const { display, defaultMessage } = siteConfig.contact.whatsapp;
  const href = buildWhatsAppUrl();

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        aria-label={`Chat on WhatsApp at ${display}`}
      >
        <span className="flex h-14 w-14 items-center justify-center">
          <MessageCircle className="h-7 w-7 fill-white text-white" aria-hidden="true" />
        </span>
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:pr-5 group-hover:opacity-100 sm:inline">
          Chat on WhatsApp
        </span>
      </a>
      <span className="sr-only">{defaultMessage}</span>
    </div>
  );
}
