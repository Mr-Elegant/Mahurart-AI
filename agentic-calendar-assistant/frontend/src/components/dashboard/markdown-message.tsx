"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import Link from "next/link";

const styles = {
  root: "markdown-body min-w-0 max-w-full overflow-hidden text-[14.5px] leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  rootUser:
    "[&_a]:text-white [&_a]:underline [&_a]:decoration-white/60 [&_strong]:text-white text-white",
  p: "mb-2.5 last:mb-0 text-slate-200",
  ul: "mb-3 list-disc space-y-1 pl-5 last:mb-0 text-slate-200 marker:text-teal-400",
  ol: "mb-3 list-decimal space-y-1 pl-5 last:mb-0 text-slate-200 marker:text-teal-400",
  li: "leading-relaxed",
  strong: "font-semibold text-white",
  em: "italic text-slate-300",
  codeBlock:
    "block overflow-x-auto rounded-xl bg-slate-950/80 border border-white/10 p-3 text-[13px] font-mono leading-relaxed text-teal-200 shadow-inner",
  codeInline:
    "rounded-md bg-white/[0.08] border border-white/[0.06] px-1.5 py-0.5 text-[12.5px] font-mono font-medium text-teal-300",
  pre: "mb-3 max-w-full overflow-x-auto rounded-xl last:mb-0",
  h1: "mb-2 font-heading text-lg font-bold text-white tracking-tight",
  h2: "mb-2 font-heading text-base font-bold text-white tracking-tight",
  h3: "mb-1.5 text-sm font-semibold text-teal-200",
  blockquote:
    "mb-3 border-l-2 border-teal-500/70 bg-teal-500/[0.05] rounded-r-xl py-1.5 pl-3.5 pr-2 text-slate-300 italic",
} as const;

type Props = {
  content: string;
  className?: string;
  tone?: "assistant" | "user" | "system";
};

export function MarkdownMessage({
  content,
  className,
  tone = "assistant",
}: Props) {
  return (
    <div
      className={cn(styles.root, tone === "user" && styles.rootUser, className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <Link
              href={href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-400 hover:text-teal-300 underline underline-offset-4 decoration-teal-400/40 hover:decoration-teal-400 transition-colors"
            >
              {children}
            </Link>
          ),
          p: ({ children }) => <p className={styles.p}>{children}</p>,
          ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
          li: ({ children }) => <li className={styles.li}>{children}</li>,
          strong: ({ children }) => (
            <strong className={styles.strong}>{children}</strong>
          ),
          em: ({ children }) => <em className={styles.em}>{children}</em>,
          code: ({ children, className: codeClassName }) => {
            const isBlock = Boolean(codeClassName);
            return (
              <code className={isBlock ? styles.codeBlock : styles.codeInline}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
          h1: ({ children }) => <h3 className={styles.h1}>{children}</h3>,
          h2: ({ children }) => <h3 className={styles.h2}>{children}</h3>,
          h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
          blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
