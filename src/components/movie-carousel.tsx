import type { Movie } from '@/lib/types';
import { MovieCard } from '@/components/movie-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type MovieCarouselProps = {
  movies: Movie[];
  title: string;
};

export function MovieCarousel({ movies, title }: MovieCarouselProps) {
  if (!movies || movies.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full py-8">
      <h2 className="mb-4 text-2xl font-headline font-bold">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </div>
  );
}
