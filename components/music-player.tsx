"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      id: 1,
      title: "Ethereal Focus",
      artist: "Studio Session",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Deep Work Mode",
      artist: "Signal Labs",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      title: "Execution Flow",
      artist: "System Noise",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: "Late Night Build",
      artist: "Ambient Core",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      title: "Product Sprint",
      artist: "Pulse Engine",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      id: 6,
      title: "Startup Focus",
      artist: "Minimal Systems",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    const handleEnded = () => nextTrack();

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  // 🔥 MUHIM: track o‘zgarganda avtomatik play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrack, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-4 text-center">
          Focus <span className="text-primary">Soundtrack</span>
        </h2>
        <p className="text-xl text-foreground/70 text-center mb-16">
          A minimal soundtrack built for deep work, execution, and building
          products
        </p>

        <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
          {/* Now Playing */}
          <div>
            <p className="text-sm text-foreground/60 mb-2">Now Playing</p>
            <h3 className="text-2xl font-serif font-bold mb-1">
              {tracks[currentTrack].title}
            </h3>
            <p className="text-foreground/70">{tracks[currentTrack].artist}</p>
          </div>

          <audio ref={audioRef} src={tracks[currentTrack].url} />

          {/* Progress */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-muted rounded-full cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-foreground/60">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevTrack}
              className="p-3 hover:bg-primary/10 rounded-full"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-3 hover:bg-primary/10 rounded-full"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="ml-auto flex items-center gap-2 px-4 py-2 hover:bg-primary/10 rounded-full">
              <Volume2 className="w-5 h-5 text-foreground/70" />
              <span className="text-sm text-foreground/70">Volume</span>
            </div>
          </div>

          {/* Playlist */}
          <div className="space-y-2 border-t border-border pt-6">
            <p className="text-sm text-foreground/60 mb-4">Playlist</p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg ${
                    index === currentTrack
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-muted text-foreground/80"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-xs text-foreground/60">
                        {track.artist}
                      </p>
                    </div>
                    {index === currentTrack && isPlaying && (
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-primary rounded animate-pulse" />
                        <div
                          className="w-1 h-4 bg-primary rounded animate-pulse"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-1 h-4 bg-primary rounded animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
