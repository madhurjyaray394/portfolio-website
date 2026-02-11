"use client";

import React, { useRef, useState } from 'react';
import ImageLightbox from './ImageLightbox';
import './MediaGrid.css';

export interface MediaItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string; // thumbnail for videos
}

interface MediaGridProps {
    media: MediaItem[]; // expects up to 5 items
}

const MediaGrid: React.FC<MediaGridProps> = ({ media }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Return null if no media items
    if (!media || media.length === 0) {
        return null;
    }

    // Use only actual media items (no placeholders)
    const mediaSlots = media;

    // Desktop: Show only first image when collapsed
    // Mobile: Always show all images
    const firstImage = mediaSlots[0];
    const remainingImages = mediaSlots.slice(1);

    // Only get image type items for lightbox
    const imageItems = mediaSlots.filter(item => item.type === 'image');

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="media-grid-wrapper">
                {/* First Image - Always Visible */}
                <div className="media-grid-primary">
                    <MediaSlot
                        item={firstImage}
                        isLarge={true}
                        index={0}
                        onImageClick={handleImageClick}
                    />
                </div>

                {/* Remaining Images - Desktop: Toggleable, Mobile: Always Visible */}
                <div className={`media-grid-secondary ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    {remainingImages.map((item, index) => (
                        <MediaSlot
                            key={index + 1}
                            item={item}
                            isLarge={false}
                            index={index + 1}
                            onImageClick={handleImageClick}
                        />
                    ))}
                </div>

                {/* Expand/Collapse Button - Desktop Only */}
                <button
                    className="media-expand-toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={isExpanded ? 'Show less images' : 'Show more images'}
                >
                    {isExpanded ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="12 10 8 6 4 10" />
                            </svg>
                            <span>Show Less</span>
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="4 6 8 10 12 6" />
                            </svg>
                            <span>Show More ({remainingImages.length})</span>
                        </>
                    )}
                </button>
            </div>

            {/* Image Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                imageSrc={imageItems[selectedImageIndex]?.src || ''}
                imageAlt={imageItems[selectedImageIndex]?.alt || 'Project image'}
                onClose={() => setLightboxOpen(false)}
                images={imageItems}
                currentIndex={selectedImageIndex}
                onNavigate={setSelectedImageIndex}
            />
        </>
    );
};

interface MediaSlotProps {
    item: MediaItem;
    isLarge: boolean;
    index: number;
    onImageClick?: (index: number) => void;
}

const MediaSlot: React.FC<MediaSlotProps> = ({ item, isLarge, index, onImageClick }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    if (item.type === 'video') {
        return (
            <div className={`media-slot ${isLarge ? 'media-slot-large' : ''}`}>
                <video
                    ref={videoRef}
                    className="media-content"
                    poster={item.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Play/Pause Control */}
                <button
                    className="video-control"
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                    {isPlaying ? (
                        // Pause Icon
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        // Play Icon
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
            </div>
        );
    }

    // Image
    return (
        <div className={`media-slot ${isLarge ? 'media-slot-large' : ''}`}>
            <img
                src={item.src}
                alt={item.alt || `Project media ${index + 1}`}
                className="media-content"
                loading="lazy"
                onClick={() => onImageClick?.(index)}
                style={{ cursor: onImageClick ? 'pointer' : 'default' }}
            />
        </div>
    );
};

export default MediaGrid;
