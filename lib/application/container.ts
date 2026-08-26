import { CachedPostRepository } from "@/lib/infrastructure/repositories/cached-post.repository";
import { MdxPageRepository } from "@/lib/infrastructure/repositories/mdx-page.repository";
import { MdxPostRepository } from "@/lib/infrastructure/repositories/mdx-post.repository";
import { GetAboutPageUseCase } from "./use-cases/get-about-page.use-case";
import { GetFeaturedPostUseCase } from "./use-cases/get-featured-post.use-case";
import { GetPostArchiveUseCase } from "./use-cases/get-post-archive.use-case";
import { GetPostBySlugUseCase } from "./use-cases/get-post-by-slug.use-case";

/**
 * IoC Container: Assembles domain repositories, infrastructure adapters,
 * and application use cases.
 */
class ApplicationContainer {
  private readonly postRepository = new CachedPostRepository(new MdxPostRepository());
  private readonly pageRepository = new MdxPageRepository();

  public readonly getFeaturedPost = new GetFeaturedPostUseCase(this.postRepository);
  public readonly getPostArchive = new GetPostArchiveUseCase(this.postRepository);
  public readonly getPostBySlug = new GetPostBySlugUseCase(this.postRepository);
  public readonly getAboutPage = new GetAboutPageUseCase(this.pageRepository);
}

export const container = new ApplicationContainer();
