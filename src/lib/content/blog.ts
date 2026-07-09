import {
  fallbackBlogPosts,
  type BlogPost,
} from "@/data/content";
import { sanityFetch } from "@/lib/sanity/client";
import {
  allBlogPostsQuery,
  blogPostBySlugQuery,
} from "@/lib/sanity/queries";
import {
  blocksToParagraphs,
  type SanityBlogRecord,
} from "@/lib/sanity/mappers";

function mapBlogPost(post: SanityBlogRecord): BlogPost {
  const body = blocksToParagraphs(post.body);
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? body[0] ?? "",
    author: post.author ?? "DREAM Academy",
    publishedAt: post.publishedAt,
    body: body.length ? body : [post.excerpt ?? ""],
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await sanityFetch<SanityBlogRecord[]>(allBlogPostsQuery);
  if (posts?.length) {
    return posts.map(mapBlogPost);
  }
  return fallbackBlogPosts;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const post = await sanityFetch<SanityBlogRecord>(blogPostBySlugQuery, {
    slug,
  });
  if (post) {
    return mapBlogPost(post);
  }
  return fallbackBlogPosts.find((item) => item.slug === slug);
}
