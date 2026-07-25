'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Menu, Search, X } from 'lucide-react';

export type NavItem =
  | { type: 'page'; name: string; url: string }
  | { type: 'separator'; name: string }
  | { type: 'folder'; name: string; url?: string; children: NavItem[] };

export function Navbar({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname() ?? '/';
  const { setOpenSearch } = useSearchContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="tdoc-header">
        <div className="tdoc-nav">
        <a className="tdoc-brand" href="/" aria-label="Trueyy documentation home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trueyy-logo-light.svg" alt="Trueyy" className="tdoc-logo" />
        </a>

        {/* Centered search (desktop). */}
        <div className="tdoc-search-wrap">
          <button
            type="button"
            className="tdoc-search"
            onClick={() => setOpenSearch(true)}
          >
            <Search size={16} />
            <span>Search documentation</span>
            <kbd>⌘K</kbd>
          </button>
        </div>

        <div className="tdoc-right">
          <a
            className="tdoc-gh"
            href="https://github.com/Anti-Cheating/trueyy-sdk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <a className="tdoc-cta" href="https://app.trueyy.com/signup" rel="noopener">
            Start free trial →
          </a>
        </div>

        {/* Mobile control. */}
        <button
          type="button"
          className="tdoc-burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>
        </div>
      </header>

      {open && (
        <MobileMenu nav={nav} pathname={pathname} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

function MobileMenu({
  nav,
  pathname,
  onClose,
}: {
  nav: NavItem[];
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div className="tdoc-drawer" role="dialog" aria-modal="true">
      <div className="tdoc-drawer-top">
        <a className="tdoc-brand" href="/" aria-label="Trueyy documentation home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trueyy-logo-light.svg" alt="Trueyy" className="tdoc-logo" />
        </a>
        <button
          type="button"
          className="tdoc-drawer-close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>

      <nav className="tdoc-drawer-nav" aria-label="Documentation">
        {nav.map((item, i) => (
          <NavNode key={i} item={item} pathname={pathname} />
        ))}
      </nav>

      <div className="tdoc-drawer-foot">
        <a className="tdoc-cta" href="https://app.trueyy.com/signup" rel="noopener">
          Start free trial →
        </a>
      </div>
    </div>
  );
}

function NavNode({ item, pathname }: { item: NavItem; pathname: string }) {
  if (item.type === 'separator') {
    return <div className="tdoc-drawer-sep">{item.name}</div>;
  }
  if (item.type === 'folder') {
    const active = item.children.some(
      (c) => c.type === 'page' && (pathname === c.url || pathname.startsWith(c.url + '/')),
    );
    return (
      <details className="tdoc-drawer-folder" open={active}>
        <summary>{item.name}</summary>
        <div className="tdoc-drawer-children">
          {item.children.map((c, i) => (
            <NavNode key={i} item={c} pathname={pathname} />
          ))}
        </div>
      </details>
    );
  }
  const active = pathname === item.url;
  return (
    <a href={item.url} className={`tdoc-drawer-link${active ? ' active' : ''}`}>
      {item.name}
    </a>
  );
}
