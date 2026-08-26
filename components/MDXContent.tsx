import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { WordNote } from "@/components/mdx/WordNote";
import { WikiPreview } from "@/components/mdx/WikiPreview";
import { normalizeImageUrl } from "@/lib/utils/image";

const mdxComponents = {
  WordNote,
  WikiPreview,
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={normalizeImageUrl(src)} alt={alt ?? ""} {...props} />
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}

