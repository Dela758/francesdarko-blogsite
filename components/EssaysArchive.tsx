"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/post/PostCard";
import { TagBadge } from "@/components/TagBadge";
import { TagFilterGroup } from "@/components/ui/TagFilterGroup";
import type { PostSummary } from "@/lib/types/content";

interface EssaysArchiveProps {
  posts: PostSummary[];
  tags: string[];
}

export function EssaysArchive({ posts, tags }: EssaysArchiveProps) {
  const searchParams = useSearchParams();
  const initialTagParam = searchParams.get("tag");

  const [activeTag, setActiveTag] = useState<string>(() => {
    if (initialTagParam) {
      const match = tags.find(
        (t) => t.toLowerCase() === initialTagParam.toLowerCase()
      );
      if (match) return match;
    }
    return "All";
  });

  const [, startTransition] = useTransition();

  // Sync state if URL query changes externally
  useEffect(() => {
    const urlTag = searchParams.get("tag");
    if (urlTag) {
      const match = tags.find(
        (t) => t.toLowerCase() === urlTag.toLowerCase()
      );
      if (match && match !== activeTag) {
        setActiveTag(match);
      }
    } else if (!urlTag && activeTag !== "All") {
      setActiveTag("All");
    }
  }, [searchParams, tags, activeTag]);

  const handleSelectTag = (tag: string) => {
    startTransition(() => {
      setActiveTag(tag);

      // Update URL query parameter seamlessly without full navigation reload
      const url = new URL(window.location.href);
      if (tag === "All") {
        url.searchParams.delete("tag");
      } else {
        url.searchParams.set("tag", tag);
      }
      window.history.replaceState({}, "", url.toString());
    });
  };

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter(
      (post) =>
        post.frontmatter.tags &&
        post.frontmatter.tags.some(
          (t) => t.toLowerCase() === activeTag.toLowerCase()
        )
    );
  }, [posts, activeTag]);

  return (
    <div>
      {tags.length > 0 && (
        <TagFilterGroup
          tags={tags}
          activeTag={activeTag}
          onSelectTag={handleSelectTag}
        />
      )}

      {activeTag !== "All" && (
        <div className="mb-8 flex items-center justify-center gap-3 text-sm text-on-surface-variant">
          <span>
            Showing essays filed under <strong>{activeTag}</strong> ({filteredPosts.length})
          </span>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleSelectTag("All")}
            className="text-link text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      )}

      <div className="fade-in">
        {filteredPosts.map((post, index) => (
          <div key={post.slug}>
            <PostCard.ListItem post={post} />
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <TagBadge
                    key={tag}
                    tag={tag}
                    isActive={activeTag.toLowerCase() === tag.toLowerCase()}
                    onClick={() => handleSelectTag(tag)}
                  />
                ))}
              </div>
            )}
            {index < filteredPosts.length - 1 && <hr className="divider" />}
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-12">
          <PostCard.Empty
            title="No essays found"
            description={`No essays were found under topic "${activeTag}".`}
          />
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => handleSelectTag("All")}
              className="btn-primary cursor-pointer"
            >
              Show All Essays
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
