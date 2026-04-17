import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤍</div>
        <h2>Your wishlist is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Save items you love so you won't lose track of them.</p>
        <Link to="/products" className="btn btn-primary">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Your Wishlist ❤️</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
