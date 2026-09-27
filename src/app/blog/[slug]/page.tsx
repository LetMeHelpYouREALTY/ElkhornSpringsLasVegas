import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { JsonLd } from "@/components/integrations/JsonLd";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { blogPostingJsonLd } from "@/lib/schema";
import { siteIdentity } from "@/lib/site-contact";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const path = `/blog/${slug}`;
  return createMetadata({
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      ...defaultOpenGraph,
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: new URL(path, siteMetadataBase),
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const url = new URL(path, siteMetadataBase).toString();
  const articleLd = blogPostingJsonLd({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url,
  });

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]}
      />
      <JsonLd data={articleLd} />
      <header className="space-y-2">
        <p className="text-xs text-muted-foreground">{post.date}</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="text-muted-foreground">{post.description}</p>
      </header>
      <BlogMarkdown content={post.content} />
      <p className="text-xs text-muted-foreground">
        Focus: {siteIdentity.primaryArea}, Las Vegas {siteIdentity.zip}.
      </p>
    </article>
  );
}
