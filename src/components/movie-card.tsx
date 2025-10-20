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
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 aspect-[2/3]">
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
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h3 className="font-headline text-lg font-bold text-white">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{movie.year}</span>
            <Badge variant="secondary">{movie.rating.toFixed(1)}</Badge>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 bg-transparent hover:bg-white/20">
            <Play className="h-6 w-6 fill-white text-white" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-12 w-12 border-2 bg-transparent hover:bg-white/20"
            onClick={handleWatchlistClick}
            aria-label={onWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
            {onWatchlist ? <Check className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
          </Button>
        </div>
      </div>
    </Link>
  );
}
