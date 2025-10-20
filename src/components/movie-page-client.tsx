'use client';

import { useState } from 'react';
import { Check, Loader2, Plus, Play, Sparkles } from 'lucide-react';
import { useWatchlist } from '@/context/app-provider';
import type { Movie } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSummaryAction } from '@/lib/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type MoviePageClientProps = {
  movie: Movie;
};

export function MoviePageClient({ movie }: MoviePageClientProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const onWatchlist = isInWatchlist(movie.id);

  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    setIsLoadingSummary(true);
    const result = await getSummaryAction({
      movieTitle: movie.title,
      movieDescription: movie.longDescription,
    });
    setSummary(result.summary);
    setIsLoadingSummary(false);
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-12">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          {movie.genres.map((genre) => (
            <Badge key={genre} variant="outline">{genre}</Badge>
          ))}
          <span className="text-muted-foreground">{movie.year}</span>
          <Badge variant="secondary">{movie.rating.toFixed(1)}</Badge>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {movie.longDescription}
        </p>
        
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
                <Button variant="ghost" onClick={handleGenerateSummary} disabled={isLoadingSummary} className='p-0 hover:bg-transparent'>
                {isLoadingSummary ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating AI Summary...
                    </>
                ) : (
                    <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {summary ? 'AI Generated Summary' : 'Generate AI Summary'}
                    </>
                )}
                </Button>
            </AccordionTrigger>
            <AccordionContent>
              {summary || 'Click the button to generate a summary.'}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
      <div className="w-full md:w-64">
        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full">
            <Play className="mr-2 h-5 w-5 fill-background" /> Play
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            onClick={() => onWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id)}
          >
            {onWatchlist ? (
              <Check className="mr-2 h-5 w-5" />
            ) : (
              <Plus className="mr-2 h-5 w-5" />
            )}
            {onWatchlist ? 'On Watchlist' : 'Add to Watchlist'}
          </Button>
        </div>
      </div>
    </div>
  );
}
