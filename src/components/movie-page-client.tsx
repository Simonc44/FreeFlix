'use client';

import { useState } from 'react';
import { Check, Loader2, Plus, Play, Sparkles, X } from 'lucide-react';
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
import { Dialog, DialogContent } from '@/components/ui/dialog';


type MoviePageClientProps = {
  movie: Movie;
};

export function MoviePageClient({ movie }: MoviePageClientProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const onWatchlist = isInWatchlist(movie.id);

  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const handleGenerateSummary = async () => {
    if (summary && !isAccordionOpen) {
        setIsAccordionOpen(true);
        return;
    }
    if (summary && isAccordionOpen) {
        setIsAccordionOpen(false);
        return;
    }

    setIsLoadingSummary(true);
    setIsAccordionOpen(true);
    const result = await getSummaryAction({
      movieTitle: movie.title,
      movieDescription: movie.longDescription,
    });
    setSummary(result.summary);
    setIsLoadingSummary(false);
  };

  return (
    <>
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
          
          <Accordion type="single" collapsible className="w-full mt-4" value={isAccordionOpen ? "item-1" : ""} onValueChange={(value) => setIsAccordionOpen(value === "item-1")}>
            <AccordionItem value="item-1">
                <div onClick={handleGenerateSummary} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer py-4">
                  <AccordionTrigger className="p-0 hover:no-underline justify-start flex-1">
                      <div className="flex items-center gap-2">
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
                      </div>
                  </AccordionTrigger>
                </div>
              <AccordionContent>
                {summary || 'Click the button to generate a summary.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
        <div className="w-full md:w-64">
          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={() => setIsPlayerOpen(true)} disabled={!movie.videoUrl}>
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
      {movie.videoUrl && (
        <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
            <DialogContent className="max-w-4xl h-auto p-0 border-0">
                <div className="relative aspect-video">
                    <video controls autoPlay className="w-full h-full rounded-lg" src={movie.videoUrl}>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
