import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import catalogData from '../data/data.json';
import ItemCard from '../components/ItemCard';

const CATEGORY_ORDER = ['Cars', 'Bikes', 'Phones', 'Computers'];
const CATEGORY_ICONS = { Cars: '🚗', Bikes: '🏍️', Phones: '📱', Computers: '💻' };

/* Slideshow data */
const SLIDES = [
  { id: 3, heading: 'Drive The Future', sub: 'Experience cutting-edge electric performance with zero compromises.', tag: 'New Arrival' },
  { id: 5, heading: 'Born To Race', sub: 'Unleash 214 horses of pure Italian engineering on every curve.', tag: 'Featured' },
  { id: 2, heading: 'Capture Every Moment', sub: 'The most powerful iPhone camera system ever reimagined.', tag: 'Bestseller' },
];

const slideItems = SLIDES.map((s) => ({
  ...s,
  item: catalogData.find((i) => i.id === s.id),
})).filter((s) => s.item);

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState(urlCategory || 'All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* Scroll to section if hash exists or if searching */
  useEffect(() => {
    if (searchQuery || location.hash) {
      const id = searchQuery ? 'products' : location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchQuery, location.hash]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slideItems.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  /* Group items */
  const grouped = useMemo(() => {
    const map = {};
    catalogData.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, []);

  /* Filtered items (Search + Category) */
  const filteredItems = useMemo(() => {
    let items = catalogData;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.itemname.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        item.itemprops.some(p => p.value.toLowerCase().includes(q))
      );
    }
    if (activeFilter !== 'All') {
      items = items.filter((item) => item.category === activeFilter);
    }
    return items;
  }, [activeFilter, searchQuery]);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    const params = {};
    if (cat !== 'All') params.category = cat;
    if (searchQuery) params.q = searchQuery;
    setSearchParams(params);
  };

  const current = slideItems[currentSlide];

  /* Deals data */
  const dealItems = useMemo(() => catalogData.slice(12, 16), []);

  return (
    <main>
      {/* ===== HERO SLIDESHOW ===== */}
      {!searchQuery && (
        <section className="hero-slideshow" id="home">
          {slideItems.map((slide, i) => (
            <div key={slide.item.id} className={`hero-bg ${i === currentSlide ? 'active' : ''}`}>
              <img src={slide.item.image} alt="" className="hero-bg-img" />
            </div>
          ))}
          <div className="hero-overlay"></div>

          <div className="hero-content" key={current.item.id}>
            <span className="hero-tag">{current.tag}</span>
            <h1 className="hero-heading">{current.heading}</h1>
            <p className="hero-sub">{current.sub}</p>
            <Link to={`/item/${current.item.id}`} className="hero-cta-primary">
              Shop Now →
            </Link>
          </div>

          <div className="hero-dots">
            {slideItems.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ===== CATALOG SECTION ===== */}
      <section className="catalog-layout" id="products">
        <aside className="catalog-sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <ul className="sidebar-list">
            <li>
              <button className={`sidebar-item ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => handleFilter('All')}>
                <span className="sidebar-icon">📦</span>
                <span>All Products</span>
              </button>
            </li>
            {CATEGORY_ORDER.map((cat) => (
              <li key={cat}>
                <button className={`sidebar-item ${activeFilter === cat ? 'active' : ''}`} onClick={() => handleFilter(cat)}>
                  <span className="sidebar-icon">{CATEGORY_ICONS[cat]}</span>
                  <span>{cat}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="catalog-main" id="catalog-content">
          <div className="catalog-topbar">
            <h2 className="catalog-title">
              {searchQuery ? `Search results for "${searchQuery}"` : activeFilter}
              <span className="catalog-title-count">{filteredItems.length} items</span>
            </h2>
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchParams({})}>Clear Search</button>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <div className="items-grid">
              {filteredItems.map((item, i) => (
                <ItemCard key={item.id} item={item} index={i} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No products found matching your search.</p>
              <button className="sidebar-promo-btn" onClick={() => setSearchParams({})}>Browse All Products</button>
            </div>
          )}
        </div>
      </section>

      {/* ===== DEALS SECTION ===== */}
      {!searchQuery && (
        <section className="deals-section" id="deals">
          <div className="section-header-centered">
            <span className="hero-tag" style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}>Flash Sale</span>
            <h2 className="section-title-large">Limited Time Deals</h2>
            <p className="section-subtitle">Exclusive discounts on our top-rated tech and automotive collection.</p>
          </div>
          <div className="items-grid">
            {dealItems.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ===== ABOUT SECTION ===== */}
      {!searchQuery && (
        <section className="about-section" id="about">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-title-large">Experience the Next Generation of Shopping</h2>
              <p>CatalogX is more than just a marketplace. We curate the finest selection of electric vehicles, precision-engineered motorcycles, and state-of-the-art consumer electronics.</p>
              <p>Our mission is to bridge the gap between performance and accessibility, providing you with detailed specifications and immersive visuals.</p>
              <div className="about-stats">
                <div className="stat-item"><h3>500+</h3><p>Products</p></div>
                <div className="stat-item"><h3>50k+</h3><p>Customers</p></div>
                <div className="stat-item"><h3>24/7</h3><p>Support</p></div>
              </div>
            </div>
            <div className="about-image-card">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" alt="About" />
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <span className="footer-brand">CatalogX</span>
        <p>&copy; 2026 CatalogX Assignment. All rights reserved.</p>
      </footer>
    </main>
  );
}
