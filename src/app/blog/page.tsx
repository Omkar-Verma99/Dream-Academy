import Link from "next/link";
import { FileText, Newspaper } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { getBlogPosts } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description: "News, field reports, and perspectives from DREAM Academy.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <article>
      <PageHeader
        eyebrow="Journal"
        title="News & updates"
        lead="Field reports, programme updates, and perspectives on diabetes care and community health — published from the DREAM Academy portal."
      />

      <Section pad="sm">
        <Container>
          <ul className="grid gap-5 lg:grid-cols-2">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex h-full flex-col rounded-[28px] border border-brand/15 bg-paper p-7 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"
                    aria-hidden="true"
                  >
                    <Newspaper className="h-5 w-5 stroke-[2.25]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                      {new Intl.DateTimeFormat("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(post.publishedAt))}{" "}
                      · {post.author}
                    </p>
                    <h2 className="text-h4 mt-2 text-ink">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="no-underline hover:text-brand"
                      >
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand no-underline hover:underline"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Read article
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </article>
  );
}
