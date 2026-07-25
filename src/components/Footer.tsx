// Minimal docs footer: brand + copyright. (Utility links live in the header.)
export function Footer() {
  const year = 2026;
  return (
    <footer className="tdoc-footer">
      <div className="tdoc-footer-inner">
        <div className="tdoc-footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trueyy-logo-light.svg" alt="Trueyy" className="tdoc-footer-logo" />
          <p>Real-time interview integrity for remote hiring teams.</p>
        </div>
      </div>
      <div className="tdoc-footer-bottom">
        © {year} Trueyy. All rights reserved.
      </div>
    </footer>
  );
}
