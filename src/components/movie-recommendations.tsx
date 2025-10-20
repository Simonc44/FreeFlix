'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getRecommendationsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { movies } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { MovieCarousel } from './movie-carousel';
import { Skeleton } from './ui/skeleton';

// Mock viewing history
const viewingHistory = [
  'Interstellar',
  'The Dark Knight : Le Chevalier noir',
  'Matrix',
];

export function MovieRecommendations() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGetRecommendations = async () => {
      setIsLoading(true);
      const result = await getRecommendationsAction({ viewingHistory, numberOfRecommendations: 6 });
      const recommendedMovies = movies.filter(movie => result.recommendations.includes(movie.title));
      setRecommendations(recommendedMovies);
      setIsLoading(false);
    };

    handleGetRecommendations();
  }, []);
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-headline font-bold mb-4">Recommandé pour vous</h2>
      
      {isLoading && (
        <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[2/3] rounded-md" />
                ))}
            </div>
        </div>
      )}
      
      {!isLoading && recommendations.length === 0 && (
        <div className="text-center p-8 bg-card rounded-lg">
            <p className="text-muted-foreground">Aucune recommandation trouvée pour le moment.</p>
        </div>
      )}
      
      {!isLoading && recommendations.length > 0 && (
         <MovieCarousel movies={recommendations} title="" />
      )}
    </div>
  );
}
