import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync search value with URL
  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/?q=${encodeURIComponent(searchValue.trim())}#products`);
    } else {
      navigate('/');
    }
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const isActive = (hash) => location.pathname === '/' && location.hash === hash;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setIsSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/#home" className="navbar-logo" id="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="navbar-logo-icon">CX</span>
          <span className="logo-text">CatalogX</span>
        </Link>

        {/* Navigation Links (Desktop) / Mobile Menu Overlay */}
        <div className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link
            to="/#home"
            className={`navbar-link ${location.pathname === '/' && (!location.hash || location.hash === '#home') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/#products"
            className={`navbar-link ${isActive('#products') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/#deals"
            className={`navbar-link ${isActive('#deals') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Deals
          </Link>
          <Link
            to="/#about"
            className={`navbar-link ${isActive('#about') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          
          {/* Sign In (Only visible in mobile menu) */}
          <Link to="/" className="navbar-link mobile-only-link" onClick={() => setMobileMenuOpen(false)}>
            Sign In
          </Link>
        </div>

        {/* Search Bar */}
        <form className={`navbar-search-form ${isSearchOpen ? 'open' : ''}`} onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="search-submit-icon">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Search Toggle (Mobile) */}
          <button
            className="mobile-search-toggle"
            onClick={toggleMobileSearch}
            aria-label="Toggle search"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          
          {/* Cart (Placeholder) */}
          <button className="navbar-cart-btn desktop-only" id="navbar-cart" aria-label="Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          </button>

          {/* Sign In (Desktop) */}
          <Link to="/" className="navbar-signin-btn desktop-only" id="navbar-signin">
            Sign In
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`navbar-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && <div className="navbar-backdrop" onClick={() => setMobileMenuOpen(false)}></div>}
    </nav>
  );
}
