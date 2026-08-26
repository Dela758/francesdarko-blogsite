'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="container-content pb-20 pt-16 text-center md:pb-28 md:pt-24 fade-in">
      <p className="label-caps text-neutral mb-4">Something went wrong</p>
      <h1 className="display-lg mb-6">An Unexpected Error Occurred</h1>
      <p className="body-lg text-on-surface-variant max-w-xl mx-auto mb-8">
        We encountered an issue while loading this page. You can try refreshing or resetting the view.
      </p>
      {error.digest && (
        <p className="metadata mb-8 text-xs font-mono text-outline">
          Error Digest: {error.digest}
        </p>
      )}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => reset()}
          className="btn-primary cursor-pointer"
        >
          Try Again
        </button>
        <Link href="/" className="text-link label-caps">
          Return Home
        </Link>
      </div>
    </div>
  );
}
