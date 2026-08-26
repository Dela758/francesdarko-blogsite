"use client";

import React, { useState, useEffect, useRef } from "react";

interface WordDefinition {
  word: string;
  phonetic?: string;
  audio?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
}

interface WordNoteProps {
  word: string;
  children?: React.ReactNode;
}

export function WordNote({ word, children }: WordNoteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WordDefinition | null>(null);
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

  const loadDefinition = async () => {
    if (data || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`
      );
      if (!res.ok) throw new Error("Not found");
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        const item = json[0];
        const audioUrl =
          item.phonetics?.find((p: { audio?: string }) => p.audio && p.audio.length > 0)
            ?.audio || "";

        setData({
          word: item.word,
          phonetic: item.phonetic || item.phonetics?.[0]?.text,
          audio: audioUrl,
          meanings: item.meanings || [],
        });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      loadDefinition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data?.audio) {
      const audio = new Audio(data.audio);
      audio.play().catch(() => {});
    }
  };

  const displayWord = children || word;

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        className="cursor-pointer border-b border-dotted border-tertiary-accent text-inherit underline-offset-4 transition-colors hover:text-tertiary-accent hover:border-solid focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tertiary-accent"
        aria-expanded={isOpen}
        title={`Look up "${word}"`}
      >
        {displayWord}
      </button>

      {isOpen && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 transform rounded-sm border border-outline-variant/60 bg-surface p-4 text-left shadow-lg md:w-80">
          <span className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
            <span className="flex items-center gap-2">
              <span className="font-serif text-lg font-medium text-on-surface">
                {data?.word || word}
              </span>
              {data?.phonetic && (
                <span className="metadata text-xs text-neutral">
                  {data.phonetic}
                </span>
              )}
            </span>

            {data?.audio && (
              <button
                type="button"
                onClick={playAudio}
                className="cursor-pointer rounded p-1 text-neutral transition-colors hover:text-on-surface"
                title="Listen to pronunciation"
                aria-label="Listen to pronunciation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </button>
            )}
          </span>

          <span className="mt-3 block text-sm">
            {loading && (
              <span className="metadata block py-2 text-center text-neutral animate-pulse">
                Fetching etymology…
              </span>
            )}

            {error && (
              <span className="metadata block text-neutral">
                No entry found for &ldquo;{word}&rdquo;.
              </span>
            )}

            {data && (
              <span className="block space-y-2 max-h-48 overflow-y-auto pr-1">
                {data.meanings.slice(0, 2).map((meaning, mIdx) => (
                  <span key={mIdx} className="block">
                    <span className="label-caps block text-[10px] text-tertiary-accent mb-0.5">
                      {meaning.partOfSpeech}
                    </span>
                    <span className="block text-xs leading-relaxed text-on-surface-variant">
                      {meaning.definitions[0]?.definition}
                    </span>
                    {meaning.definitions[0]?.example && (
                      <span className="mt-1 block font-serif italic text-xs text-neutral">
                        &ldquo;{meaning.definitions[0].example}&rdquo;
                      </span>
                    )}
                  </span>
                ))}
              </span>
            )}
          </span>

          <span className="mt-3 flex items-center justify-between border-t border-outline-variant/30 pt-2 metadata text-[10px] text-neutral">
            <span>Free Dictionary API</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer hover:text-on-surface"
            >
              Close
            </button>
          </span>

          {/* Tooltip arrow */}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-outline-variant/60 bg-surface" />
        </span>
      )}
    </span>
  );
}
