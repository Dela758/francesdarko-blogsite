"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Book {
  isbn: string;
  title: string;
  author: string;
  status: "Currently Reading" | "Re-reading" | "Foundational";
  note: string;
  coverUrl?: string;
  pageCount?: number;
  publishYear?: string;
}

const INITIAL_BOOKS: Book[] = [
  {
    isbn: "9780807064733",
    title: "The Poetics of Space",
    author: "Gaston Bachelard",
    status: "Currently Reading",
    note: "On intimate domestic architecture, attics, drawers, and nested quietude.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780807064733-M.jpg",
    publishYear: "1958",
  },
  {
    isbn: "9780393310399",
    title: "Letters to a Young Poet",
    author: "Rainer Maria Rilke",
    status: "Re-reading",
    note: "A companion for patience, solitary reflection, and creative persistence.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780393310399-M.jpg",
    publishYear: "1929",
  },
  {
    isbn: "9780918172020",
    title: "In Praise of Shadows",
    author: "Jun'ichirō Tanizaki",
    status: "Foundational",
    note: "Classic essay on Japanese aesthetics, subtle light, and subdued tones.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780918172020-M.jpg",
    publishYear: "1977",
  },
  {
    isbn: "9780060919887",
    title: "The Writing Life",
    author: "Annie Dillard",
    status: "Foundational",
    note: "Unflinching and poetic accounts of the solitary craft of writing.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780060919887-M.jpg",
    publishYear: "1989",
  },
];

interface ReadingShelfProps {
  books?: Book[];
}

export function ReadingShelf({ books: customBooks }: ReadingShelfProps) {
  const activeInitial = customBooks && customBooks.length > 0 ? customBooks : INITIAL_BOOKS;
  const [books, setBooks] = useState<Book[]>(activeInitial);

  useEffect(() => {
    const list = customBooks && customBooks.length > 0 ? customBooks : INITIAL_BOOKS;
    setBooks(list);

    async function enrichFromOpenLibrary() {
      try {
        const isbns = list.map((b) => `ISBN:${b.isbn}`).join(",");
        const res = await fetch(
          `https://openlibrary.org/api/books?bibkeys=${isbns}&format=json&jscmd=data`
        );
        if (!res.ok) return;
        const data = await res.json();

        setBooks((prev) =>
          prev.map((book) => {
            const key = `ISBN:${book.isbn}`;
            const apiData = data[key];
            if (!apiData) return book;

            return {
              ...book,
              title: apiData.title || book.title,
              author:
                apiData.authors?.[0]?.name || book.author,
              coverUrl:
                apiData.cover?.medium ||
                apiData.cover?.large ||
                `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
              pageCount: apiData.number_of_pages,
              publishYear: apiData.publish_date || book.publishYear,
            };
          })
        );
      } catch {
        // Keep initial values
      }
    }

    enrichFromOpenLibrary();
  }, [customBooks]);

  return (
    <section className="mt-20 border-t border-outline-variant/60 pt-16">
      <div className="text-center mb-12">
        <span className="label-caps text-neutral mb-2 block">Curated Bookshelf</span>
        <h2 className="headline-md font-serif">On the Desk</h2>
        <p className="metadata mt-2 text-on-surface-variant max-w-lg mx-auto">
          Works on stillness, memory, and language that inform these essays. Synced with the Open Library public catalog.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.isbn}
            className="group flex flex-col justify-between rounded-sm border border-outline-variant/40 bg-surface-container-low/40 p-4 transition-all duration-300 hover:border-outline-variant hover:bg-surface-container-low"
          >
            <div>
              {/* Book Cover */}
              <div className="relative mx-auto mb-4 aspect-[2/3] w-32 overflow-hidden rounded-sm bg-surface-container shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                {book.coverUrl ? (
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-2 text-center metadata text-xs text-neutral">
                    {book.title}
                  </div>
                )}
              </div>

              {/* Status Tag */}
              <div className="mb-2 text-center">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider ${
                    book.status === "Currently Reading"
                      ? "bg-tertiary-accent/20 text-tertiary"
                      : "bg-surface-container text-neutral"
                  }`}
                >
                  {book.status}
                </span>
              </div>

              {/* Title & Author */}
              <h3 className="font-serif text-base font-medium text-center text-on-surface leading-snug line-clamp-2">
                {book.title}
              </h3>
              <p className="metadata text-xs text-neutral text-center mt-0.5">
                {book.author}
                {book.publishYear ? ` (${book.publishYear.slice(-4)})` : ""}
              </p>

              {/* Frances's Note */}
              <p className="mt-3 font-serif italic text-xs text-on-surface-variant/90 leading-relaxed text-center">
                &ldquo;{book.note}&rdquo;
              </p>
            </div>

            {/* Open Library Link */}
            <div className="mt-4 pt-3 border-t border-outline-variant/20 text-center">
              <a
                href={`https://openlibrary.org/isbn/${book.isbn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="metadata text-[11px] text-link hover:underline inline-flex items-center gap-1"
              >
                Open Library catalog ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
