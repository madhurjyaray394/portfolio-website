"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from './MediaGrid';

interface ImageLightboxProps {
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    onClose: () => void;
    images?: MediaItem[];
    currentIndex?: number;
    onNavigate?: (index: number) => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
    isOpen,
    imageSrc,
    imageAlt,
    onClose,
    images = [],
    currentIndex = 0,
    onNavigate
}) => {
    const [mounted, setMounted] = useState(false);

    // Mount portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close on ESC key and handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && onNavigate && currentIndex > 0) {
                onNavigate(currentIndex - 1);
            }
            if (e.key === 'ArrowRight' && onNavigate && currentIndex < images.length - 1) {
                onNavigate(currentIndex + 1);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Lock scroll when lightbox is open
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = ''; // Prevent layout shift
        } else {
            // Restore scroll
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '';
        };
    }, [isOpen, onClose, onNavigate, currentIndex, images.length]);

    const handlePrevious = () => {
        if (onNavigate && currentIndex > 0) {
            onNavigate(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (onNavigate && currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
        }
    };

    // Don't render until mounted (client-side only)
    if (!mounted) return null;

    const lightboxContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        margin: 0,
                        padding: 0
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-[10000] p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    {images.length > 0 && (
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-[10000] px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-mono">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}

                    {/* Navigation Arrows */}
                    {images.length > 1 && onNavigate && (
                        <>
                            {/* Previous Button */}
                            {currentIndex > 0 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrevious();
                                    }}
                                    className="absolute left-4 md:left-8 z-[10000] p-3 rounded-full bg-black/70 border border-white/30 text-white hover:bg-black/90 transition-all duration-200 backdrop-blur-md shadow-xl"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            )}

                            {/* Next Button */}
                            {currentIndex < images.length - 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="absolute right-4 md:right-8 z-[10000] p-3 rounded-full bg-black/70 border border-white/30 text-white hover:bg-black/90 transition-all duration-200 backdrop-blur-md shadow-xl"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            )}
                        </>
                    )}

                    {/* Image Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                    >
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    // Render using Portal to document.body
    return createPortal(lightboxContent, document.body);
};

export default ImageLightbox;
