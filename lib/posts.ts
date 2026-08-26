import { container } from "./application/container";
import type { PostEntity, PostFrontmatter, PostSummaryEntity } from "./domain/entities/post.entity";
import { DateStringValueObject } from "./domain/value-objects/date-string.vo";

export type { PostEntity as Post, PostFrontmatter, PostSummaryEntity as PostSummary };

export function getAllPosts(): PostEntity[] {
  return container.getPostArchive.execute().posts.map((summary) => {
    return container.getPostBySlug.execute(summary.slug).post!;
  }).filter(Boolean);
}

export function getPostSummaries(): PostSummaryEntity[] {
  return container.getPostArchive.execute().posts;
}

export function getPostBySlug(slug: string): PostEntity | null {
  return container.getPostBySlug.execute(slug).post;
}

export function getFeaturedPost(): PostEntity | null {
  const summary = container.getFeaturedPost.execute();
  if (!summary) return null;
  return container.getPostBySlug.execute(summary.slug).post;
}

export function getFeaturedPostSummary(): PostSummaryEntity | null {
  return container.getFeaturedPost.execute();
}

export function getAdjacentPosts(slug: string) {
  return container.getPostBySlug.execute(slug).adjacent;
}

export function getAllTags(): string[] {
  return container.getPostArchive.execute().tags;
}

export function formatDate(dateString: string, locale = "en-US"): string {
  return new DateStringValueObject(dateString).format(locale);
}
