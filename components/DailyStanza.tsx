"use client";

import { useEffect, useState, useTransition } from "react";

interface Poem {
  title: string;
  author: string;
  lines: string[];
}

const FALLBACK_POEMS: Poem[] = [
  {
    title: "Letters to a Young Poet",
    author: "Rainer Maria Rilke",
    lines: [
      "Let everything happen to you: beauty and terror.",
      "Just keep going. No feeling is final.",
    ],
  },
  {
    title: "Hope is the thing with feathers",
    author: "Emily Dickinson",
    lines: [
      "Hope is the thing with feathers",
      "That perches in the soul,",
      "And sings the tune without the words,",
      "And never stops at all,",
    ],
  },
  {
    title: "The Solitary Reaper",
    author: "William Wordsworth",
    lines: [
      "Behold her, single in the field,",
      "Yon solitary Highland Lass!",
      "Reaping and singing by herself;",
      "Stop here, or gently pass!",
    ],
  },
  {
    title: "Ode on a Grecian Urn",
    author: "John Keats",
    lines: [
      "Thou still unravish'd bride of quietness,",
      "Thou foster-child of silence and slow time.",
    ],
  },
  {
    title: "Haiku",
    author: "Matsuo Bashō",
    lines: [
      "The old pond—",
      "a frog leaps in,",
      "sound of water.",
    ],
  },
];

export function DailyStanza() {
  const [poem, setPoem] = useState<Poem>(FALLBACK_POEMS[0]);
  const [isPending, startTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);

  const fetchRandomPoem = async () => {
    try {
      const res = await fetch("https://poetrydb.org/random/1", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].lines) {
        const item = data[0];
        // Take a clean short slice of lines (up to 4 lines)
        const meaningfulLines = item.lines
          .filter((l: string) => l.trim().length > 0)
          .slice(0, 4);

        if (meaningfulLines.length > 0) {
          setPoem({
            title: item.title,
            author: item.author,
            lines: meaningfulLines,
          });
          return;
        }
      }
    } catch {
      // Pick another random fallback if API fails
      const randomIndex = Math.floor(Math.random() * FALLBACK_POEMS.length);
      setPoem(FALLBACK_POEMS[randomIndex]);
    }
  };

  useEffect(() => {
    // Initial fetch to load a fresh stanza on mount
    fetchRandomPoem();
  }, []);

  const handleRefresh = () => {
    startTransition(() => {
      fetchRandomPoem();
    });
  };

  return (
    <div
      className="mx-auto mt-10 max-w-xl text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-sm border border-outline-variant/30 bg-surface-container-low/60 px-6 py-6 transition-all duration-300 hover:border-outline-variant/60">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="label-caps text-neutral text-[11px]">Daily Stanza</span>
          <span className="text-neutral/40">·</span>
          <span className="metadata text-xs text-neutral">PoetryDB</span>
        </div>

        <blockquote
          className={`font-serif text-lg leading-relaxed text-on-surface transition-opacity duration-300 md:text-xl ${
            isPending ? "opacity-40" : "opacity-100"
          }`}
        >
          {poem.lines.map((line, idx) => (
            <p key={idx} className="italic">
              {line}
            </p>
          ))}
        </blockquote>

        <div className="mt-4 flex items-center justify-center gap-3">
          <cite className="metadata not-italic text-on-surface-variant text-sm">
            — {poem.author}
            {poem.title && (
              <span className="text-neutral text-xs ml-1">
                ({poem.title.length > 35 ? poem.title.slice(0, 32) + "..." : poem.title})
              </span>
            )}
          </cite>

          <button
            onClick={handleRefresh}
            title="Read another stanza"
            aria-label="Read another stanza"
            className={`cursor-pointer rounded-full p-1 text-neutral transition-all duration-200 hover:text-on-surface focus-visible:outline-none ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90 md:opacity-40"
            }`}
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
              className={isPending ? "animate-spin" : ""}
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
