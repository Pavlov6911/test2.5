import type { User } from './user';
import type { Mod } from './mod';

export interface RecommendationScore {
  score: number;
  reason: string;
  source: 'collaborative' | 'content' | 'popularity';
}

export function calculateContentBasedScore(user: User, mod: Mod): RecommendationScore {
  let score = 0;
  let matchingFactors = [];

  // Category matching
  const categoryOverlap = mod.categories.filter(category => 
    user.preferences.categories.includes(category)
  ).length;
  score += (categoryOverlap / mod.categories.length) * 0.4;
  if (categoryOverlap > 0) {
    matchingFactors.push('categories');
  }

  // Tag matching
  const tagOverlap = mod.tags.filter(tag => 
    user.preferences.tags.includes(tag)
  ).length;
  score += (tagOverlap / mod.tags.length) * 0.3;
  if (tagOverlap > 0) {
    matchingFactors.push('tags');
  }

  // Rating analysis
  const userRatedMods = user.ratings.map(r => r.modId);
  if (userRatedMods.includes(mod.id)) {
    const userRating = user.ratings.find(r => r.modId === mod.id)!.rating;
    score += (userRating / 5) * 0.3;
    matchingFactors.push('previous rating');
  }

  let reason = 'Based on your ';
  if (matchingFactors.length > 0) {
    reason += matchingFactors.join(' and ');
  } else {
    reason = 'Popular in similar categories';
    score = 0.5; // Default score for no direct matches
  }

  return {
    score,
    reason,
    source: 'content'
  };
}

export function calculateCollaborativeScore(user: User, mod: Mod, similarUsers: User[]): RecommendationScore {
  let score = 0;
  let totalSimilarUsers = 0;

  // Find similar users who downloaded/rated this mod
  similarUsers.forEach(similarUser => {
    if (similarUser.downloadHistory.includes(mod.id)) {
      const userRating = similarUser.ratings.find(r => r.modId === mod.id);
      score += userRating ? userRating.rating / 5 : 0.7; // Default score if downloaded but not rated
      totalSimilarUsers++;
    }
  });

  if (totalSimilarUsers === 0) {
    return {
      score: 0.5,
      reason: 'Popular among other users',
      source: 'collaborative'
    };
  }

  return {
    score: score / totalSimilarUsers,
    reason: `${totalSimilarUsers} similar users enjoyed this mod`,
    source: 'collaborative'
  };
}

export function getRecommendations(user: User, mods: Mod[], similarUsers: User[]) {
  return mods.map(mod => {
    const contentScore = calculateContentBasedScore(user, mod);
    const collaborativeScore = calculateCollaborativeScore(user, mod, similarUsers);
    
    // Hybrid scoring (weighted average)
    const finalScore = (contentScore.score * 0.6) + (collaborativeScore.score * 0.4);
    
    // Choose the reason from the highest scoring method
    const reason = contentScore.score > collaborativeScore.score 
      ? contentScore.reason 
      : collaborativeScore.reason;

    return {
      modId: mod.id,
      score: finalScore,
      reason
    };
  }).sort((a, b) => b.score - a.score);
}
