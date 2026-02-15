'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import SectionLoader from './SectionLoader';


const navItems = [
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#skills' },
    { name: 'Contact', href: 'mailto:madhurjyaray394@gmail.com' },
];

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/madhurjyaray394', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/madhurjya-ray-93a880268', icon: FaLinkedin },
    { name: 'Instagram', href: 'https://www.instagram.com/madhurjya.dev/', icon: FaInstagram },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            // Only unset if not navigating (SectionLoader handles its own lock, but good to be safe)
            if (!isNavigating) {
                document.body.style.overflow = 'unset';
            }
        }
    }, [isOpen, isNavigating]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // If already on the target section? (Optional optimization, but let's always animate for premium feel)

        // Close mobile menu if open
        setIsOpen(false);

        // Start Transition
        setIsNavigating(true);

        // Wait for fade in, then scroll, then fade out
        setTimeout(() => {
            // Check if it's an external link or mailto
            if (href.startsWith('mailto:') || href.startsWith('http')) {
                window.location.href = href;
                setIsNavigating(false); // Reset immediately for external
                return;
            }

            // Scroll to section
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);

            if (element) {
                element.scrollIntoView({ behavior: 'auto' }); // Instant jump behind the curtain
            } else {
                window.location.href = href; // Fallback
            }

            // Short delay to ensure browser painted the new scroll position
            setTimeout(() => {
                setIsNavigating(false);
            }, 300); // 300ms wait before fading out

        }, 600); // 600ms fade-in time (matches SectionLoader transition somewhat)
    };

    return (
        <>
            <SectionLoader isLoading={isNavigating} />

            <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 flex justify-between items-start text-white pointer-events-none">
                {/* Logo Holder - Pointer events enabled for interaction */}
                <Link
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        setIsNavigating(true);

                        setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'auto' });
                            setTimeout(() => {
                                setIsNavigating(false);
                            }, 300);
                        }, 600);
                    }}
                    className="block mix-blend-normal pointer-events-auto cursor-pointer"
                    aria-label="Madhurjya Ray"
                >
                    <img src="/logoM.png" alt="Madhurjya Ray" className="h-10 w-auto object-contain" />
                </Link>

                {/* Desktop Nav - Vertical List */}
                <nav className="hidden md:flex flex-col gap-2 items-end pointer-events-auto">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            // Removed 'overflow-hidden' which was causing the clipping
                            // Added 'pr-1' (padding-right) to give space for the negative translation if needed, though usually not strict requirement if overflow is visible.
                            // Kept 'group' and 'relative' for the transform effect.
                            className="group relative text-sm font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-wider py-1 block cursor-pointer"
                        >
                            <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-x-1">
                                {item.name}
                            </span>
                        </a>
                    ))}
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden p-2 text-white focus:outline-none pointer-events-auto"
                >
                    <Menu className="w-8 h-8" />
                </button>
            </header>

            {/* Mobile Side Panel Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                        />

                        {/* Side Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-neutral-950 border-l border-white/10 z-50 p-8 flex flex-col md:hidden"
                        >
                            <div className="flex justify-between items-center mb-16">
                                {/* Animated Logo */}
                                <div className="block">
                                    <img src="/logoM.png" alt="Madhurjya Ray" className="h-10 w-auto object-contain" />
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white hover:text-neutral-400 transition-colors"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6">
                                {navItems.map((item, index) => {

                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleNavClick(e, item.href)}
                                                className="text-4xl font-bold text-white hover:text-neutral-500 transition-colors block"
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
                                <p>madhurjyaray.business@gmail.com</p>
                                <p className="mt-2">© {new Date().getFullYear()} madhu ray</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
