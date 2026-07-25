import { source } from '@/lib/source';

const BASE = 'https://docs.trueyy.com';

// llms.txt — a compact, LLM-friendly index of the docs.
export function GET() {
  const pages = source.getPages();
  const lines = pages
    .slice()
    .sort((a, b) => a.url.localeCompare(b.url))
    .map(
      (p) =>
        `- [${p.data.title}](${BASE}${p.url})${p.data.description ? `: ${p.data.description}` : ''}`,
    )
    .join('\n');

  const content = `# Trueyy SDK

> Documentation for the Trueyy SDK — embed live interview-integrity monitoring into your own ATS. Mint short-lived session tokens on your backend (@trueyy-sdk/node), drop in React components (@trueyy-sdk/web), verify webhooks, and pull reports. Framework-agnostic primitives live in @trueyy-sdk/web-core.

## Docs

${lines}

## Full text

- [llms-full.txt](${BASE}/llms-full.txt): The full markdown of every page in one file.
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
