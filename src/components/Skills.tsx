'use client';

import { motion } from 'framer-motion';

const skills = [
    { name: "Next.js", src: "/next.svg" },
    { name: "React", src: "/react-logo.svg" },
    { name: "TypeScript", src: "/typescript-logo.svg" },
    { name: "Tailwind CSS", src: "/tailwindcss-logo.svg" },
    { name: "Framer Motion", src: "/motion.svg" },
    { name: "GSAP", src: "/gsap-black.svg" },
    { name: "Figma", src: "/figma-logo.svg" },
    { name: "Supabase", src: "/supabase-logo.svg" },
];

export default function Skills() {
    return (
        <section id="skills" className="py-16 md:py-20 lg:py-24 border-y border-white/5 bg-black overflow-hidden relative z-20">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Heading */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
                <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    Professional at
                </h2>
            </div>

            <div className="flex overflow-hidden">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ willChange: 'transform' }}
                    className="flex flex-shrink-0 gap-16 md:gap-24 px-8 md:px-12 items-center will-change-transform"
                >
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flex items-center justify-center w-32 h-20 relative grayscale flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={skill.src}
                                alt={skill.name}
                                className="w-full h-full object-contain invert brightness-200 scale-75 md:scale-90"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
