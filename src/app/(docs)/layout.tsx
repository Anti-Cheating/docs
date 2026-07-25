import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { Navbar, type NavItem } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GitHubFab } from '@/components/GitHubFab';

// Serialise Fumadocs' page tree into a plain, client-safe structure for the
// mobile drawer.
type TreeNode = {
  type: string;
  name?: unknown;
  url?: string;
  index?: { url?: string };
  children?: TreeNode[];
};

function toNav(nodes: TreeNode[] = []): NavItem[] {
  return nodes.map((n): NavItem => {
    const name = typeof n.name === 'string' ? n.name : String(n.name ?? '');
    if (n.type === 'folder') {
      return {
        type: 'folder',
        name,
        url: n.index?.url,
        children: toNav(n.children ?? []),
      };
    }
    if (n.type === 'separator') return { type: 'separator', name };
    return { type: 'page', name, url: n.url ?? '#' };
  });
}

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  const nav = toNav((source.pageTree as unknown as { children?: TreeNode[] }).children);
  return (
    <>
      <Navbar nav={nav} />
      <DocsLayout
        tree={source.pageTree}
        nav={{ enabled: false }}
        themeSwitch={{ enabled: false }}
        searchToggle={{ enabled: false }}
        sidebar={{ collapsible: true }}
      >
        {children}
      </DocsLayout>
      <Footer />
      <GitHubFab />
    </>
  );
}
