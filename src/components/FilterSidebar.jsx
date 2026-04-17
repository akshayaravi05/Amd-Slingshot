import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books', 'Food', 'Gaming'];
const SORTS = [
  { id: '', label: 'Recommended' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating_desc', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest Arrivals' },
];

export default function FilterSidebar({ onFilterChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'All';
  const currentSort = searchParams.get('sort') || '';
  const [priceRange, setPriceRange] = useState(1000);

  const handleCategoryChange = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
    onFilterChange();
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    if (val) {
      searchParams.set('sort', val);
    } else {
      searchParams.delete('sort');
    }
    setSearchParams(searchParams);
    onFilterChange();
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
      <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
        Filters
      </h3>

      {/* Sort */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Sort By</h4>
        <select 
          className="input-glass" 
          value={currentSort} 
          onChange={handleSortChange}
          style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}
        >
          {SORTS.map(s => (
            <option key={s.id} value={s.id} style={{ color: 'black' }}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Categories</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CATEGORIES.map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="category" 
                checked={currentCategory === cat}
                onChange={() => handleCategoryChange(cat)}
                style={{ accentColor: 'var(--primary-color)' }}
              />
              <span style={{ fontWeight: currentCategory === cat ? '600' : '400', color: currentCategory === cat ? 'var(--primary-color)' : 'inherit' }}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Basic budget filter - UI only for now to not overly complicate query params, but updates local state */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Max Price: ${priceRange}</h4>
        <input 
          type="range" 
          min="10" 
          max="1000" 
          step="10"
          value={priceRange} 
          onChange={(e) => setPriceRange(e.target.value)}
          onMouseUp={() => {
            searchParams.set('maxPrice', priceRange);
            setSearchParams(searchParams);
            onFilterChange();
          }}
          style={{ width: '100%', accentColor: 'var(--primary-color)' }}
        />
      </div>

      <button 
        className="btn btn-secondary" 
        style={{ width: '100%', marginTop: '1rem' }}
        onClick={() => {
          setSearchParams(new URLSearchParams());
          setPriceRange(1000);
          onFilterChange();
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
}
