import { readFile } from 'node:fs/promises';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';

// Raw Markdown at /docs-md/<slug> — powers "Copy page" / "View as Markdown".
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  let raw = '';
  if (page.absolutePath) {
    raw = await readFile(page.absolutePath, 'utf8');
  }
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
  const md = [
    `# ${page.data.title}`,
    page.data.description ? `\n${page.data.description}` : '',
    `\n${body}\n`,
  ].join('\n');

  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
