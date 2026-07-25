'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

const CANONICAL = 'https://docs.trueyy.com';
// Keep the prompt well under ChatGPT's URL limit; most pages fit easily.
const MAX_CHARS = 6000;

// Floating "Ask ChatGPT" button. Opens ChatGPT pre-loaded with the CURRENT
// page's markdown *as text* in the prompt — so ChatGPT has the context directly
// and never needs to browse/fetch the (possibly un-indexed) URL.
export function AskChatGptFab() {
  const pathname = usePathname() ?? '/';
  const slug = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const mdPath = slug ? `/docs-md/${slug}` : '/docs-md';
  const [md, setMd] = useState('');

  useEffect(() => {
    let active = true;
    fetch(mdPath)
      .then((r) => r.text())
      .then((t) => {
        if (active) setMd(t);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [mdPath]);

  const url = `${CANONICAL}${mdPath}`;
  let body = md.trim();
  if (body.length > MAX_CHARS) {
    body = body.slice(0, MAX_CHARS) + `\n\n…(truncated — full page: ${url})`;
  }
  const prompt = body
    ? `I'm reading the Trueyy SDK documentation. Here is the page (source: ${url}). Use it as context and help me with my questions.\n\n---\n\n${body}`
    : `Help me with the Trueyy SDK documentation. This page: ${url}`;
  const href = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;

  return (
    <a
      className="tdoc-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ask ChatGPT about this page"
    >
      <Sparkles size={18} />
      <span>Ask ChatGPT</span>
    </a>
  );
}
