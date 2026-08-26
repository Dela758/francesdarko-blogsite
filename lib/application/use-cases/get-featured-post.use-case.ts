import type { PostSummaryEntity } from "@/lib/domain/entities/post.entity";
import type { IPostRepository } from "@/lib/domain/repositories/post.repository";

export class GetFeaturedPostUseCase {
  constructor(private readonly postRepo: IPostRepository) {}

  public execute(): PostSummaryEntity | null {
    return this.postRepo.getFeaturedSummary();
  }
}
