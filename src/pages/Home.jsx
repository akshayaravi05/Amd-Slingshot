import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import MoodSelector from '../components/MoodSelector';
import ProductCard from '../components/ProductCard';
import { useRecommendation } from '../context/RecommendationContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const { recommendations, loading } = useRecommendation();

  useEffect(() => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => setTrending(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <HeroSection />
      
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        <MoodSelector />

        {/* Recommendations Section (AI generated based on Mood or History) */}
        {recommendations.length > 0 && (
          <section style={{ marginBottom: '4rem' }} className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="text-gradient">AI Top Picks For You</span> ✨
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>Curated based on your browsing and mood.</p>
              </div>
              <Link to="/products" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>View All</Link>
            </div>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Generative AI is thinking...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {recommendations.slice(0, 4).map(product => (
                  <ProductCard key={`rec-${product.id}`} product={product} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Trending Section */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Trending Now 🔥</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {trending.map(product => (
              <ProductCard key={`trend-${product.id}`} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
