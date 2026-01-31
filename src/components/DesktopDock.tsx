'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, SkipBack, SkipForward } from 'lucide-react';

const playlist = [

    {
        title: "Raindance",
        artist: " tems & Dave ",
        src: "/raindance.mp3"
    },
    {
        title: "new drop",
        artist: "don toliver",
        src: "/new_drop.mp3"
    },
    {
        title: "Saturn",
        artist: "SZA",
        src: "/saturn_best.mp3"
    }
];

const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: 'mailto:madhurjyaray394@gmail.com' },
];

export default function DesktopDock() {
    // Audio State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = playlist[currentTrackIndex];

    // Handle track change effects
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.log("Playback failed:", e));
                }
            }
        }
    }, [currentTrackIndex, isPlaying]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    // Next Track
    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    // Previous Track
    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    const handleTrackEnd = () => {
        nextTrack();
    };

    // Onboarding Hint State
    const [showAudioHint, setShowAudioHint] = useState(false);

    useEffect(() => {
        // Show hint after a small delay on every mount/reload
        const timer = setTimeout(() => setShowAudioHint(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const dismissAudioHint = () => {
        setShowAudioHint(false);
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-8 px-8 py-4 bg-neutral-950/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl"
        >
            {/* Logo / Brand (Optional, keeping it subtle or removed based on instructions, but nice to have) */}
            {/* <span className="font-bold tracking-tighter">RAY.</span> */}

            {/* Navigation */}
            <nav className="flex items-center gap-6">
                {navItems.map((item) => {
                    // Check if it's an email link
                    const isEmail = item.href.startsWith('mailto:');

                    return isEmail ? (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            {item.name}
                        </a>
                    ) : (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            {item.name}
                        </a>
                    );
                })}
            </nav>

            {/* Vertical Divider */}
            <div className="w-px h-6 bg-white/10" />

            {/* Audio Player Controls */}
            <div className="relative flex items-center gap-4">
                {/* Onboarding Hint */}
                {/* Check hydration/mounting before showing to avoid hydration mismatch if using localstorage directly in state init */}
                {/* Actually using useEffect is better */}
                {showAudioHint && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-48 p-3 bg-neutral-800/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 pointer-events-auto"
                    >
                        <div className="relative">
                            <p className="text-xs text-neutral-300 font-medium leading-relaxed pr-4">
                                You can play music here while exploring.
                            </p>
                            <button
                                onClick={dismissAudioHint}
                                className="absolute -top-1 -right-1 p-1 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                            {/* Arrow/Tail */}
                            <div className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-800/90" />
                        </div>
                    </motion.div>
                )}

                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    src={currentTrack.src}
                    onEnded={handleTrackEnd}
                // Loop is disabled for playlist to allow auto-advance, or handled manually
                />

                <div className="flex items-center gap-3">
                    <div className="flex flex-col w-24 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTrackIndex}
                                initial={{ opacity: 0, y: 2 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -2 }}
                                className="flex flex-col"
                            >
                                <span className="text-xs font-bold text-white leading-none truncate">{currentTrack.title}</span>
                                <span className="text-[10px] text-neutral-500 font-medium leading-none truncate">{currentTrack.artist}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Visualizer */}
                    <div className="flex items-end gap-0.5 h-3">
                        {[1, 2, 3, 4].map((bar) => (
                            <motion.div
                                key={bar}
                                animate={{ height: isPlaying ? [4, 12, 6, 12] : 2 }}
                                transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", delay: bar * 0.1 }}
                                className="w-0.5 bg-white rounded-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prevTrack}
                        className="p-1.5 text-neutral-500 hover:text-white transition-colors"
                    >
                        <SkipBack className="w-3 h-3 fill-current" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                    </button>

                    <button
                        onClick={nextTrack}
                        className="p-1.5 text-neutral-500 hover:text-white transition-colors"
                    >
                        <SkipForward className="w-3 h-3 fill-current" />
                    </button>

                    <button onClick={toggleMute} className="text-neutral-500 hover:text-white transition-colors ml-2">
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
