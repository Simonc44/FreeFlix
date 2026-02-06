
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, Check, Loader2, Plus, Play, Pause, Rewind, FastForward, Volume2, Volume1, VolumeX, Maximize, Minimize } from 'lucide-react';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';


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

  // Iframe player state
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isOverlayButtonVisible, setIsOverlayButtonVisible] = useState(true);
  const overlayButtonTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const heroImage = PlaceHolderImages.find((p) => p.id === 'interstellar-hero');

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
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
    if (videoRef.current && isFinite(videoRef.current.duration)) {
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
    if (!playerRef.current && !movie.iframeUrl) return;
    
    const element = movie.iframeUrl ? document.querySelector('iframe') : playerRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            alert(`Erreur lors de l'activation du mode plein écran : ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  }, [movie.iframeUrl]);

  const handleMouseMoveOnPlayer = useCallback(() => {
    setIsOverlayButtonVisible(true);
    if (overlayButtonTimeoutRef.current) {
      clearTimeout(overlayButtonTimeoutRef.current);
    }
    overlayButtonTimeoutRef.current = setTimeout(() => {
      setIsOverlayButtonVisible(false);
    }, 2000);
  }, []);

  const handleMouseLeavePlayer = useCallback(() => {
    setIsOverlayButtonVisible(true);
    if (overlayButtonTimeoutRef.current) {
      clearTimeout(overlayButtonTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (isPlayerOpen) {
      setIsIframeLoading(true);
    }
  }, [isPlayerOpen]);

  useEffect(() => {
    const playerDiv = document.querySelector('#iframe-player');
    if (isPlayerOpen && movie.iframeUrl && playerDiv) {
      playerDiv.addEventListener('mousemove', handleMouseMoveOnPlayer);
      playerDiv.addEventListener('mouseleave', handleMouseLeavePlayer);
      handleMouseMoveOnPlayer(); // Initial call
    }

    return () => {
      if (overlayButtonTimeoutRef.current) {
        clearTimeout(overlayButtonTimeoutRef.current);
      }
      if (playerDiv) {
        playerDiv.removeEventListener('mousemove', handleMouseMoveOnPlayer);
        playerDiv.removeEventListener('mouseleave', handleMouseLeavePlayer);
      }
    };
  }, [isPlayerOpen, movie.iframeUrl, handleMouseMoveOnPlayer, handleMouseLeavePlayer]);


  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        if (movie.iframeUrl) return; // Disable shortcuts for iframe
        
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
  }, [isPlayerOpen, togglePlay, toggleFullScreen, isFullScreen, movie.iframeUrl]);

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
                            Génération du résumé IA...
                            </>
                        ) : (
                            <>
                            {summary ? 'Résumé généré par IA' : 'Générer un résumé par IA'}
                            </>
                        )}
                    </div>
                </AccordionTrigger>
              <AccordionContent className="pt-4 text-base text-muted-foreground">
                {summary || 'Cliquez sur le bouton pour générer un résumé.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
        <div className="w-full md:w-72">
          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full font-bold text-lg" onClick={() => setIsPlayerOpen(true)} disabled={!movie.videoUrl && !movie.iframeUrl}>
              <Play className="fill-current" /> Lecture
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full font-bold text-lg"
              onClick={() => onWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id)}
            >
              {onWatchlist ? (
                <Check />
              ) : (
                <Plus />
              )}
              {onWatchlist ? 'Dans ma liste' : 'Ajouter à ma liste'}
            </Button>
          </div>
        </div>
      </div>
      {(movie.videoUrl || movie.iframeUrl) && (
        <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
            <DialogContent className="w-screen h-screen max-w-full p-0 border-0 bg-black">
                <DialogHeader className="sr-only">
                  <DialogTitle>Lecture : {movie.title}</DialogTitle>
                  <DialogDescription>Lecteur vidéo pour le film {movie.title}.</DialogDescription>
                </DialogHeader>

                {movie.iframeUrl ? (
                    <div
                        id="iframe-player"
                        className="relative w-full h-full group"
                    >
                        {isIframeLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-20">
                                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                                <p className="text-lg text-muted-foreground">Chargement du lecteur...</p>
                            </div>
                        )}
                        <iframe
                            src={movie.iframeUrl}
                            title={movie.title}
                            className="w-full h-full border-0"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            onLoad={() => {
                                setTimeout(() => {
                                    setIsIframeLoading(false);
                                }, 2000);
                            }}
                        ></iframe>
                        <div className={cn(
                            "absolute top-6 left-6 transition-opacity duration-500 w-64 z-30",
                            isOverlayButtonVisible && !isIframeLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        )}>
                            <Button
                                size="lg"
                                className="w-full hover:bg-secondary"
                                variant="secondary"
                                onClick={() => setIsPlayerOpen(false)}
                            >
                                <ArrowLeft />
                                Retourner sur la fiche
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div ref={playerRef} className="relative w-full h-full group" onClick={togglePlay}>
                        {heroImage && !isPlaying && (
                            <Image
                            src={heroImage.imageUrl}
                            alt={movie.title}
                            fill
                            priority
                            className="object-cover -z-20"
                            data-ai-hint={heroImage.imageHint}
                            />
                        )}
                        <div className="absolute inset-0 bg-black/50 -z-10" />

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
                            Votre navigateur ne supporte pas la balise vidéo.
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="w-full">
                                    <Slider
                                        value={[progress]}
                                        onValueChange={handleSeek}
                                        className="w-full h-1.5 cursor-pointer"
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="top" align="start" className="ml-[-2.5em]">
                                    {formatTime(currentTime)}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        
                        {/* Controls Row */}
                        <div className="flex items-center justify-between text-white mt-2">
                            <div className="flex items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={togglePlay}>
                                                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1 fill-current" />}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>{isPlaying ? 'Pause' : 'Lecture'}</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={() => handleSkip(-10)}>
                                                <Rewind className="h-6 w-6" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Reculer de 10s</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={() => handleSkip(10)}>
                                                <FastForward className="h-6 w-6" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Avancer de 10s</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="flex items-center gap-2 group/volume">
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={toggleMute}>
                                        {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : volume < 0.5 ? <Volume1 className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                                    </Button>
                                    <Slider
                                        max={1}
                                        step={0.1}
                                        value={[isMuted ? 0 : volume]}
                                        onValueChange={handleVolumeChange}
                                        className="w-24 h-1.5 cursor-pointer opacity-0 group-hover/volume:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={toggleFullScreen}>
                                                {isFullScreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>{isFullScreen ? 'Quitter le plein écran' : 'Plein écran'}</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
