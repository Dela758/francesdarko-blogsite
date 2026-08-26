import type { AdjacentPostsEntity, PostEntity } from "@/lib/domain/entities/post.entity";
import type { IPostRepository } from "@/lib/domain/repositories/post.repository";

export interface PostDetailResult {
  post: PostEntity | null;
  adjacent: AdjacentPostsEntity;
}

export class GetPostBySlugUseCase {
  constructor(private readonly postRepo: IPostRepository) {}

  public execute(slug: string): PostDetailResult {
    const post = this.postRepo.getPostBySlug(slug);
    const adjacent = this.postRepo.getAdjacentPosts(slug);

    return {
      post,
      adjacent,
    };
  }

  public getAllSlugs(): string[] {
    return this.postRepo.getAllSummaries().map((p) => p.slug);
  }
}
