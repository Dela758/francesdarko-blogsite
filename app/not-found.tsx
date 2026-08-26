import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content pb-20 pt-16 text-center md:pb-28 md:pt-24 fade-in">
      <p className="label-caps text-neutral mb-4">404 Error</p>
      <h1 className="display-lg mb-6">Page Not Found</h1>
      <p className="body-lg text-on-surface-variant max-w-xl mx-auto mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="text-link label-caps">
        Return Home
      </Link>
    </div>
  );
}

