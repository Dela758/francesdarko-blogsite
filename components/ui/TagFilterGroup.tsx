"use client";

import { TagBadge } from "../TagBadge";

export interface TagFilterGroupProps {
  tags: string[];
  activeTag?: string;
  onSelectTag?: (tag: string) => void;
  allLabel?: string;
}

export function TagFilterGroup({
  tags,
  activeTag = "All",
  onSelectTag,
  allLabel = "All",
}: TagFilterGroupProps) {
  const allTags = [allLabel, ...tags];

  return (
    <nav
      className="mb-12 flex flex-wrap justify-center gap-3"
      aria-label="Filter by topic"
      role="tablist"
    >
      {allTags.map((tag) => {
        const isSelected = activeTag.toLowerCase() === tag.toLowerCase();
        return (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectTag?.(tag)}
            className={`cursor-pointer transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-full ${
              isSelected ? "scale-105" : "opacity-75 hover:opacity-100"
            }`}
          >
            <TagBadge tag={tag} isActive={isSelected} />
          </button>
        );
      })}
    </nav>
  );
}
