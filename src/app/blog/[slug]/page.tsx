import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <PageHeader
        eyebrow="Journal"
        title={post.title}
        backHref="/blog"
        backLabel="Blog"
      />
      <section className="border-b border-border bg-paper py-6">
        <Container narrow>
          <p className="font-sans text-sm text-ink-muted">
            {new Intl.DateTimeFormat("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(post.publishedAt))}{" "}
            · {post.author}
          </p>
        </Container>
      </section>
      <section className="bg-paper py-16">
        <Container narrow>
          <div className="prose-editorial space-y-6 text-ink-muted">
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
