'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        title: "Lumina Store",
        category: "E-Commerce",
        description: "Headless Shopify storefront with 3D product interactions.",
        year: "2024",
        size: "large" // spans 2 cols
    },
    {
        title: "Apex Analytics",
        category: "SaaS Dashboard",
        description: "Real-time financial data visualization for enterprise.",
        year: "2023",
        size: "small"
    },
    {
        title: "Mono UI",
        category: "Design System",
        description: "Comprehensive React component library for internal tools.",
        year: "2023",
        size: "small"
    },
    {
        title: "Vantage",
        category: "Portfolio",
        description: "Awwwards winning photography portfolio.",
        year: "2022",
        size: "large"
    }
];

export default function Projects() {
    return (
        <section className="py-16 md:py-32 px-8 lg:px-24 bg-black text-white relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-24 gap-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    >
                        Selected Work
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-neutral-400 text-lg max-w-sm text-left md:text-right"
                    >
                        A collection of projects that define my journey in digital product creation.
                    </motion.div>
                </div>

                <div className="flex flex-col gap-0 w-full">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} total={projects.length} />
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors text-lg font-medium">
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index, total }: { project: any, index: number, total: number }) {
    // Basic sticky float effect
    // To make it truly "floaty" in a stack, we scale it down as it hits the top
    // Since we don't have complex scroll tracking per card relative to the next, 
    // we use a simple sticky stack with a spring hover.

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'sticky',
                top: `calc(100px + ${index * 30}px)`,
                zIndex: index + 1
            }}
            className="h-[500px] w-full mb-12 origin-top"
        >
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative h-full w-full rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-[0_-5px_30px_rgba(255,255,255,0.05)]"
                style={{ backgroundColor: '#041229' }}
            >
                     {/* Content Overlay */}
                     <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 bg-black/40 hover:bg-black/20">
                    <div className="flex justify-between items-start">
                        <span className="px-4 py-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-sm font-medium text-white">
                            {project.category}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="bg-white text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <ArrowUpRight className="w-5 h-5" />
                          </div>

                          {/* GitHub logo (white) - appears on hover alongside the arrow */}
                          <div className="p-3 rounded-full border border-white/20 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.11.78-.25.78-.56 0-.28-.01-1.03-.02-2.02-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11.01 11.01 0 012.88-.39c.98.01 1.97.13 2.88.39 2.19-1.5 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.13 0 .31.21.68.79.56A10.53 10.53 0 0023.5 12.02C23.5 5.73 18.27.5 12 .5z" />
                            </svg>
                          </div>
                        </div>

                    </div>

                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex justify-between items-end mb-4">
                            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{project.title}</h3>
                            <span className="text-white font-mono hidden md:block text-xl">{project.year}</span>
                        </div>
                        <p className="text-white text-lg md:text-xl max-w-lg opacity-90 group-hover:opacity-100 transition-opacity leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Background Image/Placeholder Scale & Blur */}
                <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110" style={{ backgroundColor: '#041229' }}>
                    {/* Abstract Gradient Pattern as Placeholder */}
                    <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-600 via-neutral-900 to-black" />
                    {/* Noise Texture specific to card */}
                    <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                </div>
            </motion.div>
        </motion.div>
    )
}
