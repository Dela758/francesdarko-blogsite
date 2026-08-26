import type { PostFrontmatter } from "./content";

export interface PostSummary {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface AdjacentPostSummaries {
  prev: PostSummary | null;
  next: PostSummary | null;
}
