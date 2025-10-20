'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, Loader2, Plus, Play, Sparkles, Cast } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';


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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCastSupported, setIsCastSupported] = useState(false);

  useEffect(() => {
    // The Remote Playback API is only available in secure contexts (HTTPS) and on certain browsers.
    // We check for its existence on the video element.
    if (typeof window !== 'undefined' && 'remote' in document.createElement('video')) {
       setIsCastSupported(true);
    }
  }, []);

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

  const handleCast = async () => {
    if (videoRef.current && isCastSupported) {
      try {
        await videoRef.current.requestRemotePlayback();
      } catch (error) {
        console.error('Error starting remote playback', error);
      }
    }
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
                  <AccordionTrigger className="p-0 hover:no-underline justify-start">
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
              <Play className="mr-2 h-5 w-5 fill-current" /> Play
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
            <DialogContent className="w-screen h-screen max-w-full p-0 border-0 bg-black">
                <DialogHeader className="sr-only">
                  <DialogTitle>Playing: {movie.title}</DialogTitle>
                  <DialogDescription>Video player for the movie {movie.title}.</DialogDescription>
                </DialogHeader>
                <div className="relative w-full h-full group">
                    <video ref={videoRef} controls autoPlay className="w-full h-full" src={movie.videoUrl}>
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={handleCast} disabled={!isCastSupported}>
                                <Cast className="h-6 w-6" />
                            </Button>
                          </TooltipTrigger>
                          {!isCastSupported && (
                            <TooltipContent>
                              <p>Cast not supported on this browser</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
