import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      
      {/* Animated Abstract Background Shapes */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', 
          background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)', opacity: 0.5, animation: 'float 15s infinite alternate'
        }}></div>
        <div style={{ 
          position: 'absolute', bottom: '-10%', left: '-5%', width: '30vw', height: '30vw', 
          background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)', opacity: 0.5, animation: 'float 20s infinite alternate-reverse'
        }}></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem', letterSpacing: '-1px' }}>
            Shop Smarter with <br/>
            <span className="text-gradient">AI Intelligence</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Experience the future of retail. Amd-Slingshot learns your preferences, predicts what you need, and finds the best deals tailored just for you.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Explore Products
            </Link>
            <Link to="/products?category=Electronics" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              View Tech Deals
            </Link>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.3s', display: 'flex', justifyContent: 'center' }}>
          <div className="glass-card" style={{ 
            width: '100%', maxWidth: '400px', padding: '2rem', position: 'relative',
            transform: 'perspective(1000px) rotateY(-15deg)', transformStyle: 'preserve-3d', transition: 'transform 0.5s ease'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg)'}
          onMouseOut={e => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-15deg)'}
          >
            {/* Mock floating UI elements */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'var(--success)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 'bold', boxShadow: 'var(--shadow-md)', transform: 'translateZ(50px)' }}>
              🔥 Price Dropped 20%
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" 
              alt="Featured Sneaker" 
              style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', transform: 'translateZ(30px)', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }} 
            />
            
            <div style={{ transform: 'translateZ(40px)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Velocity Runners</h3>
              <p style={{ color: 'var(--text-muted)' }}>AI predicted you'd love these based on your active lifestyle.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
