'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-8 lg:px-24 pt-20 relative overflow-hidden bg-black selection:bg-white selection:text-black">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[128px] pointer-events-none" />

            {/* Container - Added mb-24 on mobile/tablet to ensure gap from 'Professional at' */}
            <div className="max-w-7xl w-full mx-auto z-10 relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-24 lg:mb-0">

                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left w-full max-w-[90%] sm:max-w-lg lg:max-w-3xl mx-auto lg:mx-0">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-10 text-sm font-Regular uppercase tracking-[0.2em] text-neutral-400"
                    >
                        Hi,Madhu Here.
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white mb-12"
                    >
                        Building digital products <br className="hidden lg:block" />
                        at the intersection of <br className="hidden lg:block" />
                        <span className="font-serif italic font-light opacity-90 text-neutral-300">Design</span> & <span className="font-serif italic font-light opacity-90 text-neutral-300">Code</span>.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-6 items-center lg:items-start justify-center lg:justify-start"
                    >
                        <div className="flex flex-col gap-1 items-center lg:items-start">
                            <span className="text-neutral-500 text-xs uppercase tracking-wider font-semibold">Email me directly</span>
                            <Link href="mailto:madhurjyaray394@gmail.com" className="text-neutral-300 hover:text-white transition-colors border-b border-transparent hover:border-white/50 pb-0.5 font-medium">
                                madhurjyaray394@gmail.com
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Card - Designjoy Style (Refactored for Sharp Text) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg lg:w-[420px] min-h-[420px] relative lg:ml-auto flex-shrink-0 group hover:-translate-y-2 transition-transform duration-500"
                >
                    {/* Glass Background Layer (Separate from text) */}
                    <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-colors duration-500 group-hover:border-white/20" />

                    {/* Gradient Blobs (Clipped inside background) */}
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                    </div>

                    {/* Content Layer (Relative z-10 for Sharpness) */}
                    <div className="relative z-10 p-10 lg:p-8 h-full flex flex-col justify-between">
                        <div className="flex flex-col items-start">
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Available for Freelance</span>
                            </div>

                            {/* Card Content */}
                            <div>
                                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1]">
                                    Build with me
                                </h3>
                                <p className="text-neutral-400 text-base leading-relaxed max-w-sm">
                                    Frontend-focused, performance & UX driven developer ready to bring your vision to life.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-auto w-full space-y-3 pt-6">
                            <Link href="https://cal.com" target="_blank" className="relative flex items-center justify-center w-full p-4 bg-white text-black rounded-2xl font-bold text-base hover:bg-neutral-200 transition-colors group/btn">
                                <span>Book a call</span>
                                <ArrowUpRight className="absolute right-4 w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </Link>

                            <Link href="#projects" className="flex items-center justify-center w-full p-4 bg-white/5 border border-white/10 rounded-2xl font-medium text-sm text-white hover:bg-white/10 transition-colors">
                                View Projects
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 font- bold text-sm animate-bounce"
            >
                Professional at
            </motion.div>
        </section>
    );
}
