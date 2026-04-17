import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate } from 'react-router-dom';

// Initialize Gemini - IN A REAL APP, DO NOT EXPOSE API KEY IN FRONTEND!
// For this demo, we expect it in import.meta.env.VITE_GEMINI_API_KEY
// but since the user might not have one, we'll provide mock responses if it fails.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! 👋 I am your AI shopping assistant. How can I help you find the perfect product today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setIsLoading(true);

    try {
      if (genAI) {
        // Use real Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        
        // Context prompt
        const promptContext = `You are an AI shopping assistant for 'Amd-Slingshot'. 
        Be helpful, concise, and enthusiastic. Use emojis.
        If a user asks for 'something under $50', mention that you can filter the products page.
        User query: "${userQuery}"`;
        
        const result = await model.generateContent(promptContext);
        const response = result.response.text();
        
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        
        // Simple navigation hook based on keywords
        if (userQuery.toLowerCase().includes('laptop') || userQuery.toLowerCase().includes('electronics')) {
          navigate('/products?category=Electronics');
        }
      } else {
        // Mock response if no API key
        setTimeout(() => {
          let response = "I'm running in offline mode because the Gemini API key is missing. ";
          if (userQuery.toLowerCase().includes('phone') || userQuery.toLowerCase().includes('laptop')) {
            response += "But I can definitely take you to the Electronics section! 💻📱";
            navigate('/products?category=Electronics');
          } else if (userQuery.includes('$') || userQuery.toLowerCase().includes('cheap')) {
            response += "Looking for a deal? Check out our sale items on the products page! 💸";
          } else {
            response += "I can help you find products, compare them, and discover deals!";
          }
          setMessages(prev => [...prev, { role: 'assistant', content: response }]);
          setIsLoading(false);
        }, 1000);
        return; // Early return for mock
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops! My brain got a little scrambled. Could you try asking that again? 😅" }]);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass"
        style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 999,
          width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', boxShadow: 'var(--shadow-lg)',
          background: isOpen ? 'var(--card-bg)' : 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          color: isOpen ? 'var(--text-color)' : 'white',
          border: isOpen ? '1px solid var(--glass-border)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-card animate-fade-in" style={{
          position: 'fixed', bottom: '90px', right: '20px', zIndex: 998,
          width: '350px', height: '500px', maxWidth: 'calc(100vw - 40px)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
            color: 'white', display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <div style={{ fontSize: '1.5rem' }}>🤖</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Slingshot AI</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Online & ready to help</p>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%', padding: '0.8rem 1rem',
                borderRadius: '1rem',
                borderBottomRightRadius: msg.role === 'user' ? '0' : '1rem',
                borderBottomLeftRadius: msg.role === 'assistant' ? '0' : '1rem',
                background: msg.role === 'user' ? 'var(--primary-color)' : 'var(--glass-bg)',
                color: msg.role === 'user' ? 'white' : 'var(--text-color)',
                border: msg.role === 'assistant' ? '1px solid var(--glass-border)' : 'none',
                boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem', lineHeight: '1.4'
              }}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                <span className="typing-dot" style={{ animationDelay: '0s' }}>.</span>
                <span className="typing-dot" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="typing-dot" style={{ animationDelay: '0.4s' }}>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.02)'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="input-glass"
              style={{ flex: 1, padding: '0.75rem 1rem' }}
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="btn-primary" style={{
              borderRadius: '50%', width: '45px', height: '45px', padding: 0, opacity: (!input.trim() || isLoading) ? 0.5 : 1
            }}>
              ➤
            </button>
          </form>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }
        .typing-dot { display: inline-block; animation: blink 1.4s infinite both; font-size: 1.5rem; line-height: 1; margin: 0 1px; }
      `}} />
    </>
  );
}
