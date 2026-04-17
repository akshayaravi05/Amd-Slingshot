import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RecommendationContext = createContext();

export const useRecommendation = () => useContext(RecommendationContext);

export const RecommendationProvider = ({ children }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [mood, setMood] = useState('');
  const [budget, setBudget] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('productHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (productId) => {
    setHistory(prev => {
      // Keep only unique elements, recently viewed first, max 20 items
      const newHistory = [productId, ...prev.filter(id => id !== productId)].slice(0, 20);
      localStorage.setItem('productHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const getRecommendations = async (cartIds = []) => {
    setLoading(true);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, mood, budget, cartIds })
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // re-fetch recommendations if mood or budget changes
    getRecommendations();
  }, [mood, budget, history]); // Added history to dependencies

  return (
    <RecommendationContext.Provider value={{ 
      history, 
      addToHistory, 
      mood, 
      setMood, 
      budget, 
      setBudget, 
      recommendations,
      loading,
      refreshRecommendations: getRecommendations
    }}>
      {children}
    </RecommendationContext.Provider>
  );
};
