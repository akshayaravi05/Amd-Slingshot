import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="glass" style={{ marginTop: 'auto', padding: '3rem 0 1rem 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          <div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', marginBottom: '1rem' }} className="text-gradient">
              Amd-Slingshot
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Your intelligent AI-powered shopping assistant that learns your preferences to find the perfect products.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Shop</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?sort=newest">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Account</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

        </div>
        
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} Amd-Slingshot AI Retail Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
