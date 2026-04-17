// Simple recommendation engine mock

export const getRecommendations = (allProducts, params = {}) => {
  const { history = [], mood = '', budget = null, cartIds = [] } = params;
  let recommended = [...allProducts];

  // 1. Filter by budget if provided
  if (budget) {
    recommended = recommended.filter(p => p.price <= budget);
  }

  // 2. Filter by mood if provided
  if (mood) {
    // If mood is selected, boost products with matching mood tags
    recommended = recommended.sort((a, b) => {
      const aMatches = a.moodTags.includes(mood) ? 1 : 0;
      const bMatches = b.moodTags.includes(mood) ? 1 : 0;
      return bMatches - aMatches;
    });
    // Optional: Filter out products totally unrelated to mood if we have enough
    const moodMatches = recommended.filter(p => p.moodTags.includes(mood));
    if (moodMatches.length > 5) {
      recommended = moodMatches;
    }
  }

  // 3. Collaborative / Content-based simulation based on history
  if (history.length > 0) {
    // Get categories and tags the user has viewed
    const userCategories = new Set();
    const userTags = new Set();
    
    // Check what user looked at
    history.forEach(histId => {
      const p = allProducts.find(item => item.id === histId);
      if (p) {
        userCategories.add(p.category);
        p.tags.forEach(t => userTags.add(t));
      }
    });

    // Score remaining products (that aren't in cart)
    recommended = recommended.filter(p => !cartIds.includes(p.id));
    
    recommended.forEach(p => {
      let score = p.rating; // Base score is rating
      if (userCategories.has(p.category)) score += 2; // Category match bonus
      
      const tagMatches = p.tags.filter(t => userTags.has(t)).length;
      score += (tagMatches * 0.5); // Tag match bonus
      
      p._recScore = score;
    });

    // Sort by recommendation score
    recommended.sort((a, b) => b._recScore - a._recScore);
  } else if (!mood) {
    // No history, no mood, sort by rating/trending
    recommended.sort((a, b) => b.rating - a.rating);
  }

  // Return top 8 recommendations
  return recommended.slice(0, 8);
};
