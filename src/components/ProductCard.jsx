import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);
  const discount = product.originalPrice > product.price 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', position: 'relative' }}>
      {/* Badges */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {discount > 0 && (
          <span style={{ background: 'var(--secondary-color)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            {discount}% OFF
          </span>
        )}
        {product.stock < 10 && (
          <span style={{ background: 'var(--warning)', color: 'black', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        style={{ 
          position: 'absolute', top: '10px', right: '10px', zIndex: 10, 
          background: 'var(--card-bg)', backdropFilter: 'blur(5px)', borderRadius: '50%', 
          width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s',
          transform: isLiked ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {isLiked ? '❤️' : '🤍'}
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} style={{ height: '200px', overflow: 'hidden', display: 'block' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </Link>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: '1' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
          {product.brand} • {product.category}
        </p>
        
        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.name}
          </h3>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--warning)' }}>★</span>
          <span style={{ fontWeight: '600' }}>{product.rating}</span>
          <span style={{ color: 'var(--text-muted)' }}>({product.reviews})</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)' }}>
              ${product.price.toFixed(2)}
            </span>
            {discount > 0 && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '5px' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={() => addToCart(product)}
            style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px' }}
            title="Add to Cart"
          >
            +🛒
          </button>
        </div>
      </div>
    </div>
  );
}
