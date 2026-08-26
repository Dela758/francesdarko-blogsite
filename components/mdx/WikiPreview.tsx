"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface WikiData {
  title: string;
  description?: string;
  extract: string;
  thumbnailUrl?: string;
  pageUrl?: string;
}

interface WikiPreviewProps {
  topic: string;
  label?: string;
  children?: React.ReactNode;
}

export function WikiPreview({ topic, label, children }: WikiPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WikiData | null>(null);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const loadWikiSummary = async () => {
    if (data || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
      );
      if (!res.ok) throw new Error("Not found");
      const json = await res.json();

      setData({
        title: json.titles?.display || json.title,
        description: json.description,
        extract: json.extract,
        thumbnailUrl: json.thumbnail?.source,
        pageUrl: json.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`,
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      loadWikiSummary();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const displayText = children || topic;

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        className="inline-flex items-baseline gap-0.5 cursor-pointer border-b border-dashed border-outline text-inherit underline-offset-4 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        aria-expanded={isOpen}
        title={`Reference note on ${topic}`}
      >
        <span>{displayText}</span>
        {label && (
          <sup className="text-[10px] font-sans font-medium text-tertiary-accent ml-0.5">
            [{label}]
          </sup>
        )}
      </button>

      {isOpen && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-80 -translate-x-1/2 transform rounded-sm border border-outline-variant/60 bg-surface p-4 text-left shadow-xl md:w-96">
          {loading && (
            <span className="metadata block py-4 text-center text-neutral animate-pulse">
              Consulting Wikipedia summary…
            </span>
          )}

          {error && (
            <span className="metadata block py-2 text-neutral">
              Could not retrieve summary for &ldquo;{topic}&rdquo;.
            </span>
          )}

          {data && (
            <span className="block">
              {data.thumbnailUrl && (
                <span className="relative mb-3 block aspect-video w-full overflow-hidden rounded-sm bg-surface-container">
                  <Image
                    src={data.thumbnailUrl}
                    alt={data.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </span>
              )}

              <span className="block">
                <span className="font-serif text-base font-semibold text-on-surface">
                  <span dangerouslySetInnerHTML={{ __html: data.title }} />
                </span>
                {data.description && (
                  <span className="metadata block text-xs text-neutral">
                    {data.description}
                  </span>
                )}
              </span>

              <span className="mt-2 block max-h-36 overflow-y-auto pr-1 text-xs leading-relaxed text-on-surface-variant">
                {data.extract}
              </span>

              <span className="mt-3 flex items-center justify-between border-t border-outline-variant/30 pt-2 metadata text-[11px]">
                <a
                  href={data.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-xs hover:underline"
                >
                  Wikipedia article ↗
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-neutral hover:text-on-surface"
                >
                  Close
                </button>
              </span>
            </span>
          )}

          {/* Arrow */}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-outline-variant/60 bg-surface" />
        </span>
      )}
    </span>
  );
}
