'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

const playlist = [
    {
        title: "Midnight City",
        artist: "M83",
        src: "/montagem-alquimia-ultra-slowed.mp3"
    },
    {
        title: "montagem alquimia",
        artist: "h6itam",
        src: "/montagem-alquimia-ultra-slowed.mp3"
    },
    {
        title: "saturn",
        artist: "SZA",
        src: "/saturn_best.mp3"
    }
];

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [trackError, setTrackError] = useState<string | null>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = playlist[currentTrackIndex];

    // Helper to convert MediaError into readable message
    const getMediaErrorMessage = (err: MediaError | null): string => {
        if (!err) return 'Unknown audio error';
        switch (err.code) {
            case 1:
                return 'MEDIA_ERR_ABORTED: The fetching process was aborted by the user agent.';
            case 2:
                return 'MEDIA_ERR_NETWORK: A network error caused the user agent to stop fetching.';
            case 3:
                return 'MEDIA_ERR_DECODE: An error occurred while decoding the media.';
            case 4:
                return 'MEDIA_ERR_SRC_NOT_SUPPORTED: The media resource indicated by the src was not suitable.';
            default:
                return 'Unknown MediaError code: ' + err.code;
        }
    };

    // Handle track change effects with robust error handling
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onError = () => {
            const err = audio.error;
            const msg = getMediaErrorMessage(err);
            console.error('Audio element error:', msg);
            setTrackError(msg);
            // Prevent previous buffer from continuing: stop and clear src
            try {
                audio.pause();
                audio.currentTime = 0;
                audio.src = '';
                audio.load();
            } catch (e) {
                console.warn('Error while clearing audio source', e);
            }
            setIsPlaying(false);
        };

        const onCanPlay = () => {
            // Clear any past error state when the new track becomes playable
            setTrackError(null);
        };

        audio.addEventListener('error', onError);
        audio.addEventListener('canplay', onCanPlay);

        // Reset/load the new track
        audio.pause();
        audio.load();
        setTrackError(null);

        if (isPlaying) {
            audio.play().catch((e) => {
                console.error('Playback failed on track change:', e);
                setTrackError('Playback failed: ' + (e instanceof Error ? e.message : String(e)));
                setIsPlaying(false);
            });
        }

        return () => {
            audio.removeEventListener('error', onError);
            audio.removeEventListener('canplay', onCanPlay);
        };
    }, [currentTrackIndex]);

    // Toggle Play/Pause
    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        try {
            await audio.play();
            setIsPlaying(true);
            setTrackError(null);
        } catch (e) {
            console.error('play() rejected:', e);
            setTrackError('Playback failed: ' + (e instanceof Error ? e.message : String(e)));
            setIsPlaying(false);
            // Make sure previous audio buffer is not audible
            try {
                audio.pause();
                audio.currentTime = 0;
                audio.src = '';
                audio.load();
            } catch (err) {
                console.warn('Error while clearing audio after play() failure', err);
            }
        }
    };

    // Next Track
    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    // Previous Track
    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    // Toggle Mute
    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleTrackEnd = () => {
        nextTrack();
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "circOut" }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-4 p-3 pr-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
        >
            <audio
                ref={audioRef}
                key={currentTrack.src}
                src={currentTrack.src}
                onEnded={handleTrackEnd}
                onError={() => {
                    const audio = audioRef.current;
                    if (!audio) return;
                    const msg = getMediaErrorMessage(audio.error);
                    console.error('onError (audio):', msg);
                    setTrackError(msg);
                    // ensure no previous buffer continues
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.src = '';
                        audio.load();
                    } catch (e) {
                        console.warn('Error clearing audio on onError', e);
                    }
                    setIsPlaying(false);
                }}
                onCanPlay={() => setTrackError(null)}
            />

            {/* Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={prevTrack}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                >
                    <SkipBack className="w-4 h-4 fill-current" />
                </button>

                <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors"
                >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                    onClick={nextTrack}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                >
                    <SkipForward className="w-4 h-4 fill-current" />
                </button>
            </div>

            {/* Visualizer & Track Info */}
            <div className="flex flex-col gap-1 w-32 overflow-hidden">
                <div className="flex items-end gap-0.5 h-3">
                    {/* 4 Bar Visualizer */}
                    {[1, 2, 3, 4].map((bar) => (
                        <motion.div
                            key={bar}
                            animate={{
                                height: isPlaying ? [4, 12, 6, 12] : 2,
                            }}
                            transition={{
                                duration: 0.4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear",
                                delay: bar * 0.1
                            }}
                            className="w-1 bg-white/80 rounded-full"
                        />
                    ))}
                </div>

                {/* Scrolling Marquee */}
                <div className="relative h-4 overflow-hidden w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTrackIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute inset-0"
                        >
                            <motion.div
                                animate={{ x: isPlaying ? "-50%" : "0%" }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 0
                                }}
                                className="flex whitespace-nowrap gap-4"
                            >
                                <span className="text-[12px] uppercase tracking-widest font-bold text-neutral-400">
                                    {currentTrack.title} — {currentTrack.artist}
                                </span>
                                <span className="text-[12px] uppercase tracking-widest font-bold text-neutral-400">
                                    {currentTrack.title} — {currentTrack.artist}
                                </span>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <button onClick={toggleMute} className="text-neutral-500 hover:text-white transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
        </motion.div>
    );
}
