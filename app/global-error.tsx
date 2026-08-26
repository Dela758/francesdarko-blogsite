'use client';

import { useEffect } from 'react';
import Link from 'next/link';


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Root Layout Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f7fbec] dark:bg-[#1a1e16] text-[#181d14] dark:text-[#eef3e3] flex items-center justify-center p-6 antialiased font-sans">
        <div className="max-w-md w-full text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c9184] mb-3">
            Critical Error
          </p>
          <h1 className="text-3xl font-serif font-medium mb-4">
            Application Error
          </h1>
          <p className="text-base text-[#474741] dark:text-[#c8c7be] mb-6">
            A critical error occurred in the application root layout.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-[#787770] mb-6">
              Digest: {error.digest}
            </p>
          )}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-[#a68d85] text-[#181d14] rounded text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-widest underline underline-offset-4 text-[#474741] dark:text-[#c8c7be] hover:text-[#a68d85]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
