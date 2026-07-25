import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="tdoc-404">
      <span className="tdoc-404-code">404</span>
      <h1>Page not found</h1>
      <p>This page doesn&apos;t exist or has moved.</p>
      <Link href="/" className="tdoc-cta tdoc-404-cta">
        Back to documentation
      </Link>
    </main>
  );
}
