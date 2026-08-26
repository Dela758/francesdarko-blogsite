import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import type { AboutPageContent } from "@/lib/types/content";

const ABOUT_PAGE_PATH = path.join(process.cwd(), "content/pages/about.mdx");

export class PageService {
  /**
   * Retrieves the About page content.
   * Memoized per request using React cache().
   */
  static getAboutPage = cache((): AboutPageContent => {
    if (!fs.existsSync(ABOUT_PAGE_PATH)) {
      return {
        title: "About",
        content: "",
      };
    }

    try {
      const source = fs.readFileSync(ABOUT_PAGE_PATH, "utf8");
      const { data, content } = matter(source);

      return {
        title: typeof data.title === "string" ? data.title : "About",
        image: typeof data.image === "string" ? data.image : undefined,
        imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : undefined,
        content,
      };
    } catch (error) {
      console.error("[PageService] Failed to load about page:", error);
      return {
        title: "About",
        content: "",
      };
    }
  });
}
