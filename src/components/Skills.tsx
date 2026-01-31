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
        <section className="py-24 border-y border-white/5 bg-black overflow-hidden relative z-20">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            <div className="flex overflow-hidden">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex flex-shrink-0 gap-16 md:gap-24 px-8 md:px-12 items-center"
                >
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flex items-center justify-center w-32 h-20 relative grayscale flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
                            {/* Using invert to ensure logos are white/monochrome on black bg.
                    Some logos might be already white, but grayscale+brightness should handle it. 
                    Actually, for consistent 'white' look on black bg, 'invert' works well for black logos, 
                    but colored logos need 'grayscale brightness(100)'. 
                    Let's try a brightness filter to force white. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={skill.src}
                                alt={skill.name}
                                className="w-full h-full object-contain filter invert brightness-200 contrast-0 sepia-0 saturate-0 scale-75 md:scale-90"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
