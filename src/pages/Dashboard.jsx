import { useAuth } from '../context/AuthContext';
import { useRecommendation } from '../context/RecommendationContext';
import { useWishlist } from '../context/WishlistContext';
import { Link, Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { history, recommendations } = useRecommendation();
  const { wishlist } = useWishlist();
  
  const [historyProducts, setHistoryProducts] = useState([]);
  
  useEffect(() => {
    // Fetch objects for the history IDs
    if (history && history.length > 0) {
      fetch('/api/products')
        .then(res => res.json())
        .then(allProducts => {
           const viewed = history.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
           setHistoryProducts(viewed);
        });
    }
  }, [history]);

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading Dashboard...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      
      {/* Header Profile Section */}
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent)' }}>
        <img 
          src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || user.email}`} 
          alt="Profile" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid var(--primary-color)' }}
        />
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user.displayName || user.email}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Your personalized Shopping Intelligence Dashboard.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Quick Stats */}
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase' }}>Wishlist Items</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{wishlist.length}</p>
          <Link to="/wishlist" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>View Wishlist →</Link>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--secondary-color)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase' }}>Recently Viewed</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{historyProducts.length}</p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase' }}>Smart Notifications</h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
              🔔 An item in your wishlist just dropped in price!
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
              📦 Your previously viewed "Velocity Runners" are back in stock.
            </div>
          </div>
        </div>
      </div>

      {/* Recommended For You */}
      {recommendations && recommendations.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            ✨ Recommended Specifically For You
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {recommendations.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {historyProducts && historyProducts.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            🕒 Jump Back In (Recently Viewed)
          </h2>
          <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '1rem', WebkitOverflowScrolling: 'touch' }}>
            {historyProducts.slice(0, 6).map(product => (
              <div key={product.id} style={{ minWidth: '250px', flex: '0 0 auto' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
