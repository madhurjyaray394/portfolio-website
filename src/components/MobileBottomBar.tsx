'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

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

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/madhurjyaray', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/madhurjyaray', icon: FaLinkedin },
    { name: 'Instagram', href: 'https://instagram.com/madhurjyaray', icon: FaInstagram },
];

export default function MobileBottomBar() {
    // Navigation State
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Audio State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [showAudioHint, setShowAudioHint] = useState(false);

    const currentTrack = playlist[currentTrackIndex];

    useEffect(() => {
        // Show hint after a small delay on every mount/reload
        const timer = setTimeout(() => setShowAudioHint(true), 2000);
        return () => clearTimeout(timer);
    }, []);

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

    const dismissAudioHint = () => {
        setShowAudioHint(false);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
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

    return (
        <>
            {/* Bottom Bar Container */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-0 left-0 right-0 z-[60] bg-neutral-950/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex items-center justify-between md:hidden"
            >
                {/* Audio Player Section (Compact) */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative flex items-center gap-2">
                        {showAudioHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute bottom-full left-0 mb-4 w-48 p-3 bg-neutral-800/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 pointer-events-auto origin-bottom-left"
                            >
                                <div className="relative">
                                    <p className="text-lg text-neutral-300 font-bold leading-relaxed pr-4">
                                        You can play music here.
                                    </p>
                                    <button
                                        onClick={dismissAudioHint}
                                        className="absolute -top-1 -right-1 p-1 text-white/50 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-5" />
                                    </button>
                                    {/* Arrow/Tail aligning to left since we are aligned left */}
                                    <div className="absolute -bottom-[18px] left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-800/90" />
                                </div>
                            </motion.div>
                        )}

                        {/* Controls */}
                        <button
                            onClick={prevTrack}
                            className="p-1 text-neutral-400 hover:text-white transition-colors"
                        >
                            <SkipBack className="w-4 h-4 fill-current" />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 flex-shrink-0 rounded-full bg-white text-black flex items-center justify-center"
                        >
                            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                        </button>

                        <button
                            onClick={nextTrack}
                            className="p-1 text-neutral-400 hover:text-white transition-colors"
                        >
                            <SkipForward className="w-4 h-4 fill-current" />
                        </button>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio
                        ref={audioRef}
                        src={currentTrack.src}
                        onEnded={handleTrackEnd}
                    />

                    <div className="flex flex-col overflow-hidden mr-4 flex-1">
                        <div className="flex items-center gap-2">
                            {/* Mini Visualizer */}
                            <div className="flex items-end gap-0.5 h-3">
                                {[1, 2, 3].map((bar) => (
                                    <motion.div
                                        key={bar}
                                        animate={{ height: isPlaying ? [3, 10, 5, 10] : 2 }}
                                        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", delay: bar * 0.1 }}
                                        className="w-0.5 bg-white/60 rounded-full"
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Now Playing</span>
                        </div>

                        {/* Scrolling Marquee */}
                        <div className="relative h-4 w-full overflow-hidden">
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
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="flex whitespace-nowrap gap-4"
                                    >
                                        <span className="text-sm font-bold text-white">{currentTrack.title} — {currentTrack.artist}</span>
                                        <span className="text-sm font-bold text-white">{currentTrack.title} — {currentTrack.artist}</span>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav Toggle */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="p-2 text-white/80 hover:text-white transition-colors"
                >
                    <Menu className="w-8 h-8" />
                </button>
            </motion.div>

            {/* Right-Side Sliding Panel */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden"
                        />

                        {/* Side Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            style={{ willChange: 'transform' }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-neutral-950 border-l border-white/10 z-[70] p-8 flex flex-col md:hidden will-change-transform"
                        >
                            <div className="flex justify-between items-center mb-16">
                                <span className="text-xl font-bold text-white tracking-tighter">Madhurjya Ray</span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-white hover:text-neutral-400 transition-colors"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-8">
                                {navItems.map((item, index) => {
                                    const isEmail = item.href.startsWith('mailto:');

                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <a
                                                href={item.href}
                                                onClick={() => !isEmail && setIsMenuOpen(false)}
                                                className="text-4xl font-bold text-white/90 hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* Social Icons */}
                            <div className="mt-auto mb-6">
                                <div className="flex items-center gap-6 justify-start">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                            className="text-white hover:text-neutral-400 transition-colors duration-300"
                                        >
                                            <social.icon className="w-6 h-6" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="text-neutral-500 text-sm">
                                <p>Built and designed by Madhu</p>
                                <p className="mt-2">© {new Date().getFullYear()} All rights reserved</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
