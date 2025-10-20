'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Loader2, Plus, Sparkles, Play, Pause, Rewind, FastForward, Volume2, Volume1, VolumeX, Maximize, Minimize } from 'lucide-react';
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
import { Slider } from './ui/slider';


type MoviePageClientProps = {
  movie: Movie;
};

export function MoviePageClient({ movie }: MoviePageClientProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const onWatchlist = isInWatchlist(movie.id);

  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  // Player state
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const parts: string[] = [];

    if (hours > 0) {
      parts.push(String(hours).padStart(2, '0'));
    }
    parts.push(String(minutes).padStart(2, '0'));
    parts.push(String(seconds).padStart(2, '0'));

    return parts.join(':');
  };

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

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
        const newVolume = value[0];
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullScreen = useCallback(() => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${'\'\''}${err.message}${'\'\''}} (${'\'\''}${err.name}${'\'\''})`);
        });
    } else {
        document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ') {
            e.preventDefault();
            togglePlay();
        }
        if (e.key === 'ArrowRight') handleSkip(10);
        if (e.key === 'ArrowLeft') handleSkip(-10);
        if (e.key === 'f') toggleFullScreen();
        if (e.key === 'Escape' && isFullScreen) toggleFullScreen();
    };

    if(isPlayerOpen) {
        window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlayerOpen, togglePlay, toggleFullScreen, isFullScreen]);

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-muted-foreground">{movie.year}</span>
            <Badge variant="secondary">{movie.rating.toFixed(1)}</Badge>
            <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="outline">{genre}</Badge>
                ))}
            </div>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {movie.longDescription}
          </p>
          
          <Accordion type="single" collapsible className="w-full" value={isAccordionOpen ? "item-1" : ""} onValueChange={(value) => setIsAccordionOpen(value === "item-1")}>
            <AccordionItem value="item-1">
                <AccordionTrigger onClick={handleGenerateSummary} className="p-0 hover:no-underline flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer">
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
              <AccordionContent className="pt-4 text-base text-muted-foreground">
                {summary || 'Click the button to generate a summary.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
        <div className="w-full md:w-72">
          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full font-bold text-lg" onClick={() => setIsPlayerOpen(true)} disabled={!movie.videoUrl}>
              <Play className="mr-2 h-6 w-6 fill-current" /> Play
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full font-bold text-lg"
              onClick={() => onWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id)}
            >
              {onWatchlist ? (
                <Check className="mr-2 h-6 w-6" />
              ) : (
                <Plus className="mr-2 h-6 w-6" />
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
                <div ref={playerRef} className="relative w-full h-full group" onClick={togglePlay}>
                    <video 
                        ref={videoRef} 
                        className="w-full h-full" 
                        src={movie.videoUrl}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Center Play/Pause Button */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-110"
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
                         {!isPlaying && (
                            <Button variant="ghost" size="icon" className="w-24 h-24 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white pointer-events-auto backdrop-blur-sm">
                                <Play className="h-12 w-12 ml-2 fill-current" />
                            </Button>
                        )}
                    </div>
                    
                    {/* Controls Overlay */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={(e) => e.stopPropagation()} // Prevent parent onClick
                    >
                      {/* Progress Bar */}
                      <Slider
                        value={[progress]}
                        onValueChange={handleSeek}
                        className="w-full h-2 cursor-pointer"
                      />
                      
                      {/* Controls Row */}
                      <div className="flex items-center justify-between text-white mt-2">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={togglePlay}>
                                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1 fill-current" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={() => handleSkip(-10)}>
                                <Rewind className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={() => handleSkip(10)}>
                                <FastForward className="h-6 w-6" />
                            </Button>
                            <div className="flex items-center gap-2 group/volume">
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={toggleMute}>
                                    {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : volume < 0.5 ? <Volume1 className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                                </Button>
                                <Slider
                                    max={1}
                                    step={0.1}
                                    value={[isMuted ? 0 : volume]}
                                    onValueChange={handleVolumeChange}
                                    className="w-24 h-2 cursor-pointer opacity-0 group-hover/volume:opacity-100 transition-opacity"
                                />
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={toggleFullScreen}>
                                            {isFullScreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                                        </Button>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                          </div>
                      </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
