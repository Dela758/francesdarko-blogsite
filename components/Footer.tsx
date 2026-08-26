import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-20 bg-surface-container-low py-16 transition-colors duration-400 md:mt-28 md:py-20"
      role="contentinfo"
    >
      <div className="container-content text-center">
        <Link
          href="/"
          className="font-serif text-lg tracking-normal font-medium uppercase text-on-surface transition-opacity duration-300 hover:opacity-70 md:text-xl whitespace-nowrap"
        >
          {siteConfig.name}
        </Link>

        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-8"
          aria-label="Footer navigation"
        >
          <a
            href={siteConfig.social.instagram}
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={siteConfig.social.linkedin}
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.social.substack}
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Substack
          </a>
          <Link href="/essays" className="nav-link">
            Archive
          </Link>
          <a href="/rss.xml" className="nav-link" target="_blank" rel="noopener noreferrer">
            RSS Feed
          </a>
        </nav>

        <p className="metadata mt-10 text-neutral">
          © {currentYear} {siteConfig.name}. Crafted with intention.
        </p>
      </div>
    </footer>
  );
}
