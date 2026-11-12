import Link from 'next/link';

export const metadata = { title: 'Page not found' };

// A quiet 404 on the guide lines: a hairline with a node, the message, two links.
export default function NotFound() {
  return (
    <main id="site-main" className="page field-dark" style={{ display: 'grid', alignContent: 'center', gap: 24, padding: 'var(--pad)' }}>
      <div className="hair" style={{ position: 'relative', maxWidth: 720 }}>
        <span className="node" style={{ left: 0, top: 0 }} />
        <span className="node" style={{ left: '100%', top: 0 }} />
      </div>
      <p className="t-label">404</p>
      <h1 className="t-h1">This page is not on the grid.</h1>
      <p className="t-lead muted" style={{ maxWidth: '34em' }}>The address does not match any page of the Best Grid brand system.</p>
      <p className="row" style={{ gap: 12 }}>
        <Link className="btn btn-active" href="/overview/">
          <span>Go to the overview</span>
        </Link>
        <Link className="btn btn-ghost" href="/overview/?index=1">
          <span>Open the index</span>
        </Link>
      </p>
    </main>
  );
}
