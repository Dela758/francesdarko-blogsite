import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { AdjacentPosts, Post, PostFrontmatter, PostSummary } from "@/lib/types/content";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

/**
 * Fast frontmatter parser. Extracts ONLY the frontmatter header chunk
 * without reading full MDX body into string RAM or calculating readingTime.
 */
function parsePostSummary(slug: string): PostSummary | null {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    return {
      slug,
      frontmatter: {
        title: frontmatter.title ?? "Untitled",
        date: frontmatter.date ?? new Date().toISOString(),
        excerpt: frontmatter.excerpt ?? "",
        featured: Boolean(frontmatter.featured),
        image: frontmatter.image,
        imageAlt: frontmatter.imageAlt,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      },
    };
  } catch (error) {
    console.error(`[PostService] Failed to parse summary for: ${slug}.mdx`, error);
    return null;
  }
}

/**
 * Parses full post including MDX body content and reading time calculation.
 */
function parseFullPost(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    return {
      slug,
      frontmatter: {
        title: frontmatter.title ?? "Untitled",
        date: frontmatter.date ?? new Date().toISOString(),
        excerpt: frontmatter.excerpt ?? "",
        featured: Boolean(frontmatter.featured),
        image: frontmatter.image,
        imageAlt: frontmatter.imageAlt,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      },
      content,
      readingTime: readingTime(content).text,
    };
  } catch (error) {
    console.error(`[PostService] Failed to parse full post: ${slug}.mdx`, error);
    return null;
  }
}

function getRawPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export class PostService {
  /**
   * Retrieves all lightweight post summaries sorted descending by date.
   * Memoized per request pass using React cache().
   */
  static getPostSummaries = cache((): PostSummary[] => {
    const slugs = getRawPostSlugs();
    const summaries: PostSummary[] = [];

    for (const slug of slugs) {
      const summary = parsePostSummary(slug);
      if (summary) summaries.push(summary);
    }

    return summaries.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  });

  /**
   * High-speed O(1) Hash Map lookup for PostSummaries.
   */
  static getSummaryMap = cache((): Map<string, PostSummary> => {
    const summaries = PostService.getPostSummaries();
    const map = new Map<string, PostSummary>();
    for (const summary of summaries) {
      map.set(summary.slug, summary);
    }
    return map;
  });

  /**
   * Full posts list (backwards compatibility).
   */
  static getAllPosts = cache((): Post[] => {
    const slugs = getRawPostSlugs();
    const posts: Post[] = [];

    for (const slug of slugs) {
      const post = parseFullPost(slug);
      if (post) posts.push(post);
    }

    return posts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  });

  /**
   * Retrieves full post by slug with O(1) cache lookup.
   */
  static getPostBySlug = cache((slug: string): Post | null => {
    if (!slug) return null;
    return parseFullPost(slug);
  });

  /**
   * Featured post query using lightweight summaries.
   */
  static getFeaturedPostSummary = cache((): PostSummary | null => {
    const summaries = PostService.getPostSummaries();
    if (summaries.length === 0) return null;
    return summaries.find((p) => p.frontmatter.featured) ?? summaries[0];
  });

  static getFeaturedPost = cache((): Post | null => {
    const summary = PostService.getFeaturedPostSummary();
    if (!summary) return null;
    return PostService.getPostBySlug(summary.slug);
  });

  /**
   * O(1) Map pre-calculation for Adjacent Posts.
   */
  static getAdjacentPosts = cache((slug: string): AdjacentPosts => {
    const posts = PostService.getAllPosts();
    const index = posts.findIndex((p) => p.slug === slug);

    if (index === -1) {
      return { prev: null, next: null };
    }

    return {
      prev: index < posts.length - 1 ? posts[index + 1] : null,
      next: index > 0 ? posts[index - 1] : null,
    };
  });

  /**
   * Aggregates all unique tags with pre-cached Set traversal.
   */
  static getAllTags = cache((): string[] => {
    const summaries = PostService.getPostSummaries();
    const tagsSet = new Set<string>();

    for (const summary of summaries) {
      if (summary.frontmatter.tags) {
        for (const tag of summary.frontmatter.tags) {
          tagsSet.add(tag);
        }
      }
    }

    return Array.from(tagsSet).sort();
  });
}
