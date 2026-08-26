export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export interface AboutPageContent {
  title: string;
  image?: string;
  imageAlt?: string;
  content: string;
}

export interface AdjacentPosts {
  prev: Post | null;
  next: Post | null;
}

export type { PostSummary, AdjacentPostSummaries } from "./performance";
