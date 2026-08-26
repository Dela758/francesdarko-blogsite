import Link from "next/link";
import { DailyStanza } from "@/components/DailyStanza";
import { PostCard } from "@/components/post/PostCard";
import { container } from "@/lib/application/container";
import { siteConfig } from "@/lib/infrastructure/config/site.config";

export default function HomePage() {
  const featuredPost = container.getFeaturedPost.execute();
  const archive = container.getPostArchive.execute();
  const recentPosts = archive.posts
    .filter((p) => p.slug !== featuredPost?.slug)
    .slice(0, 3);

  return (
    <>
      <section className="container-content pb-16 pt-12 text-center md:pb-24 md:pt-16">
        <div className="fade-in">
          <h1 className="display-lg mx-auto max-w-2xl">{siteConfig.tagline}</h1>

          <DailyStanza />

          <div className="mx-auto mt-12 h-px w-11 bg-outline-variant/60" />
        </div>
      </section>

      {featuredPost && (
        <section className="pb-20 md:pb-28">
          <PostCard.Hero post={featuredPost} />
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="container-content pb-20 md:pb-28">
          <hr className="divider mb-10" />
          <p className="label-caps text-neutral mb-2">Recent Notes</p>

          <div>
            {recentPosts.map((post, index) => (
              <div key={post.slug}>
                <PostCard.ListItem post={post} />
                {index < recentPosts.length - 1 && <hr className="divider" />}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/essays" className="text-link label-caps">
              View Archive
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
