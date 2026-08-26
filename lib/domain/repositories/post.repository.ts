import type { AdjacentPostsEntity, PostEntity, PostSummaryEntity } from "../entities/post.entity";

export interface IPostRepository {
  getAllSummaries(): PostSummaryEntity[];
  getAllPosts(): PostEntity[];
  getPostBySlug(slug: string): PostEntity | null;
  getFeaturedSummary(): PostSummaryEntity | null;
  getAdjacentPosts(slug: string): AdjacentPostsEntity;
  getAllTags(): string[];
}
