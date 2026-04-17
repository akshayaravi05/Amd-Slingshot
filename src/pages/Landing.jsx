import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 70px)' }}>
      {/* Background cinematic effects */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden', background: 'var(--bg-color)' }}>
         <div style={{ 
          position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', 
          background: 'var(--primary-color)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.6,
          animation: 'float 10s infinite alternate ease-in-out'
        }}></div>
        <div style={{ 
          position: 'absolute', bottom: '10%', left: '10%', width: '400px', height: '400px', 
          background: 'var(--secondary-color)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.5,
          animation: 'float 15s infinite alternate-reverse ease-in-out'
        }}></div>
      </div>

      <div className="container" style={{ paddingTop: '10vh', paddingBottom: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Hero Area */}
        <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', borderRadius: 'var(--radius-full)', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            ✨ Introducing Slingshot Intelligence
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            <span className="text-gradient">AI Smart Shopping</span><br/>Assistant
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Shop Smarter. Faster. Personalized. Let our AI curate your perfect shopping experience entirely based on your mood, budget, and style.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)' }}>
              Get Started Free
            </Link>
            <Link to="/shop" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
              Browse Store
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid (Prompt-a-thon Style) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', marginBottom: '4rem' }}>
          
          <div className="glass-card animate-fade-in" style={{ padding: '2rem', animationDelay: '0.2s', borderTop: '2px solid var(--primary-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Smart Recommendations</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Our AI learns your preferences in real-time, surfacing products you didn't even know you wanted.</p>
          </div>

          <div className="glass-card animate-fade-in" style={{ padding: '2rem', animationDelay: '0.4s', borderTop: '2px solid var(--secondary-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎭</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Mood-Based Shopping</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Tell us how you feel today. We'll instantly reconfigure the storefront to match your current vibe.</p>
          </div>

          <div className="glass-card animate-fade-in" style={{ padding: '2rem', animationDelay: '0.6s', borderTop: '2px solid var(--accent-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Conversational AI</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Don't browse endlessly. Just ask our Gemini-powered assistant to hunt down exactly what you need.</p>
          </div>

          <div className="glass-card animate-fade-in" style={{ padding: '2rem', animationDelay: '0.8s', borderTop: '2px solid var(--success)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Smart Cart Optimizer</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Before you checkout, our AI scans the entire catalog for cheaper, better alternatives to save you money.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
