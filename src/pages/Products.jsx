import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const qs = searchParams.toString();
      const url = `/api/products${qs ? `?${qs}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const q = searchParams.get('q');
  const cat = searchParams.get('category');

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>
          {q ? `Search results for "${q}"` : cat ? `${cat} Collection` : 'All Products'}
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Found {products.length} items</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }} className="products-layout">
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .products-layout { flex-direction: column; }
            .sidebar-wrapper { width: 100% !important; }
            .grid-wrapper { width: 100%; }
          }
        `}} />
        
        <div className="sidebar-wrapper" style={{ width: '280px', flexShrink: 0 }}>
          <FilterSidebar onFilterChange={fetchProducts} />
        </div>

        <div className="grid-wrapper" style={{ flex: 1 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
              <div className="typing-dot">.</div><div className="typing-dot" style={{ animationDelay: '0.2s' }}>.</div><div className="typing-dot" style={{ animationDelay: '0.4s' }}>.</div>
            </div>
          ) : products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <h2 style={{ marginBottom: '1rem' }}>No products found 😢</h2>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
