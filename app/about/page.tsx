import type { Metadata } from "next";
import Image from "next/image";
import { ReadingShelf } from "@/components/bookshelf/ReadingShelf";
import { MDXContent } from "@/components/MDXContent";
import { container } from "@/lib/application/container";
import { siteConfig } from "@/lib/infrastructure/config/site.config";
import { normalizeImageUrl, isExternalUnoptimizedUrl } from "@/lib/utils/image";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.author}, writer and observer of quiet moments.`,
};

export default function AboutPage() {
  const about = container.getAboutPage.execute();
  const imageUrl = normalizeImageUrl(about.image);
  const isUnoptimized = isExternalUnoptimizedUrl(about.image) || isExternalUnoptimizedUrl(imageUrl);

  return (
    <div className="container-content pb-20 pt-4 md:pb-28">
      <header className="fade-in mb-16 text-center md:mb-20">
        <h1 className="display-lg">{about.title}</h1>
      </header>

      <div className="fade-in mx-auto grid max-w-3xl gap-12 md:grid-cols-[240px_1fr] md:items-start md:gap-16">
        <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-sm bg-surface-container md:mx-0 md:w-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={about.imageAlt ?? `Portrait of ${siteConfig.author}`}
              fill
              className="object-cover"
              sizes="240px"
              unoptimized={isUnoptimized}
            />
          )}
        </div>

        <div className="prose-content">
          <MDXContent source={about.content} />
        </div>
      </div>

      <div className="fade-in">
        <ReadingShelf books={about.books} />
      </div>
    </div>
  );
}

