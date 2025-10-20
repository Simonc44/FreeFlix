import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { movies } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { MovieCard } from '@/components/movie-card';
import { MovieCarousel } from '@/components/movie-carousel';
import { MovieRecommendations } from '@/components/movie-recommendations';
import { Suspense } from 'react';

function MovieGrid({ query }: { query?: string }) {
  const filteredMovies = movies.filter(movie => 
    query ? movie.title.toLowerCase().includes(query.toLowerCase()) : true
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default function Home({ searchParams }: { searchParams?: { q?: string } }) {
  const featuredMovie = movies[0];
  const featuredMovieImage = PlaceHolderImages.find((p) => p.id === featuredMovie.imageId);
  const trendingMovies = movies.slice(1, 7);
  const searchQuery = searchParams?.q;

  return (
    <>
      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative h-[60vh] min-h-[400px] w-full flex items-end text-white">
          {featuredMovieImage && (
            <Image
              src={featuredMovieImage.imageUrl}
              alt={featuredMovie.title}
              fill
              priority
              className="object-cover -z-10"
              data-ai-hint={featuredMovieImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="container relative pb-12">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 max-w-2xl">
              {featuredMovie.title}
            </h1>
            <p className="max-w-xl text-lg text-foreground/80 mb-6">
              {featuredMovie.description}
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href={`/movies/${featuredMovie.id}`}>
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Play
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={`/movies/${featuredMovie.id}`}>More Info</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="container py-12">
        {!searchQuery && (
            <MovieCarousel movies={trendingMovies} title="Trending Now" />
        )}
        
        <div className="py-8">
            <h2 className="mb-4 text-2xl font-headline font-bold">
              {searchQuery ? `Results for "${searchQuery}"` : "All Movies"}
            </h2>
            <Suspense fallback={<div>Loading grid...</div>}>
              <MovieGrid query={searchQuery} />
            </Suspense>
        </div>
        
        {!searchQuery && (
          <>
            <div className="my-8 border-t border-dashed" />
            <MovieRecommendations />
          </>
        )}
      </div>
    </>
  );
}
