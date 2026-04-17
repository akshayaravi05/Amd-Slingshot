import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecommendation } from '../context/RecommendationContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToHistory } = useRecommendation();

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    setLoading(true);
    
    // Fetch product
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        addToHistory(data.id);
        
        // Fetch related (same category)
        fetch(`/api/products?category=${data.category}`)
          .then(r => r.json())
          .then(catData => setRelated(catData.filter(p => p.id !== data.id).slice(0, 4)));
      })
      .catch(err => {
        console.error(err);
        navigate('/products'); // Redirect if not found
      })
      .finally(() => setLoading(false));
  }, [id, navigate, addToHistory]);

  if (loading || !product) {
    return <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  const isLiked = isInWishlist(product.id);
  const discount = product.originalPrice > product.price 
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        
        {/* Left: Image Gallery */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {discount > 0 && (
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--secondary-color)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontWeight: 'bold' }}>
              {discount}% OFF
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', maxWidth: '500px', objectFit: 'contain', borderRadius: 'var(--radius-md)' }} 
            className="animate-fade-in"
          />
        </div>

        {/* Right: Info */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s', display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {product.brand}
          </p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--warning)', fontSize: '1.2rem' }}>
              ★★★★★ <span style={{ color: 'var(--text-color)', fontWeight: '600', marginLeft: '0.5rem' }}>{product.rating}</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>({product.reviews} reviews)</span>
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '700' }}>${product.price.toFixed(2)}</span>
            {discount > 0 && <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>}
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {product.description}
          </p>

          <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {product.tags.map(t => (
              <span key={t} style={{ background: 'var(--glass-bg)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem' }}>
                #{t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1, padding: '1rem', fontSize: '1.2rem' }}
              onClick={() => addToCart(product)}
            >
              Add to Cart 🛒
            </button>
            <button 
              className="glass"
              style={{ width: '60px', borderRadius: 'var(--radius-xl)', fontSize: '1.5rem' }}
              onClick={() => toggleWishlist(product)}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
          
          <p style={{ color: product.stock < 10 ? 'var(--warning)' : 'var(--success)', marginTop: '1rem', fontWeight: 'bold' }}>
            {product.stock < 10 ? `Hurry! Only ${product.stock} items left in stock.` : 'In Stock & Ready to Ship'}
          </p>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
            You might also like
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
