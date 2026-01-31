'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: 'mailto:madhurjyaray394@gmail.com' },
];

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/madhurjyaray394', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/madhurjyaray', icon: FaLinkedin },
    { name: 'Instagram', href: 'https://instagram.com/madhurjyaray', icon: FaInstagram },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const words = ['Madhurjya', 'Ray'];
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setWordIndex(i => (i + 1) % words.length), 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 lg:px-12 py-6 flex justify-between items-center text-white">
                {/* Logo Holder */}
                <Link href="/" className="text-2xl font-bold tracking-tighter relative inline-block" aria-label="Madhurjya Ray">

                    <span className="relative inline-block align-middle">
                        <span className="invisible block">Madhurjya</span>
                        <span className="absolute inset-0 flex items-center left-0">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={words[wordIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    className="pointer-events-none"
                                >
                                    {words[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </span>
                </Link>

                {/* Social Icons - Desktop Only */}
                <div className="hidden md:flex items-center gap-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className="text-white hover:text-neutral-400 transition-colors duration-300"
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>

                {/* Desktop Nav */}
                {/* Desktop Nav - Removed in favor of DesktopDock */}
                {/* <nav className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium hover:text-neutral-400 transition-colors uppercase tracking-wider"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav> */}

                {/* Mobile Nav Toggle */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden p-2 text-white focus:outline-none"
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
                            style={{ willChange: 'transform' }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-neutral-950 border-l border-white/10 z-50 p-8 flex flex-col md:hidden will-change-transform"
                        >
                            <div className="flex justify-between items-center mb-16">
                                {/* Animated Logo - Same as Desktop */}
                                <span className="text-xl font-bold text-white tracking-tighter relative inline-block">
                                    <span className="relative inline-block align-middle">
                                        <span className="invisible block">Madhurjya</span>
                                        <span className="absolute inset-0 flex items-center left-0">
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={words[wordIndex]}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                                    className="pointer-events-none"
                                                >
                                                    {words[wordIndex]}
                                                </motion.span>
                                            </AnimatePresence>
                                        </span>
                                    </span>
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white hover:text-neutral-400 transition-colors"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6">
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
                                                onClick={() => !isEmail && setIsOpen(false)}
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
                                <p>madhurjyaray394@gmail.com</p>
                                <p className="mt-2">© {new Date().getFullYear()} Ray.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
