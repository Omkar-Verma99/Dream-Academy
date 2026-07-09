import Link from "next/link";

import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="bg-paper py-32">
      <Container narrow>
        <p className="text-eyebrow">404</p>
        <h1 className="text-h1 mt-4 font-medium">Page not found</h1>
        <p className="text-lead mt-6 text-ink-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="mt-8 inline-block font-sans text-sm font-medium">
          Return to homepage
        </Link>
      </Container>
    </section>
  );
}

