import type { AboutPageEntity } from "@/lib/domain/entities/page.entity";
import type { IPageRepository } from "@/lib/domain/repositories/page.repository";

export class GetAboutPageUseCase {
  constructor(private readonly pageRepo: IPageRepository) {}

  public execute(): AboutPageEntity {
    return this.pageRepo.getAboutPage();
  }
}
