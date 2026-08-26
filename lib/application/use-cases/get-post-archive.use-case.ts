import type { PostSummaryEntity } from "@/lib/domain/entities/post.entity";
import type { IPostRepository } from "@/lib/domain/repositories/post.repository";

export interface PostArchiveResult {
  posts: PostSummaryEntity[];
  tags: string[];
}

export class GetPostArchiveUseCase {
  constructor(private readonly postRepo: IPostRepository) {}

  public execute(): PostArchiveResult {
    const posts = this.postRepo.getAllSummaries();
    const tags = this.postRepo.getAllTags();

    return {
      posts,
      tags,
    };
  }
}
