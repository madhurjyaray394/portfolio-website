'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface SectionLoaderProps {
    isLoading: boolean;
}

export default function SectionLoader({ isLoading }: SectionLoaderProps) {
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Also ensure any lingering styles are cleaned up
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                        className="relative"
                    >
                        <img
                            src="/logoM.png"
                            alt="Loading..."
                            className="h-16 w-auto object-contain md:h-20 opacity-90"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
