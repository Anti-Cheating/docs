'use client';

import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

// Public origin so ChatGPT can fetch the page (works once deployed).
const CANONICAL = 'https://docs.trueyy.com';

// Floating "Ask ChatGPT" button (bottom-right). Opens ChatGPT pre-loaded with
// the CURRENT page's raw markdown as context.
export function AskChatGptFab() {
  const pathname = usePathname() ?? '/';
  const slug = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const mdAbs = slug ? `${CANONICAL}/docs-md/${slug}` : `${CANONICAL}/docs-md`;
  const prompt = `I'm reading the Trueyy SDK documentation. Use this page as context and help me with it: ${mdAbs}`;
  const url = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`;

  return (
    <a
      className="tdoc-fab"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ask ChatGPT about this page"
    >
      <Sparkles size={18} />
      <span>Ask ChatGPT</span>
    </a>
  );
}
