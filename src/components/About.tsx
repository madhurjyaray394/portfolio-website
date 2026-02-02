'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

function useCount(target: number, duration = 1200, decimals = 0) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let rafId: number;
        const start = performance.now();
        const from = 0;

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = from + (target - from) * progress;
            const factor = Math.pow(10, decimals);
            setValue(Math.round(current * factor) / factor);
            if (progress < 1) rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [target, duration, decimals]);

    return value;
}

export default function About() {
    const years = useCount(1.5, 1400, 1);
    const projects = useCount(10, 1200, 0);

    return (
        <section id="about" className="py-32 px-8 lg:px-24 bg-black text-white relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Portrait Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    style={{ willChange: 'transform, opacity' }}
                    className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-sm mx-auto bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 group shadow-[0_0_30px_6px_rgba(99,102,241,0.35)] lg:shadow-[0_0_25px_4px_rgba(99,102,241,0.25)] lg:hover:shadow-[0_0_45px_10px_rgba(99,102,241,0.45)] transition-shadow duration-500 will-change-transform"
                >
                    {/* Portrait Image - Standard Grayscale */}
                    <div className="relative w-full h-full grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 ease-out">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/IMG_3813.jpg"
                            alt="Portrait of the Engineer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle gradient at bottom for text readability if needed, otherwise clean */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
                    style={{ willChange: 'transform, opacity' }}
                    className="order-1 lg:order-2 will-change-transform"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-white">/ about me</h2>
                    <div className="space-y-8 text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                        <p className="text-neutral-300 leading-relaxed">
                            I’m a <strong className="font-semibold text-white">self-employed developer</strong>{" "}
                            who enjoys turning ideas into real web applications. I focus on frontend
                            development and clean user experiences, but I’m comfortable working across
                            the stack when needed.
                        </p>

                        <p className="text-neutral-300 leading-relaxed mt-4">
                            I’m open to collaborations and always learning. Right now I work with{" "}
                            <strong className="font-medium text-white">React</strong>,{" "}
                            <strong className="font-medium text-white">Next.js</strong>,{" "}
                            <strong className="font-medium text-white">JavaScript</strong>, and{" "}
                            <strong className="font-medium text-white">Tailwind CSS</strong>, and I’m improving my backend skills and learning{" "}
                            <strong className="font-medium text-white">TypeScript</strong>.
                        </p>

                        <p className="text-neutral-300 leading-relaxed mt-4">
                            Outside of work, I love bikes, coffee (with sugar ☕), and music — mostly EDM,
                            but I listen to almost everything.
                        </p>

                        <div className="pt-6 pb-10 flex justify-center sm:justify-start">
                            <a
                                href="mailto:madhurjyaray394@gmail.com"
                                className="mx-auto
                                         inline-flex items-center gap-4
                                            px-13 py-5 sm:px-10 sm:py-5 rounded-xl
                                            border border-cyan-400
                                            text-2xl sm:text-base text-cyan-300
                                            font-medium
                                            shadow-[0_0_20px_rgba(34,211,238,0.35)]
                                            hover:shadow-none
                                            hover:bg-cyan-400/10
                                            transition-all group"
                            >
                                <Mail className="w-9 h-9 sm:w-8 sm:h-8 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                <span>Say hi!</span>
                            </a>
                        </div>

                        <div className="pt-8 hidden sm:flex gap-10 flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start">


                        </div>
                    </div>
                </motion.div>


            </div>

        </section>
    );
}
