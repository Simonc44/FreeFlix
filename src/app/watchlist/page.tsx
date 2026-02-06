'use client';

import { useWatchlist } from '@/context/app-provider';
import { MovieCard } from '@/components/movie-card';
import { Clapperboard } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WatchlistPage() {
  const { getWatchlistMovies } = useWatchlist();
  const watchlistMovies = getWatchlistMovies();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-headline font-bold mb-8">Ma Liste de Films</h1>
      {watchlistMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {watchlistMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-card rounded-lg p-8">
            <Clapperboard className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Votre liste de films est vide</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                Ajoutez des films à votre liste pour les voir ici. Parcourez notre collection et trouvez votre prochain film préféré !
            </p>
            <Button asChild>
                <Link href="/">Parcourir les films</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
