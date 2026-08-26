import { Suspense } from "react";
import type { Metadata } from "next";
import { EssaysArchive } from "@/components/EssaysArchive";
import { PostCard } from "@/components/post/PostCard";
import { container } from "@/lib/application/container";

export const metadata: Metadata = {
  title: "Cesi's Ponderings✨",
  description: "A complete archive of essays and notes on living deliberately.",
};

export default function EssaysPage() {
  const { posts, tags } = container.getPostArchive.execute();

  return (
    <div className="container-content pb-20 pt-4 md:pb-28">
      <header className="fade-in mb-16 text-center md:mb-20">
        <h1 className="display-lg">Cesi&apos;s Ponderings✨</h1>
        <p className="body-lg mx-auto mt-6 max-w-xl text-on-surface-variant">
          A collection of observations on memory, silence, and the quiet
          architectures of daily life.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-4">
            <PostCard.Skeleton />
            <PostCard.Skeleton />
            <PostCard.Skeleton />
          </div>
        }
      >
        <EssaysArchive posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
