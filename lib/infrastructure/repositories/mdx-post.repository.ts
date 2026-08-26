import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { AdjacentPostsEntity, PostEntity, PostFrontmatter, PostSummaryEntity } from "@/lib/domain/entities/post.entity";
import type { IPostRepository } from "@/lib/domain/repositories/post.repository";
import { DateStringValueObject } from "@/lib/domain/value-objects/date-string.vo";

export class MdxPostRepository implements IPostRepository {
  private readonly postsDirectory: string;

  constructor(customDirectory?: string) {
    this.postsDirectory = customDirectory ?? path.join(process.cwd(), "content/posts");
  }

  private getSlugs(): string[] {
    if (!fs.existsSync(this.postsDirectory)) return [];
    return fs
      .readdirSync(this.postsDirectory)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  }

  public getAllSummaries(): PostSummaryEntity[] {
    const slugs = this.getSlugs();
    const summaries: PostSummaryEntity[] = [];

    for (const slug of slugs) {
      const fullPath = path.join(this.postsDirectory, `${slug}.mdx`);
      if (!fs.existsSync(fullPath)) continue;

      try {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        const frontmatter = data as PostFrontmatter;

        summaries.push({
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
        });
      } catch (error) {
        console.error(`[MdxPostRepository] Error parsing summary: ${slug}`, error);
      }
    }

    return summaries.sort(
      (a, b) =>
        new DateStringValueObject(b.frontmatter.date).getTime() -
        new DateStringValueObject(a.frontmatter.date).getTime()
    );
  }

  public getAllPosts(): PostEntity[] {
    const slugs = this.getSlugs();
    const posts: PostEntity[] = [];

    for (const slug of slugs) {
      const post = this.getPostBySlug(slug);
      if (post) posts.push(post);
    }

    return posts.sort(
      (a, b) =>
        new DateStringValueObject(b.frontmatter.date).getTime() -
        new DateStringValueObject(a.frontmatter.date).getTime()
    );
  }

  public getPostBySlug(slug: string): PostEntity | null {
    if (!slug) return null;
    const fullPath = path.join(this.postsDirectory, `${slug}.mdx`);
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
      console.error(`[MdxPostRepository] Error parsing post: ${slug}`, error);
      return null;
    }
  }

  public getFeaturedSummary(): PostSummaryEntity | null {
    const summaries = this.getAllSummaries();
    if (summaries.length === 0) return null;
    return summaries.find((p) => p.frontmatter.featured) ?? summaries[0];
  }

  public getAdjacentPosts(slug: string): AdjacentPostsEntity {
    const summaries = this.getAllSummaries();
    const index = summaries.findIndex((p) => p.slug === slug);

    if (index === -1) {
      return { prev: null, next: null };
    }

    return {
      prev: index < summaries.length - 1 ? summaries[index + 1] : null,
      next: index > 0 ? summaries[index - 1] : null,
    };
  }

  public getAllTags(): string[] {
    const summaries = this.getAllSummaries();
    const tagsSet = new Set<string>();

    for (const summary of summaries) {
      if (summary.frontmatter.tags) {
        for (const tag of summary.frontmatter.tags) {
          tagsSet.add(tag);
        }
      }
    }

    return Array.from(tagsSet).sort();
  }
}
