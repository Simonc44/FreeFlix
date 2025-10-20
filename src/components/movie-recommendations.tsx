'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { getRecommendationsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { movies } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { MovieCarousel } from './movie-carousel';

// Mock viewing history
const viewingHistory = [
  'Cosmic Odyssey',
  'Neon Shadows',
  'Mind Heist',
];

export function MovieRecommendations() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setHasGenerated(true);
    const result = await getRecommendationsAction({ viewingHistory, numberOfRecommendations: 6 });
    const recommendedMovies = movies.filter(movie => result.recommendations.includes(movie.title));
    setRecommendations(recommendedMovies);
    setIsLoading(false);
  };
  
  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-headline font-bold">Recommended For You</h2>
        <Button onClick={handleGetRecommendations} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {hasGenerated ? 'Regenerate' : 'Generate Recommendations'}
            </>
          )}
        </Button>
      </div>
      <p className="text-muted-foreground mb-4">
        Based on your viewing history of: {viewingHistory.join(', ')}.
      </p>

      {isLoading && <div className="text-center p-8">Loading recommendations...</div>}
      
      {!isLoading && hasGenerated && recommendations.length === 0 && (
        <div className="text-center p-8 bg-card rounded-lg">
            <p className="text-muted-foreground">No recommendations found. Try again later.</p>
        </div>
      )}
      
      {!isLoading && recommendations.length > 0 && (
         <MovieCarousel movies={recommendations} title="" />
      )}
    </div>
  );
}
