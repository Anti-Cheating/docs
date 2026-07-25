'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { ArrowUpRight, Menu, Search, X } from 'lucide-react';

const SITE = 'https://www.trueyy.com';

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

      {open && (
        <MobileMenu nav={nav} pathname={pathname} onClose={() => setOpen(false)} />
      )}
    </header>
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
        <div className="tdoc-drawer-util">
          <a href={SITE}>
            trueyy.com <ArrowUpRight size={13} />
          </a>
        </div>
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
