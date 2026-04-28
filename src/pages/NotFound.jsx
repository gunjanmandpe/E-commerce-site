import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found" id="not-found-page">
        <div className="not-found-code">404</div>
        <h2>Oops! Page not found</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 400 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-link" id="not-found-home-link">
          ← Back to Catalog
        </Link>
      </div>
    </div>
  );
}
