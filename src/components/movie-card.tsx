'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check, Play } from 'lucide-react';

import type { Movie } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useWatchlist } from '@/context/app-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type MovieCardProps = {
  movie: Movie;
  className?: string;
};

export function MovieCard({ movie, className }: MovieCardProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const placeholder = PlaceHolderImages.find((p) => p.id === movie.imageId);
  const onWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  return (
    <Link href={`/movies/${movie.id}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-md shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 aspect-[2/3]">
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={movie.title}
            fill
            data-ai-hint={placeholder.imageHint}
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-headline text-2xl font-bold text-white tracking-wider uppercase drop-shadow-md">{movie.title}</h3>
        </div>
        
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
            <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" size="icon" className="rounded-full h-16 w-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                    <Play className="h-8 w-8 fill-white text-white ml-1" />
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-12 w-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    onClick={handleWatchlistClick}
                    aria-label={onWatchlist ? "Retirer de la liste" : "Ajouter à la liste"}
                    >
                    {onWatchlist ? <Check className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
                </Button>
            </div>
            <p className="text-sm text-white/80 line-clamp-3">{movie.description}</p>
            <div className="flex items-center gap-2 text-sm text-white/80 mt-4">
                <span>{movie.year}</span>
                <Badge variant="destructive">{movie.rating.toFixed(1)}</Badge>
            </div>
        </div>
      </div>
    </Link>
  );
}
