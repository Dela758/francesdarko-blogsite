import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { formatDate } from "@/lib/utils/date";
import type { PostSummary } from "@/lib/types/content";

import { normalizeImageUrl, isExternalUnoptimizedUrl } from "@/lib/utils/image";

interface PostCardHeroProps {
  post: PostSummary;
  priority?: boolean;
}

export function PostCardHero({ post, priority = true }: PostCardHeroProps) {
  const { title, excerpt, image, imageAlt } = post.frontmatter;
  const imageUrl = normalizeImageUrl(image);
  const isUnoptimized = isExternalUnoptimizedUrl(image) || isExternalUnoptimizedUrl(imageUrl);

  return (
    <section className="container-content fade-in">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-container">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              fill
              className="object-cover grayscale-[18%] transition duration-700 hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 420px"
              priority={priority}
              unoptimized={isUnoptimized}
            />
          )}
        </div>

        <div>
          <p className="label-caps text-neutral mb-4">Featured Essay</p>
          <h2 className="headline-md mb-4">
            <Link
              href={`/essays/${post.slug}`}
              className="transition-opacity duration-300 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {title}
            </Link>
          </h2>
          <p className="body-lg text-on-surface-variant mb-6">{excerpt}</p>
          <Link
            href={`/essays/${post.slug}`}
            className="text-link label-caps"
          >
            Read the Essay →
          </Link>
        </div>
      </div>
    </section>
  );
}

interface PostCardListItemProps {
  post: PostSummary;
}

export function PostCardListItem({ post }: PostCardListItemProps) {
  const { title, date, excerpt } = post.frontmatter;

  return (
    <article className="group py-8 first:pt-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="headline-sm">
          <Link
            href={`/essays/${post.slug}`}
            className="transition-opacity duration-300 group-hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {title}
          </Link>
        </h3>
        <time className="metadata shrink-0" dateTime={date}>
          {formatDate(date)}
        </time>
      </div>
      <p className="mt-2 text-on-surface-variant">{excerpt}</p>
    </article>
  );
}

interface PostCardSkeletonProps {
  variant?: "hero" | "list";
}

export function PostCardSkeleton({ variant = "list" }: PostCardSkeletonProps) {
  if (variant === "hero") {
    return (
      <div className="container-content grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <Skeleton className="aspect-[4/5] w-full" />
        <div className="space-y-4">
          <Skeleton variant="text" width="120px" height="16px" />
          <Skeleton variant="text" height="36px" />
          <Skeleton variant="text" height="24px" />
          <Skeleton variant="text" width="140px" height="16px" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton variant="text" width="60%" height="24px" />
        <Skeleton variant="text" width="100px" height="16px" />
      </div>
      <Skeleton variant="text" width="90%" height="18px" />
    </div>
  );
}

interface PostCardEmptyProps {
  title?: string;
  description?: string;
}

export function PostCardEmpty({
  title = "No essays found",
  description = "No essays match your selected filter criteria. Check back soon for new writing.",
}: PostCardEmptyProps) {
  return <EmptyState title={title} description={description} />;
}

export const PostCard = {
  Hero: PostCardHero,
  ListItem: PostCardListItem,
  Skeleton: PostCardSkeleton,
  Empty: PostCardEmpty,
};
