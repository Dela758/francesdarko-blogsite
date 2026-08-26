import type { AboutPageEntity } from "../entities/page.entity";

export interface IPageRepository {
  getAboutPage(): AboutPageEntity;
}
