import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import VoiceSearch from './VoiceSearch';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  return (
    <nav className="glass sticky top-0 z-50 w-full" style={{ padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.5rem', fontFamily: 'Outfit' }}>
          <span className="text-gradient">Amd-Slingshot</span>
        </Link>
        
        {/* Search */}
        <form onSubmit={handleSearch} style={{ flex: '1', maxWidth: '500px', margin: '0 2rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              className="input-glass" 
              placeholder="Search products, brands, or describe what you need..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingRight: '90px' }}
            />
            <div style={{ position: 'absolute', right: '15px', display: 'flex', gap: '10px' }}>
              <VoiceSearch />
              <button type="submit" style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
                🔍
              </button>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={toggleTheme} style={{ fontSize: '1.25rem' }} title="Toggle Theme">
            {isDark ? '☀️' : '🌙'}
          </button>
          
          <Link to="/wishlist" style={{ position: 'relative', fontSize: '1.25rem' }} title="Wishlist">
            ❤️
            {wishlist.length > 0 && (
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-10px', 
                background: 'var(--secondary-color)', color: 'white', 
                fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' 
              }}>
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" style={{ position: 'relative', fontSize: '1.25rem' }} title="Cart">
            🛒
            {getCartCount() > 0 && (
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-10px', 
                background: 'var(--primary-color)', color: 'white', 
                fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' 
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/dashboard">
                <img 
                  src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || user.email}`} 
                  alt="Avatar" 
                  style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid var(--primary-color)', cursor: 'pointer' }} 
                  title="Dashboard"
                />
              </Link>
              <button onClick={() => { logout(); navigate('/'); }} style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
