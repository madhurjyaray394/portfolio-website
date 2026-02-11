'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Hide loading screen after 2.5 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = 'unset';
        }, 2500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                    style={{ willChange: 'opacity' }}
                >
                    {/* Animated Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.2
                        }}
                        className="text-center"
                    >
                        <h1 className="text-2xl md:text-5xl lg:text-6xl text-white tracking-tight">
                            <span className="font-bold">Madhurjya's</span> <span className="font-thin">Portfolio</span>
                        </h1>

                        {/* Animated underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.8
                            }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mt-6 mx-auto"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
