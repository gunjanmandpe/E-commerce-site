import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import catalogData from '../data/data.json';
import ItemCard from '../components/ItemCard';

const CATEGORY_ICONS = {
  Cars: '🚗',
  Bikes: '🏍️',
  Phones: '📱',
  Computers: '💻',
};

export default function ItemDetail() {
  const { id } = useParams();
  const itemId = parseInt(id, 10);

  /* Find the current item */
  const item = useMemo(() => catalogData.find((i) => i.id === itemId), [itemId]);

  /* Related items: same category, excluding current */
  const relatedItems = useMemo(() => {
    if (!item) return [];
    return catalogData
      .filter((i) => i.category === item.category && i.id !== item.id)
      .slice(0, 4);
  }, [item]);

  /* 404 — item not found */
  if (!item) {
    return (
      <div className="container">
        <div className="not-found">
          <div className="not-found-code">404</div>
          <h2>Product not found</h2>
          <Link to="/" className="not-found-link">
            ← Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page" id="detail-page">
      <div className="container">
        {/* Back button */}
        <div className="detail-back-bar">
          <Link to="/" className="detail-back-btn" id="detail-back-btn">
            <span className="detail-back-arrow">←</span>
            Back to Catalog
          </Link>
        </div>

        {/* Main content: Image + Info */}
        <div className="detail-content">
          {/* Image section */}
          <div className="detail-image-section">
            <div className="detail-image-container">
              <img
                className="detail-image"
                src={item.image}
                alt={item.itemname}
                onError={(e) => {
                  e.target.src = `https://placehold.co/800x500/1a1a2e/818cf8?text=${encodeURIComponent(item.itemname)}`;
                }}
              />
            </div>
          </div>

          {/* Info section */}
          <div className="detail-info-section">
            {/* Breadcrumb */}
            <div className="detail-breadcrumb" id="detail-breadcrumb">
              <Link to="/">Catalog</Link>
              <span className="detail-breadcrumb-sep">/</span>
              <Link to={`/?category=${item.category}`}>{item.category}</Link>
              <span className="detail-breadcrumb-sep">/</span>
              <span className="detail-breadcrumb-current">{item.itemname}</span>
            </div>

            {/* Category badge */}
            <span className={`detail-category-badge ${item.category}`} id="detail-category-badge">
              {CATEGORY_ICONS[item.category] || '📦'} {item.category}
            </span>

            {/* Item name */}
            <h1 className="detail-item-name" id="detail-item-name">
              {item.itemname}
            </h1>

            {/* Specifications — dynamically rendered from itemprops */}
            <p className="detail-props-title">Specifications</p>
            <div className="detail-props-list" id="detail-props-list">
              {item.itemprops.map((prop, index) => (
                <div
                  className="detail-prop-row"
                  key={index}
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                >
                  <span className="detail-prop-label">{prop.label}</span>
                  <span className="detail-prop-value">{prop.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related items */}
        {relatedItems.length > 0 && (
          <section className="detail-related" id="detail-related">
            <h2 className="detail-related-title">
              More in {item.category}
            </h2>
            <div className="items-grid">
              {relatedItems.map((relItem, i) => (
                <ItemCard key={relItem.id} item={relItem} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
