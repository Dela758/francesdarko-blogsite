"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/infrastructure/config/site.config";

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const commentsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { repo, repoId, category, categoryId } = siteConfig.giscus;
  const isConfigured = Boolean(repo && repoId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !commentsRef.current || !isConfigured) return;

    // Clear existing script and iframe DOM nodes
    commentsRef.current.innerHTML = "";

    const theme = resolvedTheme === "dark" ? "dark" : "light";
    const script = document.createElement("script");

    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentsRef.current.appendChild(script);
  }, [mounted, resolvedTheme, repo, repoId, category, categoryId, isConfigured]);

  if (!mounted) {
    return (
      <section className="mt-16 border-t border-outline-variant/70 pt-12" aria-label="Comments">
        <h2 className="headline-sm mb-8 text-center">Comments & Discussion</h2>
        <div className="min-h-[160px] animate-pulse bg-surface-container-high/40 rounded-sm" />
      </section>
    );
  }

  return (
    <section className="mt-16 border-t border-outline-variant/70 pt-12 fade-in" aria-label="Comments">
      <h2 className="headline-sm mb-8 text-center">Comments & Discussion</h2>

      {isConfigured ? (
        <div ref={commentsRef} className="giscus-container min-h-[160px]" />
      ) : (
        <div className="mx-auto max-w-xl rounded-sm border border-outline-variant/60 bg-surface-container-low p-8 text-center">
          <p className="headline-sm mb-2 text-on-surface">Giscus Comments Ready</p>
          <p className="body-lg text-on-surface-variant mb-4">
            GitHub Discussions commenting is integrated! To enable live comments, set your GitHub repository details in <code className="rounded bg-surface-container px-2 py-0.5 text-sm">.env.local</code>:
          </p>
          <pre className="mx-auto max-w-md overflow-x-auto rounded bg-background p-4 text-left font-mono text-xs text-on-surface">
            {`NEXT_PUBLIC_GISCUS_REPO="your-user/your-repo"
NEXT_PUBLIC_GISCUS_REPO_ID="R_kwDO..."
NEXT_PUBLIC_GISCUS_CATEGORY="Announcements"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="DIC_kwDO..."`}
          </pre>
          <p className="metadata mt-4">
            Get your IDs instantly at <a href="https://giscus.app" target="_blank" rel="noopener noreferrer" className="text-link">giscus.app</a>.
          </p>
        </div>
      )}
    </section>
  );
}
