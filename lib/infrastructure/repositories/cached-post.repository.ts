import { cache } from "react";
import type { AdjacentPostsEntity, PostEntity, PostSummaryEntity } from "@/lib/domain/entities/post.entity";
import type { IPostRepository } from "@/lib/domain/repositories/post.repository";

/**
 * Decorator Pattern: Wraps any IPostRepository implementation with React cache()
 * memoization, isolating caching logic from storage mechanisms.
 */
export class CachedPostRepository implements IPostRepository {
  constructor(private readonly innerRepository: IPostRepository) {}

  public getAllSummaries = cache((): PostSummaryEntity[] => {
    return this.innerRepository.getAllSummaries();
  });

  public getAllPosts = cache((): PostEntity[] => {
    return this.innerRepository.getAllPosts();
  });

  public getPostBySlug = cache((slug: string): PostEntity | null => {
    return this.innerRepository.getPostBySlug(slug);
  });

  public getFeaturedSummary = cache((): PostSummaryEntity | null => {
    return this.innerRepository.getFeaturedSummary();
  });

  public getAdjacentPosts = cache((slug: string): AdjacentPostsEntity => {
    return this.innerRepository.getAdjacentPosts(slug);
  });

  public getAllTags = cache((): string[] => {
    return this.innerRepository.getAllTags();
  });
}
