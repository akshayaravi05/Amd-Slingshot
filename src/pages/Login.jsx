import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!email || !password) {
      return setError('Please fill in all required fields.');
    }
    if (!isLogin && !name) {
      return setError('Please enter your name.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError('Please enter a valid email address.');
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      navigate('/dashboard');
    } catch (err) {
      // Map Firebase errors to user-friendly messages
      let msg = 'Authentication failed. Please try again.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'Email is already in use.';
      } else if (err.code === 'auth/network-request-failed') {
        msg = 'Network error. Please check your connection.';
      } else if (err.message && err.message.includes('Firebase is not initialized')) {
        msg = 'Firebase is not initialized in src/firebase/config.js! Please supply credentials to use Email/Password Auth.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google Sign-In failed.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Animated Background blob for card */}
        <div style={{
          position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
          background: `radial-gradient(circle, var(${isLogin ? '--primary-color' : '--secondary-color'}) 0%, transparent 60%)`,
          opacity: 0.1, zIndex: -1, transition: 'background 0.5s ease'
        }} />

        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {isLogin ? 'Sign in to access your smart cart and deals.' : 'Join to get personalized AI shopping recommendations.'}
        </p>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--danger)', fontSize: '0.9rem' }}>
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: !isLogin ? 'block' : 'none', transition: 'all 0.3s ease' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              className="input-glass" 
              placeholder="John Doe" 
              value={name} 
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              className="input-glass" 
              placeholder="you@example.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              className="input-glass" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '15px', top: '35px', color: 'var(--text-muted)' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', gap: '5px' }}>
                <span className="typing-dot" style={{ animationDelay: '0s' }}>.</span>
                <span className="typing-dot" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="typing-dot" style={{ animationDelay: '0.4s' }}>.</span>
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
          <span style={{ padding: '0 10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
        </div>

        <button onClick={handleGoogle} className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>

      </div>
    </div>
  );
}
