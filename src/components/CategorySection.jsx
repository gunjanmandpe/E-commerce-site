import ItemCard from './ItemCard';

const CATEGORY_META = {
  Cars: { icon: '🚗', accent: 'var(--accent-cars)' },
  Bikes: { icon: '🏍️', accent: 'var(--accent-bikes)' },
  Phones: { icon: '📱', accent: 'var(--accent-phones)' },
  Computers: { icon: '💻', accent: 'var(--accent-computers)' },
};

export default function CategorySection({ category, items, delay = 0 }) {
  const meta = CATEGORY_META[category] || { icon: '📦', accent: 'var(--accent-primary)' };

  return (
    <section
      className="category-section"
      id={`category-${category.toLowerCase()}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Category header */}
      <div className="category-header">
        <div className={`category-icon ${category}`}>
          <span>{meta.icon}</span>
        </div>
        <h2 className="category-title">{category}</h2>
        <span className="category-count">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Item cards grid */}
      <div className="items-grid">
        {items.map((item, index) => (
          <ItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
