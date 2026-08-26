export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  tags?: string[];
}

export interface PostSummaryEntity {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface PostEntity extends PostSummaryEntity {
  content: string;
  readingTime: string;
}

export interface AdjacentPostsEntity {
  prev: PostSummaryEntity | null;
  next: PostSummaryEntity | null;
}
