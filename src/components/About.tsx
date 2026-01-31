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
        <section className="py-32 px-8 lg:px-24 bg-black text-white relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Portrait Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-sm mx-auto bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 group"
                >
                    {/* Portrait Image - Standard Grayscale */}
                    <div className="relative w-full h-full grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 ease-out">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/IMG_2874.JPG"
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
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 lg:order-2"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-white">/ about me</h2>
                    <div className="space-y-8 text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                        <p>
                            I'm currently a  <span className="text-white font-medium">Self employed Developer</span> building digital products where design quality, performance, and
                            usability matter. I work at the intersection of engineering and visual systems, turning ideas into clean, fast, and intentional interfaces.
                        </p>
                        <p>
                            I build with a product mindset: clarity over complexity, simplicity over noise, and decisions backed by real use—not trends.
                            My work is driven by hands-on building, iteration, and refinement.
                        </p>
                        <div className="space-y-4">

                            <ul className="list-disc list-inside space-y-2 text-neutral-400 max-w-md mx-auto text-left">
                                <p className="text-white font-medium">Tools I work with:</p>
                                <li>JavaScript / TypeScript</li>
                                <li>React & Next.js</li>
                                <li>Tailwind CSS</li>
                                <li>Framer Motion</li>
                                <li>Modern UI & interaction patterns</li>
                            </ul>
                        </div>
                        <p>Outside of work, I'm into design systems, ambient music, documenting my build process,
                            and continuously refining my taste through real projects.</p>

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
