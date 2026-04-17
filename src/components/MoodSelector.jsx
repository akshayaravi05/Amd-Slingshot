import { useRecommendation } from '../context/RecommendationContext';

const MOODS = [
  { id: 'Happy', emoji: '😊', color: 'linear-gradient(135deg, #fde047, #f59e0b)' },
  { id: 'Relaxed', emoji: '😌', color: 'linear-gradient(135deg, #a7f3d0, #10b981)' },
  { id: 'Energetic', emoji: '⚡', color: 'linear-gradient(135deg, #fca5a5, #ef4444)' },
  { id: 'Cozy', emoji: '☕', color: 'linear-gradient(135deg, #fed7aa, #f97316)' },
  { id: 'Productive', emoji: '🚀', color: 'linear-gradient(135deg, #bfdbfe, #3b82f6)' },
  { id: 'Adventurous', emoji: '🏔️', color: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)' },
];

export default function MoodSelector() {
  const { mood, setMood } = useRecommendation();

  return (
    <div style={{ margin: '3rem 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
        How are you feeling today?
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '-1.5rem', marginBottom: '2rem' }}>
        Select your mood to see personalized shopping suggestions.
      </p>
      
      <div style={{ 
        display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center',
        padding: '1rem'
      }}>
        {MOODS.map(m => (
          <button
            key={m.id}
            onClick={() => setMood(m.id === mood ? '' : m.id)}
            style={{
              background: m.id === mood ? m.color : 'var(--glass-bg)',
              color: m.id === mood ? 'white' : 'var(--text-color)',
              border: `1px solid ${m.id === mood ? 'transparent' : 'var(--glass-border)'}`,
              backdropFilter: 'blur(10px)',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-xl)',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: m.id === mood ? 'scale(1.05)' : 'scale(1)',
              boxShadow: m.id === mood ? '0 10px 20px rgba(0,0,0,0.1)' : 'var(--shadow-sm)'
            }}
            className="animate-fade-in"
          >
            <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
            {m.id}
          </button>
        ))}
      </div>
      
      {mood && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
          ✨ Showing "{mood}" vibes.
          <button onClick={() => setMood('')} style={{ color: 'var(--text-muted)', textDecoration: 'underline', marginLeft: '10px', fontSize: '0.9rem' }}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
