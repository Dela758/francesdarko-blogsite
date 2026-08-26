import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GiscusComments } from "@/components/GiscusComments";
import { MDXContent } from "@/components/MDXContent";
import { TagBadge } from "@/components/TagBadge";
import { container } from "@/lib/application/container";
import { DateStringValueObject } from "@/lib/domain/value-objects/date-string.vo";
import { siteConfig } from "@/lib/infrastructure/config/site.config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return container.getPostBySlug.getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = container.getPostBySlug.execute(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [siteConfig.author],
      images: post.frontmatter.image
        ? [{ url: post.frontmatter.image }]
        : undefined,
    },
  };
}

import { normalizeImageUrl, isExternalUnoptimizedUrl } from "@/lib/utils/image";

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { post, adjacent } = container.getPostBySlug.execute(slug);
  if (!post) notFound();

  const { prev, next } = adjacent;
  const { title, date, image, imageAlt, tags } = post.frontmatter;
  const formattedDate = new DateStringValueObject(date).format();
  const imageUrl = normalizeImageUrl(image);
  const isUnoptimized = isExternalUnoptimizedUrl(image) || isExternalUnoptimizedUrl(imageUrl);

  return (
    <article className="container-content pb-0 pt-12 md:pt-16">
      <header className="fade-in mb-16 text-center md:mb-20">
        <h1 className="display-lg mx-auto max-w-3xl">{title}</h1>
        <div className="metadata mt-4 flex items-center justify-center gap-2">
          <time dateTime={date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {imageUrl && (
        <div className="fade-in mx-auto mb-12 flex justify-center md:mb-16">
          <div className="relative overflow-hidden rounded-sm border border-outline-variant/40 bg-surface-container shadow-sm">
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              width={1200}
              height={800}
              className="h-auto max-h-[580px] w-auto max-w-full rounded-sm object-contain"
              priority
              unoptimized={isUnoptimized}
            />
          </div>
        </div>
      )}

      <div className="prose-content fade-in mx-auto">
        <MDXContent source={post.content} />
      </div>

      {tags && tags.length > 0 && (
        <div className="mx-auto mt-16 flex max-w-[65ch] flex-wrap gap-2 border-t border-outline-variant/70 pt-6">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="mx-auto max-w-[65ch]">
        <GiscusComments />
      </div>

      {(prev || next) && (
        <nav
          className="-mx-5 mt-20 bg-surface-container-low px-5 py-20 text-center md:-mx-8 md:px-8 md:py-24"
          aria-label="Post navigation"
        >
          <p className="label-caps text-neutral mb-6">Read Next</p>
          {next ? (
            <div>
              <h2 className="headline-sm mb-2">
                <Link
                  href={`/essays/${next.slug}`}
                  className="transition-opacity duration-300 hover:opacity-70"
                >
                  {next.frontmatter.title}
                </Link>
              </h2>
              <p className="mx-auto max-w-xl text-on-surface-variant">
                {next.frontmatter.excerpt}
              </p>
            </div>
          ) : prev ? (
            <div>
              <h2 className="headline-sm mb-2">
                <Link
                  href={`/essays/${prev.slug}`}
                  className="transition-opacity duration-300 hover:opacity-70"
                >
                  {prev.frontmatter.title}
                </Link>
              </h2>
              <p className="mx-auto max-w-xl text-on-surface-variant">
                {prev.frontmatter.excerpt}
              </p>
            </div>
          ) : null}

          <div className="mx-auto mt-10 flex max-w-[65ch] justify-between gap-4 metadata">
            {prev ? (
              <Link href={`/essays/${prev.slug}`} className="text-link">
                ← {prev.frontmatter.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/essays/${next.slug}`} className="text-link text-right">
                {next.frontmatter.title} →
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
