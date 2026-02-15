'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import GradientBlinds from './GradientBlinds';
import StarBorder from './StarBorder';
import Stack from './Stack';
import SectionLoader from './SectionLoader';
import { useMemo, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Hero() {
    const [isLoading, setIsLoading] = useState(false);

    const handleViewProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    };

    const cards = useMemo(() => [
        <div key={1} className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center text-white border border-white/10 overflow-hidden">
            <img src="/IMG_2468.JPG" alt="Project 1" className="w-full h-full object-cover" />
        </div>,
        <div key={2} className="w-full h-full bg-neutral-800 rounded-2xl flex items-center justify-center text-white border border-white/10 overflow-hidden">
            <img src="/img.jpg" alt="Project 2" className="w-full h-full object-cover" />
        </div>,
        <div key={3} className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center text-white border border-white/10">
            <img src="/IMG_3813.JPG" alt="Project 3" className="w-full h-full object-cover" />
        </div>,
    ], []);

    return (
        <>
            <SectionLoader isLoading={isLoading} />
            <section className="min-h-screen flex flex-col justify-center px-8 lg:px-24 pt-20 pb-16 md:pb-20 lg:pb-24 relative overflow-hidden bg-black selection:bg-white selection:text-black">
                {/* Gradient Blinds Background */}
                <div className="absolute inset-0 z-0">
                    <GradientBlinds
                        dpr={1}
                        gradientColors={['#000000ff', '#1f1f1f24', '#000000ff']}
                        blindCount={20}
                        spotlightOpacity={0.8}
                        className="opacity-40"
                    />
                </div>



                {/* Container - Split Layout */}
                <div className="max-w-7xl w-full mx-auto z-10 relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column - Hero Content (Left Aligned) */}
                    <div className="flex flex-col items-start text-left w-full pl-4 md:pl-8 lg:pl-12">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-5 text-base font-mono text-neutral-400"
                        >
                            Hey!
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-2xl md:text-4xl font-mono font-normal leading-relaxed text-white mb-6"
                        >
                            I'm Madhurjya
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-sm md:text-base font-mono font-normal text-neutral-400 leading-relaxed max-w-3xl mb-6"
                        >
                            I’m a <a className="underline decoration-1 underline-offset-4">frontend-focused full-stack developer</a> from <a className="underline decoration-1 underline-offset-4">Assam, India</a>, building clean, performant user interfaces.
                            {' '}
                            I work with <a className="underline decoration-1 underline-offset-4">React</a>, <a className="underline decoration-1 underline-offset-4">Next.js</a>, and <a className="underline decoration-1 underline-offset-4">Tailwind CSS</a>, and I’m strengthening my skills in <a href="#skills" className="underline decoration-1 underline-offset-4">TypeScript</a> and <a href="#skills" className="underline decoration-1 underline-offset-4">backend development</a>.
                        </motion.p>

                        {/* Action Buttons - Left Aligned */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col sm:flex-row gap-5 items-center sm:items-center justify-start w-full mt-4"
                        >

                            <StarBorder
                                as="a"
                                href="#projects"
                                onClick={handleViewProjects}
                                className="cursor-pointer"
                                color="#a855f7"
                                speed="3s"
                                thickness={3}
                            >
                                View Projects
                            </StarBorder>

                            {/* Social Links - Desktop Only */}
                            <div className="hidden md:flex items-center gap-4">
                                <a
                                    href="https://github.com/madhurjyaray394"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-white hover:text-neutral-400 transition-colors duration-300"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/madhurjya-ray-93a880268"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-white hover:text-neutral-400 transition-colors duration-300"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.instagram.com/madhurjya.dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="text-white hover:text-neutral-400 transition-colors duration-300"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Stack Component */}
                    <div className="w-fullh-full flex items-center justify-center relative">
                        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
                            <Stack
                                randomRotation={true}
                                sensitivity={180}
                                sendToBackOnClick={false}
                                mobileClickOnly={true}
                                cards={cards}
                            />
                        </div>
                    </div>

                </div>


                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="w-fit mx-auto mt-16 relative md:absolute md:bottom-10 md:left-1/2 md:-translate-x-1/2 md:m-0 text-white/50"
                >
                    <div className="animate-bounce">
                        <ChevronDown size={24} />
                    </div>
                </motion.div>
            </section>
        </>
    );
}
