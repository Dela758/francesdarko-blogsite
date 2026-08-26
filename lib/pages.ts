import { container } from "./application/container";
import type { AboutPageEntity } from "./domain/entities/page.entity";

export type { AboutPageEntity as AboutPageContent };

export function getAboutPage(): AboutPageEntity {
  return container.getAboutPage.execute();
}
