'use client';

import { useState } from 'react';
import { Check, Copy, FileText } from 'lucide-react';

export function CopyMarkdownButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const mdUrl = slug ? `/docs-md/${slug}` : '/docs-md';

  async function copy() {
    try {
      const res = await fetch(mdUrl);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  }

  const base =
    'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors';

  return (
    <div className="not-prose mb-8 flex flex-wrap items-center gap-2 border-b border-fd-border pb-5">
      <button
        type="button"
        onClick={copy}
        className={`${base} border-fd-border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground`}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? 'Copied' : 'Copy page'}
      </button>

      <a
        href={mdUrl}
        target="_blank"
        rel="noreferrer"
        className={`${base} border-fd-border text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground`}
      >
        <FileText className="size-3.5" />
        View as Markdown
      </a>
    </div>
  );
}
