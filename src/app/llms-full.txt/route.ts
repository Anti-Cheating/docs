import { readFile } from 'node:fs/promises';
import { source } from '@/lib/source';

// llms-full.txt — the full markdown of every page concatenated, for LLMs that
// want the entire docs corpus in one request.
export async function GET() {
  const pages = source
    .getPages()
    .slice()
    .sort((a, b) => a.url.localeCompare(b.url));

  const parts = await Promise.all(
    pages.map(async (p) => {
      let raw = '';
      if (p.absolutePath) {
        try {
          raw = await readFile(p.absolutePath, 'utf8');
        } catch {
          /* ignore unreadable page */
        }
      }
      const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
      return `# ${p.data.title}\n${p.data.description ? `\n${p.data.description}\n` : ''}\n${body}`;
    }),
  );

  return new Response(parts.join('\n\n---\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
