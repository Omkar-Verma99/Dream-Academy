"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

/** Hide public site header/footer on portal auth and staff workspace routes. */
function usesPortalChrome(pathname: string) {
  return pathname.startsWith("/portal/") && pathname !== "/portal";
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const portalChrome = usesPortalChrome(pathname);

  if (portalChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}
