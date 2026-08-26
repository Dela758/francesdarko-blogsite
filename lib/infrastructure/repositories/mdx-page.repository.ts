import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import type { AboutPageEntity } from "@/lib/domain/entities/page.entity";
import type { IPageRepository } from "@/lib/domain/repositories/page.repository";

export class MdxPageRepository implements IPageRepository {
  private readonly aboutPath: string;

  constructor(customPath?: string) {
    this.aboutPath = customPath ?? path.join(process.cwd(), "content/pages/about.mdx");
  }

  public getAboutPage = cache((): AboutPageEntity => {
    if (!fs.existsSync(this.aboutPath)) {
      return { title: "About", content: "" };
    }

    try {
      const source = fs.readFileSync(this.aboutPath, "utf8");
      const { data, content } = matter(source);

      return {
        title: typeof data.title === "string" ? data.title : "About",
        image: typeof data.image === "string" ? data.image : undefined,
        imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : undefined,
        books: Array.isArray(data.books) ? data.books : undefined,
        content,
      };
    } catch (error) {
      console.error("[MdxPageRepository] Error loading about page:", error);
      return { title: "About", content: "" };
    }
  });
}
