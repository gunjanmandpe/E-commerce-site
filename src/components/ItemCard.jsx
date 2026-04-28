import { Link } from 'react-router-dom';

export default function ItemCard({ item, index = 0 }) {
  /* Show only the first 3 props as a preview */
  const previewProps = item.itemprops.slice(0, 3);

  return (
    <Link
      to={`/item/${item.id}`}
      className="item-card"
      id={`item-card-${item.id}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image */}
      <div className="item-card-image-wrap">
        <img
          className="item-card-image"
          src={item.image}
          alt={item.itemname}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/1a1a2e/818cf8?text=${encodeURIComponent(item.itemname)}`;
          }}
        />
        <div className="item-card-image-overlay"></div>
        <span className="item-card-category-badge">{item.category}</span>
      </div>

      {/* Body */}
      <div className="item-card-body">
        <h3 className="item-card-name">{item.itemname}</h3>

        {/* Property pills */}
        <div className="item-card-props">
          {previewProps.map((prop, i) => (
            <span className="item-card-prop" key={i}>
              <span className="item-card-prop-label">{prop.label}:</span>
              <span className="item-card-prop-value">{prop.value}</span>
            </span>
          ))}
          {item.itemprops.length > 3 && (
            <span className="item-card-prop">
              <span className="item-card-prop-value">+{item.itemprops.length - 3} more</span>
            </span>
          )}
        </div>

        {/* CTA */}
        <span className="item-card-view">
          View Details
          <span className="item-card-view-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}
