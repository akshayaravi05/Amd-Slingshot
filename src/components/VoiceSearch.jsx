import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSupported(true);
    }
  }, []);

  const handleVoiceSearch = () => {
    if (!supported) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        navigate(`/shop?q=${encodeURIComponent(transcript)}`);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!supported) return null;

  return (
    <button 
      title="Voice Shopping"
      onClick={handleVoiceSearch} 
      style={{ 
        fontSize: '1.25rem', 
        color: isListening ? 'var(--danger)' : 'inherit',
        animation: isListening ? 'pulse 1.5s infinite' : 'none'
      }}
    >
      🎤
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </button>
  );
}
