
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { movies } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Movie } from '@/lib/types';
import { MoviePageClient } from '@/components/movie-page-client';

async function getMovie(id: string): Promise<Movie | undefined> {
  return movies.find((movie) => movie.id === id);
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  if (!movie) {
    notFound();
  }

  const movieImage = PlaceHolderImages.find((p) => p.id === movie.imageId);

  return (
    <>
      <section className="relative h-[50vh] min-h-[350px] w-full flex items-end text-white overflow-hidden">
        {movieImage && (
          <Image
            src={movieImage.imageUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover -z-10"
            data-ai-hint={movieImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="container relative pb-12">
          <h1 className="text-4xl md:text-6xl font-headline font-bold max-w-3xl">
            {movie.title}
          </h1>
        </div>
      </section>

      <div className="container py-12">
        <MoviePageClient movie={movie} />
      </div>
    </>
  );
}

export async function generateStaticParams() {
    return movies.map((movie) => ({
      id: movie.id,
    }));
}
